// src/infrastructure/services/PDFGenerator.ts
import puppeteer from 'puppeteer';
import { IPDFGenerator } from '../../domain/interfaces/IPDFGenerator';

export class PDFGenerator implements IPDFGenerator {
  async generateFromHTML(html: string): Promise<Uint8Array> {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({ 
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
      });
      return pdf;
    } finally {
      await browser.close();
    }
  }
}