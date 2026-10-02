import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService, PaceCalculation, StudyPlan } from '../../services/progress.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="session-backdrop" (click)="close()">
      <div class="session-modal-dialog" (click)="$event.stopPropagation()">
        <!-- Modal Header -->
        <div class="modal-head d-flex justify-content-between align-items-center p-3 px-4 border-bottom">
          <div class="d-flex align-items-center gap-2">
            <div class="modal-icon-badge">
              <i class="fa-solid fa-clock-rotate-left text-cyan"></i>
            </div>
            <div>
              <h5 class="text-white fw-bold mb-0">{{ 'session.title' | trans }}</h5>
              <small class="text-secondary">{{ 'planner.badge' | trans }}</small>
            </div>
          </div>
          <button class="btn-close-modal" (click)="close()" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="modal-scrollable-body p-4">
          <!-- Active Tab Navigation -->
          <div class="session-nav-tabs d-flex gap-2 mb-4 p-1 rounded-3">
            <button 
              class="tab-btn flex-fill" 
              [class.active]="activeTab === 'planner'"
              (click)="activeTab = 'planner'"
            >
              <i class="fa-solid fa-calculator me-1"></i> {{ 'planner.badge' | trans }}
            </button>
            <button 
              class="tab-btn flex-fill" 
              [class.active]="activeTab === 'session'"
              (click)="activeTab = 'session'"
            >
              <i class="fa-solid fa-hard-drive me-1"></i> {{ 'session.title' | trans }}
            </button>
          </div>

          <!-- TAB 1: STUDY PACE & TIME CALCULATOR -->
          <div *ngIf="activeTab === 'planner'" class="tab-content-area">
            <!-- Planner Subtitle -->
            <p class="text-secondary small mb-4 leading-relaxed">
              {{ 'planner.subtitle' | trans }}
            </p>

            <!-- Quick Presets -->
            <div class="mb-4">
              <label class="text-white small fw-semibold mb-2 d-block">
                <i class="fa-solid fa-bolt text-warning me-1"></i>
                {{ isArabic ? 'اختر وتيرة جاهزة سريعة:' : 'Quick Study Presets:' }}
              </label>
              <div class="d-flex flex-wrap gap-2">
                <button 
                  type="button" 
                  class="preset-chip" 
                  [class.active]="plan.hoursPerDay === 1 && plan.daysPerWeek === 4"
                  (click)="applyPreset(1, 4)"
                >
                  {{ 'planner.presetCasual' | trans }}
                </button>
                <button 
                  type="button" 
                  class="preset-chip" 
                  [class.active]="plan.hoursPerDay === 2 && plan.daysPerWeek === 5"
                  (click)="applyPreset(2, 5)"
                >
                  {{ 'planner.presetStandard' | trans }}
                </button>
                <button 
                  type="button" 
                  class="preset-chip" 
                  [class.active]="plan.hoursPerDay === 4 && plan.daysPerWeek === 6"
                  (click)="applyPreset(4, 6)"
                >
                  {{ 'planner.presetIntensive' | trans }}
                </button>
                <button 
                  type="button" 
                  class="preset-chip" 
                  [class.active]="plan.hoursPerDay === 6 && plan.daysPerWeek === 6"
                  (click)="applyPreset(6, 6)"
                >
                  {{ 'planner.presetBootcamp' | trans }}
                </button>
              </div>
            </div>

            <!-- Inputs Grid -->
            <div class="row g-3 mb-4">
              <div class="col-sm-6">
                <div class="input-card p-3 rounded-3 border">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="small text-secondary mb-0">{{ 'planner.dailyHours' | trans }}</label>
                    <span class="badge badge-subtle-primary font-monospace fw-bold">{{ plan.hoursPerDay }} {{ 'planner.hours' | trans }}</span>
                  </div>
                  <input 
                    type="range" 
                    class="form-range custom-range" 
                    min="1" 
                    max="8" 
                    step="0.5" 
                    [(ngModel)]="plan.hoursPerDay" 
                    (input)="onPlanChange()"
                  />
                  <div class="d-flex justify-content-between small text-secondary font-monospace mt-1">
                    <span>1h</span>
                    <span>2h</span>
                    <span>4h</span>
                    <span>8h</span>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="input-card p-3 rounded-3 border">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="small text-secondary mb-0">{{ 'planner.daysPerWeek' | trans }}</label>
                    <span class="badge badge-subtle-primary font-monospace fw-bold">{{ plan.daysPerWeek }} {{ 'planner.days' | trans }}</span>
                  </div>
                  <input 
                    type="range" 
                    class="form-range custom-range" 
                    min="1" 
                    max="7" 
                    step="1" 
                    [(ngModel)]="plan.daysPerWeek" 
                    (input)="onPlanChange()"
                  />
                  <div class="d-flex justify-content-between small text-secondary font-monospace mt-1">
                    <span>1d</span>
                    <span>3d</span>
                    <span>5d</span>
                    <span>7d</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dynamic Result Calculation Matrix -->
            <div class="calc-results-card p-3 rounded-4 mb-4 border">
              <div class="row g-3 text-center">
                <div class="col-4">
                  <div class="res-stat-label text-secondary small">{{ 'planner.completedTime' | trans }}</div>
                  <div class="res-stat-value text-emerald font-monospace fw-bold fs-5">
                    {{ pace.completedHours }} <span class="fs-6 fw-normal text-secondary">/ {{ pace.totalHours }}h</span>
                  </div>
                  <small class="text-secondary font-monospace">{{ completedStagesCount }}/26 stages</small>
                </div>

                <div class="col-4 border-start border-end">
                  <div class="res-stat-label text-secondary small">{{ 'planner.remainingTime' | trans }}</div>
                  <div class="res-stat-value text-cyan font-monospace fw-bold fs-5">
                    {{ pace.remainingHours }} <span class="fs-6 fw-normal text-secondary">hrs</span>
                  </div>
                  <small class="text-secondary font-monospace">{{ pace.weeklyHours }}h / week</small>
                </div>

                <div class="col-4">
                  <div class="res-stat-label text-secondary small">{{ 'planner.remainingWeeks' | trans }}</div>
                  <div class="res-stat-value text-purple font-monospace fw-bold fs-5">
                    {{ pace.remainingWeeks }} <span class="fs-6 fw-normal text-secondary">weeks</span>
                  </div>
                  <small class="text-secondary font-monospace">~{{ pace.remainingDays }} days</small>
                </div>
              </div>

              <!-- Projected Date Banner -->
              <div class="projected-banner mt-3 pt-3 border-top text-center">
                <span class="text-secondary small d-block mb-1">{{ 'planner.targetDate' | trans }}:</span>
                <span class="text-white fw-bold fs-5 font-monospace highlight-date">
                  <i class="fa-solid fa-flag-checkered text-warning me-2"></i>
                  {{ isArabic ? pace.targetDateFormattedAr : pace.targetDateFormattedEn }}
                </span>
              </div>
            </div>

            <!-- Pace Velocity Feedback -->
            <div class="pace-feedback-box p-3 rounded-3 mb-3 border">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="badge" [ngClass]="getPaceBadgeClass(pace.paceLevel)">
                  {{ isArabic ? pace.paceLabelAr : pace.paceLabelEn }}
                </span>
                <span class="small text-secondary font-monospace">({{ pace.weeklyHours }} hours / week)</span>
              </div>
              <p class="small text-secondary mb-0 leading-relaxed">
                {{ isArabic ? pace.paceDescAr : pace.paceDescEn }}
              </p>
            </div>
          </div>

          <!-- TAB 2: SESSION MANAGEMENT & LOCAL PERSISTENCE -->
          <div *ngIf="activeTab === 'session'" class="tab-content-area">
            <p class="text-secondary small mb-4 leading-relaxed">
              {{ 'session.desc' | trans }}
            </p>

            <!-- Auto-save Status Card -->
            <div class="session-status-card p-3 rounded-3 border mb-4 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-3">
                <div class="status-indicator-dot pulse"></div>
                <div>
                  <div class="text-white fw-semibold small">{{ 'session.autoSaved' | trans }}</div>
                  <small class="text-secondary font-monospace">{{ 'session.lastSaved' | trans }} {{ lastSavedFormatted }}</small>
                </div>
              </div>
              <span class="badge badge-subtle-success font-monospace">Active</span>
            </div>

            <!-- Export & Import Action Buttons -->
            <div class="row g-3 mb-4">
              <div class="col-sm-6">
                <button class="btn btn-export-session w-100 p-3 rounded-3" (click)="onExportSession()">
                  <i class="fa-solid fa-download me-2 text-cyan"></i>
                  <span class="fw-semibold text-white d-block">{{ 'session.exportBtn' | trans }}</span>
                  <small class="text-secondary font-monospace">ai-engineer-session.json</small>
                </button>
              </div>

              <div class="col-sm-6">
                <label class="btn btn-import-session w-100 p-3 rounded-3 text-center mb-0 cursor-pointer">
                  <i class="fa-solid fa-upload me-2 text-purple"></i>
                  <span class="fw-semibold text-white d-block">{{ 'session.importBtn' | trans }}</span>
                  <small class="text-secondary font-monospace">{{ 'session.uploadFile' | trans }}</small>
                  <input type="file" accept=".json" class="d-none" (change)="onFileSelected($event)">
                </label>
              </div>
            </div>

            <!-- Alert Messages -->
            <div *ngIf="importFeedback" class="alert p-3 mb-4 rounded-3" [class.alert-success]="importFeedback.success" [class.alert-danger]="!importFeedback.success">
              <i class="fa-solid" [class.fa-check]="importFeedback.success" [class.fa-triangle-exclamation]="!importFeedback.success"></i>
              {{ isArabic ? importFeedback.messageAr : importFeedback.messageEn }}
            </div>

            <!-- How It Works Educational Section -->
            <div class="how-it-works-box p-3 rounded-3 border mb-4">
              <h6 class="text-white fw-semibold mb-2">
                <i class="fa-solid fa-shield-halved text-cyan me-1"></i>
                {{ 'session.howItWorksTitle' | trans }}
              </h6>
              <ul class="list-unstyled small text-secondary mb-0 space-y-1">
                <li class="mb-1">{{ 'session.howItWorks1' | trans }}</li>
                <li class="mb-1">{{ 'session.howItWorks2' | trans }}</li>
                <li>{{ 'session.howItWorks3' | trans }}</li>
              </ul>
            </div>

            <!-- Danger Zone: Reset Progress -->
            <div class="danger-zone p-3 rounded-3 border border-danger-subtle d-flex justify-content-between align-items-center">
              <div>
                <div class="text-white small fw-semibold">{{ 'session.resetBtn' | trans }}</div>
                <small class="text-secondary">{{ isArabic ? 'حذف كافة البيانات وإعادة البدء من الصفر' : 'Clear all stages, checklist, and custom plan' }}</small>
              </div>
              <button class="btn btn-sm btn-outline-danger" (click)="onResetProgress()">
                <i class="fa-solid fa-trash-can me-1"></i> {{ 'roadmap.reset' | trans }}
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer-custom p-3 px-4 border-top d-flex justify-content-between align-items-center">
          <small class="text-secondary font-monospace">
            {{ isArabic ? 'تم حفظ كافة التغييرات تلقائياً' : 'All changes auto-saved to localStorage' }}
          </small>
          <button class="btn btn-sm btn-secondary-action" (click)="close()">
            {{ isArabic ? 'إغلاق النافذة' : 'Close' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .session-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(4, 4, 7, 0.78);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.15s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .session-modal-dialog {
      background: var(--surface-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 620px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-xl);
      overflow: hidden;
      animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { transform: translateY(16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .modal-head {
      background: var(--surface-elevated);
    }
    .modal-icon-badge {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      display: grid;
      place-items: center;
      font-size: 0.9rem;
    }
    .btn-close-modal {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 1.1rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: var(--radius-sm);
      transition: color 0.15s ease;
    }
    .btn-close-modal:hover {
      color: var(--text-primary);
    }
    .modal-scrollable-body {
      overflow-y: auto;
      flex-grow: 1;
    }
    .session-nav-tabs {
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .tab-btn.active {
      background: var(--surface-elevated);
      color: var(--text-primary);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .preset-chip {
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.78rem;
      padding: 5px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .preset-chip:hover, .preset-chip.active {
      border-color: var(--primary-light);
      color: var(--text-primary);
      background: var(--surface-elevated);
    }
    .input-card {
      background: var(--surface-base);
      border-color: var(--border-subtle) !important;
    }
    .custom-range {
      accent-color: var(--primary-light);
    }
    .calc-results-card {
      background: var(--surface-elevated);
      border-color: var(--border-subtle) !important;
    }
    .highlight-date {
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }
    .pace-feedback-box {
      background: var(--surface-base);
      border-color: var(--border-subtle) !important;
    }
    .session-status-card {
      background: var(--surface-base);
      border-color: var(--border-subtle) !important;
    }
    .status-indicator-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    }
    .btn-export-session, .btn-import-session {
      background: var(--surface-base);
      border: 1px solid var(--border-subtle);
      transition: all 0.15s ease;
      text-align: left;
    }
    .btn-export-session:hover, .btn-import-session:hover {
      background: var(--surface-elevated);
      border-color: var(--primary-light);
    }
    .how-it-works-box {
      background: var(--surface-base);
      border-color: var(--border-subtle) !important;
    }
    .danger-zone {
      background: rgba(239, 68, 68, 0.05);
    }
    .modal-footer-custom {
      background: var(--surface-elevated);
    }
    .cursor-pointer {
      cursor: pointer;
    }
  `]
})
export class SessionModalComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<void>();

  activeTab: 'planner' | 'session' = 'planner';
  plan: StudyPlan = { hoursPerDay: 2, daysPerWeek: 5, startDate: '' };
  pace!: PaceCalculation;
  lastSavedFormatted = '';
  completedStagesCount = 0;
  importFeedback: { success: boolean; messageEn: string; messageAr: string } | null = null;

  private sub = new Subscription();

  constructor(
    private progressService: ProgressService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.plan = { ...this.progressService.getStudyPlan() };
    this.refreshPace();

    this.sub.add(
      this.progressService.completedStages$.subscribe(stages => {
        this.completedStagesCount = stages.length;
        this.refreshPace();
      })
    );

    this.sub.add(
      this.progressService.lastSaved$.subscribe(dateStr => {
        try {
          const d = new Date(dateStr);
          this.lastSavedFormatted = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch {
          this.lastSavedFormatted = 'Just now';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get isArabic(): boolean {
    return this.translationService.isRtl;
  }

  refreshPace(): void {
    this.pace = this.progressService.calculatePace();
  }

  onPlanChange(): void {
    this.progressService.updateStudyPlan(this.plan);
    this.refreshPace();
  }

  applyPreset(hours: number, days: number): void {
    this.plan.hoursPerDay = hours;
    this.plan.daysPerWeek = days;
    this.onPlanChange();
  }

  getPaceBadgeClass(level: string): string {
    switch (level) {
      case 'relaxed': return 'badge-subtle-info';
      case 'steady': return 'badge-subtle-success';
      case 'intensive': return 'badge-subtle-warning';
      case 'bootcamp': return 'badge-subtle-danger';
      default: return 'badge-subtle-primary';
    }
  }

  onExportSession(): void {
    this.progressService.downloadSessionFile();
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      const res = this.progressService.importSessionJson(content);
      this.importFeedback = res;
      if (res.success) {
        this.plan = { ...this.progressService.getStudyPlan() };
        this.refreshPace();
      }
    };
    reader.readAsText(file);
  }

  onResetProgress(): void {
    const confirmMsg = this.translationService.t('session.resetConfirm');
    if (confirm(confirmMsg)) {
      this.progressService.resetAllProgress();
      this.plan = { ...this.progressService.getStudyPlan() };
      this.refreshPace();
      this.importFeedback = {
        success: true,
        messageEn: 'All progress and study planner parameters have been reset.',
        messageAr: 'تمت إعادة ضبط جميع مراحل التقدم وبيانات الخطة الدراسية بنجاح.'
      };
    }
  }

  close(): void {
    this.closeEvent.emit();
  }
}
