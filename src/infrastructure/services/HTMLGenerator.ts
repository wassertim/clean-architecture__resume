import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';
import { Resume } from '../../domain/entities/Resume';

export class HTMLGenerator implements IHTMLGenerator {
  private template: HandlebarsTemplateDelegate | null = null;
  private css: string | null = null;

  constructor(private templatePath: string, private cssPath: string) {}

  private async ensureTemplateLoaded(): Promise<void> {
    if (!this.template) {
      await this.loadTemplate();
    }
  }

  private async ensureCSSLoaded(): Promise<void> {
    if (!this.css) {
      await this.loadCSS();
    }
  }

  private async loadTemplate(): Promise<void> {
    const templateContent = await fs.readFile(this.templatePath, 'utf-8');
    this.template = Handlebars.compile(templateContent);

    // Register helper functions
    Handlebars.registerHelper('eq', function(arg1, arg2) {
      return arg1 === arg2;
    });

    Handlebars.registerHelper('multiply', function(num1, num2) {
      return num1 * num2;
    });

    Handlebars.registerHelper('join', function(array, separator) {
      return array.join(separator);
    });
  }

  private async loadCSS(): Promise<void> {
    this.css = await fs.readFile(this.cssPath, 'utf-8');
  }

  async generate(resume: Resume): Promise<string> {
    await this.ensureTemplateLoaded();
    await this.ensureCSSLoaded();

    if (!this.template) {
      throw new Error('Failed to load the template');
    }

    if (!this.css) {
      throw new Error('Failed to load the CSS');
    }

    const html = this.template(resume);
    return this.injectCSS(html, this.css);
  }

  private injectCSS(html: string, css: string): string {
    const styleTag = `<style>${css}</style>`;
    return html.replace('</head>', `${styleTag}</head>`);
  }
}