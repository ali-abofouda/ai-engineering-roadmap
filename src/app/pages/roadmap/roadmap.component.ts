import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROADMAP_STAGES } from '../../data/roadmap.data';
import { RoadmapStage } from '../../models/roadmap.model';
import { ProgressService } from '../../services/progress.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { RagDiagramComponent } from '../../components/rag-diagram/rag-diagram.component';
import { AgentDiagramComponent } from '../../components/agent-diagram/agent-diagram.component';
import { EvalBenchmarkComponent } from '../../components/eval-benchmark/eval-benchmark.component';
import { Subscription } from 'rxjs';

export interface RoadmapPhase {
  id: number;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  category: string;
  icon: string;
  durationWeeks: string;
  stageIds: string[];
}

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    TranslatePipe,
    RagDiagramComponent, 
    AgentDiagramComponent, 
    EvalBenchmarkComponent
  ],
  template: `
    <div class="roadmap-page py-4">
      <div class="container-xl">

        <!-- ============================================================= -->
        <!-- CLEAN AIRY HEADER & REAL PROGRESS METER                       -->
        <!-- ============================================================= -->
        <header class="roadmap-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div class="hero-text-block">
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ currentLang === 'ar' ? 'الخريطة الذهنية للتعلم' : 'The Learning Mind Map' }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">{{ stages.length }} {{ currentLang === 'ar' ? 'عقدة ومحطة متصلة' : 'Connected Nodes' }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">
                {{ currentLang === 'ar' ? 'الخريطة الذهنية ومسار المعرفة' : 'The Mind Map & Knowledge Path' }}
              </h1>
              <p class="hero-desc mb-0">
                {{ currentLang === 'ar'
                  ? 'خارطة ذهنية بصرية مترابطة توثق رحلة بناء المعرفة من بايثون والشبكات العصبية إلى نماذج اللغة، أنظمة الـ RAG، والوكلاء الأذكياء.'
                  : 'A visual connected node tree documenting the cognitive learning path from Python fundamentals to transformers, production RAG, and autonomous agents.' }}
              </p>
            </div>

            <!-- Integrated Linear Progress Box -->
            <div class="progress-box p-3">
              <div class="d-flex justify-content-between align-items-center gap-3 mb-2">
                <span class="progress-label fw-semibold">
                  <i class="fa-solid fa-list-check me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'مستوى تقدم الخريطة' : 'Mind Map Progress' }}
                </span>
                <span class="progress-pct-badge font-monospace">{{ progressPercentage }}%</span>
              </div>
              <div class="custom-progress-track mb-2">
                <div class="custom-progress-fill" [style.width.%]="progressPercentage"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center small text-secondary font-monospace">
                <span>{{ completedStageIds.length }} / {{ stages.length }} {{ 'roadmap.completed' | trans }}</span>
                <span class="text-muted">{{ stages.length - completedStageIds.length }} {{ currentLang === 'ar' ? 'متبقية' : 'remaining' }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- ============================================================= -->
        <!-- HORIZONTAL PHASE JUMP RIBBON                                  -->
        <!-- ============================================================= -->
        <nav class="phase-ribbon-card p-2 p-md-3 mb-4" aria-label="Phase navigation">
          <div class="d-flex justify-content-between align-items-center mb-2 px-1 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="ribbon-title font-monospace fw-bold text-uppercase">
                {{ 'roadmap.quickJump' | trans }}
              </span>
              <span class="text-muted small">·</span>
              <span class="text-secondary small">8 {{ currentLang === 'ar' ? 'فصول متسلسلة' : 'Connected Chapters' }}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-action-subtle" (click)="expandAllPhases()">
                <i class="fa-solid fa-angles-down me-1"></i>{{ 'roadmap.expandAll' | trans }}
              </button>
              <button class="btn btn-sm btn-action-subtle" (click)="collapseAllPhases()">
                <i class="fa-solid fa-angles-up me-1"></i>{{ 'roadmap.collapseAll' | trans }}
              </button>
            </div>
          </div>

          <div class="phase-ribbon-scroll d-flex align-items-center gap-2">
            <button 
              *ngFor="let p of phases" 
              class="phase-ribbon-chip d-flex align-items-center gap-2"
              [class.completed]="getPhaseProgressPct(p) === 100"
              (click)="scrollToPhase(p.id)"
            >
              <span class="chip-num font-monospace">{{ p.numberStr }}</span>
              <span class="chip-name text-truncate">{{ currentLang === 'ar' ? p.titleAr : p.titleEn }}</span>
              <span *ngIf="getPhaseProgressPct(p) === 100" class="chip-check text-mint">
                <i class="fa-solid fa-circle-check"></i>
              </span>
              <span *ngIf="getPhaseProgressPct(p) < 100" class="chip-pct font-monospace">
                {{ getPhaseProgressPct(p) }}%
              </span>
            </button>
          </div>
        </nav>

        <!-- ============================================================= -->
        <!-- STREAMLINED TOOLBAR: SEARCH & CATEGORY PILLS                  -->
        <!-- ============================================================= -->
        <div class="roadmap-toolbar p-3 mb-4">
          <div class="row g-3 align-items-center">
            <!-- Search Input -->
            <div class="col-lg-6 col-md-7">
              <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <input 
                  type="text" 
                  class="form-control clean-search-input" 
                  [(ngModel)]="searchQuery" 
                  (input)="applyFilters()"
                  [placeholder]="'roadmap.filterPlaceholder' | trans"
                />
                <button 
                  *ngIf="searchQuery" 
                  class="btn-clear-search" 
                  (click)="searchQuery = ''; applyFilters()"
                  title="Clear"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <!-- Stage Count & Quick Reset -->
            <div class="col-lg-6 col-md-5 d-flex justify-content-md-end justify-content-between align-items-center gap-2">
              <span class="stage-counter-pill font-monospace">
                {{ filteredStages.length }} / {{ stages.length }} {{ 'roadmap.stagesWord' | trans }}
              </span>
              <button 
                *ngIf="searchQuery || selectedCategory !== 'All'" 
                class="btn btn-sm btn-reset-pill" 
                (click)="resetFilters()"
              >
                <i class="fa-solid fa-rotate-left me-1"></i>{{ 'roadmap.reset' | trans }}
              </button>
            </div>
          </div>

          <!-- Category Filter Pills Track -->
          <div class="category-pills-row mt-3 pt-2 border-top d-flex align-items-center gap-1">
            <button 
              *ngFor="let cat of categoryFilters" 
              class="category-pill"
              [class.active]="selectedCategory === cat.key"
              (click)="setCategory(cat.key)"
            >
              {{ cat.label | trans }}
            </button>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div *ngIf="filteredStages.length === 0" class="empty-state-card text-center py-5 my-4">
          <div class="empty-icon-wrap mb-3">
            <i class="fa-solid fa-filter fa-2x text-muted"></i>
          </div>
          <h4 class="fw-bold mb-2">{{ 'roadmap.noMatches' | trans }}</h4>
          <p class="text-secondary small mb-3">
            {{ currentLang === 'ar' ? 'جرب تغيير كلمة البحث أو اختيار تصنيف آخر.' : 'Try adjusting your search query or selecting another category.' }}
          </p>
          <button class="btn btn-sm btn-primary-clean" (click)="resetFilters()">
            {{ 'roadmap.clearFilters' | trans }}
          </button>
        </div>

        <!-- ============================================================= -->
        <!-- CONNECTED NODE MIND MAP FLOW                                  -->
        <!-- ============================================================= -->
        <div *ngIf="filteredStages.length > 0" class="flow-view-wrapper">
          <section 
            *ngFor="let phase of visiblePhases; let pIdx = index" 
            [id]="'phase-milestone-' + phase.id" 
            class="phase-section mb-5"
          >
            <!-- Phase Chapter Banner -->
            <div class="phase-chapter-header p-3 p-md-4 mb-4" [class.collapsed]="!isPhaseExpanded(phase.id)">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="phase-number-crest font-monospace">
                    {{ phase.numberStr }}
                  </div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <span class="phase-badge font-monospace">{{ 'roadmap.phasePrefix' | trans }} {{ phase.numberStr }}</span>
                      <span class="phase-cat-pill">{{ phase.category }}</span>
                      <span class="phase-duration font-monospace">
                        <i class="fa-regular fa-clock me-1"></i>{{ phase.durationWeeks }}
                      </span>
                    </div>
                    <h3 class="phase-title fw-bold mb-1">
                      {{ currentLang === 'ar' ? phase.titleAr : phase.titleEn }}
                    </h3>
                    <p class="phase-desc text-secondary small mb-0">
                      {{ currentLang === 'ar' ? phase.descAr : phase.descEn }}
                    </p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-shrink-0 align-self-md-center align-self-end">
                  <div class="phase-meter text-md-end">
                    <div class="d-flex align-items-center gap-2 justify-content-md-end mb-1">
                      <span class="small font-monospace text-secondary">
                        {{ getPhaseCompletedCount(phase) }}/{{ getPhaseStages(phase).length }} {{ 'roadmap.completed' | trans }}
                      </span>
                      <span class="phase-pct-badge font-monospace" [class.done]="getPhaseProgressPct(phase) === 100">
                        {{ getPhaseProgressPct(phase) }}%
                      </span>
                    </div>
                    <div class="phase-progress-track">
                      <div class="phase-progress-bar" [style.width.%]="getPhaseProgressPct(phase)"></div>
                    </div>
                  </div>

                  <button 
                    class="btn-phase-toggle" 
                    (click)="togglePhase(phase.id)" 
                    [title]="isPhaseExpanded(phase.id) ? ('roadmap.collapseAll' | trans) : ('roadmap.expandAll' | trans)"
                  >
                    <i class="fa-solid" [class.fa-chevron-up]="isPhaseExpanded(phase.id)" [class.fa-chevron-down]="!isPhaseExpanded(phase.id)"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Connected Nodes Stream -->
            <div *ngIf="isPhaseExpanded(phase.id)" class="nodes-stream-container">
              <div class="spine-line"></div>

              <div class="stages-stream">
                <article 
                  *ngFor="let stage of getPhaseStages(phase)" 
                  class="stage-node-item"
                  [class.is-completed]="isCompleted(stage.id)"
                >
                  <button 
                    type="button"
                    class="node-pin-btn"
                    [class.completed]="isCompleted(stage.id)"
                    (click)="toggleCompletion($event, stage.id)"
                    [title]="isCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                  >
                    <i *ngIf="isCompleted(stage.id)" class="fa-solid fa-check"></i>
                    <span *ngIf="!isCompleted(stage.id)" class="pin-number font-monospace">{{ stage.id }}</span>
                  </button>

                  <div class="node-branch-line"></div>

                  <div class="node-card-body p-3 p-md-4">
                    <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="stage-code font-monospace">{{ 'roadmap.stagePrefix' | trans }} {{ stage.id }}</span>
                        <span class="stage-tag">{{ stage.category }}</span>
                        <span class="stage-diff" [attr.data-diff]="stage.difficulty">{{ stage.difficulty }}</span>
                        <span class="stage-time font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ stage.durationWeeks }}</span>
                        <span *ngIf="hasInteractiveDiagram(stage.id)" class="stage-diagram-pill font-monospace">
                          <i class="fa-solid fa-diagram-project me-1"></i>Diagram
                        </span>
                      </div>

                      <button 
                        class="btn-stage-checkbox"
                        [class.checked]="isCompleted(stage.id)"
                        (click)="toggleCompletion($event, stage.id)"
                        [title]="isCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                      >
                        <i class="fa-solid" [class.fa-check]="isCompleted(stage.id)" [class.fa-circle]="!isCompleted(stage.id)"></i>
                      </button>
                    </div>

                    <h4 class="node-title fw-bold mb-2">
                      <a [routerLink]="['/stage', stage.id]" class="node-title-link">
                        {{ stage.title }}
                      </a>
                    </h4>
                    <p class="node-desc text-secondary small mb-3">
                      {{ stage.tagline }}
                    </p>

                    <div class="d-flex flex-wrap align-items-center gap-1 mb-3">
                      <span *ngFor="let tool of stage.tools.slice(0, 4)" class="node-tool-chip font-monospace">
                        {{ tool }}
                      </span>
                      <span *ngIf="stage.tools.length > 4" class="node-tool-chip text-muted font-monospace">
                        +{{ stage.tools.length - 4 }}
                      </span>
                    </div>

                    <div class="node-footer pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <div class="d-flex align-items-center gap-1">
                        <span *ngFor="let c of stage.courseSources.slice(0, 2)" class="node-course-tag">
                          {{ c }}
                        </span>
                      </div>

                      <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-quick-inspect" (click)="openPreview(stage)">
                          <i class="fa-regular fa-eye me-1"></i>
                          <span>{{ currentLang === 'ar' ? 'نظرة سريعة' : 'Quick View' }}</span>
                        </button>

                        <a [routerLink]="['/stage', stage.id]" class="btn btn-sm btn-deep-dive-clean">
                          <span>{{ currentLang === 'ar' ? 'الشرح المفصل' : 'Deep Dive' }}</span>
                          <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- Waypoint Bridge -->
            <div *ngIf="pIdx < visiblePhases.length - 1" class="phase-waypoint-bridge my-4 text-center">
              <div class="waypoint-stem"></div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill waypoint-chip">
                <i class="fa-solid fa-circle-check text-mint small"></i>
                <span class="small font-monospace text-secondary">
                  {{ 'roadmap.phaseComplete' | trans }} {{ phase.numberStr }} · {{ 'roadmap.proceedTo' | trans }} {{ visiblePhases[pIdx + 1].numberStr }}
                </span>
                <i class="fa-solid fa-arrow-down small text-mint"></i>
              </div>
            </div>
          </section>
        </div>

      </div>

      <!-- SLIDE-OVER INSPECTOR DRAWER -->
      <div *ngIf="previewOpen && selectedStage" class="stage-preview-backdrop" (click)="closePreview()">
        <div class="stage-preview-modal p-3 p-sm-4" (click)="$event.stopPropagation()">
          <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <span class="stage-code font-monospace">Stage {{ selectedStage.id }}</span>
                <span class="stage-tag">{{ selectedStage.category }}</span>
                <span class="stage-diff" [attr.data-diff]="selectedStage.difficulty">{{ selectedStage.difficulty }}</span>
                <span class="stage-time font-monospace">{{ selectedStage.durationWeeks }}</span>
              </div>
              <h4 class="fw-bold mb-1 drawer-heading">{{ selectedStage.title }}</h4>
              <p class="text-secondary small mb-0">{{ selectedStage.description }}</p>
            </div>
            
            <button class="btn-close-drawer" (click)="closePreview()" title="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="preview-scroll-body">
            <div *ngIf="selectedStage.id === '09'" class="mb-4"><app-rag-diagram></app-rag-diagram></div>
            <div *ngIf="selectedStage.id === '14'" class="mb-4"><app-agent-diagram></app-agent-diagram></div>
            <div *ngIf="selectedStage.id === '25'" class="mb-4"><app-eval-benchmark></app-eval-benchmark></div>

            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <div class="preview-box p-3 h-100 rounded-3">
                  <span class="concept-label text-pine font-monospace mb-1">
                    <i class="fa-solid fa-lightbulb me-1"></i>{{ 'roadmap.whatIsIt' | trans }}
                  </span>
                  <p class="small text-secondary mb-0 leading-relaxed">{{ selectedStage.whatIsIt }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="preview-box p-3 h-100 rounded-3">
                  <span class="concept-label text-mint font-monospace mb-1">
                    <i class="fa-solid fa-shield-halved me-1"></i>{{ 'roadmap.whyNeeded' | trans }}
                  </span>
                  <p class="small text-secondary mb-0 leading-relaxed">{{ selectedStage.whyNeeded }}</p>
                </div>
              </div>
            </div>

            <div class="preview-box p-3 rounded-3 mb-4">
              <h6 class="fw-bold mb-2">
                <i class="fa-solid fa-list-check text-pine me-2"></i>{{ 'roadmap.milestoneChecklist' | trans }}
              </h6>
              <div class="row g-2">
                <div *ngFor="let item of selectedStage.whatToLearn" class="col-md-6">
                  <div class="d-flex align-items-baseline gap-2 small text-secondary">
                    <i class="fa-solid fa-check text-mint flex-shrink-0"></i>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="preview-box p-3 rounded-3 mb-4">
              <h6 class="fw-bold mb-2">
                <i class="fa-solid fa-graduation-cap text-pine me-2"></i>{{ 'roadmap.whatCoursesCover' | trans }}
              </h6>
              <ul class="list-unstyled mb-0 small">
                <li *ngFor="let cov of selectedStage.whatCoursesCover" class="mb-1 d-flex align-items-baseline gap-2 text-secondary">
                  <i class="fa-solid fa-bookmark text-mint small flex-shrink-0"></i>
                  <span>{{ cov }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-action-subtle" (click)="closePreview()">
              {{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}
            </button>
            <a [routerLink]="['/stage', selectedStage.id]" class="btn btn-sm btn-primary-clean" (click)="closePreview()">
              <span>{{ 'roadmap.openDeepDive' | trans }}</span>
              <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
            </a>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .roadmap-page { position: relative; }
    .hero-kicker {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      font-size: 0.74rem; color: var(--text-secondary);
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-mint); box-shadow: 0 0 8px rgba(217, 119, 6, 0.6);
      display: inline-block;
    }
    .kicker-label { color: var(--primary); font-weight: 700; }
    .kicker-sep { color: var(--text-muted); }
    .hero-title {
      font-size: 2.1rem; color: var(--text-primary);
      letter-spacing: -0.02em; font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .hero-desc {
      color: var(--text-secondary); font-size: 0.95rem; max-width: 680px;
      line-height: 1.6; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .progress-box {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md); min-width: 280px; box-shadow: var(--shadow-sm);
    }
    .progress-label { font-size: 0.82rem; color: var(--text-primary); }
    .progress-pct-badge {
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

    .phase-ribbon-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
    }
    .ribbon-title {
      font-size: 0.74rem; color: var(--primary); letter-spacing: 0.05em;
    }
    .phase-ribbon-scroll {
      overflow-x: auto; scrollbar-width: thin; padding-bottom: 4px;
    }
    .phase-ribbon-chip {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm); padding: 6px 12px; font-size: 0.76rem;
      font-weight: 600; color: var(--text-secondary); cursor: pointer;
      white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0;
    }
    .phase-ribbon-chip:hover {
      background: var(--surface-hover); color: var(--text-primary);
      border-color: var(--primary); transform: translateY(-1px);
    }
    .phase-ribbon-chip.completed {
      background: var(--primary-subtle); border-color: var(--primary-light);
      color: var(--primary);
    }
    .phase-ribbon-chip .chip-num {
      font-weight: 800; color: var(--primary);
    }
    .phase-ribbon-chip .chip-pct {
      font-size: 0.68rem; color: var(--text-muted); background: var(--surface);
      padding: 1px 6px; border-radius: var(--radius-sm);
    }
    .btn-action-subtle {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.74rem; font-weight: 600;
      padding: 4px 10px; border-radius: var(--radius-sm); cursor: pointer;
    }
    .btn-action-subtle:hover {
      background: var(--surface-hover); color: var(--primary); border-color: var(--primary);
    }

    .roadmap-toolbar {
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
      padding-inline-start: 36px; padding-inline-end: 32px; height: 38px;
      font-size: 0.82rem; background: var(--surface-elevated);
      border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);
      color: var(--text-primary);
    }
    .btn-clear-search {
      position: absolute; inset-inline-end: 10px; background: transparent; border: none; color: var(--text-muted);
    }
    .stage-counter-pill {
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

    .phase-chapter-header {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-inline-start: 4px solid var(--primary); border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm); transition: all 0.2s ease;
    }
    .phase-chapter-header.collapsed { opacity: 0.88; }
    .phase-chapter-header:hover {
      box-shadow: var(--shadow-md); border-color: var(--border-hover);
    }
    .phase-number-crest {
      width: 44px; height: 44px; background: var(--primary-subtle);
      border: 1px solid rgba(180, 83, 9, 0.2); border-radius: var(--radius-md);
      display: grid; place-items: center; color: var(--primary);
      font-size: 1.15rem; font-weight: 800; flex-shrink: 0;
    }
    .phase-badge {
      font-size: 0.72rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); padding: 2px 8px; border-radius: var(--radius-sm);
    }
    .phase-cat-pill {
      background: var(--surface-elevated); color: var(--text-secondary);
      border: 1px solid var(--border-subtle); font-size: 0.7rem; padding: 2px 8px; border-radius: var(--radius-sm);
    }
    .phase-duration { font-size: 0.72rem; color: var(--text-muted); }
    .phase-title {
      font-size: 1.25rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .phase-desc {
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif; line-height: 1.6;
    }
    .phase-meter { min-width: 140px; }
    .phase-pct-badge {
      font-size: 0.72rem; color: var(--text-secondary); background: var(--surface-elevated);
      padding: 1px 6px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);
    }
    .phase-pct-badge.done {
      background: var(--primary-subtle); color: var(--primary); font-weight: 700;
    }
    .phase-progress-track {
      height: 5px; background: var(--surface-elevated); border-radius: 999px;
      overflow: hidden; border: 1px solid var(--border-subtle);
    }
    .phase-progress-bar {
      height: 100%; background: var(--brand-gradient); transition: width 0.3s ease;
    }
    .btn-phase-toggle {
      width: 32px; height: 32px; border-radius: var(--radius-sm);
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); display: grid; place-items: center; cursor: pointer;
    }

    .nodes-stream-container { position: relative; padding-bottom: 8px; }
    .spine-line {
      position: absolute; top: 0; bottom: 24px; inset-inline-start: 19px;
      width: 2px; background: linear-gradient(to bottom, var(--primary) 0%, rgba(180, 83, 9, 0.15) 100%);
      pointer-events: none; z-index: 1;
    }
    .stage-node-item { position: relative; padding-inline-start: 56px; margin-bottom: 20px; }
    .node-pin-btn {
      position: absolute; inset-inline-start: 3px; top: 18px; width: 34px; height: 34px;
      border-radius: 50%; background: var(--surface-card); border: 2px solid var(--border-strong);
      display: grid; place-items: center; cursor: pointer; z-index: 2; transition: all 0.2s ease;
      box-shadow: 0 0 0 3px var(--bg-primary); color: var(--text-primary);
    }
    .node-pin-btn:hover {
      transform: scale(1.1); border-color: var(--primary); color: var(--primary);
    }
    .node-pin-btn.completed {
      background: var(--primary); border-color: var(--accent-mint); color: #FFFFFF;
      box-shadow: 0 0 10px rgba(217, 119, 6, 0.4);
    }
    .pin-number { font-size: 0.74rem; font-weight: 800; }
    .node-branch-line {
      position: absolute; inset-inline-start: 36px; top: 34px; width: 20px; height: 2px;
      background: var(--border-subtle); z-index: 1;
    }
    .node-card-body {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); transition: all 0.2s ease; box-shadow: var(--shadow-sm);
    }
    .node-card-body:hover {
      border-color: var(--border-hover); box-shadow: var(--shadow-md); transform: translateY(-2px);
    }
    .stage-node-item.is-completed .node-card-body {
      border-inline-start: 3px solid var(--accent-mint);
    }
    .stage-code {
      font-size: 0.72rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); border: 1px solid rgba(180, 83, 9, 0.2);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .stage-tag {
      font-size: 0.68rem; background: var(--surface-elevated); color: var(--text-secondary);
      border: 1px solid var(--border-subtle); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .stage-diff {
      font-size: 0.66rem; padding: 2px 6px; border-radius: var(--radius-sm);
      background: var(--surface-elevated); border: 1px solid var(--border-subtle); font-weight: 600;
    }
    .stage-diff[data-diff="Beginner"] { border-color: #A7F3D0; color: #047857; }
    .stage-diff[data-diff="Intermediate"] { border-color: #FDE68A; color: #D97706; }
    .stage-diff[data-diff="Advanced"] { border-color: #FECACA; color: #DC2626; }
    .stage-time { font-size: 0.68rem; color: var(--text-muted); }
    .stage-diagram-pill {
      font-size: 0.66rem; background: var(--primary-subtle); border: 1px solid #FDE68A;
      color: var(--primary); padding: 2px 7px; border-radius: var(--radius-sm); font-weight: 600;
    }
    .btn-stage-checkbox {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-muted); width: 28px; height: 28px; display: grid; place-items: center;
      border-radius: 50%; cursor: pointer; font-size: 0.75rem;
    }
    .btn-stage-checkbox.checked {
      background: var(--primary); border-color: var(--accent-mint); color: #FFFFFF;
    }
    .node-title {
      font-size: 1.05rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .node-title-link { color: var(--text-primary); text-decoration: none; }
    .node-title-link:hover { color: var(--primary); }
    .node-desc {
      line-height: 1.6; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .node-tool-chip {
      font-size: 0.7rem; background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .node-course-tag {
      font-size: 0.66rem; background: var(--surface-elevated); color: var(--text-muted);
      border: 1px solid var(--border-subtle); padding: 2px 6px; border-radius: var(--radius-sm);
    }
    .btn-quick-inspect {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.75rem; padding: 4px 10px;
      border-radius: var(--radius-sm); cursor: pointer; font-weight: 600;
    }
    .btn-quick-inspect:hover {
      border-color: var(--primary); color: var(--primary); background: var(--surface-hover);
    }
    .btn-deep-dive-clean {
      background: var(--primary); border: 1px solid var(--primary); color: #FFFFFF !important;
      font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: var(--radius-sm);
      text-decoration: none !important; display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-deep-dive-clean:hover { background: var(--primary-hover); transform: translateY(-1px); }

    .phase-waypoint-bridge { margin-inline-start: 56px; }
    .waypoint-stem {
      width: 2px; height: 20px; background: linear-gradient(to bottom, var(--primary), rgba(180, 83, 9, 0.2));
      margin: 0 auto 6px;
    }
    .waypoint-chip {
      background: var(--surface-card); border: 1px dashed var(--border-subtle); box-shadow: var(--shadow-sm);
    }

    .stage-preview-backdrop {
      position: fixed; inset: 0; background: rgba(28, 25, 23, 0.45);
      backdrop-filter: blur(4px); z-index: 1060; display: flex; justify-content: flex-end;
    }
    .stage-preview-modal {
      width: 100%; max-width: 720px; height: 100vh; background: var(--surface-card);
      border-inline-start: 1px solid var(--border-subtle); display: flex; flex-direction: column;
      box-shadow: var(--shadow-lg);
    }
    .drawer-heading { color: var(--text-primary); font-family: var(--font-arabic-heading), 'Cairo', sans-serif; }
    .btn-close-drawer {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); width: 32px; height: 32px; display: grid; place-items: center;
      border-radius: var(--radius-sm); cursor: pointer;
    }
    .preview-scroll-body { overflow-y: auto; scrollbar-width: thin; padding-inline-end: 4px; flex-grow: 1; }
    .preview-box { background: var(--surface-elevated); border: 1px solid var(--border-subtle); }
    .concept-label { font-size: 0.68rem; font-weight: 700; display: block; }
    .text-pine { color: var(--primary) !important; }
    .text-mint { color: var(--accent-mint) !important; }
    .btn-primary-clean {
      background: var(--primary); border: 1px solid var(--primary); color: #FFFFFF !important;
      font-size: 0.78rem; font-weight: 600; padding: 6px 14px; border-radius: var(--radius-sm);
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-primary-clean:hover { background: var(--primary-hover); }

    .empty-state-card {
      background: var(--surface-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);
    }

    @media (max-width: 767.98px) {
      .hero-title { font-size: 1.65rem; }
      .progress-box { min-width: 100%; }
      .stage-preview-modal { max-width: 100% !important; }
    }
  `]
})
export class RoadmapComponent implements OnInit, OnDestroy {
  stages: RoadmapStage[] = ROADMAP_STAGES;
  filteredStages: RoadmapStage[] = [];
  selectedStage: RoadmapStage | null = null;
  previewOpen = false;

  expandedPhases: Set<number> = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8]);
  searchQuery = '';
  selectedCategory = 'All';

  phases: RoadmapPhase[] = [
    {
      id: 1,
      numberStr: '01',
      titleEn: 'Foundations & Core Python Engineering',
      titleAr: 'أساسيات البرمجة وهندسة بايثون',
      descEn: 'From Python 3.11+, OOP and data structures to mathematical foundations, calculus, and machine learning.',
      descAr: 'من لغة بايثون 3.11 والبرمجة كائنية التوجه إلى الأسس الرياضية والخوارزميات وتعلم الآلة الكلاسيكي.',
      category: 'Foundations',
      icon: 'fa-code',
      durationWeeks: '6 Weeks',
      stageIds: ['01', '02', '03', '04']
    },
    {
      id: 2,
      numberStr: '02',
      titleEn: 'Deep Learning & Neural Architectures',
      titleAr: 'التعلم العميق وبنية الشبكات العصبية',
      descEn: 'PyTorch tensor mechanics, backpropagation, and specialized CNN & RNN/LSTM networks.',
      descAr: 'ميكانيكا مصفوفات PyTorch، والانتشار العكسي، وشبكات CNN للرؤية وشبكات LSTM للتسلسلات.',
      category: 'Deep Learning',
      icon: 'fa-brain',
      durationWeeks: '4 Weeks',
      stageIds: ['05', '06']
    },
    {
      id: 3,
      numberStr: '03',
      titleEn: 'Foundation Models, Transformers & LLMs',
      titleAr: 'النماذج التأسيسية وهندسة نماذج اللغة الضخمة',
      descEn: 'Transformer self-attention architectures, HuggingFace hubs, prompt engineering, and parameter-efficient fine-tuning (PEFT/LoRA).',
      descAr: 'بنية محولات الانتباه الذاتي (Transformers)، ومكتبات HuggingFace، وهندسة الأوامر والضبط الدقيق بـ LoRA.',
      category: 'GenAI & LLMs',
      icon: 'fa-wand-magic-sparkles',
      durationWeeks: '4 Weeks',
      stageIds: ['07', '08']
    },
    {
      id: 4,
      numberStr: '04',
      titleEn: 'Production RAG Architectures & Vector DBs',
      titleAr: 'هندسة وبنية أنظمة الاسترجاع المعزز (RAG)',
      descEn: 'Semantic chunking, vector embeddings, hybrid BM25 search, MMR reranking, multimodal ColPali, and Graph RAG.',
      descAr: 'التقطيع الدلالي، وقواعد المتجهات، والبحث الهجين، وإعادة الترتيب (Reranking)، و RAG متعدد الوسائط والرسم البياني.',
      category: 'RAG',
      icon: 'fa-layer-group',
      durationWeeks: '6 Weeks',
      stageIds: ['09', '10', '11', '12', '13']
    },
    {
      id: 5,
      numberStr: '05',
      titleEn: 'Autonomous Agents & LangGraph Orchestration',
      titleAr: 'الوكلاء الأذكياء وسير العمل المعقد بـ LangGraph',
      descEn: 'ReAct cyclical loops, structured tool calling, LangGraph state checkpointers, human-in-the-loop, and multi-agent coordination with CrewAI.',
      descAr: 'حلقات ReAct الذكية، واستدعاء الأدوات، وحفظ الحالة بـ LangGraph، والموافقة البشرية وتنسيق الوكلاء متعددي المهام بـ CrewAI.',
      category: 'Autonomous Agents',
      icon: 'fa-robot',
      durationWeeks: '5 Weeks',
      stageIds: ['14', '15', '16', '17']
    },
    {
      id: 6,
      numberStr: '06',
      titleEn: 'Full-Stack GenAI Applications & Production APIs',
      titleAr: 'تطوير تطبيقات وخدمات الذكاء الاصطناعي المتكاملة',
      descEn: 'Async FastAPI backends, streaming token WebSockets, modern Next.js interfaces, and distributed databases (PostgreSQL/MongoDB).',
      descAr: 'خدمات FastAPI غير المتزامنة، وتدفق الإجابات، وواجهات Next.js العصرية وقواعد البيانات الموزعة.',
      category: 'Production',
      icon: 'fa-cubes',
      durationWeeks: '4 Weeks',
      stageIds: ['18', '19', '20']
    },
    {
      id: 7,
      numberStr: '07',
      titleEn: 'Cloud Infrastructure, Terraform & MLOps CI/CD',
      titleAr: 'البنية التحتية السحابية ونشر النماذج و DevOps',
      descEn: 'Multi-stage Docker containers, AWS SageMaker/Bedrock, multi-environment Terraform IaC, and GitHub Actions CI/CD pipelines.',
      descAr: 'حاويات Docker الخفيفة، وخدمات AWS Bedrock، وبنية Terraform التحتية، وخطوط النشر المستمر بـ GitHub Actions.',
      category: 'Cloud & DevOps',
      icon: 'fa-cloud',
      durationWeeks: '5 Weeks',
      stageIds: ['21', '22', '23', '24']
    },
    {
      id: 8,
      numberStr: '08',
      titleEn: 'Enterprise Evaluation, Observability & Security',
      titleAr: 'تقييم النماذج والمراقبة وأمان الذكاء الاصطناعي',
      descEn: 'Ragas evaluation metrics, Langfuse distributed tracing, rate limiting, and prompt injection/jailbreak defense with NeMo Guardrails.',
      descAr: 'معايير تقييم Ragas، وتتبع الأداء بـ Langfuse، وحواجز الحماية NeMo Guardrails من هجمات الاختراق وحقن الأوامر.',
      category: 'Evaluation',
      icon: 'fa-shield-halved',
      durationWeeks: '3 Weeks',
      stageIds: ['25', '26']
    }
  ];

  categoryFilters = [
    { key: 'All', label: 'filter.all' },
    { key: 'Foundations', label: 'filter.foundations' },
    { key: 'Deep Learning', label: 'filter.deepLearning' },
    { key: 'GenAI & LLMs', label: 'filter.genai' },
    { key: 'RAG', label: 'filter.rag' },
    { key: 'Autonomous Agents', label: 'filter.agents' },
    { key: 'Production', label: 'filter.production' },
    { key: 'Cloud & DevOps', label: 'filter.cloudDevOps' },
    { key: 'Evaluation', label: 'filter.evaluation' }
  ];

  completedStageIds: string[] = [];
  private progressSub?: Subscription;

  constructor(
    private progressService: ProgressService,
    public transService: TranslationService
  ) {}

  ngOnInit() {
    this.filteredStages = [...this.stages];
    this.progressSub = this.progressService.completedStages$.subscribe(ids => {
      this.completedStageIds = ids;
    });
  }

  ngOnDestroy() {
    this.progressSub?.unsubscribe();
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  get progressPercentage(): number {
    return Math.round((this.completedStageIds.length / this.stages.length) * 100);
  }

  get visiblePhases(): RoadmapPhase[] {
    return this.phases.filter(phase => {
      const stagesInPhase = this.getPhaseStages(phase);
      return stagesInPhase.length > 0;
    });
  }

  getPhaseStages(phase: RoadmapPhase): RoadmapStage[] {
    return this.filteredStages.filter(s => phase.stageIds.includes(s.id));
  }

  getPhaseCompletedCount(phase: RoadmapPhase): number {
    return this.completedStageIds.filter(id => phase.stageIds.includes(id)).length;
  }

  getPhaseProgressPct(phase: RoadmapPhase): number {
    const total = phase.stageIds.length;
    if (total === 0) return 0;
    return Math.round((this.getPhaseCompletedCount(phase) / total) * 100);
  }

  hasInteractiveDiagram(stageId: string): boolean {
    return stageId === '09' || stageId === '14' || stageId === '25';
  }

  openPreview(stage: RoadmapStage) {
    this.selectedStage = stage;
    this.previewOpen = true;
  }

  closePreview() {
    this.previewOpen = false;
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
      const matchCat = this.selectedCategory === 'All' || s.category.toLowerCase().includes(this.selectedCategory.toLowerCase());
      const matchSearch = !q || (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.topicsList.some(t => t.toLowerCase().includes(q)) ||
        s.tools.some(t => t.toLowerCase().includes(q))
      );
      return matchCat && matchSearch;
    });
  }

  toggleCompletion(event: Event, stageId: string) {
    event.stopPropagation();
    this.progressService.toggleStage(stageId);
  }

  isCompleted(stageId: string): boolean {
    return this.completedStageIds.includes(stageId);
  }

  togglePhase(phaseId: number): void {
    if (this.expandedPhases.has(phaseId)) {
      this.expandedPhases.delete(phaseId);
    } else {
      this.expandedPhases.add(phaseId);
    }
  }

  isPhaseExpanded(phaseId: number): boolean {
    return this.expandedPhases.has(phaseId);
  }

  expandAllPhases(): void {
    this.phases.forEach(p => this.expandedPhases.add(p.id));
  }

  collapseAllPhases(): void {
    this.expandedPhases.clear();
  }

  scrollToPhase(phaseId: number): void {
    const el = document.getElementById('phase-milestone-' + phaseId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
