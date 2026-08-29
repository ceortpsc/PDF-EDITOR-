export type JobStatus='queued'|'running'|'succeeded'|'failed'|'cancelled';
export type JobKind='ocr'|'conversion'|'batch'|'export'|'scan';
export interface JobRecord{jobId:string;kind:JobKind;status:JobStatus;progress:number;createdAt:string;updatedAt:string;errorCode?:string;resultUrl?:string}
export const allowedTransitions:Record<JobStatus,JobStatus[]>= {
 queued:['running','cancelled'], running:['succeeded','failed','cancelled'], succeeded:[], failed:['queued'], cancelled:[]
};
export function canTransition(from:JobStatus,to:JobStatus){return allowedTransitions[from].includes(to)}
