import type { EngineContext, Job, JobState } from './types';

function id(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export class JobEngine {
  private readonly jobs = new Map<string, Job>();

  create<TInput>(type: string, input: TInput): Job<TInput> {
    const now = new Date().toISOString();
    const job: Job<TInput> = { id: id('job'), type, state: 'queued', input, attempts: 0, createdAt: now };
    this.jobs.set(job.id, job);
    return job;
  }

  get<TInput = unknown, TOutput = unknown>(jobId: string): Job<TInput, TOutput> | undefined {
    return this.jobs.get(jobId) as Job<TInput, TOutput> | undefined;
  }

  transition(jobId: string, next: JobState, error?: string): Job {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error(`Unknown job: ${jobId}`);
    const allowed: Record<JobState, JobState[]> = {
      queued: ['running', 'cancelled'],
      running: ['succeeded', 'failed', 'cancelled'],
      succeeded: [],
      failed: ['queued'],
      cancelled: ['queued'],
    };
    if (!allowed[job.state].includes(next)) throw new Error(`Invalid transition: ${job.state} -> ${next}`);
    job.state = next;
    if (next === 'running') { job.attempts += 1; job.startedAt = new Date().toISOString(); }
    if (next === 'succeeded' || next === 'failed' || next === 'cancelled') job.completedAt = new Date().toISOString();
    if (error) job.error = error;
    this.jobs.set(job.id, job);
    return job;
  }

  async run<TInput, TOutput>(
    job: Job<TInput>,
    execute: (input: TInput, ctx: EngineContext) => Promise<TOutput>,
    ctx: EngineContext,
  ): Promise<Job<TInput, TOutput>> {
    this.transition(job.id, 'running');
    try {
      const output = await execute(job.input, ctx);
      const done = this.transition(job.id, 'succeeded') as Job<TInput, TOutput>;
      done.output = output;
      return done;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown engine failure';
      this.transition(job.id, 'failed', message);
      throw err;
    }
  }
}
