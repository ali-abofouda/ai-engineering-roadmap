import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PROJECTS_DATA } from '../../data/projects.data';
import { ProjectItem, ProjectDifficulty } from '../../models/project.model';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="projects-page py-5">
      <div class="container-xl">
        <!-- Page Header -->
        <div class="projects-hero text-center max-w-750 mx-auto mb-5">
          <span class="badge badge-subtle-primary font-monospace mb-2">
            {{ 'projects.badge' | trans }}
          </span>
          <h1 class="text-white fw-bold display-6 mb-2">{{ 'projects.title' | trans }}</h1>
          <p class="text-secondary lead fs-6 mb-4">
            {{ 'projects.desc' | trans }}
          </p>

          <!-- Difficulty Filter Tabs -->
          <div class="d-inline-flex p-1 rounded-pill diff-tab-bar border">
            <button 
              *ngFor="let tab of difficultyTabs" 
              class="tab-btn font-monospace"
              [class.active]="selectedTab === tab"
              (click)="setTab(tab)"
            >
              {{ getTabLabel(tab) }}
              <span class="badge badge-tab-count ms-1 small">
                {{ getCountForTab(tab) }}
              </span>
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="row g-4">
          <div *ngFor="let project of filteredProjects" class="col-lg-6">
            <div class="project-card p-4 rounded-4 h-100 d-flex flex-column border">
              <!-- Top Row: Badge, Difficulty, Category -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="course-badge" [attr.data-course]="project.badge">
                  {{ project.badge }}
                </span>
                <div class="d-flex align-items-center gap-2">
                  <span class="diff-badge" [attr.data-diff]="project.difficulty">{{ project.difficulty }}</span>
                  <span class="badge badge-cat small font-monospace">{{ project.category }}</span>
                </div>
              </div>

              <!-- Title & Summary -->
              <h4 class="text-white fw-bold mb-2">{{ project.title }}</h4>
              <p class="text-secondary small leading-relaxed mb-3">{{ project.summary }}</p>

              <!-- Technologies Used -->
              <div class="mb-3">
                <small class="text-secondary font-monospace d-block mb-1">{{ isArabic ? 'التقنيات المستخدمة:' : 'Technologies:' }}</small>
                <div class="d-flex flex-wrap gap-1">
                  <span *ngFor="let tech of project.technologies" class="tech-chip">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- What You Learn -->
              <div class="learn-box p-3 rounded-3 mb-3 border">
                <span class="concept-label text-cyan font-monospace mb-1">
                  <i class="fa-solid fa-graduation-cap me-1"></i>{{ isArabic ? 'المخرجات التعليمية الأساسية:' : 'CORE LEARNING OUTCOMES:' }}
                </span>
                <ul class="list-unstyled small text-secondary mb-0 ps-1">
                  <li *ngFor="let outcome of project.whatYouLearn" class="mb-1 d-flex align-items-baseline gap-2">
                    <i class="fa-solid fa-check text-info small"></i>
                    <span class="text-light">{{ outcome }}</span>
                  </li>
                </ul>
              </div>

              <!-- Architecture Pipeline Steps -->
              <div class="arch-box p-3 rounded-3 mb-3 border">
                <span class="concept-label text-cyan font-monospace mb-1">
                  <i class="fa-solid fa-network-wired me-1"></i>{{ isArabic ? 'تدفق المعمارية البرمجية:' : 'SYSTEM ARCHITECTURE FLOW:' }}
                </span>
                <div class="steps-flow d-flex flex-wrap gap-1 align-items-center small">
                  <ng-container *ngFor="let step of project.architectureSteps; let last = last">
                    <span class="step-chip text-light">{{ step }}</span>
                    <i *ngIf="!last" class="fa-solid fa-arrow-right text-secondary small mx-1"></i>
                  </ng-container>
                </div>
              </div>

              <!-- Expected Outcome & Actions -->
              <div class="outcome-box mt-auto pt-3 border-top">
                <div class="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-3">
                  <div>
                    <small class="text-emerald font-monospace fw-bold d-block">
                      <i class="fa-solid fa-trophy me-1"></i>{{ isArabic ? 'المخرج العملي النهائي:' : 'Deliverable Outcome:' }}
                    </small>
                    <p class="small text-secondary mb-0 leading-relaxed">{{ project.expectedOutcome }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary-action">
                    <i class="fa-brands fa-github me-1"></i>{{ isArabic ? 'مستودع الكود' : 'View Code Repo' }}
                  </a>
                  <button class="btn btn-sm btn-primary-action" (click)="alertArchitecture(project.title)">
                    <i class="fa-solid fa-diagram-project me-1"></i>{{ isArabic ? 'مخطط المعمارية' : 'View Pipeline Spec' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .projects-page {
      position: relative;
    }
    .max-w-750 { max-width: 750px; }
    .badge-subtle-primary {
      background: var(--course-1-bg);
      color: var(--primary-light);
      border: 1px solid rgba(99, 102, 241, 0.3);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .diff-tab-bar {
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

    .project-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .project-card:hover {
      border-color: var(--border-hover) !important;
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .diff-badge {
      font-size: 0.68rem;
      padding: 2px 7px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      background: var(--surface);
    }
    .diff-badge[data-diff="Beginner"] { border-color: var(--success-border); color: var(--success); }
    .diff-badge[data-diff="Intermediate"] { border-color: var(--warning-border); color: var(--warning); }
    .diff-badge[data-diff="Advanced"] { border-color: var(--error-border); color: var(--error); }

    .badge-cat {
      background: var(--surface);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .learn-box, .arch-box {
      background: var(--surface);
      border-color: var(--border-subtle) !important;
    }
    .concept-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: block;
    }
    .text-cyan { color: var(--accent-cyan) !important; }
    .text-purple { color: var(--accent-violet) !important; }
    .text-emerald { color: var(--success) !important; }

    .step-chip {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
    }
    .outcome-box {
      border-color: var(--border-subtle) !important;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: ProjectItem[] = PROJECTS_DATA;
  filteredProjects: ProjectItem[] = [];

  selectedTab: string = 'All';
  difficultyTabs: string[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.filteredProjects = [...this.projects];
  }

  setTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(p => p.difficulty === tab);
    }
  }

  get isArabic(): boolean {
    return this.transService.isRtl;
  }

  getTabLabel(tab: string): string {
    if (!this.isArabic) return tab;
    switch (tab) {
      case 'All': return 'الكل';
      case 'Beginner': return 'مبتدئ';
      case 'Intermediate': return 'متوسط';
      case 'Advanced': return 'متقدم';
      default: return tab;
    }
  }

  getCountForTab(tab: string): number {
    if (tab === 'All') return this.projects.length;
    return this.projects.filter(p => p.difficulty === tab).length;
  }

  alertArchitecture(title: string) {
    const msg = this.isArabic
      ? `مخطط المعمارية لمشروع "${title}":\nيشتمل هذا المشروع الرئيسي على الشفرة البرمجية الكاملة، واختبارات الجودة، وملفات الحاويات (Docker) الجاهزة للنشر.`
      : `Architecture Pipeline Spec for "${title}":\nThis flagship project contains full source code, benchmark verification curves, and Dockerfile deployment recipes.`;
    alert(msg);
  }
}
