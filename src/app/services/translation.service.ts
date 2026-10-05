import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'ar';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation - My Mind (عقلي)
  'nav.brandTitle': { en: 'MY MIND', ar: 'عقلي' },
  'nav.brandSub': { en: 'Personal Second Brain', ar: 'عقلي الرقمي المفتوح' },
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.tech': { en: 'Tech & AI', ar: 'الفص التقني' },
  'nav.cinema': { en: 'Cinema', ar: 'السينما' },
  'nav.library': { en: 'Library', ar: 'المكتبة' },
  'nav.languages': { en: 'Languages', ar: 'اللغات' },
  'nav.principles': { en: 'Principles', ar: 'المبادئ' },
  'nav.roadmap': { en: 'Tech Roadmap', ar: 'خارطة التقنية' },
  'nav.courseMatrix': { en: 'Course Matrix', ar: 'مصفوفة الكورسات' },
  'nav.missingSkills': { en: 'Missing Skills', ar: 'المهارات المفقودة' },
  'nav.projects': { en: 'Projects', ar: 'المشاريع' },
  'nav.resources': { en: 'Resources', ar: 'المصادر' },
  'nav.interview': { en: 'Interview', ar: 'المقابلات' },
  'nav.jobReady': { en: 'Job Ready', ar: 'جاهزية الوظيفة' },
  'nav.search': { en: 'Search...', ar: 'بحث في عقلي...' },
  'nav.searchHint': { en: 'Ctrl+K', ar: 'Ctrl+K' },
  'nav.stagesDone': { en: 'Done', ar: 'مكتمل' },
  'nav.checks': { en: '21 Checks', ar: '21 فحص' },

  // Hero Section
  'hero.badge': { en: 'Interactive 2026 Curriculum · Synthesized from 3 Master Curricula', ar: 'منهج تفاعلي متطور 2026 · مُستخلص من 3 كورسات متخصصة' },
  'hero.titlePrefix': { en: 'Become a Production', ar: 'احترف هندسة' },
  'hero.titleAccent': { en: 'AI Engineer', ar: 'الذكاء الاصطناعي (AI Engineer)' },
  'hero.subtitle': { en: 'From Python & Deep Learning to Multi-Cloud Terraform, LangGraph & MCP', ar: 'من بايثون والتعلم العميق إلى بنية الحوسبة السحابية و LangGraph و MCP' },
  'hero.desc': {
    en: 'An empirical educational roadmap built directly on the curricula of 3 comprehensive Generative AI courses. Features 26 milestone stages, course attribution badges, transparent gap analysis, 12 flagship projects, and an interactive 21-point hiring rubric.',
    ar: 'خارطة طريق تعليمية موثقة مبنية على تفريغ وتحليل 3 كورسات شاملة في الذكاء الاصطناعي التوليدي. تتضمن 26 مرحلة دراسية، مصادر المحاضرات، تحليل الفجوات، 12 مشروعاً إنتاجياً، وقائمة مراجعة للتوظيف من 21 نقطة.'
  },
  'hero.btnRoadmap': { en: 'Explore Roadmap', ar: 'استكشف خريطة الطريق' },
  'hero.btnProjects': { en: 'View Projects (12)', ar: 'تصفح المشاريع (12)' },
  'hero.btnMatrix': { en: '3-Course Matrix', ar: 'مصفوفة الكورسات الثلاثة' },
  'hero.btnMissing': { en: "What's Missing?", ar: 'ما الذي ينقص الكورسات؟' },
  'hero.btnJobReady': { en: '21 Job Checks', ar: 'تقييم الجاهزية للوظيفة' },

  // Stats
  'stats.stages': { en: 'Learning Stages', ar: 'مرحلة تعليمية' },
  'stats.topics': { en: 'Curriculum Topics', ar: 'موضوع دراسي تفصيلي' },
  'stats.projects': { en: 'Course Projects', ar: 'مشروع عملي من الكورسات' },
  'stats.courses': { en: 'Courses Synthesized', ar: 'كورسات تم دمجها' },

  // Preview Journey Flow
  'journey.badge': { en: 'Curriculum Flow', ar: 'مسار التدفق التعليمي' },
  'journey.nodes': { en: 'Milestone Nodes', ar: 'محطة رئيسية' },
  'journey.title': { en: 'Representative Trajectory', ar: 'المسار الهندسي النموذجي' },
  'journey.desc': {
    en: 'Explore how topics advance progressively from programming fundamentals to cloud-native autonomous systems.',
    ar: 'اكتشف كيف يتدرج المنهج من أساسيات البرمجة وصولاً إلى الأنظمة الذاتية والنشر السحابي.'
  },
  'journey.btnViewAll': { en: 'View Complete 26-Stage Roadmap', ar: 'عرض خارطة الطريق الكاملة (26 مرحلة)' },

  // Course Synergy Section
  'synergy.badge': { en: 'Tri-Curriculum Synergy', ar: 'تكامل الكورسات الثلاثة' },
  'synergy.title': { en: 'Synthesizing 3 Master AI Curricula', ar: 'تكامل وتوحيد محتوى 3 كورسات رائدة' },
  'synergy.desc': {
    en: 'No single course covers everything an AI Engineer needs. We unified three complementary industry curricula into one seamless progression:',
    ar: 'لا يوجد كورس واحد يغطي بمفرده كل ما يحتاجه مهندس الذكاء الاصطناعي. قمنا بتوحيد ثلاثة مناهج مكملة لبعضها في مسار واحد متسلسل ومترابط:'
  },
  'course1.title': { en: 'Deep Learning & LLM Core', ar: 'أساسيات التعلم العميق ونماذج اللغة' },
  'course1.desc': {
    en: 'Covers Python, PyTorch, ANN, CNN, RNN/LSTM, Transformers, HuggingFace fine-tuning, LangChain, Groq LPU, Neo4j Knowledge Graphs, and CrewAI multi-agents.',
    ar: 'يغطي لغة Python، و PyTorch، والشبكات العصبية، ونماذج التتابع (LSTM)، ومحولات Transformers، والضبط الدقيق على HuggingFace، و LangChain، وقواعد Neo4j، و CrewAI.'
  },
  'course1.meta': { en: '56 Sections · 258 Lectures', ar: '56 قسماً · 258 محاضرة' },

  'course2.title': { en: 'Advanced RAG & LangGraph Workflows', ar: 'تقنيات الـ RAG المتقدمة وسير العمل بـ LangGraph' },
  'course2.desc': {
    en: 'Specializes in production ingestion pipelines, Semantic Chunking, BM25 Hybrid Retrieval, MMR, HyDE, Multimodal RAG with ColPali/Qwen, and Corrective RAG (CRAG) with LangGraph.',
    ar: 'متخصص في خطوط معالجة البيانات، والتقطيع الدلالي (Semantic Chunking)، والبحث الهجين (Hybrid Search)، و ColPali للوسائط المتعددة، و CRAG الذاتي مع LangGraph.'
  },
  'course2.meta': { en: '30 Sections · 141 Lectures', ar: '30 قسماً · 141 محاضرة' },

  'course3.title': { en: 'Production AI, Cloud & DevOps Engineering', ar: 'هندسة الإنتاج والحوسبة السحابية و DevOps' },
  'course3.desc': {
    en: 'Takes AI to enterprise scale: FastAPI async microservices, Docker multi-stage, AWS Bedrock, SageMaker, Terraform multi-environment, CI/CD pipelines, MCP protocol, and Langfuse tracing.',
    ar: 'ينقل الذكاء الاصطناعي للبيئة المؤسسية: خدمات FastAPI السريعة، وحاويات Docker، وخدمات AWS Bedrock، وبنية Terraform، وبروتوكول MCP، وتتبع الأداء بـ Langfuse.'
  },
  'course3.meta': { en: '4 Sections · 124 Lectures', ar: '4 أسابيع · 124 محاضرة' },

  // Feature Cards Row
  'cardMatrix.title': { en: 'Course Skill Coverage Matrix', ar: 'مصفوفة مقارنة مهارات الكورسات' },
  'cardMatrix.sub': { en: 'Compare 30+ competencies across all 3 courses', ar: 'قارن أكثر من 30 مهارة تقنية بين الكورسات الثلاثة' },
  'cardMatrix.desc': {
    en: 'Explore an empirical side-by-side table showing whether each competency is Strong, Partial, or Missing in Course 1, Course 2, and Course 3.',
    ar: 'جدول مقارنة موضوعي يوضح ما إذا كانت كل مهارة مغطاة بقوة (Strong)، أو جزئياً (Partial)، أو مفقودة (Missing) في كل كورس.'
  },
  'cardMatrix.btn': { en: 'Open Comparison Matrix', ar: 'فتح مصفوفة المقارنة' },

  'cardMissing.title': { en: 'Curriculum Gap Analysis', ar: 'تحليل الفجوات والمهارات غير المغطاة' },
  'cardMissing.sub': { en: "What online courses still don't teach you", ar: 'ما لا تزال الكورسات تفتقده في سوق العمل' },
  'cardMissing.desc': {
    en: 'Transparent breakdown of missing skills: distributed vLLM inference, streaming WebSockets, synthetic data pipelines, and prompt injection defense.',
    ar: 'تفصيل صريح للمهارات التي لا تغطيها الكورسات: الاستدلال الموزع مع vLLM، تدفق البيانات عبر WebSockets، وتوليد البيانات الاصطناعية، والحماية من حقن الأوامر.'
  },
  'cardMissing.btn': { en: 'Explore Missing Skills Guide', ar: 'استكشف دليل المهارات المفقودة' },

  // Stages Grid Overview
  'grid.badge': { en: 'Complete Curriculum', ar: 'المنهج الدراسي الكامل' },
  'grid.title': { en: 'All 26 Learning Stages', ar: 'كافة المراحل التعليمية الـ 26' },
  'grid.sub': { en: 'From foundational Python code to multi-cloud Terraform infrastructure and autonomous agents', ar: 'من شفرات بايثون التأسيسية إلى بنية Terraform السحابية والوكلاء الأذكياء' },
  'grid.openRoadmap': { en: 'Open Interactive Roadmap View', ar: 'عرض المسار التفاعلي الكامل' },

  // CTA Banner
  'cta.title': { en: 'Ready to Build Production AI Systems?', ar: 'جاهز لبناء وتطوير أنظمة ذكاء اصطناعي إنتاجية؟' },
  'cta.desc': {
    en: 'Explore the 26 connected milestones, compare the 3 course curricula, study the transparent gap analysis, build 12 flagship projects, and pass the 21-point hiring rubric.',
    ar: 'استكشف الـ 26 محطة، وقارن مناهج الكورسات الثلاثة، وادرس الفجوات المعرفية، وأنجز 12 مشروعاً رائداً لتجتاز معايير التوظيف الـ 21 بنجاح.'
  },
  'cta.launchRoadmap': { en: 'Launch Roadmap', ar: 'افتح خارطة الطريق' },
  'cta.viewMatrix': { en: 'View Course Matrix', ar: 'مصفوفة الكورسات' },
  'cta.hiringRubric': { en: '21-Point Hiring Rubric', ar: 'معايير التوظيف الـ 21' },

  // Roadmap Page Specifics
  'roadmap.headerBadge': { en: 'Visual Interactive Path', ar: 'مسار بصري وتفاعلي' },
  'roadmap.headerSubBadge': { en: 'Synthesized from 3 Master Curricula', ar: 'مُستخلص من 3 كورسات متخصصة' },
  'roadmap.title': { en: 'AI Engineer Learning Roadmap', ar: 'خارطة طريق مهندس الذكاء الاصطناعي' },
  'roadmap.desc': {
    en: '26 milestone stages from Python fundamentals and neural nets to production RAG, LangGraph agents, multi-cloud Terraform, and enterprise observability.',
    ar: '26 محطة تبدأ من بايثون والشبكات العصبية وصولاً إلى الـ RAG والوكلاء المتقدمين بـ LangGraph، وبنية Terraform السحابية وتتبع الأداء.'
  },
  'roadmap.yourProgress': { en: 'Your Roadmap Progress', ar: 'مستوى تقدمك في الخارطة' },
  'roadmap.completed': { en: 'Completed', ar: 'مكتمل' },
  'roadmap.filterPlaceholder': { en: 'Filter stages, tools, or lectures...', ar: 'تصفية المراحل أو الأدوات أو المحاضرات...' },
  'roadmap.showingStages': { en: 'Showing', ar: 'عرض' },
  'roadmap.ofStages': { en: 'of', ar: 'من أصل' },
  'roadmap.stagesWord': { en: 'stages', ar: 'مراحل' },
  'roadmap.reset': { en: 'Reset', ar: 'إعادة ضبط' },
  'roadmap.courseFilter': { en: 'Course:', ar: 'الكورس:' },
  'roadmap.coverageFilter': { en: 'Coverage:', ar: 'التغطية:' },
  'roadmap.noMatches': { en: 'No stages match your active filter criteria.', ar: 'لا توجد مراحل تطابق معايير التصفية الحالية.' },
  'roadmap.clearFilters': { en: 'Clear Filters', ar: 'مسح الفلاتر' },
  'roadmap.viewFlow': { en: 'Interactive Flow', ar: 'المسار التفاعلي' },
  'roadmap.viewGrid': { en: 'Board Grid', ar: 'شبكة البطاقات' },
  'roadmap.viewTable': { en: 'Tracker Table', ar: 'جدول المتابعة' },
  'roadmap.quickJump': { en: 'Phase Navigator', ar: 'مسار المراحل' },
  'roadmap.expandAll': { en: 'Expand All', ar: 'توسيع الكل' },
  'roadmap.collapseAll': { en: 'Collapse All', ar: 'طي الكل' },
  'roadmap.phasePrefix': { en: 'Phase', ar: 'المرحلة' },
  'roadmap.stagePrefix': { en: 'Stage', ar: 'المحطة' },
  'roadmap.showTopics': { en: 'Topics', ar: 'الموضوعات' },
  'roadmap.hideTopics': { en: 'Hide Topics', ar: 'إخفاء الموضوعات' },
  'roadmap.nextStage': { en: 'Next Stage', ar: 'المحطة التالية' },
  'roadmap.phaseComplete': { en: 'Phase Complete', ar: 'اكتملت المرحلة' },
  'roadmap.proceedTo': { en: 'Proceeding to', ar: 'الانتقال إلى' },
  'roadmap.openDeepDive': { en: 'Open Full Stage Deep Dive Page', ar: 'عرض صفحة الشرح المفصل للمرحلة' },
  'roadmap.whatIsIt': { en: 'WHAT IS IT?', ar: 'ما هو المفهوم؟' },
  'roadmap.whyNeeded': { en: 'WHY NEEDED IN PRODUCTION?', ar: 'لماذا تحتاجه في بيئة العمل والإنتاج؟' },
  'roadmap.whatMissing': { en: 'WHAT IS STILL MISSING / EXTERNAL STUDY:', ar: 'المهارات المفقودة / دراسة خارجية موصى بها:' },
  'roadmap.whatCoursesCover': { en: 'What the 3 Courses Cover', ar: 'ما تغطيه الكورسات الثلاثة بالضبط' },
  'roadmap.practicalTask': { en: 'HANDS-ON PRACTICAL TASK:', ar: 'المهمة والتطبيق العملي:' },
  'roadmap.projectConn': { en: 'PROJECT CONNECTION:', ar: 'الارتباط بالمشاريع:' },
  'roadmap.interviewFocus': { en: 'Targeted Interview Questions', ar: 'أسئلة المقابلات التقنية المستهدفة' },
  'roadmap.revealStrategy': { en: 'Reveal Strategy', ar: 'إظهار استراتيجية الإجابة' },
  'roadmap.hideStrategy': { en: 'Hide Strategy', ar: 'إخفاء الاستراتيجية' },
  'roadmap.interviewResp': { en: 'Strategic Interview Response:', ar: 'الإجابة التكتيكية النموذجية في المقابلة:' },
  'roadmap.curriculumTopics': { en: 'Curriculum Topics', ar: 'موضوعات المنهج' },
  'roadmap.milestoneChecklist': { en: 'Milestone Checklist (What To Learn)', ar: 'قائمة التحقق للمرحلة (ما ستتعلمه)' },
  'roadmap.markDone': { en: 'Mark Done', ar: 'تحديد كمكتمل' },
  'roadmap.topicsCount': { en: 'Topics', ar: 'موضوعات' },

  // Filters Categories
  'filter.all': { en: 'All', ar: 'الكل' },
  'filter.foundations': { en: 'Foundations', ar: 'الأساسيات' },
  'filter.deepLearning': { en: 'Deep Learning', ar: 'التعلم العميق' },
  'filter.genai': { en: 'GenAI & LLMs', ar: 'النماذج اللغوية و GenAI' },
  'filter.rag': { en: 'RAG', ar: 'أنظمة RAG' },
  'filter.agents': { en: 'Autonomous Agents', ar: 'الوكلاء الأذكياء' },
  'filter.evaluation': { en: 'Evaluation', ar: 'التقييم والقياس' },
  'filter.production': { en: 'Production', ar: 'الأنظمة الإنتاجية' },
  'filter.cloudDevOps': { en: 'Cloud & DevOps', ar: 'السحابة و DevOps' },

  // Coverage Statuses
  'cov.covered': { en: 'Covered', ar: 'مغطى' },
  'cov.partial': { en: 'Partially Covered', ar: 'مغطى جزئياً' },
  'cov.notCovered': { en: 'Not Covered', ar: 'غير مغطى' },

  // Common UI Buttons
  'btn.viewProject': { en: 'View Full Architecture & Code', ar: 'عرض المعمارية والكود البرمجي' },
  'btn.previous': { en: 'Previous', ar: 'السابق' },
  'btn.next': { en: 'Next', ar: 'التالي' },
  'btn.search': { en: 'Search', ar: 'بحث' },

  // Study Planner & Time Calculator
  'planner.badge': { en: 'Interactive Study Planner', ar: 'حاسبة وخطة وتيرة الدراسة' },
  'planner.title': { en: 'Personalize Your Study Pace', ar: 'خطتك المخصصة وحساب الوقت المتبقي' },
  'planner.subtitle': { 
    en: 'Configure your daily hours and weekly schedule to calculate your remaining study hours, remaining weeks, and projected graduation date.', 
    ar: 'حدد ساعات دراستك اليومية وأيامك أسبوعياً لحساب الساعات المتبقية، والأسابيع، وتاريخ تخرجك المتوقع بدقة.' 
  },
  'planner.dailyHours': { en: 'Daily Study Hours', ar: 'ساعات الدراسة يومياً' },
  'planner.daysPerWeek': { en: 'Study Days / Week', ar: 'أيام الدراسة في الأسبوع' },
  'planner.hours': { en: 'hours', ar: 'ساعات' },
  'planner.days': { en: 'days', ar: 'أيام' },
  'planner.totalCurriculum': { en: 'Total Curriculum', ar: 'إجمالي ساعات المنهج' },
  'planner.completedTime': { en: 'Completed Time', ar: 'الساعات المنجزة' },
  'planner.remainingTime': { en: 'Remaining Time', ar: 'الساعات المتبقية' },
  'planner.remainingWeeks': { en: 'Weeks Remaining', ar: 'الأسابيع المتبقية' },
  'planner.remainingDays': { en: 'Est. Days Remaining', ar: 'الأيام المتبقية' },
  'planner.weeklyCommitment': { en: 'Weekly Commitment', ar: 'الالتزام الأسبوعي' },
  'planner.targetDate': { en: 'Projected Completion Date', ar: 'تاريخ الإتمام المتوقع' },
  'planner.paceStatus': { en: 'Pace Velocity', ar: 'مؤشر وتيرة الإنجاز' },
  'planner.savePlan': { en: 'Save Plan to Browser', ar: 'حفظ الخطة في المتصفح' },
  'planner.planSaved': { en: 'Plan saved in your browser session!', ar: 'تم حفظ خطتك في المتصفح!' },
  'planner.presetCasual': { en: 'Casual (1h/day, 4 days)', ar: 'هادئ (1 س/يوم، 4 أيام)' },
  'planner.presetStandard': { en: 'Standard (2h/day, 5 days)', ar: 'قياسي (2 س/يوم، 5 أيام)' },
  'planner.presetIntensive': { en: 'Intensive (4h/day, 6 days)', ar: 'مكثف (4 س/يوم، 6 أيام)' },
  'planner.presetBootcamp': { en: 'Bootcamp (6h/day, 6 days)', ar: 'معسكر (6 س/يوم، 6 أيام)' },

  // Session Management & Persistence
  'session.badge': { en: 'Zero-Backend Local-First Session', ar: 'جلسة محلية خاصة بدون خوادم' },
  'session.title': { en: 'Session & Progress Manager', ar: 'إدارة وحفظ الجلسة والتقدم' },
  'session.desc': {
    en: 'Your learning progress and study plan are stored directly in your browser localStorage. No sign-up, tracking, or cloud databases required. You can export a portable JSON file to back up or resume on any computer.',
    ar: 'يُحفظ تقدمك التعليمي وخطة دراستك محلياً في متصفحك. لا حاجة لتسجيل حساب أو خوادم خارجية. يمكنك تصدير ملف JSON خفيف للنسخ الاحتياطي أو المتابعة من جهاز آخر بنقرة واحدة.'
  },
  'session.autoSaved': { en: 'Auto-Saved to Browser', ar: 'محفوظ تلقائياً في المتصفح' },
  'session.lastSaved': { en: 'Last Saved:', ar: 'آخر حفظ:' },
  'session.exportBtn': { en: 'Export Session (JSON)', ar: 'تصدير الجلسة (JSON)' },
  'session.importBtn': { en: 'Import Session (JSON)', ar: 'استيراد جلسة (JSON)' },
  'session.resetBtn': { en: 'Reset All Progress', ar: 'إعادة تعيين الجلسة والتقدم' },
  'session.resetConfirm': { 
    en: 'Are you sure you want to reset all completed stages, checklist items, and study plans? This action cannot be undone.', 
    ar: 'هل أنت متأكد من رغبتك في حذف كل تقدمك والمراحل المكتملة وقائمة التقييم؟ لا يمكن التراجع عن هذا الإجراء.' 
  },
  'session.importPrompt': { en: 'Upload a session JSON file to restore your progress:', ar: 'اختر ملف JSON للجلسة لاسترجاع تقدمك السابق:' },
  'session.uploadFile': { en: 'Select JSON File', ar: 'اختيار ملف JSON' },
  'session.howItWorksTitle': { en: 'How Session Saving Works?', ar: 'كيف يتم حفظ جلستك في الموقع؟' },
  'session.howItWorks1': { en: '1. Local-First: All stage checkboxes and study parameters persist automatically in localStorage.', ar: '1. تخزين محلي (Local-First): تُحفظ خياراتك والمراحل فوراً في ذاكرة المتصفح دون وسيط.' },
  'session.howItWorks2': { en: '2. Absolute Privacy: No backend database, user accounts, or telemetry exist.', ar: '2. خصوصية مطلقة: لا نطلب بريداً إلكترونياً أو كلمات مرور ولا نجمع أي بيانات.' },
  'session.howItWorks3': { en: '3. Full Portability: Click Export to carry your journey to work laptops, home PCs, or new browsers.', ar: '3. سهولة التنقل: اضغط "تصدير" لتحمل تقدمك إلى جهاز عملك أو هاتفك وتستورده فوراً.' },
  'session.navBtn': { en: 'Session & Planner', ar: 'الجلسة والخطة' },
  'session.manageSession': { en: 'Manage Session', ar: 'إدارة الجلسة' },
  'session.downloadSuccess': { en: 'Session exported successfully!', ar: 'تم تصدير ملف الجلسة بنجاح!' },

  // Career Tracks Section
  'tracks.badge': { en: 'Tailored Specialization Pathways', ar: 'مسارات التخصص الوظيفي' },
  'tracks.title': { en: 'Target Career Tracks & Pathways', ar: 'المسارات التخصصية المستهدفة في سوق العمل' },
  'tracks.subtitle': { 
    en: 'Different roles emphasize different stages of the roadmap. Pick your desired career focus to prioritize your effort.', 
    ar: 'تختلف متطلبات الوظائف باختلاف تخصصك. اختر مسارك المستهدف لتركيز جهدك ومشاريعك على ما يطلبه سوق العمل بدقة.' 
  },
  'tracks.fullstackTitle': { en: 'Full-Stack AI Engineer', ar: 'مهندس ذكاء اصطناعي شامل (Full-Stack AI)' },
  'tracks.fullstackDesc': { 
    en: 'Master the entire spectrum from Python and PyTorch through advanced RAG, LangGraph agents, multi-cloud AWS, and CI/CD pipelines.', 
    ar: 'إتقان المسار التكاملي من بايثون والتعلم العميق مروراً بأنظمة RAG والوكلاء والنشر السحابي وبنية CI/CD المؤسسية.' 
  },
  'tracks.ragTitle': { en: 'Production RAG Specialist', ar: 'أخصائي أنظمة البحث الدلالي والاسترجاع (RAG Specialist)' },
  'tracks.ragDesc': { 
    en: 'Specializes in semantic chunking, BM25 hybrid search, cross-encoders, multimodal retrieval, and self-reflective CRAG pipelines.', 
    ar: 'التركيز على تقطيع البيانات الدلالي، والبحث الهجين، وإعادة الترتيب، والبحث متعدد الوسائط، و CRAG المصحح ذاتياً.' 
  },
  'tracks.agentsTitle': { en: 'Autonomous Agent Architect', ar: 'مهندس أنظمة الوكلاء الذاتية (Agent Architect)' },
  'tracks.agentsDesc': { 
    en: 'Focuses on stateful LangGraph workflows, human-in-the-loop checkpoints, multi-agent CrewAI orchestration, and the MCP protocol.', 
    ar: 'التخصص في مسارات LangGraph المعقدة، والتحكم البشري، وتنسيق فرق الوكلاء المتعددة، وبروتوكول MCP الحديث.' 
  },
  'tracks.mlopsTitle': { en: 'Enterprise MLOps & Cloud Engineer', ar: 'مهندس حوسبة سحابية و MLOps للذكاء الاصطناعي' },
  'tracks.mlopsDesc': { 
    en: 'Deploys AI systems with multi-environment Terraform, multi-stage Docker, AWS Bedrock, SageMaker, CI/CD, and Langfuse tracing.', 
    ar: 'بناء البنية السحابية المؤسسية باستخدام Terraform، وحاويات Docker، وخدمات AWS Bedrock، وأتمتة CI/CD، وتتبع Langfuse.' 
  },
  'tracks.filterStages': { en: 'View Track Stages', ar: 'عرض مراحل هذا المسار' },
  'tracks.keyStages': { en: 'Key Stages:', ar: 'المراحل الأساسية:' },
  'tracks.estHours': { en: 'Est. Hours:', ar: 'الساعات المقدرة:' },

  // Job Ready Page
  'jobReady.badge': { en: 'Stage 26 · Comprehensive 21-Point Self-Assessment Rubric', ar: 'المرحلة 26 · معايير التقييم الذاتي الشاملة للتوظيف (21 بنداً)' },
  'jobReady.title': { en: 'Are You Job Ready?', ar: 'هل أنت جاهز لسوق العمل؟' },
  'jobReady.desc': { 
    en: 'Audit your skills against our comprehensive hiring rubric. Mark off competencies as you master them and discover when it is time to start submitting applications.', 
    ar: 'قيّم مهاراتك التقنية بدقة مقابل معايير التوظيف الفعلية في الشركات. حدد المهارات المتقنة واعرف متى تكون جاهزاً للتقديم بثقة.' 
  },
  'jobReady.verified': { en: 'Verified', ar: 'تم التحقق' },
  'jobReady.curriculumVerified': { en: 'Curriculum Verified', ar: 'تم التحقق من المنهج' },
  'jobReady.resetBtn': { en: 'Reset Checklist', ar: 'إعادة ضبط القائمة' },
  'jobReady.disclaimer': { en: '*Reflects self-audited curriculum mastery based on 3 course syntheses.', ar: '*يعكس تقييمك الذاتي لإتقان مهارات الكورسات الثلاثة.' },
  'jobReady.done': { en: 'Done', ar: 'منجز' },

  // Interview Page
  'interview.badge': { en: 'Senior & Staff Technical Screening', ar: 'أسئلة المقابلات التقنية للمستوى المتقدم والمحترف' },
  'interview.title': { en: 'AI Engineer Technical Interview Guide', ar: 'دليل مقابلات مهندس الذكاء الاصطناعي التقنية' },
  'interview.desc': { 
    en: 'Deep, multi-perspective interview questions with production trade-offs, architecture patterns, and strategic response breakdowns.', 
    ar: 'أسئلة مقابلات تقنية عميقة تركز على المقايضات الهندسية الفعلية، والأنماط المعمارية، واستراتيجيات الإجابة النموذجية.' 
  },

  // Projects Page
  'projects.badge': { en: 'Portfolio-Grade Systems', ar: 'مشاريع عملية بمستوى احترافي' },
  'projects.title': { en: 'Flagship AI Engineering Projects', ar: 'المشاريع الإنتاجية الرائدة في المسار' },
  'projects.desc': { 
    en: '12 end-to-end projects covering deep learning, advanced RAG, multi-agent frameworks, and cloud-native deployments.', 
    ar: '12 مشروعاً متكاملاً تغطي التعلم العميق، وأنظمة RAG المتقدمة، وأطر عمل الوكلاء، والنشر السحابي المؤتمت.' 
  },

  // Missing Skills Page
  'missingSkills.badge': { en: 'Honest Curriculum Audit', ar: 'مراجعة نقدية صريحة للمناهج' },
  'missingSkills.title': { en: 'Curriculum Gap Analysis & Missing Skills', ar: 'تحليل الفجوات والمهارات التي تغفلها الكورسات' },
  'missingSkills.desc': { 
    en: 'A transparent breakdown of production topics omitted or lightly covered across online courses, with self-study action plans.', 
    ar: 'تحليل تفصيلي شفاف للمفاهيم الإنتاجية الحيوية التي لا تشرحها الكورسات التقليدية، مع خطط عملية لدراستها ذاتياً.' 
  },

  // Footer
  'footer.desc': {
    en: 'A comprehensive, concept-first engineering guide for mastering Python, Machine Learning, Deep Learning, LLMs, RAG, Autonomous Agents, and Production AI.',
    ar: 'دليل هندسي شامل مبني على الفهم المعماري لإتقان بايثون والتعلم العميق وأنظمة الـ RAG والوكلاء المستقلين وهندسة الإنتاج.'
  },
  'footer.noAuth': { en: 'No Auth Required', ar: 'بدون تسجيل دخول' },
  'footer.openEdu': { en: 'Open Educational Resource', ar: 'مورد تعليمي مفتوح' },
  'footer.quickPath': { en: 'Roadmap Path', ar: 'محطات الخارطة' },
  'footer.resourcesTitle': { en: 'Resources', ar: 'المصادر والمشاريع' },
  'footer.techTitle': { en: 'Engineered With', ar: 'مبني باستخدام' },
  'footer.techDesc': {
    en: 'Designed as a modern developer platform with zero telemetry or backend lock-in. Vercel deployment ready.',
    ar: 'مُصمم كمنصة تطوير حديثة بدون أي تتبع أو قفل خلفي. مهيأ تماماً للنشر على Vercel.'
  },
  'footer.copyright': {
    en: '© 2026 AI Engineer Roadmap. Built for self-taught engineers and career switchers.',
    ar: '© 2026 خارطة طريق مهندس الذكاء الاصطناعي. صُممت للمتعلمين ذاتياً والراغبين في التحول المهني.'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'ai_roadmap_lang';
  private langSubject = new BehaviorSubject<Language>('en');
  public currentLang$ = this.langSubject.asObservable();

  constructor() {
    this.initLanguage();
  }

  private initLanguage(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Language | null;
    const initialLang: Language = (saved === 'ar' || saved === 'en') ? saved : 'en';
    this.setLanguage(initialLang);
  }

  public get currentLanguage(): Language {
    return this.langSubject.value;
  }

  public get currentLang(): Language {
    return this.langSubject.value;
  }

  public get isRtl(): boolean {
    return this.langSubject.value === 'ar';
  }

  public setLanguage(lang: Language): void {
    this.langSubject.next(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    if (lang === 'ar') {
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
    }
  }

  public toggleLanguage(): void {
    const nextLang: Language = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }

  public t(key: string, fallback?: string): string {
    const lang = this.currentLanguage;
    const entry = TRANSLATIONS[key];
    if (entry && entry[lang]) {
      return entry[lang];
    }
    return fallback || key;
  }
}
