import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ROADMAP_STAGES } from '../../data/roadmap.data';
import { RoadmapStage } from '../../models/roadmap.model';
import { MOVIES_STAGES, MOVIES_PHASES, MovieStage, MoviePhase } from '../../data/movies-roadmap.data';
import { ENGLISH_STAGES, ENGLISH_PHASES, EnglishStage, EnglishPhase } from '../../data/english-roadmap.data';
import { BOOKS_STAGES, BOOKS_PHASES, BookStage, BookPhase } from '../../data/books-roadmap.data';
import { ProgressService } from '../../services/progress.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { RagDiagramComponent } from '../../components/rag-diagram/rag-diagram.component';
import { AgentDiagramComponent } from '../../components/agent-diagram/agent-diagram.component';
import { EvalBenchmarkComponent } from '../../components/eval-benchmark/eval-benchmark.component';
import { Subscription } from 'rxjs';

export type RoadmapTrack = 'ai' | 'movies' | 'english' | 'books';

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
        <!-- MASTER TRACK SELECTOR (AI, Movies, English, Books)            -->
        <!-- ============================================================= -->
        <div class="track-selector-bar mb-4">
          <div class="row g-2">
            <!-- 01: AI Engineering Track -->
            <div class="col-lg-3 col-6">
              <button 
                class="track-selector-card w-100 p-3 text-start d-flex align-items-center gap-3"
                [class.active]="activeTrack === 'ai'"
                (click)="switchTrack('ai')"
              >
                <div class="track-number-crest font-monospace">01</div>
                <div class="track-meta-content flex-grow-1 min-w-0">
                  <div class="track-title-text fw-bold text-truncate">
                    {{ currentLang === 'ar' ? 'هندسة الذكاء الاصطناعي' : 'AI Engineering' }}
                  </div>
                  <div class="track-sub-text small text-secondary">
                    26 {{ currentLang === 'ar' ? 'محطة برمجية' : 'Tech Stages' }}
                  </div>
                </div>
                <span *ngIf="activeTrack === 'ai'" class="active-dot"></span>
              </button>
            </div>

            <!-- 02: Cinema & Movies Track -->
            <div class="col-lg-3 col-6">
              <button 
                class="track-selector-card w-100 p-3 text-start d-flex align-items-center gap-3"
                [class.active]="activeTrack === 'movies'"
                (click)="switchTrack('movies')"
              >
                <div class="track-number-crest font-monospace">02</div>
                <div class="track-meta-content flex-grow-1 min-w-0">
                  <div class="track-title-text fw-bold text-truncate">
                    {{ currentLang === 'ar' ? 'السينما والأفلام العظيمة' : 'Cinema & Movies' }}
                  </div>
                  <div class="track-sub-text small text-secondary">
                    24 {{ currentLang === 'ar' ? 'فيلماً أسطورياً' : 'Masterpieces' }}
                  </div>
                </div>
                <span *ngIf="activeTrack === 'movies'" class="active-dot"></span>
              </button>
            </div>

            <!-- 03: English Mastery Track -->
            <div class="col-lg-3 col-6">
              <button 
                class="track-selector-card w-100 p-3 text-start d-flex align-items-center gap-3"
                [class.active]="activeTrack === 'english'"
                (click)="switchTrack('english')"
              >
                <div class="track-number-crest font-monospace">03</div>
                <div class="track-meta-content flex-grow-1 min-w-0">
                  <div class="track-title-text fw-bold text-truncate">
                    {{ currentLang === 'ar' ? 'إتقان اللغة الإنجليزية' : 'English Mastery' }}
                  </div>
                  <div class="track-sub-text small text-secondary">
                    16 {{ currentLang === 'ar' ? 'محطة محادثة وطلاقة' : 'Fluency Stages' }}
                  </div>
                </div>
                <span *ngIf="activeTrack === 'english'" class="active-dot"></span>
              </button>
            </div>

            <!-- 04: Books & Mindset Track -->
            <div class="col-lg-3 col-6">
              <button 
                class="track-selector-card w-100 p-3 text-start d-flex align-items-center gap-3"
                [class.active]="activeTrack === 'books'"
                (click)="switchTrack('books')"
              >
                <div class="track-number-crest font-monospace">04</div>
                <div class="track-meta-content flex-grow-1 min-w-0">
                  <div class="track-title-text fw-bold text-truncate">
                    {{ currentLang === 'ar' ? 'الكتب وتطوير الذات' : 'Books & Mindset' }}
                  </div>
                  <div class="track-sub-text small text-secondary">
                    16 {{ currentLang === 'ar' ? 'كتاباً تأسيسياً' : 'Foundational Books' }}
                  </div>
                </div>
                <span *ngIf="activeTrack === 'books'" class="active-dot"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ============================================================= -->
        <!-- CLEAN AIRY HEADER & DYNAMIC PROGRESS METER                    -->
        <!-- ============================================================= -->
        <header class="roadmap-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div class="hero-text-block">
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ activeTrackKicker }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">{{ currentTotalCount }} {{ activeTrackItemUnit }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">{{ activeTrackTitle }}</h1>
              <p class="hero-desc mb-0">{{ activeTrackDescription }}</p>
            </div>

            <!-- Integrated Linear Progress Box -->
            <div class="progress-box p-3">
              <div class="d-flex justify-content-between align-items-center gap-3 mb-2">
                <span class="progress-label fw-semibold">
                  <i class="fa-solid fa-list-check me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'مستوى تقدمك في هذا المسار' : 'Track Progress' }}
                </span>
                <span class="progress-pct-badge font-monospace">{{ currentProgressPercentage }}%</span>
              </div>
              <div class="custom-progress-track mb-2">
                <div class="custom-progress-fill" [style.width.%]="currentProgressPercentage"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center small text-secondary font-monospace">
                <span>{{ currentCompletedCount }} / {{ currentTotalCount }} {{ currentLang === 'ar' ? 'مكتمل' : 'completed' }}</span>
                <span class="text-muted">{{ currentTotalCount - currentCompletedCount }} {{ currentLang === 'ar' ? 'متبقية' : 'remaining' }}</span>
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
              <span class="text-secondary small">{{ currentPhases.length }} {{ currentLang === 'ar' ? 'مراحل متسلسلة' : 'Connected Phases' }}</span>
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
              *ngFor="let p of currentPhases" 
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
                  [placeholder]="searchPlaceholder"
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
                {{ currentFilteredCount }} / {{ currentTotalCount }} {{ activeTrackItemUnit }}
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
              *ngFor="let cat of currentCategories" 
              class="category-pill"
              [class.active]="selectedCategory === cat.key"
              (click)="setCategory(cat.key)"
            >
              {{ currentLang === 'ar' ? cat.labelAr : cat.labelEn }}
            </button>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div *ngIf="currentFilteredCount === 0" class="empty-state-card text-center py-5 my-4">
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
        <!-- TRACK 1: AI ENGINEERING ROADMAP NODES                         -->
        <!-- ============================================================= -->
        <div *ngIf="activeTrack === 'ai' && filteredAiStages.length > 0" class="flow-view-wrapper">
          <section *ngFor="let phase of visibleAiPhases; let pIdx = index" [id]="'phase-milestone-' + phase.id" class="phase-section mb-5">
            <!-- Phase Chapter Banner -->
            <div class="phase-chapter-header p-3 p-md-4 mb-4" [class.collapsed]="!isPhaseExpanded(phase.id)">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="phase-number-crest font-monospace">{{ phase.numberStr }}</div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <span class="phase-badge font-monospace">{{ 'roadmap.phasePrefix' | trans }} {{ phase.numberStr }}</span>
                      <span class="phase-cat-pill">{{ phase.category }}</span>
                      <span class="phase-duration font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ phase.durationWeeks }}</span>
                    </div>
                    <h3 class="phase-title fw-bold mb-1">{{ currentLang === 'ar' ? phase.titleAr : phase.titleEn }}</h3>
                    <p class="phase-desc text-secondary small mb-0">{{ currentLang === 'ar' ? phase.descAr : phase.descEn }}</p>
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

                  <button class="btn-phase-toggle" (click)="togglePhase(phase.id)">
                    <i class="fa-solid" [class.fa-chevron-up]="isPhaseExpanded(phase.id)" [class.fa-chevron-down]="!isPhaseExpanded(phase.id)"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Connected Nodes Stream -->
            <div *ngIf="isPhaseExpanded(phase.id)" class="nodes-stream-container">
              <div class="spine-line"></div>
              <div class="stages-stream">
                <article *ngFor="let stage of getPhaseStages(phase)" class="stage-node-item" [class.is-completed]="isItemCompleted(stage.id)">
                  <button 
                    type="button"
                    class="node-pin-btn"
                    [class.completed]="isItemCompleted(stage.id)"
                    (click)="toggleItemCompletion($event, stage.id)"
                    [title]="isItemCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                  >
                    <i *ngIf="isItemCompleted(stage.id)" class="fa-solid fa-check"></i>
                    <span *ngIf="!isItemCompleted(stage.id)" class="pin-number font-monospace">{{ stage.id }}</span>
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
                        [class.checked]="isItemCompleted(stage.id)"
                        (click)="toggleItemCompletion($event, stage.id)"
                      >
                        <i class="fa-solid" [class.fa-check]="isItemCompleted(stage.id)" [class.fa-circle]="!isItemCompleted(stage.id)"></i>
                      </button>
                    </div>

                    <h4 class="node-title fw-bold mb-2">
                      <a [routerLink]="['/stage', stage.id]" class="node-title-link">{{ stage.title }}</a>
                    </h4>
                    <p class="node-desc text-secondary small mb-3">{{ stage.tagline }}</p>

                    <div class="d-flex flex-wrap align-items-center gap-1 mb-3">
                      <span *ngFor="let tool of stage.tools.slice(0, 4)" class="node-tool-chip font-monospace">{{ tool }}</span>
                      <span *ngIf="stage.tools.length > 4" class="node-tool-chip text-muted font-monospace">+{{ stage.tools.length - 4 }}</span>
                    </div>

                    <div class="node-footer pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <div class="d-flex align-items-center gap-1">
                        <span *ngFor="let c of stage.courseSources.slice(0, 2)" class="node-course-tag">{{ c }}</span>
                      </div>
                      <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-quick-inspect" (click)="openAiDrawer(stage)">
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
            <div *ngIf="pIdx < visibleAiPhases.length - 1" class="phase-waypoint-bridge my-4 text-center">
              <div class="waypoint-stem"></div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill waypoint-chip">
                <i class="fa-solid fa-circle-check text-mint small"></i>
                <span class="small font-monospace text-secondary">
                  {{ 'roadmap.phaseComplete' | trans }} {{ phase.numberStr }} · {{ 'roadmap.proceedTo' | trans }} {{ visibleAiPhases[pIdx + 1].numberStr }}
                </span>
                <i class="fa-solid fa-arrow-down small text-mint"></i>
              </div>
            </div>
          </section>
        </div>

        <!-- ============================================================= -->
        <!-- TRACK 2: CINEMA & MOVIES ROADMAP NODES                        -->
        <!-- ============================================================= -->
        <div *ngIf="activeTrack === 'movies' && filteredMovieStages.length > 0" class="flow-view-wrapper">
          <section *ngFor="let phase of visibleMoviePhases; let pIdx = index" [id]="'phase-milestone-' + phase.id" class="phase-section mb-5">
            <!-- Phase Chapter Banner -->
            <div class="phase-chapter-header p-3 p-md-4 mb-4" [class.collapsed]="!isPhaseExpanded(phase.id)">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="phase-number-crest font-monospace">{{ phase.numberStr }}</div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <span class="phase-badge font-monospace">{{ currentLang === 'ar' ? 'المرحلة السينمائية' : 'Cinema Phase' }} {{ phase.numberStr }}</span>
                      <span class="phase-duration font-monospace"><i class="fa-solid fa-film me-1"></i>{{ phase.durationWeeks }}</span>
                    </div>
                    <h3 class="phase-title fw-bold mb-1">{{ currentLang === 'ar' ? phase.titleAr : phase.titleEn }}</h3>
                    <p class="phase-desc text-secondary small mb-0">{{ currentLang === 'ar' ? phase.descAr : phase.descEn }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-shrink-0 align-self-md-center align-self-end">
                  <div class="phase-meter text-md-end">
                    <div class="d-flex align-items-center gap-2 justify-content-md-end mb-1">
                      <span class="small font-monospace text-secondary">
                        {{ getPhaseCompletedCount(phase) }}/{{ getPhaseMovieStages(phase).length }} {{ currentLang === 'ar' ? 'تمت مشاهدته' : 'Watched' }}
                      </span>
                      <span class="phase-pct-badge font-monospace" [class.done]="getPhaseProgressPct(phase) === 100">
                        {{ getPhaseProgressPct(phase) }}%
                      </span>
                    </div>
                    <div class="phase-progress-track">
                      <div class="phase-progress-bar" [style.width.%]="getPhaseProgressPct(phase)"></div>
                    </div>
                  </div>
                  <button class="btn-phase-toggle" (click)="togglePhase(phase.id)">
                    <i class="fa-solid" [class.fa-chevron-up]="isPhaseExpanded(phase.id)" [class.fa-chevron-down]="!isPhaseExpanded(phase.id)"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Connected Movie Nodes -->
            <div *ngIf="isPhaseExpanded(phase.id)" class="nodes-stream-container">
              <div class="spine-line"></div>
              <div class="stages-stream">
                <article *ngFor="let movie of getPhaseMovieStages(phase)" class="stage-node-item" [class.is-completed]="isItemCompleted(movie.id)">
                  <button 
                    type="button"
                    class="node-pin-btn"
                    [class.completed]="isItemCompleted(movie.id)"
                    (click)="toggleItemCompletion($event, movie.id)"
                    [title]="isItemCompleted(movie.id) ? 'Mark as Unwatched' : 'Mark as Watched'"
                  >
                    <i *ngIf="isItemCompleted(movie.id)" class="fa-solid fa-check"></i>
                    <i *ngIf="!isItemCompleted(movie.id)" class="fa-solid fa-film"></i>
                  </button>
                  <div class="node-branch-line"></div>

                  <div class="node-card-body p-3 p-md-4">
                    <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="stage-code font-monospace">{{ movie.year }}</span>
                        <span class="stage-tag">{{ movie.genre }}</span>
                        <span class="movie-rating-badge font-monospace">★ {{ movie.imdbRating }}</span>
                        <span class="stage-time font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ movie.duration }}</span>
                        <span class="director-chip font-monospace"><i class="fa-solid fa-clapperboard me-1"></i>{{ movie.director }}</span>
                      </div>
                      <button 
                        class="btn-stage-checkbox"
                        [class.checked]="isItemCompleted(movie.id)"
                        (click)="toggleItemCompletion($event, movie.id)"
                        [title]="isItemCompleted(movie.id) ? 'Mark as Unwatched' : 'Mark as Watched'"
                      >
                        <i class="fa-solid" [class.fa-check]="isItemCompleted(movie.id)" [class.fa-circle]="!isItemCompleted(movie.id)"></i>
                      </button>
                    </div>

                    <h4 class="node-title fw-bold mb-2">
                      <span class="node-title-link" (click)="openMovieDrawer(movie)" style="cursor: pointer;">
                        {{ currentLang === 'ar' ? movie.titleAr : movie.title }}
                      </span>
                    </h4>
                    <p class="node-desc text-secondary small mb-3">
                      {{ currentLang === 'ar' ? movie.synopsisAr : movie.synopsis }}
                    </p>

                    <div class="d-flex flex-wrap align-items-center gap-1 mb-3">
                      <span *ngFor="let theme of movie.keyThemes" class="node-tool-chip font-monospace">
                        #{{ theme }}
                      </span>
                    </div>

                    <div class="node-footer pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <span class="text-secondary small fst-italic">
                        "{{ currentLang === 'ar' ? movie.taglineAr : movie.tagline }}"
                      </span>
                      <button class="btn btn-sm btn-quick-inspect" (click)="openMovieDrawer(movie)">
                        <i class="fa-solid fa-circle-info me-1"></i>
                        <span>{{ currentLang === 'ar' ? 'لماذا تشاهده وتفاصيل الفيلم' : 'Why Watch & Film Guide' }}</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- Waypoint Bridge -->
            <div *ngIf="pIdx < visibleMoviePhases.length - 1" class="phase-waypoint-bridge my-4 text-center">
              <div class="waypoint-stem"></div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill waypoint-chip">
                <i class="fa-solid fa-circle-check text-mint small"></i>
                <span class="small font-monospace text-secondary">
                  {{ currentLang === 'ar' ? 'اكتملت مرحلة' : 'Completed Phase' }} {{ phase.numberStr }} · {{ currentLang === 'ar' ? 'الانتقال إلى المرحلة التالية' : 'Next Cinema Chapter' }}
                </span>
                <i class="fa-solid fa-arrow-down small text-mint"></i>
              </div>
            </div>
          </section>
        </div>

        <!-- ============================================================= -->
        <!-- TRACK 3: ENGLISH MASTERY ROADMAP NODES                        -->
        <!-- ============================================================= -->
        <div *ngIf="activeTrack === 'english' && filteredEnglishStages.length > 0" class="flow-view-wrapper">
          <section *ngFor="let phase of visibleEnglishPhases; let pIdx = index" [id]="'phase-milestone-' + phase.id" class="phase-section mb-5">
            <!-- Phase Chapter Banner -->
            <div class="phase-chapter-header p-3 p-md-4 mb-4" [class.collapsed]="!isPhaseExpanded(phase.id)">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="phase-number-crest font-monospace">{{ phase.numberStr }}</div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <span class="phase-badge font-monospace">{{ currentLang === 'ar' ? 'المرحلة' : 'Phase' }} {{ phase.numberStr }}</span>
                      <span class="phase-duration font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ phase.durationWeeks }}</span>
                    </div>
                    <h3 class="phase-title fw-bold mb-1">{{ currentLang === 'ar' ? phase.titleAr : phase.titleEn }}</h3>
                    <p class="phase-desc text-secondary small mb-0">{{ currentLang === 'ar' ? phase.descAr : phase.descEn }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-shrink-0 align-self-md-center align-self-end">
                  <div class="phase-meter text-md-end">
                    <div class="d-flex align-items-center gap-2 justify-content-md-end mb-1">
                      <span class="small font-monospace text-secondary">
                        {{ getPhaseCompletedCount(phase) }}/{{ getPhaseEnglishStages(phase).length }} {{ 'roadmap.completed' | trans }}
                      </span>
                      <span class="phase-pct-badge font-monospace" [class.done]="getPhaseProgressPct(phase) === 100">
                        {{ getPhaseProgressPct(phase) }}%
                      </span>
                    </div>
                    <div class="phase-progress-track">
                      <div class="phase-progress-bar" [style.width.%]="getPhaseProgressPct(phase)"></div>
                    </div>
                  </div>
                  <button class="btn-phase-toggle" (click)="togglePhase(phase.id)">
                    <i class="fa-solid" [class.fa-chevron-up]="isPhaseExpanded(phase.id)" [class.fa-chevron-down]="!isPhaseExpanded(phase.id)"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Connected English Nodes -->
            <div *ngIf="isPhaseExpanded(phase.id)" class="nodes-stream-container">
              <div class="spine-line"></div>
              <div class="stages-stream">
                <article *ngFor="let stage of getPhaseEnglishStages(phase)" class="stage-node-item" [class.is-completed]="isItemCompleted(stage.id)">
                  <button 
                    type="button"
                    class="node-pin-btn"
                    [class.completed]="isItemCompleted(stage.id)"
                    (click)="toggleItemCompletion($event, stage.id)"
                    [title]="isItemCompleted(stage.id) ? 'Mark Incomplete' : 'Mark Completed'"
                  >
                    <i *ngIf="isItemCompleted(stage.id)" class="fa-solid fa-check"></i>
                    <i *ngIf="!isItemCompleted(stage.id)" class="fa-solid fa-headphones"></i>
                  </button>
                  <div class="node-branch-line"></div>

                  <div class="node-card-body p-3 p-md-4">
                    <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="stage-code font-monospace">{{ stage.id }}</span>
                        <span class="stage-tag">{{ stage.category }}</span>
                        <span class="stage-diff" [attr.data-diff]="stage.level">{{ stage.level }}</span>
                        <span class="stage-time font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ stage.durationWeeks }}</span>
                      </div>
                      <button 
                        class="btn-stage-checkbox"
                        [class.checked]="isItemCompleted(stage.id)"
                        (click)="toggleItemCompletion($event, stage.id)"
                      >
                        <i class="fa-solid" [class.fa-check]="isItemCompleted(stage.id)" [class.fa-circle]="!isItemCompleted(stage.id)"></i>
                      </button>
                    </div>

                    <h4 class="node-title fw-bold mb-2">
                      <span class="node-title-link" (click)="openEnglishDrawer(stage)" style="cursor: pointer;">
                        {{ currentLang === 'ar' ? stage.titleAr : stage.title }}
                      </span>
                    </h4>
                    <p class="node-desc text-secondary small mb-3">
                      {{ currentLang === 'ar' ? stage.taglineAr : stage.tagline }}
                    </p>

                    <div class="d-flex flex-wrap align-items-center gap-1 mb-3">
                      <span *ngFor="let topic of stage.keyTopics" class="node-tool-chip font-monospace">
                        {{ topic }}
                      </span>
                    </div>

                    <div class="node-footer pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <div class="d-flex align-items-center gap-1">
                        <span class="text-secondary small">
                          <strong>{{ currentLang === 'ar' ? 'العادة اليومية:' : 'Daily Habit:' }}</strong> {{ currentLang === 'ar' ? stage.dailyHabitAr : stage.dailyHabit }}
                        </span>
                      </div>
                      <button class="btn btn-sm btn-quick-inspect" (click)="openEnglishDrawer(stage)">
                        <i class="fa-solid fa-book-open-reader me-1"></i>
                        <span>{{ currentLang === 'ar' ? 'الخطة والأدوات' : 'Plan & Tools' }}</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- Waypoint Bridge -->
            <div *ngIf="pIdx < visibleEnglishPhases.length - 1" class="phase-waypoint-bridge my-4 text-center">
              <div class="waypoint-stem"></div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill waypoint-chip">
                <i class="fa-solid fa-circle-check text-mint small"></i>
                <span class="small font-monospace text-secondary">
                  {{ currentLang === 'ar' ? 'اكتملت المرحلة' : 'Completed Phase' }} {{ phase.numberStr }} · {{ currentLang === 'ar' ? 'الانتقال إلى المرحلة التالية' : 'Next English Milestone' }}
                </span>
                <i class="fa-solid fa-arrow-down small text-mint"></i>
              </div>
            </div>
          </section>
        </div>

        <!-- ============================================================= -->
        <!-- TRACK 4: BOOKS & MINDSET ROADMAP NODES                        -->
        <!-- ============================================================= -->
        <div *ngIf="activeTrack === 'books' && filteredBookStages.length > 0" class="flow-view-wrapper">
          <section *ngFor="let phase of visibleBookPhases; let pIdx = index" [id]="'phase-milestone-' + phase.id" class="phase-section mb-5">
            <!-- Phase Chapter Banner -->
            <div class="phase-chapter-header p-3 p-md-4 mb-4" [class.collapsed]="!isPhaseExpanded(phase.id)">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="phase-number-crest font-monospace">{{ phase.numberStr }}</div>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <span class="phase-badge font-monospace">{{ currentLang === 'ar' ? 'المرحلة' : 'Phase' }} {{ phase.numberStr }}</span>
                      <span class="phase-duration font-monospace"><i class="fa-solid fa-book me-1"></i>{{ phase.durationWeeks }}</span>
                    </div>
                    <h3 class="phase-title fw-bold mb-1">{{ currentLang === 'ar' ? phase.titleAr : phase.titleEn }}</h3>
                    <p class="phase-desc text-secondary small mb-0">{{ currentLang === 'ar' ? phase.descAr : phase.descEn }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-shrink-0 align-self-md-center align-self-end">
                  <div class="phase-meter text-md-end">
                    <div class="d-flex align-items-center gap-2 justify-content-md-end mb-1">
                      <span class="small font-monospace text-secondary">
                        {{ getPhaseCompletedCount(phase) }}/{{ getPhaseBookStages(phase).length }} {{ currentLang === 'ar' ? 'تمت قراءته' : 'Read' }}
                      </span>
                      <span class="phase-pct-badge font-monospace" [class.done]="getPhaseProgressPct(phase) === 100">
                        {{ getPhaseProgressPct(phase) }}%
                      </span>
                    </div>
                    <div class="phase-progress-track">
                      <div class="phase-progress-bar" [style.width.%]="getPhaseProgressPct(phase)"></div>
                    </div>
                  </div>
                  <button class="btn-phase-toggle" (click)="togglePhase(phase.id)">
                    <i class="fa-solid" [class.fa-chevron-up]="isPhaseExpanded(phase.id)" [class.fa-chevron-down]="!isPhaseExpanded(phase.id)"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Connected Book Nodes -->
            <div *ngIf="isPhaseExpanded(phase.id)" class="nodes-stream-container">
              <div class="spine-line"></div>
              <div class="stages-stream">
                <article *ngFor="let book of getPhaseBookStages(phase)" class="stage-node-item" [class.is-completed]="isItemCompleted(book.id)">
                  <button 
                    type="button"
                    class="node-pin-btn"
                    [class.completed]="isItemCompleted(book.id)"
                    (click)="toggleItemCompletion($event, book.id)"
                    [title]="isItemCompleted(book.id) ? 'Mark as Unread' : 'Mark as Read'"
                  >
                    <i *ngIf="isItemCompleted(book.id)" class="fa-solid fa-check"></i>
                    <i *ngIf="!isItemCompleted(book.id)" class="fa-solid fa-book-bookmark"></i>
                  </button>
                  <div class="node-branch-line"></div>

                  <div class="node-card-body p-3 p-md-4">
                    <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="stage-code font-monospace">{{ book.year }}</span>
                        <span class="stage-tag">{{ book.category }}</span>
                        <span class="stage-time font-monospace"><i class="fa-regular fa-file-lines me-1"></i>{{ book.pages }} pages</span>
                        <span class="director-chip font-monospace"><i class="fa-solid fa-pen-nib me-1"></i>{{ book.author }}</span>
                      </div>
                      <button 
                        class="btn-stage-checkbox"
                        [class.checked]="isItemCompleted(book.id)"
                        (click)="toggleItemCompletion($event, book.id)"
                        [title]="isItemCompleted(book.id) ? 'Mark as Unread' : 'Mark as Read'"
                      >
                        <i class="fa-solid" [class.fa-check]="isItemCompleted(book.id)" [class.fa-circle]="!isItemCompleted(book.id)"></i>
                      </button>
                    </div>

                    <h4 class="node-title fw-bold mb-2">
                      <span class="node-title-link" (click)="openBookDrawer(book)" style="cursor: pointer;">
                        {{ currentLang === 'ar' ? book.titleAr : book.title }}
                      </span>
                    </h4>
                    <p class="node-desc text-secondary small mb-3">
                      {{ currentLang === 'ar' ? book.coreIdeaAr : book.coreIdea }}
                    </p>

                    <div class="d-flex flex-wrap align-items-center gap-1 mb-3">
                      <span *ngFor="let theme of book.keyThemes" class="node-tool-chip font-monospace">
                        #{{ theme }}
                      </span>
                    </div>

                    <div class="node-footer pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <span class="text-secondary small fst-italic">
                        "{{ currentLang === 'ar' ? book.taglineAr : book.tagline }}"
                      </span>
                      <button class="btn btn-sm btn-quick-inspect" (click)="openBookDrawer(book)">
                        <i class="fa-solid fa-lightbulb me-1"></i>
                        <span>{{ currentLang === 'ar' ? 'الدروس المستفادة والملخص' : 'Key Takeaways & Summary' }}</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- Waypoint Bridge -->
            <div *ngIf="pIdx < visibleBookPhases.length - 1" class="phase-waypoint-bridge my-4 text-center">
              <div class="waypoint-stem"></div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill waypoint-chip">
                <i class="fa-solid fa-circle-check text-mint small"></i>
                <span class="small font-monospace text-secondary">
                  {{ currentLang === 'ar' ? 'اكتملت المرحلة' : 'Completed Phase' }} {{ phase.numberStr }} · {{ currentLang === 'ar' ? 'الانتقال إلى الفصل التالي' : 'Next Reading Chapter' }}
                </span>
                <i class="fa-solid fa-arrow-down small text-mint"></i>
              </div>
            </div>
          </section>
        </div>

      </div>

      <!-- ============================================================= -->
      <!-- SLIDE-OVER UNIFIED INSPECTOR DRAWER                          -->
      <!-- ============================================================= -->
      <div *ngIf="drawerOpen" class="stage-preview-backdrop" (click)="closeDrawer()">
        <div class="stage-preview-modal p-3 p-sm-4" (click)="$event.stopPropagation()">
          
          <!-- AI Stage Drawer Content -->
          <ng-container *ngIf="selectedAiStage">
            <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
              <div>
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                  <span class="stage-code font-monospace">Stage {{ selectedAiStage.id }}</span>
                  <span class="stage-tag">{{ selectedAiStage.category }}</span>
                  <span class="stage-diff" [attr.data-diff]="selectedAiStage.difficulty">{{ selectedAiStage.difficulty }}</span>
                  <span class="stage-time font-monospace">{{ selectedAiStage.durationWeeks }}</span>
                </div>
                <h4 class="fw-bold mb-1 drawer-heading">{{ selectedAiStage.title }}</h4>
                <p class="text-secondary small mb-0">{{ selectedAiStage.description }}</p>
              </div>
              <button class="btn-close-drawer" (click)="closeDrawer()" title="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="preview-scroll-body">
              <div *ngIf="selectedAiStage.id === '09'" class="mb-4"><app-rag-diagram></app-rag-diagram></div>
              <div *ngIf="selectedAiStage.id === '14'" class="mb-4"><app-agent-diagram></app-agent-diagram></div>
              <div *ngIf="selectedAiStage.id === '25'" class="mb-4"><app-eval-benchmark></app-eval-benchmark></div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <div class="preview-box p-3 h-100 rounded-3">
                    <span class="concept-label text-pine font-monospace mb-1">
                      <i class="fa-solid fa-lightbulb me-1"></i>{{ 'roadmap.whatIsIt' | trans }}
                    </span>
                    <p class="small text-secondary mb-0 leading-relaxed">{{ selectedAiStage.whatIsIt }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="preview-box p-3 h-100 rounded-3">
                    <span class="concept-label text-mint font-monospace mb-1">
                      <i class="fa-solid fa-shield-halved me-1"></i>{{ 'roadmap.whyNeeded' | trans }}
                    </span>
                    <p class="small text-secondary mb-0 leading-relaxed">{{ selectedAiStage.whyNeeded }}</p>
                  </div>
                </div>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-list-check text-pine me-2"></i>{{ 'roadmap.milestoneChecklist' | trans }}
                </h6>
                <div class="row g-2">
                  <div *ngFor="let item of selectedAiStage.whatToLearn" class="col-md-6">
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
                  <li *ngFor="let cov of selectedAiStage.whatCoursesCover" class="mb-1 d-flex align-items-baseline gap-2 text-secondary">
                    <i class="fa-solid fa-bookmark text-mint small flex-shrink-0"></i>
                    <span>{{ cov }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
              <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
              <a [routerLink]="['/stage', selectedAiStage.id]" class="btn btn-sm btn-primary-clean" (click)="closeDrawer()">
                <span>{{ 'roadmap.openDeepDive' | trans }}</span>
                <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
              </a>
            </div>
          </ng-container>

          <!-- Movie Drawer Content -->
          <ng-container *ngIf="selectedMovie">
            <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
              <div>
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                  <span class="stage-code font-monospace">{{ selectedMovie.year }}</span>
                  <span class="stage-tag">{{ selectedMovie.genre }}</span>
                  <span class="movie-rating-badge font-monospace">★ {{ selectedMovie.imdbRating }}</span>
                  <span class="stage-time font-monospace">{{ selectedMovie.duration }}</span>
                </div>
                <h4 class="fw-bold mb-1 drawer-heading">{{ currentLang === 'ar' ? selectedMovie.titleAr : selectedMovie.title }}</h4>
                <p class="text-secondary small mb-0">{{ selectedMovie.director }} · {{ selectedMovie.year }}</p>
              </div>
              <button class="btn-close-drawer" (click)="closeDrawer()" title="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="preview-scroll-body">
              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-film text-pine me-2"></i>{{ currentLang === 'ar' ? 'قصة الفيلم' : 'Synopsis' }}
                </h6>
                <p class="text-secondary small mb-0 leading-relaxed">
                  {{ currentLang === 'ar' ? selectedMovie.synopsisAr : selectedMovie.synopsis }}
                </p>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-star text-warning me-2"></i>{{ currentLang === 'ar' ? 'لماذا يجب أن تشاهده؟' : 'Why Watch This Masterpiece?' }}
                </h6>
                <p class="text-secondary small mb-0 leading-relaxed">
                  {{ currentLang === 'ar' ? selectedMovie.whyWatchAr : selectedMovie.whyWatch }}
                </p>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-tags text-pine me-2"></i>{{ currentLang === 'ar' ? 'الموضوعات والمحاور الأساسية' : 'Key Themes' }}
                </h6>
                <div class="d-flex flex-wrap gap-1">
                  <span *ngFor="let theme of selectedMovie.keyThemes" class="node-tool-chip font-monospace">#{{ theme }}</span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
              <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
              <button 
                class="btn btn-sm btn-primary-clean"
                (click)="toggleItemCompletion($event, selectedMovie.id)"
              >
                <i class="fa-solid" [class.fa-check]="isItemCompleted(selectedMovie.id)" [class.fa-plus]="!isItemCompleted(selectedMovie.id)"></i>
                <span class="ms-1">{{ isItemCompleted(selectedMovie.id) ? (currentLang === 'ar' ? 'تمت المشاهدة ✓' : 'Watched ✓') : (currentLang === 'ar' ? 'تحديد كـ تمت المشاهدة' : 'Mark as Watched') }}</span>
              </button>
            </div>
          </ng-container>

          <!-- English Stage Drawer Content -->
          <ng-container *ngIf="selectedEnglishStage">
            <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
              <div>
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                  <span class="stage-code font-monospace">{{ selectedEnglishStage.id }}</span>
                  <span class="stage-tag">{{ selectedEnglishStage.category }}</span>
                  <span class="stage-diff" [attr.data-diff]="selectedEnglishStage.level">{{ selectedEnglishStage.level }}</span>
                  <span class="stage-time font-monospace">{{ selectedEnglishStage.durationWeeks }}</span>
                </div>
                <h4 class="fw-bold mb-1 drawer-heading">{{ currentLang === 'ar' ? selectedEnglishStage.titleAr : selectedEnglishStage.title }}</h4>
                <p class="text-secondary small mb-0">{{ currentLang === 'ar' ? selectedEnglishStage.taglineAr : selectedEnglishStage.tagline }}</p>
              </div>
              <button class="btn-close-drawer" (click)="closeDrawer()" title="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="preview-scroll-body">
              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-bullseye text-pine me-2"></i>{{ currentLang === 'ar' ? 'الاستراتيجية الأساسية' : 'Core Strategy' }}
                </h6>
                <p class="text-secondary small mb-0 leading-relaxed">
                  {{ currentLang === 'ar' ? selectedEnglishStage.coreStrategyAr : selectedEnglishStage.coreStrategy }}
                </p>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-calendar-check text-mint me-2"></i>{{ currentLang === 'ar' ? 'التطبيق والعادة اليومية (Daily Habit)' : 'Daily Practice Habit' }}
                </h6>
                <p class="text-secondary small mb-0 leading-relaxed">
                  {{ currentLang === 'ar' ? selectedEnglishStage.dailyHabitAr : selectedEnglishStage.dailyHabit }}
                </p>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-wrench text-pine me-2"></i>{{ currentLang === 'ar' ? 'أفضل الأدوات والمصادر الموصى بها' : 'Recommended Tools & Apps' }}
                </h6>
                <div class="d-flex flex-wrap gap-1">
                  <span *ngFor="let tool of selectedEnglishStage.recommendedTools" class="node-tool-chip font-monospace">
                    <i class="fa-solid fa-arrow-up-right-from-square me-1 text-mint"></i>{{ tool }}
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
              <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
              <button 
                class="btn btn-sm btn-primary-clean"
                (click)="toggleItemCompletion($event, selectedEnglishStage.id)"
              >
                <i class="fa-solid" [class.fa-check]="isItemCompleted(selectedEnglishStage.id)" [class.fa-plus]="!isItemCompleted(selectedEnglishStage.id)"></i>
                <span class="ms-1">{{ isItemCompleted(selectedEnglishStage.id) ? (currentLang === 'ar' ? 'تم الإنجاز ✓' : 'Completed ✓') : (currentLang === 'ar' ? 'تحديد كـ منجز' : 'Mark as Completed') }}</span>
              </button>
            </div>
          </ng-container>

          <!-- Book Drawer Content -->
          <ng-container *ngIf="selectedBook">
            <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
              <div>
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                  <span class="stage-code font-monospace">{{ selectedBook.year }}</span>
                  <span class="stage-tag">{{ selectedBook.category }}</span>
                  <span class="stage-time font-monospace">{{ selectedBook.pages }} pages</span>
                </div>
                <h4 class="fw-bold mb-1 drawer-heading">{{ currentLang === 'ar' ? selectedBook.titleAr : selectedBook.title }}</h4>
                <p class="text-secondary small mb-0">{{ selectedBook.author }} · {{ selectedBook.year }}</p>
              </div>
              <button class="btn-close-drawer" (click)="closeDrawer()" title="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="preview-scroll-body">
              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-brain text-pine me-2"></i>{{ currentLang === 'ar' ? 'الفكرة الكبرى للكتاب' : 'Core Idea' }}
                </h6>
                <p class="text-secondary small mb-0 leading-relaxed">
                  {{ currentLang === 'ar' ? selectedBook.coreIdeaAr : selectedBook.coreIdea }}
                </p>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-lightbulb text-warning me-2"></i>{{ currentLang === 'ar' ? 'أهم درس عملي للحياة (Key Takeaway)' : 'Key Practical Takeaway' }}
                </h6>
                <p class="text-secondary small mb-0 leading-relaxed">
                  {{ currentLang === 'ar' ? selectedBook.keyTakeawayAr : selectedBook.keyTakeaway }}
                </p>
              </div>

              <div class="preview-box p-3 rounded-3 mb-4">
                <h6 class="fw-bold mb-2">
                  <i class="fa-solid fa-tags text-pine me-2"></i>{{ currentLang === 'ar' ? 'محاور الكتاب' : 'Key Themes' }}
                </h6>
                <div class="d-flex flex-wrap gap-1">
                  <span *ngFor="let theme of selectedBook.keyThemes" class="node-tool-chip font-monospace">#{{ theme }}</span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
              <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
              <button 
                class="btn btn-sm btn-primary-clean"
                (click)="toggleItemCompletion($event, selectedBook.id)"
              >
                <i class="fa-solid" [class.fa-check]="isItemCompleted(selectedBook.id)" [class.fa-plus]="!isItemCompleted(selectedBook.id)"></i>
                <span class="ms-1">{{ isItemCompleted(selectedBook.id) ? (currentLang === 'ar' ? 'تمت القراءة ✓' : 'Read ✓') : (currentLang === 'ar' ? 'تحديد كـ مقروء' : 'Mark as Read') }}</span>
              </button>
            </div>
          </ng-container>

        </div>
      </div>

    </div>
  `,
  styles: [`
    .roadmap-page {
      position: relative;
    }

    /* MASTER TRACK SELECTOR BAR */
    .track-selector-bar {
      background: transparent;
    }
    .track-selector-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
      position: relative;
    }
    .track-selector-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .track-selector-card.active {
      border-color: var(--primary);
      background: var(--surface-card);
      box-shadow: 0 4px 14px rgba(21, 82, 57, 0.12);
      border-inline-start: 4px solid var(--primary);
    }
    .track-number-crest {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--primary);
      font-weight: 800;
      font-size: 0.95rem;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .track-selector-card.active .track-number-crest {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .track-title-text {
      font-size: 0.88rem;
      color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .track-sub-text {
      font-size: 0.74rem;
    }
    .active-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-mint);
      box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
      flex-shrink: 0;
    }

    /* HERO SECTION */
    .hero-kicker {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      font-size: 0.74rem;
      color: var(--text-secondary);
    }
    .live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-mint);
      box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
      display: inline-block;
    }
    .kicker-label {
      color: var(--primary);
      font-weight: 700;
    }
    .kicker-sep {
      color: var(--text-muted);
    }
    .hero-title {
      font-size: 2.1rem;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .hero-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      max-width: 680px;
      line-height: 1.6;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }

    /* INTEGRATED PROGRESS BOX */
    .progress-box {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      min-width: 280px;
      box-shadow: var(--shadow-sm);
    }
    .progress-label {
      font-size: 0.82rem;
      color: var(--text-primary);
    }
    .progress-pct-badge {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--primary);
      background: var(--primary-subtle);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
    .custom-progress-track {
      width: 100%;
      height: 6px;
      background: var(--surface-elevated);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }
    .custom-progress-fill {
      height: 100%;
      background: var(--brand-gradient);
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    /* PHASE RIBBON CARD */
    .phase-ribbon-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    .ribbon-title {
      font-size: 0.74rem;
      color: var(--primary);
      letter-spacing: 0.05em;
    }
    .phase-ribbon-scroll {
      overflow-x: auto;
      scrollbar-width: thin;
      padding-bottom: 4px;
    }
    .phase-ribbon-chip {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 6px 12px;
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .phase-ribbon-chip:hover {
      background: var(--surface-hover);
      color: var(--text-primary);
      border-color: var(--primary);
      transform: translateY(-1px);
    }
    .phase-ribbon-chip.completed {
      background: var(--success-bg);
      border-color: var(--success-border);
      color: var(--primary);
    }
    .phase-ribbon-chip .chip-num {
      font-weight: 800;
      color: var(--primary);
    }
    .phase-ribbon-chip .chip-pct {
      font-size: 0.68rem;
      color: var(--text-muted);
      background: var(--surface);
      padding: 1px 6px;
      border-radius: var(--radius-sm);
    }
    .btn-action-subtle {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.74rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-action-subtle:hover {
      background: var(--surface-hover);
      color: var(--primary);
      border-color: var(--primary);
    }

    /* ROADMAP TOOLBAR */
    .roadmap-toolbar {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    .search-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-icon {
      position: absolute;
      inset-inline-start: 12px;
      color: var(--text-muted);
      font-size: 0.85rem;
      pointer-events: none;
    }
    .clean-search-input {
      padding-inline-start: 36px;
      padding-inline-end: 32px;
      height: 38px;
      font-size: 0.82rem;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      transition: all 0.15s ease;
    }
    .clean-search-input:focus {
      background: var(--surface);
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }
    .btn-clear-search {
      position: absolute;
      inset-inline-end: 10px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.8rem;
      cursor: pointer;
      padding: 4px;
    }
    .stage-counter-pill {
      font-size: 0.74rem;
      color: var(--text-muted);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      padding: 4px 10px;
      border-radius: 999px;
    }
    .btn-reset-pill {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.74rem;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
    }
    .btn-reset-pill:hover {
      color: var(--primary);
      border-color: var(--primary);
    }

    /* CATEGORY PILLS ROW */
    .category-pills-row {
      overflow-x: auto;
      scrollbar-width: thin;
      padding-bottom: 2px;
    }
    .category-pill {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.74rem;
      padding: 4px 12px;
      border-radius: 999px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .category-pill:hover {
      border-color: var(--border-hover);
      color: var(--text-primary);
    }
    .category-pill.active {
      background: var(--primary-subtle);
      border-color: var(--primary);
      color: var(--primary);
      font-weight: 700;
    }

    /* PHASE CHAPTER HEADER */
    .phase-chapter-header {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-inline-start: 4px solid var(--primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
    }
    .phase-chapter-header.collapsed {
      opacity: 0.88;
    }
    .phase-chapter-header:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--border-hover);
    }
    .phase-number-crest {
      width: 44px;
      height: 44px;
      background: var(--primary-subtle);
      border: 1px solid rgba(21, 82, 57, 0.2);
      border-radius: var(--radius-md);
      display: grid;
      place-items: center;
      color: var(--primary);
      font-size: 1.15rem;
      font-weight: 800;
      flex-shrink: 0;
    }
    .phase-badge {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--primary);
      background: var(--primary-subtle);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
    .phase-cat-pill {
      background: var(--surface-elevated);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
    .phase-duration {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .phase-title {
      font-size: 1.25rem;
      color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .phase-desc {
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
      line-height: 1.6;
    }
    .phase-meter {
      min-width: 140px;
    }
    .phase-pct-badge {
      font-size: 0.72rem;
      color: var(--text-secondary);
      background: var(--surface-elevated);
      padding: 1px 6px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }
    .phase-pct-badge.done {
      background: var(--success-bg);
      color: var(--primary);
      font-weight: 700;
    }
    .phase-progress-track {
      height: 5px;
      background: var(--surface-elevated);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }
    .phase-progress-bar {
      height: 100%;
      background: var(--brand-gradient);
      transition: width 0.3s ease;
    }
    .btn-phase-toggle {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-phase-toggle:hover {
      color: var(--primary);
      border-color: var(--primary);
      background: var(--surface-hover);
    }

    /* NODES STREAM */
    .nodes-stream-container {
      position: relative;
      padding-bottom: 8px;
    }
    .spine-line {
      position: absolute;
      top: 0;
      bottom: 24px;
      inset-inline-start: 19px;
      width: 2px;
      background: linear-gradient(to bottom, var(--primary) 0%, rgba(21, 82, 57, 0.15) 100%);
      pointer-events: none;
      z-index: 1;
    }
    .stage-node-item {
      position: relative;
      padding-inline-start: 56px;
      margin-bottom: 20px;
    }

    /* Node Pin Button */
    .node-pin-btn {
      position: absolute;
      inset-inline-start: 3px;
      top: 18px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--surface-card);
      border: 2px solid var(--border-strong);
      display: grid;
      place-items: center;
      cursor: pointer;
      z-index: 2;
      transition: all 0.2s ease;
      box-shadow: 0 0 0 3px var(--bg-primary);
      color: var(--text-primary);
    }
    .node-pin-btn:hover {
      transform: scale(1.1);
      border-color: var(--primary);
      color: var(--primary);
    }
    .node-pin-btn.completed {
      background: var(--primary);
      border-color: var(--accent-mint);
      color: #FFFFFF;
      box-shadow: 0 0 10px rgba(52, 211, 153, 0.4);
    }
    .pin-number {
      font-size: 0.74rem;
      font-weight: 800;
    }
    .node-branch-line {
      position: absolute;
      inset-inline-start: 36px;
      top: 34px;
      width: 20px;
      height: 2px;
      background: var(--border-subtle);
      z-index: 1;
    }

    /* Node Card Body */
    .node-card-body {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
    }
    .node-card-body:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .stage-node-item.is-completed .node-card-body {
      border-inline-start: 3px solid var(--accent-mint);
    }

    .stage-code {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--primary);
      background: var(--primary-subtle);
      border: 1px solid rgba(21, 82, 57, 0.2);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }
    .stage-tag {
      font-size: 0.68rem;
      background: var(--surface-elevated);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }
    .stage-diff {
      font-size: 0.66rem;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      font-weight: 600;
    }
    .stage-diff[data-diff="Beginner"] { border-color: var(--success-border); color: var(--primary); }
    .stage-diff[data-diff="Intermediate"] { border-color: var(--warning-border); color: var(--warning); }
    .stage-diff[data-diff="Advanced"] { border-color: var(--error-border); color: var(--error); }

    .movie-rating-badge {
      font-size: 0.68rem;
      font-weight: 700;
      color: #D97706;
      background: #FEF3C7;
      border: 1px solid #FDE68A;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }
    .director-chip {
      font-size: 0.68rem;
      color: var(--text-muted);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }
    .stage-time {
      font-size: 0.68rem;
      color: var(--text-muted);
    }
    .stage-diagram-pill {
      font-size: 0.66rem;
      background: var(--primary-subtle);
      border: 1px solid var(--success-border);
      color: var(--primary);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
      font-weight: 600;
    }

    .btn-stage-checkbox {
      background: var(--surface-elevated);
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
    .btn-stage-checkbox:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
    .btn-stage-checkbox.checked {
      background: var(--primary);
      border-color: var(--accent-mint);
      color: #FFFFFF;
    }

    .node-title {
      font-size: 1.05rem;
      color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .node-title-link {
      color: var(--text-primary);
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .node-title-link:hover {
      color: var(--primary);
    }
    .node-desc {
      line-height: 1.6;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .node-tool-chip {
      font-size: 0.7rem;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }
    .node-course-tag {
      font-size: 0.66rem;
      background: var(--surface-elevated);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }

    .btn-quick-inspect {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
      cursor: pointer;
      font-weight: 600;
    }
    .btn-quick-inspect:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--surface-hover);
    }

    .btn-deep-dive-clean {
      background: var(--primary);
      border: 1px solid var(--primary);
      color: #FFFFFF !important;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      text-decoration: none !important;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-deep-dive-clean:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
      transform: translateY(-1px);
    }

    /* WAYPOINT BRIDGE */
    .phase-waypoint-bridge {
      margin-inline-start: 56px;
    }
    .waypoint-stem {
      width: 2px;
      height: 20px;
      background: linear-gradient(to bottom, var(--primary), rgba(21, 82, 57, 0.2));
      margin: 0 auto 6px;
    }
    .waypoint-chip {
      background: var(--surface-card);
      border: 1px dashed var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }

    /* SLIDE-OVER DRAWER */
    .stage-preview-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(17, 24, 39, 0.45);
      backdrop-filter: blur(4px);
      z-index: 1060;
      display: flex;
      justify-content: flex-end;
    }
    .stage-preview-modal {
      width: 100%;
      max-width: 720px;
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
    .drawer-heading {
      color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .btn-close-drawer {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-sm);
      cursor: pointer;
    }
    .btn-close-drawer:hover {
      color: var(--text-primary);
      border-color: var(--border-hover);
    }
    .preview-scroll-body {
      overflow-y: auto;
      scrollbar-width: thin;
      padding-inline-end: 4px;
      flex-grow: 1;
    }
    .preview-box {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
    }
    .concept-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: block;
    }
    .text-pine {
      color: var(--primary) !important;
    }
    .text-mint {
      color: var(--accent-mint) !important;
    }
    .btn-primary-clean {
      background: var(--primary);
      border: 1px solid var(--primary);
      color: #FFFFFF !important;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      text-decoration: none !important;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .btn-primary-clean:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
    }

    /* EMPTY STATE */
    .empty-state-card {
      background: var(--surface-card);
      border: 1px dashed var(--border-subtle);
      border-radius: var(--radius-lg);
    }

    @media (max-width: 767.98px) {
      .hero-title {
        font-size: 1.65rem;
      }
      .progress-box {
        min-width: 100%;
      }
      .stage-preview-modal {
        max-width: 100% !important;
      }
    }
  `]
})
export class RoadmapComponent implements OnInit, OnDestroy {
  activeTrack: RoadmapTrack = 'ai';

  // 1. AI Engineering Data
  aiStages: RoadmapStage[] = ROADMAP_STAGES;
  filteredAiStages: RoadmapStage[] = [];
  aiPhases: RoadmapPhase[] = [
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

  // 2. Cinema & Movies Data
  movieStages: MovieStage[] = MOVIES_STAGES;
  filteredMovieStages: MovieStage[] = [];
  moviePhases: MoviePhase[] = MOVIES_PHASES;

  // 3. English Mastery Data
  englishStages: EnglishStage[] = ENGLISH_STAGES;
  filteredEnglishStages: EnglishStage[] = [];
  englishPhases: EnglishPhase[] = ENGLISH_PHASES;

  // 4. Books & Mindset Data
  bookStages: BookStage[] = BOOKS_STAGES;
  filteredBookStages: BookStage[] = [];
  bookPhases: BookPhase[] = BOOKS_PHASES;

  // Completion sets for all tracks
  completedAiStageIds: string[] = [];
  completedMovieIds: string[] = [];
  completedEnglishIds: string[] = [];
  completedBookIds: string[] = [];

  // Drawer selected items
  drawerOpen = false;
  selectedAiStage: RoadmapStage | null = null;
  selectedMovie: MovieStage | null = null;
  selectedEnglishStage: EnglishStage | null = null;
  selectedBook: BookStage | null = null;

  // Filters state
  searchQuery = '';
  selectedCategory = 'All';
  expandedPhases: Set<number> = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8]);

  private progressSub?: Subscription;

  constructor(
    private progressService: ProgressService,
    public transService: TranslationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllTrackProgress();
    this.filteredAiStages = [...this.aiStages];
    this.filteredMovieStages = [...this.movieStages];
    this.filteredEnglishStages = [...this.englishStages];
    this.filteredBookStages = [...this.bookStages];

    this.progressSub = this.progressService.completedStages$.subscribe(ids => {
      this.completedAiStageIds = ids;
    });

    // Check query params e.g. /roadmap?track=movies
    this.route.queryParams.subscribe(params => {
      if (params['track'] && ['ai', 'movies', 'english', 'books'].includes(params['track'])) {
        this.activeTrack = params['track'] as RoadmapTrack;
      }
    });
  }

  ngOnDestroy() {
    this.progressSub?.unsubscribe();
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  // Track switcher
  switchTrack(track: RoadmapTrack) {
    this.activeTrack = track;
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.expandedPhases = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8]);
    this.closeDrawer();
    this.applyFilters();
  }

  // Dynamic Header Info
  get activeTrackKicker(): string {
    switch (this.activeTrack) {
      case 'movies': return this.currentLang === 'ar' ? 'روائع الفن السابع' : 'Cinema Masterpieces';
      case 'english': return this.currentLang === 'ar' ? 'مسار الطلاقة الحقيقية' : 'Real-World Fluency';
      case 'books': return this.currentLang === 'ar' ? 'أعظم كتب الفكر والعقلية' : 'Master Books & Mindset';
      default: return this.currentLang === 'ar' ? 'خارطة التعلّم المعتمدة' : 'Official Tech Curriculum';
    }
  }

  get activeTrackTitle(): string {
    switch (this.activeTrack) {
      case 'movies': return this.currentLang === 'ar' ? 'خريطة السينما والأفلام العظيمة' : 'Great Cinema & Movies Roadmap';
      case 'english': return this.currentLang === 'ar' ? 'خارطة إتقان اللغة الإنجليزية' : 'English Fluency & Mastery Roadmap';
      case 'books': return this.currentLang === 'ar' ? 'خارطة الكتب وتطوير العقلية' : 'Life-Changing Books Roadmap';
      default: return this.currentLang === 'ar' ? 'خارطة طريق مهندس الذكاء الاصطناعي' : 'AI Engineer Learning Roadmap';
    }
  }

  get activeTrackDescription(): string {
    switch (this.activeTrack) {
      case 'movies':
        return this.currentLang === 'ar'
          ? 'مسار مشاهدة منظم يضم 24 من أعظم الأفلام السينمائية العالمية (الخيال العلمي، الدراما الملهمة، السير الذاتية، والإثارة النفسية) مع تتبع لما شاهدته.'
          : 'A curated journey through 24 cinematic masterpieces across Sci-Fi, inspirational drama, biopics, and psychological thrillers with progress tracking.';
      case 'english':
        return this.currentLang === 'ar'
          ? '16 محطة عملية تبدأ من تدريب الأذن ومخارج الحروف، إلى التفكير بالإنجليزية، والمحادثة اليومية وفهم المتحدثين الأصليين دون ترجمة ذهنية.'
          : '16 practical milestones from ear tuning and phonetics to thinking in English, conversational fluency, and understanding native connected speech.';
      case 'books':
        return this.currentLang === 'ar'
          ? 'مسار قراءة متدرج لـ 16 كتاباً غيرت طريقة تفكير الملايين في بناء العادات، التركيز العميق، سيكولوجية المال، والحكمة الرواقية.'
          : 'A reading roadmap of 16 foundational books on habits, deep focus, mental models, psychology of money, and stoic philosophy.';
      default:
        return this.currentLang === 'ar'
          ? '26 محطة تبدأ من بايثون والشبكات العصبية وصولاً إلى الـ RAG، والوكلاء الأذكياء، والبنية السحابية وتتبع الأداء.'
          : '26 milestone stages from Python fundamentals and neural nets to production RAG, LangGraph agents, multi-cloud Terraform, and enterprise observability.';
    }
  }

  get activeTrackItemUnit(): string {
    switch (this.activeTrack) {
      case 'movies': return this.currentLang === 'ar' ? 'فيلماً' : 'films';
      case 'english': return this.currentLang === 'ar' ? 'محطة' : 'milestones';
      case 'books': return this.currentLang === 'ar' ? 'كتاباً' : 'books';
      default: return this.currentLang === 'ar' ? 'محطة' : 'stages';
    }
  }

  get searchPlaceholder(): string {
    switch (this.activeTrack) {
      case 'movies': return this.currentLang === 'ar' ? 'ابحث عن اسم فيلم أو مخرج أو نوع...' : 'Search movie title, director, or genre...';
      case 'english': return this.currentLang === 'ar' ? 'ابحث عن مهارة، نطق، أو أداة...' : 'Search skill, habit, or tool...';
      case 'books': return this.currentLang === 'ar' ? 'ابحث عن عنوان كتاب أو مؤلف...' : 'Search book title or author...';
      default: return this.currentLang === 'ar' ? 'تصفية المراحل أو الأدوات أو التقنيات...' : 'Filter stages, tools, or topics...';
    }
  }

  // Dynamic Progress
  get currentTotalCount(): number {
    switch (this.activeTrack) {
      case 'movies': return this.movieStages.length;
      case 'english': return this.englishStages.length;
      case 'books': return this.bookStages.length;
      default: return this.aiStages.length;
    }
  }

  get currentCompletedCount(): number {
    switch (this.activeTrack) {
      case 'movies': return this.completedMovieIds.length;
      case 'english': return this.completedEnglishIds.length;
      case 'books': return this.completedBookIds.length;
      default: return this.completedAiStageIds.length;
    }
  }

  get currentProgressPercentage(): number {
    if (this.currentTotalCount === 0) return 0;
    return Math.round((this.currentCompletedCount / this.currentTotalCount) * 100);
  }

  get currentFilteredCount(): number {
    switch (this.activeTrack) {
      case 'movies': return this.filteredMovieStages.length;
      case 'english': return this.filteredEnglishStages.length;
      case 'books': return this.filteredBookStages.length;
      default: return this.filteredAiStages.length;
    }
  }

  // Current Phases
  get currentPhases(): any[] {
    switch (this.activeTrack) {
      case 'movies': return this.moviePhases;
      case 'english': return this.englishPhases;
      case 'books': return this.bookPhases;
      default: return this.aiPhases;
    }
  }

  get visibleAiPhases(): RoadmapPhase[] {
    return this.aiPhases.filter(p => this.getPhaseStages(p).length > 0);
  }

  get visibleMoviePhases(): MoviePhase[] {
    return this.moviePhases.filter(p => this.getPhaseMovieStages(p).length > 0);
  }

  get visibleEnglishPhases(): EnglishPhase[] {
    return this.englishPhases.filter(p => this.getPhaseEnglishStages(p).length > 0);
  }

  get visibleBookPhases(): BookPhase[] {
    return this.bookPhases.filter(p => this.getPhaseBookStages(p).length > 0);
  }

  // Current Categories Filter Options
  get currentCategories(): { key: string; labelEn: string; labelAr: string }[] {
    switch (this.activeTrack) {
      case 'movies':
        return [
          { key: 'All', labelEn: 'All Movies', labelAr: 'كافة الأفلام' },
          { key: 'Sci-Fi', labelEn: 'Sci-Fi & Mind-Benders', labelAr: 'خيال علمي وغموض' },
          { key: 'Drama', labelEn: 'Drama & Life', labelAr: 'دراما وإلهام' },
          { key: 'Mystery', labelEn: 'Psychological Thriller', labelAr: 'إثارة وغموض' },
          { key: 'Biography', labelEn: 'Biographies', labelAr: 'سير ذاتية وتاريخ' },
          { key: 'Classics', labelEn: 'Classics', labelAr: 'كلاسيكيات كبرى' },
          { key: 'Global', labelEn: 'Global Masterpieces', labelAr: 'سينما عالمية' }
        ];
      case 'english':
        return [
          { key: 'All', labelEn: 'All Milestones', labelAr: 'كافة المحطات' },
          { key: 'Phonetics', labelEn: 'Phonetics & Sounds', labelAr: 'النطق والأصوات' },
          { key: 'Pronunciation', labelEn: 'Rhythm & Stress', labelAr: 'الإيقاع والنبر' },
          { key: 'Vocabulary', labelEn: 'Vocabulary & Chunks', labelAr: 'المفردات والمتلازمات' },
          { key: 'Grammar', labelEn: 'Sentence Instinct', labelAr: 'بناء الجمل' },
          { key: 'Fluency', labelEn: 'Thinking in English', labelAr: 'الطلاقة والتفكير' },
          { key: 'Speaking', labelEn: 'Daily Conversation', labelAr: 'المحادثة اليومية' },
          { key: 'Listening', labelEn: 'Fast Connected Speech', labelAr: 'الاستماع السريع' },
          { key: 'Professional', labelEn: 'Professional Tech', labelAr: 'الإنجليزية المهنية' }
        ];
      case 'books':
        return [
          { key: 'All', labelEn: 'All Books', labelAr: 'كافة الكتب' },
          { key: 'Habits', labelEn: 'Habits & Routine', labelAr: 'العادات والأنظمة' },
          { key: 'Productivity', labelEn: 'Deep Focus', labelAr: 'التركيز والإنتاجية' },
          { key: 'Cognition', labelEn: 'Thinking & Models', labelAr: 'التفكير والنماذج' },
          { key: 'Strategy', labelEn: 'Strategy & Decisions', labelAr: 'الاستراتيجية' },
          { key: 'Wealth', labelEn: 'Wealth & Money', labelAr: 'المال والثروة' },
          { key: 'Philosophy', labelEn: 'Philosophy & Meaning', labelAr: 'الفلسفة والمعنى' }
        ];
      default:
        return [
          { key: 'All', labelEn: 'All Stages', labelAr: 'كافة المراحل' },
          { key: 'Foundations', labelEn: 'Foundations', labelAr: 'الأساسيات' },
          { key: 'Deep Learning', labelEn: 'Deep Learning', labelAr: 'التعلم العميق' },
          { key: 'GenAI & LLMs', labelEn: 'GenAI & LLMs', labelAr: 'نماذج اللغة' },
          { key: 'RAG', labelEn: 'RAG Architectures', labelAr: 'أنظمة RAG' },
          { key: 'Autonomous Agents', labelEn: 'Autonomous Agents', labelAr: 'الوكلاء الأذكياء' },
          { key: 'Production', labelEn: 'Full-Stack GenAI', labelAr: 'الإنتاج والتطبيقات' },
          { key: 'Cloud & DevOps', labelEn: 'Cloud & MLOps', labelAr: 'السحابة و DevOps' },
          { key: 'Evaluation', labelEn: 'Eval & Security', labelAr: 'التقييم والأمان' }
        ];
    }
  }

  // Helper Methods per Track
  getPhaseStages(phase: RoadmapPhase): RoadmapStage[] {
    return this.filteredAiStages.filter(s => phase.stageIds.includes(s.id));
  }

  getPhaseMovieStages(phase: MoviePhase): MovieStage[] {
    return this.filteredMovieStages.filter(m => phase.stageIds.includes(m.id));
  }

  getPhaseEnglishStages(phase: EnglishPhase): EnglishStage[] {
    return this.filteredEnglishStages.filter(e => phase.stageIds.includes(e.id));
  }

  getPhaseBookStages(phase: BookPhase): BookStage[] {
    return this.filteredBookStages.filter(b => phase.stageIds.includes(b.id));
  }

  getPhaseCompletedCount(phase: any): number {
    const stageIds: string[] = phase.stageIds;
    switch (this.activeTrack) {
      case 'movies': return this.completedMovieIds.filter(id => stageIds.includes(id)).length;
      case 'english': return this.completedEnglishIds.filter(id => stageIds.includes(id)).length;
      case 'books': return this.completedBookIds.filter(id => stageIds.includes(id)).length;
      default: return this.completedAiStageIds.filter(id => stageIds.includes(id)).length;
    }
  }

  getPhaseProgressPct(phase: any): number {
    const total = phase.stageIds.length;
    if (total === 0) return 0;
    const completed = this.getPhaseCompletedCount(phase);
    return Math.round((completed / total) * 100);
  }

  hasInteractiveDiagram(stageId: string): boolean {
    return stageId === '09' || stageId === '14' || stageId === '25';
  }

  // Completion toggles (persisted in localStorage)
  toggleItemCompletion(event: Event, id: string) {
    event.stopPropagation();
    switch (this.activeTrack) {
      case 'movies':
        if (this.completedMovieIds.includes(id)) {
          this.completedMovieIds = this.completedMovieIds.filter(mId => mId !== id);
        } else {
          this.completedMovieIds = [...this.completedMovieIds, id];
        }
        localStorage.setItem('roadmap_movies_completed', JSON.stringify(this.completedMovieIds));
        break;
      case 'english':
        if (this.completedEnglishIds.includes(id)) {
          this.completedEnglishIds = this.completedEnglishIds.filter(eId => eId !== id);
        } else {
          this.completedEnglishIds = [...this.completedEnglishIds, id];
        }
        localStorage.setItem('roadmap_english_completed', JSON.stringify(this.completedEnglishIds));
        break;
      case 'books':
        if (this.completedBookIds.includes(id)) {
          this.completedBookIds = this.completedBookIds.filter(bId => bId !== id);
        } else {
          this.completedBookIds = [...this.completedBookIds, id];
        }
        localStorage.setItem('roadmap_books_completed', JSON.stringify(this.completedBookIds));
        break;
      default:
        this.progressService.toggleStage(id);
        break;
    }
  }

  isItemCompleted(id: string): boolean {
    switch (this.activeTrack) {
      case 'movies': return this.completedMovieIds.includes(id);
      case 'english': return this.completedEnglishIds.includes(id);
      case 'books': return this.completedBookIds.includes(id);
      default: return this.completedAiStageIds.includes(id);
    }
  }

  private loadAllTrackProgress() {
    try {
      const movies = localStorage.getItem('roadmap_movies_completed');
      this.completedMovieIds = movies ? JSON.parse(movies) : [];
      const english = localStorage.getItem('roadmap_english_completed');
      this.completedEnglishIds = english ? JSON.parse(english) : [];
      const books = localStorage.getItem('roadmap_books_completed');
      this.completedBookIds = books ? JSON.parse(books) : [];
    } catch {
      this.completedMovieIds = [];
      this.completedEnglishIds = [];
      this.completedBookIds = [];
    }
  }

  // Drawers
  openAiDrawer(stage: RoadmapStage) {
    this.selectedAiStage = stage;
    this.selectedMovie = null;
    this.selectedEnglishStage = null;
    this.selectedBook = null;
    this.drawerOpen = true;
  }

  openMovieDrawer(movie: MovieStage) {
    this.selectedMovie = movie;
    this.selectedAiStage = null;
    this.selectedEnglishStage = null;
    this.selectedBook = null;
    this.drawerOpen = true;
  }

  openEnglishDrawer(stage: EnglishStage) {
    this.selectedEnglishStage = stage;
    this.selectedAiStage = null;
    this.selectedMovie = null;
    this.selectedBook = null;
    this.drawerOpen = true;
  }

  openBookDrawer(book: BookStage) {
    this.selectedBook = book;
    this.selectedAiStage = null;
    this.selectedMovie = null;
    this.selectedEnglishStage = null;
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
    this.selectedAiStage = null;
    this.selectedMovie = null;
    this.selectedEnglishStage = null;
    this.selectedBook = null;
  }

  // Filters
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

    if (this.activeTrack === 'ai') {
      this.filteredAiStages = this.aiStages.filter(s => {
        const matchCat = this.selectedCategory === 'All' || s.category.toLowerCase().includes(this.selectedCategory.toLowerCase());
        const matchSearch = !q || (
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.topicsList.some(t => t.toLowerCase().includes(q)) ||
          s.tools.some(t => t.toLowerCase().includes(q))
        );
        return matchCat && matchSearch;
      });
    } else if (this.activeTrack === 'movies') {
      this.filteredMovieStages = this.movieStages.filter(m => {
        const matchCat = this.selectedCategory === 'All' || m.category === this.selectedCategory || m.genre.toLowerCase().includes(this.selectedCategory.toLowerCase());
        const matchSearch = !q || (
          m.title.toLowerCase().includes(q) ||
          m.titleAr.includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.synopsis.toLowerCase().includes(q) ||
          m.synopsisAr.includes(q)
        );
        return matchCat && matchSearch;
      });
    } else if (this.activeTrack === 'english') {
      this.filteredEnglishStages = this.englishStages.filter(e => {
        const matchCat = this.selectedCategory === 'All' || e.category === this.selectedCategory;
        const matchSearch = !q || (
          e.title.toLowerCase().includes(q) ||
          e.titleAr.includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.keyTopics.some(t => t.toLowerCase().includes(q))
        );
        return matchCat && matchSearch;
      });
    } else if (this.activeTrack === 'books') {
      this.filteredBookStages = this.bookStages.filter(b => {
        const matchCat = this.selectedCategory === 'All' || b.category === this.selectedCategory;
        const matchSearch = !q || (
          b.title.toLowerCase().includes(q) ||
          b.titleAr.includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.coreIdea.toLowerCase().includes(q)
        );
        return matchCat && matchSearch;
      });
    }
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
    this.currentPhases.forEach(p => this.expandedPhases.add(p.id));
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
