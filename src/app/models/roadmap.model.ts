export type StageDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type CoverageStatus = 'Covered' | 'Partially Covered' | 'Not Covered';

export type CourseSource = 'COURSE 01' | 'COURSE 02' | 'COURSE 03';

export interface InterviewFocusItem {
  question: string;
  answerStrategy: string;
}

export interface RoadmapStage {
  id: string; // e.g. "01", "02", ...
  number: number;
  title: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: StageDifficulty;
  durationWeeks: string;
  
  // Course attribution & Coverage
  courseSources: CourseSource[];
  coverageStatus: CoverageStatus;
  coverageNote?: string;

  // Structured Learning Content (User Requirement 7)
  whatIsIt: string;
  whyNeeded: string;
  whatToLearn: string[];
  whatCoursesCover: string[];
  whatIsMissing: string;
  interviewFocus: InterviewFocusItem[];
  practicalTask: string;
  projectConnection: string;

  // Tech stack & metadata
  tools: string[];
  topicsList: string[];
  diagramType?: 'rag' | 'agent' | 'eval';
  nextStageId?: string;
  previousStageId?: string;
}
