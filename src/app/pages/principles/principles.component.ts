import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface PrincipleItem {
  id: string;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  category: string;
  coreRuleEn: string;
  coreRuleAr: string;
  elaborationEn: string;
  elaborationAr: string;
  actionableHabitEn: string;
  actionableHabitAr: string;
  favoriteQuote?: string;
  quoteAuthor?: string;
}

@Component({
  selector: 'app-principles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <div class="principles-page py-4">
      <div class="container-xl">

        <!-- HERO HEADER -->
        <header class="principles-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ currentLang === 'ar' ? 'سجل الأفكار والمبادئ' : 'Thoughts & Principles' }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">{{ principles.length }} {{ currentLang === 'ar' ? 'قواعد تشغيل شخصية' : 'Operating Principles' }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">
                {{ currentLang === 'ar' ? 'قواعد التشغيل ومبادئ اتخاذ القرار' : 'Operating Rules & Life Principles' }}
              </h1>
              <p class="hero-desc mb-0">
                {{ currentLang === 'ar' 
                  ? 'المعايير والنماذج الذهنية التي أسترشد بها في إدارة طاقتي، اتخاذ القرارات المصيرية، والتعامل مع الإحباط والنجاح والشكوك اليومية.'
                  : 'The mental operating system and hard-won heuristics that guide my decisions, preserve cognitive focus, and govern personal discipline.' }}
              </p>
            </div>

            <!-- Stats Badge -->
            <div class="stats-badge-card p-3">
              <div class="d-flex align-items-center gap-3">
                <div class="icon-crest font-monospace"><i class="fa-solid fa-compass text-mint"></i></div>
                <div>
                  <div class="small text-secondary">{{ currentLang === 'ar' ? 'دستور التفكير' : 'Thinking Compass' }}</div>
                  <div class="fw-bold font-monospace text-pine">{{ categories.length - 1 }} {{ currentLang === 'ar' ? 'محاور عقلية' : 'Pillars' }}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- TOOLBAR -->
        <div class="principles-toolbar p-3 mb-4">
          <div class="category-pills-row d-flex align-items-center gap-1">
            <button 
              *ngFor="let cat of categories" 
              class="category-pill"
              [class.active]="selectedCategory === cat.key"
              (click)="selectedCategory = cat.key; applyFilters()"
            >
              {{ currentLang === 'ar' ? cat.labelAr : cat.labelEn }}
            </button>
          </div>
        </div>

        <!-- PRINCIPLES ACCORDION / GRID -->
        <!-- EMPTY STATE BOX -->
        <div *ngIf="filteredPrinciples.length === 0" class="empty-state-box text-center p-5 rounded-4 my-4">
          <div class="empty-icon-circle mb-3 mx-auto">
            <i class="fa-solid fa-compass"></i>
          </div>
          <h4 class="fw-bold mb-2">{{ currentLang === 'ar' ? 'القسم فارغ حالياً' : 'This Section is Currently Empty' }}</h4>
          <p class="text-secondary mb-0 max-w-500 mx-auto">
            {{ currentLang === 'ar' 
              ? 'هذا القسم محفوظ ومخصص لمبادئ التفكير وقواعد التشغيل ومجهز بالكامل لإضافة مبادئك الخاصة.' 
              : 'This section is reserved for your operating principles, ready for your core guidelines and mental models.' }}
          </p>
        </div>

        <!-- PRINCIPLES GRID -->
        <div *ngIf="filteredPrinciples.length > 0" class="row g-3 mb-5">
          <div *ngFor="let p of filteredPrinciples" class="col-lg-6 col-12">
            <div class="principle-card h-100 p-3 p-md-4 d-flex flex-column">
              <!-- Top Row -->
              <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="num-badge font-monospace">{{ p.numberStr }}</span>
                  <span class="cat-pill">{{ p.category }}</span>
                </div>
              </div>

              <!-- Title & Core Rule -->
              <h4 class="principle-title fw-bold mb-2">
                {{ currentLang === 'ar' ? p.titleAr : p.titleEn }}
              </h4>
              <p class="principle-rule fw-semibold text-pine mb-3">
                "{{ currentLang === 'ar' ? p.coreRuleAr : p.coreRuleEn }}"
              </p>

              <!-- Elaboration -->
              <p class="principle-elaboration text-secondary small mb-3 flex-grow-1">
                {{ currentLang === 'ar' ? p.elaborationAr : p.elaborationEn }}
              </p>

              <!-- Actionable Habit -->
              <div class="habit-box p-3 rounded-2 mb-3">
                <div class="small fw-semibold text-pine mb-1">
                  <i class="fa-solid fa-bolt me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'التطبيق العملي في الواقع:' : 'Actionable Heuristic:' }}
                </div>
                <div class="small text-secondary">
                  {{ currentLang === 'ar' ? p.actionableHabitAr : p.actionableHabitEn }}
                </div>
              </div>

              <!-- Quote if available -->
              <div *ngIf="p.favoriteQuote" class="quote-strip p-2 rounded-2 fst-italic small text-muted border-top pt-2">
                "{{ p.favoriteQuote }}" — <span class="fw-semibold">{{ p.quoteAuthor }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .principles-page { position: relative; }
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
    .stats-badge-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md); min-width: 220px; box-shadow: var(--shadow-sm);
    }
    .icon-crest {
      width: 40px; height: 40px; border-radius: var(--radius-sm);
      background: var(--primary-subtle); display: grid; place-items: center;
      font-size: 1.1rem;
    }

    .principles-toolbar {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
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

    /* PRINCIPLE CARD */
    .principle-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); transition: all 0.2s ease; box-shadow: var(--shadow-sm);
    }
    .principle-card:hover {
      border-color: var(--border-hover); box-shadow: var(--shadow-md); transform: translateY(-2px);
    }
    .num-badge {
      font-size: 0.72rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); border: 1px solid rgba(21, 82, 57, 0.2);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .cat-pill {
      font-size: 0.68rem; background: var(--surface-elevated); color: var(--text-secondary);
      border: 1px solid var(--border-subtle); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .principle-title {
      font-size: 1.2rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .principle-rule {
      font-size: 0.95rem; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .text-pine { color: var(--primary) !important; }
    .text-mint { color: var(--accent-mint) !important; }
    .principle-elaboration {
      line-height: 1.65; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .habit-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }
    .empty-state-box {
      background: var(--surface-card);
      border: 1px dashed var(--border-subtle);
    }
    .empty-icon-circle {
      width: 64px; height: 64px; border-radius: 50%;
      background: var(--primary-subtle); color: var(--primary);
      display: grid; place-items: center; font-size: 1.6rem;
    }
  `]
})
export class PrinciplesComponent implements OnInit {
  selectedCategory = 'All';

  categories = [
    { key: 'All', labelEn: 'All Principles', labelAr: 'كافة المبادئ' },
    { key: 'Focus', labelEn: 'Focus & Energy', labelAr: 'التركيز وإدارة الطاقة' },
    { key: 'Thinking', labelEn: 'Mental Models', labelAr: 'النماذج الذهنية' },
    { key: 'Stoicism', labelEn: 'Stoicism & Calm', labelAr: 'الرواقية والسكينة' },
    { key: 'Execution', labelEn: 'Execution & Systems', labelAr: 'التنفيذ والأنظمة' }
  ];

  principles: PrincipleItem[] = [];

  filteredPrinciples: PrincipleItem[] = [];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.filteredPrinciples = [...this.principles];
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  applyFilters() {
    if (this.selectedCategory === 'All') {
      this.filteredPrinciples = [...this.principles];
    } else {
      this.filteredPrinciples = this.principles.filter(p => p.category === this.selectedCategory);
    }
  }
}
