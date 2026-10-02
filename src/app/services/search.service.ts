import { Injectable } from '@angular/core';
import { ROADMAP_STAGES } from '../data/roadmap.data';
import { RoadmapStage } from '../models/roadmap.model';

export interface SearchResult {
  stageId: string;
  stageNumber: number;
  stageTitle: string;
  category: string;
  matchedTopic: string;
  matchedText: string;
  type: 'topic' | 'concept' | 'tool' | 'stage';
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private stages: RoadmapStage[] = ROADMAP_STAGES;

  public search(query: string): SearchResult[] {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) {
      return [];
    }

    const results: SearchResult[] = [];

    for (const stage of this.stages) {
      // Check stage title, category, description
      if (
        stage.title.toLowerCase().includes(q) ||
        stage.description.toLowerCase().includes(q) ||
        stage.category.toLowerCase().includes(q)
      ) {
        results.push({
          stageId: stage.id,
          stageNumber: stage.number,
          stageTitle: stage.title,
          category: stage.category,
          matchedTopic: stage.title,
          matchedText: stage.description,
          type: 'stage'
        });
      }

      // Check what is it / why needed
      if (stage.whatIsIt && stage.whatIsIt.toLowerCase().includes(q)) {
        results.push({
          stageId: stage.id,
          stageNumber: stage.number,
          stageTitle: stage.title,
          category: stage.category,
          matchedTopic: `${stage.title}: Overview`,
          matchedText: stage.whatIsIt,
          type: 'concept'
        });
      }

      if (stage.whyNeeded && stage.whyNeeded.toLowerCase().includes(q)) {
        results.push({
          stageId: stage.id,
          stageNumber: stage.number,
          stageTitle: stage.title,
          category: stage.category,
          matchedTopic: `${stage.title}: Production Relevance`,
          matchedText: stage.whyNeeded,
          type: 'concept'
        });
      }

      // Check topics list
      for (const topic of stage.topicsList) {
        if (topic.toLowerCase().includes(q)) {
          results.push({
            stageId: stage.id,
            stageNumber: stage.number,
            stageTitle: stage.title,
            category: stage.category,
            matchedTopic: topic,
            matchedText: `Curriculum topic in Stage ${stage.id}: ${stage.title}`,
            type: 'topic'
          });
        }
      }

      // Check what to learn
      if (stage.whatToLearn) {
        for (const item of stage.whatToLearn) {
          if (item.toLowerCase().includes(q)) {
            results.push({
              stageId: stage.id,
              stageNumber: stage.number,
              stageTitle: stage.title,
              category: stage.category,
              matchedTopic: item,
              matchedText: `Core competency in Stage ${stage.id}: ${stage.title}`,
              type: 'concept'
            });
          }
        }
      }

      // Check tools
      for (const tool of stage.tools) {
        if (tool.toLowerCase().includes(q)) {
          results.push({
            stageId: stage.id,
            stageNumber: stage.number,
            stageTitle: stage.title,
            category: stage.category,
            matchedTopic: tool,
            matchedText: `Core technology used in Stage ${stage.id}: ${stage.title}`,
            type: 'tool'
          });
        }
      }

      // Check course coverage citations
      if (stage.whatCoursesCover) {
        for (const citation of stage.whatCoursesCover) {
          if (citation.toLowerCase().includes(q)) {
            results.push({
              stageId: stage.id,
              stageNumber: stage.number,
              stageTitle: stage.title,
              category: stage.category,
              matchedTopic: citation.split('(')[0].trim(),
              matchedText: citation,
              type: 'topic'
            });
          }
        }
      }

      // Check interview questions
      if (stage.interviewFocus) {
        for (const qa of stage.interviewFocus) {
          if (qa.question.toLowerCase().includes(q) || qa.answerStrategy.toLowerCase().includes(q)) {
            results.push({
              stageId: stage.id,
              stageNumber: stage.number,
              stageTitle: stage.title,
              category: stage.category,
              matchedTopic: qa.question,
              matchedText: qa.answerStrategy,
              type: 'concept'
            });
          }
        }
      }
    }

    // Deduplicate by stageId + matchedTopic
    const seen = new Set<string>();
    return results.filter(r => {
      const key = `${r.stageId}-${r.matchedTopic.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 15);
  }
}
