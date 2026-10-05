export interface BookStage {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  year: number;
  category: string;
  pages: number;
  tagline: string;
  taglineAr: string;
  coreIdea: string;
  coreIdeaAr: string;
  keyTakeaway: string;
  keyTakeawayAr: string;
  keyThemes: string[];
}

export interface BookPhase {
  id: number;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationWeeks: string;
  stageIds: string[];
}

export const BOOKS_PHASES: BookPhase[] = [
  {
    id: 1,
    numberStr: '01',
    titleEn: 'Habits, Focus & Deep Productivity',
    titleAr: 'بناء العادات، التركيز الفائق، والإنتاجية العميقة',
    descEn: 'Master the biological and psychological mechanics of habit loops, deep work, and discipline.',
    descAr: 'فهم ميكانيكا العادات في الدماغ، والعمل العميق، والانضباط الذاتي بعيداً عن وهم التحفيز المؤقت.',
    durationWeeks: '4 Books',
    stageIds: ['b01', 'b02', 'b03', 'b04']
  },
  {
    id: 2,
    numberStr: '02',
    titleEn: 'Decision Making & Cognitive Models',
    titleAr: 'صناعة القرار والنماذج الذهنية والتفكير',
    descEn: 'Rewire your mental software to dismantle cognitive biases and think in second-order consequences.',
    descAr: 'ترقية نظام التفكير في عقلك وتفكيك الانحيازات المعرفية واتخاذ قرارات مصيرية سليمة.',
    durationWeeks: '4 Books',
    stageIds: ['b05', 'b06', 'b07', 'b08']
  },
  {
    id: 3,
    numberStr: '03',
    titleEn: 'Wealth, Psychology of Money & Strategy',
    titleAr: 'سيكولوجية المال، الثروة، واستراتيجية الأعمال',
    descEn: 'Understand human behavior regarding wealth, compounding, risk asymmetry, and strategic leverage.',
    descAr: 'فهم سلوك الإنسان مع المال والاستثمار والتراكم الزمني، وبناء ميزة تنافسية مستدامة.',
    durationWeeks: '4 Books',
    stageIds: ['b09', 'b10', 'b11', 'b12']
  },
  {
    id: 4,
    numberStr: '04',
    titleEn: 'Philosophy, Stoicism & Meaning of Life',
    titleAr: 'الفلسفة، الحكمة الرواقية، والبحث عن المعنى',
    descEn: 'Timeless principles for enduring hardship, maintaining mental peace, and cultivating an unshakeable mind.',
    descAr: 'مبادئ خالدة للصمود أمام الشدائد، والسلام الداخلي، وإيجاد المعنى الحقيقي للحياة في مواجهة الصعاب.',
    durationWeeks: '4 Books',
    stageIds: ['b13', 'b14', 'b15', 'b16']
  }
];

export const BOOKS_STAGES: BookStage[] = [
  // Phase 1
  {
    id: 'b01',
    title: 'Atomic Habits',
    titleAr: 'العادات الذرية (Atomic Habits)',
    author: 'James Clear',
    year: 2018,
    category: 'Habits',
    pages: 320,
    tagline: 'Tiny changes, remarkable results.',
    taglineAr: 'تغييرات صغيرة جداً، تصنع نتائج استثنائية مع الوقت.',
    coreIdea: 'You do not rise to the level of your goals; you fall to the level of your systems.',
    coreIdeaAr: 'أنت لا ترتقي لمستوى أهدافك، بل تهبط لمستوى أنظمتك وعاداتك اليومية الصغيرة.',
    keyTakeaway: 'Focus on 1% improvements every day and make good habits obvious, attractive, easy, and satisfying.',
    keyTakeawayAr: 'ركز على تحسين 1% يومياً، واجعل العادة الإيجابية واضحة، جذابة، سهلة، ومجزية فوراً.',
    keyThemes: ['Habit Loop', 'Identity-Based Habits', 'The 2-Minute Rule', 'System Design']
  },
  {
    id: 'b02',
    title: 'Deep Work',
    titleAr: 'العمل العميق (Deep Work)',
    author: 'Cal Newport',
    year: 2016,
    category: 'Productivity',
    pages: 296,
    tagline: 'Rules for focused success in a distracted world.',
    taglineAr: 'قواعد النجاح المركّز في عالم مشتت ومنقسم الانتباه.',
    coreIdea: 'The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.',
    coreIdeaAr: 'القدرة على التركيز غير المنقطع تصبح نادرة جداً في نفس الوقت الذي تصبح فيه أعلى قيمة في سوق العمل.',
    keyTakeaway: 'Eliminate shallow digital distractions and protect 3-4 hours of uninterrupted cognitive focus daily.',
    keyTakeawayAr: 'تخلص من مشتتات الإشعارات والتواصل السطحي، واحمِ 3-4 ساعات يومية من التركيز الذهني الصافي.',
    keyThemes: ['Cognitive Attention', 'Quitting Social Media', 'Bimodal Scheduling', 'Shallow Work Detox']
  },
  {
    id: 'b03',
    title: 'The One Thing',
    titleAr: 'الشيء الوحيد (The One Thing)',
    author: 'Gary Keller & Jay Papasan',
    year: 2013,
    category: 'Productivity',
    pages: 240,
    tagline: 'The surprisingly simple truth behind extraordinary results.',
    taglineAr: 'الحقيقة البسيطة والمفاجئة خلف تحقيق النتائج غير العادية.',
    coreIdea: 'What is the ONE Thing you can do such that by doing it everything else becomes easier or unnecessary?',
    coreIdeaAr: 'ما هو الشيء الواحد الذي إذا فعلته اليوم، أصبح كل شيء آخر أسهل أو غير ذي أهمية؟',
    keyTakeaway: 'Ruthlessly prioritize the single domino that will topple all subsequent challenges.',
    keyTakeawayAr: 'رتب أولوياتك بصرامة بالغة وابحث عن حجر الدومينو الأول الذي يسقط بقية العقبات تلقائياً.',
    keyThemes: ['Focusing Question', 'The Domino Effect', 'Saying No', 'Time Blocking']
  },
  {
    id: 'b04',
    title: 'Can\'t Hurt Me',
    titleAr: 'لا يمكن إيذائي (Can\'t Hurt Me)',
    author: 'David Goggins',
    year: 2018,
    category: 'Discipline',
    pages: 364,
    tagline: 'Master your mind and defy the odds.',
    taglineAr: 'روّض عقلك وتحدَّ المستحيل والظروف المعاكسة.',
    coreIdea: 'When your mind tells you that you are completely exhausted, you are only at 40% of your real capacity.',
    coreIdeaAr: 'عندما يخبرك عقلك أنك منهك تماماً ولا تستطيع الاستمرار، فأنت لم تستنزف سوى 40% من طاقتك الحقيقية.',
    keyTakeaway: 'Build calluses on your brain through intentional discomfort and extreme accountability.',
    keyTakeawayAr: 'ابنِ صلابة ذهنية حقيقية عبر وضع نفسك عمداً في مواقف تتطلب الانضباط الشديد والمواجهة.',
    keyThemes: ['The 40% Rule', 'Accountability Mirror', 'Taking Souls', 'Mental Toughness']
  },

  // Phase 2
  {
    id: 'b05',
    title: 'Thinking, Fast and Slow',
    titleAr: 'التفكير، بسرعة وببطء (Thinking, Fast and Slow)',
    author: 'Daniel Kahneman',
    year: 2011,
    category: 'Cognition',
    pages: 512,
    tagline: 'Two systems drive the way we think: the fast intuitive brain and the slow rational brain.',
    taglineAr: 'نظامان يقودان تفكيرنا: العقل البديهي السريع، والعقل المنطقي البطيء.',
    coreIdea: 'System 1 operates automatically with little effort; System 2 allocates attention to complex effortful computation.',
    coreIdeaAr: 'النظام 1 يعمل تلقائياً وبسرعة معتمداً على الحدس، بينما النظام 2 يتطلب جهداً وتركيزاً تحليلياً واعياً.',
    keyTakeaway: 'Recognize cognitive illusions, anchoring, confirmation bias, and loss aversion in your daily choices.',
    keyTakeawayAr: 'اكتشف الخدع الذهنية والانحيازات المعرفية التي تؤثر على قراراتك الاستثمارية والشخصية دون وعيك.',
    keyThemes: ['System 1 & System 2', 'Heuristics & Biases', 'Prospect Theory', 'Overconfidence']
  },
  {
    id: 'b06',
    title: 'Poor Charlie\'s Almanack',
    titleAr: 'تقويم تشارلي مانجر (Poor Charlie\'s Almanack)',
    author: 'Charlie Munger',
    year: 2005,
    category: 'Cognition',
    pages: 548,
    tagline: 'The wit and wisdom of Charles T. Munger on worldly wisdom and mental models.',
    taglineAr: 'حكمة تشارلي مانجر حول النماذج الذهنية المتعددة وفهم العالم بذكاء.',
    coreIdea: 'You must know the big ideas in the big disciplines and use them routinely: a latticework of mental models.',
    coreIdeaAr: 'يجب أن تفهم الأفكار الكبرى من مختلف العلوم (فيزياء، أحياء، اقتصاد، نفس) لتبني شبكة نماذج ذهنية متكاملة.',
    keyTakeaway: 'Invert, always invert: instead of trying to be brilliant, focus on consistently avoiding foolishness.',
    keyTakeawayAr: 'اعكس المشكلة دائماً: بدلاً من محاولة أن تكون عبقرياً، ركز طاقتك على تجنب الحماقات المتكررة.',
    keyThemes: ['Mental Models', 'Inversion Principle', 'Multidisciplinary Thinking', 'Lollapalooza Effect']
  },
  {
    id: 'b07',
    title: 'Antifragile',
    titleAr: 'ضد الهشاشة (Antifragile)',
    author: 'Nassim Nicholas Taleb',
    year: 2012,
    category: 'Strategy',
    pages: 544,
    tagline: 'Things that gain from disorder.',
    taglineAr: 'الأشياء والأنظمة التي تزداد قوة وازدهاراً من الفوضى والاضطرابات.',
    coreIdea: 'Some things benefit from shocks; they thrive and grow when exposed to volatility, randomness, and stress.',
    coreIdeaAr: 'المرونة تعني الصمود أمام الصدمة، أما "ضد الهشاشة" فتعني الاستفادة من الصدمة لتصبح أقوى وأكثر نجاحاً.',
    keyTakeaway: 'Position yourself and your career with asymmetric upside: small downside risks, massive unlimited upside.',
    keyTakeawayAr: 'ابنِ مسارك وحياتك على مبدأ عدم التماثل: خسائر محدودة وصغيرة جداً، مقابل فرص صعود هائلة وغير محدودة.',
    keyThemes: ['Antifragility', 'Skin in the Game', 'Via Negativa', 'Barbell Strategy']
  },
  {
    id: 'b08',
    title: 'Principles',
    titleAr: 'المبادئ (Principles: Life & Work)',
    author: 'Ray Dalio',
    year: 2017,
    category: 'Decisions',
    pages: 592,
    tagline: 'Life, management, and radical truth from the founder of the world\'s largest hedge fund.',
    taglineAr: 'الحياة والعمل والحقيقة الصريحة من مؤسس أكبر صندوق تحوط في العالم.',
    coreIdea: 'Pain + Reflection = Progress. Embrace reality and deal with it ruthlessly.',
    coreIdeaAr: 'الألم + التأمل ومراجعة الأخطاء = التطور والتقدم الحقيقي.',
    keyTakeaway: 'Operate with radical open-mindedness and view life as an evolving machine where you diagnose flaws objectively.',
    keyTakeawayAr: 'تبنَّ عقلية الانفتاح الجذري على النقد، وانظر لقراراتك كآلة يمكنك تصحيح تروسها عند كل عطل.',
    keyThemes: ['Radical Transparency', 'Idea Meritocracy', 'Pain + Reflection', '5-Step Process']
  },

  // Phase 3
  {
    id: 'b09',
    title: 'The Psychology of Money',
    titleAr: 'سيكولوجية المال (The Psychology of Money)',
    author: 'Morgan Housel',
    year: 2020,
    category: 'Wealth',
    pages: 256,
    tagline: 'Timeless lessons on wealth, greed, and happiness.',
    taglineAr: 'دروس خالدة عن الثروة، الطمع، والسعادة الحقيقية.',
    coreIdea: 'Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
    coreIdeaAr: 'نجاحك المالي يعتمد بنسبة ضئيلة على ذكائك وعبقريتك، وبنسبة هائلة على سلوكك وانضباطك النفسي.',
    keyTakeaway: 'True wealth is what you do not see (unspent money), and the highest form of wealth is control over your time.',
    keyTakeawayAr: 'الثروة الحقيقية هي ما لا يراه الناس (الأموال غير المنفقة)، وأعظم شكل للثراء هو امتلاك وقتك وحريتك.',
    keyThemes: ['Freedom of Time', 'Compounding Patience', 'Room for Error', 'Knowing When It Is Enough']
  },
  {
    id: 'b10',
    title: 'Zero to One',
    titleAr: 'من الصفر إلى الواحد (Zero to One)',
    author: 'Peter Thiel',
    year: 2014,
    category: 'Startups',
    pages: 224,
    tagline: 'Notes on startups, or how to build the future.',
    taglineAr: 'ملاحظات حول الشركات الناشئة، أو كيف تبني المستقبل.',
    coreIdea: 'Every time we create something new, we go from 0 to 1; copying someone else goes from 1 to n.',
    coreIdeaAr: 'كلما ابتكرت شيئاً لم يكن موجوداً، فأنت تنتقل من 0 إلى 1؛ أما تقليد ما هو موجود فهو انتقال من 1 إلى n.',
    keyTakeaway: 'Competition is for losers. Build a creative monopoly by solving a unique problem in a small, focused niche.',
    keyTakeawayAr: 'المنافسة الشرسة تحرق الأرباح؛ ابنِ ميزة احتكارية قائمة على الابتكار وحل مشكلة فريدة لسوق محدد.',
    keyThemes: ['Creative Monopoly', 'Definite Optimism', 'Secrets of the Market', 'Power Law']
  },
  {
    id: 'b11',
    title: 'The Almanack of Naval Ravikant',
    titleAr: 'دليل نافال رافيكانت (The Almanack of Naval Ravikant)',
    author: 'Eric Jorgenson & Naval Ravikant',
    year: 2020,
    category: 'Wealth & Wisdom',
    pages: 244,
    tagline: 'A guide to wealth and happiness from Silicon Valley\'s iconic thinker.',
    taglineAr: 'دليل الثروة والسعادة والحرية من أحد ألمع مفكري وادي السيليكون.',
    coreIdea: 'Seek wealth, not money or status. Wealth is having assets that earn while you sleep.',
    coreIdeaAr: 'ابحث عن الثروة وليس المنصب أو المال المؤقت؛ الثروة هي امتلاك أصول تدر عليك عائداً وأنت نائم.',
    keyTakeaway: 'Use permissionless leverage: code and media. Productize yourself and own equity in what you create.',
    keyTakeawayAr: 'استخدم الروافع التي لا تحتاج لإذن أحد (البرمجة وصناعة المحتوى)، وحول مهاراتك الفريدة إلى منتجات.',
    keyThemes: ['Permissionless Leverage', 'Specific Knowledge', 'Judgment over Effort', 'Peace of Mind']
  },
  {
    id: 'b12',
    title: 'Good to Great',
    titleAr: 'من جيد إلى عظيم (Good to Great)',
    author: 'Jim Collins',
    year: 2001,
    category: 'Business',
    pages: 300,
    tagline: 'Why some companies make the leap... and others don\'t.',
    taglineAr: 'لماذا تحقق بعض المؤسسات قفزات تاريخية عظيمة بينما تبقى الأخرى عادية.',
    coreIdea: 'Good is the enemy of great. Greatness is not a matter of circumstance; it is a matter of conscious choice and discipline.',
    coreIdeaAr: 'الجيد هو العدو اللدود للعظيم؛ والعظمة ليست صدفة ولا ضربة حظ، بل خيار واعٍ وانضباط منهجي صارم.',
    keyTakeaway: 'First who, then what: get the right disciplined people on the bus before deciding where to drive.',
    keyTakeawayAr: 'اختر الأشخاص المناسبين أولاً، ثم حدد الاتجاه؛ وركز على مفهوم القنفذ (تقاطع ما تحبه وما تجيده وما يجلب عائداً).',
    keyThemes: ['Level 5 Leadership', 'The Hedgehog Concept', 'The Flywheel Effect', 'First Who, Then What']
  },

  // Phase 4
  {
    id: 'b13',
    title: 'Man\'s Search for Meaning',
    titleAr: 'الإنسان يبحث عن المعنى (Man\'s Search for Meaning)',
    author: 'Viktor E. Frankl',
    year: 1946,
    category: 'Philosophy',
    pages: 184,
    tagline: 'The classic tribute to hope from the Holocaust.',
    taglineAr: 'الشهادة الإنسانية الخالدة عن الأمل ومعنى الحياة من داخل معسكرات الاعتقال.',
    coreIdea: 'Everything can be taken from a man but one thing: the last of human freedoms—to choose one\'s attitude in any circumstances.',
    coreIdeaAr: 'يمكن أن يُسلب من الإنسان كل شيء إلا حرية واحدة: اختيار موقفه واستجابته أمام أي ظرف يمر به.',
    keyTakeaway: 'He who has a why to live can bear almost any how.',
    keyTakeawayAr: 'من يمتلك سبباً ومعنى واضحاً يعيش لأجله، يمكنه أن يتحمل أي صعوبات في الطريق.',
    keyThemes: ['Logotherapy', 'Inner Freedom', 'Finding Meaning in Suffering', 'Purpose in Life']
  },
  {
    id: 'b14',
    title: 'Meditations',
    titleAr: 'التأملات (Meditations)',
    author: 'Marcus Aurelius',
    year: 180,
    category: 'Philosophy',
    pages: 254,
    tagline: 'Personal writings of the Roman Emperor on Stoic philosophy, duty, and resilience.',
    taglineAr: 'مذكرات إمبراطور روما الفيلسوف ماركوس أوريليوس عن الواجب والحكمة والسكينة.',
    coreIdea: 'You have power over your mind, not outside events. Realize this, and you will find strength.',
    coreIdeaAr: 'أنت تملك السيطرة على عقلك وأفكارك فقط، لا على الأحداث الخارجية؛ أدرك هذا وستجد القوة والسلام.',
    keyTakeaway: 'The obstacle is the way: what stands in the way of action becomes the action.',
    keyTakeawayAr: 'العقبة هي الطريق؛ ما يعترض سبيلك هو ذاته التحدي الذي يصقل شخصيتك ويصنع نضجك.',
    keyThemes: ['Dichotomy of Control', 'Amor Fati', 'Memento Mori', 'Unshakeable Calm']
  },
  {
    id: 'b15',
    title: 'The Courage to Be Disliked',
    titleAr: 'شجاعة أن تكون غير محبوب (The Courage to Be Disliked)',
    author: 'Ichiro Kishimi & Fumitake Koga',
    year: 2013,
    category: 'Psychology',
    pages: 288,
    tagline: 'How to free yourself, change your life, and achieve real happiness through Adlerian psychology.',
    taglineAr: 'كيف تتحرر من توقعات الآخرين وتغير حياتك وتبني السعادة عبر حوارات علم النفس الأدلري.',
    coreIdea: 'All problems are interpersonal relationship problems. Separate your tasks from the tasks of others.',
    coreIdeaAr: 'جميع المشكلات الإنسانية تنبع من العلاقات وتوقعات الآخرين؛ افصل مسؤولياتك عن مسؤوليات غيرك.',
    keyTakeaway: 'You do not live to satisfy other people\'s expectations, and they do not live to satisfy yours. True freedom requires courage.',
    keyTakeawayAr: 'أنت لم تُخلق لتلبي توقعات الآخرين؛ والحرية الحقيقية تتطلب الشجاعة للتصالح مع عدم إرضاء الجميع.',
    keyThemes: ['Separation of Tasks', 'Adlerian Psychology', 'Freedom of Self', 'Living in the Here and Now']
  },
  {
    id: 'b16',
    title: 'Letters from a Stoic',
    titleAr: 'رسائل سينيكا الرواقية (Letters from a Stoic)',
    author: 'Seneca',
    year: 65,
    category: 'Philosophy',
    pages: 320,
    tagline: 'Timeless epistolary wisdom on time, friendship, grief, and living well.',
    taglineAr: 'رسائل حكيمة وخالدة عن استثمار الوقت، الصداقة، والسكينة في مواجهة تقلبات الدهر.',
    coreIdea: 'It is not that we have a short time to live, but that we waste a lot of it.',
    coreIdeaAr: 'ليست المشكلة أن عمرنا قصير، بل المشكلة أننا نضيّع ونبدد الكثير منه فيما لا ينفع.',
    keyTakeaway: 'We suffer more often in imagination than in reality. Guard your time as your most precious non-renewable asset.',
    keyTakeawayAr: 'معاناتنا في خيالنا وتوقعاتنا أكثر بكثير مما نعانيه في الواقع؛ حافظ على وقتك فهو أثمن ما تملك.',
    keyThemes: ['The Shortness of Life', 'Managing Anxiety', 'True Friendship', 'Mindful Living']
  }
];
