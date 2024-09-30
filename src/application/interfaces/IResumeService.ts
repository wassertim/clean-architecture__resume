import { GetResumeRequest } from '../../domain/interfaces/IResumeRepository';

// src/application/interfaces/IResumeService.ts
export interface IResumeService {
    getResumeHTML(getResumeRequest: GetResumeRequest): Promise<string>;
    getResumePDF(getResumeRequest: GetResumeRequest): Promise<Uint8Array>;
  }