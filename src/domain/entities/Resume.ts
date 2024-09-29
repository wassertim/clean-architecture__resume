// src/domain/entities/Resume.ts
import { Experience } from './Experience';
import { Education } from './Education';

export interface Resume {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}