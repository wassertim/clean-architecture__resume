import { GetResumeRequest, IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';
import { IPDFGenerator } from '../../domain/interfaces/IPDFGenerator';

export class GetResumePDF {
  constructor(
    private resumeRepository: IResumeRepository,
    private htmlGenerator: IHTMLGenerator,
    private pdfGenerator: IPDFGenerator
  ) {}

  async execute(getResumeRequest: GetResumeRequest): Promise<Uint8Array> {
    try {      
      const resume = await this.resumeRepository.getResume(getResumeRequest);            
      const html = await this.htmlGenerator.generate(resume);      
      const pdf = await this.pdfGenerator.generateFromHTML(html);      
      return pdf;
    } catch (error) {      
      throw error;
    }
  }
}