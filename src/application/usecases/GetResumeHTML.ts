// src/application/usecases/GetResumeHTML.ts
import { GetResumeRequest, IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';

export class GetResumeHTML {
  constructor(
    private resumeRepository: IResumeRepository,
    private htmlGenerator: IHTMLGenerator
  ) {}

  async execute(getResumeRequest: GetResumeRequest): Promise<string> {
    const resume = await this.resumeRepository.getResume(getResumeRequest);
    return this.htmlGenerator.generate(resume);
  }
}