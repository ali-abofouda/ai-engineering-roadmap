import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ROADMAP_STAGES } from '../../data/roadmap.data';
import { PROJECTS_DATA } from '../../data/projects.data';
import { RESOURCES_DATA } from '../../data/resources.data';
import { RoadmapStage } from '../../models/roadmap.model';
import { ProjectItem } from '../../models/project.model';
import { ResourceItem } from '../../models/resource.model';
import { ProgressService } from '../../services/progress.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { RagDiagramComponent } from '../../components/rag-diagram/rag-diagram.component';
import { AgentDiagramComponent } from '../../components/agent-diagram/agent-diagram.component';
import { EvalBenchmarkComponent } from '../../components/eval-benchmark/eval-benchmark.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TranslatePipe,
    RagDiagramComponent, 
    AgentDiagramComponent, 
    EvalBenchmarkComponent
  ],
  template: `
    <div class="stage-detail-page py-5">
      <div class="container-xl" *ngIf="stage">
        <!-- Breadcrumb & Nav -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item"><a routerLink="/" class="text-secondary text-decoration-none">{{ 'nav.home' | trans }}</a></li>
              <li class="breadcrumb-item"><a routerLink="/roadmap" class="text-secondary text-decoration-none">{{ 'nav.roadmap' | trans }}</a></li>
              <li class="breadcrumb-item active text-cyan" aria-current="page">Stage {{ stage.id }}</li>
            </ol>
          </nav>

          <!-- Prev / Next Stage Buttons -->
          <div class="d-flex align-items-center gap-2">
            <button 
              *ngIf="prevStage" 
              class="btn btn-sm btn-nav-stage text-secondary"
              [routerLink]="['/stage', prevStage.id]"
            >
              <i class="fa-solid fa-chevron-left me-1"></i> Stage {{ prevStage.id }}
            </button>
            <button 
              *ngIf="nextStage" 
              class="btn btn-sm btn-nav-stage text-info"
              [routerLink]="['/stage', nextStage.id]"
            >
              Stage {{ nextStage.id }} <i class="fa-solid fa-chevron-right ms-1"></i>
            </button>
          </div>
        </div>

        <!-- Stage Header Banner -->
        <div class="stage-hero-banner p-4 p-md-5 mb-5 rounded-4 border position-relative overflow-hidden">
          <div class="banner-glow"></div>
          
          <div class="row align-items-center g-4 position-relative z-1">
            <div class="col-lg-8">
              <!-- Meta Badges -->
              <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
                <span class="stage-pill font-monospace">Stage {{ stage.id }} / {{ totalStages }}</span>
                <span class="badge badge-subtle-info">{{ stage.category }}</span>
                <span class="diff-badge" [attr.data-diff]="stage.difficulty">{{ stage.difficulty }}</span>
                <span class="duration-pill font-monospace"><i class="fa-regular fa-clock me-1"></i>{{ stage.durationWeeks }}</span>

                <!-- Course Badges -->
                <span *ngFor="let c of stage.courseSources" class="course-badge" [attr.data-course]="c">
                  {{ c }}
                </span>

                <!-- Coverage Badge -->
                <span class="coverage-badge" [attr.data-cov]="stage.coverageStatus">
                  <span class="cov-dot"></span>
                  {{ stage.coverageStatus }}
                </span>
              </div>

              <h1 class="text-white fw-bold display-6 mb-2">{{ stage.title }}</h1>
              <p class="text-light lead fs-6 mb-3 max-w-700">{{ stage.tagline }}</p>
              <p class="text-secondary small mb-4 max-w-700 leading-relaxed">{{ stage.description }}</p>

              <!-- Tools & Technologies -->
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <small class="text-secondary font-monospace">Tools & Stack:</small>
                <span *ngFor="let tool of stage.tools" class="tech-chip">
                  {{ tool }}
                </span>
              </div>
            </div>

            <!-- Action Card -->
            <div class="col-lg-4 text-lg-end">
              <div class="stage-status-box p-3 rounded-3 text-start d-inline-block w-100 max-w-350">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="small text-secondary">Milestone Status</span>
                  <span 
                    class="badge" 
                    [class.bg-success]="isCompleted" 
                    [class.bg-secondary]="!isCompleted"
                  >
                    {{ isCompleted ? ('roadmap.completed' | trans) : 'In Progress' }}
                  </span>
                </div>
                <button 
                  class="btn w-100" 
                  [class.btn-success]="isCompleted" 
                  [class.btn-outline-primary]="!isCompleted"
                  (click)="toggleCompletion()"
                >
                  <i class="fa-solid" [class.fa-check]="isCompleted" [class.fa-circle-check]="!isCompleted"></i>
                  {{ isCompleted ? 'Mark Stage Incomplete' : 'Mark Stage Complete' }}
                </button>
                <div class="coverage-note-mini mt-3 pt-2 border-top">
                  <small class="text-secondary font-monospace d-block mb-1">Curriculum Note:</small>
                  <p class="small text-secondary mb-0 leading-relaxed">{{ stage.coverageNote }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Architecture Diagram (For RAG, Agent, Evaluation) -->
        <div *ngIf="stage.id === '09' || stage.id === '10'" class="mb-5">
          <app-rag-diagram></app-rag-diagram>
        </div>
        <div *ngIf="stage.id === '14' || stage.id === '15'" class="mb-5">
          <app-agent-diagram></app-agent-diagram>
        </div>
        <div *ngIf="stage.id === '17'" class="mb-5">
          <app-eval-benchmark></app-eval-benchmark>
        </div>

        <div class="row g-4">
          <!-- MAIN CONTENT: Deep Dives -->
          <div class="col-lg-8">
            <!-- 1. STRUCTURED BREAKDOWN: What is it, Why needed, What to learn -->
            <div class="section-box p-4 mb-4 rounded-4 border">
              <h4 class="text-white fw-bold mb-3">
                <i class="fa-solid fa-compass text-primary me-2"></i>Stage Orientation & Engineering Value
              </h4>

              <div class="curriculum-quadrant row g-3 mb-3">
                <div class="col-md-6">
                  <div class="quad-item p-3 rounded-3 h-100">
                    <span class="concept-label text-cyan font-monospace mb-1">
                      <i class="fa-solid fa-circle-info me-1"></i>{{ 'roadmap.whatIsIt' | trans }}
                    </span>
                    <p class="small text-light mb-0 leading-relaxed">{{ stage.whatIsIt }}</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="quad-item p-3 rounded-3 h-100">
                    <span class="concept-label text-emerald font-monospace mb-1">
                      <i class="fa-solid fa-industry me-1"></i>{{ 'roadmap.whyNeeded' | trans }}
                    </span>
                    <p class="small text-secondary mb-0 leading-relaxed">{{ stage.whyNeeded }}</p>
                  </div>
                </div>
              </div>

              <!-- What to learn bullet list -->
              <div class="p-3 rounded-3 quad-item mb-3">
                <span class="concept-label text-purple font-monospace mb-2">
                  <i class="fa-solid fa-list-check me-1"></i>WHAT TO LEARN / KEY COMPETENCIES:
                </span>
                <div class="row g-2">
                  <div *ngFor="let item of stage.whatToLearn" class="col-md-6">
                    <div class="d-flex align-items-baseline gap-2">
                      <i class="fa-solid fa-chevron-right text-info small"></i>
                      <span class="small text-light">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Practical Task & Project Connection -->
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="quad-item p-3 rounded-3 h-100 border border-primary-subtle">
                    <span class="concept-label text-cyan font-monospace mb-1">
                      <i class="fa-solid fa-terminal me-1"></i>{{ 'roadmap.practicalTask' | trans }}
                    </span>
                    <p class="small text-white mb-0 leading-relaxed">{{ stage.practicalTask }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="quad-item p-3 rounded-3 h-100 border">
                    <span class="concept-label text-purple font-monospace mb-1">
                      <i class="fa-solid fa-diagram-project me-1"></i>{{ 'roadmap.projectConn' | trans }}
                    </span>
                    <p class="small text-secondary mb-0 leading-relaxed">{{ stage.projectConnection }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. WHAT THE COURSES COVER (Exact Lectures & Sections) -->
            <div class="section-box p-4 mb-4 rounded-4 border">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-white fw-bold mb-0">
                  <i class="fa-solid fa-graduation-cap text-cyan me-2"></i>{{ 'roadmap.whatCoursesCover' | trans }}
                </h4>
                <span class="badge badge-subtle-primary font-monospace">
                  {{ stage.whatCoursesCover ? stage.whatCoursesCover.length : 0 }} Citations
                </span>
              </div>
              <p class="text-secondary small mb-3">
                Direct mapping to the actual curriculum sections and lectures from Course 1, Course 2, and Course 3:
              </p>

              <div class="citations-container">
                <div *ngFor="let citation of stage.whatCoursesCover" class="citation-row p-2 mb-2 rounded-2 d-flex align-items-baseline gap-2">
                  <i class="fa-solid fa-book-bookmark text-primary flex-shrink-0 mt-1"></i>
                  <span class="small text-light font-monospace">{{ citation }}</span>
                </div>
              </div>

              <!-- Gap / What is Missing Alert -->
              <div *ngIf="stage.whatIsMissing" class="missing-gap-alert p-3 rounded-3 mt-3">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <i class="fa-solid fa-triangle-exclamation text-warning"></i>
                  <span class="fw-bold font-monospace text-warning small">{{ 'roadmap.whatMissing' | trans }}</span>
                </div>
                <p class="small text-secondary mb-0 leading-relaxed">{{ stage.whatIsMissing }}</p>
              </div>
            </div>

            <!-- 3. TARGETED INTERVIEW FOCUS -->
            <div *ngIf="stage.interviewFocus && stage.interviewFocus.length > 0" class="section-box p-4 mb-4 rounded-4 border">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-white fw-bold mb-0">
                  <i class="fa-solid fa-comments text-warning me-2"></i>{{ 'roadmap.interviewFocus' | trans }}
                </h4>
                <span class="badge badge-subtle-warning font-monospace">
                  {{ stage.interviewFocus.length }} Questions
                </span>
              </div>
              <p class="text-secondary small mb-3">
                Real technical questions asked by hiring teams for this specific milestone:
              </p>

              <div *ngFor="let qa of stage.interviewFocus; let qIdx = index" class="interview-qa-card p-3 mb-3 rounded-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="badge badge-subtle-warning font-monospace small">
                    Question {{ qIdx + 1 }}
                  </span>
                  <button 
                    class="btn btn-sm btn-link text-info p-0 font-monospace small text-decoration-none" 
                    (click)="toggleAnswer(qa.question)"
                  >
                    {{ isAnswerVisible(qa.question) ? ('roadmap.hideStrategy' | trans) : ('roadmap.revealStrategy' | trans) }}
                  </button>
                </div>
                <p class="text-white fw-semibold small mb-2">"{{ qa.question }}"</p>

                <div *ngIf="isAnswerVisible(qa.question)" class="interview-strategy-box mt-3 pt-3 border-top">
                  <small class="text-cyan font-monospace d-block mb-1">{{ 'roadmap.interviewResp' | trans }}</small>
                  <p class="text-secondary small mb-0 leading-relaxed">{{ qa.answerStrategy }}</p>
                </div>
              </div>
            </div>

            <!-- 4. ALL CURRICULUM TOPICS IN STAGE -->
            <div class="section-box p-4 mb-4 rounded-4 border">
              <h5 class="text-white fw-bold mb-3">
                <i class="fa-solid fa-list-check text-info me-2"></i>{{ 'roadmap.curriculumTopics' | trans }} ({{ stage.topicsList.length }})
              </h5>
              <p class="text-secondary small mb-3">
                Comprehensive lecture topics mastered in this milestone:
              </p>
              <div class="row g-2">
                <div *ngFor="let topic of stage.topicsList; let tIdx = index" class="col-md-6">
                  <div class="topic-row p-2 rounded d-flex align-items-center gap-2">
                    <span class="topic-num font-monospace">{{ tIdx + 1 }}</span>
                    <span class="text-light small">{{ topic }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SIDEBAR: Checklist, Related Projects, Resources -->
          <div class="col-lg-4">
            <!-- Practical Action Checklist -->
            <div class="section-box p-4 mb-4 rounded-4 border">
              <h5 class="text-white fw-bold mb-2">
                <i class="fa-solid fa-circle-check text-emerald me-2"></i>{{ 'roadmap.milestoneChecklist' | trans }}
              </h5>
              <p class="text-secondary small mb-3">Competencies that validate your practical competence in this stage:</p>
              
              <div class="checklist-items">
                <div *ngFor="let task of stage.whatToLearn; let i = index" class="d-flex gap-2 align-items-start mb-3">
                  <i class="fa-regular fa-square-check text-secondary mt-1"></i>
                  <span class="text-light small leading-relaxed">{{ task }}</span>
                </div>
              </div>
            </div>

            <!-- Recommended Stage Projects -->
            <div *ngIf="relatedProjects.length > 0" class="section-box p-4 mb-4 rounded-4 border">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="text-white fw-bold mb-0">
                  <i class="fa-solid fa-laptop-code text-cyan me-2"></i>Hands-On Projects
                </h5>
                <span class="badge badge-subtle-primary font-monospace small">
                  {{ relatedProjects.length }}
                </span>
              </div>
              <p class="text-secondary small mb-3">Flagship projects reinforcing this stage:</p>

              <div *ngFor="let proj of relatedProjects" class="project-mini-card p-3 mb-3 rounded-3">
                <div class="d-flex justify-content-between align-items-start mb-1">
                  <span class="badge bg-dark border text-light font-monospace small">{{ proj.difficulty }}</span>
                  <span class="badge badge-subtle-info small">{{ proj.badge }}</span>
                </div>
                <h6 class="text-white fw-bold mb-1">{{ proj.title }}</h6>
                <p class="text-secondary small mb-2 line-clamp-2">{{ proj.summary }}</p>
                <a routerLink="/projects" class="text-cyan small text-decoration-none">
                  {{ 'btn.viewProject' | trans }} <i class="fa-solid fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>

            <!-- Recommended Stage Resources -->
            <div *ngIf="stageResources.length > 0" class="section-box p-4 rounded-4 border">
              <h5 class="text-white fw-bold mb-2">
                <i class="fa-solid fa-book-bookmark text-purple me-2"></i>Curated Resources
              </h5>
              <p class="text-secondary small mb-3">High-signal reference documentation and papers:</p>

              <div *ngFor="let res of stageResources" class="resource-mini-item p-2 mb-2 rounded d-flex justify-content-between align-items-center">
                <div>
                  <div class="text-light small fw-semibold">{{ res.name }}</div>
                  <span class="badge bg-dark border text-secondary small">{{ res.type }}</span>
                </div>
                <a [href]="res.urlPlaceholder" class="btn btn-sm btn-outline-secondary text-secondary" title="Resource link">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Stage Navigation Footer -->
        <div class="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
          <div>
            <a *ngIf="prevStage" [routerLink]="['/stage', prevStage.id]" class="btn btn-secondary-action">
              <i class="fa-solid fa-arrow-left me-2"></i> {{ 'btn.previous' | trans }}: Stage {{ prevStage.id }} ({{ prevStage.title }})
            </a>
          </div>
          <div>
            <a *ngIf="nextStage" [routerLink]="['/stage', nextStage.id]" class="btn btn-primary-action">
              {{ 'btn.next' | trans }}: Stage {{ nextStage.id }} ({{ nextStage.title }}) <i class="fa-solid fa-arrow-right ms-2"></i>
            </a>
            <a *ngIf="!nextStage" routerLink="/job-ready" class="btn btn-success">
              Complete Final Job Readiness Audit <i class="fa-solid fa-clipboard-check ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stage-detail-page {
      position: relative;
    }
    .stage-hero-banner {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .banner-glow {
      position: absolute;
      top: -100px;
      inset-inline-end: -100px;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }
    .btn-nav-stage {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .stage-pill {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary-light);
      background: var(--surface-elevated);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
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

    .duration-pill {
      font-size: 0.7rem;
      color: var(--text-secondary);
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      padding: 2px 7px;
      border-radius: var(--radius-sm);
    }

    .stage-status-box {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .section-box {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
    }
    .quad-item {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .citations-container {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 10px;
    }
    .citation-row {
      background: var(--surface-card);
    }
    .missing-gap-alert {
      background: var(--warning-bg);
      border: 1px solid var(--warning-border);
    }

    .interview-qa-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .interview-strategy-box {
      background: var(--surface-card);
      padding: 10px;
      border-radius: var(--radius-sm);
      border-color: var(--border-subtle) !important;
    }

    .concept-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      display: block;
      margin-bottom: 3px;
    }
    .topic-row {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .topic-num {
      width: 22px;
      height: 22px;
      background: var(--surface-elevated);
      border-radius: 4px;
      display: grid;
      place-items: center;
      font-size: 0.7rem;
      color: var(--primary-light);
      flex-shrink: 0;
    }
    .project-mini-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .resource-mini-item {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
    }
    .badge-subtle-primary {
      background: rgba(59, 130, 246, 0.10);
      color: var(--primary-light);
      border: 1px solid rgba(59, 130, 246, 0.25);
    }
    .badge-subtle-info {
      background: var(--info-bg);
      color: var(--info);
      border: 1px solid var(--info-border);
    }
    .badge-subtle-warning {
      background: var(--warning-bg);
      color: var(--warning);
      border: 1px solid var(--warning-border);
    }
    .text-cyan { color: var(--accent-cyan) !important; }
    .text-emerald { color: var(--success) !important; }
    .text-purple { color: var(--accent-violet) !important; }
    .max-w-700 { max-width: 700px; }
    .max-w-350 { max-width: 350px; }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .border, .border-top {
      border-color: var(--border-subtle) !important;
    }
  `]
})
export class StageDetailComponent implements OnInit, OnDestroy {
  stage?: RoadmapStage;
  prevStage?: RoadmapStage;
  nextStage?: RoadmapStage;
  totalStages = ROADMAP_STAGES.length;
  isCompleted = false;

  relatedProjects: ProjectItem[] = [];
  stageResources: ResourceItem[] = [];
  revealedAnswers = new Set<string>();

  private routeSub?: Subscription;
  private progressSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private progressService: ProgressService,
    public transService: TranslationService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '01';
      this.loadStage(id);
    });

    this.progressSub = this.progressService.completedStages$.subscribe(ids => {
      if (this.stage) {
        this.isCompleted = ids.includes(this.stage.id);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
    this.progressSub?.unsubscribe();
  }

  private loadStage(id: string) {
    const found = ROADMAP_STAGES.find(s => s.id === id);
    if (!found) {
      this.router.navigate(['/roadmap']);
      return;
    }
    this.stage = found;
    this.isCompleted = this.progressService.isStageCompleted(this.stage.id);

    // Compute previous and next stages
    const currIdx = ROADMAP_STAGES.findIndex(s => s.id === id);
    this.prevStage = currIdx > 0 ? ROADMAP_STAGES[currIdx - 1] : undefined;
    this.nextStage = currIdx < ROADMAP_STAGES.length - 1 ? ROADMAP_STAGES[currIdx + 1] : undefined;

    // Filter relevant projects and resources
    this.stageResources = RESOURCES_DATA.filter(r => r.stageId === id || (r.tag && found.category.toLowerCase().includes(r.tag.toLowerCase())));
    this.relatedProjects = PROJECTS_DATA.filter(p => {
      const catMatch = p.category.toLowerCase().includes(found.category.toLowerCase()) || 
                       found.category.toLowerCase().includes(p.category.toLowerCase());
      const toolMatch = p.technologies.some(t => found.tools.some(ft => ft.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(ft.toLowerCase())));
      return catMatch || toolMatch;
    }).slice(0, 3);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleCompletion() {
    if (this.stage) {
      this.isCompleted = this.progressService.toggleStage(this.stage.id);
    }
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
}
