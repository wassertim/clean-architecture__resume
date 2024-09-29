// src/domain/interfaces/IResumeRepository.ts
import { Resume } from '../entities/Resume';

export interface IResumeRepository {
  getResume(): Promise<Resume>;
}