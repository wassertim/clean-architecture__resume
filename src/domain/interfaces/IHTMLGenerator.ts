// src/domain/interfaces/IHTMLGenerator.ts
import { Resume } from '../entities/Resume';

export interface IHTMLGenerator {
  generate(resume: Resume): Promise<string>;
}