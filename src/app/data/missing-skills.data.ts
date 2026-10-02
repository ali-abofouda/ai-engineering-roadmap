import { MissingSkillItem } from '../models/missing-skills.model';

export const MISSING_SKILLS: MissingSkillItem[] = [
  // -------------------------------------------------------------------
  // GROUP 1: MUST STUDY (Required for becoming job-ready)
  // -------------------------------------------------------------------
  {
    id: 'missing-sql-optimization',
    title: 'Advanced SQL, Indexing & Query Plan Optimization',
    category: 'Databases',
    group: 'Must Study',
    whyItMatters: 'Courses cover parsing SQL databases and using Text-to-SQL toolkits, but production AI applications require writing high-performance SQL, managing database migrations, creating B-Tree composite indexes, and reading EXPLAIN ANALYZE plans to ensure chat history and metadata queries do not bottleneck under high traffic.',
    whatLevelNeeded: 'Intermediate: Ability to write complex JOINs, CTEs, Window Functions, and profile slow queries with EXPLAIN ANALYZE.',
    suggestedScope: [
      'PostgreSQL query execution plans (Seq Scan vs Index Scan vs Bitmap Heap Scan)',
      'B-Tree, GIN, and Hash indexes on scalar metadata columns',
      'Database connection pooling with PgBouncer',
      'Database schema migration tools (Alembic in Python)'
    ],
    courseCoverageNote: 'Course 1 (Section 35) & Course 2 (Section 5) only cover querying SQLite/MySQL via LangChain toolkits; index tuning and schema design are not covered.'
  },
  {
    id: 'missing-dsa-python',
    title: 'Data Structures & Algorithms (DSA) for Technical Screening',
    category: 'Programming',
    group: 'Must Study',
    whyItMatters: 'Every AI Engineer interview loop begins with a 45–60 minute Python live-coding challenge. While Course 1 teaches Python syntax and basic data structures, it does not prepare candidates for algorithmic complexity (Big-O), recursion, sliding windows, heaps, or dynamic programming questions asked by tech hiring managers.',
    whatLevelNeeded: 'Intermediate: Comfortably solving LeetCode Easy to Medium problems in idiomatic Python within 25 minutes.',
    suggestedScope: [
      'Time and Space Complexity (Big-O analysis)',
      'Hash maps, sets, queues, and heaps (Python heapq)',
      'Two-pointer techniques and sliding window algorithms',
      'Binary search and tree/graph traversals (BFS, DFS)',
      'NeetCode 150 curated problem set'
    ],
    courseCoverageNote: 'Course 1 covers Python lists, dicts, and loops, but does not cover algorithmic problem solving or interview-style coding challenges.'
  },
  {
    id: 'missing-async-concurrency',
    title: 'Advanced Python AsyncIO & Concurrency Architecture',
    category: 'Software Engineering',
    group: 'Must Study',
    whyItMatters: 'Course 3 uses FastAPI and streaming, but production AI microservices require deep comprehension of Python asyncio event loops, background worker queues (Celery/RQ), task cancellation, timeouts, and offloading CPU-bound tasks to threadpools without starving incoming I/O connections.',
    whatLevelNeeded: 'Intermediate to Advanced: Structuring non-blocking microservices handling concurrent streaming requests.',
    suggestedScope: [
      'asyncio.gather, asyncio.as_completed, and TaskGroups',
      'Offloading CPU-bound token parsing with asyncio.to_thread or run_in_threadpool',
      'Handling client disconnects and cancelling upstream streaming requests',
      'Background task execution with Celery or ARQ'
    ],
    courseCoverageNote: 'Course 3 demonstrates async FastAPI endpoints, but does not explore event loop starvation, threadpool offloading, or background queues.'
  },

  // -------------------------------------------------------------------
  // GROUP 2: RECOMMENDED (Useful but not immediately required)
  // -------------------------------------------------------------------
  {
    id: 'missing-scikit-learn-ml',
    title: 'Classical Machine Learning Rigor & Tabular Modeling',
    category: 'Machine Learning',
    group: 'Recommended',
    whyItMatters: 'Many enterprise AI roles involve structured enterprise data alongside unstructured text. Understanding feature engineering pipelines, tree-based models (XGBoost, LightGBM), and calibration curves enables AI engineers to build hybrid predictive-generative pipelines.',
    whatLevelNeeded: 'Beginner to Intermediate: Training classification models with cross-validation and interpreting feature importance (SHAP values).',
    suggestedScope: [
      'Scikit-learn Pipelines, ColumnTransformer, and StandardScaler',
      'Ensemble gradient boosting (XGBoost, LightGBM)',
      'Cross-validation strategies (Stratified K-Fold) and avoiding data leakage',
      'Model interpretability with SHAP and feature importance'
    ],
    courseCoverageNote: 'Course 1 covers basic feature transformations for an ANN, but does not cover classical tree models, cross-validation, or tabular ML pipelines.'
  },
  {
    id: 'missing-redis-caching',
    title: 'Redis Semantic Caching & Rate Limiting Internals',
    category: 'Production',
    group: 'Recommended',
    whyItMatters: 'While Course 2 covers Cache RAG (CAG) via prompt caching and Course 3 uses S3 for memory, high-scale production systems rely on in-memory Redis clusters for exact-match caching, semantic query caching, and distributed Token-Bucket rate limiting.',
    whatLevelNeeded: 'Intermediate: Implementing Redis key expiration (TTL), cache eviction policies (LRU), and distributed token buckets.',
    suggestedScope: [
      'Redis in-memory key-value data structures (hashes, lists, sorted sets)',
      'Semantic caching with embedding distance thresholds in Redis',
      'Distributed rate limiting using Token Bucket algorithm',
      'Redis Pub/Sub for real-time multi-agent notifications'
    ],
    courseCoverageNote: 'None of the 3 courses implement Redis; they use local files, S3, or Aurora Serverless.'
  },
  {
    id: 'missing-colbert-late-chunking',
    title: 'ColBERT Late Interaction & Late Chunking Embeddings',
    category: 'RAG & Retrieval',
    group: 'Recommended',
    whyItMatters: 'State-of-the-art retrieval is moving toward late interaction models (ColBERT / PLAID) and Anthropic Contextual Retrieval / Late Chunking, which preserve whole-document context during token embedding before chunking.',
    whatLevelNeeded: 'Intermediate: Understanding the architectural difference between single-vector dense retrieval and multi-vector token scoring.',
    suggestedScope: [
      'MaxSim operator in ColBERT late-interaction token scoring',
      'Late Chunking: passing full documents through transformer backbones before slicing embeddings',
      'Anthropic Contextual Retrieval: prepending document summary headers to chunks'
    ],
    courseCoverageNote: 'Course 2 covers Bi-encoders, Cross-encoders, Semantic Chunking, and HyDE, but does not cover ColBERT or late-chunking models.'
  },

  // -------------------------------------------------------------------
  // GROUP 3: ADVANCED / LATER (Can wait until after getting hired)
  // -------------------------------------------------------------------
  {
    id: 'missing-kubernetes-k8s',
    title: 'Kubernetes (K8s) & Container Orchestration at Scale',
    category: 'Cloud & DevOps',
    group: 'Advanced / Later',
    whyItMatters: 'Large enterprises with self-hosted GPU clusters host open-source LLMs (vLLM, TGI) on Kubernetes managed clusters (EKS/GKE) with KubeRay. Course 3 specifically focuses on serverless container services (App Runner, Cloud Run, Azure Container Apps), which is sufficient for 90% of AI engineering roles.',
    whatLevelNeeded: 'Advanced: Deploying pods, services, ingress controllers, and GPU daemonsets.',
    suggestedScope: [
      'Kubernetes core concepts: Pods, Deployments, Services, and Ingress',
      'Helm charts for packaged AI deployments',
      'vLLM high-throughput model serving on Kubernetes with GPU drivers',
      'Horizontal Pod Autoscaling (HPA) based on GPU utilization'
    ],
    courseCoverageNote: 'The courses deliberately focus on serverless container runners (AWS App Runner, GCP Cloud Run, Azure Container Apps) to avoid unnecessary Kubernetes complexity.'
  },
  {
    id: 'missing-rl-preference-tuning',
    title: 'Reinforcement Learning from Human Feedback (RLHF & DPO)',
    category: 'Deep Learning',
    group: 'Advanced / Later',
    whyItMatters: 'Aligning foundation models using Direct Preference Optimization (DPO), PPO, or Group Relative Policy Optimization (GRPO) is specialized work performed by research labs and model providers, rather than typical AI engineers who consume or fine-tune models.',
    whatLevelNeeded: 'Advanced: Training reward models and optimizing preference loss functions.',
    suggestedScope: [
      'Bradley-Terry preference modeling',
      'Direct Preference Optimization (DPO) mathematical derivation',
      'Reward model training and alignment evaluation'
    ],
    courseCoverageNote: 'Course 1 covers Supervised Fine-Tuning (SFT) with LoRA and QLoRA on Google Gemma, but does not cover RLHF or DPO alignment.'
  },
  {
    id: 'missing-formal-math-proofs',
    title: 'Theoretical Calculus & Linear Algebra Proofs',
    category: 'Foundations',
    group: 'Advanced / Later',
    whyItMatters: 'Understanding geometric vectors, dot products, and cosine distance is essential. However, memorizing manual matrix inversion proofs or hand-calculating multi-variable Hessian matrices is unnecessary for applied AI Engineering in industry.',
    whatLevelNeeded: 'Conceptual: Visual intuition of matrix multiplication, projections, and gradients.',
    suggestedScope: [
      'Matrix transformations and vector projections intuition (3Blue1Brown)',
      'Gradient vectors and loss function surfaces intuition',
      'Probability distributions (Gaussian, Categorical, Softmax)'
    ],
    courseCoverageNote: 'Course 1 covers practical intuition for attention formulas and gradient backpropagation, avoiding unnecessary theoretical proofs.'
  }
];
