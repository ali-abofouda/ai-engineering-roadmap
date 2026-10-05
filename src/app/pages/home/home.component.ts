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
                ? 'مساحتي الرقمية المفتوحة لتوثيق كل ما يدور في ذهني: هندسة الذكاء الاصطناعي، روائع السينما العالمية، خلاصة الكتب التي غيرت تفكيري، رحلتي مع اللغة الإنجليزية، وقواعدي في اتخاذ القرار.'
                : 'A curated personal operating system and second brain: synthesizing AI engineering, transformative cinema, books that rewired my thinking, English fluency milestones, and operating life principles.' }}
            </p>

            <div class="d-flex flex-wrap gap-2 gap-sm-3 mb-4">
              <a routerLink="/tech" class="btn btn-primary-clean">
                <span>{{ currentLang === 'ar' ? 'الفص التقني (AI & Code)' : 'Tech & AI Vault' }}</span>
                <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
              </a>
              <a routerLink="/cinema" class="btn btn-secondary-clean">
                <i class="fa-solid fa-film text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'السينما والذوق' : 'Cinema Lobe' }}</span>
              </a>
              <a routerLink="/library" class="btn btn-secondary-clean">
                <i class="fa-solid fa-book-open text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'المكتبة والكتب' : 'Library' }}</span>
              </a>
              <a routerLink="/principles" class="btn btn-secondary-clean">
                <i class="fa-solid fa-compass text-pine me-1"></i>
                <span>{{ currentLang === 'ar' ? 'قواعد التفكير' : 'Principles' }}</span>
              </a>
            </div>

            <!-- Live Mind Stats Row -->
            <div class="row g-2 g-md-3 pt-3 border-top">
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'محطات التقنية' : 'Tech Stages' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">26 {{ currentLang === 'ar' ? 'محطة' : 'Nodes' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'روائع السينما' : 'Cinema Works' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">24 {{ currentLang === 'ar' ? 'فيلماً' : 'Films' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'أعظم الكتب' : 'Core Books' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">16 {{ currentLang === 'ar' ? 'كتاباً' : 'Books' }}</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="stat-pill-card p-3 rounded-3">
                  <div class="text-secondary small font-monospace mb-1">{{ currentLang === 'ar' ? 'إتقان الإنجليزية' : 'English Fluency' }}</div>
                  <div class="fw-bold font-monospace stat-num text-pine">16 {{ currentLang === 'ar' ? 'محطة' : 'Milestones' }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- 2. NOW SECTION: WHAT'S ON MY MIND RIGHT NOW                  -->
        <!-- ============================================================= -->
        <section class="now-focus-card p-4 p-md-4 mb-5 rounded-4">
          <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="now-dot"></span>
              <h3 class="fw-bold mb-0 now-title">
                {{ currentLang === 'ar' ? 'ما أركز عليه في هذه الفترة (/now)' : 'Current Mind Focus (/now)' }}
              </h3>
            </div>
            <span class="small text-muted font-monospace">
              {{ currentLang === 'ar' ? 'محدّث تلقائياً' : 'Live Focus' }}
            </span>
          </div>

          <div class="row g-3">
            <div class="col-md-3 col-sm-6">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-pine mb-1">
                  <i class="fa-solid fa-code me-1"></i>{{ currentLang === 'ar' ? 'المشروع البرمجي:' : 'Active Project:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">LangGraph Multi-Agent Architecture</div>
                <div class="text-muted small">بناء وتنسيق وكلاء أذكياء يتخذون قرارات متسلسلة ويحفظون الحالة.</div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-mint mb-1">
                  <i class="fa-solid fa-book me-1"></i>{{ currentLang === 'ar' ? 'الكتاب الحالي:' : 'Current Book:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">Antifragile — Nassim Taleb</div>
                <div class="text-muted small">كيف نستفيد من الصدمات والفوضى لنصبح أقوى وأقل عرضة للهشاشة.</div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-warning mb-1">
                  <i class="fa-solid fa-film me-1"></i>{{ currentLang === 'ar' ? 'آخر فيلم ألهمني:' : 'Recent Film:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">Interstellar (2014)</div>
                <div class="text-muted small">تأملات في الفيزياء الفلكية والنسبية وقوة المشاعر الإنسانية عبر الأبعاد.</div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6">
              <div class="now-item-box p-3 h-100 rounded-3">
                <div class="now-item-label small font-monospace text-pine mb-1">
                  <i class="fa-solid fa-microphone me-1"></i>{{ currentLang === 'ar' ? 'تحدي الإنجليزية:' : 'English Challenge:' }}
                </div>
                <div class="small fw-semibold text-primary mb-1">Thinking in English Daily</div>
                <div class="text-muted small">إلغاء الترجمة الذهنية الداخلية تماماً والتحدث التلقائي المباشر.</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- 3. THE 5 BRAIN LOBES: CORE PORTALS                            -->
        <!-- ============================================================= -->
        <section class="lobes-section mb-5">
          <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <span class="small font-monospace text-pine fw-bold text-uppercase">
                {{ currentLang === 'ar' ? 'فصوص ومحاور العقل' : 'The 5 Brain Lobes' }}
              </span>
              <h2 class="fw-bold mb-0 lobes-heading">
                {{ currentLang === 'ar' ? 'استكشف مساحات التفكير والمعرفة' : 'Explore The Cognitive Vaults' }}
              </h2>
            </div>
          </div>

          <div class="row g-3 g-md-4">
            <!-- 01: Tech & AI Lobe -->
            <div class="col-lg-4 col-md-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">01</span>
                    <span class="lobe-tag font-monospace">26 {{ currentLang === 'ar' ? 'محطة' : 'Stages' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'الفص التقني (هندسة الذكاء الاصطناعي)' : 'Tech & AI Engineering' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مسار متكامل من بايثون والرياضيات والشبكات العصبية، إلى الـ RAG المتقدم والوكلاء الأذكياء بـ LangGraph، ونشر النماذج السحابية بـ Terraform.'
                      : 'From Python tensor mechanics to production RAG, LangGraph multi-agent teams, multi-cloud Terraform, and enterprise observability.' }}
                  </p>
                </div>
                <a routerLink="/tech" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول الفص التقني' : 'Explore Tech Vault' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 02: Cinema & Taste Lobe -->
            <div class="col-lg-4 col-md-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">02</span>
                    <span class="lobe-tag font-monospace">24 {{ currentLang === 'ar' ? 'فيلماً' : 'Films' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'الفص السينمائي (روائع الفن السابع)' : 'Cinema & Film Masterpieces' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مكتبة مختارة لأعظم الأعمال السينمائية العالمية في الخيال العلمي، الدراما الإنسانية الكبرى، الإثارة النفسية، والسير الذاتية المؤثرة مع مبرر المشاهدة.'
                      : 'A curated journey through 24 life-altering cinema masterpieces across Sci-Fi, psychological thriller, inspirational drama, and biopics.' }}
                  </p>
                </div>
                <a routerLink="/cinema" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول الفص السينمائي' : 'Explore Cinema' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 03: Library & Books Lobe -->
            <div class="col-lg-4 col-md-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">03</span>
                    <span class="lobe-tag font-monospace">16 {{ currentLang === 'ar' ? 'كتاباً' : 'Books' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'فص الكتب والمكتبة (خلاصة القراءات)' : 'Library & Reading Vault' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'أهم الكتب التي غيرت طريقة تفكيري في بناء العادات (Atomic Habits)، التركيز العميق (Deep Work)، سيكولوجية المال، والحكمة الرواقية لماركوس أوريليوس.'
                      : 'Core reading canon on habit loops, deep cognitive work, mental models, wealth psychology, and stoic philosophy with key takeaways.' }}
                  </p>
                </div>
                <a routerLink="/library" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول المكتبة' : 'Explore Library' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 04: Languages Lobe -->
            <div class="col-lg-6 col-md-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">04</span>
                    <span class="lobe-tag font-monospace">16 {{ currentLang === 'ar' ? 'محطة' : 'Milestones' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'فص اللغات والتواصل (إتقان الإنجليزية)' : 'Languages & Communication' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'مسار عملي للطلاقة الحقيقية: تدريب الأذن وصوت الشوا السحري، التفكير بالإنجليزية، التظليل الصوتي (Shadowing)، وفهم المتحدثين الأصليين.'
                      : 'Pragmatic spoken fluency roadmap: ear training, Schwa sound, sentence pattern instinct, daily shadowing, and connected speech decoding.' }}
                  </p>
                </div>
                <a routerLink="/languages" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول فص اللغات' : 'Explore Languages' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>

            <!-- 05: Principles Lobe -->
            <div class="col-lg-6 col-12">
              <div class="lobe-card h-100 p-4 d-flex flex-column justify-content-between rounded-4">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="lobe-number font-monospace">05</span>
                    <span class="lobe-tag font-monospace">6 {{ currentLang === 'ar' ? 'مبادئ أساسية' : 'Heuristics' }}</span>
                  </div>
                  <h4 class="lobe-title fw-bold mb-2">
                    {{ currentLang === 'ar' ? 'سجل الأفكار والمبادئ (قواعد التشغيل)' : 'Operating Rules & Principles' }}
                  </h4>
                  <p class="lobe-desc text-secondary small mb-4">
                    {{ currentLang === 'ar'
                      ? 'دستوري الشخصي في اتخاذ القرار وإدارة الطاقة: ثنائية السيطرة، الأنظمة تهزم الأهداف، مبدأ القلب والعكس لتشارلي مانجر، والمخاطرة غير المتماثلة.'
                      : 'Mental software and rules for decision making: dichotomy of control, systems over goals, Charlie Munger inversion, and asymmetric upside.' }}
                  </p>
                </div>
                <a routerLink="/principles" class="btn btn-sm btn-lobe-action w-100">
                  <span>{{ currentLang === 'ar' ? 'دخول المبادئ' : 'Explore Principles' }}</span>
                  <i class="fa-solid" [class.fa-arrow-left]="currentLang === 'ar'" [class.fa-arrow-right]="currentLang !== 'ar'"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- 4. MIND SPARKS: QUOTES THAT SHAPED MY MIND                    -->
        <!-- ============================================================= -->
        <section class="sparks-section p-4 p-md-5 rounded-4 mb-4">
          <div class="text-center max-w-600 mx-auto mb-4">
            <span class="small font-monospace text-pine fw-bold text-uppercase">
              {{ currentLang === 'ar' ? 'شذرات فكرية' : 'Mind Sparks' }}
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
                  "النجاح المستدام يأتي من تجنب الحماقات المتكررة باستمرار، بدلاً من محاولة إثبات العبقرية الاستثنائية."
                </p>
                <div class="small fw-bold text-pine font-monospace">— تشارلي مانجر (Poor Charlie's Almanack)</div>
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
      background-image: radial-gradient(rgba(21, 82, 57, 0.08) 1px, transparent 1px);
      background-size: 24px 24px; pointer-events: none; opacity: 0.7;
    }
    .hero-badge {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
    }
    .pulse-point {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-mint); box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
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
      font-size: 1.02rem; max-width: 780px;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .btn-primary-clean {
      background: var(--primary); border: 1px solid var(--primary);
      color: #FFFFFF !important; font-size: 0.85rem; font-weight: 600;
      padding: 8px 18px; border-radius: var(--radius-sm);
      text-decoration: none !important; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.15s ease;
    }
    .btn-primary-clean:hover {
      background: var(--primary-hover); transform: translateY(-1px);
    }
    .btn-secondary-clean {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
      color: var(--text-primary) !important; font-size: 0.85rem; font-weight: 600;
      padding: 8px 16px; border-radius: var(--radius-sm);
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
      background: #10B981; box-shadow: 0 0 10px rgba(16, 185, 129, 0.7);
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
      font-size: 1rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); padding: 3px 10px; border-radius: var(--radius-sm);
      border: 1px solid rgba(21, 82, 57, 0.15);
    }
    .lobe-tag {
      font-size: 0.72rem; color: var(--text-muted);
      background: var(--surface-elevated); padding: 3px 8px; border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }
    .lobe-title {
      font-size: 1.15rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .lobe-desc {
      line-height: 1.65;
      font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .btn-lobe-action {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary) !important;
      font-weight: 600; padding: 7px 12px; border-radius: var(--radius-sm);
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
