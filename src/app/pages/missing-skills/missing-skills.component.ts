import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MISSING_SKILLS } from '../../data/missing-skills.data';
import { MissingSkillItem, MissingGroup } from '../../models/missing-skills.model';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-missing-skills',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <div class="missing-skills-page py-5">
      <div class="container-xl">
        <!-- Hero Header -->
        <div class="text-center max-w-850 mx-auto mb-5">
          <span class="badge badge-subtle-danger font-monospace mb-2">
            {{ 'missingSkills.badge' | trans }}
          </span>
          <h1 class="text-white fw-bold display-6 mb-2">{{ 'missingSkills.title' | trans }}</h1>
          <p class="text-secondary lead fs-6 mb-4">
            {{ 'missingSkills.desc' | trans }}
          </p>

          <!-- Group Filter Tabs -->
          <div class="d-inline-flex p-1 rounded-pill group-tab-bar border">
            <button 
              *ngFor="let tab of tabs" 
              class="tab-btn font-monospace"
              [class.active]="selectedTab === tab.key"
              (click)="setTab(tab.key)"
            >
              {{ isArabic ? tab.labelAr : tab.label }}
              <span class="badge badge-tab-count ms-1 small">
                {{ getCountForTab(tab.key) }}
              </span>
            </button>
          </div>
        </div>

        <!-- Priority Callout Cards -->
        <div class="row g-4 mb-5">
          <div *ngFor="let item of filteredSkills" class="col-lg-6">
            <div class="gap-card p-4 rounded-4 h-100 d-flex flex-column border">
              <!-- Top Row: Badge, Priority Group, Category -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge badge-priority" [attr.data-priority]="item.group">
                  {{ item.group }}
                </span>
                <span class="badge badge-category small font-monospace">{{ item.category }}</span>
              </div>

              <!-- Title -->
              <h4 class="text-white fw-bold mb-2">{{ item.title }}</h4>

              <!-- Why It Matters -->
              <div class="mb-3">
                <span class="prop-label text-warning font-monospace">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i>{{ isArabic ? 'لماذا يعد هذا المفهوم حاسماً؟' : 'WHY IT MATTERS:' }}
                </span>
                <p class="small text-secondary mb-0 leading-relaxed">{{ item.whyItMatters }}</p>
              </div>

              <!-- Required Competence Level -->
              <div class="mb-3">
                <span class="prop-label text-cyan font-monospace">
                  <i class="fa-solid fa-bullseye me-1"></i>{{ isArabic ? 'المستوى المطلوب في بيئة العمل:' : 'LEVEL NEEDED FOR PRODUCTION:' }}
                </span>
                <p class="small text-light mb-0 leading-relaxed">{{ item.whatLevelNeeded }}</p>
              </div>

              <!-- External Study Scope -->
              <div class="scope-box p-3 rounded-3 mb-3 border">
                <span class="prop-label text-emerald font-monospace mb-2">
                  <i class="fa-solid fa-book-open-reader me-1"></i>{{ isArabic ? 'خطة الدراسة الذاتية المقترحة:' : 'WHAT TO STUDY EXTERNALLY:' }}
                </span>
                <ul class="list-unstyled small text-secondary mb-0 ps-1">
                  <li *ngFor="let step of item.suggestedScope" class="mb-1 d-flex align-items-baseline gap-2">
                    <i class="fa-solid fa-check text-info small"></i>
                    <span class="text-light">{{ step }}</span>
                  </li>
                </ul>
              </div>

              <!-- Course Coverage Reality Note -->
              <div class="mt-auto pt-2 border-top">
                <small class="text-secondary font-monospace d-block mb-1">{{ isArabic ? 'ملاحظة تغطية الكورسات:' : 'Course Coverage Note:' }}</small>
                <p class="small text-muted mb-0 leading-relaxed">{{ item.courseCoverageNote }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Callout Footer -->
        <div class="next-action-card p-4 rounded-4 border text-center max-w-850 mx-auto">
          <h5 class="text-white fw-bold mb-2">{{ isArabic ? 'جاهز لتقييم مستواك الوظيفي؟' : 'Ready to verify your readiness?' }}</h5>
          <p class="text-secondary small mb-3">
            {{ isArabic ? 'راجع معايير التوظيف الـ 21 للتحقق مما إذا كانت مهاراتك تلبي متطلبات الشركات لمهندسي الذكاء الاصطناعي.' : 'Review the 21-point hiring rubric to verify if your combined course study and external self-learning meet the bar for junior/mid-level AI engineering roles.' }}
          </p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a routerLink="/job-ready" class="btn btn-sm btn-primary-action">
              {{ 'hero.btnJobReady' | trans }} <i class="fa-solid fa-clipboard-check ms-1"></i>
            </a>
            <a routerLink="/roadmap" class="btn btn-sm btn-secondary-action">
              {{ 'nav.roadmap' | trans }} <i class="fa-solid fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .missing-skills-page {
      position: relative;
    }
    .max-w-850 { max-width: 850px; }
    .badge-subtle-danger {
      background: var(--error-bg);
      color: var(--error);
      border: 1px solid var(--error-border);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .group-tab-bar {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 0.8rem;
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn:hover {
      color: var(--text-primary);
    }
    .tab-btn.active {
      background: var(--primary);
      color: #fff;
      font-weight: 600;
      box-shadow: 0 2px 8px var(--primary-glow);
    }
    .badge-tab-count {
      background: var(--surface);
      color: var(--text-secondary);
    }
    .tab-btn.active .badge-tab-count {
      background: rgba(255, 255, 255, 0.25);
      color: #fff;
    }

    .gap-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .gap-card:hover {
      border-color: var(--border-hover) !important;
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .badge-priority {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      font-weight: 700;
      padding: 4px 9px;
      border-radius: var(--radius-sm);
    }
    .badge-priority[data-priority="Must Study"] {
      background: var(--error-bg);
      color: var(--error);
      border: 1px solid var(--error-border);
    }
    .badge-priority[data-priority="Recommended"] {
      background: var(--warning-bg);
      color: var(--warning);
      border: 1px solid var(--warning-border);
    }
    .badge-priority[data-priority="Advanced / Later"] {
      background: var(--info-bg);
      color: var(--info);
      border: 1px solid var(--info-border);
    }

    .badge-category {
      background: var(--surface);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .prop-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }
    .text-cyan { color: var(--accent-cyan) !important; }
    .text-emerald { color: var(--success) !important; }
    .scope-box {
      background: var(--surface);
      border-color: var(--border-subtle) !important;
    }
    .border-top {
      border-color: var(--border-subtle) !important;
    }
    .next-action-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
  `]
})
export class MissingSkillsComponent implements OnInit {
  skills: MissingSkillItem[] = MISSING_SKILLS;
  filteredSkills: MissingSkillItem[] = [];

  selectedTab: string = 'All';

  tabs = [
    { key: 'All', label: 'All Gap Areas', labelAr: 'كافة الفجوات' },
    { key: 'Must Study', label: 'Must Study (P0)', labelAr: 'دراسة إلزامية (P0)' },
    { key: 'Recommended', label: 'Recommended (P1)', labelAr: 'موصى بها (P1)' },
    { key: 'Advanced / Later', label: 'Advanced Scope (P2)', labelAr: 'نطاق متقدم (P2)' }
  ];

  constructor(public transService: TranslationService) {}

  get isArabic(): boolean {
    return this.transService.isRtl;
  }

  ngOnInit() {
    this.filteredSkills = [...this.skills];
  }

  setTab(tabKey: string) {
    this.selectedTab = tabKey;
    if (tabKey === 'All') {
      this.filteredSkills = [...this.skills];
    } else {
      this.filteredSkills = this.skills.filter(s => s.group === tabKey);
    }
  }

  getCountForTab(tabKey: string): number {
    if (tabKey === 'All') return this.skills.length;
    return this.skills.filter(s => s.group === tabKey).length;
  }
}
