// src/application/usecases/GetResumeHTML.ts
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';

export class GetResumeHTML {
  constructor(
    private resumeRepository: IResumeRepository,
    private htmlGenerator: IHTMLGenerator
  ) {}

  async execute(): Promise<string> {
    const resume = await this.resumeRepository.getResume();
    return this.htmlGenerator.generate(resume);
  }
}