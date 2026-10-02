import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { COURSE_COMPARISONS } from '../../data/course-comparison.data';
import { CourseSkillComparison, SkillLevel } from '../../models/course-comparison.model';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-course-coverage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <div class="course-coverage-page py-5">
      <div class="container-xl">
        <!-- Hero Header -->
        <div class="text-center max-w-850 mx-auto mb-5">
          <span class="badge badge-subtle-primary font-monospace mb-2">
            {{ 'cardMatrix.sub' | trans }}
          </span>
          <h1 class="text-white fw-bold display-6 mb-2">{{ 'cardMatrix.title' | trans }}</h1>
          <p class="text-secondary lead fs-6 mb-4">
            {{ 'cardMatrix.desc' | trans }}
          </p>

          <!-- Course Overview Cards -->
          <div class="row g-3 text-start mb-4">
            <div class="col-md-4">
              <div class="course-overview-card p-3 rounded-3 border border-course-1 h-100">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="course-badge" data-course="COURSE 01">COURSE 01</span>
                  <small class="text-secondary font-monospace">70 Hours</small>
                </div>
                <h6 class="text-white fw-bold mb-1">Complete Generative AI with LangChain</h6>
                <p class="small text-secondary mb-0">Python, Classical NLP, Deep Learning (RNN/LSTM/GRU), Attention, Transformers, LangChain, Neo4j, Fine-Tuning (LoRA).</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="course-overview-card p-3 rounded-3 border border-course-2 h-100">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="course-badge" data-course="COURSE 02">COURSE 02</span>
                  <small class="text-secondary font-monospace">34 Hours</small>
                </div>
                <h6 class="text-white fw-bold mb-1">Ultimate RAG & Agentic Bootcamp</h6>
                <p class="small text-secondary mb-0">Advanced Ingestion, Semantic Chunking, Hybrid Search, MMR, HyDE, Multimodal RAG, CRAG, LangGraph, and RAG Evaluation.</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="course-overview-card p-3 rounded-3 border border-course-3 h-100">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="course-badge" data-course="COURSE 03">COURSE 03</span>
                  <small class="text-secondary font-monospace">19 Hours</small>
                </div>
                <h6 class="text-white fw-bold mb-1">Production AI & Agentic Infrastructure</h6>
                <p class="small text-secondary mb-0">Full-Stack FastAPI & Next.js, Docker, AWS (Lambda/Bedrock/S3), Terraform IaC, GitHub Actions CI/CD, Langfuse, and Security.</p>
              </div>
            </div>
          </div>

          <!-- Filter Toolbar -->
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
                    [placeholder]="isArabic ? 'ابحث في المهارات: RAG, Docker, LangGraph...' : 'Search skills: RAG, Docker, LangGraph...'"
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

        <!-- DESKTOP VIEW: Comparison Table -->
        <div class="d-none d-md-block table-responsive rounded-4 border matrix-wrap mb-5">
          <table class="table mb-0 align-middle">
            <thead class="matrix-head font-monospace text-uppercase small">
              <tr>
                <th scope="col" style="width: 25%;">{{ isArabic ? 'المهارة / المفهوم' : 'Skill / Technology' }}</th>
                <th scope="col" class="text-center" style="width: 14%;">Course 01</th>
                <th scope="col" class="text-center" style="width: 14%;">Course 02</th>
                <th scope="col" class="text-center" style="width: 14%;">Course 03</th>
                <th scope="col" class="text-center" style="width: 13%;">{{ isArabic ? 'المحصلة المجمعة' : 'Combined' }}</th>
                <th scope="col" style="width: 20%;">{{ isArabic ? 'تفاصيل التغطية' : 'Coverage Details' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of filteredSkills" class="matrix-row">
                <!-- Skill Name & Category -->
                <td>
                  <div class="fw-bold text-white">{{ row.skill }}</div>
                  <span class="badge cat-badge small font-monospace">{{ row.category }}</span>
                </td>

                <!-- Course 1 -->
                <td class="text-center">
                  <span class="skill-status-pill" [attr.data-level]="row.course1">
                    <span class="cov-dot"></span>
                    {{ row.course1 }}
                  </span>
                </td>

                <!-- Course 2 -->
                <td class="text-center">
                  <span class="skill-status-pill" [attr.data-level]="row.course2">
                    <span class="cov-dot"></span>
                    {{ row.course2 }}
                  </span>
                </td>

                <!-- Course 3 -->
                <td class="text-center">
                  <span class="skill-status-pill" [attr.data-level]="row.course3">
                    <span class="cov-dot"></span>
                    {{ row.course3 }}
                  </span>
                </td>

                <!-- Combined Overall -->
                <td class="text-center">
                  <span class="badge overall-pill font-monospace" [attr.data-level]="row.overall">
                    {{ row.overall }}
                  </span>
                </td>

                <!-- Notes / Coverage Detail -->
                <td>
                  <small class="text-secondary d-block line-clamp-2" [title]="row.notes">
                    {{ row.notes }}
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- MOBILE VIEW: Stacked Responsive Cards -->
        <div class="d-md-none mobile-matrix-cards mb-5">
          <div *ngFor="let row of filteredSkills" class="modern-card p-3 mb-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="text-white fw-bold mb-1">{{ row.skill }}</h6>
                <span class="badge cat-badge small font-monospace">{{ row.category }}</span>
              </div>
              <span class="badge overall-pill font-monospace" [attr.data-level]="row.overall">
                {{ row.overall }}
              </span>
            </div>

            <!-- 3 Courses Badges Row -->
            <div class="d-flex justify-content-between align-items-center py-2 border-top border-bottom my-2">
              <div class="text-center">
                <small class="text-muted d-block font-monospace">C1</small>
                <span class="skill-status-pill small" [attr.data-level]="row.course1">{{ row.course1 }}</span>
              </div>
              <div class="text-center">
                <small class="text-muted d-block font-monospace">C2</small>
                <span class="skill-status-pill small" [attr.data-level]="row.course2">{{ row.course2 }}</span>
              </div>
              <div class="text-center">
                <small class="text-muted d-block font-monospace">C3</small>
                <span class="skill-status-pill small" [attr.data-level]="row.course3">{{ row.course3 }}</span>
              </div>
            </div>

            <p class="small text-secondary mb-0 leading-relaxed">{{ row.notes }}</p>
          </div>
        </div>

        <!-- Bottom Guidance Callout -->
        <div class="guidance-banner p-4 rounded-4 border text-center max-w-850 mx-auto">
          <h5 class="text-white fw-bold mb-2">Where to go from here?</h5>
          <p class="text-secondary small mb-3">
            Now that you know what each course teaches, explore the comprehensive 26-stage roadmap or study our gap analysis of what all courses miss.
          </p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a routerLink="/roadmap" class="btn btn-sm btn-primary-action">
              Explore 26-Stage Roadmap <i class="fa-solid fa-arrow-right ms-1"></i>
            </a>
            <a routerLink="/missing-skills" class="btn btn-sm btn-secondary-action">
              View What Is Still Missing <i class="fa-solid fa-triangle-exclamation text-warning ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .course-coverage-page {
      position: relative;
    }
    .max-w-850 { max-width: 850px; }
    .course-overview-card {
      background: var(--surface-card);
      transition: transform 0.2s ease;
    }
    .course-overview-card:hover {
      transform: translateY(-2px);
    }
    .border-course-1 { border-color: rgba(59, 130, 246, 0.30) !important; }
    .border-course-2 { border-color: rgba(6, 182, 212, 0.30) !important; }
    .border-course-3 { border-color: rgba(139, 92, 246, 0.30) !important; }

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

    .matrix-wrap {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .matrix-head th {
      background: var(--surface);
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-subtle);
      padding: 14px 16px;
    }
    .matrix-row td {
      border-bottom: 1px solid var(--border-subtle);
      padding: 14px 16px;
      background: transparent;
      color: var(--text-primary);
    }
    .cat-badge {
      background: var(--surface);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .skill-status-pill {
      font-size: 0.7rem;
      font-family: var(--font-mono);
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .skill-status-pill[data-level="Strong"] {
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid var(--success-border);
    }
    .skill-status-pill[data-level="Partial"] {
      background: var(--warning-bg);
      color: var(--warning);
      border: 1px solid var(--warning-border);
    }
    .skill-status-pill[data-level="Missing"] {
      background: var(--surface);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .overall-pill {
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }
    .overall-pill[data-level="Strong"] {
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid var(--success-border);
    }
    .overall-pill[data-level="Partial"] {
      background: var(--warning-bg);
      color: var(--warning);
      border: 1px solid var(--warning-border);
    }
    .overall-pill[data-level="Missing"] {
      background: var(--error-bg);
      color: var(--error);
      border: 1px solid var(--error-border);
    }

    .guidance-banner {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .badge-subtle-primary {
      background: rgba(59, 130, 246, 0.10);
      color: var(--primary-light);
      border: 1px solid rgba(59, 130, 246, 0.25);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .border-top, .border-bottom {
      border-color: var(--border-subtle) !important;
    }
  `]
})
export class CourseCoverageComponent implements OnInit {
  comparisons: CourseSkillComparison[] = COURSE_COMPARISONS;
  filteredSkills: CourseSkillComparison[] = [];

  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    'All',
    'Foundations',
    'Deep Learning',
    'RAG',
    'Agents',
    'Production & DevOps',
    'Cloud',
    'Security'
  ];

  constructor(public transService: TranslationService) {}

  get isArabic(): boolean {
    return this.transService.isRtl;
  }

  getLevelLabel(level: string): string {
    if (!this.isArabic) return level;
    switch (level) {
      case 'Strong': return 'مغطى بقوة';
      case 'Partial': return 'تغطية جزئية';
      case 'Missing': return 'غير مغطى';
      default: return level;
    }
  }

  ngOnInit() {
    this.filteredSkills = [...this.comparisons];
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  applyFilters() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredSkills = this.comparisons.filter(c => {
      const matchCat = this.selectedCategory === 'All' || c.category.toLowerCase().includes(this.selectedCategory.toLowerCase());
      const matchSearch = !q || (
        c.skill.toLowerCase().includes(q) ||
        c.notes.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
      return matchCat && matchSearch;
    });
  }
}
