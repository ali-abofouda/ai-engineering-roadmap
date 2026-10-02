export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  difficulty: ProjectDifficulty;
  category: string;
  summary: string;
  technologies: string[];
  whatYouLearn: string[];
  architectureSteps: string[];
  expectedOutcome: string;
  githubPlaceholderUrl?: string;
  demoPlaceholderUrl?: string;
  keySkills: string[];
}
