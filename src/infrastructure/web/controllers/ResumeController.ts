// src/infrastructure/web/controllers/ResumeController.ts
import { Request, Response } from 'express';
import { IResumeService } from '../../../application/interfaces/IResumeService';

export class ResumeController {
  constructor(private resumeService: IResumeService) {}

  async getWebView(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const html = await this.resumeService.getResumeHTML({ userId });
      res.send(html);
    } catch (error) {
      console.error('Error generating resume HTML:', error);
      res.status(500).send('Error generating resume HTML');
    }
  }

  async getPDF(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const pdfArray = await this.resumeService.getResumePDF({ userId });
      const pdfBuffer = Buffer.from(pdfArray);
      
      res.contentType('application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');
      res.setHeader('Content-Length', pdfBuffer.length);
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      res.status(500).send('Error generating resume PDF');
    }
  }
}