import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <footer class="footer-wrap border-top mt-5">
      <div class="container-xl py-5">
        <div class="row g-4 justify-content-between">
          <!-- Col 1: Brand & Philosophy -->
          <div class="col-lg-4 col-md-6">
            <div class="d-flex align-items-center gap-2 mb-3">
              <div class="footer-logo">
                <i class="fa-solid fa-brain"></i>
              </div>
              <h5 class="mb-0 text-white fw-bold">{{ 'nav.brandTitle' | trans }}</h5>
            </div>
            <p class="footer-desc-text small leading-relaxed mb-3">
              {{ 'footer.desc' | trans }}
            </p>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <span class="badge badge-subtle-primary">{{ 'footer.noAuth' | trans }}</span>
              <span class="badge badge-subtle-success">{{ 'footer.openEdu' | trans }}</span>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="col-lg-2 col-md-3 col-6">
            <h6 class="footer-heading font-monospace small mb-3">{{ 'footer.quickPath' | trans }}</h6>
            <ul class="list-unstyled small mb-0 footer-links">
              <li><a routerLink="/roadmap">26 Connected Stages</a></li>
              <li><a routerLink="/stage/01">01 Foundations</a></li>
              <li><a routerLink="/stage/06">06 Deep Learning</a></li>
              <li><a routerLink="/stage/09">09 Production RAG</a></li>
              <li><a routerLink="/stage/14">14 Autonomous Agents</a></li>
              <li><a routerLink="/stage/19">19 Full-Stack AI SaaS</a></li>
              <li><a routerLink="/stage/21">21 Cloud & Terraform</a></li>
            </ul>
          </div>

          <!-- Col 3: Practical Resources -->
          <div class="col-lg-2 col-md-3 col-6">
            <h6 class="footer-heading font-monospace small mb-3">{{ 'footer.resourcesTitle' | trans }}</h6>
            <ul class="list-unstyled small mb-0 footer-links">
              <li><a routerLink="/course-coverage">{{ 'nav.courseMatrix' | trans }}</a></li>
              <li><a routerLink="/missing-skills">{{ 'nav.missingSkills' | trans }}</a></li>
              <li><a routerLink="/projects">{{ 'nav.projects' | trans }} (12)</a></li>
              <li><a routerLink="/interview">{{ 'nav.interview' | trans }}</a></li>
              <li><a routerLink="/job-ready">{{ 'nav.jobReady' | trans }}</a></li>
              <li><a routerLink="/resources">{{ 'nav.resources' | trans }}</a></li>
            </ul>
          </div>

          <!-- Col 4: Tech Stack & Architecture -->
          <div class="col-lg-3 col-md-6">
            <h6 class="footer-heading font-monospace small mb-3">{{ 'footer.techTitle' | trans }}</h6>
            <div class="d-flex flex-wrap gap-2 mb-3">
              <span class="badge-tech">Angular 18</span>
              <span class="badge-tech">TypeScript</span>
              <span class="badge-tech">Bootstrap 5</span>
              <span class="badge-tech">SCSS</span>
              <span class="badge-tech">Inter & Cairo</span>
              <span class="badge-tech">JetBrains Mono</span>
            </div>
            <p class="small text-muted mb-0">
              {{ 'footer.techDesc' | trans }}
            </p>
          </div>
        </div>

        <div class="sub-footer border-top pt-4 mt-5 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <small class="text-secondary">
            {{ 'footer.copyright' | trans }}
          </small>
          <div class="d-flex align-items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
              <i class="fa-brands fa-github fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrap {
      background: var(--bg-primary);
      border-color: var(--border-subtle) !important;
      position: relative;
    }
    .footer-logo {
      width: 32px;
      height: 32px;
      background: var(--primary);
      border: 1px solid var(--primary);
      border-radius: var(--radius-md);
      display: grid;
      place-items: center;
      color: #FFFFFF;
      font-size: 0.95rem;
    }
    .footer-desc-text {
      color: var(--text-secondary);
    }
    .footer-heading {
      color: var(--text-primary);
      letter-spacing: 0.04em;
    }
    .footer-links li {
      margin-bottom: 8px;
    }
    .footer-links a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .footer-links a:hover {
      color: var(--primary-light);
    }
    .badge-subtle-primary {
      background: var(--primary-subtle);
      color: var(--primary-light);
      border: 1px solid rgba(21, 82, 57, 0.25);
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-subtle-success {
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid var(--success-border);
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-tech {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.72rem;
      font-family: var(--font-mono);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      direction: ltr !important;
    }
    .sub-footer {
      border-color: var(--border-subtle) !important;
    }
    .social-link {
      color: var(--text-secondary);
      transition: color 0.15s ease;
    }
    .social-link:hover {
      color: var(--text-primary);
    }
  `]
})
export class FooterComponent {}
