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
    titleEn: 'Mind-Benders & Philosophical Sci-Fi',
    titleAr: 'أفلام ذهنية وفلسفية تتحدى الإدراك',
    descEn: 'Films that bend reality, explore space-time dimensions, memory, and cognitive philosophy.',
    descAr: 'أفلام تتحدى الإدراك، وتستكشف أبعاد الزمكان والوعي والبحث عن الحقيقة.',
    durationWeeks: '3 Films',
    stageIds: ['m01', 'm02', 'm03']
  },
  {
    id: 2,
    numberStr: '02',
    titleEn: 'Human Spirit, Hope & Obsession',
    titleAr: 'الدراما الإنسانية الكبرى وقوة الإرادة',
    descEn: 'Masterpieces about resilience, relentless excellence, and breaking out of internal prisons.',
    descAr: 'روائع عن الصمود، البحث عن المعنى، الإصرار على العظمة، والتحرر من القيود.',
    durationWeeks: '3 Films',
    stageIds: ['m04', 'm05', 'm06']
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
    category: 'Mind-Benders',
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
    category: 'Mind-Benders',
    tagline: 'Your mind is the scene of the crime.',
    taglineAr: 'عقلك هو مسرح الجريمة.',
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea.',
    synopsisAr: 'لص محترف يسرق الأسرار من داخل الأحلام، يُكلف بمهمة شبه مستحيلة: زراعة فكرة داخل عقل شخصية نافذة.',
    whyWatch: 'A masterclass in narrative layers, architecture of thought, and structural pacing.',
    whyWatchAr: 'درس سينمائي عبقري في تعدد طبقات السرد وهندسة الأفكار والتحكم في إيقاع القصة.',
    keyThemes: ['Subconscious Mind', 'Lucid Dreaming', 'Idea Architecture', 'Grief']
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
    category: 'Mind-Benders',
    tagline: 'Welcome to the Real World.',
    taglineAr: 'أهلاً بك في العالم الحقيقي.',
    synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    synopsisAr: 'مبرمج كمبيوتر يكتشف أن العالم الذي يعيش فيه ما هو إلا محاكاة رقمية وهمية تسيطر عليها الآلات.',
    whyWatch: 'A philosophical milestone questioning reality, simulation theory, and free will.',
    whyWatchAr: 'علامة فارقة في تاريخ السينما طرحت تساؤلات فلسفية عميقة عن حقيقة الواقع والحرية والإدراك.',
    keyThemes: ['Simulation Theory', 'Free Will', 'Cyberpunk', 'Awakening']
  },
  {
    id: 'm04',
    title: 'The Shawshank Redemption',
    titleAr: 'الخلاص من شاوشانك (The Shawshank Redemption)',
    year: 1994,
    director: 'Frank Darabont',
    imdbRating: '9.3',
    duration: '2h 22m',
    genre: 'Drama',
    category: 'Human Spirit',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    taglineAr: 'الخوف يسجنك، لكن الأمل يحررك.',
    synopsis: 'A banker convicted of murder spends decades in prison, finding peace and eventual redemption.',
    synopsisAr: 'مصرفي يُحكم عليه بالسجن المؤبد ظلماً، يقضي عقوداً يزرع الأمل ويبني خطة حريته بذكاء وصبر لا يُقهر.',
    whyWatch: 'The highest-rated film in IMDb history, a timeless ode to patience, hope, and true friendship.',
    whyWatchAr: 'الفيلم الأعلى تقييماً في تاريخ السينما؛ درس لا يُنسى في الصبر، الأمل الذي لا يموت، وقوة الإرادة.',
    keyThemes: ['Enduring Hope', 'Patience', 'Friendship', 'Freedom']
  },
  {
    id: 'm05',
    title: 'Whiplash',
    titleAr: 'ويبلاش (Whiplash)',
    year: 2014,
    director: 'Damien Chazelle',
    imdbRating: '8.5',
    duration: '1h 47m',
    genre: 'Drama / Music',
    category: 'Human Spirit',
    tagline: 'The road to greatness can take you to the edge.',
    taglineAr: 'الطريق إلى العظمة قد يدفعك إلى حافة الهاوية.',
    synopsis: 'A promising young drummer enrolls at a cut-throat music conservatory where his instructor pushes him beyond limits.',
    synopsisAr: 'عازف درامز شاب طموح يصطدم بمدرب قاسٍ يدفعه بقسوة بالغة نحو الكمال والعظمة الفنية.',
    whyWatch: 'Electrifying exploration of obsession, excellence, perfectionism, and psychological sacrifice.',
    whyWatchAr: 'فيلم مشحون بالأدرينالين يطرح تساؤلاً جوهرياً: ما هو الثمن الحقيقي للوصول إلى قمة العظمة والاحتراف؟',
    keyThemes: ['Obsession', 'Pursuit of Greatness', 'Discipline', 'Perfectionism']
  },
  {
    id: 'm06',
    title: 'Fight Club',
    titleAr: 'نادي القتال (Fight Club)',
    year: 1999,
    director: 'David Fincher',
    imdbRating: '8.8',
    duration: '2h 19m',
    genre: 'Drama / Thriller',
    category: 'Human Spirit',
    tagline: 'Mischief. Mayhem. Soap.',
    taglineAr: 'الفوضى، التمرد، والبحث عن المعنى.',
    synopsis: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    synopsisAr: 'موظف يعاني من الأرق وروتين الحياة الاستهلاكية، يلتقي بشخصية غامضة وينشئان نادياً سرياً يغير كل الموازين.',
    whyWatch: 'Fierce critique of modern consumerism and a legendary psychological twist.',
    whyWatchAr: 'نقد لاذع لسطحية النمط الاستهلاكي الحديث مع واحدة من أشهر المفاجآت النفسية في تاريخ الفن.',
    keyThemes: ['Anti-Consumerism', 'Identity', 'Existential Awakening']
  }
];
