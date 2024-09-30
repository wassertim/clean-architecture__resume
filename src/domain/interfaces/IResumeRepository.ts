// src/domain/interfaces/IResumeRepository.ts
import { Language, Resume } from '../entities/Resume';

export interface GetResumeRequest {
    userId: number;
    language?: Language;
}

export interface IResumeRepository {
  getResume(getResumeRequest: GetResumeRequest): Promise<Resume>;
}