import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { TranslationService, Language } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <nav class="navbar navbar-expand-xl sticky-top custom-navbar">
      <div class="container-xl">
        <!-- Brand Logo (Clean Minimalist Typography) -->
        <a class="navbar-brand d-flex align-items-center gap-2 py-0" routerLink="/" (click)="closeNav()">
          <span class="brand-title">{{ 'nav.brandTitle' | trans }}</span>
          <span class="brand-live-dot"></span>
        </a>

        <!-- Mobile Quick Toggles & Menu Button -->
        <div class="d-flex align-items-center gap-2 d-xl-none">
          <!-- Search Icon Button -->
          <button 
            class="nav-btn-icon" 
            (click)="triggerSearch()" 
            aria-label="Search"
            title="Search (Ctrl+K)"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

          <!-- Lang Switcher (Mobile) -->
          <button 
            class="nav-btn-text font-monospace" 
            (click)="toggleLanguage()"
            [title]="currentLang === 'en' ? 'التحويل للعربية' : 'Switch to English'"
          >
            {{ currentLang === 'en' ? 'عربي' : 'EN' }}
          </button>

          <!-- Hamburger Button -->
          <button 
            class="navbar-toggler custom-toggler" 
            type="button" 
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid" [class.fa-bars]="!menuOpen" [class.fa-xmark]="menuOpen"></i>
          </button>
        </div>

        <!-- Collapsible Content -->
        <div class="collapse navbar-collapse" [class.show]="menuOpen">
          <!-- Centered Core Navigation Links (5 Essentials) -->
          <ul class="navbar-nav mx-auto mb-2 mb-xl-0 nav-links-gap">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeNav()">
                {{ 'nav.home' | trans }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/roadmap" routerLinkActive="active" (click)="closeNav()">
                {{ 'nav.roadmap' | trans }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/projects" routerLinkActive="active" (click)="closeNav()">
                {{ 'nav.projects' | trans }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/resources" routerLinkActive="active" (click)="closeNav()">
                {{ 'nav.resources' | trans }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/interview" routerLinkActive="active" (click)="closeNav()">
                {{ 'nav.interview' | trans }}
              </a>
            </li>
          </ul>

          <!-- Right Desktop Actions -->
          <div class="d-none d-xl-flex align-items-center gap-2">
            <!-- Search Pill -->
            <button class="nav-search-pill d-flex align-items-center gap-2" (click)="triggerSearch()" title="Search (Ctrl+K)">
              <i class="fa-solid fa-magnifying-glass text-muted small"></i>
              <span class="search-placeholder text-secondary">{{ 'nav.search' | trans }}</span>
              <span class="kbd-pill font-monospace ms-auto">⌘K</span>
            </button>

            <!-- Language Switcher (Pill Badge) -->
            <button 
              class="nav-btn-text font-monospace"
              (click)="toggleLanguage()"
              [title]="currentLang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'"
            >
              {{ currentLang === 'en' ? 'عربي' : 'EN' }}
            </button>

            <!-- GitHub Link -->
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="nav-btn-icon" 
              title="GitHub Repository"
            >
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .custom-navbar {
      background: var(--surface-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 8px 0;
      z-index: 1050;
      transition: all 0.2s ease;
    }
    .brand-title {
      font-size: 1rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--text-primary);
      line-height: 1;
      white-space: nowrap;
    }
    .brand-live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-mint);
      box-shadow: 0 0 8px rgba(52, 211, 153, 0.7);
      display: inline-block;
    }
    .nav-links-gap {
      gap: 2px;
    }
    .nav-link {
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--text-secondary) !important;
      padding: 6px 12px !important;
      border-radius: var(--radius-pill);
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .nav-link:hover {
      color: var(--text-primary) !important;
      background: var(--surface-hover);
    }
    .nav-link.active {
      color: var(--primary) !important;
      background: var(--primary-subtle);
      font-weight: 700;
    }

    /* Donezo-style Desktop Search Pill */
    .nav-search-pill {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-pill);
      height: 34px;
      padding: 0 14px;
      min-width: 170px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .nav-search-pill:hover {
      border-color: var(--primary);
      background: var(--surface-hover);
    }
    .search-placeholder {
      font-size: 0.78rem;
    }
    .kbd-pill {
      font-size: 0.68rem;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 1px 6px;
      border-radius: 6px;
    }

    /* Compact Interactive Action Buttons */
    .nav-btn-icon {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      cursor: pointer;
      padding: 0;
      font-size: 0.85rem;
      transition: all 0.15s ease;
      text-decoration: none !important;
    }
    .nav-btn-icon:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--surface-hover);
    }

    .nav-btn-text {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      height: 34px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-pill);
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .nav-btn-text:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--surface-hover);
    }

    .nav-session-btn {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      height: 34px;
      padding: 0 12px;
      border-radius: var(--radius-pill);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .nav-session-btn:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--surface-hover);
    }

    .progress-pill-compact {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      padding: 0 10px;
      border-radius: var(--radius-pill);
      height: 34px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      color: var(--text-secondary);
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .progress-pill-compact:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
    .dot-live {
      width: 6px;
      height: 6px;
      background: var(--success);
      border-radius: 50%;
      box-shadow: 0 0 6px var(--success);
    }

    .custom-toggler {
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      background: var(--surface);
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      padding: 0;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
    }

    @media (max-width: 1199px) {
      .navbar-collapse {
        background: var(--surface-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: 12px;
        margin-top: 8px;
        box-shadow: var(--shadow-lg);
      }
      .nav-link {
        padding: 8px 12px !important;
        font-size: 0.88rem;
      }
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() openSearch = new EventEmitter<void>();
  @Output() openSession = new EventEmitter<void>();

  menuOpen = false;
  completedCount = 0;
  currentLang: Language = 'en';

  private langSub?: Subscription;
  private progressSub?: Subscription;

  constructor(
    private progressService: ProgressService,
    private transService: TranslationService
  ) {}

  ngOnInit() {
    this.progressSub = this.progressService.completedStages$.subscribe(stages => {
      this.completedCount = stages.length;
    });

    this.langSub = this.transService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy() {
    this.progressSub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeNav() {
    this.menuOpen = false;
  }

  triggerSearch() {
    this.closeNav();
    this.openSearch.emit();
  }

  triggerSession() {
    this.closeNav();
    this.openSession.emit();
  }

  toggleLanguage() {
    this.transService.toggleLanguage();
  }
}
