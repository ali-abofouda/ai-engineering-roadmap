export type SkillLevel = 'Strong' | 'Partial' | 'Missing';

export interface CourseSkillComparison {
  skill: string;
  category: string;
  course1: SkillLevel;
  course2: SkillLevel;
  course3: SkillLevel;
  overall: SkillLevel;
  notes: string;
}
