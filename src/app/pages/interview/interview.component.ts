import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { INTERVIEW_QUESTIONS } from '../../data/interview.data';
import { InterviewQuestionItem, InterviewCategory } from '../../models/interview.model';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="interview-page py-5">
      <div class="container-xl">
        <!-- Header -->
        <div class="interview-hero text-center max-w-750 mx-auto mb-5">
          <span class="badge badge-subtle-primary font-monospace mb-2">
            {{ 'interview.badge' | trans }}
          </span>
          <h1 class="text-white fw-bold display-6 mb-2">{{ 'interview.title' | trans }}</h1>
          <p class="text-secondary lead fs-6 mb-4">
            {{ 'interview.desc' | trans }}
          </p>

          <!-- Search & Filter Controls -->
          <div class="toolbar-box p-3 rounded-4 border">
            <div class="row g-3 align-items-center">
              <div class="col-md-5">
                <div class="input-group">
                  <span class="input-group-text search-icon-wrap">
                    <i class="fa-solid fa-magnifying-glass text-secondary"></i>
                  </span>
                  <input 
                    type="text" 
                    class="form-control search-filter-input small" 
                    [(ngModel)]="searchQuery" 
                    (input)="applyFilters()"
                    [placeholder]="isArabic ? 'ابحث في أسئلة المقابلات: RAG, Python, Docker...' : 'Search interview questions: RAG, Python, Docker...'"
                  />
                  <button 
                    *ngIf="searchQuery" 
                    class="btn btn-clear-search text-secondary" 
                    (click)="searchQuery = ''; applyFilters()"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>

              <!-- Categories -->
              <div class="col-md-7">
                <div class="d-flex flex-wrap gap-1 category-track">
                  <button 
                    *ngFor="let cat of categories" 
                    class="cat-pill font-monospace"
                    [class.active]="selectedCategory === cat"
                    (click)="setCategory(cat)"
                  >
                    {{ cat }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Questions List -->
        <div class="questions-list max-w-850 mx-auto">
          <div *ngIf="filteredQuestions.length === 0" class="text-center py-5 text-secondary empty-notice">
            <i class="fa-solid fa-circle-question fa-2x mb-2 text-secondary"></i>
            <p>{{ isArabic ? 'لا توجد أسئلة تطابق معايير البحث الحالية.' : 'No questions matched your search criteria.' }}</p>
            <button class="btn btn-sm btn-outline-info" (click)="resetFilters()">{{ 'roadmap.clearFilters' | trans }}</button>
          </div>

          <div *ngFor="let q of filteredQuestions" class="question-card p-4 rounded-4 mb-3 border">
            <!-- Header Badges -->
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <span class="badge badge-subtle-primary font-monospace">
                  {{ q.category }}
                </span>
                <span class="badge badge-subtle-info small">
                  {{ q.subcategory }}
                </span>
                <span class="badge badge-diff-pill font-monospace small">
                  {{ q.difficulty }} Level
                </span>
              </div>

              <!-- Mastered Checkbox Button -->
              <button 
                class="btn btn-sm btn-master-toggle"
                [class.is-mastered]="isMastered(q.id)"
                (click)="toggleMastered(q.id)"
                [title]="isMastered(q.id) ? (isArabic ? 'تم إتقان السؤال' : 'Question Mastered') : (isArabic ? 'تحديد كمتقن' : 'Mark as Mastered')"
              >
                <i class="fa-solid" [class.fa-check]="isMastered(q.id)" [class.fa-bookmark]="!isMastered(q.id)"></i>
                <span class="ms-1 d-none d-sm-inline">
                  {{ isMastered(q.id) ? (isArabic ? 'مُتقَن' : 'Mastered') : (isArabic ? 'تدريب' : 'Practice') }}
                </span>
              </button>
            </div>

            <!-- Question Title -->
            <h5 class="text-white fw-bold mb-3 mt-1 question-title">
              "{{ q.question }}"
            </h5>

            <!-- Accordion Reveal Trigger -->
            <div class="d-flex justify-content-between align-items-center pt-2 border-top">
              <button 
                class="btn btn-sm btn-toggle-answer p-0 font-monospace"
                (click)="toggleExpand(q.id)"
              >
                <i class="fa-solid me-1" [class.fa-eye]="!isExpanded(q.id)" [class.fa-eye-slash]="isExpanded(q.id)"></i>
                {{ isExpanded(q.id) ? (isArabic ? 'إخفاء الإجابة النموذجية والكود' : 'Hide Strategic Answer & Code') : (isArabic ? 'إظهار الإجابة النموذجية والكود' : 'Reveal Strategic Answer & Code') }}
              </button>
              <small class="text-secondary font-monospace">{{ q.id }}</small>
            </div>

            <!-- Expanded Answer Body -->
            <div *ngIf="isExpanded(q.id)" class="expanded-answer-box mt-3 pt-3 border-top">
              <div class="mb-3">
                <span class="answer-section-label text-cyan font-monospace">
                  <i class="fa-solid fa-bullseye me-1"></i>RECOMMENDED RESPONSE STRATEGY:
                </span>
                <p class="small text-secondary mb-2 leading-relaxed">{{ q.shortAnswer }}</p>
                <ul *ngIf="q.deepDive && q.deepDive.length > 0" class="list-unstyled small text-secondary ps-2 mb-0">
                  <li *ngFor="let point of q.deepDive" class="mb-1 d-flex align-items-baseline gap-2">
                    <i class="fa-solid fa-check text-info small"></i>
                    <span class="text-light">{{ point }}</span>
                  </li>
                </ul>
              </div>

              <!-- Optional Code Snippet -->
              <div *ngIf="q.codeSnippet" class="code-box p-3 rounded-3 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small text-secondary font-monospace">Exemplar Implementation (Python):</span>
                  <span class="badge badge-code small font-monospace">Production Pattern</span>
                </div>
                <pre class="mb-0 code-pre"><code>{{ q.codeSnippet }}</code></pre>
              </div>

              <!-- Key Points Tested -->
              <div>
                <span class="answer-section-label text-cyan font-monospace mb-1">
                  <i class="fa-solid fa-brain me-1"></i>CORE CONCEPTS TESTED:
                </span>
                <div class="d-flex flex-wrap gap-1">
                  <span *ngFor="let concept of q.keyPoints" class="tech-chip">
                    {{ concept }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .interview-page {
      position: relative;
    }
    .max-w-750 { max-width: 750px; }
    .max-w-850 { max-width: 850px; }

    .badge-subtle-primary {
      background: var(--course-1-bg);
      color: var(--primary-light);
      border: 1px solid rgba(99, 102, 241, 0.3);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-subtle-info {
      background: var(--info-bg);
      color: var(--info);
      border: 1px solid var(--info-border);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-diff-pill {
      background: var(--surface);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }

    .toolbar-box {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .search-icon-wrap {
      background: var(--surface);
      border-color: var(--border-subtle);
    }
    .search-filter-input {
      background: var(--surface);
      border-color: var(--border-subtle);
      color: var(--text-primary);
    }
    .search-filter-input:focus {
      background: var(--surface);
      border-color: var(--primary);
      color: var(--text-primary);
    }
    .btn-clear-search {
      background: var(--surface);
      border-color: var(--border-subtle);
    }

    .cat-pill {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.72rem;
      border-radius: var(--radius-sm);
      padding: 3px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .cat-pill:hover {
      color: var(--text-primary);
      border-color: var(--border-strong);
    }
    .cat-pill.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }

    .question-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .question-card:hover {
      border-color: var(--border-hover) !important;
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .question-title {
      line-height: 1.4;
    }

    .btn-master-toggle {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.78rem;
    }
    .btn-master-toggle.is-mastered {
      background: var(--success-bg);
      border-color: var(--success);
      color: var(--success);
    }

    .btn-toggle-answer {
      background: transparent;
      color: var(--primary-light);
      cursor: pointer;
      font-size: 0.82rem;
    }
    .btn-toggle-answer:hover {
      color: var(--primary);
      text-decoration: underline;
    }

    .answer-section-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }
    .text-cyan { color: var(--accent-cyan) !important; }
    .text-purple { color: var(--accent-violet) !important; }

    .code-box {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      direction: ltr !important;
      text-align: left !important;
    }
    .code-pre {
      font-family: var(--font-mono) !important;
      font-size: 0.78rem;
      color: var(--accent-cyan);
      overflow-x: auto;
      white-space: pre-wrap;
      direction: ltr !important;
      text-align: left !important;
    }
    .badge-code {
      background: var(--surface-elevated);
      color: var(--text-muted);
    }
    .border-top {
      border-color: var(--border-subtle) !important;
    }
  `]
})
export class InterviewComponent implements OnInit {
  questions: InterviewQuestionItem[] = INTERVIEW_QUESTIONS;
  filteredQuestions: InterviewQuestionItem[] = [];

  searchQuery = '';
  selectedCategory = 'All';

  categories: string[] = [
    'All',
    'Python Foundations',
    'SQL & Databases',
    'Machine Learning',
    'Deep Learning',
    'LLMs & Prompting',
    'RAG Systems',
    'Autonomous Agents',
    'System Design',
    'Production & Cloud'
  ];

  expandedIds = new Set<string>();
  masteredIds = new Set<string>();

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.filteredQuestions = [...this.questions];
    this.loadMasteredState();
  }

  get isArabic(): boolean {
    return this.transService.isRtl;
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  applyFilters() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredQuestions = this.questions.filter(item => {
      const matchCat = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchSearch = !q || (
        item.question.toLowerCase().includes(q) ||
        item.shortAnswer.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.keyPoints.some((k: string) => k.toLowerCase().includes(q))
      );
      return matchCat && matchSearch;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.applyFilters();
  }

  toggleExpand(id: string) {
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedIds.has(id);
  }

  toggleMastered(id: string) {
    if (this.masteredIds.has(id)) {
      this.masteredIds.delete(id);
    } else {
      this.masteredIds.add(id);
    }
    this.saveMasteredState();
  }

  isMastered(id: string): boolean {
    return this.masteredIds.has(id);
  }

  private loadMasteredState() {
    try {
      const saved = localStorage.getItem('ai_roadmap_mastered_questions');
      if (saved) {
        this.masteredIds = new Set(JSON.parse(saved));
      }
    } catch {}
  }

  private saveMasteredState() {
    try {
      localStorage.setItem('ai_roadmap_mastered_questions', JSON.stringify(Array.from(this.masteredIds)));
    } catch {}
  }
}
