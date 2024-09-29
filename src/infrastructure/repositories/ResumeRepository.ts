// src/infrastructure/repositories/ResumeRepository.ts
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';
import { Resume } from '../../domain/entities/Resume';
import { Experience } from '../../domain/entities/Experience';
import { Education } from '../../domain/entities/Education';

export class ResumeRepository implements IResumeRepository {
  async getResume(): Promise<Resume> {
    // In a real application, this would likely come from a database
    const experience: Experience[] = [
      {
        company: "Tech Co",
        position: "Senior Developer",
        startDate: "2018-01",
        endDate: "Present",
        description: "Implemented clean architecture principles in various projects."
      }
    ];

    const education: Education[] = [
      {
        institution: "University of Code",
        degree: "BS in Computer Science",
        graduationDate: "2017-05"
      }
    ];

    return {
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      summary: "Experienced software developer with a passion for clean architecture.",
      experience,
      education,
      skills: ["TypeScript", "Node.js", "Clean Architecture", "Express"]
    };
  }
}