import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MOVIES_STAGES, MOVIES_PHASES, MovieStage, MoviePhase } from '../../data/movies-roadmap.data';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-cinema',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <div class="cinema-page py-4">
      <div class="container-xl">

        <!-- HERO HEADER -->
        <header class="cinema-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ currentLang === 'ar' ? 'الفص السينمائي' : 'Cinema Lobe' }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">24 {{ currentLang === 'ar' ? 'فيلماً شكّل وعيي' : 'Masterpieces' }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">
                {{ currentLang === 'ar' ? 'مكتبة السينما والأفلام العظيمة' : 'Great Cinema & Film Masterpieces' }}
              </h1>
              <p class="hero-desc mb-0">
                {{ currentLang === 'ar' 
                  ? 'مجموعة مختارة بعناية من أعظم الأعمال السينمائية في تاريخ الفن السابع: أفلام أثارت تساؤلات وجودية، ألهمت صمودي، وغيرت نظرتي للعالم وللنفس البشرية.'
                  : 'A curated anthology of 24 cinematic masterpieces that challenged reality, moved my soul, and shaped my intellectual perspective.' }}
              </p>
            </div>

            <!-- Watched Meter Box -->
            <div class="meter-box p-3">
              <div class="d-flex justify-content-between align-items-center gap-3 mb-2">
                <span class="meter-label fw-semibold">
                  <i class="fa-solid fa-film me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'سجل المشاهدة' : 'Watchlist Progress' }}
                </span>
                <span class="meter-pct font-monospace">{{ progressPercentage }}%</span>
              </div>
              <div class="custom-progress-track mb-2">
                <div class="custom-progress-fill" [style.width.%]="progressPercentage"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center small text-secondary font-monospace">
                <span>{{ completedMovieIds.length }} / {{ movies.length }} {{ currentLang === 'ar' ? 'تمت مشاهدته' : 'watched' }}</span>
                <span class="text-muted">{{ movies.length - completedMovieIds.length }} {{ currentLang === 'ar' ? 'في الانتظار' : 'remaining' }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- TOOLBAR: SEARCH & CATEGORY FILTER -->
        <div class="cinema-toolbar p-3 mb-4">
          <div class="row g-3 align-items-center">
            <div class="col-lg-6 col-md-7">
              <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <input 
                  type="text" 
                  class="form-control clean-search-input" 
                  [(ngModel)]="searchQuery" 
                  (input)="applyFilters()"
                  [placeholder]="currentLang === 'ar' ? 'ابحث عن اسم فيلم أو مخرج أو نوع...' : 'Search title, director, or genre...'"
                />
                <button *ngIf="searchQuery" class="btn-clear-search" (click)="searchQuery = ''; applyFilters()">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <div class="col-lg-6 col-md-5 d-flex justify-content-md-end justify-content-between align-items-center gap-2">
              <span class="counter-pill font-monospace">
                {{ filteredMovies.length }} / {{ movies.length }} {{ currentLang === 'ar' ? 'فيلماً' : 'films' }}
              </span>
              <button *ngIf="searchQuery || selectedCategory !== 'All'" class="btn btn-sm btn-reset-pill" (click)="resetFilters()">
                <i class="fa-solid fa-rotate-left me-1"></i>{{ currentLang === 'ar' ? 'إعادة ضبط' : 'Reset' }}
              </button>
            </div>
          </div>

          <div class="category-pills-row mt-3 pt-2 border-top d-flex align-items-center gap-1">
            <button 
              *ngFor="let cat of categories" 
              class="category-pill"
              [class.active]="selectedCategory === cat.key"
              (click)="setCategory(cat.key)"
            >
              {{ currentLang === 'ar' ? cat.labelAr : cat.labelEn }}
            </button>
          </div>
        </div>

        <!-- MOVIES GRID -->
        <div class="row g-3 mb-5">
          <div *ngFor="let movie of filteredMovies" class="col-xl-4 col-md-6 col-12">
            <div class="movie-card h-100 p-3 p-md-4 d-flex flex-column" [class.is-watched]="isWatched(movie.id)">
              <!-- Card Header -->
              <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="year-badge font-monospace">{{ movie.year }}</span>
                  <span class="genre-pill">{{ movie.genre }}</span>
                  <span class="rating-badge font-monospace">★ {{ movie.imdbRating }}</span>
                </div>

                <button 
                  class="btn-watched-check"
                  [class.checked]="isWatched(movie.id)"
                  (click)="toggleWatched($event, movie.id)"
                  [title]="isWatched(movie.id) ? 'Mark Unwatched' : 'Mark Watched'"
                >
                  <i class="fa-solid" [class.fa-check]="isWatched(movie.id)" [class.fa-circle]="!isWatched(movie.id)"></i>
                </button>
              </div>

              <!-- Title & Director -->
              <h4 class="movie-title fw-bold mb-1" (click)="openDrawer(movie)">
                {{ currentLang === 'ar' ? movie.titleAr : movie.title }}
              </h4>
              <div class="director-meta small text-muted mb-2 font-monospace">
                <i class="fa-solid fa-clapperboard me-1"></i>{{ movie.director }} · {{ movie.duration }}
              </div>

              <!-- Tagline & Synopsis -->
              <p class="movie-tagline small text-secondary fst-italic mb-2">
                "{{ currentLang === 'ar' ? movie.taglineAr : movie.tagline }}"
              </p>
              <p class="movie-desc text-secondary small mb-3 flex-grow-1">
                {{ currentLang === 'ar' ? movie.synopsisAr : movie.synopsis }}
              </p>

              <!-- Themes -->
              <div class="d-flex flex-wrap gap-1 mb-3">
                <span *ngFor="let theme of movie.keyThemes.slice(0, 3)" class="theme-chip font-monospace">
                  #{{ theme }}
                </span>
              </div>

              <!-- Footer CTA -->
              <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                <span class="watched-status-text small font-monospace">
                  <i class="fa-solid" [class.fa-circle-check]="isWatched(movie.id)" [class.fa-clock]="!isWatched(movie.id)"></i>
                  {{ isWatched(movie.id) ? (currentLang === 'ar' ? 'تمت المشاهدة' : 'Watched') : (currentLang === 'ar' ? 'في الانتظار' : 'To Watch') }}
                </span>

                <button class="btn btn-sm btn-inspect-film" (click)="openDrawer(movie)">
                  <i class="fa-solid fa-circle-info me-1"></i>
                  <span>{{ currentLang === 'ar' ? 'لماذا تشاهده؟' : 'Why Watch' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SLIDE-OVER MOVIE DRAWER -->
      <div *ngIf="selectedMovie" class="stage-preview-backdrop" (click)="closeDrawer()">
        <div class="stage-preview-modal p-3 p-sm-4" (click)="$event.stopPropagation()">
          <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <span class="year-badge font-monospace">{{ selectedMovie.year }}</span>
                <span class="genre-pill">{{ selectedMovie.genre }}</span>
                <span class="rating-badge font-monospace">★ {{ selectedMovie.imdbRating }}</span>
                <span class="text-muted small font-monospace">{{ selectedMovie.duration }}</span>
              </div>
              <h3 class="fw-bold mb-1 drawer-heading">{{ currentLang === 'ar' ? selectedMovie.titleAr : selectedMovie.title }}</h3>
              <p class="text-secondary small mb-0">{{ selectedMovie.director }} · {{ selectedMovie.year }}</p>
            </div>
            <button class="btn-close-drawer" (click)="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
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
                <i class="fa-solid fa-star text-warning me-2"></i>{{ currentLang === 'ar' ? 'لماذا ترك هذا الفيلم أثراً في عقلي؟' : 'Why Watch This Masterpiece?' }}
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
                <span *ngFor="let theme of selectedMovie.keyThemes" class="theme-chip font-monospace">#{{ theme }}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
            <button class="btn btn-sm btn-primary-clean" (click)="toggleWatched($event, selectedMovie.id)">
              <i class="fa-solid" [class.fa-check]="isWatched(selectedMovie.id)" [class.fa-plus]="!isWatched(selectedMovie.id)"></i>
              <span class="ms-1">{{ isWatched(selectedMovie.id) ? (currentLang === 'ar' ? 'تمت المشاهدة ✓' : 'Watched ✓') : (currentLang === 'ar' ? 'تحديد كـ تمت المشاهدة' : 'Mark as Watched') }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .cinema-page { position: relative; }
    .hero-kicker {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      font-size: 0.74rem;
      color: var(--text-secondary);
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-mint);
      box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
      display: inline-block;
    }
    .kicker-label { color: var(--primary); font-weight: 700; }
    .kicker-sep { color: var(--text-muted); }
    .hero-title {
      font-size: 2.1rem;
      color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .hero-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      max-width: 680px;
      line-height: 1.6;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .meter-box {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      min-width: 280px;
      box-shadow: var(--shadow-sm);
    }
    .meter-label { font-size: 0.82rem; color: var(--text-primary); }
    .meter-pct {
      font-size: 0.8rem; font-weight: 800;
      color: var(--primary); background: var(--primary-subtle);
      padding: 2px 8px; border-radius: var(--radius-sm);
    }
    .custom-progress-track {
      width: 100%; height: 6px;
      background: var(--surface-elevated);
      border-radius: 999px; overflow: hidden;
      border: 1px solid var(--border-subtle);
    }
    .custom-progress-fill {
      height: 100%; background: var(--brand-gradient);
      border-radius: 999px; transition: width 0.3s ease;
    }

    .cinema-toolbar {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    .search-input-wrap {
      position: relative; display: flex; align-items: center;
    }
    .search-icon {
      position: absolute; inset-inline-start: 12px;
      color: var(--text-muted); font-size: 0.85rem;
    }
    .clean-search-input {
      padding-inline-start: 36px; padding-inline-end: 32px;
      height: 38px; font-size: 0.82rem;
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
    }
    .btn-clear-search {
      position: absolute; inset-inline-end: 10px;
      background: transparent; border: none; color: var(--text-muted);
    }
    .counter-pill {
      font-size: 0.74rem; color: var(--text-muted);
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      padding: 4px 10px; border-radius: 999px;
    }
    .btn-reset-pill {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.74rem; padding: 4px 10px;
      border-radius: var(--radius-sm); cursor: pointer;
    }
    .category-pills-row {
      overflow-x: auto; scrollbar-width: thin; padding-bottom: 2px;
    }
    .category-pill {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.74rem;
      padding: 4px 12px; border-radius: 999px;
      cursor: pointer; white-space: nowrap; transition: all 0.15s ease;
    }
    .category-pill.active {
      background: var(--primary-subtle);
      border-color: var(--primary);
      color: var(--primary); font-weight: 700;
    }

    /* MOVIE CARD */
    .movie-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
    }
    .movie-card:hover {
      border-color: var(--border-hover);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .movie-card.is-watched {
      border-inline-start: 3px solid var(--accent-mint);
    }
    .year-badge {
      font-size: 0.72rem; font-weight: 800;
      color: var(--primary); background: var(--primary-subtle);
      border: 1px solid rgba(21, 82, 57, 0.2);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .genre-pill {
      font-size: 0.68rem; background: var(--surface-elevated);
      color: var(--text-secondary); border: 1px solid var(--border-subtle);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .rating-badge {
      font-size: 0.68rem; font-weight: 700;
      color: #D97706; background: #FEF3C7; border: 1px solid #FDE68A;
      padding: 2px 6px; border-radius: var(--radius-sm);
    }
    .btn-watched-check {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted); width: 28px; height: 28px;
      display: grid; place-items: center; border-radius: 50%;
      cursor: pointer; transition: all 0.15s ease;
    }
    .btn-watched-check.checked {
      background: var(--primary);
      border-color: var(--accent-mint);
      color: #FFFFFF;
    }
    .movie-title {
      font-size: 1.1rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
      cursor: pointer; transition: color 0.15s ease;
    }
    .movie-title:hover { color: var(--primary); }
    .theme-chip {
      font-size: 0.68rem; background: var(--surface-elevated);
      border: 1px solid var(--border-subtle); color: var(--text-secondary);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .watched-status-text {
      color: var(--text-muted);
    }
    .movie-card.is-watched .watched-status-text {
      color: var(--primary); font-weight: 600;
    }
    .btn-inspect-film {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.75rem;
      padding: 4px 10px; border-radius: var(--radius-sm);
      cursor: pointer; font-weight: 600; transition: all 0.15s ease;
    }
    .btn-inspect-film:hover {
      border-color: var(--primary); color: var(--primary);
      background: var(--surface-hover);
    }

    /* DRAWER */
    .stage-preview-backdrop {
      position: fixed; inset: 0; background: rgba(17, 24, 39, 0.45);
      backdrop-filter: blur(4px); z-index: 1060;
      display: flex; justify-content: flex-end;
    }
    .stage-preview-modal {
      width: 100%; max-width: 680px; height: 100vh;
      background: var(--surface-card);
      border-inline-start: 1px solid var(--border-subtle);
      display: flex; flex-direction: column;
      box-shadow: var(--shadow-lg);
    }
    .drawer-heading {
      color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .btn-close-drawer {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); width: 32px; height: 32px;
      display: grid; place-items: center; border-radius: var(--radius-sm);
    }
    .preview-scroll-body {
      overflow-y: auto; scrollbar-width: thin; padding-inline-end: 4px; flex-grow: 1;
    }
    .preview-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }
    .text-pine { color: var(--primary) !important; }
    .btn-action-subtle {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.75rem; padding: 6px 12px;
      border-radius: var(--radius-sm);
    }
    .btn-primary-clean {
      background: var(--primary); border: 1px solid var(--primary);
      color: #FFFFFF !important; font-size: 0.78rem; font-weight: 600;
      padding: 6px 14px; border-radius: var(--radius-sm); cursor: pointer;
    }
  `]
})
export class CinemaComponent implements OnInit {
  movies: MovieStage[] = MOVIES_STAGES;
  filteredMovies: MovieStage[] = [];
  selectedMovie: MovieStage | null = null;
  completedMovieIds: string[] = [];

  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    { key: 'All', labelEn: 'All Movies', labelAr: 'كافة الأفلام' },
    { key: 'Sci-Fi', labelEn: 'Sci-Fi & Mind-Benders', labelAr: 'خيال علمي ووعي' },
    { key: 'Drama', labelEn: 'Drama & Life', labelAr: 'دراما وإلهام' },
    { key: 'Mystery', labelEn: 'Psychological Thriller', labelAr: 'إثارة وغموض' },
    { key: 'Biography', labelEn: 'Biographies', labelAr: 'سير ذاتية وتاريخ' },
    { key: 'Classics', labelEn: 'Classics', labelAr: 'كلاسيكيات كبرى' },
    { key: 'Global', labelEn: 'Global Masterpieces', labelAr: 'سينما عالمية' }
  ];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.loadProgress();
    this.filteredMovies = [...this.movies];
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  get progressPercentage(): number {
    if (this.movies.length === 0) return 0;
    return Math.round((this.completedMovieIds.length / this.movies.length) * 100);
  }

  loadProgress() {
    try {
      const data = localStorage.getItem('roadmap_movies_completed');
      this.completedMovieIds = data ? JSON.parse(data) : [];
    } catch {
      this.completedMovieIds = [];
    }
  }

  toggleWatched(event: Event, movieId: string) {
    event.stopPropagation();
    if (this.completedMovieIds.includes(movieId)) {
      this.completedMovieIds = this.completedMovieIds.filter(id => id !== movieId);
    } else {
      this.completedMovieIds = [...this.completedMovieIds, movieId];
    }
    localStorage.setItem('roadmap_movies_completed', JSON.stringify(this.completedMovieIds));
  }

  isWatched(movieId: string): boolean {
    return this.completedMovieIds.includes(movieId);
  }

  openDrawer(movie: MovieStage) {
    this.selectedMovie = movie;
  }

  closeDrawer() {
    this.selectedMovie = null;
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
    this.filteredMovies = this.movies.filter(m => {
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
  }
}
