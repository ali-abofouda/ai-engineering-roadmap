import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface JobReadyItem {
  id: string;
  label: string;
  category: string;
  courseTag?: string;
  checked: boolean;
}

export const INITIAL_JOB_READY_ITEMS: Omit<JobReadyItem, 'checked'>[] = [
  // Programming
  { id: 'jr-python', label: 'Python (Syntax, Data Structures, Control Flow, Lambdas)', category: 'Programming', courseTag: 'COURSE 01' },
  { id: 'jr-oop', label: 'Object-Oriented Programming (Classes, Inheritance, Magic Methods)', category: 'Programming', courseTag: 'COURSE 01' },
  { id: 'jr-git', label: 'Git & GitHub (Version control, PRs, collaborative workflows)', category: 'Programming', courseTag: 'COURSE 01 + 03' },
  { id: 'jr-linux', label: 'Linux & Shell scripting (Environment setup, paths, CLI commands)', category: 'Programming', courseTag: 'COURSE 01 + 03' },
  { id: 'jr-apis', label: 'REST APIs & HTTP Protocols (Status codes, headers, SSE streaming)', category: 'Programming', courseTag: 'COURSE 03' },
  { id: 'jr-testing', label: 'Automated Testing & Environment isolation (uv, Conda, pytest)', category: 'Programming', courseTag: 'COURSE 01 + 02' },

  // AI & Deep Learning
  { id: 'jr-ml-fund', label: 'ML & NLP Fundamentals (Tokenization, Stemming, TF-IDF, Word2Vec)', category: 'AI Foundations', courseTag: 'COURSE 01' },
  { id: 'jr-dl-seq', label: 'Deep Learning & Sequence Models (ANN, Simple RNN, LSTM, GRU)', category: 'AI Foundations', courseTag: 'COURSE 01' },
  { id: 'jr-transformers', label: 'Transformers Architecture (Self-Attention, Multi-Head, Encoders/Decoders)', category: 'AI Foundations', courseTag: 'COURSE 01' },
  { id: 'jr-llms', label: 'LLMs & Open Source (Pretraining, Groq LPU, Ollama, Prompt Engineering)', category: 'AI Foundations', courseTag: 'COURSE 01 + 02' },

  // RAG & Retrieval
  { id: 'jr-basic-rag', label: 'Basic RAG (Document loaders, PDF/DOCX/CSV parsing, ChromaDB, FAISS)', category: 'RAG & Retrieval', courseTag: 'COURSE 01 + 02' },
  { id: 'jr-hybrid-search', label: 'Hybrid Search (Dense vector + Sparse BM25 fusion with RRF)', category: 'RAG & Retrieval', courseTag: 'COURSE 01 + 02' },
  { id: 'jr-reranking', label: 'Cross-Encoder Reranking & Maximal Marginal Relevance (MMR)', category: 'RAG & Retrieval', courseTag: 'COURSE 02' },
  { id: 'jr-query-enhance', label: 'Query Enhancement (HyDE, Query Expansion, Query Decomposition)', category: 'RAG & Retrieval', courseTag: 'COURSE 02' },
  { id: 'jr-adv-rag', label: 'Advanced RAG (Semantic Chunking, Multimodal RAG, PageIndex, CAG)', category: 'RAG & Retrieval', courseTag: 'COURSE 02' },
  { id: 'jr-rag-eval', label: 'RAG & Chatbot Evaluation (Test datasets, Evaluators, LLM-as-a-Judge)', category: 'RAG & Retrieval', courseTag: 'COURSE 02 + 03' },

  // Agents & LangGraph
  { id: 'jr-tools', label: 'Tools & Tool Calling (LangChain tools, SQL Database Toolkit, MCP)', category: 'Agents & LangGraph', courseTag: 'COURSE 01 + 02 + 03' },
  { id: 'jr-react', label: 'ReAct Pattern (Thought, Action, Observation autonomous loops)', category: 'Agents & LangGraph', courseTag: 'COURSE 01 + 02' },
  { id: 'jr-langgraph', label: 'LangGraph (StateGraph, Pydantic state schemas, Routers, HITL checkpoints)', category: 'Agents & LangGraph', courseTag: 'COURSE 01 + 02' },
  { id: 'jr-agentic-rag', label: 'Agentic & Corrective RAG (CRAG self-reflection, Adaptive routing)', category: 'Agents & LangGraph', courseTag: 'COURSE 02' },
  { id: 'jr-multi-agent', label: 'Multi-Agent Systems (CrewAI teams, Supervisor & Hierarchical patterns)', category: 'Agents & LangGraph', courseTag: 'COURSE 01 + 02 + 03' },

  // Production & Cloud
  { id: 'jr-fastapi', label: 'FastAPI Production Backends (Async handlers, Pydantic, Streaming SSE)', category: 'Production & Cloud', courseTag: 'COURSE 03' },
  { id: 'jr-docker', label: 'Docker Containerization (Multi-stage Dockerfiles, ECR, App Runner)', category: 'Production & Cloud', courseTag: 'COURSE 03' },
  { id: 'jr-cloud', label: 'AWS Cloud Services (Lambda, S3, API Gateway, Bedrock, SageMaker)', category: 'Production & Cloud', courseTag: 'COURSE 03' },
  { id: 'jr-cicd', label: 'Terraform Infrastructure as Code & GitHub Actions CI/CD', category: 'Production & Cloud', courseTag: 'COURSE 03' },
  { id: 'jr-observability', label: 'Production Observability (LangSmith, Langfuse tracing, CloudWatch)', category: 'Production & Cloud', courseTag: 'COURSE 01 + 02 + 03' },
  { id: 'jr-security', label: 'AI Security & Guardrails (Prompt Injection defense, Bedrock Guardrails, Semgrep)', category: 'Production & Cloud', courseTag: 'COURSE 02 + 03' },

  // Portfolio
  { id: 'jr-proj-rag', label: 'Production RAG Project (Deployed with Hybrid Search / CRAG / citations)', category: 'Portfolio & Capstone', courseTag: 'COURSE 02' },
  { id: 'jr-proj-agent', label: 'Agentic AI Project (LangGraph state machine / Multi-Agent system)', category: 'Portfolio & Capstone', courseTag: 'COURSE 01 + 02' },
  { id: 'jr-proj-deployed', label: 'Deployed Full-Stack AI SaaS (FastAPI + Next.js + Auth + Billing + Cloud)', category: 'Portfolio & Capstone', courseTag: 'COURSE 03' }
];

export interface StudyPlan {
  hoursPerDay: number;
  daysPerWeek: number;
  startDate: string;
}

export interface UserSessionData {
  version: string;
  savedAt: string;
  completedStageIds: string[];
  checklistMap: Record<string, boolean>;
  studyPlan: StudyPlan;
}

export interface PaceCalculation {
  totalHours: number;
  completedHours: number;
  remainingHours: number;
  weeklyHours: number;
  remainingWeeks: number;
  remainingDays: number;
  targetDate: Date;
  targetDateFormattedEn: string;
  targetDateFormattedAr: string;
  paceLevel: 'relaxed' | 'steady' | 'intensive' | 'bootcamp';
  paceLabelEn: string;
  paceLabelAr: string;
  paceDescEn: string;
  paceDescAr: string;
}

export const DEFAULT_STUDY_PLAN: StudyPlan = {
  hoursPerDay: 2,
  daysPerWeek: 5,
  startDate: new Date().toISOString().split('T')[0]
};

export const TOTAL_CURRICULUM_HOURS = 360;

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STAGES_KEY = 'ai_roadmap_course_completed_stages';
  private readonly CHECKLIST_KEY = 'ai_roadmap_course_job_ready_checklist';
  private readonly STUDY_PLAN_KEY = 'ai_roadmap_study_plan';
  private readonly LAST_SAVED_KEY = 'ai_roadmap_last_saved';

  private completedStagesSubject = new BehaviorSubject<string[]>(this.loadCompletedStages());
  public completedStages$ = this.completedStagesSubject.asObservable();

  private checklistSubject = new BehaviorSubject<JobReadyItem[]>(this.loadChecklist());
  public checklist$ = this.checklistSubject.asObservable();

  private studyPlanSubject = new BehaviorSubject<StudyPlan>(this.loadStudyPlan());
  public studyPlan$ = this.studyPlanSubject.asObservable();

  private lastSavedSubject = new BehaviorSubject<string>(this.loadLastSaved());
  public lastSaved$ = this.lastSavedSubject.asObservable();

  constructor() {}

  private loadLastSaved(): string {
    return localStorage.getItem(this.LAST_SAVED_KEY) || new Date().toISOString();
  }

  private updateLastSaved(): void {
    const now = new Date().toISOString();
    localStorage.setItem(this.LAST_SAVED_KEY, now);
    this.lastSavedSubject.next(now);
  }

  private loadCompletedStages(): string[] {
    try {
      const data = localStorage.getItem(this.STAGES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCompletedStages(stages: string[]) {
    try {
      localStorage.setItem(this.STAGES_KEY, JSON.stringify(stages));
      this.completedStagesSubject.next(stages);
      this.updateLastSaved();
    } catch (e) {
      console.error('Failed to save completed stages to localStorage', e);
    }
  }

  public toggleStage(stageId: string): boolean {
    const current = this.completedStagesSubject.value;
    let updated: string[];
    const isCompleted = current.includes(stageId);
    if (isCompleted) {
      updated = current.filter(id => id !== stageId);
    } else {
      updated = [...current, stageId];
    }
    this.saveCompletedStages(updated);
    return !isCompleted;
  }

  public isStageCompleted(stageId: string): boolean {
    return this.completedStagesSubject.value.includes(stageId);
  }

  public get completedStagesCount(): number {
    return this.completedStagesSubject.value.length;
  }

  private loadChecklist(): JobReadyItem[] {
    try {
      const data = localStorage.getItem(this.CHECKLIST_KEY);
      if (data) {
        const savedMap: Record<string, boolean> = JSON.parse(data);
        return INITIAL_JOB_READY_ITEMS.map(item => ({
          ...item,
          checked: !!savedMap[item.id]
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_JOB_READY_ITEMS.map(item => ({
      ...item,
      checked: false
    }));
  }

  public toggleChecklistItem(id: string): void {
    const list = this.checklistSubject.value.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    this.checklistSubject.next(list);
    try {
      const map: Record<string, boolean> = {};
      list.forEach(i => (map[i.id] = i.checked));
      localStorage.setItem(this.CHECKLIST_KEY, JSON.stringify(map));
      this.updateLastSaved();
    } catch (e) {
      console.error(e);
    }
  }

  private loadStudyPlan(): StudyPlan {
    try {
      const data = localStorage.getItem(this.STUDY_PLAN_KEY);
      if (data) {
        return { ...DEFAULT_STUDY_PLAN, ...JSON.parse(data) };
      }
    } catch {
      // fallback
    }
    return { ...DEFAULT_STUDY_PLAN };
  }

  public updateStudyPlan(plan: Partial<StudyPlan>): void {
    const current = this.studyPlanSubject.value;
    const updated: StudyPlan = {
      hoursPerDay: Math.max(1, Math.min(12, plan.hoursPerDay ?? current.hoursPerDay)),
      daysPerWeek: Math.max(1, Math.min(7, plan.daysPerWeek ?? current.daysPerWeek)),
      startDate: plan.startDate ?? current.startDate
    };
    try {
      localStorage.setItem(this.STUDY_PLAN_KEY, JSON.stringify(updated));
      this.studyPlanSubject.next(updated);
      this.updateLastSaved();
    } catch (e) {
      console.error('Failed to save study plan', e);
    }
  }

  public getStudyPlan(): StudyPlan {
    return this.studyPlanSubject.value;
  }

  public calculatePace(): PaceCalculation {
    const plan = this.studyPlanSubject.value;
    const completedCount = this.completedStagesSubject.value.length;
    const totalStages = 26;
    
    // Each completed stage accounts for roughly 360 / 26 = 13.85 hours
    const completedHours = Math.round((completedCount / totalStages) * TOTAL_CURRICULUM_HOURS);
    const remainingHours = Math.max(0, TOTAL_CURRICULUM_HOURS - completedHours);
    const weeklyHours = plan.hoursPerDay * plan.daysPerWeek;

    const remainingWeeks = weeklyHours > 0 ? Math.ceil(remainingHours / weeklyHours) : 0;
    const remainingDays = weeklyHours > 0 ? Math.ceil((remainingHours / plan.hoursPerDay)) : 0;

    // Projected Target Date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + (remainingWeeks * 7));

    // Formatted Dates
    const optionsEn: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const targetDateFormattedEn = targetDate.toLocaleDateString('en-US', optionsEn);

    const optionsAr: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const targetDateFormattedAr = targetDate.toLocaleDateString('ar-EG', optionsAr);

    // Determine Pace Level
    let paceLevel: 'relaxed' | 'steady' | 'intensive' | 'bootcamp';
    let paceLabelEn: string;
    let paceLabelAr: string;
    let paceDescEn: string;
    let paceDescAr: string;

    if (weeklyHours < 8) {
      paceLevel = 'relaxed';
      paceLabelEn = 'Relaxed Pace';
      paceLabelAr = 'وتيرة مريحة';
      paceDescEn = 'Casual learning pace. Great for busy professionals balancing full-time work.';
      paceDescAr = 'وتيرة تعلم هادئة ومريحة. مثالية لمن لديهم وظيفة بدوام كامل وأعباء يومية.';
    } else if (weeklyHours <= 15) {
      paceLevel = 'steady';
      paceLabelEn = 'Steady & Sustainable';
      paceLabelAr = 'وتيرة متوازنة ومستدامة';
      paceDescEn = 'The recommended golden ratio. Consistent progress with high retention without burnout.';
      paceDescAr = 'المعدل الذهبي الموصى به. تقدم ثابت واستيعاب عميق دون إرهاق أو تسويف.';
    } else if (weeklyHours <= 25) {
      paceLevel = 'intensive';
      paceLabelEn = 'Intensive Sprint';
      paceLabelAr = 'وتيرة مكثفة وسريعة';
      paceDescEn = 'High-velocity study. Excellent for dedicated career switchers aiming for quick hire.';
      paceDescAr = 'سرعة دراسة عالية. ممتازة للراغبين بالتحول المهني السريع في غضون أشهر قليلة.';
    } else {
      paceLevel = 'bootcamp';
      paceLabelEn = 'Full-Time Bootcamp';
      paceLabelAr = 'معسكر تفرغ كامل (Bootcamp)';
      paceDescEn = 'Full immersion. Fastest path to production engineering with daily hands-on labs.';
      paceDescAr = 'تفرغ ودراسة مكثفة. أسرع مسار لإنجاز كافة المشاريع والمختبرات السحابية.';
    }

    return {
      totalHours: TOTAL_CURRICULUM_HOURS,
      completedHours,
      remainingHours,
      weeklyHours,
      remainingWeeks,
      remainingDays,
      targetDate,
      targetDateFormattedEn,
      targetDateFormattedAr,
      paceLevel,
      paceLabelEn,
      paceLabelAr,
      paceDescEn,
      paceDescAr
    };
  }

  // --- Session Management, Export & Import ---

  public getSessionData(): UserSessionData {
    const checklistMap: Record<string, boolean> = {};
    this.checklistSubject.value.forEach(item => {
      checklistMap[item.id] = item.checked;
    });

    return {
      version: '1.0',
      savedAt: new Date().toISOString(),
      completedStageIds: this.completedStagesSubject.value,
      checklistMap,
      studyPlan: this.studyPlanSubject.value
    };
  }

  public exportSessionJson(): string {
    return JSON.stringify(this.getSessionData(), null, 2);
  }

  public downloadSessionFile(): void {
    const dataStr = this.exportSessionJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `ai-engineer-session-${dateStamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public importSessionJson(jsonStr: string): { success: boolean; messageEn: string; messageAr: string } {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON format');
      }

      // Restore Completed Stages
      if (Array.isArray(parsed.completedStageIds)) {
        this.saveCompletedStages(parsed.completedStageIds);
      }

      // Restore Checklist
      if (parsed.checklistMap && typeof parsed.checklistMap === 'object') {
        const list = INITIAL_JOB_READY_ITEMS.map(item => ({
          ...item,
          checked: !!parsed.checklistMap[item.id]
        }));
        this.checklistSubject.next(list);
        localStorage.setItem(this.CHECKLIST_KEY, JSON.stringify(parsed.checklistMap));
      }

      // Restore Study Plan
      if (parsed.studyPlan && typeof parsed.studyPlan === 'object') {
        this.updateStudyPlan(parsed.studyPlan);
      }

      this.updateLastSaved();

      return {
        success: true,
        messageEn: 'Session successfully imported! Your progress and study pace are restored.',
        messageAr: 'تم استيراد الجلسة بنجاح! تم استرجاع تقدمك وخطة دراستك بالكامل.'
      };
    } catch (e: any) {
      return {
        success: false,
        messageEn: 'Failed to import session. Please make sure the JSON file is valid.',
        messageAr: 'فشل في استيراد ملف الجلسة. يرجى التأكد من اختيار ملف JSON صالح.'
      };
    }
  }

  public resetAllProgress(): void {
    try {
      localStorage.removeItem(this.STAGES_KEY);
      localStorage.removeItem(this.CHECKLIST_KEY);
      localStorage.removeItem(this.STUDY_PLAN_KEY);
      this.completedStagesSubject.next([]);
      this.checklistSubject.next(
        INITIAL_JOB_READY_ITEMS.map(item => ({ ...item, checked: false }))
      );
      this.studyPlanSubject.next({ ...DEFAULT_STUDY_PLAN });
      this.updateLastSaved();
    } catch (e) {
      console.error(e);
    }
  }
}

