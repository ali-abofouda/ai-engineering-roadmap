import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ENGLISH_STAGES, EnglishStage } from '../../data/english-roadmap.data';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <div class="languages-page py-4">
      <div class="container-xl">

        <!-- HERO HEADER -->
        <header class="languages-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ currentLang === 'ar' ? 'فص اللغات والتواصل' : 'Languages & Communication' }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">16 {{ currentLang === 'ar' ? 'محطة للطلاقة والتحدث' : 'Practical Milestones' }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">
                {{ currentLang === 'ar' ? 'رحلة إتقان الإنجليزية والطلاقة الواقعية' : 'English Fluency & Mastery Journey' }}
              </h1>
              <p class="hero-desc mb-0">
                {{ currentLang === 'ar' 
                  ? 'خارطة طريق عملية متدرجة من الصفر: كسر حاجز الخوف والتلعثم، التفكير التلقائي باللغة الإنجليزية، وفهم المتحدثين الأصليين دون ترجمة ذهنية.'
                  : 'A pragmatic milestone roadmap to master spoken English: eliminating mental translation, mastering connected speech, and building effortless conversational confidence.' }}
              </p>
            </div>

            <!-- Meter Box -->
            <div class="meter-box p-3">
              <div class="d-flex justify-content-between align-items-center gap-3 mb-2">
                <span class="meter-label fw-semibold">
                  <i class="fa-solid fa-headphones me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'مستوى الطلاقة' : 'Fluency Progress' }}
                </span>
                <span class="meter-pct font-monospace">{{ progressPercentage }}%</span>
              </div>
              <div class="custom-progress-track mb-2">
                <div class="custom-progress-fill" [style.width.%]="progressPercentage"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center small text-secondary font-monospace">
                <span>{{ completedStageIds.length }} / {{ stages.length }} {{ currentLang === 'ar' ? 'محطة منجزة' : 'completed' }}</span>
                <span class="text-muted">{{ stages.length - completedStageIds.length }} {{ currentLang === 'ar' ? 'متبقية' : 'remaining' }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- TOOLBAR -->
        <div class="languages-toolbar p-3 mb-4">
          <div class="row g-3 align-items-center">
            <div class="col-lg-6 col-md-7">
              <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <input 
                  type="text" 
                  class="form-control clean-search-input" 
                  [(ngModel)]="searchQuery" 
                  (input)="applyFilters()"
                  [placeholder]="currentLang === 'ar' ? 'ابحث عن مهارة، نطق، أداة، أو عادة...' : 'Search skill, habit, or tool...'"
                />
                <button *ngIf="searchQuery" class="btn-clear-search" (click)="searchQuery = ''; applyFilters()">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <div class="col-lg-6 col-md-5 d-flex justify-content-md-end justify-content-between align-items-center gap-2">
              <span class="counter-pill font-monospace">
                {{ filteredStages.length }} / {{ stages.length }} {{ currentLang === 'ar' ? 'محطة' : 'milestones' }}
              </span>
              <button *ngIf="searchQuery || selectedCategory !== 'All'" class="btn btn-sm btn-reset-pill" (click)="resetFilters()">
                <i class="fa-solid fa-rotate-left me-1"></i>{{ currentLang === 'ar' ? 'إعادة ضبط' : 'Reset' }}
              </button>
            </div>
          </div>

          <div class="category-pills-row mt-3 pt-2 border-top d-flex align-items-center gap-1">
            <button 
              *ngFor="let cat of categories" 
              class="category-pill"
              [class.active]="selectedCategory === cat.key"
              (click)="setCategory(cat.key)"
            >
              {{ currentLang === 'ar' ? cat.labelAr : cat.labelEn }}
            </button>
          </div>
        </div>

        <!-- STAGES GRID -->
        <div class="row g-3 mb-5">
          <div *ngFor="let stage of filteredStages" class="col-xl-4 col-md-6 col-12">
            <div class="stage-card h-100 p-3 p-md-4 d-flex flex-column" [class.is-done]="isDone(stage.id)">
              <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="id-badge font-monospace">{{ stage.id }}</span>
                  <span class="cat-pill">{{ stage.category }}</span>
                  <span class="diff-badge" [attr.data-diff]="stage.level">{{ stage.level }}</span>
                  <span class="text-muted small font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ stage.durationWeeks }}</span>
                </div>

                <button 
                  class="btn-done-check"
                  [class.checked]="isDone(stage.id)"
                  (click)="toggleDone($event, stage.id)"
                  [title]="isDone(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                >
                  <i class="fa-solid" [class.fa-check]="isDone(stage.id)" [class.fa-circle]="!isDone(stage.id)"></i>
                </button>
              </div>

              <h4 class="stage-title fw-bold mb-2" (click)="openDrawer(stage)">
                {{ currentLang === 'ar' ? stage.titleAr : stage.title }}
              </h4>
              <p class="stage-desc text-secondary small mb-3 flex-grow-1">
                {{ currentLang === 'ar' ? stage.taglineAr : stage.tagline }}
              </p>

              <!-- Daily habit preview -->
              <div class="habit-box p-2 rounded-2 mb-3">
                <div class="small fw-semibold text-pine mb-1">
                  <i class="fa-solid fa-calendar-check me-1"></i>{{ currentLang === 'ar' ? 'العادة اليومية:' : 'Daily Practice:' }}
                </div>
                <div class="small text-secondary">
                  {{ currentLang === 'ar' ? stage.dailyHabitAr : stage.dailyHabit }}
                </div>
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span *ngFor="let topic of stage.keyTopics.slice(0, 3)" class="topic-chip font-monospace">
                  {{ topic }}
                </span>
              </div>

              <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                <span class="done-status-text small font-monospace">
                  <i class="fa-solid" [class.fa-circle-check]="isDone(stage.id)" [class.fa-clock]="!isDone(stage.id)"></i>
                  {{ isDone(stage.id) ? (currentLang === 'ar' ? 'تم الإنجاز' : 'Completed') : (currentLang === 'ar' ? 'قيد التدريب' : 'In Progress') }}
                </span>

                <button class="btn btn-sm btn-inspect-stage" (click)="openDrawer(stage)">
                  <i class="fa-solid fa-circle-info me-1"></i>
                  <span>{{ currentLang === 'ar' ? 'الخطة والأدوات' : 'Plan & Tools' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SLIDE-OVER ENGLISH DRAWER -->
      <div *ngIf="selectedStage" class="stage-preview-backdrop" (click)="closeDrawer()">
        <div class="stage-preview-modal p-3 p-sm-4" (click)="$event.stopPropagation()">
          <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <span class="id-badge font-monospace">{{ selectedStage.id }}</span>
                <span class="cat-pill">{{ selectedStage.category }}</span>
                <span class="diff-badge" [attr.data-diff]="selectedStage.level">{{ selectedStage.level }}</span>
                <span class="text-muted small font-monospace">{{ selectedStage.durationWeeks }}</span>
              </div>
              <h3 class="fw-bold mb-1 drawer-heading">{{ currentLang === 'ar' ? selectedStage.titleAr : selectedStage.title }}</h3>
              <p class="text-secondary small mb-0">{{ currentLang === 'ar' ? selectedStage.taglineAr : selectedStage.tagline }}</p>
            </div>
            <button class="btn-close-drawer" (click)="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="preview-scroll-body">
            <div class="preview-box p-3 rounded-3 mb-4">
              <h6 class="fw-bold mb-2">
                <i class="fa-solid fa-bullseye text-pine me-2"></i>{{ currentLang === 'ar' ? 'الاستراتيجية الأساسية' : 'Core Strategy' }}
              </h6>
              <p class="text-secondary small mb-0 leading-relaxed">
                {{ currentLang === 'ar' ? selectedStage.coreStrategyAr : selectedStage.coreStrategy }}
              </p>
            </div>

            <div class="preview-box p-3 rounded-3 mb-4">
              <h6 class="fw-bold mb-2">
                <i class="fa-solid fa-calendar-check text-mint me-2"></i>{{ currentLang === 'ar' ? 'التطبيق العملي والعادة اليومية' : 'Daily Practice Habit' }}
              </h6>
              <p class="text-secondary small mb-0 leading-relaxed">
                {{ currentLang === 'ar' ? selectedStage.dailyHabitAr : selectedStage.dailyHabit }}
              </p>
            </div>

            <div class="preview-box p-3 rounded-3 mb-4">
              <h6 class="fw-bold mb-2">
                <i class="fa-solid fa-wrench text-pine me-2"></i>{{ currentLang === 'ar' ? 'أفضل الأدوات والمصادر الموصى بها' : 'Recommended Tools & Apps' }}
              </h6>
              <div class="d-flex flex-wrap gap-2">
                <span *ngFor="let tool of selectedStage.recommendedTools" class="topic-chip font-monospace">
                  <i class="fa-solid fa-arrow-up-right-from-square me-1 text-mint"></i>{{ tool }}
                </span>
              </div>
            </div>

            <div class="preview-box p-3 rounded-3 mb-4">
              <h6 class="fw-bold mb-2">
                <i class="fa-solid fa-list-check text-pine me-2"></i>{{ currentLang === 'ar' ? 'الموضوعات والمحاور' : 'Key Topics' }}
              </h6>
              <div class="d-flex flex-wrap gap-1">
                <span *ngFor="let topic of selectedStage.keyTopics" class="topic-chip font-monospace">#{{ topic }}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
            <button class="btn btn-sm btn-primary-clean" (click)="toggleDone($event, selectedStage.id)">
              <i class="fa-solid" [class.fa-check]="isDone(selectedStage.id)" [class.fa-plus]="!isDone(selectedStage.id)"></i>
              <span class="ms-1">{{ isDone(selectedStage.id) ? (currentLang === 'ar' ? 'تم الإنجاز ✓' : 'Completed ✓') : (currentLang === 'ar' ? 'تحديد كـ منجز' : 'Mark as Completed') }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .languages-page { position: relative; }
    .hero-kicker {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      font-size: 0.74rem; color: var(--text-secondary);
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-mint); box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
      display: inline-block;
    }
    .kicker-label { color: var(--primary); font-weight: 700; }
    .hero-title {
      font-size: 2.1rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .hero-desc {
      color: var(--text-secondary); font-size: 0.95rem; max-width: 680px;
      line-height: 1.6; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .meter-box {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md); min-width: 280px; box-shadow: var(--shadow-sm);
    }
    .meter-label { font-size: 0.82rem; color: var(--text-primary); }
    .meter-pct {
      font-size: 0.8rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); padding: 2px 8px; border-radius: var(--radius-sm);
    }
    .custom-progress-track {
      width: 100%; height: 6px; background: var(--surface-elevated);
      border-radius: 999px; overflow: hidden; border: 1px solid var(--border-subtle);
    }
    .custom-progress-fill {
      height: 100%; background: var(--brand-gradient);
      border-radius: 999px; transition: width 0.3s ease;
    }

    .languages-toolbar {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
    }
    .search-input-wrap {
      position: relative; display: flex; align-items: center;
    }
    .search-icon {
      position: absolute; inset-inline-start: 12px; color: var(--text-muted); font-size: 0.85rem;
    }
    .clean-search-input {
      padding-inline-start: 36px; padding-inline-end: 32px; height: 38px; font-size: 0.82rem;
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm); color: var(--text-primary);
    }
    .btn-clear-search {
      position: absolute; inset-inline-end: 10px; background: transparent; border: none; color: var(--text-muted);
    }
    .counter-pill {
      font-size: 0.74rem; color: var(--text-muted); background: var(--surface-elevated);
      border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 999px;
    }
    .btn-reset-pill {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.74rem; padding: 4px 10px;
      border-radius: var(--radius-sm); cursor: pointer;
    }
    .category-pills-row {
      overflow-x: auto; scrollbar-width: thin; padding-bottom: 2px;
    }
    .category-pill {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.74rem; padding: 4px 12px;
      border-radius: 999px; cursor: pointer; white-space: nowrap; transition: all 0.15s ease;
    }
    .category-pill.active {
      background: var(--primary-subtle); border-color: var(--primary);
      color: var(--primary); font-weight: 700;
    }

    /* STAGE CARD */
    .stage-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); transition: all 0.2s ease; box-shadow: var(--shadow-sm);
    }
    .stage-card:hover {
      border-color: var(--border-hover); box-shadow: var(--shadow-md); transform: translateY(-2px);
    }
    .stage-card.is-done {
      border-inline-start: 3px solid var(--accent-mint);
    }
    .id-badge {
      font-size: 0.72rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); border: 1px solid rgba(21, 82, 57, 0.2);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .cat-pill {
      font-size: 0.68rem; background: var(--surface-elevated); color: var(--text-secondary);
      border: 1px solid var(--border-subtle); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .diff-badge {
      font-size: 0.66rem; padding: 2px 6px; border-radius: var(--radius-sm);
      background: var(--surface-elevated); border: 1px solid var(--border-subtle); font-weight: 600;
    }
    .diff-badge[data-diff="Beginner"] { border-color: var(--success-border); color: var(--primary); }
    .diff-badge[data-diff="Intermediate"] { border-color: var(--warning-border); color: var(--warning); }
    .diff-badge[data-diff="Advanced"] { border-color: var(--error-border); color: var(--error); }

    .btn-done-check {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-muted); width: 28px; height: 28px; display: grid;
      place-items: center; border-radius: 50%; cursor: pointer; transition: all 0.15s ease;
    }
    .btn-done-check.checked {
      background: var(--primary); border-color: var(--accent-mint); color: #FFFFFF;
    }
    .stage-title {
      font-size: 1.1rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
      cursor: pointer; transition: color 0.15s ease;
    }
    .stage-title:hover { color: var(--primary); }
    .habit-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }
    .topic-chip {
      font-size: 0.68rem; background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .done-status-text { color: var(--text-muted); }
    .stage-card.is-done .done-status-text { color: var(--primary); font-weight: 600; }
    .btn-inspect-stage {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.75rem; padding: 4px 10px;
      border-radius: var(--radius-sm); cursor: pointer; font-weight: 600; transition: all 0.15s ease;
    }
    .btn-inspect-stage:hover {
      border-color: var(--primary); color: var(--primary); background: var(--surface-hover);
    }

    /* DRAWER */
    .stage-preview-backdrop {
      position: fixed; inset: 0; background: rgba(17, 24, 39, 0.45);
      backdrop-filter: blur(4px); z-index: 1060; display: flex; justify-content: flex-end;
    }
    .stage-preview-modal {
      width: 100%; max-width: 680px; height: 100vh; background: var(--surface-card);
      border-inline-start: 1px solid var(--border-subtle); display: flex;
      flex-direction: column; box-shadow: var(--shadow-lg);
    }
    .drawer-heading {
      color: var(--text-primary); font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .btn-close-drawer {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); width: 32px; height: 32px; display: grid;
      place-items: center; border-radius: var(--radius-sm);
    }
    .preview-scroll-body {
      overflow-y: auto; scrollbar-width: thin; padding-inline-end: 4px; flex-grow: 1;
    }
    .preview-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }
    .text-pine { color: var(--primary) !important; }
    .text-mint { color: var(--accent-mint) !important; }
    .btn-action-subtle {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.75rem; padding: 6px 12px; border-radius: var(--radius-sm);
    }
    .btn-primary-clean {
      background: var(--primary); border: 1px solid var(--primary);
      color: #FFFFFF !important; font-size: 0.78rem; font-weight: 600;
      padding: 6px 14px; border-radius: var(--radius-sm); cursor: pointer;
    }
  `]
})
export class LanguagesComponent implements OnInit {
  stages: EnglishStage[] = ENGLISH_STAGES;
  filteredStages: EnglishStage[] = [];
  selectedStage: EnglishStage | null = null;
  completedStageIds: string[] = [];

  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    { key: 'All', labelEn: 'All Milestones', labelAr: 'كافة المحطات' },
    { key: 'Phonetics', labelEn: 'Phonetics & IPA', labelAr: 'الأصوات ومخارج الحروف' },
    { key: 'Pronunciation', labelEn: 'Rhythm & Stress', labelAr: 'الإيقاع والنبر' },
    { key: 'Vocabulary', labelEn: 'Chunks & Collocations', labelAr: 'المتلازمات اللفظية' },
    { key: 'Grammar', labelEn: 'Sentence Instinct', labelAr: 'بناء الجمل التلقائي' },
    { key: 'Fluency', labelEn: 'Thinking in English', labelAr: 'الطلاقة والتفكير' },
    { key: 'Speaking', labelEn: 'Daily Conversation', labelAr: 'المحادثة اليومية' },
    { key: 'Listening', labelEn: 'Connected Speech', labelAr: 'الكلام السريع المتصل' },
    { key: 'Professional', labelEn: 'Professional Tech', labelAr: 'الإنجليزية المهنية' }
  ];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.loadProgress();
    this.filteredStages = [...this.stages];
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  get progressPercentage(): number {
    if (this.stages.length === 0) return 0;
    return Math.round((this.completedStageIds.length / this.stages.length) * 100);
  }

  loadProgress() {
    try {
      const data = localStorage.getItem('roadmap_english_completed');
      this.completedStageIds = data ? JSON.parse(data) : [];
    } catch {
      this.completedStageIds = [];
    }
  }

  toggleDone(event: Event, stageId: string) {
    event.stopPropagation();
    if (this.completedStageIds.includes(stageId)) {
      this.completedStageIds = this.completedStageIds.filter(id => id !== stageId);
    } else {
      this.completedStageIds = [...this.completedStageIds, stageId];
    }
    localStorage.setItem('roadmap_english_completed', JSON.stringify(this.completedStageIds));
  }

  isDone(stageId: string): boolean {
    return this.completedStageIds.includes(stageId);
  }

  openDrawer(stage: EnglishStage) {
    this.selectedStage = stage;
  }

  closeDrawer() {
    this.selectedStage = null;
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.applyFilters();
  }

  applyFilters() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredStages = this.stages.filter(s => {
      const matchCat = this.selectedCategory === 'All' || s.category === this.selectedCategory;
      const matchSearch = !q || (
        s.title.toLowerCase().includes(q) ||
        s.titleAr.includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.keyTopics.some(t => t.toLowerCase().includes(q))
      );
      return matchCat && matchSearch;
    });
  }
}
