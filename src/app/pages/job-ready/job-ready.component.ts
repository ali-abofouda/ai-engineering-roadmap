import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService, JobReadyItem } from '../../services/progress.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Subscription } from 'rxjs';

interface GroupedCategory {
  category: string;
  icon: string;
  items: JobReadyItem[];
}

@Component({
  selector: 'app-job-ready',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <div class="job-ready-page py-5">
      <div class="container-xl">
        <!-- Hero Header -->
        <div class="job-ready-hero text-center max-w-750 mx-auto mb-5">
          <span class="badge badge-subtle-success font-monospace mb-2">
            {{ 'jobReady.badge' | trans }}
          </span>
          <h1 class="text-white fw-bold display-6 mb-2">{{ 'jobReady.title' | trans }}</h1>
          <p class="text-secondary lead fs-6 mb-4">
            {{ 'jobReady.desc' | trans }}
          </p>

          <!-- Overall Readiness Dashboard Card -->
          <div class="score-card p-4 rounded-4 border">
            <div class="row align-items-center g-4">
              <div class="col-md-7 text-md-start text-center">
                <div class="d-flex align-items-center gap-2 mb-1 justify-content-md-start justify-content-center">
                  <h4 class="text-white mb-0 font-monospace">{{ completedCount }} / {{ items.length }} {{ 'jobReady.verified' | trans }}</h4>
                  <span class="badge" [class]="statusBadgeClass">{{ statusText }}</span>
                </div>
                <p class="small text-secondary mb-3 leading-relaxed">
                  {{ statusAdvice }}
                </p>
                <div class="progress progress-dark" style="height: 10px;">
                  <div 
                    class="progress-bar bg-gradient-ready" 
                    role="progressbar" 
                    [style.width.%]="scorePercentage"
                  ></div>
                </div>

                <!-- Sub-Domain Breakdown Progress Bars (Requirement 28) -->
                <div class="sub-progress-list mt-3 pt-3 border-top">
                  <div *ngFor="let group of groupedItems" class="sub-progress-item mb-2">
                    <div class="d-flex justify-content-between align-items-center small mb-1">
                      <span class="text-secondary font-monospace">{{ getCategoryLabel(group.category) }}</span>
                      <span class="text-white font-monospace">{{ getGroupPct(group.items) }}%</span>
                    </div>
                    <div class="progress progress-dark" style="height: 6px;">
                      <div 
                        class="progress-bar bg-info" 
                        role="progressbar" 
                        [style.width.%]="getGroupPct(group.items)"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-5 text-md-end text-center">
                <div class="d-flex align-items-center justify-content-md-end justify-content-center gap-3">
                  <div class="score-dial">
                    <span class="score-pct font-monospace fw-bold text-white">{{ scorePercentage }}%</span>
                    <small class="score-sub text-secondary d-block font-monospace">{{ 'jobReady.curriculumVerified' | trans }}</small>
                  </div>
                  <button class="btn btn-sm btn-secondary-action" (click)="resetChecklist()" title="Reset All Checklist Items">
                    <i class="fa-solid fa-rotate-left me-1"></i>{{ 'roadmap.reset' | trans }}
                  </button>
                </div>
                <small class="text-muted font-monospace d-block mt-3">
                  {{ 'jobReady.disclaimer' | trans }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Checklist Grid -->
        <div class="checklist-grid max-w-850 mx-auto mb-5">
          <div *ngFor="let group of groupedItems" class="check-group-box p-4 rounded-4 mb-4 border">
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h5 class="text-white fw-bold mb-0 font-monospace">
                <i [class]="group.icon + ' text-cyan me-2'"></i>{{ getCategoryLabel(group.category) }}
              </h5>
              <span class="badge badge-group-count small font-monospace">
                {{ getGroupCompletedCount(group.items) }} / {{ group.items.length }} {{ 'jobReady.done' | trans }}
              </span>
            </div>

            <div class="items-list">
              <label 
                *ngFor="let item of group.items" 
                class="check-row p-3 rounded-3 mb-2 d-flex align-items-center gap-3"
                [class.is-checked]="item.checked"
              >
                <input 
                  type="checkbox" 
                  class="custom-checkbox" 
                  [checked]="item.checked" 
                  (change)="toggleItem(item.id)"
                />
                <span class="item-label text-light flex-grow-1 leading-relaxed">{{ item.label }}</span>
                <span *ngIf="item.checked" class="badge badge-subtle-success small font-monospace">
                  <i class="fa-solid fa-check me-1"></i>Verified
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- FINAL PERSPECTIVE MESSAGE CARD -->
        <div class="max-w-850 mx-auto">
          <div class="philosophy-card p-4 p-md-5 rounded-4 border border-cyan-subtle position-relative overflow-hidden">
            <div class="philosophy-glow"></div>
            
            <div class="d-flex align-items-center gap-2 mb-3">
              <div class="bulb-icon">
                <i class="fa-solid fa-compass text-cyan"></i>
              </div>
              <h5 class="text-white fw-bold mb-0 font-monospace">A Final Engineering Reality Check</h5>
            </div>

            <blockquote class="blockquote text-light small mb-3 leading-relaxed">
              "You do not need to memorize every hyperparameter of every model to be a world-class AI Engineer. 
              What companies hire you for is your ability to take messy, unformatted real-world business data, 
              reliably chunk and index it, design an observable hybrid retrieval pipeline, 
              orchestrate resilient autonomous agent loops, and deploy the entire solution on production cloud infrastructure with zero hallucinations and sub-second latency."
            </blockquote>

            <p class="small text-secondary mb-4 leading-relaxed">
              Once you hit <strong>16/21 verified points (75%+)</strong> on this rubric and have built at least 2 of the flagship projects, you have surpassed the vast majority of applicants trapped in endless tutorial purgatory. Polish your GitHub repositories, write clear README architecture diagrams, and start interviewing with confidence.
            </p>

            <div class="d-flex align-items-center gap-3 flex-wrap">
              <a routerLink="/projects" class="btn btn-sm btn-primary-action">
                Review Flagship Projects <i class="fa-solid fa-laptop-code ms-1"></i>
              </a>
              <a routerLink="/interview" class="btn btn-sm btn-secondary-action">
                Practice Technical Interview Questions <i class="fa-solid fa-comments ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .job-ready-page {
      position: relative;
    }
    .max-w-750 { max-width: 750px; }
    .max-w-850 { max-width: 850px; }

    .badge-subtle-success {
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid var(--success-border);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }

    .score-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .progress-dark {
      background: var(--surface-elevated);
      border-radius: 999px;
      overflow: hidden;
    }
    .bg-gradient-ready {
      background: var(--brand-gradient);
    }
    .score-dial {
      text-align: center;
      padding: 10px 18px;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      background: var(--surface);
    }
    .score-pct {
      font-size: 1.8rem;
      line-height: 1.2;
    }
    .score-sub {
      font-size: 0.68rem;
    }

    .check-group-box {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .badge-group-count {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }
    .check-row {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .check-row:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
    }
    .check-row.is-checked {
      border-color: var(--success-border);
      background: var(--surface-card);
    }
    .custom-checkbox {
      width: 18px;
      height: 18px;
      accent-color: var(--primary);
      cursor: pointer;
    }
    .item-label {
      font-size: 0.9rem;
    }

    .philosophy-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .border-cyan-subtle {
      border-color: rgba(34, 211, 238, 0.25) !important;
    }
    .philosophy-glow {
      position: absolute;
      top: -100px;
      inset-inline-end: -100px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .bulb-icon {
      width: 36px;
      height: 36px;
      background: var(--surface-elevated);
      border-radius: var(--radius-sm);
      display: grid;
      place-items: center;
    }
    .border-top, .border-bottom {
      border-color: var(--border-subtle) !important;
    }
    .text-cyan { color: var(--accent-cyan) !important; }
  `]
})
export class JobReadyComponent implements OnInit, OnDestroy {
  items: JobReadyItem[] = [];
  groupedItems: GroupedCategory[] = [];
  completedCount = 0;

  private sub?: Subscription;

  constructor(
    private progressService: ProgressService,
    public transService: TranslationService
  ) {}

  ngOnInit() {
    this.sub = this.progressService.checklist$.subscribe((items: JobReadyItem[]) => {
      this.items = items;
      this.completedCount = items.filter((i: JobReadyItem) => i.checked).length;
      this.groupItems();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get isArabic(): boolean {
    return this.transService.isRtl;
  }

  get scorePercentage(): number {
    if (this.items.length === 0) return 0;
    return Math.round((this.completedCount / this.items.length) * 100);
  }

  get statusText(): string {
    const pct = this.scorePercentage;
    if (pct < 35) return this.isArabic ? 'بناء الأساسيات' : 'Building Foundations';
    if (pct < 65) return this.isArabic ? 'كفاءة متوسطة' : 'Intermediate Competence';
    if (pct < 85) return this.isArabic ? 'جاهز للمقابلات' : 'Interview Ready';
    return this.isArabic ? 'كفاءة إنتاجية متقدمة' : 'Production Capable';
  }

  get statusBadgeClass(): string {
    const pct = this.scorePercentage;
    if (pct < 35) return 'bg-secondary-subtle text-secondary border border-secondary';
    if (pct < 65) return 'bg-warning-subtle text-warning border border-warning';
    if (pct < 85) return 'bg-info-subtle text-info border border-info';
    return 'bg-success-subtle text-success border border-success';
  }

  get statusAdvice(): string {
    const pct = this.scorePercentage;
    if (pct < 35) {
      return this.isArabic 
        ? 'ركّز أولاً على لغة بايثون، وأساسيات PyTorch، وإكمال مشاريع الشبكات العصبية و LSTM البسيطة.'
        : 'Focus on core Python, PyTorch fundamentals, and completing basic ANN/LSTM regression projects.';
    }
    if (pct < 65) {
      return this.isArabic
        ? 'انتقل الآن لتقنيات التقطيع الدلالي، والبحث الهجين بـ BM25 و RRF، وسير العمل الدوري بـ LangGraph.'
        : 'Advance into Semantic Chunking, Hybrid RAG with RRF, and LangGraph multi-agent cyclical workflows.';
    }
    if (pct < 85) {
      return this.isArabic
        ? 'لقد وصلت للمستوى المطلوب في السوق! أتقن مشروعين رئيسيين مع Docker و FastAPI وابدأ التقديم على الوظائف.'
        : 'You meet the industry threshold! Polish 2 flagship projects with Docker/FastAPI and start applying.';
    }
    return this.isArabic
      ? 'جاهزية هندسية كاملة بمستوى Senior. ركّز على تصميم الأنظمة الكبيرة والمراقبة وتتبع السحابة.'
      : 'Senior-level production readiness. Focus on enterprise system design and cross-cloud observability.';
  }

  getCategoryLabel(category: string): string {
    if (!this.isArabic) return category;
    const map: Record<string, string> = {
      'Programming': 'البرمجة والأدوات',
      'Technical Foundations': 'الأساسيات التقنية',
      'AI Foundations': 'أساسيات الذكاء الاصطناعي والتعلم العميق',
      'RAG & Retrieval': 'أنظمة RAG والاسترجاع الدلالي',
      'RAG & Knowledge Systems': 'أنظمة RAG والمعرفة',
      'Agents & LangGraph': 'الوكلاء الأذكياء و LangGraph',
      'Autonomous Agents & Workflows': 'الوكلاء الذاتيون ومسارات العمل',
      'Production & Cloud': 'البيئة الإنتاجية والحوسبة السحابية',
      'Production, Cloud & DevOps': 'الإنتاج والحوسبة و DevOps',
      'Evaluation & Observability': 'التقييم والقياس والمراقبة',
      'Portfolio & Capstone': 'المشاريع والملف الشخصي'
    };
    return map[category] || category;
  }

  toggleItem(id: string) {
    this.progressService.toggleChecklistItem(id);
  }

  resetChecklist() {
    if (confirm('Reset all verified checklist items?')) {
      this.progressService.resetAllProgress();
    }
  }

  getGroupCompletedCount(items: JobReadyItem[]): number {
    return items.filter(i => i.checked).length;
  }

  getGroupPct(items: JobReadyItem[]): number {
    if (items.length === 0) return 0;
    return Math.round((this.getGroupCompletedCount(items) / items.length) * 100);
  }

  private groupItems() {
    const categoryMap: { [cat: string]: { icon: string; items: JobReadyItem[] } } = {
      'Technical Foundations': { icon: 'fa-solid fa-code', items: [] },
      'RAG & Knowledge Systems': { icon: 'fa-solid fa-database', items: [] },
      'Autonomous Agents & Workflows': { icon: 'fa-solid fa-robot', items: [] },
      'Production, Cloud & DevOps': { icon: 'fa-solid fa-cloud', items: [] },
      'Evaluation & Observability': { icon: 'fa-solid fa-chart-line', items: [] }
    };

    for (const item of this.items) {
      if (categoryMap[item.category]) {
        categoryMap[item.category].items.push(item);
      } else {
        if (!categoryMap['General']) {
          categoryMap['General'] = { icon: 'fa-solid fa-list-check', items: [] };
        }
        categoryMap['General'].items.push(item);
      }
    }

    this.groupedItems = Object.keys(categoryMap).map(cat => ({
      category: cat,
      icon: categoryMap[cat].icon,
      items: categoryMap[cat].items
    }));
  }
}
