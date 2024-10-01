// src/domain/entities/Resume.ts

export type Language = 'en' | 'de';

export interface Objective {
  title: string;
  description: string;
}

export interface Education {
  title: string;
  institution: string;
  location: string;
  period: string;
}

export interface EducationSection {
  title: string;
  items: Education[];
}

export interface ExperienceArea {
    title: string;
    items: string[];
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  bulletPoints: string[];
  responsibilityAreas: ExperienceArea;
  focusAreas: ExperienceArea;
}

export interface ExperienceSection {
  title: string;
  items: Experience[];
}

export interface DetailedEducation {
  type: 'university' | 'highSchool' | 'elementarySchool';
  institution: string;
  major: string;
  location: string;
  year: string;
}

export interface FurtherEducation {
  topic: string;
  institution: string;
  period: string;
}

export interface FreeTimeActivity {
  title: string;
  bulletPoints: string[];
}

export interface QualificationSkill {
  name: string;
  level: '+' | '++' | '+++';
  yearsOfExperience: string;
}

export interface QualificationSkillCategory {
  title: string;
  skills: QualificationSkill[];
}

export interface QualificationProfile {
  legend: {
    basic: string;
    good: string;
    veryGood: string;
  };
  skillCategories: QualificationSkillCategory[];
}

export interface Resume {
  language: Language;
  pageTitle: string;
  name: string;
  objective: Objective;
  education: EducationSection;
  experience: ExperienceSection;
  qualificationProfile: QualificationProfile;
  detailedEducation: DetailedEducation[];
  furtherEducation: FurtherEducation[];
  freeTime: FreeTimeActivity[];
}