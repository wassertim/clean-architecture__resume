import { promises as fs } from 'fs';
import path from 'path';
import { GetResumeRequest, IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { Resume, Language, SocialLinks, Skill } from '../../domain/entities/Resume';

export class ResumeRepository implements IResumeRepository {
  private readonly dataDir = path.join(__dirname, '..', '..', '..', 'data', 'users');

  async getResume(getResumeRequest: GetResumeRequest): Promise<Resume> {
    const { userId, language = 'en' } = getResumeRequest;
    const userDir = path.join(this.dataDir, userId.toString());

    try {      
      const commonData = await this.readJSONFile(path.join(userDir, 'common.json'));            
      const resumeData = await this.readJSONFile(path.join(userDir, `resume.${language}.json`));
      
      const resume: Resume = {
        ...resumeData,
        language: language as Language,
        socialLinks: commonData.socialLinks as SocialLinks,
        skillsAssessment: {
          title: resumeData.skillsAssesment.title,
          items: commonData.skillsAssessment as Skill[]
        }
      };

      return resume;
    } catch (error) {
      console.error(`Error reading resume data for user ${userId}:`, error);
      throw new Error(`Failed to retrieve resume data for user ${userId}`);
    }
  }

  private async readJSONFile(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      throw error;
    }
  }
}