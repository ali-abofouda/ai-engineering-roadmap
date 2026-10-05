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
                ? 'مساحة رقمية هادئة ومفتوحة لتوثيق مسارات المعرفة والتفكير: الخريطة الذهنية لهندسة الذكاء الاصطناعي، روائع السينما العالمية، وأقسام مخصصة للكتب واللغات والمبادئ.'
                : 'A calm, curated digital second brain: synthesizing the interactive AI engineering mind map, transformative cinema masterpieces, with dedicated empty slates for reading, languages, and core principles.' }}
            </p>

            <div class="d-flex flex-wrap gap-2 gap-sm-3 mb-4">
              <a routerLink="/tech" class="btn btn-primary-clean">
                <i class="fa-solid fa-brain me-1"></i>
                <span>{{ currentLang === 'ar' ? 'الخريطة الذهنية' : 'The Mind Map' }}</span>
                <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
              </a>
              <a routerLink="/cinema" class="btn btn-secondary-clean">
                <i class="fa-solid fa-film text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'السينما المختارة' : 'Curated Cinema' }}</span>
              </a>
              <a routerLink="/library" class="btn btn-secondary-clean">
                <i class="fa-solid fa-book-open text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'المكتبة' : 'Library' }}</span>
              </a>
              <a routerLink="/languages" class="btn btn-secondary-clean">
                <i class="fa-solid fa-language text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'اللغات' : 'Languages' }}</span>
              </a>
              <a routerLink="/principles" class="btn btn-secondary-clean">
                <i class="fa-solid fa-compass text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'المبادئ' : 'Principles' }}</span>
              </a>
            </div>

            <!-- Live Mind Stats Row -->
            <div class="row g-2 g-md-3 pt-3 border-top">
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'الخريطة الذهنية' : 'Mind Map' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">26 {{ currentLang === 'ar' ? 'عقدة نشطة' : 'Nodes' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'أفلام سينمائية' : 'Curated Cinema' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">6 {{ currentLang === 'ar' ? 'أفلام أيقونية' : 'Iconic Films' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'أقسام مخصصة' : 'Custom Lobes' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">3 {{ currentLang === 'ar' ? 'مساحات جاهزة' : 'Ready Slates' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'حالة النظام' : 'System Status' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">100% {{ currentLang === 'ar' ? 'هادئ وبسيط' : 'Calm & Clean' }}</div>
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
        <!-- 3. ALL MIND LOBES: CORE PORTALS                               -->
        <!-- ============================================================= -->
        <section class="lobes-section mb-5">
          <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <span class="small font-monospace text-pine fw-bold text-uppercase">
                {{ currentLang === 'ar' ? 'فصوص وأقسام عقلي' : 'The Mind Spaces & Lobes' }}
              </span>
              <h2 class="fw-bold mb-0 lobes-heading">
                {{ currentLang === 'ar' ? 'استكشف مساحات التفكير والمعرفة' : 'Explore The Cognitive Vaults' }}
              </h2>
            </div>
          </div>

          <div class="row g-3 g-md-4">
            <!-- 01: The Mind Map -->
            <div class="col-lg-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">01</span>
                    <span class="badge-active-status font-monospace">26 {{ currentLang === 'ar' ? 'عقدة ومحطة متصلة' : 'Connected Nodes' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    <i class="fa-solid fa-diagram-project text-pine me-2"></i>
                    {{ currentLang === 'ar' ? 'الخريطة الذهنية (مسار المعرفة)' : 'The Mind Map (Learning Path)' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'خارطة ذهنية بصرية مترابطة توثق رحلة بناء المعرفة التقنية: من بايثون والرياضيات والشبكات العصبية، إلى الـ RAG المتقدم والوكلاء الأذكياء بـ LangGraph، ونشر النظم السحابية.'
                      : 'An interactive, visual connected node map documenting the entire cognitive learning path: from Python foundations to deep learning, transformers, production RAG, and autonomous agent orchestration.' }}
                  </p>
                </div>
                <a routerLink="/tech" class="btn btn-sm btn-lobe-action w-100">
                  <span class="fw-bold">{{ currentLang === 'ar' ? 'فتح الخريطة الذهنية' : 'Open Mind Map' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 02: Curated Cinema -->
            <div class="col-lg-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">02</span>
                    <span class="badge-active-status font-monospace">6 {{ currentLang === 'ar' ? 'أفلام أيقونية مختارة' : 'Curated Films' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    <i class="fa-solid fa-film text-pine me-2"></i>
                    {{ currentLang === 'ar' ? 'روائع السينما والأفلام المختارة' : 'Curated Cinema Masterpieces' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مجموعة مصفاة بعناية شديدة من 6 أعمال سينمائية استثنائية: بين الخيال العلمي الفلسفي الذي يتحدى الإدراك (Interstellar, Inception, The Matrix)، والدراما الإنسانية الكبرى وقوة الإرادة (Shawshank, Whiplash, Fight Club).'
                      : 'A strictly curated selection of 6 transformative films: philosophical mind-benders challenging reality (Interstellar, Inception, The Matrix), and raw human resilience masterclasses (Shawshank, Whiplash, Fight Club).' }}
                  </p>
                </div>
                <a routerLink="/cinema" class="btn btn-sm btn-lobe-action w-100">
                  <span class="fw-bold">{{ currentLang === 'ar' ? 'تصفح الأفلام المختارة' : 'Explore Cinema' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 03: Library (Empty Slate) -->
            <div class="col-lg-4 col-md-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">03</span>
                    <span class="badge-empty-status font-monospace">{{ currentLang === 'ar' ? 'قسم مخصص · فارغ' : 'Ready Slate' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    <i class="fa-solid fa-book-open text-pine me-2"></i>
                    {{ currentLang === 'ar' ? 'فص الكتب والمكتبة' : 'Library & Reading Lobe' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مساحة مخصصة لتوثيق الكتب وقراءاتك الخاصة وملخصات الأفكار التي تشكل عقلك، جاهزة للإضافة.'
                      : 'A dedicated reading canon space reserved for your personal book discoveries, insights, and summaries.' }}
                  </p>
                </div>
                <a routerLink="/library" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول فص المكتبة' : 'Open Library' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 04: Languages (Empty Slate) -->
            <div class="col-lg-4 col-md-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">04</span>
                    <span class="badge-empty-status font-monospace">{{ currentLang === 'ar' ? 'قسم مخصص · فارغ' : 'Ready Slate' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    <i class="fa-solid fa-language text-pine me-2"></i>
                    {{ currentLang === 'ar' ? 'فص اللغات والتواصل' : 'Languages & Communication' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مساحة مخصصة لتوثيق رحلة إتقان اللغات، محطات الطلاقة، والملاحظات الصوتية والتعبيرية.'
                      : 'A dedicated space for language milestones, speech drills, and personal fluency goals.' }}
                  </p>
                </div>
                <a routerLink="/languages" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول فص اللغات' : 'Open Languages' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 05: Principles (Empty Slate) -->
            <div class="col-lg-4 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">05</span>
                    <span class="badge-empty-status font-monospace">{{ currentLang === 'ar' ? 'قسم مخصص · فارغ' : 'Ready Slate' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    <i class="fa-solid fa-compass text-pine me-2"></i>
                    {{ currentLang === 'ar' ? 'سجل الأفكار والمبادئ' : 'Operating Rules & Principles' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مساحة مخصصة لقواعد التشغيل الشخصية، النماذج الذهنية، ودستورك في اتخاذ القرار.'
                      : 'A personal operating handbook for decision making heuristics and mental frameworks.' }}
                  </p>
                </div>
                <a routerLink="/principles" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول فص المبادئ' : 'Open Principles' }}</span>
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

    /* LOBES */
    .lobes-heading {
      font-size: 1.7rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .lobe-card {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
    }
    .lobe-card:hover {
      border-color: var(--primary);
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }
    .lobe-number {
      font-size: 1.05rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); padding: 4px 12px; border-radius: var(--radius-sm);
      border: 1px solid rgba(180, 83, 9, 0.2);
    }
    .badge-active-status {
      font-size: 0.75rem; color: var(--primary); font-weight: 600;
      background: var(--primary-subtle); padding: 4px 10px; border-radius: var(--radius-sm);
      border: 1px solid rgba(180, 83, 9, 0.2);
    }
    .badge-empty-status {
      font-size: 0.75rem; color: var(--text-muted);
      background: var(--surface-elevated); padding: 4px 10px; border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }
    .lobe-title {
      font-size: 1.25rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .lobe-desc {
      line-height: 1.75;
      font-size: 0.92rem;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .btn-lobe-action {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary) !important;
      font-weight: 600; padding: 9px 14px; border-radius: var(--radius-sm);
      text-decoration: none !important; display: flex; align-items: center; justify-content: space-between;
      transition: all 0.15s ease;
    }
    .btn-lobe-action:hover {
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
