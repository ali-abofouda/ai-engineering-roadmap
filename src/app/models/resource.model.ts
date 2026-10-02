export type ResourceType =
  | 'Documentation'
  | 'Courses'
  | 'Books'
  | 'YouTube'
  | 'Papers'
  | 'GitHub'
  | 'Practice';

export type ResourceDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface ResourceItem {
  id: string;
  name: string;
  stageId: string;
  stageTitle: string;
  type: ResourceType;
  description: string;
  difficulty: ResourceDifficulty;
  urlPlaceholder: string;
  tag: string;
  featured?: boolean;
}
