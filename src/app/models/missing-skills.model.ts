export type MissingGroup = 'Must Study' | 'Recommended' | 'Advanced / Later';

export interface MissingSkillItem {
  id: string;
  title: string;
  category: string;
  group: MissingGroup;
  whyItMatters: string;
  whatLevelNeeded: string;
  suggestedScope: string[];
  courseCoverageNote: string;
}
