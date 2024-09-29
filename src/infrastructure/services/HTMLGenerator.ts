// src/infrastructure/services/HTMLGenerator.ts
import fs from 'fs/promises';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';
import { Resume } from '../../domain/entities/Resume';

export class HTMLGenerator implements IHTMLGenerator {
  private template: string = '';

  constructor(private templatePath: string) {}

  async loadTemplate(): Promise<void> {
    this.template = await fs.readFile(this.templatePath, 'utf-8');
  }

  async generate(resume: Resume): Promise<string> {
    if (!this.template) {
      await this.loadTemplate();
    }

    let html = this.template;
    
    // Simple replacement, in a real app you might use a proper templating engine
    for (const [key, value] of Object.entries(resume)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), this.formatValue(value));
    }

    return html;
  }

  private formatValue(value: any): string {
    if (Array.isArray(value)) {
      return value.map(item => {
        if (typeof item === 'object') {
          return Object.entries(item).map(([k, v]) => `<strong>${k}:</strong> ${v}`).join('<br>');
        }
        return item;
      }).join('<br>');
    }
    return String(value);
  }
}