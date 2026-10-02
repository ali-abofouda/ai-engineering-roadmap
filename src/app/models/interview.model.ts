export type InterviewCategory =
  | 'Python'
  | 'SQL'
  | 'Machine Learning'
  | 'RAG'
  | 'Agents'
  | 'System Design'
  | 'Behavioral';

export interface InterviewQuestionItem {
  id: string;
  category: InterviewCategory;
  subcategory: string;
  question: string;
  shortAnswer: string;
  deepDive: string[];
  codeSnippet?: string;
  keyPoints: string[];
  difficulty: 'Junior' | 'Mid' | 'Senior';
}
