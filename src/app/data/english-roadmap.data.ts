export interface EnglishStage {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: string;
  tagline: string;
  taglineAr: string;
  coreStrategy: string;
  coreStrategyAr: string;
  dailyHabit: string;
  dailyHabitAr: string;
  recommendedTools: string[];
  keyTopics: string[];
}

export interface EnglishPhase {
  id: number;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationWeeks: string;
  stageIds: string[];
}

export const ENGLISH_PHASES: EnglishPhase[] = [];

export const ENGLISH_STAGES: EnglishStage[] = [];
