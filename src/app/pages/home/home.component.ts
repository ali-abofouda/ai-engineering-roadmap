import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <div class="home-mind-container py-4">
      <div class="container-xl">

        <!-- ============================================================= -->
        <!-- 1. HERO IDENTITY: WELCOME TO MY MIND                         -->
        <!-- ============================================================= -->
        <section class="mind-hero-section p-4 p-md-5 mb-5 rounded-4 position-relative overflow-hidden">
          <div class="hero-grid-pattern"></div>
          
          <div class="position-relative z-1">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill hero-badge mb-3">
              <span class="pulse-point"></span>
              <span class="small font-monospace text-uppercase fw-bold text-pine">
                {{ currentLang === 'ar' ? 'عقلي الرقمي المفتوح · SECOND BRAIN' : 'OPEN DIGITAL MIND · SECOND BRAIN' }}
              </span>
            </div>

            <h1 class="hero-title fw-bold mb-3">
              {{ currentLang === 'ar' ? 'مرحباً بك في' : 'Welcome to' }} 
              <span class="hero-brand-accent">{{ currentLang === 'ar' ? 'عقلي' : 'My Digital Brain' }}</span>
            </h1>

            <p class="hero-desc text-secondary leading-relaxed mb-4">
              {{ currentLang === 'ar' 
                ? 'مساحة رقمية هادئة ومفتوحة لتوثيق مسار المعرفة: الخريطة الذهنية لهندسة الذكاء الاصطناعي وروائع السينما العالمية التي شكّلت وعيي وتفكيري.'
                : 'A calm, curated digital second brain: synthesizing the interactive learning mind map for AI engineering and life-altering cinema masterpieces.' }}
            </p>

            <div class="d-flex flex-wrap gap-2 gap-sm-3 mb-4">
              <a routerLink="/tech" class="btn btn-primary-clean">
                <i class="fa-solid fa-brain me-1"></i>
                <span>{{ currentLang === 'ar' ? 'استكشف الخريطة الذهنية' : 'The Mind Map' }}</span>
                <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
              </a>
              <a routerLink="/cinema" class="btn btn-secondary-clean">
                <i class="fa-solid fa-film text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'روائع السينما المختارة' : 'Curated Cinema' }}</span>
              </a>
            </div>

            <!-- Live Mind Stats Row -->
            <div class="row g-2 g-md-3 pt-3 border-top">
              <div class="col-md-4 col-sm-6">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'عقد ومحطات الخريطة الذهنية' : 'Mind Map Nodes' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">26 {{ currentLang === 'ar' ? 'عقدة متصلة' : 'Connected Nodes' }}</div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'أفلام سينمائية مختارة' : 'Curated Masterpieces' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">6 {{ currentLang === 'ar' ? 'أفلام أيقونية' : 'Iconic Films' }}</div>
                </div>
              </div>
              <div class="col-md-4 col-12">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'حالة التفكير والمساحة' : 'Brain Status' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">100% {{ currentLang === 'ar' ? 'نظام نظيف وهادئ' : 'Calm & Minimal' }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- 2. NOW SECTION: WHAT'S ON MY MIND RIGHT NOW (/now)            -->
        <!-- ============================================================= -->
        <section class="now-focus-card p-4 p-md-4 mb-5 rounded-4">
          <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="now-dot"></span>
              <h3 class="fw-bold mb-0 now-title">
                {{ currentLang === 'ar' ? 'ما أركز عليه الآن (/now)' : 'Current Mind Focus (/now)' }}
              </h3>
            </div>
            <span class="small text-muted font-monospace">
              {{ currentLang === 'ar' ? 'محدّث تلقائياً' : 'Live Focus' }}
            </span>
          </div>

          <div class="row g-3">
            <div class="col-md-4 col-12">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-pine mb-1">
                  <i class="fa-solid fa-code me-1"></i>{{ currentLang === 'ar' ? 'في الخريطة الذهنية:' : 'Mind Map Focus:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">LangGraph & Autonomous Agents</div>
                <div class="text-muted small">
                  {{ currentLang === 'ar' 
                    ? 'بناء وتنسيق أنظمة وكلاء أذكياء متعددي المهام يتخذون قرارات متسلسلة ويحفظون الحالة.' 
                    : 'Architecting multi-agent networks that coordinate stateful decisions and dynamic tool routing.' }}
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-6">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-warning mb-1">
                  <i class="fa-solid fa-film me-1"></i>{{ currentLang === 'ar' ? 'إلهام سينمائي:' : 'Cinema Reflection:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">Interstellar (2014)</div>
                <div class="text-muted small">
                  {{ currentLang === 'ar' 
                    ? 'تأملات في الفيزياء الفلكية والنسبية، والبحث عن المعنى، وقوة المشاعر الإنسانية عبر الأبعاد.' 
                    : 'Reflections on relativity, human perseverance, astrophysics, and meaning across dimensions.' }}
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-6">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-pine mb-1">
                  <i class="fa-solid fa-compass me-1"></i>{{ currentLang === 'ar' ? 'قاعدة ذهنية ثابتة:' : 'Mind Principle:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">Dichotomy of Control</div>
                <div class="text-muted small">
                  {{ currentLang === 'ar' 
                    ? 'التركيز التام على ما تملك السيطرة عليه فقط، وتجاهل الضجيج الخارجي بحكمة وسلام.' 
                    : 'Directing 100% energy toward internal inputs and choices, ignoring external noise.' }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- 3. THE TWO PILLARS: MIND MAP & CINEMA                         -->
        <!-- ============================================================= -->
        <section class="pillars-section mb-5">
          <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <span class="small font-monospace text-pine fw-bold text-uppercase">
                {{ currentLang === 'ar' ? 'محورا عقلي الأساسيان' : 'The Two Core Pillars' }}
              </span>
              <h2 class="fw-bold mb-0 lobes-heading">
                {{ currentLang === 'ar' ? 'الخريطة الذهنية وروائع السينما' : 'The Mind Map & Cinema Vault' }}
              </h2>
            </div>
          </div>

          <div class="row g-4">
            <!-- Pillar 1: The Mind Map -->
            <div class="col-lg-6 col-12">
              <div class="pillar-card h-100 p-4 p-md-5 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="pillar-number font-monospace">01</span>
                    <span class="pillar-tag font-monospace">26 {{ currentLang === 'ar' ? 'عقدة ومحطة' : 'Nodes' }}</span>
                  </div>
                  <div class="pillar-icon-box mb-3">
                    <i class="fa-solid fa-diagram-project"></i>
                  </div>
                  <h3 class="pillar-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'الخريطة الذهنية (مسار المعرفة)' : 'The Mind Map (Learning Path)' }}
                  </h3>
                  <p class="pillar-desc text-secondary mb-4">
                    {{ currentLang === 'ar'
                      ? 'خارطة ذهنية بصرية مترابطة توثق رحلة بناء المعرفة التقنية: من بايثون والرياضيات والشبكات العصبية، إلى الـ RAG المتقدم والوكلاء الأذكياء بـ LangGraph، ونشر النظم السحابية.'
                      : 'An interactive, visual connected node map documenting the entire cognitive learning path: from Python foundations to deep learning, transformers, production RAG, and autonomous agent orchestration.' }}
                  </p>
                </div>
                <a routerLink="/tech" class="btn btn-pillar-action w-100">
                  <span class="fw-bold">{{ currentLang === 'ar' ? 'فتح الخريطة الذهنية' : 'Open Mind Map' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- Pillar 2: Curated Cinema -->
            <div class="col-lg-6 col-12">
              <div class="pillar-card h-100 p-4 p-md-5 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="pillar-number font-monospace">02</span>
                    <span class="pillar-tag font-monospace">6 {{ currentLang === 'ar' ? 'أفلام أيقونية' : 'Iconic Films' }}</span>
                  </div>
                  <div class="pillar-icon-box mb-3">
                    <i class="fa-solid fa-film"></i>
                  </div>
                  <h3 class="pillar-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'روائع السينما والأفلام المختارة' : 'Curated Cinema Masterpieces' }}
                  </h3>
                  <p class="pillar-desc text-secondary mb-4">
                    {{ currentLang === 'ar'
                      ? 'مجموعة مصفاة بعناية شديدة من 6 أعمال سينمائية استثنائية: بين الخيال العلمي الفلسفي الذي يتحدى الإدراك (Interstellar, Inception, The Matrix)، والدراما الإنسانية الكبرى وقوة الإرادة (Shawshank, Whiplash, Fight Club).'
                      : 'A strictly curated selection of 6 transformative films: philosophical mind-benders challenging reality (Interstellar, Inception, The Matrix), and raw human resilience masterclasses (Shawshank, Whiplash, Fight Club).' }}
                  </p>
                </div>
                <a routerLink="/cinema" class="btn btn-pillar-action w-100">
                  <span class="fw-bold">{{ currentLang === 'ar' ? 'تصفح الأفلام المختارة' : 'Explore Cinema' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- 4. MIND SPARKS: ANCHORS OF PERSPECTIVE                       -->
        <!-- ============================================================= -->
        <section class="sparks-section p-4 p-md-5 rounded-4 mb-4">
          <div class="text-center max-w-600 mx-auto mb-4">
            <span class="small font-monospace text-pine fw-bold text-uppercase">
              {{ currentLang === 'ar' ? 'شذرات فكرية' : 'Mind Anchors' }}
            </span>
            <h3 class="fw-bold sparks-heading mb-2">
              {{ currentLang === 'ar' ? 'أفكار ترسخت في عقلي' : 'Anchors of My Perspective' }}
            </h3>
          </div>

          <div class="row g-3">
            <div class="col-md-4">
              <div class="spark-box p-3 h-100 rounded-3">
                <p class="small text-secondary fst-italic mb-2">
                  "أنت لا ترتقي لمستوى أهدافك، بل تهبط لمستوى أنظمتك اليومية الصغيرة."
                </p>
                <div class="small fw-bold text-pine font-monospace">— جيمس كلير (Atomic Habits)</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="spark-box p-3 h-100 rounded-3">
                <p class="small text-secondary fst-italic mb-2">
                  "أنت تملك السيطرة على عقلك وأفكارك فقط، لا على الأحداث الخارجية؛ أدرك هذا وستجد القوة والسلام."
                </p>
                <div class="small fw-bold text-pine font-monospace">— ماركوس أوريليوس (Meditations)</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="spark-box p-3 h-100 rounded-3">
                <p class="small text-secondary fst-italic mb-2">
                  "الوضوح والبساطة ليسا مجرد خيار شكلي، بل هما انعكاس للعمق الحقيقي والتخلص من الضجيج."
                </p>
                <div class="small fw-bold text-pine font-monospace">— تشارلي مانجر</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    .home-mind-container { position: relative; }

    /* HERO */
    .mind-hero-section {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }
    .hero-grid-pattern {
      position: absolute; inset: 0;
      background-image: radial-gradient(rgba(180, 83, 9, 0.08) 1px, transparent 1px);
      background-size: 24px 24px; pointer-events: none; opacity: 0.7;
    }
    .hero-badge {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
    }
    .pulse-point {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-mint); box-shadow: 0 0 8px rgba(217, 119, 6, 0.6);
      display: inline-block;
    }
    .hero-title {
      font-size: 2.3rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .hero-brand-accent {
      color: var(--primary); text-decoration: underline; text-underline-offset: 8px;
    }
    .hero-desc {
      font-size: 1.05rem; max-width: 780px;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .btn-primary-clean {
      background: var(--primary); border: 1px solid var(--primary);
      color: #FFFFFF !important; font-size: 0.88rem; font-weight: 600;
      padding: 10px 20px; border-radius: var(--radius-sm);
      text-decoration: none !important; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.15s ease;
    }
    .btn-primary-clean:hover {
      background: var(--primary-hover); transform: translateY(-1px);
    }
    .btn-secondary-clean {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-primary) !important; font-size: 0.88rem; font-weight: 600;
      padding: 10px 18px; border-radius: var(--radius-sm);
      text-decoration: none !important; display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.15s ease;
    }
    .btn-secondary-clean:hover {
      border-color: var(--primary); color: var(--primary) !important;
      background: var(--surface-hover); transform: translateY(-1px);
    }
    .stat-pill-card {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }
    .stat-num {
      font-size: 1.15rem;
    }

    /* NOW SECTION */
    .now-focus-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }
    .now-dot {
      width: 9px; height: 9px; border-radius: 50%;
      background: #D97706; box-shadow: 0 0 10px rgba(217, 119, 6, 0.7);
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    .now-title {
      font-size: 1.25rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .now-item-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }

    /* PILLARS */
    .lobes-heading {
      font-size: 1.7rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .pillar-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
    }
    .pillar-card:hover {
      border-color: var(--primary);
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }
    .pillar-number {
      font-size: 1.05rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); padding: 4px 12px; border-radius: var(--radius-sm);
      border: 1px solid rgba(180, 83, 9, 0.2);
    }
    .pillar-tag {
      font-size: 0.75rem; color: var(--text-muted);
      background: var(--surface-elevated); padding: 4px 10px; border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }
    .pillar-icon-box {
      width: 44px; height: 44px; border-radius: 10px;
      background: var(--primary-subtle); color: var(--primary);
      display: grid; place-items: center; font-size: 1.3rem;
      border: 1px solid rgba(180, 83, 9, 0.2);
    }
    .pillar-title {
      font-size: 1.3rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .pillar-desc {
      line-height: 1.75;
      font-size: 0.95rem;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .btn-pillar-action {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary) !important;
      font-weight: 600; padding: 10px 16px; border-radius: var(--radius-sm);
      text-decoration: none !important; display: flex; align-items: center; justify-content: space-between;
      transition: all 0.15s ease;
    }
    .btn-pillar-action:hover {
      background: var(--primary); border-color: var(--primary);
      color: #FFFFFF !important;
    }

    /* SPARKS */
    .sparks-section {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }
    .sparks-heading {
      font-size: 1.35rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .spark-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      display: flex; flex-direction: column; justify-content: space-between;
    }

    .text-pine { color: var(--primary) !important; }
    .text-mint { color: var(--accent-mint) !important; }

    @media (max-width: 767.98px) {
      .hero-title { font-size: 1.75rem; }
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor(public transService: TranslationService) {}

  ngOnInit() {}

  get currentLang(): string {
    return this.transService.currentLang;
  }
}
