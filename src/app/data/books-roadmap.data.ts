export interface BookStage {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  year: number;
  category: string;
  pages: number;
  tagline: string;
  taglineAr: string;
  coreIdea: string;
  coreIdeaAr: string;
  keyTakeaway: string;
  keyTakeawayAr: string;
  keyThemes: string[];
}

export interface BookPhase {
  id: number;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationWeeks: string;
  stageIds: string[];
}

export const BOOKS_PHASES: BookPhase[] = [];

export const BOOKS_STAGES: BookStage[] = [];
