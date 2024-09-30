import { promises as fs } from 'fs';
import path from 'path';
import { GetResumeRequest, IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { Resume, Language } from '../../domain/entities/Resume';

export class ResumeRepository implements IResumeRepository {
  private readonly dataDir = path.join(__dirname, '..', '..', '..', 'data', 'users');

  async getResume(getResumeRequest: GetResumeRequest): Promise<Resume> {
    const { userId, language = 'en' } = getResumeRequest;
    const userDir = path.join(this.dataDir, userId.toString());

    try {
      const resumeData = await this.readJSONFile(path.join(userDir, `resume.${language}.json`));
      
      // Ensure the loaded data conforms to the Resume interface
      const resume: Resume = {
        language: language as Language,
        pageTitle: resumeData.pageTitle,
        name: resumeData.name,
        objective: resumeData.objective,
        education: resumeData.education,
        experience: resumeData.experience,
        qualificationProfile: resumeData.qualificationProfile,
        detailedEducation: resumeData.detailedEducation,
        furtherEducation: resumeData.furtherEducation,
        freeTime: resumeData.freeTime,
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