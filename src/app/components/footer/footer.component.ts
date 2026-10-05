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
              <h5 class="mb-0 text-white fw-bold">{{ 'nav.brandTitle' | trans }}</h5>
              <span class="footer-live-dot"></span>
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
          <div class="col-lg-3 col-md-4 col-6">
            <h6 class="footer-heading font-monospace small mb-3">فصوص ومحاور العقل</h6>
            <ul class="list-unstyled small mb-0 footer-links">
              <li><a routerLink="/tech">💻 الفص التقني (AI & Code)</a></li>
              <li><a routerLink="/cinema">🎬 الفص السينمائي (24 فيلماً)</a></li>
              <li><a routerLink="/library">📚 فص الكتب والمكتبة (16 كتاباً)</a></li>
              <li><a routerLink="/languages">🗣️ فص اللغات والإنجليزية (16 محطة)</a></li>
              <li><a routerLink="/principles">💡 سجل الأفكار وقواعد التفكير</a></li>
            </ul>
          </div>

          <!-- Col 3: Practical Resources -->
          <div class="col-lg-3 col-md-4 col-6">
            <h6 class="footer-heading font-monospace small mb-3">أقسام متخصصة</h6>
            <ul class="list-unstyled small mb-0 footer-links">
              <li><a routerLink="/projects">{{ 'nav.projects' | trans }}</a></li>
              <li><a routerLink="/interview">{{ 'nav.interview' | trans }}</a></li>
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
    .footer-live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-mint);
      box-shadow: 0 0 6px rgba(217, 119, 6, 0.6);
      display: inline-block;
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
      border: 1px solid rgba(180, 83, 9, 0.25);
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
