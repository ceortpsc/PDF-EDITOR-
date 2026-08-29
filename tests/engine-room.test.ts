import { describe, expect, it } from 'vitest';
import { JobEngine } from '../packages/engines/src/job-engine';
import { decide } from '../packages/ai/src/agent';
import { authorizeTool } from '../packages/ai/src/guardrails';
import { resolveNavigation } from '../packages/ai/src/navigation';

describe('Ross PDF engine room', () => {
  it('runs deterministic job lifecycle', async () => {
    const engine = new JobEngine();
    const job = engine.create('unit-test', { value: 7 });
    const result = await engine.run(job, async input => ({ doubled: (input as { value: number }).value * 2 }), { requestId: 'test-1' });
    expect(result.state).toBe('succeeded');
    expect(result.output).toEqual({ doubled: 14 });
    expect(result.attempts).toBe(1);
    expect(result.startedAt).toBeTruthy();
    expect(result.completedAt).toBeTruthy();
  });

  it('blocks invalid destructive execution without confirmation', () => {
    expect(authorizeTool({ name: 'delete-document', risk: 'destructive', authenticated: true, hasDocumentScope: true, approved: false }).allowed).toBe(false);
  });

  it('routes OCR requests deterministically', () => {
    const decision = decide('Please OCR this scanned document');
    expect(decision.intent).toBe('ocr');
    expect(decision.route).toBe('/workspace/ocr');
  });

  it('resolves conversion navigation', () => {
    const node = resolveNavigation('take me to conversions');
    expect(node.id).toBe('conversions');
  });
});
