export interface MovieStage {
  id: string;
  title: string;
  titleAr: string;
  year: number;
  director: string;
  imdbRating: string;
  duration: string;
  genre: string;
  category: string;
  tagline: string;
  taglineAr: string;
  synopsis: string;
  synopsisAr: string;
  whyWatch: string;
  whyWatchAr: string;
  keyThemes: string[];
}

export interface MoviePhase {
  id: number;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationWeeks: string;
  stageIds: string[];
}

export const MOVIES_PHASES: MoviePhase[] = [
  {
    id: 1,
    numberStr: '01',
    titleEn: 'Mind-Benders & Sci-Fi Masterpieces',
    titleAr: 'روائع الخيال العلمي والأفلام الذهنية المعقدة',
    descEn: 'Films that bend reality, explore space-time dimensions, memory, and cognitive philosophy.',
    descAr: 'أفلام تتحدى الإدراك، وتستكشف أبعاد الزمكان والذاكرة وفلسفة الوعي البشري.',
    durationWeeks: '4 Movies',
    stageIds: ['m01', 'm02', 'm03', 'm04']
  },
  {
    id: 2,
    numberStr: '02',
    titleEn: 'Inspirational Drama & Human Spirit',
    titleAr: 'الدراما الإنسانية الكبرى وقوة الأمل',
    descEn: 'Masterpieces about resilience, hope, personal redemption, and psychological depth.',
    descAr: 'أعظم القصص عن الصمود، الأمل، التغلب على الصعاب، والعمق النفسي لشخصيات لا تُنسى.',
    durationWeeks: '4 Movies',
    stageIds: ['m05', 'm06', 'm07', 'm08']
  },
  {
    id: 3,
    numberStr: '03',
    titleEn: 'Psychological Thrillers & Mystery',
    titleAr: 'الإثارة النفسية والغموض المحكم',
    descEn: 'Gripping suspense, investigative logic, and chilling explorations of the human mind.',
    descAr: 'حبكات مشدودة وألغاز معقدة تأخذك لأعماق التفكير الاستقصائي والصراع الذهني.',
    durationWeeks: '4 Movies',
    stageIds: ['m09', 'm10', 'm11', 'm12']
  },
  {
    id: 4,
    numberStr: '04',
    titleEn: 'Biographies & Real Life Legends',
    titleAr: 'السير الذاتية وصناع التاريخ',
    descEn: 'True stories of brilliant minds, visionaries, scientists, and extraordinary lives.',
    descAr: 'قصص واقعية ملهمة عن عباقرة ومفكرين ورواد غيروا مسار العالم بعزيمتهم.',
    durationWeeks: '4 Movies',
    stageIds: ['m13', 'm14', 'm15', 'm16']
  },
  {
    id: 5,
    numberStr: '05',
    titleEn: 'Cinema Masterpieces & Timeless Classics',
    titleAr: 'أعظم كلاسيكيات السينما التاريخية',
    descEn: 'Foundational cinematic works that set the standard for storytelling and directing.',
    descAr: 'أفلام أيقونية أرست معايير السرد البصري والإخراج في تاريخ الفن السابع.',
    durationWeeks: '4 Movies',
    stageIds: ['m17', 'm18', 'm19', 'm20']
  },
  {
    id: 6,
    numberStr: '06',
    titleEn: 'Modern Global Masterpieces',
    titleAr: 'روائع السينما العالمية المعاصرة',
    descEn: 'Exceptional contemporary films from around the globe that redefined modern cinema.',
    descAr: 'أفلام حديثة استثنائية من مختلف أنحاء العالم كسرت النمطية وحصدت إعجاب العالم.',
    durationWeeks: '4 Movies',
    stageIds: ['m21', 'm22', 'm23', 'm24']
  }
];

export const MOVIES_STAGES: MovieStage[] = [
  {
    id: 'm01',
    title: 'Interstellar',
    titleAr: 'بين النجوم (Interstellar)',
    year: 2014,
    director: 'Christopher Nolan',
    imdbRating: '8.7',
    duration: '2h 49m',
    genre: 'Sci-Fi / Adventure',
    category: 'Sci-Fi',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    taglineAr: 'وُلدت البشرية على الأرض، لكن لم يُقدّر لها أن تموت هنا.',
    synopsis: 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity survival.',
    synopsisAr: 'رحلة استكشافية مذهلة عبر ثقب دودي في الفضاء بحثاً عن كوكب جديد لإنقاذ البشرية قبل فنائها.',
    whyWatch: 'Combines real astrophysical theory with profound emotional resonance and iconic Hans Zimmer music.',
    whyWatchAr: 'تحفة بصرية وعلمية تدمج الفيزياء الفلكية بالمشاعر الإنسانية العميقة وموسيقى هانز زيمر الأسطورية.',
    keyThemes: ['Space Exploration', 'General Relativity', 'Love Across Dimensions', 'Survival']
  },
  {
    id: 'm02',
    title: 'Inception',
    titleAr: 'استهلال (Inception)',
    year: 2010,
    director: 'Christopher Nolan',
    imdbRating: '8.8',
    duration: '2h 28m',
    genre: 'Sci-Fi / Action',
    category: 'Sci-Fi',
    tagline: 'Your mind is the scene of the crime.',
    taglineAr: 'عقلك هو مسرح الجريمة.',
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea.',
    synopsisAr: 'لص محترف يسرق الأسرار من داخل الأحلام، يُكلف بمهمة شبه مستحيلة: زراعة فكرة داخل عقل شخصية نافذة.',
    whyWatch: 'A masterclass in narrative layers, architecture of thought, and structural pacing.',
    whyWatchAr: 'درس سينمائي عبقري في تعدد طبقات السرد وهندسة الأفكار والتحكم في إيقاع القصة.',
    keyThemes: ['Lucid Dreaming', 'Subconscious Mind', 'Grief & Regret', 'Idea Implantation']
  },
  {
    id: 'm03',
    title: 'The Matrix',
    titleAr: 'المصفوفة (The Matrix)',
    year: 1999,
    director: 'Lana & Lilly Wachowski',
    imdbRating: '8.7',
    duration: '2h 16m',
    genre: 'Sci-Fi / Cyberpunk',
    category: 'Sci-Fi',
    tagline: 'Welcome to the Real World.',
    taglineAr: 'أهلاً بك في العالم الحقيقي.',
    synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    synopsisAr: 'مبرمج كمبيوتر يكتشف أن العالم الذي يعيش فيه ما هو إلا محاكاة رقمية وهمية تسيطر عليها الآلات.',
    whyWatch: 'A philosophical milestone questioning reality, simulation theory, and free will.',
    whyWatchAr: 'علامة فارقة في تاريخ السينما طرحت تساؤلات فلسفية عميقة عن حقيقة الواقع والحرية والإدراك.',
    keyThemes: ['Simulation Hypothesis', 'Free Will vs Determinism', 'Cyberpunk', 'Awakening']
  },
  {
    id: 'm04',
    title: 'Arrival',
    titleAr: 'الوصول (Arrival)',
    year: 2016,
    director: 'Denis Villeneuve',
    imdbRating: '7.9',
    duration: '1h 56m',
    genre: 'Sci-Fi / Mystery',
    category: 'Sci-Fi',
    tagline: 'Why are they here?',
    taglineAr: 'لماذا هم هنا؟',
    synopsis: 'A linguist works with the military to communicate with alien lifeforms after twelve spacecraft appear.',
    synopsisAr: 'عالمة لغويات تُستدعى للتواصل مع كائنات فضائية وصلت للأرض، لتكتشف كيف تُشكل اللغة إدراكنا للزمن.',
    whyWatch: 'Brilliant exploration of linguistic relativity, non-linear time, and communication empathy.',
    whyWatchAr: 'استكشاف فلسفي مذهل لكيفية تأثير اللغة على إدراكنا للزمن ومفهوم التواصل الحقيقي بين الحضارات.',
    keyThemes: ['Linguistics', 'Non-linear Time', 'Empathy', 'First Contact']
  },

  // Phase 2: Drama & Human Spirit
  {
    id: 'm05',
    title: 'The Shawshank Redemption',
    titleAr: 'الخلاص من شاوشانك (The Shawshank Redemption)',
    year: 1994,
    director: 'Frank Darabont',
    imdbRating: '9.3',
    duration: '2h 22m',
    genre: 'Drama',
    category: 'Drama',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    taglineAr: 'الخوف يسجنك، لكن الأمل يحررك.',
    synopsis: 'A banker convicted of murder spends decades in prison, finding peace and eventual redemption.',
    synopsisAr: 'مصرفي يُحكم عليه بالسجن المؤبد ظلماً، يقضي عقوداً يزرع الأمل ويبني خطة حريته بذكاء وصبر لا يُقهر.',
    whyWatch: 'The highest-rated film in IMDb history, a timeless ode to patience, hope, and true friendship.',
    whyWatchAr: 'الفيلم الأعلى تقييماً في تاريخ السينما؛ درس لا يُنسى في الصبر، الأمل الذي لا يموت، وقوة الإرادة.',
    keyThemes: ['Enduring Hope', 'Patience & Strategy', 'Friendship', 'Justice']
  },
  {
    id: 'm06',
    title: 'Good Will Hunting',
    titleAr: 'غود ويل هانتينغ (Good Will Hunting)',
    year: 1997,
    director: 'Gus Van Sant',
    imdbRating: '8.3',
    duration: '2h 06m',
    genre: 'Drama / Romance',
    category: 'Drama',
    tagline: 'Some people can never believe in themselves, until someone believes in them.',
    taglineAr: 'بعض الناس لا يؤمنون بأنفسهم حتى يجدوا من يؤمن بهم حقاً.',
    synopsis: 'Will Hunting, a janitor at MIT, has a gift for mathematics but needs guidance to overcome his emotional trauma.',
    synopsisAr: 'عامل نظافة عبقري في معهد MIT يمتلك موهبة فذة في الرياضيات، يساعده طبيب نفسي على مواجهة صدمات طفولته.',
    whyWatch: 'Unforgettable dialogues between Matt Damon and Robin Williams exploring potential vs fear.',
    whyWatchAr: 'حوارات أسطورية بين روبن ويليامز ومات ديمون حول الموهبة غير المستغلة والشجاعة في مواجهة الذات.',
    keyThemes: ['Raw Genius', 'Psychotherapy', 'Vulnerability', 'True Mentorship']
  },
  {
    id: 'm07',
    title: 'Whiplash',
    titleAr: 'ويبلاش (Whiplash)',
    year: 2014,
    director: 'Damien Chazelle',
    imdbRating: '8.5',
    duration: '1h 47m',
    genre: 'Drama / Music',
    category: 'Drama',
    tagline: 'The road to greatness can take you to the edge.',
    taglineAr: 'الطريق إلى العظمة قد يدفعك إلى حافة الهاوية.',
    synopsis: 'A promising young drummer enrolls at a cut-throat music conservatory where his instructor pushes him beyond limits.',
    synopsisAr: 'عازف درامز شاب طموح يصطدم بمدرب قاسٍ يدفعه بقسوة بالغة نحو الكمال والعظمة الفنية.',
    whyWatch: 'Electrifying exploration of obsession, excellence, perfectionism, and psychological sacrifice.',
    whyWatchAr: 'فيلم مشحون بالأدرينالين يطرح تساؤلاً جوهرياً: ما هو الثمن الحقيقي للوصول إلى قمة العظمة والاحتراف؟',
    keyThemes: ['Obsession', 'Pursuit of Greatness', 'Mentorship vs Abuse', 'Perseverance']
  },
  {
    id: 'm08',
    title: 'Forrest Gump',
    titleAr: 'فورست غامب (Forrest Gump)',
    year: 1994,
    director: 'Robert Zemeckis',
    imdbRating: '8.8',
    duration: '2h 22m',
    genre: 'Drama / Romance',
    category: 'Drama',
    tagline: 'Life is like a box of chocolates. You never know what you are gonna get.',
    taglineAr: 'الحياة كعلبة شوكولاتة، لا تدري أبداً ما الذي ستحصل عليه.',
    synopsis: 'The history of the United States from the 1950s to the 70s unfolds through the eyes of an Alabama man with kindness.',
    synopsisAr: 'رحلة حياة رجل بسيط بنقاء قلبه وإخلاصه يؤثر في أهم أحداث التاريخ المعاصر دون تصنع.',
    whyWatch: 'A heartwarming journey proving that pure heart, loyalty, and relentless persistence conquer all.',
    whyWatchAr: 'رحلة دافئة تبرهن على أن نقاء السريرة والوفاء والصدق أعظم وأبقى من الدهاء والمكر.',
    keyThemes: ['Kindness', 'Destiny vs Choice', 'Unconditional Love', 'Persistence']
  },

  // Phase 3: Thrillers & Mystery
  {
    id: 'm09',
    title: 'Se7en',
    titleAr: 'سبعة (Se7en)',
    year: 1995,
    director: 'David Fincher',
    imdbRating: '8.6',
    duration: '2h 07m',
    genre: 'Crime / Mystery / Thriller',
    category: 'Mystery',
    tagline: 'Seven deadly sins. Seven ways to die.',
    taglineAr: 'سبع خطايا مميتة، وسبع طرق للموت.',
    synopsis: 'Two detectives hunt a serial killer who uses the seven deadly sins as his motives.',
    synopsisAr: 'محققان يتعقبان قاتلاً متسلسلاً عبقرياً ينفذ جرائمه استناداً إلى الخطايا السبع المميتة في حبكة مظلمة.',
    whyWatch: 'David Fincher peak dark atmosphere and one of the most shocking endings in film history.',
    whyWatchAr: 'أجواء ديفيد فينشر المظلمة الساحرة وواحدة من أكثر النهايات صدمة وعبقرية في تاريخ السينما.',
    keyThemes: ['Morality', 'Urban Darkness', 'Investigation', 'The Shocking Finale']
  },
  {
    id: 'm10',
    title: 'Shutter Island',
    titleAr: 'جزيرة شاتر (Shutter Island)',
    year: 2010,
    director: 'Martin Scorsese',
    imdbRating: '8.2',
    duration: '2h 18m',
    genre: 'Mystery / Thriller',
    category: 'Mystery',
    tagline: 'Someone is missing.',
    taglineAr: 'هناك شخص مفقود في الجزيرة.',
    synopsis: 'A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
    synopsisAr: 'محقق فيدرالي يزور مصحة عقلية نائية في جزيرة معزولة للتحقيق في اختفاء مريضة، لتبدأ خيوط الواقع بالانهيار.',
    whyWatch: 'Masterful psychological misdirection by Scorsese and Leonardo DiCaprio.',
    whyWatchAr: 'تلاعب نفسي ساحر للمخرج مارتن سكورسيزي وليوناردو دي كابريو يأخذك إلى حافة التشكيك في كل ما تراه.',
    keyThemes: ['Psychological Trauma', 'Reality vs Illusion', 'Grief', 'Identity']
  },
  {
    id: 'm11',
    title: 'Fight Club',
    titleAr: 'نادي القتال (Fight Club)',
    year: 1999,
    director: 'David Fincher',
    imdbRating: '8.8',
    duration: '2h 19m',
    genre: 'Drama / Thriller',
    category: 'Mystery',
    tagline: 'Mischief. Mayhem. Soap.',
    taglineAr: 'الفوضى، التمرد، والبحث عن المعنى.',
    synopsis: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    synopsisAr: 'موظف يعاني من الأرق وروتين الحياة الاستهلاكية، يلتقي بشخصية غامضة وينشئان نادياً سرياً يغير كل الموازين.',
    whyWatch: 'Fierce critique of modern consumerism and a legendary psychological twist.',
    whyWatchAr: 'نقد لاذع لسطحية النمط الاستهلاكي الحديث مع واحدة من أشهر المفاجآت النفسية في تاريخ الفن.',
    keyThemes: ['Anti-Consumerism', 'Dual Identity', 'Masculinity', 'Existential Crisis']
  },
  {
    id: 'm12',
    title: 'Memento',
    titleAr: 'تذكار (Memento)',
    year: 2000,
    director: 'Christopher Nolan',
    imdbRating: '8.4',
    duration: '1h 53m',
    genre: 'Mystery / Thriller',
    category: 'Mystery',
    tagline: 'Some memories are best forgotten.',
    taglineAr: 'بعض الذكريات من الأفضل نسيانها.',
    synopsis: 'A man with short-term memory loss attempts to track down his wife murderer using tattoos and notes.',
    synopsisAr: 'رجل يعاني من فقدان ذاكرة قصيرة المدى، يطارد قاتل زوجته معتمداً على الوشوم والصور والملاحظات في سرد عكسي عبقري.',
    whyWatch: 'Invented reverse-chronological storytelling, placing the viewer in the shoes of the amnesiac.',
    whyWatchAr: 'ابتكار عبقري في السرد الزمني العكسي يجعلك تشعر بضياع البطل وفقدان الذاكرة لحظة بلحظة.',
    keyThemes: ['Short-Term Memory', 'Reverse Narrative', 'Self-Deception', 'Vengeance']
  },

  // Phase 4: Biographies & Real Life Legends
  {
    id: 'm13',
    title: 'The Social Network',
    titleAr: 'الشبكة الاجتماعية (The Social Network)',
    year: 2010,
    director: 'David Fincher',
    imdbRating: '7.8',
    duration: '2h 00m',
    genre: 'Biography / Drama',
    category: 'Biography',
    tagline: 'You don\'t get to 500 million friends without making a few enemies.',
    taglineAr: 'لا يمكنك الوصول لـ 500 مليون صديق دون صنع بعض الأعداء.',
    synopsis: 'The founding story of Facebook and the lawsuits that followed from former friends and co-founders.',
    synopsisAr: 'قصة تأسيس فيسبوك من غرفة بجامعة هارفارد إلى إمبراطورية عالمية، والصراعات القضائية والشخصية التي رافقتها.',
    whyWatch: 'Aaron Sorkin razor-sharp dialogue and a definitive look at tech ambition and modern startup culture.',
    whyWatchAr: 'حوارات حادة وسريعة للكاتب آرون سوركين، وتشريح دقيق لسيكولوجية الطموح في عالم التقنية والشركات الناشئة.',
    keyThemes: ['Tech Startups', 'Ambition & Loyalty', 'Intellectual Property', 'Coding Culture']
  },
  {
    id: 'm14',
    title: 'Oppenheimer',
    titleAr: 'أوبنهايمر (Oppenheimer)',
    year: 2023,
    director: 'Christopher Nolan',
    imdbRating: '8.9',
    duration: '3h 00m',
    genre: 'Biography / Drama / History',
    category: 'Biography',
    tagline: 'The story of the man who moved the earth.',
    taglineAr: 'قصة الرجل الذي غيّر موازين القوى في العالم.',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    synopsisAr: 'السيرة الملحمية للعالم روبرت أوبنهايمر وقيادته لمشروع مانهاتن لتصنيع القنبلة الذرية، وصراعه الأخلاقي اللاحق.',
    whyWatch: 'Spectacular cinematic achievement examining the ethical weight of scientific breakthrough.',
    whyWatchAr: 'ملحمة سينمائية وتاريخية حصدت الأوسكار، تناقش المسؤولية الأخلاقية للعلماء عند اختراع تقنيات مدمرة.',
    keyThemes: ['Scientific Discovery', 'Moral Conscience', 'Nuclear Age', 'Political Scapegoating']
  },
  {
    id: 'm15',
    title: 'The Imitation Game',
    titleAr: 'لعبة المحاكاة (The Imitation Game)',
    year: 2014,
    director: 'Morten Tyldum',
    imdbRating: '8.0',
    duration: '1h 54m',
    genre: 'Biography / Drama / War',
    category: 'Biography',
    tagline: 'The true enigma was the man who cracked the code.',
    taglineAr: 'اللغز الحقيقي كان الرجل الذي كسر الشفرة.',
    synopsis: 'During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians.',
    synopsisAr: 'قصة عالم الرياضيات العبقري آلان تورينج وفريقه في فك شفرة إنيجما النازية، ووضع أسس الحوسبة الحديثة.',
    whyWatch: 'Honors the father of computer science and theoretical artificial intelligence.',
    whyWatchAr: 'تكريم سينمائي مؤثر لأبي علوم الحاسوب والذكاء الاصطناعي الحديث الذي أنقذ ملايين الأرواح.',
    keyThemes: ['Alan Turing', 'Cryptography', 'Birth of Computing', 'Misunderstood Genius']
  },
  {
    id: 'm16',
    title: 'Steve Jobs',
    titleAr: 'ستيف جوبز (Steve Jobs)',
    year: 2015,
    director: 'Danny Boyle',
    imdbRating: '7.2',
    duration: '2h 02m',
    genre: 'Biography / Drama',
    category: 'Biography',
    tagline: 'Witness the genius behind the digital revolution.',
    taglineAr: 'شاهد العبقرية والتفاصيل خلف الثورة الرقمية.',
    synopsis: 'Set backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.',
    synopsisAr: 'ثلاثة فصول درامية مكثفة خلف كواليس إطلاق 3 من أهم منتجات آبل التاريخية حتى إطلاق جهاز iMac الثوري.',
    whyWatch: 'Unfiltered, three-act theatrical examination of product perfectionism and design obsession.',
    whyWatchAr: 'نظرة واقعية غير مجمّلة لهوس التصميم وإتقان المنتجات وسيكولوجية قيادة الفرق التقنية نحو المستحيل.',
    keyThemes: ['Product Vision', 'Design Obsession', 'Leadership Intensity', 'Fatherhood']
  },

  // Phase 5: Cinema Classics
  {
    id: 'm17',
    title: 'The Godfather (Part I & II)',
    titleAr: 'العراب (The Godfather)',
    year: 1972,
    director: 'Francis Ford Coppola',
    imdbRating: '9.2',
    duration: '2h 55m',
    genre: 'Crime / Drama',
    category: 'Classics',
    tagline: 'An offer you can\'t refuse.',
    taglineAr: 'عرض لا يمكنك رفضه.',
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    synopsisAr: 'الملحمة الأسرية الأشهر عن انتقال السلطة داخل عائلة كورليوني وتحول الابن الهادئ إلى زعيم قاسٍ.',
    whyWatch: 'Considered by many the greatest film ever made; peerless acting, directing, and family dynamics.',
    whyWatchAr: 'يُصنف كأعظم فيلم في تاريخ السينما العالمية؛ قمة في الإخراج والتمثيل ودراسة سيكولوجية القوة والسلطة.',
    keyThemes: ['Power Dynamics', 'Family Loyalty', 'Moral Corruption', 'Strategic Leadership']
  },
  {
    id: 'm18',
    title: '12 Angry Men',
    titleAr: '12 رجلاً غاضباً (12 Angry Men)',
    year: 1957,
    director: 'Sidney Lumet',
    imdbRating: '9.0',
    duration: '1h 36m',
    genre: 'Crime / Drama',
    category: 'Classics',
    tagline: 'Life is in their hands. Death is on their minds.',
    taglineAr: 'حياة إنسان بين أيديهم في غرفة واحدة مغلقة.',
    synopsis: 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to reconsider.',
    synopsisAr: '12 محلفاً في غرفة واحدة يتداولون في حكم إعدام شاب، يقف محلف واحد بشجاعة ويطرح الشك المعقول في الأدلة.',
    whyWatch: 'The ultimate masterclass in critical thinking, logical persuasion, cognitive bias, and courage.',
    whyWatchAr: 'أعظم درس على الإطلاق في التفكير النقدي، الإقناع المنطقي الهادئ، ومواجهة الانحيازات المعرفية.',
    keyThemes: ['Critical Thinking', 'Reasonable Doubt', 'Cognitive Bias', 'The Power of One Voice']
  },
  {
    id: 'm19',
    title: 'Pulp Fiction',
    titleAr: 'خيال رخيص (Pulp Fiction)',
    year: 1994,
    director: 'Quentin Tarantino',
    imdbRating: '8.9',
    duration: '2h 34m',
    genre: 'Crime / Drama',
    category: 'Classics',
    tagline: 'You won\'t know the facts until you\'ve seen the fiction.',
    taglineAr: 'لن تكتشف الروابط حتى تتكامل خيوط القصة.',
    synopsis: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    synopsisAr: 'قصص متقاطعة بأسلوب غير خطي لشخصيات من عالم الجريمة في لوس أنجلوس بحوارات فريدة وإخراج ثوري.',
    whyWatch: 'Revolutionized modern indie cinema, non-linear screenplay writing, and pop culture dialogue.',
    whyWatchAr: 'أحدث ثورة في كتابة السيناريو غير الخطي والحوارات السريعة وألهم أجيالاً كاملة من المخرجين.',
    keyThemes: ['Non-linear Screenplay', 'Pop Culture Monologues', 'Chance & Fate', 'Redemption']
  },
  {
    id: 'm20',
    title: 'Schindler\'s List',
    titleAr: 'قائمة شيندلر (Schindler\'s List)',
    year: 1993,
    director: 'Steven Spielberg',
    imdbRating: '9.0',
    duration: '3h 15m',
    genre: 'Biography / Drama / History',
    category: 'Classics',
    tagline: 'Whoever saves one life, saves the world entire.',
    taglineAr: 'من أحيا نفساً واحدة، فكأنما أحيا الناس جميعاً.',
    synopsis: 'In German-occupied Poland, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.',
    synopsisAr: 'القصة التاريخية المؤثرة للصناعي أوسكار شيندلر الذي خاطر بكل ما يملك لإنقاذ أكثر من ألف إنسان من الموت.',
    whyWatch: 'A heartbreaking, visually stunning testament to humanity against the darkest atrocities.',
    whyWatchAr: 'شاهد سينمائي خالد ومؤثر بالأبيض والأسود على انتصار الإنسانية والضمير في أظلم أوقات التاريخ.',
    keyThemes: ['Courage to Act', 'Human Dignity', 'Transformation', 'Historical Witness']
  },

  // Phase 6: Modern Global Cinema
  {
    id: 'm21',
    title: 'Parasite',
    titleAr: 'طفيلي (Parasite)',
    year: 2019,
    director: 'Bong Joon Ho',
    imdbRating: '8.5',
    duration: '2h 12m',
    genre: 'Drama / Thriller',
    category: 'Global',
    tagline: 'Act like you own the place.',
    taglineAr: 'تظاهر بأنك تملك المكان بأكمله.',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    synopsisAr: 'عائلة كورية فقيرة تتسلل تدريجياً وبذكاء للعمل في منزل عائلة ثرية، لتنكشف أسرار مظلمة تصدم الجميع.',
    whyWatch: 'First non-English film to win Best Picture at the Oscars; flawless architectural metaphors.',
    whyWatchAr: 'أول فيلم غير ناطق بالإنجليزية يفوز بأوسكار أفضل فيلم؛ إبداع مذهل في التصوير والرمزية ونقد الفوارق الطبقية.',
    keyThemes: ['Class Divide', 'Metaphorical Architecture', 'Deception', 'Dark Satire']
  },
  {
    id: 'm22',
    title: 'Spirited Away',
    titleAr: 'المخطوفة (Spirited Away)',
    year: 2001,
    director: 'Hayao Miyazaki',
    imdbRating: '8.6',
    duration: '2h 05m',
    genre: 'Animation / Adventure / Fantasy',
    category: 'Global',
    tagline: 'Nothing that happens is ever forgotten, even if you can\'t remember it.',
    taglineAr: 'لا شيء يحدث يُنسى تماماً، حتى لو عجزت عن تذكره الآن.',
    synopsis: 'During her family move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by spirits.',
    synopsisAr: 'تحفة استوديو جيبلي الأسطورية عن طفلة تجد نفسها في عالم سحري مليء بالأرواح وتبحث عن إنقاذ والديها.',
    whyWatch: 'Studio Ghibli pinnacle work; a visually enchanting allegory of resilience, identity, and growing up.',
    whyWatchAr: 'أعظم أفلام الرسوم المتحركة في التاريخ؛ خيال ساحر وعميق يلامس القلب عن النضج والهوية والوفاء.',
    keyThemes: ['Identity & Memory', 'Resilience', 'Japanese Folklore', 'Coming of Age']
  },
  {
    id: 'm23',
    title: 'The Prestige',
    titleAr: 'العظمة (The Prestige)',
    year: 2006,
    director: 'Christopher Nolan',
    imdbRating: '8.5',
    duration: '2h 10m',
    genre: 'Drama / Mystery / Sci-Fi',
    category: 'Global',
    tagline: 'Are you watching closely?',
    taglineAr: 'هل تركز جيداً فيما تراه؟',
    synopsis: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion.',
    synopsisAr: 'صراع محتدم وهوس بين ساحرين في لندن القرن التاسع عشر لخلق الخدعة الأسطورية، مهما كان الثمن.',
    whyWatch: 'The ultimate exploration of the price of secrets, sacrifice, and audience misdirection.',
    whyWatchAr: 'فيلم استثنائي عن التضحية والهوس وصناعة الوهم مع نهاية مذهلة تعيد ترتيب كل المشاهد.',
    keyThemes: ['Rivalry & Obsession', 'The Ultimate Sacrifice', 'Stage Magic', 'Misdirection']
  },
  {
    id: 'm24',
    title: 'Cinema Paradiso',
    titleAr: 'سينما باراديزو (Cinema Paradiso)',
    year: 1988,
    director: 'Giuseppe Tornatore',
    imdbRating: '8.5',
    duration: '2h 04m',
    genre: 'Drama / Romance',
    category: 'Global',
    tagline: 'A celebration of youth, friendship, and the everlasting magic of the movies.',
    taglineAr: 'احتفاء بسحر السينما والطفولة والصداقة التي لا تموت.',
    synopsis: 'A filmmaker recalls his childhood when falling in love with the pictures at the cinema and forming a deep friendship with the projectionist.',
    synopsisAr: 'مخرج سينمائي مشهور يتذكر طفولته وصداقته العميقة مع مشغل آلة العرض في قريته الإيطالية وعشقه للشاشة الفضية.',
    whyWatch: 'The most moving love letter ever written to the magic of cinema and nostalgia.',
    whyWatchAr: 'أعظم وأرق رسالة حب كُتبت في تاريخ السينما عن شغف الفن ودفء الذكريات والموسيقى الخالدة لإنيو موريكوني.',
    keyThemes: ['Love of Cinema', 'Nostalgia', 'Mentorship', 'Ennio Morricone Score']
  }
];
