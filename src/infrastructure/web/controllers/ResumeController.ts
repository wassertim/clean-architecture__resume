import { Request, Response } from 'express';
import { IResumeService } from '../../../application/interfaces/IResumeService';

export class ResumeController {
  constructor(private resumeService: IResumeService) {}

  async getWebView(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10);
      const language = req.params.language as 'en' | 'de';

      if (isNaN(userId) || (language !== 'en' && language !== 'de')) {
        res.status(400).send('Invalid user ID or language');
        return;
      }

      const html = await this.resumeService.getResumeHTML({ userId, language });
      res.send(html);
    } catch (error) {
      console.error('Error generating resume HTML:', error);
      res.status(500).send('Error generating resume HTML');
    }
  }

  async getPDF(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10);
      const language = req.params.language as 'en' | 'de';

      if (isNaN(userId) || (language !== 'en' && language !== 'de')) {
        res.status(400).send('Invalid user ID or language');
        return;
      }

      const pdfArray = await this.resumeService.getResumePDF({ userId, language });
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