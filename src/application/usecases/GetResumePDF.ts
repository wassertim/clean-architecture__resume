// src/application/usecases/GetResumePDF.ts
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';
import { IPDFGenerator } from '../../domain/interfaces/IPDFGenerator';

export class GetResumePDF {
  constructor(
    private resumeRepository: IResumeRepository,
    private htmlGenerator: IHTMLGenerator,
    private pdfGenerator: IPDFGenerator
  ) {}

  async execute(): Promise<Uint8Array> {
    try {
      console.log('Fetching resume data...');
      const resume = await this.resumeRepository.getResume();
      
      console.log('Generating HTML...');
      const html = await this.htmlGenerator.generate(resume);
      
      console.log('Generating PDF...');
      const pdf = await this.pdfGenerator.generateFromHTML(html);
      
      console.log('PDF generated successfully.');
      return pdf;
    } catch (error) {
      console.error('Error in GetResumePDF:', error);
      throw error;
    }
  }
}