import { Component, EventEmitter, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService, SearchResult } from '../../services/search.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-backdrop" (click)="close()">
      <div class="search-dialog" (click)="$event.stopPropagation()">
        <!-- Search Input Box -->
        <div class="search-header">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            #searchInput
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearch()" 
            [placeholder]="isArabic ? 'ابحث في الموضوعات: RAG, LangGraph, بايثون, Embeddings, Docker...' : 'Search topics: RAG, LangGraph, Python, Embeddings, Docker...'"
            class="search-input"
            autofocus
          />
          <button class="esc-badge" (click)="close()">ESC</button>
        </div>

        <!-- Quick Tags -->
        <div class="quick-tags px-3 py-2 border-bottom">
          <small class="text-secondary me-2">{{ isArabic ? 'اقتراحات شائعة:' : 'Popular searches:' }}</small>
          <button 
            *ngFor="let suggestion of suggestions" 
            class="tag-btn font-monospace" 
            (click)="quickSearch(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>

        <!-- Results Area -->
        <div class="search-body">
          <div *ngIf="results.length > 0" class="results-list">
            <div 
              *ngFor="let result of results" 
              class="result-item" 
              (click)="selectResult(result)"
            >
              <div class="result-top">
                <span class="badge stage-num-badge me-2">
                  Stage {{ result.stageNumber < 10 ? '0' + result.stageNumber : result.stageNumber }}
                </span>
                <span class="stage-title-text">{{ result.stageTitle }}</span>
                <span class="badge result-type-badge ms-auto text-uppercase small font-monospace">
                  {{ result.type }}
                </span>
              </div>
              <div class="result-topic text-white font-monospace mt-1">
                <i class="fa-solid fa-arrow-turn-down-right me-1 text-info"></i>{{ result.matchedTopic }}
              </div>
              <p class="result-desc small text-secondary mb-0 mt-1 line-clamp-2">
                {{ result.matchedText }}
              </p>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="searchQuery && results.length === 0" class="empty-state text-center py-5">
            <i class="fa-solid fa-circle-question fa-2x text-secondary mb-2"></i>
            <p class="text-secondary mb-1">
              {{ isArabic ? 'لم يتم العثور على نتائج مطابقة لـ' : 'No matching topics found for' }} "{{ searchQuery }}"
            </p>
            <small class="text-muted">
              {{ isArabic ? 'جرّب البحث عن مفاهيم مثل: RAG أو Embeddings أو FastAPI أو Docker' : 'Try searching for core concepts like "RAG", "Embeddings", "FastAPI", or "Docker"' }}
            </small>
          </div>

          <!-- Default State -->
          <div *ngIf="!searchQuery" class="default-state text-center py-5">
            <i class="fa-solid fa-compass fa-2x text-info mb-2 opacity-50"></i>
            <p class="text-secondary mb-1">
              {{ isArabic ? 'استكشف كافة الـ 26 مرحلة وأكثر من 300 موضوع تقني' : 'Explore all 26 stages and 300+ AI Engineering topics' }}
            </p>
            <small class="text-muted">
              {{ isArabic ? 'اكتب حرفين على الأقل للبحث الفوري' : 'Type at least 2 characters to search instantly' }}
            </small>
          </div>
        </div>

        <div class="search-footer d-flex justify-content-between align-items-center px-3 py-2 border-top">
          <small class="text-muted">
            <i class="fa-regular fa-keyboard me-1"></i>
            {{ isArabic ? 'اضغط ESC للإغلاق' : 'Press ESC to exit' }}
          </small>
          <small class="text-info font-monospace">{{ results.length }} {{ isArabic ? 'نتائج' : 'matches' }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4, 7, 13, 0.78);
      backdrop-filter: blur(12px);
      z-index: 2000;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 80px;
    }
    .search-dialog {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 660px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      margin: 0 16px;
    }
    .search-header {
      display: flex;
      align-items: center;
      padding: 14px 18px;
      gap: 12px;
      border-bottom: 1px solid var(--border-subtle);
      background: var(--surface);
    }
    .search-icon {
      color: var(--primary-light);
      font-size: 1.1rem;
    }
    .search-input {
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 0.98rem;
      width: 100%;
      outline: none;
    }
    .search-input::placeholder {
      color: var(--text-muted);
    }
    .esc-badge {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.68rem;
      font-family: var(--font-mono);
      padding: 2px 7px;
      border-radius: 4px;
      cursor: pointer;
    }
    .quick-tags {
      background: var(--bg-primary);
      border-color: var(--border-subtle) !important;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tag-btn {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .tag-btn:hover {
      border-color: var(--primary);
      color: var(--primary-light);
    }
    .search-body {
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      padding: 8px;
    }
    .result-item {
      padding: 10px 14px;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
      border: 1px solid transparent;
    }
    .result-item:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
    }
    .stage-num-badge {
      background: rgba(59, 130, 246, 0.10);
      color: var(--primary-light);
      border: 1px solid rgba(59, 130, 246, 0.25);
      font-family: var(--font-mono);
      font-size: 0.72rem;
    }
    .stage-title-text {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }
    .result-type-badge {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.65rem;
    }
    .result-topic {
      font-size: 0.9rem;
    }
    .search-footer {
      background: var(--surface);
      border-color: var(--border-subtle) !important;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class SearchModalComponent {
  @Output() closeSearch = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  searchQuery = '';
  results: SearchResult[] = [];
  suggestions = ['RAG', 'LangGraph', 'FastAPI', 'Terraform', 'Embeddings', 'MCP', 'Docker', 'CRAG'];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private transService: TranslationService
  ) {}

  get isArabic(): boolean {
    return this.transService.isRtl;
  }

  onSearch() {
    this.results = this.searchService.search(this.searchQuery);
  }

  quickSearch(term: string) {
    this.searchQuery = term;
    this.onSearch();
    this.searchInput?.nativeElement.focus();
  }

  selectResult(result: SearchResult) {
    this.router.navigate(['/stage', result.stageId]);
    this.close();
  }

  close() {
    this.searchQuery = '';
    this.results = [];
    this.closeSearch.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close();
  }
}
