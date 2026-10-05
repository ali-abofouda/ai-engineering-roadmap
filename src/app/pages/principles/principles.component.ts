import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface PrincipleItem {
  id: string;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  category: string;
  coreRuleEn: string;
  coreRuleAr: string;
  elaborationEn: string;
  elaborationAr: string;
  actionableHabitEn: string;
  actionableHabitAr: string;
  favoriteQuote?: string;
  quoteAuthor?: string;
}

@Component({
  selector: 'app-principles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <div class="principles-page py-4">
      <div class="container-xl">

        <!-- HERO HEADER -->
        <header class="principles-hero mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <div class="d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill hero-kicker mb-2">
                <span class="live-dot"></span>
                <span class="kicker-label font-monospace">{{ currentLang === 'ar' ? 'سجل الأفكار والمبادئ' : 'Thoughts & Principles' }}</span>
                <span class="kicker-sep">·</span>
                <span class="kicker-sub">{{ principles.length }} {{ currentLang === 'ar' ? 'قواعد تشغيل شخصية' : 'Operating Principles' }}</span>
              </div>
              <h1 class="hero-title fw-bold mb-2">
                {{ currentLang === 'ar' ? 'قواعد التشغيل ومبادئ اتخاذ القرار' : 'Operating Rules & Life Principles' }}
              </h1>
              <p class="hero-desc mb-0">
                {{ currentLang === 'ar' 
                  ? 'المعايير والنماذج الذهنية التي أسترشد بها في إدارة طاقتي، اتخاذ القرارات المصيرية، والتعامل مع الإحباط والنجاح والشكوك اليومية.'
                  : 'The mental operating system and hard-won heuristics that guide my decisions, preserve cognitive focus, and govern personal discipline.' }}
              </p>
            </div>

            <!-- Stats Badge -->
            <div class="stats-badge-card p-3">
              <div class="d-flex align-items-center gap-3">
                <div class="icon-crest font-monospace"><i class="fa-solid fa-compass text-mint"></i></div>
                <div>
                  <div class="small text-secondary">{{ currentLang === 'ar' ? 'دستور التفكير' : 'Thinking Compass' }}</div>
                  <div class="fw-bold font-monospace text-pine">{{ categories.length - 1 }} {{ currentLang === 'ar' ? 'محاور عقلية' : 'Pillars' }}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- TOOLBAR -->
        <div class="principles-toolbar p-3 mb-4">
          <div class="category-pills-row d-flex align-items-center gap-1">
            <button 
              *ngFor="let cat of categories" 
              class="category-pill"
              [class.active]="selectedCategory === cat.key"
              (click)="selectedCategory = cat.key; applyFilters()"
            >
              {{ currentLang === 'ar' ? cat.labelAr : cat.labelEn }}
            </button>
          </div>
        </div>

        <!-- PRINCIPLES ACCORDION / GRID -->
        <div class="row g-3 mb-5">
          <div *ngFor="let p of filteredPrinciples" class="col-lg-6 col-12">
            <div class="principle-card h-100 p-3 p-md-4 d-flex flex-column">
              <!-- Top Row -->
              <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="num-badge font-monospace">{{ p.numberStr }}</span>
                  <span class="cat-pill">{{ p.category }}</span>
                </div>
              </div>

              <!-- Title & Core Rule -->
              <h4 class="principle-title fw-bold mb-2">
                {{ currentLang === 'ar' ? p.titleAr : p.titleEn }}
              </h4>
              <p class="principle-rule fw-semibold text-pine mb-3">
                "{{ currentLang === 'ar' ? p.coreRuleAr : p.coreRuleEn }}"
              </p>

              <!-- Elaboration -->
              <p class="principle-elaboration text-secondary small mb-3 flex-grow-1">
                {{ currentLang === 'ar' ? p.elaborationAr : p.elaborationEn }}
              </p>

              <!-- Actionable Habit -->
              <div class="habit-box p-3 rounded-2 mb-3">
                <div class="small fw-semibold text-pine mb-1">
                  <i class="fa-solid fa-bolt me-1 text-mint"></i>
                  {{ currentLang === 'ar' ? 'التطبيق العملي في الواقع:' : 'Actionable Heuristic:' }}
                </div>
                <div class="small text-secondary">
                  {{ currentLang === 'ar' ? p.actionableHabitAr : p.actionableHabitEn }}
                </div>
              </div>

              <!-- Quote if available -->
              <div *ngIf="p.favoriteQuote" class="quote-strip p-2 rounded-2 fst-italic small text-muted border-top pt-2">
                "{{ p.favoriteQuote }}" — <span class="fw-semibold">{{ p.quoteAuthor }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .principles-page { position: relative; }
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
    .stats-badge-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md); min-width: 220px; box-shadow: var(--shadow-sm);
    }
    .icon-crest {
      width: 40px; height: 40px; border-radius: var(--radius-sm);
      background: var(--primary-subtle); display: grid; place-items: center;
      font-size: 1.1rem;
    }

    .principles-toolbar {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
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

    /* PRINCIPLE CARD */
    .principle-card {
      background: var(--surface-card); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); transition: all 0.2s ease; box-shadow: var(--shadow-sm);
    }
    .principle-card:hover {
      border-color: var(--border-hover); box-shadow: var(--shadow-md); transform: translateY(-2px);
    }
    .num-badge {
      font-size: 0.72rem; font-weight: 800; color: var(--primary);
      background: var(--primary-subtle); border: 1px solid rgba(21, 82, 57, 0.2);
      padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .cat-pill {
      font-size: 0.68rem; background: var(--surface-elevated); color: var(--text-secondary);
      border: 1px solid var(--border-subtle); padding: 2px 7px; border-radius: var(--radius-sm);
    }
    .principle-title {
      font-size: 1.2rem; color: var(--text-primary);
      font-family: var(--font-arabic-heading), 'Cairo', sans-serif;
    }
    .principle-rule {
      font-size: 0.95rem; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .text-pine { color: var(--primary) !important; }
    .text-mint { color: var(--accent-mint) !important; }
    .principle-elaboration {
      line-height: 1.65; font-family: var(--font-arabic-body), 'Alexandria', sans-serif;
    }
    .habit-box {
      background: var(--surface-elevated); border: 1px solid var(--border-subtle);
    }
    .quote-strip {
      background: var(--surface-elevated);
    }
  `]
})
export class PrinciplesComponent implements OnInit {
  selectedCategory = 'All';

  categories = [
    { key: 'All', labelEn: 'All Principles', labelAr: 'كافة المبادئ' },
    { key: 'Focus', labelEn: 'Focus & Energy', labelAr: 'التركيز وإدارة الطاقة' },
    { key: 'Thinking', labelEn: 'Mental Models', labelAr: 'النماذج الذهنية' },
    { key: 'Stoicism', labelEn: 'Stoicism & Calm', labelAr: 'الرواقية والسكينة' },
    { key: 'Execution', labelEn: 'Execution & Systems', labelAr: 'التنفيذ والأنظمة' }
  ];

  principles: PrincipleItem[] = [
    {
      id: 'pr-01',
      numberStr: '01',
      titleEn: 'Systems Over Goals',
      titleAr: 'الأنظمة تهزم الأهداف دائماً',
      category: 'Execution',
      coreRuleEn: 'You do not rise to the level of your goals; you fall to the level of your daily systems.',
      coreRuleAr: 'أنت لا ترتقي لمستوى أهدافك وطموحاتك، بل تهبط لمستوى أنظمتك وعاداتك اليومية الصغيرة.',
      elaborationEn: 'Goals are good for setting a direction, but systems are best for making progress. Focusing solely on the outcome leads to perpetual dissatisfaction and inconsistency.',
      elaborationAr: 'الأهداف مفيدة فقط لتحديد البوصلة والاتجاه، لكن الأنظمة والعادات اليومية هي ما يصنع التقدم الحقيقي. التركيز المفرط على النتيجة النهائية يسبب التشتت والإحباط.',
      actionableHabitEn: 'Instead of obsessing over finishing a project, protect an unnegotiable 90-minute morning focus block every single day.',
      actionableHabitAr: 'بدلاً من الهوس بميعاد إنهاء مشروع ضخم، احمِ 90 دقيقة صباحية مقدسة يومياً من العمل العميق غير المنقطع.',
      favoriteQuote: 'Goals are about the results you want to achieve. Systems are about the processes that lead to those results.',
      quoteAuthor: 'James Clear'
    },
    {
      id: 'pr-02',
      numberStr: '02',
      titleEn: 'Dichotomy of Control',
      titleAr: 'ثنائية السيطرة (ما تملكه وما لا تملكه)',
      category: 'Stoicism',
      coreRuleEn: 'Distinguish ruthlessly between what is in your control and what is not.',
      coreRuleAr: 'افصل بصرامة بالغة بين ما تملك السيطرة عليه وما يقع خارج نطاق قدرتك.',
      elaborationEn: 'You have zero control over market conditions, other people opinions, or unexpected bugs; you have 100% control over your preparation, integrity, effort, and emotional reaction.',
      elaborationAr: 'أنت لا تملك أي سيطرة على آراء الآخرين، تقلبات الظروف، أو المشكلات المفاجئة؛ لكنك تملك السيطرة الكاملة على استعدادك، جهدك، وردة فعلك العقلانية.',
      actionableHabitEn: 'Whenever anxiety spikes, write down two columns: "Things I can act on right now" vs "Things out of my control". Discard the second column immediately.',
      actionableHabitAr: 'عندما تشعر بالتوتر أو القلق، قسّم الورقة إلى عمودين: "ما يمكنني التصرف حياله الآن" و "ما هو خارج سيطرتي"، وتجاهل العمود الثاني تماماً.',
      favoriteQuote: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
      quoteAuthor: 'Marcus Aurelius'
    },
    {
      id: 'pr-03',
      numberStr: '03',
      titleEn: 'Inversion Principle',
      titleAr: 'مبدأ القلب والعكس (Inversion)',
      category: 'Thinking',
      coreRuleEn: 'Avoid foolishness consistently rather than trying to be brilliant.',
      coreRuleAr: 'تجنب الحماقات والأخطاء الكارثية باستمرار، أفضل بكثير من محاولة إثبات العبقرية الاستثنائية.',
      elaborationEn: 'It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent.',
      elaborationAr: 'النجاح المستدام نادراً ما يكون نتاج ضربات حظ عبقرية، بل يأتي من تجنب الأخطاء الساذجة المتكررة التي تدمر الجهد (مثل الديون غير الضرورية، الغرور، والتشتت).',
      actionableHabitEn: 'Before starting any major venture, ask: "How could this fail terribly?" and write explicit safeguards to prevent each failure mode.',
      actionableHabitAr: 'قبل إطلاق أي مشروع، اسأل نفسك: "كيف يمكن لهذا الأمر أن يفشل بشكل كارثي؟" وضع خطة صريحة لمنع حدوث كل سيناريو فشل.',
      favoriteQuote: 'Invert, always invert: Turn a situation upside down. What happens if all our assumptions are wrong?',
      quoteAuthor: 'Charlie Munger'
    },
    {
      id: 'pr-04',
      numberStr: '04',
      titleEn: 'Deep Work & Shallow Detox',
      titleAr: 'العمل العميق والتخلص من وهم التواجد الدائم',
      category: 'Focus',
      coreRuleEn: 'High-quality work produced = (Time spent) x (Intensity of focus).',
      coreRuleAr: 'حجم وجودة الإنجاز الحقيقي = (الوقت المستغرق) × (كثافة وعمق التركيز الذهني).',
      elaborationEn: 'Multitasking is a neurological myth. Every context switch incurs a heavy cognitive switching penalty (attention residue). Half-distracted work yields mediocre results.',
      elaborationAr: 'تعدد المهام في وقت واحد خرافة عصبية؛ كل تشتت بالهاتف أو الإشعارات يترك رواسب انتباه تعطل الإبداع الحقيقي والحلول المعقدة.',
      actionableHabitEn: 'Never start work with communication tools open. Keep your phone in another room during high-cognitive sessions.',
      actionableHabitAr: 'لا تفتح بريدك أو تطبيقات التواصل في بداية يومك؛ اترك هاتفك في غرفة أخرى أثناء جلسات التفكير والبرمجة الصعبة.',
      favoriteQuote: 'If you don’t produce, you won’t thrive—no matter how skilled or talented you are.',
      quoteAuthor: 'Cal Newport'
    },
    {
      id: 'pr-05',
      numberStr: '05',
      titleEn: 'Asymmetric Upside (Antifragility)',
      titleAr: 'المخاطرة غير المتماثلة (مكاسب هائلة وخسائر محدودة)',
      category: 'Execution',
      coreRuleEn: 'Position yourself where the downside is strictly capped, but the upside is exponentially unlimited.',
      coreRuleAr: 'ضع نفسك دائماً في مواقف تكون فيها أقصى خسارة ممكنة صغيرة ومحدودة، بينما أفق المكسب غير محدود.',
      elaborationEn: 'Writing code, releasing open-source libraries, reading books, and learning English all have near-zero downside (a few hours of time) and infinite potential upside.',
      elaborationAr: 'تعلم مهارة جديدة، كتابة مقال، بناء مشروع مفتوح المصدر، أو القراءة تكلفك بضع ساعات فقط، لكنها قد تفتح لك أبواباً وفرصاً تغير مجرى حياتك بالكامل.',
      actionableHabitEn: 'Invest 20% of your free time in permissionless leverage (creating digital assets that work for you while you sleep).',
      actionableHabitAr: 'استثمر 20% من وقت فراغك في بناء أصول رقمية أو مهارات دائمة (كود، محتوى، معرفة عميقة) تعمل لصالحك على المدى البعيد.',
      favoriteQuote: 'Curiosity is an engine of asymmetric upside. Follow what interests you deeply.',
      quoteAuthor: 'Naval Ravikant'
    },
    {
      id: 'pr-06',
      numberStr: '06',
      titleEn: 'Radical Self-Accountability',
      titleAr: 'المسؤولية الذاتية الكاملة وتجاوز دور الضحية',
      category: 'Stoicism',
      coreRuleEn: 'It might not be your fault, but it is 100% your responsibility to deal with it.',
      coreRuleAr: 'قد لا يكون الظرف السيئ خطأك، لكن التعامل معه وتجاوزه هو مسؤوليتك بنسبة 100%.',
      elaborationEn: 'Blaming luck, society, colleagues, or background provides temporary psychological comfort but completely strips you of personal agency and power to change.',
      elaborationAr: 'إلقاء اللوم على الظروف أو الحظ يمنح عقلك راحة وهمية مؤقتة، لكنه يسلبك تماماً زمام المبادرة والقدرة على التغيير وصناعة واقعك.',
      actionableHabitEn: 'Whenever a setback occurs, eliminate the word "Why is this happening to me?" and replace it with "What is the best next move?"',
      actionableHabitAr: 'عند وقوع أي انتكاسة، استبدل فوراً سؤال "لماذا يحدث هذا لي؟" بسؤال عملي وحاسم: "ما هي أفضل خطوة قادمة الآن؟"',
      favoriteQuote: 'You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.',
      quoteAuthor: 'David Goggins'
    }
  ];

  filteredPrinciples: PrincipleItem[] = [];

  constructor(public transService: TranslationService) {}

  ngOnInit() {
    this.filteredPrinciples = [...this.principles];
  }

  get currentLang(): string {
    return this.transService.currentLang;
  }

  applyFilters() {
    if (this.selectedCategory === 'All') {
      this.filteredPrinciples = [...this.principles];
    } else {
      this.filteredPrinciples = this.principles.filter(p => p.category === this.selectedCategory);
    }
  }
}
