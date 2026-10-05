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
        <!-- HEADER & PROGRESS -->
        <div class="roadmap-header mb-4">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <span class="badge badge-subtle-primary font-monospace">
                  {{ 'roadmap.headerBadge' | trans }}
                </span>
                <span class="badge badge-subtle-info font-monospace">
                  {{ 'roadmap.headerSubBadge' | trans }}
                </span>
              </div>
              <h1 class="hero-roadmap-title text-white fw-bold mb-1">{{ 'roadmap.title' | trans }}</h1>
              <p class="text-secondary small mb-0">
                {{ 'roadmap.desc' | trans }}
              </p>
            </div>

            <!-- Progress Meter -->
            <div class="progress-meter-card p-3 d-flex align-items-center gap-3">
              <div class="text-end">
                <div class="small text-secondary">{{ 'roadmap.yourProgress' | trans }}</div>
                <div class="font-monospace text-white fw-bold">
                  {{ completedStageIds.length }}/{{ stages.length }} {{ 'roadmap.completed' | trans }} ({{ progressPercentage }}%)
                </div>
              </div>
              <div class="progress-radial-circle" [style.--pct]="progressPercentage + '%'">
                <span class="font-monospace small fw-bold">{{ progressPercentage }}%</span>
              </div>
            </div>
          </div>

          <!-- PHASE NAVIGATOR RIBBON (Horizontal Visual Journey Stepper) -->
          <div class="phase-navigator-card p-2 p-md-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2 px-1 flex-wrap gap-2">
              <div class="d-flex align-items-center gap-2">
                <span class="small font-monospace text-uppercase text-cyan fw-semibold">
                  <i class="fa-solid fa-compass me-1"></i>{{ 'roadmap.quickJump' | trans }}
                </span>
                <span class="text-muted small">·</span>
                <span class="text-secondary small">8 {{ currentLang === 'ar' ? 'مراحل متسلسلة' : 'Connected Phases' }}</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-action-subtle" (click)="expandAllPhases()" title="Expand All">
                  <i class="fa-solid fa-angles-down me-1"></i>{{ 'roadmap.expandAll' | trans }}
                </button>
                <button class="btn btn-sm btn-action-subtle" (click)="collapseAllPhases()" title="Collapse All">
                  <i class="fa-solid fa-angles-up me-1"></i>{{ 'roadmap.collapseAll' | trans }}
                </button>
              </div>
            </div>

            <div class="phase-pills-scroll d-flex align-items-center gap-2">
              <ng-container *ngFor="let p of phases; let i = index">
                <button 
                  class="phase-nav-chip d-flex align-items-center gap-2"
                  [class.completed]="getPhaseProgressPct(p) === 100"
                  [attr.data-phase]="p.id"
                  (click)="scrollToPhase(p.id)"
                >
                  <span class="chip-num font-monospace">{{ p.numberStr }}</span>
                  <span class="chip-label text-truncate">{{ currentLang === 'ar' ? p.titleAr : p.titleEn }}</span>
                  <span class="chip-pct font-monospace ms-auto">{{ getPhaseProgressPct(p) }}%</span>
                </button>
                <div *ngIf="i < phases.length - 1" class="phase-nav-arrow text-secondary">
                  <i class="fa-solid" [class.fa-arrow-right]="currentLang !== 'ar'" [class.fa-arrow-left]="currentLang === 'ar'"></i>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- TOOLBAR: SEARCH, CATEGORIES, VIEW MODES & FILTERS -->
          <div class="toolbar-box p-3">
            <div class="row g-3 align-items-center">
              <!-- Search Filter Input -->
              <div class="col-lg-4 col-md-5">
                <div class="input-group">
                  <span class="input-group-text search-icon-wrap">
                    <i class="fa-solid fa-magnifying-glass text-secondary"></i>
                  </span>
                  <input 
                    type="text" 
                    class="form-control search-filter-input small" 
                    [(ngModel)]="searchQuery" 
                    (input)="applyFilters()"
                    [placeholder]="'roadmap.filterPlaceholder' | trans"
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

              <!-- View Mode Switcher (Flow | Grid | Tracker) -->
              <div class="col-lg-4 col-md-7 d-flex justify-content-md-end justify-content-start">
                <div class="view-switcher-group d-inline-flex p-1 rounded-3">
                  <button 
                    class="view-btn" 
                    [class.active]="viewMode === 'flow'" 
                    (click)="viewMode = 'flow'"
                    title="Interactive Visual Roadmap Path"
                  >
                    <i class="fa-solid fa-route me-1"></i>
                    <span>{{ 'roadmap.viewFlow' | trans }}</span>
                  </button>
                  <button 
                    class="view-btn" 
                    [class.active]="viewMode === 'grid'" 
                    (click)="viewMode = 'grid'"
                    title="Grid Board View"
                  >
                    <i class="fa-solid fa-table-cells-large me-1"></i>
                    <span>{{ 'roadmap.viewGrid' | trans }}</span>
                  </button>
                  <button 
                    class="view-btn" 
                    [class.active]="viewMode === 'table'" 
                    (click)="viewMode = 'table'"
                    title="Compact Tracker View"
                  >
                    <i class="fa-solid fa-list-check me-1"></i>
                    <span>{{ 'roadmap.viewTable' | trans }}</span>
                  </button>
                </div>
              </div>

              <!-- Category Pills Track -->
              <div class="col-lg-4 col-12">
                <div class="d-flex flex-wrap gap-1 category-pill-track">
                  <button 
                    *ngFor="let cat of categoryFilters" 
                    class="filter-pill"
                    [class.active]="selectedCategory === cat.key"
                    (click)="setCategory(cat.key)"
                  >
                    {{ cat.label | trans }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Secondary Toolbar: Courses, Coverage, Stats & Reset -->
            <div class="d-flex flex-wrap justify-content-between align-items-center mt-3 pt-2 border-top gap-2 toolbar-secondary">
              <div class="d-flex flex-wrap align-items-center gap-2">
                <!-- Course Source Filter -->
                <div class="d-flex align-items-center gap-1">
                  <small class="text-secondary font-monospace me-1">{{ 'roadmap.courseFilter' | trans }}</small>
                  <button 
                    *ngFor="let course of courseFilters" 
                    class="source-pill" 
                    [class.active]="selectedCourse === course"
                    (click)="setCourse(course)"
                  >
                    {{ course }}
                  </button>
                </div>

                <div class="vr-divider d-none d-sm-block mx-1"></div>

                <!-- Coverage Filter -->
                <div class="d-flex align-items-center gap-1">
                  <small class="text-secondary font-monospace me-1">{{ 'roadmap.coverageFilter' | trans }}</small>
                  <button 
                    *ngFor="let cov of coverageFilters" 
                    class="cov-pill" 
                    [class.active]="selectedCoverage === cov.key"
                    (click)="setCoverage(cov.key)"
                  >
                    {{ cov.label | trans }}
                  </button>
                </div>
              </div>

              <div class="d-flex align-items-center gap-2">
                <span class="small text-secondary font-monospace">
                  {{ 'roadmap.showingStages' | trans }} {{ filteredStages.length }} {{ 'roadmap.ofStages' | trans }} {{ stages.length }} {{ 'roadmap.stagesWord' | trans }}
                </span>
                <button class="btn btn-sm btn-reset-filters" (click)="resetFilters()" title="Reset Filters">
                  <i class="fa-solid fa-rotate-left me-1"></i>{{ 'roadmap.reset' | trans }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div *ngIf="filteredStages.length === 0" class="text-center py-5 text-secondary empty-notice modern-card my-4">
          <i class="fa-solid fa-filter fa-2x mb-3 text-secondary"></i>
          <h5 class="text-white">{{ 'roadmap.noMatches' | trans }}</h5>
          <p class="small text-muted mb-3">Try adjusting your search query, category, or course filters.</p>
          <button class="btn btn-sm btn-primary-action" (click)="resetFilters()">
            {{ 'roadmap.clearFilters' | trans }}
          </button>
        </div>

        <!-- ============================================================= -->
        <!-- VIEW MODE 1: INTERACTIVE VISUAL ROADMAP FLOW                  -->
        <!-- ============================================================= -->
        <div *ngIf="viewMode === 'flow' && filteredStages.length > 0" class="roadmap-flow-container">
          <div *ngFor="let phase of visiblePhases; let pIdx = index" [id]="'phase-milestone-' + phase.id" class="phase-milestone-section mb-5" [attr.data-phase]="phase.id">
            <!-- Phase Milestone Header Gateway -->
            <div class="phase-gateway-card p-3 p-md-4 mb-4" [class.collapsed]="!isPhaseExpanded(phase.id)">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="phase-number-crest font-monospace">
                    {{ phase.numberStr }}
                  </div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <span class="phase-badge font-monospace">{{ 'roadmap.phasePrefix' | trans }} {{ phase.numberStr }}</span>
                      <span class="badge badge-phase-cat">{{ phase.category }}</span>
                      <span class="duration-badge font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ phase.durationWeeks }}</span>
                    </div>
                    <h3 class="phase-title text-white fw-bold mb-1">
                      {{ currentLang === 'ar' ? phase.titleAr : phase.titleEn }}
                    </h3>
                    <p class="phase-desc text-secondary small mb-0">
                      {{ currentLang === 'ar' ? phase.descAr : phase.descEn }}
                    </p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-shrink-0 align-self-md-center align-self-end">
                  <!-- Phase Completion Meter -->
                  <div class="phase-progress-wrap text-md-end">
                    <div class="d-flex align-items-center gap-2 justify-content-md-end mb-1">
                      <span class="small font-monospace text-secondary">
                        {{ getPhaseCompletedCount(phase) }}/{{ getPhaseStages(phase).length }} {{ 'roadmap.completed' | trans }}
                      </span>
                      <span class="badge font-monospace" [class.bg-success]="getPhaseProgressPct(phase) === 100" [class.badge-phase-pct]="getPhaseProgressPct(phase) < 100">
                        {{ getPhaseProgressPct(phase) }}%
                      </span>
                    </div>
                    <div class="phase-progress-bar">
                      <div class="phase-progress-fill" [style.width.%]="getPhaseProgressPct(phase)"></div>
                    </div>
                  </div>

                  <!-- Collapse / Expand Toggle Button -->
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

            <!-- Flow Stages Track (Visible when Phase is Expanded) -->
            <div *ngIf="isPhaseExpanded(phase.id)" class="flow-track-wrapper position-relative">
              <!-- Central / Left Spine Line -->
              <div class="flow-spine-line"></div>

              <!-- Sequential Flow Stages -->
              <div class="flow-nodes-sequence">
                <div 
                  *ngFor="let stage of getPhaseStages(phase); let sIdx = index; let isLast = last" 
                  class="flow-stage-row d-flex align-items-start position-relative mb-4"
                  [class.is-completed]="isCompleted(stage.id)"
                >
                  <!-- Milestone Node Pin on the Spine -->
                  <div 
                    class="flow-node-marker" 
                    [class.completed]="isCompleted(stage.id)"
                    (click)="toggleCompletion($event, stage.id)"
                    [title]="isCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                  >
                    <i *ngIf="isCompleted(stage.id)" class="fa-solid fa-check"></i>
                    <span *ngIf="!isCompleted(stage.id)" class="marker-id font-monospace">{{ stage.id }}</span>
                  </div>

                  <!-- Branch Connector Line to Card -->
                  <div class="flow-branch-connector"></div>

                  <!-- Flow Stage Card -->
                  <div class="flow-card-container flex-grow-1">
                    <div 
                      class="flow-stage-card p-3 p-md-4"
                      [class.is-completed]="isCompleted(stage.id)"
                      [class.is-active-preview]="selectedStage?.id === stage.id"
                    >
                      <!-- Card Top Bar: Header Meta & Checkbox -->
                      <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                          <span class="stage-id-pill font-monospace">{{ 'roadmap.stagePrefix' | trans }} {{ stage.id }}</span>
                          <span class="stage-cat-pill">{{ stage.category }}</span>
                          <span class="diff-badge" [attr.data-diff]="stage.difficulty">{{ stage.difficulty }}</span>
                          <span class="duration-badge font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ stage.durationWeeks }}</span>
                        </div>

                        <!-- Complete Toggle Checkbox -->
                        <button 
                          class="btn-stage-check"
                          [class.checked]="isCompleted(stage.id)"
                          (click)="toggleCompletion($event, stage.id)"
                          [title]="isCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                        >
                          <i class="fa-solid" [class.fa-check]="isCompleted(stage.id)" [class.fa-circle]="!isCompleted(stage.id)"></i>
                        </button>
                      </div>

                      <!-- Stage Title & Tagline -->
                      <h4 class="stage-card-title text-white fw-bold mb-2">{{ stage.title }}</h4>
                      <p class="stage-card-desc text-secondary small mb-3">
                        {{ stage.tagline }}
                      </p>

                      <!-- Tech Stack Chips & Topics Expander Bar -->
                      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                        <div class="d-flex flex-wrap gap-1">
                          <span *ngFor="let tool of stage.tools.slice(0, 4)" class="tech-chip">
                            {{ tool }}
                          </span>
                          <span *ngIf="stage.tools.length > 4" class="tech-chip text-cyan">
                            +{{ stage.tools.length - 4 }}
                          </span>
                          <span *ngIf="hasInteractiveDiagram(stage.id)" class="diagram-pill font-monospace">
                            <i class="fa-solid fa-diagram-project me-1"></i>Diagram
                          </span>
                        </div>

                        <!-- Inline Topics Toggle Button -->
                        <button 
                          class="btn-inline-topics font-monospace"
                          (click)="toggleTopics(stage.id, $event)"
                          [class.active]="isTopicsExpanded(stage.id)"
                        >
                          <i class="fa-solid fa-list-ul me-1"></i>
                          <span>{{ stage.topicsList.length }} {{ 'roadmap.showTopics' | trans }}</span>
                          <i class="fa-solid ms-1" [class.fa-chevron-down]="!isTopicsExpanded(stage.id)" [class.fa-chevron-up]="isTopicsExpanded(stage.id)"></i>
                        </button>
                      </div>

                      <!-- Inline Syllabus Topics Dropdown Grid -->
                      <div *ngIf="isTopicsExpanded(stage.id)" class="inline-topics-box p-3 mb-3 rounded-2">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <span class="small font-monospace text-cyan fw-bold">
                            <i class="fa-solid fa-graduation-cap me-1"></i>{{ 'roadmap.curriculumTopics' | trans }} ({{ stage.topicsList.length }})
                          </span>
                        </div>
                        <div class="row g-2">
                          <div *ngFor="let t of stage.topicsList" class="col-md-6 col-12">
                            <div class="d-flex align-items-center gap-2 small text-secondary">
                              <span class="topic-dot"></span>
                              <span class="topic-name">{{ t }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Card Footer: Course Badges & Action Buttons -->
                      <div class="d-flex justify-content-between align-items-center pt-3 border-top gap-2 flex-wrap">
                        <div class="d-flex align-items-center gap-1 flex-wrap">
                          <span *ngFor="let c of stage.courseSources" class="course-badge" [attr.data-course]="c">
                            {{ c }}
                          </span>
                          <span class="coverage-badge mini-cov" [attr.data-cov]="stage.coverageStatus">
                            <span class="cov-dot"></span>
                            {{ stage.coverageStatus }}
                          </span>
                        </div>

                        <div class="d-flex align-items-center gap-2">
                          <button class="btn btn-sm btn-quick-preview" (click)="openPreview(stage)">
                            <i class="fa-regular fa-eye me-1"></i>Preview
                          </button>
                          <a [routerLink]="['/stage', stage.id]" class="btn btn-sm btn-deep-dive">
                            {{ 'roadmap.openDeepDive' | trans }} <i class="fa-solid fa-arrow-right ms-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <!-- Downward Arrow to Next Stage in this Phase -->
                    <div *ngIf="!isLast" class="step-connector-down text-center py-2">
                      <div class="step-line-stem"></div>
                      <i class="fa-solid fa-arrow-down small text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Milestone Gateway Bridge between Phases -->
            <div *ngIf="pIdx < visiblePhases.length - 1" class="phase-waypoint-bridge my-4 py-2 text-center position-relative">
              <div class="bridge-stem-line"></div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bridge-chip">
                <i class="fa-solid fa-circle-check text-mint small"></i>
                <span class="small font-monospace text-secondary">
                  {{ 'roadmap.phaseComplete' | trans }} {{ phase.numberStr }} · {{ 'roadmap.proceedTo' | trans }} Phase {{ visiblePhases[pIdx + 1].numberStr }}
                </span>
                <i class="fa-solid fa-arrow-down small text-cyan"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================================================= -->
        <!-- VIEW MODE 2: INTERACTIVE GRID VIEW                            -->
        <!-- ============================================================= -->
        <div *ngIf="viewMode === 'grid' && filteredStages.length > 0" class="grid-container">
          <div class="row g-3">
            <div *ngFor="let stage of filteredStages" class="col-xl-4 col-md-6 col-12">
              <div 
                class="stage-card h-100 p-3 p-md-4 d-flex flex-column"
                [class.is-completed]="isCompleted(stage.id)"
                [class.is-active-preview]="selectedStage?.id === stage.id"
              >
                <!-- Card Header -->
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <div class="d-flex align-items-center gap-2 flex-wrap">
                    <span class="stage-num-badge font-monospace">{{ stage.id }}</span>
                    <span class="stage-cat-pill">{{ stage.category }}</span>
                    <span class="diff-badge" [attr.data-diff]="stage.difficulty">{{ stage.difficulty }}</span>
                  </div>

                  <button 
                    class="btn-stage-check"
                    [class.checked]="isCompleted(stage.id)"
                    (click)="toggleCompletion($event, stage.id)"
                    [title]="isCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                  >
                    <i class="fa-solid" [class.fa-check]="isCompleted(stage.id)" [class.fa-circle]="!isCompleted(stage.id)"></i>
                  </button>
                </div>

                <h5 class="stage-card-title text-white fw-bold mb-2">{{ stage.title }}</h5>
                <p class="stage-card-desc text-secondary small mb-3 flex-grow-1">
                  {{ stage.tagline }}
                </p>

                <div class="d-flex flex-wrap gap-1 mb-3">
                  <span *ngFor="let tool of stage.tools.slice(0, 3)" class="tech-chip">{{ tool }}</span>
                  <span *ngIf="stage.tools.length > 3" class="tech-chip text-cyan">+{{ stage.tools.length - 3 }}</span>
                </div>

                <!-- Footer -->
                <div class="d-flex justify-content-between align-items-center pt-3 border-top gap-2 flex-wrap">
                  <div class="d-flex align-items-center gap-1">
                    <span class="coverage-badge mini-cov" [attr.data-cov]="stage.coverageStatus">
                      <span class="cov-dot"></span>
                      {{ stage.coverageStatus }}
                    </span>
                  </div>

                  <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-quick-preview" (click)="openPreview(stage)">
                      <i class="fa-regular fa-eye me-1"></i>Preview
                    </button>
                    <a [routerLink]="['/stage', stage.id]" class="btn btn-sm btn-deep-dive">
                      Deep Dive <i class="fa-solid fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================================================= -->
        <!-- VIEW MODE 3: COMPACT DEVELOPER TRACKER TABLE                 -->
        <!-- ============================================================= -->
        <div *ngIf="viewMode === 'table' && filteredStages.length > 0" class="table-container modern-card p-0 overflow-hidden mb-5">
          <div class="table-responsive">
            <table class="table tracker-table align-middle mb-0">
              <thead class="tracker-head">
                <tr>
                  <th style="width: 50px;" class="text-center">Done</th>
                  <th style="width: 70px;">ID</th>
                  <th>Stage Milestone</th>
                  <th>Phase / Category</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                  <th>Course Attribution</th>
                  <th>Coverage</th>
                  <th style="width: 170px;" class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let stage of filteredStages" class="tracker-row" [class.is-completed]="isCompleted(stage.id)">
                  <td class="text-center">
                    <button 
                      class="btn-stage-check-mini" 
                      [class.checked]="isCompleted(stage.id)" 
                      (click)="toggleCompletion($event, stage.id)"
                    >
                      <i class="fa-solid" [class.fa-check]="isCompleted(stage.id)" [class.fa-circle]="!isCompleted(stage.id)"></i>
                    </button>
                  </td>
                  <td>
                    <span class="font-monospace fw-bold stage-num-text">{{ stage.id }}</span>
                  </td>
                  <td>
                    <div class="fw-bold text-white">{{ stage.title }}</div>
                    <small class="text-secondary line-clamp-1">{{ stage.tagline }}</small>
                  </td>
                  <td>
                    <span class="badge cat-badge-tracker">{{ stage.category }}</span>
                  </td>
                  <td>
                    <span class="diff-badge" [attr.data-diff]="stage.difficulty">{{ stage.difficulty }}</span>
                  </td>
                  <td>
                    <span class="font-monospace small text-secondary">{{ stage.durationWeeks }}</span>
                  </td>
                  <td>
                    <div class="d-flex gap-1 flex-wrap">
                      <span *ngFor="let c of stage.courseSources" class="course-badge" [attr.data-course]="c">{{ c }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="coverage-badge mini-cov" [attr.data-cov]="stage.coverageStatus">
                      <span class="cov-dot"></span>
                      {{ stage.coverageStatus }}
                    </span>
                  </td>
                  <td class="text-end">
                    <div class="d-inline-flex gap-1">
                      <button class="btn btn-sm btn-quick-preview" (click)="openPreview(stage)" title="Quick Inspection">
                        <i class="fa-regular fa-eye"></i>
                      </button>
                      <a [routerLink]="['/stage', stage.id]" class="btn btn-sm btn-deep-dive" title="Open Complete Stage Guide">
                        <i class="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ============================================================= -->
      <!-- SLIDE-OVER STAGE INSPECTION DRAWER / MODAL                   -->
      <!-- ============================================================= -->
      <div *ngIf="previewOpen && selectedStage" class="stage-preview-backdrop" (click)="closePreview()">
        <div class="stage-preview-modal p-3 p-sm-4" (click)="$event.stopPropagation()">
          <!-- Modal Header -->
          <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <span class="stage-num-badge font-monospace">Stage {{ selectedStage.id }}</span>
                <span class="badge badge-phase-cat">{{ selectedStage.category }}</span>
                <span class="diff-badge" [attr.data-diff]="selectedStage.difficulty">{{ selectedStage.difficulty }}</span>
                <span class="duration-badge font-monospace">{{ selectedStage.durationWeeks }}</span>
              </div>
              <h4 class="text-white fw-bold mb-1">{{ selectedStage.title }}</h4>
              <p class="text-secondary small mb-0">{{ selectedStage.description }}</p>
            </div>
            
            <button class="btn-close-preview" (click)="closePreview()" title="Close Preview">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="preview-scroll-body">
            <!-- Interactive Architecture Diagrams (if present) -->
            <div *ngIf="selectedStage.id === '09'" class="mb-4">
              <app-rag-diagram></app-rag-diagram>
            </div>
            <div *ngIf="selectedStage.id === '14'" class="mb-4">
              <app-agent-diagram></app-agent-diagram>
            </div>
            <div *ngIf="selectedStage.id === '25'" class="mb-4">
              <app-eval-benchmark></app-eval-benchmark>
            </div>

            <!-- Concepts Tested & Production Necessity -->
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <div class="preview-quad-box p-3 h-100 rounded-3">
                  <span class="concept-label text-cyan font-monospace mb-1">
                    <i class="fa-solid fa-lightbulb me-1"></i>{{ 'roadmap.whatIsIt' | trans }}
                  </span>
                  <p class="small text-secondary mb-0 leading-relaxed">{{ selectedStage.whatIsIt }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="preview-quad-box p-3 h-100 rounded-3">
                  <span class="concept-label text-emerald font-monospace mb-1">
                    <i class="fa-solid fa-shield-halved me-1"></i>{{ 'roadmap.whyNeeded' | trans }}
                  </span>
                  <p class="small text-secondary mb-0 leading-relaxed">{{ selectedStage.whyNeeded }}</p>
                </div>
              </div>
            </div>

            <!-- What To Learn Checklist -->
            <div class="preview-quad-box p-3 rounded-3 mb-4">
              <h6 class="text-white fw-bold mb-2">
                <i class="fa-solid fa-list-check text-primary me-2"></i>{{ 'roadmap.milestoneChecklist' | trans }}
              </h6>
              <div class="row g-2">
                <div *ngFor="let item of selectedStage.whatToLearn" class="col-md-6">
                  <div class="d-flex align-items-baseline gap-2 small text-secondary">
                    <i class="fa-solid fa-check text-cyan flex-shrink-0"></i>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Course Coverage Breakdown -->
            <div class="preview-quad-box p-3 rounded-3 mb-4">
              <h6 class="text-white fw-bold mb-2">
                <i class="fa-solid fa-graduation-cap text-cyan me-2"></i>{{ 'roadmap.whatCoursesCover' | trans }}
              </h6>
              <ul class="list-unstyled mb-0 small">
                <li *ngFor="let cov of selectedStage.whatCoursesCover" class="mb-1 d-flex align-items-baseline gap-2 text-secondary">
                  <i class="fa-solid fa-bookmark text-primary small flex-shrink-0"></i>
                  <span>{{ cov }}</span>
                </li>
              </ul>
            </div>

            <!-- Interview Question Preview -->
            <div *ngIf="selectedStage.interviewFocus && selectedStage.interviewFocus.length > 0" class="preview-quad-box p-3 rounded-3 mb-4">
              <h6 class="text-white fw-bold mb-2">
                <i class="fa-solid fa-comments text-warning me-2"></i>{{ 'roadmap.interviewFocus' | trans }}
              </h6>
              <div *ngFor="let q of selectedStage.interviewFocus; let qI = index" class="interview-preview-item p-3 mb-2 rounded-2">
                <div class="fw-semibold text-white small mb-1">
                  Q{{ qI + 1 }}: {{ q.question }}
                </div>
                <button class="btn-toggle-answer mb-2" (click)="toggleAnswer('preview_' + qI)">
                  {{ isAnswerVisible('preview_' + qI) ? ('roadmap.hideStrategy' | trans) : ('roadmap.revealStrategy' | trans) }}
                </button>
                <div *ngIf="isAnswerVisible('preview_' + qI)" class="small text-secondary border-top pt-2">
                  <strong class="text-cyan">Strategy:</strong> {{ q.answerStrategy }}
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer CTA -->
          <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-secondary-action" (click)="closePreview()">
              Close
            </button>
            <a [routerLink]="['/stage', selectedStage.id]" class="btn btn-sm btn-primary-action" (click)="closePreview()">
              <span>{{ 'roadmap.openDeepDive' | trans }}</span>
              <i class="fa-solid fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .roadmap-page {
      position: relative;
    }

    /* Radial Progress Meter */
    .progress-meter-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
    }
    .progress-radial-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: conic-gradient(var(--primary) var(--pct), var(--surface-elevated) 0);
      position: relative;
      flex-shrink: 0;
    }
    .progress-radial-circle::before {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--surface-card);
    }
    .progress-radial-circle span {
      position: relative;
      z-index: 1;
      font-size: 0.72rem;
      color: var(--text-primary);
    }

    /* Toolbar & Search */
    .toolbar-box {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
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

    /* View Switcher */
    .view-switcher-group {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      gap: 2px;
    }
    .view-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .view-btn:hover {
      color: var(--text-primary);
      background: var(--surface-hover);
    }
    .view-btn.active {
      background: var(--primary);
      color: #ffffff;
      box-shadow: 0 2px 8px var(--primary-glow);
    }

    /* Category Track */
    .category-pill-track {
      overflow-x: auto;
      scrollbar-width: thin;
      padding-bottom: 2px;
    }
    .filter-pill {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.72rem;
      border-radius: 999px;
      padding: 3px 10px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .filter-pill:hover {
      border-color: var(--border-hover);
      color: var(--text-primary);
    }
    .filter-pill.active {
      background: rgba(59, 130, 246, 0.15);
      border-color: var(--primary);
      color: var(--primary-light);
      font-weight: 600;
    }

    .source-pill, .cov-pill {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.72rem;
      border-radius: var(--radius-sm);
      padding: 2px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .source-pill:hover, .cov-pill:hover {
      color: var(--text-secondary);
      border-color: var(--border-hover);
    }
    .source-pill.active {
      background: rgba(59, 130, 246, 0.15);
      border-color: var(--primary);
      color: var(--primary-light);
      font-weight: 600;
    }
    .cov-pill.active {
      background: var(--success-bg);
      border-color: var(--success);
      color: var(--success);
      font-weight: 600;
    }
    .vr-divider {
      width: 1px;
      height: 18px;
      background: var(--border-subtle);
    }
    .btn-reset-filters {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.75rem;
    }

    /* HERO TITLE */
    .hero-roadmap-title {
      font-size: 2rem;
      letter-spacing: -0.02em;
    }

    /* PHASE NAVIGATOR RIBBON */
    .phase-navigator-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    .phase-pills-scroll {
      overflow-x: auto;
      scrollbar-width: thin;
      padding-bottom: 4px;
    }
    .phase-nav-chip {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 6px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .phase-nav-chip:hover {
      background: var(--surface-hover);
      color: var(--text-primary);
      border-color: var(--primary);
      transform: translateY(-1px);
    }
    .phase-nav-chip.completed {
      border-color: rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.08);
      color: var(--text-primary);
    }
    .phase-nav-chip .chip-num {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--primary-light);
    }
    .phase-nav-chip .chip-pct {
      font-size: 0.7rem;
      padding: 1px 6px;
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      color: var(--text-muted);
    }
    .phase-nav-chip.completed .chip-pct {
      background: rgba(16, 185, 129, 0.15);
      color: #34D399;
    }
    .phase-nav-arrow {
      font-size: 0.75rem;
      flex-shrink: 0;
      opacity: 0.6;
    }
    .btn-action-subtle {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.74rem;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-action-subtle:hover {
      background: var(--surface-hover);
      color: var(--primary-light);
      border-color: var(--primary);
    }

    /* PHASE THEMES */
    .phase-milestone-section[data-phase="1"] { --phase-accent: #10B981; }
    .phase-milestone-section[data-phase="2"] { --phase-accent: #3B82F6; }
    .phase-milestone-section[data-phase="3"] { --phase-accent: #8B5CF6; }
    .phase-milestone-section[data-phase="4"] { --phase-accent: #06B6D4; }
    .phase-milestone-section[data-phase="5"] { --phase-accent: #F59E0B; }
    .phase-milestone-section[data-phase="6"] { --phase-accent: #14B8A6; }
    .phase-milestone-section[data-phase="7"] { --phase-accent: #2563EB; }
    .phase-milestone-section[data-phase="8"] { --phase-accent: #F43F5E; }

    /* PHASE MILESTONE GATEWAY CARD */
    .phase-gateway-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-inline-start: 4px solid var(--phase-accent, var(--primary));
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
    }
    .phase-gateway-card.collapsed {
      opacity: 0.85;
    }
    .phase-gateway-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--border-hover);
    }
    .phase-number-crest {
      width: 44px;
      height: 44px;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: grid;
      place-items: center;
      color: var(--phase-accent, var(--primary-light));
      font-size: 1.15rem;
      font-weight: 800;
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }
    .phase-badge {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--phase-accent, var(--primary-light));
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.25);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-phase-cat {
      background: var(--surface);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
      font-size: 0.7rem;
    }
    .phase-title {
      font-size: 1.2rem;
      line-height: 1.3;
    }
    .phase-progress-wrap {
      min-width: 140px;
    }
    .phase-progress-bar {
      height: 6px;
      background: var(--surface);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }
    .phase-progress-fill {
      height: 100%;
      background: var(--success);
      transition: width 0.3s ease;
    }
    .badge-phase-pct {
      background: var(--surface);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
    }
    .btn-phase-toggle {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-phase-toggle:hover {
      color: var(--text-primary);
      border-color: var(--primary);
      background: var(--surface-hover);
    }

    /* VISUAL ROADMAP SPINE & FLOW NODES */
    .flow-track-wrapper {
      position: relative;
      padding-bottom: 8px;
    }
    .flow-spine-line {
      position: absolute;
      top: 0;
      bottom: 24px;
      inset-inline-start: 22px;
      width: 2px;
      background: linear-gradient(to bottom, var(--phase-accent, #3B82F6) 0%, rgba(148, 163, 184, 0.15) 100%);
      pointer-events: none;
      z-index: 1;
    }
    .flow-stage-row {
      padding-inline-start: 60px;
    }
    .flow-node-marker {
      position: absolute;
      inset-inline-start: 6px;
      top: 18px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--surface-elevated);
      border: 2px solid var(--border-subtle);
      display: grid;
      place-items: center;
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--text-secondary);
      cursor: pointer;
      z-index: 2;
      transition: all 0.2s ease;
      box-shadow: 0 0 0 4px var(--surface-base);
    }
    .flow-node-marker:hover {
      transform: scale(1.1);
      border-color: var(--primary);
      color: var(--primary-light);
    }
    .flow-node-marker.completed {
      background: #10B981;
      border-color: #34D399;
      color: #FFFFFF;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }
    .flow-branch-connector {
      position: absolute;
      inset-inline-start: 40px;
      top: 34px;
      width: 20px;
      height: 2px;
      background: var(--border-subtle);
      z-index: 1;
    }
    .flow-stage-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      position: relative;
    }
    .flow-stage-card:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .flow-stage-card.is-completed {
      border-inline-start: 3px solid var(--success);
    }
    .flow-stage-card.is-active-preview {
      border-color: var(--primary);
      box-shadow: 0 0 16px var(--primary-glow);
    }
    .stage-id-pill {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--primary-light);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }
    .btn-inline-topics {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-inline-topics:hover, .btn-inline-topics.active {
      color: var(--primary-light);
      border-color: var(--primary);
      background: var(--surface-hover);
    }
    .inline-topics-box {
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
    }
    .topic-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-cyan);
      flex-shrink: 0;
    }
    .topic-name {
      font-size: 0.8rem;
    }
    .step-connector-down {
      width: 100%;
    }
    .step-line-stem {
      width: 2px;
      height: 16px;
      background: var(--border-subtle);
      margin: 0 auto 4px;
    }
    .phase-waypoint-bridge {
      margin-inline-start: 60px;
    }
    .bridge-stem-line {
      width: 2px;
      height: 24px;
      background: linear-gradient(to bottom, var(--phase-accent, #3B82F6), rgba(148, 163, 184, 0.2));
      margin: 0 auto 6px;
    }
    .bridge-chip {
      background: var(--surface-card);
      border: 1px dashed var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }

    /* STAGE CARD */
    .stage-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      position: relative;
    }
    .stage-card:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .stage-card.is-completed {
      border-inline-start: 3px solid var(--success);
    }
    .stage-card.is-active-preview {
      border-color: var(--primary);
      box-shadow: 0 0 16px var(--primary-glow);
    }
    .stage-card-title {
      font-size: 1rem;
      line-height: 1.35;
    }
    .stage-card-desc {
      line-height: 1.5;
    }
    .stage-num-badge {
      width: 28px;
      height: 28px;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      display: grid;
      place-items: center;
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--primary-light);
    }
    .stage-cat-pill {
      font-size: 0.68rem;
      background: var(--surface);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }
    .diff-badge {
      font-size: 0.65rem;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .diff-badge[data-diff="Beginner"] { border-color: var(--success-border); color: var(--success); }
    .diff-badge[data-diff="Intermediate"] { border-color: var(--warning-border); color: var(--warning); }
    .diff-badge[data-diff="Advanced"] { border-color: var(--error-border); color: var(--error); }

    .duration-badge {
      font-size: 0.68rem;
      color: var(--text-muted);
    }

    .btn-stage-check {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.15s ease;
      font-size: 0.75rem;
    }
    .btn-stage-check:hover {
      border-color: var(--success);
      color: var(--success);
    }
    .btn-stage-check.checked {
      background: var(--success-bg);
      border-color: var(--success);
      color: var(--success);
    }

    .btn-stage-check-mini {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.85rem;
    }
    .btn-stage-check-mini.checked {
      color: var(--success);
    }

    .diagram-pill {
      font-size: 0.68rem;
      background: rgba(6, 182, 212, 0.12);
      border: 1px solid rgba(6, 182, 212, 0.3);
      color: var(--accent-cyan);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }

    .btn-quick-preview {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.75rem;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
    }
    .btn-quick-preview:hover {
      border-color: var(--primary);
      color: var(--primary-light);
      background: var(--surface-hover);
    }

    .btn-deep-dive {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: 0.75rem;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      text-decoration: none !important;
      transition: all 0.15s ease;
    }
    .btn-deep-dive:hover {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff !important;
    }

    /* TRACKER TABLE STYLES */
    .tracker-head th {
      background: var(--surface);
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-subtle);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 12px 14px;
    }
    .tracker-row td {
      border-bottom: 1px solid var(--border-subtle);
      padding: 12px 14px;
      background: transparent;
      font-size: 0.82rem;
    }
    .tracker-row:hover td {
      background: var(--surface-hover);
    }
    .tracker-row.is-completed td {
      background: rgba(34, 197, 94, 0.02);
    }
    .stage-num-text {
      color: var(--primary-light);
    }
    .cat-badge-tracker {
      background: var(--surface);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
      font-size: 0.7rem;
    }

    /* SLIDE-OVER PREVIEW MODAL */
    .stage-preview-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 1060;
      display: flex;
      justify-content: flex-end;
    }
    .stage-preview-modal {
      width: 100%;
      max-width: 760px;
      height: 100vh;
      background: var(--surface-card);
      border-inline-start: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.25s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slideInRtl {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    [dir="rtl"] .stage-preview-modal {
      animation: slideInRtl 0.25s ease-out;
    }
    .btn-close-preview {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-sm);
      cursor: pointer;
    }
    .btn-close-preview:hover {
      color: var(--text-primary);
      border-color: var(--border-hover);
    }
    .preview-scroll-body {
      overflow-y: auto;
      scrollbar-width: thin;
      padding-inline-end: 4px;
      flex-grow: 1;
    }
    .preview-quad-box {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .concept-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: block;
    }
    .interview-preview-item {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
    }
    .btn-toggle-answer {
      background: transparent;
      border: none;
      color: var(--primary-light);
      font-size: 0.72rem;
      cursor: pointer;
      text-decoration: underline;
      padding: 0;
    }
    .badge-subtle-primary {
      background: var(--primary-subtle);
      color: var(--primary-light);
      border: 1px solid rgba(21, 82, 57, 0.25);
    }
    .badge-subtle-info {
      background: var(--info-bg);
      color: var(--info);
      border: 1px solid var(--info-border);
    }
    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @media (max-width: 575.98px) {
      .view-switcher-group {
        width: 100%;
        display: flex !important;
      }
      .view-btn {
        flex: 1;
        text-align: center;
        padding: 6px 4px;
        font-size: 0.7rem;
      }
      .progress-meter-card {
        width: 100%;
        justify-content: space-between;
      }
      .stage-preview-modal {
        max-width: 100% !important;
      }
    }
  `]
})
export class RoadmapComponent implements OnInit, OnDestroy {
  stages: RoadmapStage[] = ROADMAP_STAGES;
  filteredStages: RoadmapStage[] = [];
  selectedStage: RoadmapStage | null = null;
  previewOpen = false;
  viewMode: 'flow' | 'grid' | 'table' = 'flow';

  expandedPhases: Set<number> = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8]);
  expandedTopics: Set<string> = new Set<string>();

  searchQuery = '';
  selectedCategory = 'All';
  selectedCourse = 'All';
  selectedCoverage = 'All';

  // 8 Structured Learning Phases
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

  courseFilters = ['All', 'Course 01', 'Course 02', 'Course 03'];

  coverageFilters = [
    { key: 'All', label: 'filter.all' },
    { key: 'Covered', label: 'cov.covered' },
    { key: 'Partially Covered', label: 'cov.partial' },
    { key: 'Not Covered', label: 'cov.notCovered' }
  ];

  completedStageIds: string[] = [];
  revealedAnswers: Set<string> = new Set<string>();

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
    const stageIdsInPhase = phase.stageIds;
    return this.completedStageIds.filter(id => stageIdsInPhase.includes(id)).length;
  }

  getPhaseProgressPct(phase: RoadmapPhase): number {
    const total = phase.stageIds.length;
    if (total === 0) return 0;
    const completed = this.getPhaseCompletedCount(phase);
    return Math.round((completed / total) * 100);
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

  setCourse(course: string) {
    this.selectedCourse = course;
    this.applyFilters();
  }

  setCoverage(cov: string) {
    this.selectedCoverage = cov;
    this.applyFilters();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.selectedCourse = 'All';
    this.selectedCoverage = 'All';
    this.applyFilters();
  }

  applyFilters() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredStages = this.stages.filter(s => {
      const matchCat = this.selectedCategory === 'All' || s.category.toLowerCase().includes(this.selectedCategory.toLowerCase());
      const matchCourse = this.selectedCourse === 'All' || s.courseSources.some(c => c.toLowerCase().includes(this.selectedCourse.toLowerCase()));
      const matchCov = this.selectedCoverage === 'All' || s.coverageStatus === this.selectedCoverage;
      const matchSearch = !q || (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.topicsList.some(t => t.toLowerCase().includes(q)) ||
        s.tools.some(t => t.toLowerCase().includes(q)) ||
        (s.whatCoursesCover && s.whatCoursesCover.some(c => c.toLowerCase().includes(q))) ||
        (s.whatIsMissing && s.whatIsMissing.toLowerCase().includes(q))
      );
      return matchCat && matchCourse && matchCov && matchSearch;
    });
  }

  toggleCompletion(event: Event, stageId: string) {
    event.stopPropagation();
    this.progressService.toggleStage(stageId);
  }

  isCompleted(stageId: string): boolean {
    return this.completedStageIds.includes(stageId);
  }

  toggleAnswer(identifier: string) {
    if (this.revealedAnswers.has(identifier)) {
      this.revealedAnswers.delete(identifier);
    } else {
      this.revealedAnswers.add(identifier);
    }
  }

  isAnswerVisible(identifier: string): boolean {
    return this.revealedAnswers.has(identifier);
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

  toggleTopics(stageId: string, event: Event): void {
    event.stopPropagation();
    if (this.expandedTopics.has(stageId)) {
      this.expandedTopics.delete(stageId);
    } else {
      this.expandedTopics.add(stageId);
    }
  }

  isTopicsExpanded(stageId: string): boolean {
    return this.expandedTopics.has(stageId);
  }

  scrollToPhase(phaseId: number): void {
    const el = document.getElementById('phase-milestone-' + phaseId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
