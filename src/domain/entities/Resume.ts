// src/domain/entities/Resume.ts

export type Language = 'en' | 'de';

export interface Education {
  institution: string;
  major: string;
  location: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  bulletPoints: string[];
}

export interface Project {
  name: string;
  company: string;
  description: string;
  technologies: string[];
  role: string;
  year: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SocialLinks {
  xing: string;
  linkedin: string;
  github: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  items: string[];
}

export interface Objective {
  title: string;
  description: string;
}

export interface EducationSection {
  title: string;
  items: Education[];
}

export interface SkillsSection {
  title: string;
  intro: string;
  categories: SkillCategory[];
}

export interface ExperienceSection {
  title: string;
  items: Experience[];
}

export interface ProjectsSection {
  title: string;
  items: Project[];
}

export interface SkillsAssessmentSection {
  title: string;
  items: Skill[];
}

export interface HobbiesSection {
  title: string;
  description: string;
}

export interface Resume {
  language: Language;
  pageTitle: string;
  name: string;
  objective: Objective;
  education: EducationSection;
  skills: SkillsSection;
  experience: ExperienceSection;
  projects: ProjectsSection;
  skillsAssessment: SkillsAssessmentSection;
  hobbies: HobbiesSection;
  socialLinks: SocialLinks;
}