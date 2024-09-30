import fs from 'fs/promises';
import Handlebars from 'handlebars';
import { IHTMLGenerator } from '../../domain/interfaces/IHTMLGenerator';
import { Resume } from '../../domain/entities/Resume';

export class HTMLGenerator implements IHTMLGenerator {
  private template: HandlebarsTemplateDelegate | null = null;

  constructor(private templatePath: string) {}

  private async ensureTemplateLoaded(): Promise<void> {
    if (!this.template) {
      await this.loadTemplate();
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

  async generate(resume: Resume): Promise<string> {
    await this.ensureTemplateLoaded();

    if (!this.template) {
      throw new Error('Failed to load the template');
    }

    return this.template(resume);
  }
}