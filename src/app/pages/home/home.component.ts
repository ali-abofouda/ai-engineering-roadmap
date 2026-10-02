import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROADMAP_STAGES } from '../../data/roadmap.data';
import { RoadmapStage } from '../../models/roadmap.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <div class="home-container">
      <!-- HERO SECTION -->
      <section class="hero-section py-5 position-relative overflow-hidden">
        <!-- Subtle Developer Grid & Ambient Glows -->
        <div class="hero-grid-pattern"></div>
        <div class="hero-glow-1"></div>
        <div class="hero-glow-2"></div>
        
        <div class="container-xl position-relative z-1 py-4">
          <div class="row align-items-center g-5">
            <div class="col-lg-8">
              <!-- Eyebrow Badge -->
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 hero-badge">
                <span class="pulse-point"></span>
                <span class="small font-monospace text-uppercase text-cyan fw-semibold">
                  {{ 'hero.badge' | trans }}
                </span>
              </div>

              <!-- Main Hero Heading -->
              <h1 class="hero-title text-white mb-3">
                {{ 'hero.titlePrefix' | trans }} <span class="gradient-text">{{ 'hero.titleAccent' | trans }}</span>
              </h1>
              
              <!-- Subtitle -->
              <h2 class="hero-subtitle text-secondary mb-3">
                {{ 'hero.subtitle' | trans }}
              </h2>

              <!-- Short Description -->
              <p class="hero-desc text-secondary leading-relaxed mb-4">
                {{ 'hero.desc' | trans }}
              </p>

              <!-- Focused Primary CTAs -->
              <div class="d-flex flex-wrap gap-3 mb-4">
                <a routerLink="/roadmap" class="btn btn-primary-action">
                  <span>{{ 'hero.btnRoadmap' | trans }}</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
                <a routerLink="/projects" class="btn btn-secondary-action">
                  <i class="fa-solid fa-diagram-project text-cyan"></i>
                  <span>{{ 'hero.btnProjects' | trans }}</span>
                </a>
              </div>

              <!-- Donezo 4-Card Statistics System -->
              <div class="row g-2 g-sm-3 mb-2">
                <!-- Card 1: Featured Forest Card (Total Path) -->
                <div class="col-6 col-md-3">
                  <div class="stat-card-donezo featured h-100 d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <span class="stat-card-title small font-monospace">{{ 'stats.stages' | trans }}</span>
                      <a routerLink="/roadmap" class="stat-arrow-btn text-decoration-none" title="Explore Stages">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                    <div class="stat-number-donezo font-monospace fw-bold mb-2">26</div>
                    <div class="stat-sub-badge mt-auto">
                      <i class="fa-solid fa-check small text-mint"></i>
                      <span>26/26 Path</span>
                    </div>
                  </div>
                </div>

                <!-- Card 2: Topics Card -->
                <div class="col-6 col-md-3">
                  <div class="stat-card-donezo h-100 d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <span class="stat-card-title small text-secondary font-monospace">{{ 'stats.topics' | trans }}</span>
                      <a routerLink="/roadmap" class="stat-arrow-btn text-decoration-none" title="View Topics">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                    <div class="stat-number-donezo font-monospace fw-bold mb-2 text-primary">300+</div>
                    <div class="stat-sub-badge mt-auto">
                      <i class="fa-solid fa-bolt small text-warning"></i>
                      <span>3 Curricula</span>
                    </div>
                  </div>
                </div>

                <!-- Card 3: Projects Card -->
                <div class="col-6 col-md-3">
                  <div class="stat-card-donezo h-100 d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <span class="stat-card-title small text-secondary font-monospace">{{ 'stats.projects' | trans }}</span>
                      <a routerLink="/projects" class="stat-arrow-btn text-decoration-none" title="View Projects">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                    <div class="stat-number-donezo font-monospace fw-bold mb-2 text-primary">12</div>
                    <div class="stat-sub-badge mt-auto">
                      <i class="fa-solid fa-diagram-project small text-cyan"></i>
                      <span>Production</span>
                    </div>
                  </div>
                </div>

                <!-- Card 4: Master Courses Card -->
                <div class="col-6 col-md-3">
                  <div class="stat-card-donezo h-100 d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <span class="stat-card-title small text-secondary font-monospace">{{ 'stats.courses' | trans }}</span>
                      <a routerLink="/course-coverage" class="stat-arrow-btn text-decoration-none" title="View Matrix">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                    <div class="stat-number-donezo font-monospace fw-bold mb-2 text-primary">3</div>
                    <div class="stat-sub-badge mt-auto">
                      <i class="fa-solid fa-video small text-emerald"></i>
                      <span>523+ Lectures</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hero Right: Interactive Journey Card & Donezo Time Tracker Widget -->
            <div class="col-lg-4">
              <div class="journey-preview-card p-3 p-sm-4 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge badge-subtle-primary font-monospace">
                    {{ 'journey.badge' | trans }}
                  </span>
                  <span class="small text-secondary font-monospace">{{ stages.length }} {{ 'journey.nodes' | trans }}</span>
                </div>
                
                <h5 class="text-white mb-2">{{ 'journey.title' | trans }}</h5>
                <p class="text-secondary small mb-3">
                  {{ 'journey.desc' | trans }}
                </p>

                <!-- Mini Flow Nodes Preview -->
                <div class="mini-flow-list">
                  <a 
                    *ngFor="let s of previewStages" 
                    [routerLink]="['/stage', s.id]"
                    class="mini-node-item d-flex align-items-center gap-3 p-2 rounded text-decoration-none"
                  >
                    <span class="mini-node-num font-monospace">{{ s.id }}</span>
                    <div class="flex-grow-1 overflow-hidden">
                      <div class="mini-node-title text-truncate">{{ s.title }}</div>
                      <div class="d-flex align-items-center gap-1">
                        <span class="mini-node-tag">{{ s.category }}</span>
                        <span class="coverage-badge mini-cov" [attr.data-cov]="s.coverageStatus">
                          <span class="cov-dot"></span>
                          {{ s.coverageStatus }}
                        </span>
                      </div>
                    </div>
                    <i class="fa-solid fa-chevron-right text-secondary small"></i>
                  </a>
                </div>

                <div class="mt-3 pt-2 text-center">
                  <a routerLink="/roadmap" class="btn btn-sm btn-view-all w-100">
                    {{ 'journey.btnViewAll' | trans }} <i class="fa-solid fa-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3-COURSE ARCHITECTURE PILLARS -->
      <section class="py-5 pillars-section border-top">
        <div class="container-xl">
          <div class="text-center max-w-750 mx-auto mb-5">
            <span class="badge badge-subtle-primary mb-2 font-monospace">
              {{ 'synergy.badge' | trans }}
            </span>
            <h2 class="text-white fw-bold mb-2">{{ 'synergy.title' | trans }}</h2>
            <p class="text-secondary leading-relaxed">
              {{ 'synergy.desc' | trans }}
            </p>
          </div>

          <div class="row g-4">
            <!-- Course 1 Pillar -->
            <div class="col-md-4">
              <div class="pillar-card h-100 p-4 border border-course-1">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <span class="course-badge" data-course="COURSE 01">COURSE 01</span>
                  <i class="fa-solid fa-brain text-primary fa-xl"></i>
                </div>
                <h5 class="text-white mb-2">{{ 'course1.title' | trans }}</h5>
                <p class="text-secondary small leading-relaxed mb-3">
                  {{ 'course1.desc' | trans }}
                </p>
                <div class="font-monospace text-secondary small mt-auto">{{ 'course1.meta' | trans }}</div>
              </div>
            </div>

            <!-- Course 2 Pillar -->
            <div class="col-md-4">
              <div class="pillar-card h-100 p-4 border border-course-2">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <span class="course-badge" data-course="COURSE 02">COURSE 02</span>
                  <i class="fa-solid fa-diagram-project text-cyan fa-xl"></i>
                </div>
                <h5 class="text-white mb-2">{{ 'course2.title' | trans }}</h5>
                <p class="text-secondary small leading-relaxed mb-3">
                  {{ 'course2.desc' | trans }}
                </p>
                <div class="font-monospace text-secondary small mt-auto">{{ 'course2.meta' | trans }}</div>
              </div>
            </div>

            <!-- Course 3 Pillar -->
            <div class="col-md-4">
              <div class="pillar-card h-100 p-4 border border-course-3">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <span class="course-badge" data-course="COURSE 03">COURSE 03</span>
                  <i class="fa-solid fa-cloud text-purple fa-xl"></i>
                </div>
                <h5 class="text-white mb-2">{{ 'course3.title' | trans }}</h5>
                <p class="text-secondary small leading-relaxed mb-3">
                  {{ 'course3.desc' | trans }}
                </p>
                <div class="font-monospace text-secondary small mt-auto">{{ 'course3.meta' | trans }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STAGES GRID OVERVIEW -->
      <section class="py-5 border-top">
        <div class="container-xl">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
            <div>
              <span class="badge badge-subtle-primary mb-2 font-monospace">
                {{ 'grid.badge' | trans }}
              </span>
              <h2 class="text-white fw-bold mb-1">{{ 'grid.title' | trans }}</h2>
              <p class="text-secondary small mb-0">{{ 'grid.sub' | trans }}</p>
            </div>
            <a routerLink="/roadmap" class="btn btn-sm btn-secondary-action">
              {{ 'grid.openRoadmap' | trans }} <i class="fa-solid fa-arrow-right ms-1"></i>
            </a>
          </div>

          <div class="row g-3">
            <div *ngFor="let stage of previewStages" class="col-lg-4 col-md-6">
              <a [routerLink]="['/stage', stage.id]" class="stage-grid-card p-3 text-decoration-none d-block h-100">
                <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
                  <div class="d-flex align-items-center gap-1 flex-wrap">
                    <span class="stage-pill font-monospace">Stage {{ stage.id }}</span>
                    <span *ngFor="let c of stage.courseSources" class="course-badge" [attr.data-course]="c">
                      {{ c }}
                    </span>
                  </div>
                  <span class="coverage-badge mini-cov" [attr.data-cov]="stage.coverageStatus">
                    <span class="cov-dot"></span>
                    {{ stage.coverageStatus }}
                  </span>
                </div>
                <h6 class="text-white fw-bold mb-1">{{ stage.title }}</h6>
                <p class="text-secondary small mb-3 line-clamp-2">{{ stage.tagline }}</p>
                <div class="d-flex flex-wrap gap-1">
                  <span *ngFor="let t of stage.tools.slice(0, 3)" class="tech-chip">{{ t }}</span>
                  <span *ngIf="stage.tools.length > 3" class="tech-chip text-cyan">+{{ stage.tools.length - 3 }}</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Explore All 26 Stages Action -->
          <div class="mt-4 pt-3 text-center">
            <a routerLink="/roadmap" class="btn btn-primary-action px-4 py-2">
              <span>{{ isArabic ? 'استكشف الـ 26 مرحلة كاملة في خريطة الطريق' : 'Explore All 26 Stages in Interactive Roadmap' }}</span>
              <i class="fa-solid fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      <!-- CALL TO ACTION BANNER -->
      <section class="py-5 my-4">
        <div class="container-xl">
          <div class="cta-banner p-4 p-md-5 text-center position-relative overflow-hidden">
            <div class="cta-glow"></div>
            <h2 class="text-white fw-bold mb-3">{{ 'cta.title' | trans }}</h2>
            <p class="text-secondary max-w-650 mx-auto leading-relaxed mb-4">
              {{ 'cta.desc' | trans }}
            </p>
            <div class="d-flex justify-content-center gap-3 flex-wrap">
              <a routerLink="/roadmap" class="btn btn-primary-action">
                {{ 'cta.launchRoadmap' | trans }} <i class="fa-solid fa-arrow-right ms-2"></i>
              </a>
              <a routerLink="/course-coverage" class="btn btn-secondary-action">
                {{ 'cta.viewMatrix' | trans }} <i class="fa-solid fa-table-columns ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      position: relative;
    }
    .hero-grid-pattern {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
      background-size: 24px 24px;
      pointer-events: none;
    }
    .hero-glow-1 {
      position: absolute;
      top: -100px;
      left: 10%;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(21, 82, 57, 0.14) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-glow-2 {
      position: absolute;
      top: 100px;
      right: 5%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-badge {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
    }
    .pulse-point {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-mint);
      box-shadow: 0 0 8px var(--accent-mint);
      display: inline-block;
    }
    .hero-title {
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }
    .gradient-text {
      background: var(--brand-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      font-weight: 400;
      line-height: 1.5;
    }
    .hero-desc {
      font-size: 0.95rem;
      max-width: 680px;
    }
    .btn-primary-action {
      background: var(--primary);
      color: #FFFFFF !important;
      border: 1px solid var(--primary);
      padding: 10px 22px;
      border-radius: var(--radius-pill);
      font-weight: 600;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      text-decoration: none;
      box-shadow: 0 2px 10px var(--primary-glow);
    }
    .btn-primary-action:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
      box-shadow: 0 4px 18px var(--primary-glow);
      transform: translateY(-2px);
    }
    .btn-secondary-action {
      background: var(--surface);
      color: var(--text-primary) !important;
      border: 1px solid var(--border-subtle);
      padding: 10px 20px;
      border-radius: var(--radius-pill);
      font-weight: 600;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      text-decoration: none;
      box-shadow: var(--shadow-sm);
    }
    .btn-secondary-action:hover {
      border-color: var(--primary);
      background: var(--surface-hover);
      color: var(--primary) !important;
      transform: translateY(-2px);
    }
    .stat-number-donezo {
      font-size: 1.85rem;
      line-height: 1;
    }
    .journey-preview-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-sm);
    }
    .text-mint {
      color: var(--accent-mint) !important;
    }
    .mini-flow-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .mini-node-item {
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      transition: all 0.15s ease;
    }
    .mini-node-item:hover {
      border-color: var(--primary-light);
      background: var(--surface-hover);
      transform: translateX(3px);
    }
    .mini-node-num {
      width: 28px;
      height: 28px;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      display: grid;
      place-items: center;
      font-size: 0.72rem;
      color: var(--text-secondary);
      flex-shrink: 0;
    }
    .mini-node-title {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .mini-node-tag {
      font-size: 0.68rem;
      color: var(--text-secondary);
      font-family: var(--font-mono);
    }
    .btn-view-all {
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: 0.78rem;
      font-weight: 600;
      padding: 7px 12px;
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
    }
    .btn-view-all:hover {
      border-color: var(--primary-light);
      color: var(--primary-light);
    }


    /* Pillars */
    .pillar-card {
      background: var(--surface-card);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
    }
    .pillar-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .border-course-1 { border-color: rgba(59, 130, 246, 0.3) !important; }
    .border-course-2 { border-color: rgba(6, 182, 212, 0.3) !important; }
    .border-course-3 { border-color: rgba(168, 85, 247, 0.3) !important; }
    
    .course-badge {
      font-size: 0.68rem;
      font-family: var(--font-mono);
      font-weight: 700;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      display: inline-block;
    }
    .course-badge[data-course="COURSE 01"] {
      background: rgba(59, 130, 246, 0.12);
      color: #60A5FA;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .course-badge[data-course="COURSE 02"] {
      background: rgba(6, 182, 212, 0.12);
      color: #22D3EE;
      border: 1px solid rgba(6, 182, 212, 0.3);
    }
    .course-badge[data-course="COURSE 03"] {
      background: rgba(168, 85, 247, 0.12);
      color: #C084FC;
      border: 1px solid rgba(168, 85, 247, 0.3);
    }

    .feature-card {
      background: var(--surface-card);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
    }
    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .border-cyan-subtle { border-color: rgba(6, 182, 212, 0.25) !important; }
    .border-warning-subtle { border-color: rgba(234, 179, 8, 0.25) !important; }

    /* Stages Grid */
    .stage-grid-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      transition: all 0.15s ease;
    }
    .stage-grid-card:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .stage-pill {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-primary);
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      padding: 1px 6px;
      border-radius: var(--radius-sm);
    }
    .coverage-badge.mini-cov {
      font-size: 0.65rem;
      padding: 1px 6px;
    }
    .coverage-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.72rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      padding: 2px 7px;
    }
    .coverage-badge[data-cov="Covered"] {
      background: rgba(16, 185, 129, 0.10);
      color: #34D399;
      border: 1px solid rgba(16, 185, 129, 0.25);
    }
    .coverage-badge[data-cov="Partially Covered"] {
      background: rgba(234, 179, 8, 0.10);
      color: #FACC15;
      border: 1px solid rgba(234, 179, 8, 0.25);
    }
    .coverage-badge[data-cov="Not Covered"] {
      background: rgba(239, 68, 68, 0.10);
      color: #F87171;
      border: 1px solid rgba(239, 68, 68, 0.25);
    }
    .cov-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
    }
    .tech-chip {
      font-size: 0.7rem;
      font-family: var(--font-mono);
      color: var(--text-secondary);
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      padding: 1px 6px;
      border-radius: var(--radius-sm);
    }
    .badge-subtle-primary {
      background: var(--primary-subtle);
      color: var(--primary-light);
      border: 1px solid rgba(21, 82, 57, 0.25);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-subtle-success {
      background: rgba(16, 185, 129, 0.10);
      color: #34D399;
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .cta-banner {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
    }
    .cta-glow {
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      height: 300px;
      background: radial-gradient(circle, rgba(21, 82, 57, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .max-w-750 { max-width: 750px; }
    .max-w-650 { max-width: 650px; }
    .text-cyan { color: var(--accent-cyan) !important; }
    .text-purple { color: var(--accent-violet) !important; }
    .text-emerald { color: var(--success) !important; }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .border-top {
      border-color: var(--border-subtle) !important;
    }

    @media (max-width: 575.98px) {
      .hero-section {
        padding-top: 1.5rem !important;
        padding-bottom: 2rem !important;
      }
      .btn-primary-action, .btn-secondary-action {
        width: 100%;
        justify-content: center;
        padding: 9px 16px;
        font-size: 0.82rem;
      }
      .hero-title {
        font-size: 1.85rem;
      }
      .hero-subtitle {
        font-size: 0.95rem;
      }
      .hero-desc {
        font-size: 0.85rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  stages: RoadmapStage[] = ROADMAP_STAGES;
  previewStages: RoadmapStage[] = [];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.previewStages = [
      this.stages[0],  // 01 Python Foundations
      this.stages[5],  // 06 Deep Learning & PyTorch
      this.stages[8],  // 09 RAG Ingestion & Chunking
      this.stages[13], // 14 Autonomous Agents & ReAct
      this.stages[18], // 19 Full-Stack AI SaaS (FastAPI & Next.js)
      this.stages[20], // 21 Infrastructure as Code with Terraform
    ];
  }

  get isArabic(): boolean {
    return this.transService.isRtl;
  }
}

