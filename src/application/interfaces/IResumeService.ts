// src/application/interfaces/IResumeService.ts
export interface IResumeService {
    getResumeHTML(): Promise<string>;
    getResumePDF(): Promise<Uint8Array>;
  }