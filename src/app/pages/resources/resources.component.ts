import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RESOURCES_DATA } from '../../data/resources.data';
import { ROADMAP_STAGES } from '../../data/roadmap.data';
import { ResourceItem, ResourceType } from '../../models/resource.model';
import { RoadmapStage } from '../../models/roadmap.model';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="resources-page py-5">
      <div class="container-xl">
        <!-- Header -->
        <div class="resources-hero text-center max-w-750 mx-auto mb-5">
          <span class="badge badge-subtle-primary font-monospace mb-2">
            Curated Study Library
          </span>
          <h1 class="text-white fw-bold display-6 mb-2">AI Engineering Resources</h1>
          <p class="text-secondary lead fs-6 mb-4">
            Curated, high-signal documentation, seminal research papers, textbooks, and practice platforms organized by stage.
          </p>

          <!-- Filter Toolbar -->
          <div class="toolbar-box p-3 rounded-4 border">
            <div class="row g-3 align-items-center">
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
                    placeholder="Search resources..."
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

              <!-- Stage Filter Dropdown -->
              <div class="col-lg-4 col-md-4">
                <select 
                  class="form-select select-stage small font-monospace" 
                  [(ngModel)]="selectedStageId" 
                  (change)="applyFilters()"
                >
                  <option value="All">All Stages (01 — 26)</option>
                  <option *ngFor="let s of stages" [value]="s.id">
                    Stage {{ s.id }}: {{ s.title }}
                  </option>
                </select>
              </div>

              <!-- Type Count -->
              <div class="col-lg-4 col-md-3 text-md-end text-center">
                <span class="small text-secondary font-monospace">
                  Showing {{ filteredResources.length }} of {{ resources.length }} resources
                </span>
              </div>
            </div>

            <!-- Category Type Pills -->
            <div class="d-flex flex-wrap gap-1 mt-3 pt-2 border-top category-track">
              <button 
                *ngFor="let type of typeCategories" 
                class="type-pill font-monospace"
                [class.active]="selectedType === type"
                (click)="setType(type)"
              >
                {{ type }}
              </button>
            </div>
          </div>
        </div>

        <!-- Resources Cards Grid -->
        <div class="row g-4">
          <div *ngIf="filteredResources.length === 0" class="col-12 text-center py-5 text-secondary empty-notice">
            <i class="fa-solid fa-book-open fa-2x mb-2 text-secondary"></i>
            <p>No resources found matching your current filter.</p>
            <button class="btn btn-sm btn-outline-info" (click)="resetFilters()">Clear Filters</button>
          </div>

          <div *ngFor="let res of filteredResources" class="col-lg-4 col-md-6">
            <div class="resource-card p-4 rounded-4 h-100 d-flex flex-column border">
              <!-- Top Badges -->
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge badge-subtle-info font-monospace small">
                  <i [class]="getTypeIcon(res.type) + ' me-1'"></i>{{ res.type }}
                </span>
                <span class="badge badge-stage-pill font-monospace small">
                  Stage {{ res.stageId }}
                </span>
              </div>

              <!-- Resource Name & Stage -->
              <h5 class="text-white fw-bold mb-1 resource-title">{{ res.name }}</h5>
              <small class="text-secondary font-monospace d-block mb-2">{{ res.stageTitle }}</small>
              <p class="text-secondary small leading-relaxed mb-3 line-clamp-3">{{ res.description }}</p>

              <!-- Bottom Meta & Link Button -->
              <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="tech-chip font-monospace">{{ res.tag }}</span>
                <a 
                  [href]="res.urlPlaceholder" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-sm btn-secondary-action"
                >
                  Visit Resource <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resources-page {
      position: relative;
    }
    .max-w-750 { max-width: 750px; }

    .badge-subtle-primary {
      background: var(--course-1-bg);
      color: var(--primary-light);
      border: 1px solid rgba(99, 102, 241, 0.3);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-subtle-info {
      background: var(--info-bg);
      color: var(--info);
      border: 1px solid var(--info-border);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }
    .badge-stage-pill {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }

    .toolbar-box {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
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

    .select-stage {
      background-color: var(--surface);
      border-color: var(--border-subtle);
      color: var(--text-primary);
    }
    .select-stage:focus {
      background-color: var(--surface);
      border-color: var(--primary);
      color: var(--text-primary);
    }

    .type-pill {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.72rem;
      border-radius: var(--radius-sm);
      padding: 3px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .type-pill:hover {
      color: var(--text-primary);
      border-color: var(--border-strong);
    }
    .type-pill.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }

    .resource-card {
      background: var(--surface-card);
      border-color: var(--border-subtle) !important;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .resource-card:hover {
      border-color: var(--border-primary) !important;
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }
    .resource-title {
      font-size: 1.05rem;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .border-top {
      border-color: var(--border-subtle) !important;
    }
  `]
})
export class ResourcesComponent implements OnInit {
  resources: ResourceItem[] = RESOURCES_DATA;
  stages: RoadmapStage[] = ROADMAP_STAGES;
  filteredResources: ResourceItem[] = [];

  searchQuery = '';
  selectedStageId = 'All';
  selectedType = 'All';

  typeCategories: string[] = [
    'All',
    'Documentation',
    'Courses',
    'Books',
    'YouTube',
    'Papers',
    'GitHub',
    'Practice'
  ];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.filteredResources = [...this.resources];
  }

  setType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredResources = this.resources.filter(item => {
      const matchSearch = !q || (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.stageTitle.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
      const matchStage = this.selectedStageId === 'All' || item.stageId === this.selectedStageId;
      const matchType = this.selectedType === 'All' || item.type === this.selectedType;

      return matchSearch && matchStage && matchType;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedStageId = 'All';
    this.selectedType = 'All';
    this.applyFilters();
  }

  getTypeIcon(type: ResourceType): string {
    switch (type) {
      case 'Documentation': return 'fa-solid fa-file-code';
      case 'Courses': return 'fa-solid fa-graduation-cap';
      case 'Books': return 'fa-solid fa-book';
      case 'YouTube': return 'fa-brands fa-youtube';
      case 'Papers': return 'fa-solid fa-file-lines';
      case 'GitHub': return 'fa-brands fa-github';
      case 'Practice': return 'fa-solid fa-terminal';
      default: return 'fa-solid fa-bookmark';
    }
  }
}
