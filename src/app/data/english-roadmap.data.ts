export interface EnglishStage {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: string;
  tagline: string;
  taglineAr: string;
  coreStrategy: string;
  coreStrategyAr: string;
  dailyHabit: string;
  dailyHabitAr: string;
  recommendedTools: string[];
  keyTopics: string[];
}

export interface EnglishPhase {
  id: number;
  numberStr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationWeeks: string;
  stageIds: string[];
}

export const ENGLISH_PHASES: EnglishPhase[] = [
  {
    id: 1,
    numberStr: '01',
    titleEn: 'Ear Tuning, Phonetics & Breaking Hesitation',
    titleAr: 'تدريب الأذن، مخارج الحروف، وكسر حاجز التردد',
    descEn: 'Train your brain to recognize authentic English sounds and produce natural stress and intonation without fear.',
    descAr: 'برمجة الأذن على تمييز الأصوات الحقيقية وضبط مخارج الحروف وموسيقى الكلام دون خوف من الخطأ.',
    durationWeeks: '4 Weeks',
    stageIds: ['e01', 'e02', 'e03', 'e04']
  },
  {
    id: 2,
    numberStr: '02',
    titleEn: 'Core Vocabulary & Sentence Construction Instinct',
    titleAr: 'المفردات الشائعة وبناء الجمل بشكل تلقائي',
    descEn: 'Stop memorizing isolated grammar rules; build dynamic sentence patterns and collocations that native speakers use.',
    descAr: 'التوقف عن حفظ القواعد المجردة، والاعتماد على قوالب الجمل وتراكيب الكلمات المتلازمة الجاهزة للاستخدام.',
    durationWeeks: '6 Weeks',
    stageIds: ['e05', 'e06', 'e07', 'e08']
  },
  {
    id: 3,
    numberStr: '03',
    titleEn: 'Thinking in English & Daily Spoken Fluency',
    titleAr: 'التفكير بالإنجليزية وكسر حاجز التحدث اليومي',
    descEn: 'Eliminate internal mental translation from Arabic; talk to yourself and practice real conversations daily.',
    descAr: 'القضاء تماماً على الترجمة الذهنية من العربية، والتحدث الذاتي، وممارسة المحادثات اليومية بثقة وسلاسة.',
    durationWeeks: '8 Weeks',
    stageIds: ['e09', 'e10', 'e11', 'e12']
  },
  {
    id: 4,
    numberStr: '04',
    titleEn: 'Native Immersion, Slang & Professional Command',
    titleAr: 'الانغماس الكامل، الإنجليزية السريعة، والمستوى المهني',
    descEn: 'Understand fast connected speech, idioms, humor, podcast listening, and high-level professional presentations.',
    descAr: 'فهم الكلام السريع المتصل للمتحدثين الأصليين، والاستماع للبودكاست، وإتقان المقابلات والعروض التقديمية.',
    durationWeeks: '8 Weeks',
    stageIds: ['e13', 'e14', 'e15', 'e16']
  }
];

export const ENGLISH_STAGES: EnglishStage[] = [
  // Phase 1
  {
    id: 'e01',
    title: 'Phonetic Awareness & The IPA Chart',
    titleAr: 'الوعي الصوتي والأصوات الصعبة (P vs B, TH, R)',
    category: 'Phonetics',
    level: 'Beginner',
    durationWeeks: '1 Week',
    tagline: 'Master the sounds that do not exist in Arabic to avoid misunderstandings.',
    taglineAr: 'إتقان الأصوات التي لا توجد في اللغة العربية مثل (P/B, V/F, TH) لتجنب اللبس.',
    coreStrategy: 'Focus on physical mouth and tongue placement. Watch slow-motion phonetic guides.',
    coreStrategyAr: 'التركيز على حركة الفم واللسان فيزيائياً وملاحظة الفرق بين الصوت الهوائي والصوت الجهري.',
    dailyHabit: 'Practice 10 minimal pair words (e.g., bit/beat, pull/pool) in front of a mirror for 10 mins.',
    dailyHabitAr: 'ممارسة 10 أزواج من الكلمات المتشابهة أمام المرآة لمدة 10 دقائق يومياً.',
    recommendedTools: ['YouGlish', 'Rachel\'s English (YouTube)', 'Elsa Speak'],
    keyTopics: ['Voiced vs Voiceless consonants', 'The Vowel Quadrangle', 'The American /r/ Sound', 'Aspiration']
  },
  {
    id: 'e02',
    title: 'The Secret of English: The Schwa Sound /ə/',
    titleAr: 'سر الإنجليزية الطبيعية: صوت الشوا (Schwa /ə/)',
    category: 'Phonetics',
    level: 'Beginner',
    durationWeeks: '1 Week',
    tagline: 'The most common vowel sound that makes you sound instantly natural.',
    taglineAr: 'الصوت الأكثر تكراراً في الإنجليزية والذي يجعلك تنطق مثل المتحدثين الأصليين دون تكلف.',
    coreStrategy: 'Learn that unstressed vowels in English collapse into a relaxed neutral /ə/ sound.',
    coreStrategyAr: 'فهم أن الحروف المتحركة غير المؤكد عليها في الكلمة تنكمش إلى صوت محايد ومريح ومسترخٍ.',
    dailyHabit: 'Identify the Schwa sound in 5 sentences from a podcast transcript daily.',
    dailyHabitAr: 'استخراج صوت الشوا في 5 جمل من نصوص بودكاست يومياً وملاحظة غياب التكلف في نطقها.',
    recommendedTools: ['BBC Learning English', 'YouGlish', 'Cambridge Dictionary IPA'],
    keyTopics: ['Unstressed syllables', 'Schwa in function words (to, for, of, a)', 'Rhythm balance']
  },
  {
    id: 'e03',
    title: 'Word Stress & Sentence Rhythm',
    titleAr: 'النبر وموسيقى الجملة (Word & Sentence Stress)',
    category: 'Pronunciation',
    level: 'Beginner',
    durationWeeks: '1 Week',
    tagline: 'English is stress-timed, not syllable-timed like Arabic. Rhythm is key to being understood.',
    taglineAr: 'الإنجليزية لغة قائمة على الإيقاع والنبر؛ الضغط على الكلمات الصحيحة أهم من نطق كل حرف.',
    coreStrategy: 'Stress content words (nouns, verbs, adjectives); glide over grammar function words.',
    coreStrategyAr: 'التشديد على الكلمات التي تحمل المعنى (الأسماء والأفعال)، وتخفيف الكلمات الوظيفية كحروف الجر.',
    dailyHabit: 'Tap on your desk to the beat of short English sentences to feel the syllable cadence.',
    dailyHabitAr: 'النقر بإصبعك على المكتب مع نبرات الجمل الإنجليزية للشعور بالإيقاع الطبيعي للحديث.',
    recommendedTools: ['English with Lucy', 'Forvo Pronunciation', 'Audible Audiobooks'],
    keyTopics: ['Content words vs Function words', 'Noun vs Verb stress shift', 'Intonation patterns']
  },
  {
    id: 'e04',
    title: 'Breaking the Psychological Fear Barrier',
    titleAr: 'تحطيم عقدة الخوف من ارتكاب الأخطاء والتلعثم',
    category: 'Mindset',
    level: 'Beginner',
    durationWeeks: '1 Week',
    tagline: 'Fluency is not perfection; it is the confidence to communicate effectively.',
    taglineAr: 'الطلاقة ليست الكمال المطلق؛ الطلاقة هي القدرة على إيصال فكرتك دون خوف من الوقوع في خطأ.',
    coreStrategy: 'Reframe mistakes as proof of brain plasticity. Native speakers make grammatical errors all the time.',
    coreStrategyAr: 'إعادة برمجة العقل بأن الخطأ دليل على التعلّم؛ حتى المتحدثون الأصليون لا يطبقون كل القواعد بدقة.',
    dailyHabit: 'Record a 60-second voice note describing your morning in English without stopping or deleting.',
    dailyHabitAr: 'تسجيل مقطع صوتي يومي لنفسك لمدة 60 ثانية تصف فيه يومك دون توقف ودون حذف التسجيل.',
    recommendedTools: ['Voice Memos', 'Otter.ai', 'ChatGPT Voice Mode'],
    keyTopics: ['Perfectionism detox', 'Communication over perfection', 'Accepting accent identity']
  },

  // Phase 2
  {
    id: 'e05',
    title: 'The Power of Collocations (Natural Word Pairs)',
    titleAr: 'قوة المتلازمات اللفظية (Collocations)',
    category: 'Vocabulary',
    level: 'Intermediate',
    durationWeeks: '2 Weeks',
    tagline: 'Never learn words in isolation. Learn words in the natural pairs native speakers use.',
    taglineAr: 'لا تحفظ الكلمات منفردة أبداً! تعلم الكلمات في حزم وتراكيب جاهزة (مثل: make a decision وليس do a decision).',
    coreStrategy: 'Study word chunks: "make an effort", "catch a cold", "heavy rain", "bitterly cold".',
    coreStrategyAr: 'دراسة المتلازمات الشائعة التي تجعل كلامك ينساب بطبيعية ودون تفكير في الكلمة التالية.',
    dailyHabit: 'Collect 5 new collocations daily in Anki flashcards with complete example sentences.',
    dailyHabitAr: 'جمع 5 متلازمات لفظية يومياً في بطاقات Anki مع جملة كاملة توضح السياق.',
    recommendedTools: ['Ozdic Collocations Dictionary', 'AnkiApp', 'WordReference'],
    keyTopics: ['Verb + Noun chunks', 'Adjective + Noun pairs', 'Prepositional idioms', 'Avoiding literal translation']
  },
  {
    id: 'e06',
    title: 'Phrasal Verbs Demystified',
    titleAr: 'الأفعال المركبة الشائعة (Phrasal Verbs)',
    category: 'Vocabulary',
    level: 'Intermediate',
    durationWeeks: '1 Week',
    tagline: 'The true backbone of spoken conversational English.',
    taglineAr: 'العمود الفقري الحقيقي للغة المحادثة اليومية (turn down, figure out, come across).',
    coreStrategy: 'Group phrasal verbs by context or preposition (up, down, off, out) rather than alphabetical lists.',
    coreStrategyAr: 'حفظ الأفعال المركبة مجمعة حسب المعنى أو حرف الجر في سياق قصص حقيقية.',
    dailyHabit: 'Create a micro-story of 3 sentences using 3 different phrasal verbs every day.',
    dailyHabitAr: 'كتابة قصة قصيرة جداً من 3 جمل تستخدم فيها 3 أفعال مركبة بشكل يومي.',
    recommendedTools: ['Ludwig.guru', 'YouGlish', 'English Phrasal Verbs in Use'],
    keyTopics: ['Separable vs Inseparable', 'Literal vs Figurative meanings', 'Top 50 spoken phrasal verbs']
  },
  {
    id: 'e07',
    title: 'Sentence Pattern Instinct Without Grammar Stress',
    titleAr: 'بناء الجمل التلقائي دون تعقيد القواعد النحوية',
    category: 'Grammar',
    level: 'Intermediate',
    durationWeeks: '2 Weeks',
    tagline: 'Internalize grammar structures through repetition until they become muscle memory.',
    taglineAr: 'تحويل تراكيب الجمل إلى عادة لا شعورية بالتدريب، بدلاً من حفظ مصطلحات الأزمنة المعقدة.',
    coreStrategy: 'Learn sentence frames: "I have always wanted to...", "It turns out that...", "I was wondering if...".',
    coreStrategyAr: 'التدرب على قوالب جاهزة لبدء الجمل والتعبير عن الرأي والافتراض والتمني.',
    dailyHabit: 'Generate 5 variations of a single core sentence frame with different personal scenarios.',
    dailyHabitAr: 'تطبيق 5 تنويعات مختلفة على قالب جملة واحد بمواقف من حياتك اليومية.',
    recommendedTools: ['Grammarly', 'QuillBot', 'ChatGPT Conversation Prompts'],
    keyTopics: ['Conditional frames (If I had known...)', 'Passive voice in daily talk', 'Reported speech naturally']
  },
  {
    id: 'e08',
    title: 'The Shadowing Technique (Speech Mirroring)',
    titleAr: 'تقنية التظليل الصوتي (Shadowing Technique)',
    category: 'Fluency',
    level: 'Intermediate',
    durationWeeks: '1 Week',
    tagline: 'The gold standard technique used by simultaneous interpreters to achieve native-like flow.',
    taglineAr: 'التقنية الذهبية التي يستخدمها المترجمون الفوريون لمحاكاة سرعة ونبرة وتدفق المتحدث الأصلي.',
    coreStrategy: 'Listen to a native speaker and repeat their exact words with a 0.5-second delay, mimicking pitch.',
    coreStrategyAr: 'الاستماع لمقطع صوتي وتكرار الكلمات وراء المتحدث بتأخر نصف ثانية وبنفس النبرة والسرعة.',
    dailyHabit: 'Shadow a 2-minute TED Talk or podcast clip 3 times consecutively every morning.',
    dailyHabitAr: 'ممارسة التظليل الصوتي لمقطع مدته دقيقتان من TED Talk ثلاث مرات متتالية كل صباح.',
    recommendedTools: ['TED Talks (Subtitles)', 'YouTube 0.75x speed', 'Voice Memo Shadowing'],
    keyTopics: ['Echoic memory', 'Muscular articulation', 'Vocal pitch variation', 'Tempo control']
  },

  // Phase 3
  {
    id: 'e09',
    title: 'Stop Mental Translation: Thinking in English',
    titleAr: 'التفكير بالإنجليزية والتوقف التام عن الترجمة الذهنية',
    category: 'Fluency',
    level: 'Intermediate',
    durationWeeks: '2 Weeks',
    tagline: 'If you translate from Arabic before speaking, you will always hesitate.',
    taglineAr: 'إذا كنت تترجم في رأسك من العربية قبل أن تتكلم، فستظل تتلعثم وتتأخر دائماً في الرد.',
    coreStrategy: 'Narrate your daily mundane actions mentally in English from morning till night.',
    coreStrategyAr: 'تعويد عقلك على تسمية الأشياء وسرد أفعالك اليومية البسيطة بداخلك بالإنجليزية فور حدوثها.',
    dailyHabit: 'Spend 15 minutes narrating what you are doing: "I am pouring coffee, opening my laptop, replying to email".',
    dailyHabitAr: 'قضاء 15 دقيقة في سرد أفعالك الصامتة: "أنا الآن أعد القهوة، أفتح اللابتوب، أرد على الرسائل" بالإنجليزية.',
    recommendedTools: ['Monolingual Oxford Dictionary', 'Sticky Notes in English', 'Day One Journal'],
    keyTopics: ['Subvocalization', 'Name tagging environment', 'Internal monologue switch']
  },
  {
    id: 'e10',
    title: 'Conversational Connectors & Transition Phrases',
    titleAr: 'روابط الحديث وسد الفجوات (Fillers & Transitions)',
    category: 'Speaking',
    level: 'Intermediate',
    durationWeeks: '2 Weeks',
    tagline: 'How native speakers buy time to think without sounding awkward.',
    taglineAr: 'كيف يكسب المتحدثون الوقت للتفكير بطريقة ذكية وطبيعية (Honestly, To be fair, The thing is...).',
    coreStrategy: 'Master natural transition phrases instead of long silent pauses or saying "uhhhh".',
    coreStrategyAr: 'استخدام عبارات تمهيدية ذكية مثل: "Well, that is an interesting point...", "As a matter of fact...".',
    dailyHabit: 'Use 3 different transition phrases in casual voice chats or writing exercises.',
    dailyHabitAr: 'استخدام 3 عبارات ربط مختلفة في محادثاتك الصوتية أو تدريبات التحدث اليومية.',
    recommendedTools: ['Conversation Starters app', 'Discord Language Exchange', 'ChatGPT Roleplay'],
    keyTopics: ['Stalling phrases', 'Disagreeing politely', 'Adding nuance (Having said that, At the end of the day)']
  },
  {
    id: 'e11',
    title: 'Active Podcast & Audio Immersion',
    titleAr: 'الاستماع النشط للبودكاست والمحتوى اليومي',
    category: 'Listening',
    level: 'Intermediate',
    durationWeeks: '2 Weeks',
    tagline: 'Passive listening is not enough; train your ear to extract meaning at normal speed.',
    taglineAr: 'الاستماع السلبي أثناء النوم أو العمل لا يكفي؛ الاستماع النشط مع تدوين العبارات هو ما يصنع الفرق.',
    coreStrategy: 'Listen once without transcript, then second time reading along, noting down fresh idioms.',
    coreStrategyAr: 'الاستماع للمرة الأولى لمحاولة الفهم العام، ثم المرة الثانية مع قراءة النص وتدوين التعبيرات.',
    dailyHabit: 'Listen to 1 episode of an engaging English podcast during your daily commute.',
    dailyHabitAr: 'الاستماع لحلقة بودكاست واحدة بالإنجليزية أثناء التنقل أو ممارسة الرياضة يومياً.',
    recommendedTools: ['The Daily (NYTimes)', 'Huberman Lab', 'Lex Fridman', 'Spotify Podcasts'],
    keyTopics: ['Comprehensible input + 1', 'Summarizing audio in your own words', 'Accent diversity']
  },
  {
    id: 'e12',
    title: 'Daily AI Voice Conversations',
    titleAr: 'المحادثة الصوتية اليومية مع الذكاء الاصطناعي',
    category: 'Speaking',
    level: 'Intermediate',
    durationWeeks: '2 Weeks',
    tagline: 'Your personal 24/7 English conversational partner with zero judgment.',
    taglineAr: 'شريك محادثة متاح معك في أي لحظة، يصحح لك بهدوء دون أي إحراج أو خجل.',
    coreStrategy: 'Engage in 10-minute roleplay scenarios: job interview, debating a movie, explaining your passion.',
    coreStrategyAr: 'عمل محاكاة لمواقف حقيقية: مقابلة عمل، نقاش حول فيلم، حوار في مطار أو مؤتمر تقني.',
    dailyHabit: 'Conduct a 10-minute voice dialogue with ChatGPT or Claude discussing a topic you care about.',
    dailyHabitAr: 'محادثة صوتية لمدة 10 دقائق يومياً مع الذكاء الاصطناعي حول موضوع يهمك شخصياً.',
    recommendedTools: ['ChatGPT Advanced Voice', 'Pi.ai', 'Speak App'],
    keyTopics: ['Roleplaying scenarios', 'Real-time correction requests', 'Spontaneous storytelling']
  },

  // Phase 4
  {
    id: 'e13',
    title: 'Connected Speech & Word Reduction',
    titleAr: 'الكلام السريع المتصل ودمج الكلمات (Connected Speech)',
    category: 'Listening',
    level: 'Advanced',
    durationWeeks: '2 Weeks',
    tagline: 'Why "What are you going to do?" sounds like "Whatcha gonna do?".',
    taglineAr: 'لماذا تبدو الكلمات في الأفلام والحديث السريع مختلفة تماماً عما درسته في الكتب المدرسية؟',
    coreStrategy: 'Study linking sounds (consonant to vowel), elision (dropped sounds), and assimilation.',
    coreStrategyAr: 'فهم قواعد إدغام الأصوات وإسقاط الحروف في الكلام العفوي السريع لفك شفرة الاستماع.',
    dailyHabit: 'Transcribe 30 seconds of fast movie dialogue and analyze where sounds are connected or dropped.',
    dailyHabitAr: 'كتابة نص 30 ثانية من مشهد فيلم سريع وملاحظة أين دُمجت الكلمات وأين أُسقطت الحروف.',
    recommendedTools: ['YouGlish', 'Filmarks English Clips', 'Hadars English Accents Way'],
    keyTopics: ['Linking /r/ and /w/', 'Flap /t/ in American English', 'Gonna, wanna, gotta, shoulda']
  },
  {
    id: 'e14',
    title: 'Idiomatic Mastery & Cultural Humor',
    titleAr: 'الأمثال والتعبيرات الاصطلاحية وروح الدعابة (Idioms)',
    category: 'Culture',
    level: 'Advanced',
    durationWeeks: '2 Weeks',
    tagline: 'The difference between someone who speaks English and someone who truly lives it.',
    taglineAr: 'الفرق الجوهري بين من يتحدث الإنجليزية بركاكة أكاديمية ومن يعيشها بروحها وثقافتها الطبيعية.',
    coreStrategy: 'Learn the historical backstory behind idioms (e.g., "bite the bullet", "cut corners").',
    coreStrategyAr: 'معرفة القصة وراء التعبير الاصطلاحي لترسيخه في الذاكرة دون نسيان مدى الحياة.',
    dailyHabit: 'Integrate 1 idiom into your daily journal or conversation with friends.',
    dailyHabitAr: 'توظيف مثل أو تعبير اصطلاحي واحد في كتابتك أو محادثاتك كل يوم.',
    recommendedTools: ['Urban Dictionary', 'The Idioms Encyclopedia', 'Sitcoms (Friends, The Office)'],
    keyTopics: ['Workplace metaphors', 'Understatement in British English', 'Irony and sarcasm markers']
  },
  {
    id: 'e15',
    title: 'Professional Technical & Business English',
    titleAr: 'الإنجليزية الاحترافية واجتماعات العمل العالمية',
    category: 'Professional',
    level: 'Advanced',
    durationWeeks: '2 Weeks',
    tagline: 'Communicate with authority, clarity, and diplomatic tact in global workplace settings.',
    taglineAr: 'التحدث بثقة، ووضوح، ودبلوماسية في بيئات العمل العالمية والشركات متعددة الجنسيات.',
    coreStrategy: 'Replace informal phrasing with concise, confident business and technical language.',
    coreStrategyAr: 'استخدام أسلوب الإقناع المهني، وإدارة الاجتماعات، والتعبير عن الاعتراض بلباقة واحترافية.',
    dailyHabit: 'Draft professional emails or meeting summaries in English using clear action items.',
    dailyHabitAr: 'صياغة ملخصات ورسائل مهنية موجزة ومحددة تركز على النتائج المباشرة.',
    recommendedTools: ['Harvard Business Review (HBR)', 'LinkedIn Learning', 'Grammarly Business'],
    keyTopics: ['Diplomatic language ("I see your point, however...")', 'Pitching ideas', 'Negotiation phrasing']
  },
  {
    id: 'e16',
    title: 'Public Speaking & Storytelling Mastery',
    titleAr: 'الإلقاء وسرد القصص والعروض التقديمية (Storytelling)',
    category: 'Mastery',
    level: 'Advanced',
    durationWeeks: '2 Weeks',
    tagline: 'Captivate any audience, lead presentations, and inspire people with your voice.',
    taglineAr: 'القدرة على أسر انتباه أي جمهور، وتقديم عروض مبهرة، وسرد قصص ملهمة بصوت واثق.',
    coreStrategy: 'Use the 3-act storytelling structure: Hook the problem, build the struggle, deliver the resolution.',
    coreStrategyAr: 'استخدام هيكل القصة الثلاثي: جذب الانتباه بالمشكلة، تصعيد التحدي، ثم تقديم الحل الملهم.',
    dailyHabit: 'Deliver a 3-minute presentation aloud on any topic, recording video and reviewing body language.',
    dailyHabitAr: 'إلقاء عرض تقديمي مصور لنفسك بالفيديو لمدة 3 دقائق يومياً ومراجعة لغة الجسد والنبرة.',
    recommendedTools: ['Toastmasters International', 'TED Masterclass', 'Yoodli AI Speech Coach'],
    keyTopics: ['The Hook', 'Vocal variety and pauses', 'Body language synchronization', 'Q&A handling']
  }
];
