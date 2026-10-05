import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BOOKS_STAGES, BookStage } from '../../data/books-roadmap.data';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <div class="library-page py-4">
      <div class="container-xl">

        <!-- HERO HEADER -->
        <header class="library-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ currentLang === 'ar' ? 'فص الكتب والمكتبة' : 'Library & Reading Lobe' }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">{{ books.length }} {{ currentLang === 'ar' ? 'كتب مسجلة' : 'Recorded Books' }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">
                {{ currentLang === 'ar' ? 'المكتبة الخاصة والكتب التي شكلت عقلي' : 'Personal Library & Mind-Shaping Books' }}
              </h1>
              <p class="hero-desc mb-0">
                {{ currentLang === 'ar' 
                  ? 'مجموعة مقتناة من أهم الكتب العالمية في بناء العادات، العمل العميق، النماذج الذهنية، وسيكولوجية الإنجاز والحكمة.'
                  : 'A curated reading canon of foundational books on habits, deep focus, cognitive mental models, and personal wisdom.' }}
              </p>
            </div>

            <!-- Reading Meter Box -->
            <div class="meter-box p-3">
              <div class="d-flex justify-content-between align-items-center gap-3 mb-2">
                <span class="meter-label fw-semibold">
                  <i class="fa-solid fa-book-open me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'سجل القراءة' : 'Reading Progress' }}
                </span>
                <span class="meter-pct font-monospace">{{ progressPercentage }}%</span>
              </div>
              <div class="custom-progress-track mb-2">
                <div class="custom-progress-fill" [style.width.%]="progressPercentage"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center small text-secondary font-monospace">
                <span>{{ completedBookIds.length }} / {{ books.length }} {{ currentLang === 'ar' ? 'تمت قراءته' : 'read' }}</span>
                <span class="text-muted">{{ books.length - completedBookIds.length }} {{ currentLang === 'ar' ? 'في الانتظار' : 'remaining' }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- TOOLBAR -->
        <div class="library-toolbar p-3 mb-4">
          <div class="row g-3 align-items-center">
            <div class="col-lg-6 col-md-7">
              <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <input 
                  type="text" 
                  class="form-control clean-search-input" 
                  [(ngModel)]="searchQuery" 
                  (input)="applyFilters()"
                  [placeholder]="currentLang === 'ar' ? 'ابحث عن عنوان كتاب، كاتب، أو موضوع...' : 'Search book, author, or topic...'"
                />
                <button *ngIf="searchQuery" class="btn-clear-search" (click)="searchQuery = ''; applyFilters()">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <div class="col-lg-6 col-md-5 d-flex justify-content-md-end justify-content-between align-items-center gap-2">
              <span class="counter-pill font-monospace">
                {{ filteredBooks.length }} / {{ books.length }} {{ currentLang === 'ar' ? 'كتاباً' : 'books' }}
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

        <!-- EMPTY STATE BOX -->
        <div *ngIf="filteredBooks.length === 0" class="empty-state-box text-center p-5 rounded-4 my-4">
          <div class="empty-icon-circle mb-3 mx-auto">
            <i class="fa-solid fa-book-open"></i>
          </div>
          <h4 class="fw-bold mb-2">{{ currentLang === 'ar' ? 'القسم فارغ حالياً' : 'This Section is Currently Empty' }}</h4>
          <p class="text-secondary mb-0 max-w-500 mx-auto">
            {{ currentLang === 'ar' 
              ? 'هذا القسم محفوظ ومخصص للكتب والقراءات ومجهز بالكامل لإضافة قراءاتك وملخصاتك القادمة.' 
              : 'This section is reserved for your reading canon, ready for your custom books and reading notes.' }}
          </p>
        </div>

        <!-- BOOKS GRID -->
        <div *ngIf="filteredBooks.length > 0" class="row g-3 mb-5">
          <div *ngFor="let book of filteredBooks" class="col-xl-4 col-md-6 col-12">
            <div class="book-card h-100 p-3 p-md-4 d-flex flex-column" [class.is-read]="isRead(book.id)">
              <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="year-badge font-monospace">{{ book.year }}</span>
                  <span class="genre-pill">{{ book.category }}</span>
                  <span class="text-muted small font-monospace"><i class="fa-regular fa-file-lines me-1"></i>{{ book.pages }}p</span>
                </div>

                <button 
                  class="btn-read-check"
                  [class.checked]="isRead(book.id)"
                  (click)="toggleRead($event, book.id)"
                  [title]="isRead(book.id) ? 'Mark as Unread' : 'Mark as Read'"
                >
                  <i class="fa-solid" [class.fa-check]="isRead(book.id)" [class.fa-circle]="!isRead(book.id)"></i>
                </button>
              </div>

              <h4 class="book-title fw-bold mb-1" (click)="openDrawer(book)">
                {{ currentLang === 'ar' ? book.titleAr : book.title }}
              </h4>
              <div class="author-meta small text-muted mb-2 font-monospace">
                <i class="fa-solid fa-pen-nib me-1"></i>{{ book.author }}
              </div>

              <p class="book-tagline small text-secondary fst-italic mb-2">
                "{{ currentLang === 'ar' ? book.taglineAr : book.tagline }}"
              </p>
              <p class="book-desc text-secondary small mb-3 flex-grow-1">
                {{ currentLang === 'ar' ? book.coreIdeaAr : book.coreIdea }}
              </p>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span *ngFor="let theme of book.keyThemes.slice(0, 3)" class="theme-chip font-monospace">
                  #{{ theme }}
                </span>
              </div>

              <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
                <span class="read-status-text small font-monospace">
                  <i class="fa-solid" [class.fa-circle-check]="isRead(book.id)" [class.fa-book]="!isRead(book.id)"></i>
                  {{ isRead(book.id) ? (currentLang === 'ar' ? 'تمت القراءة' : 'Read') : (currentLang === 'ar' ? 'قيد القراءة' : 'To Read') }}
                </span>

                <button class="btn btn-sm btn-inspect-book" (click)="openDrawer(book)">
                  <i class="fa-solid fa-lightbulb me-1"></i>
                  <span>{{ currentLang === 'ar' ? 'الدروس المستفادة' : 'Key Takeaways' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SLIDE-OVER BOOK DRAWER -->
      <div *ngIf="selectedBook" class="stage-preview-backdrop" (click)="closeDrawer()">
        <div class="stage-preview-modal p-3 p-sm-4" (click)="$event.stopPropagation()">
          <div class="d-flex justify-content-between align-items-start pb-3 border-bottom mb-3">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <span class="year-badge font-monospace">{{ selectedBook.year }}</span>
                <span class="genre-pill">{{ selectedBook.category }}</span>
                <span class="text-muted small font-monospace">{{ selectedBook.pages }} pages</span>
              </div>
              <h3 class="fw-bold mb-1 drawer-heading">{{ currentLang === 'ar' ? selectedBook.titleAr : selectedBook.title }}</h3>
              <p class="text-secondary small mb-0">{{ selectedBook.author }} · {{ selectedBook.year }}</p>
            </div>
            <button class="btn-close-drawer" (click)="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
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
                <span *ngFor="let theme of selectedBook.keyThemes" class="theme-chip font-monospace">#{{ theme }}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-top d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-action-subtle" (click)="closeDrawer()">{{ currentLang === 'ar' ? 'إغلاق' : 'Close' }}</button>
            <button class="btn btn-sm btn-primary-clean" (click)="toggleRead($event, selectedBook.id)">
              <i class="fa-solid" [class.fa-check]="isRead(selectedBook.id)" [class.fa-plus]="!isRead(selectedBook.id)"></i>
              <span class="ms-1">{{ isRead(selectedBook.id) ? (currentLang === 'ar' ? 'تمت القراءة ✓' : 'Read ✓') : (currentLang === 'ar' ? 'تحديد كـ مقروء' : 'Mark as Read') }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .library-page { position: relative; }
    .hero-kicker {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      font-size: 0.74rem; color: var(--text-secondary);
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-mint); box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
      display: inline-block;
    }
    .kicker-label { color: var(--primary); font-weight: 700; }
    .hero-title {
      font-size: 2.1rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .hero-desc {
      color: var(--text-secondary); font-size: 0.95rem; max-width: 680px;
      line-height: 1.6; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .meter-box {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md); min-width: 280px; box-shadow: var(--shadow-sm);
    }
    .meter-label { font-size: 0.82rem; color: var(--text-primary); }
    .meter-pct {
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

    .library-toolbar {
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
      padding-inline-start: 36px; padding-inline-end: 32px; height: 38px; font-size: 0.82rem;
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm); color: var(--text-primary);
    }
    .btn-clear-search {
      position: absolute; inset-inline-end: 10px; background: transparent; border: none; color: var(--text-muted);
    }
    .counter-pill {
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

    /* BOOK CARD */
    .book-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); transition: all 0.2s ease; box-shadow: var(--shadow-sm);
    }
    .book-card:hover {
      border-color: var(--border-hover); box-shadow: var(--shadow-md); transform: translateY(-2px);
    }
    .book-card.is-read {
      border-inline-start: 3px solid var(--accent-mint);
    }
    .year-badge {
      font-size: 0.72rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); border: 1px solid rgba(21, 82, 57, 0.2);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .genre-pill {
      font-size: 0.68rem; background: var(--surface-elevated); color: var(--text-secondary);
      border: 1px solid var(--border-subtle); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .btn-read-check {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-muted); width: 28px; height: 28px; display: grid;
      place-items: center; border-radius: 50%; cursor: pointer; transition: all 0.15s ease;
    }
    .btn-read-check.checked {
      background: var(--primary); border-color: var(--accent-mint); color: #FFFFFF;
    }
    .book-title {
      font-size: 1.1rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
      cursor: pointer; transition: color 0.15s ease;
    }
    .book-title:hover { color: var(--primary); }
    .theme-chip {
      font-size: 0.68rem; background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .read-status-text { color: var(--text-muted); }
    .book-card.is-read .read-status-text { color: var(--primary); font-weight: 600; }
    .btn-inspect-book {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.75rem; padding: 4px 10px;
      border-radius: var(--radius-sm); cursor: pointer; font-weight: 600; transition: all 0.15s ease;
    }
    .btn-inspect-book:hover {
      border-color: var(--primary); color: var(--primary); background: var(--surface-hover);
    }

    /* DRAWER */
    .stage-preview-backdrop {
      position: fixed; inset: 0; background: rgba(17, 24, 39, 0.45);
      backdrop-filter: blur(4px); z-index: 1060; display: flex; justify-content: flex-end;
    }
    .stage-preview-modal {
      width: 100%; max-width: 680px; height: 100vh; background: var(--surface-card);
      border-inline-start: 1px solid var(--border-subtle); display: flex;
      flex-direction: column; box-shadow: var(--shadow-lg);
    }
    .drawer-heading {
      color: var(--text-primary); font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .btn-close-drawer {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-secondary); width: 32px; height: 32px; display: grid;
      place-items: center; border-radius: var(--radius-sm);
    }

    .empty-state-box {
      background: var(--surface-card);
      border: 1px dashed var(--border-subtle);
    }
    .empty-icon-circle {
      width: 64px; height: 64px; border-radius: 50%;
      background: var(--primary-subtle); color: var(--primary);
      display: grid; place-items: center; font-size: 1.6rem;
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
      color: var(--text-secondary); font-size: 0.75rem; padding: 6px 12px; border-radius: var(--radius-sm);
    }
    .btn-primary-clean {
      background: var(--primary); border: 1px solid var(--primary);
      color: #FFFFFF !important; font-size: 0.78rem; font-weight: 600;
      padding: 6px 14px; border-radius: var(--radius-sm); cursor: pointer;
    }
  `]
})
export class LibraryComponent implements OnInit {
  books: BookStage[] = BOOKS_STAGES;
  filteredBooks: BookStage[] = [];
  selectedBook: BookStage | null = null;
  completedBookIds: string[] = [];

  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    { key: 'All', labelEn: 'All Books', labelAr: 'كافة الكتب' },
    { key: 'Habits', labelEn: 'Habits & Systems', labelAr: 'العادات والأنظمة' },
    { key: 'Productivity', labelEn: 'Deep Focus', labelAr: 'التركيز والإنتاجية' },
    { key: 'Cognition', labelEn: 'Thinking & Biases', labelAr: 'التفكير والانحيازات' },
    { key: 'Strategy', labelEn: 'Strategy & Decisions', labelAr: 'الاستراتيجية' },
    { key: 'Wealth', labelEn: 'Wealth & Money', labelAr: 'المال والثروة' },
    { key: 'Philosophy', labelEn: 'Philosophy & Meaning', labelAr: 'الفلسفة والمعنى' }
  ];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.loadProgress();
    this.filteredBooks = [...this.books];
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  get progressPercentage(): number {
    if (this.books.length === 0) return 0;
    return Math.round((this.completedBookIds.length / this.books.length) * 100);
  }

  loadProgress() {
    try {
      const data = localStorage.getItem('roadmap_books_completed');
      this.completedBookIds = data ? JSON.parse(data) : [];
    } catch {
      this.completedBookIds = [];
    }
  }

  toggleRead(event: Event, bookId: string) {
    event.stopPropagation();
    if (this.completedBookIds.includes(bookId)) {
      this.completedBookIds = this.completedBookIds.filter(id => id !== bookId);
    } else {
      this.completedBookIds = [...this.completedBookIds, bookId];
    }
    localStorage.setItem('roadmap_books_completed', JSON.stringify(this.completedBookIds));
  }

  isRead(bookId: string): boolean {
    return this.completedBookIds.includes(bookId);
  }

  openDrawer(book: BookStage) {
    this.selectedBook = book;
  }

  closeDrawer() {
    this.selectedBook = null;
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
    this.filteredBooks = this.books.filter(b => {
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
