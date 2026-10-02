import { ResourceItem } from '../models/resource.model';

export const RESOURCES_DATA: ResourceItem[] = [
  // Stage 01 - Programming Fundamentals
  {
    id: 'res-py-docs',
    name: 'Official Python Documentation & Tutorial',
    stageId: '01',
    stageTitle: '01 — Programming Fundamentals',
    type: 'Documentation',
    description: 'The authoritative reference for Python language syntax, standard library modules, built-in functions, and data structures.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Python Core',
    featured: true
  },
  {
    id: 'res-clean-code-py',
    name: 'Fluent Python (2nd Edition) by Luciano Ramalho',
    stageId: '01',
    stageTitle: '01 — Programming Fundamentals',
    type: 'Books',
    description: 'A masterclass in modern Python idioms, data model protocols, dunder methods, generators, coroutines, and type hints.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Clean Python'
  },
  {
    id: 'res-dsa-practice',
    name: 'NeetCode 150 & LeetCode Python Practice',
    stageId: '01',
    stageTitle: '01 — Programming Fundamentals',
    type: 'Practice',
    description: 'Curated collection of 150 essential data structure and algorithmic coding challenges solved in idiomatic Python.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Algorithms'
  },

  // Stage 02 - Software Engineering
  {
    id: 'res-fastapi-docs',
    name: 'FastAPI Official Documentation & Interactive Tutorials',
    stageId: '02',
    stageTitle: '02 — Software Engineering',
    type: 'Documentation',
    description: 'Step-by-step documentation covering async endpoints, Pydantic v2 schemas, dependency injection, and automatic OpenAPI generation.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'FastAPI',
    featured: true
  },
  {
    id: 'res-docker-handbook',
    name: 'Docker Official Get Started Guides',
    stageId: '02',
    stageTitle: '02 — Software Engineering',
    type: 'Documentation',
    description: 'Hands-on guide to containerization, writing multi-stage Dockerfiles, caching layers, and Docker Compose configurations.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Docker'
  },
  {
    id: 'res-pytest-guide',
    name: 'Testing Python with pytest by Brian Okken',
    stageId: '02',
    stageTitle: '02 — Software Engineering',
    type: 'Books',
    description: 'Learn modern automated testing in Python: fixtures, parameterized tests, mocking async calls, and test coverage analysis.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Testing'
  },

  // Stage 03 - Databases
  {
    id: 'res-postgres-indexing',
    name: 'Use The Index, Luke! Database Indexing Guide',
    stageId: '03',
    stageTitle: '03 — Databases',
    type: 'Documentation',
    description: 'A developer-friendly deep dive into B-Tree indexes, query execution planners, and SQL performance tuning without DBA jargon.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'PostgreSQL',
    featured: true
  },
  {
    id: 'res-pgvector-docs',
    name: 'pgvector Official GitHub Repository & Documentation',
    stageId: '03',
    stageTitle: '03 — Databases',
    type: 'GitHub',
    description: 'Open-source vector similarity search extension for PostgreSQL supporting HNSW and IVFFlat index types alongside relational tables.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Vector Storage'
  },
  {
    id: 'res-redis-university',
    name: 'Redis University: In-Memory Data Structures',
    stageId: '03',
    stageTitle: '03 — Databases',
    type: 'Courses',
    description: 'Free developer courses covering in-memory key-value caching, eviction policies, pub/sub, and session management with Redis.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Caching'
  },

  // Stage 04 - Mathematics
  {
    id: 'res-3blue1brown-linalg',
    name: '3Blue1Brown: Essence of Linear Algebra',
    stageId: '04',
    stageTitle: '04 — Mathematics',
    type: 'YouTube',
    description: 'Visual geometric intuition for vectors, matrix transformations, dot products, eigenvalues, and basis changes that underpin machine learning.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Linear Algebra',
    featured: true
  },
  {
    id: 'res-mml-book',
    name: 'Mathematics for Machine Learning (Deisenroth et al.)',
    stageId: '04',
    stageTitle: '04 — Mathematics',
    type: 'Books',
    description: 'Freely available textbook bridging linear algebra, multivariate calculus, vector gradients, and probability to core ML algorithms.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Math Foundations'
  },

  // Stage 05 - Machine Learning
  {
    id: 'res-scikit-learn-docs',
    name: 'Scikit-Learn User Guide & API Reference',
    stageId: '05',
    stageTitle: '05 — Machine Learning',
    type: 'Documentation',
    description: 'Comprehensive tutorials and clear API references for preprocessing pipelines, cross-validation, ensemble methods, and metrics.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Scikit-Learn',
    featured: true
  },
  {
    id: 'res-andrew-ng-ml',
    name: 'Machine Learning Specialization by Andrew Ng (DeepLearning.AI)',
    stageId: '05',
    stageTitle: '05 — Machine Learning',
    type: 'Courses',
    description: 'The foundational course covering supervised learning, classification, gradient descent intuition, decision trees, and best practices.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'ML Foundations'
  },

  // Stage 06 - Deep Learning
  {
    id: 'res-attention-paper',
    name: 'Attention Is All You Need (Vaswani et al., 2017)',
    stageId: '06',
    stageTitle: '06 — Deep Learning',
    type: 'Papers',
    description: 'The seminal research paper that introduced the Transformer architecture, multi-head self-attention, and revolutionized modern NLP.',
    difficulty: 'Advanced',
    urlPlaceholder: '#',
    tag: 'Transformers',
    featured: true
  },
  {
    id: 'res-karpathy-nn-zero',
    name: 'Andrej Karpathy: Neural Networks: Zero to Hero',
    stageId: '06',
    stageTitle: '06 — Deep Learning',
    type: 'YouTube',
    description: 'Build micrograd, backpropagation, MLP, and GPT from scratch in pure Python with legendary clarity and first-principles intuition.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Deep Learning'
  },
  {
    id: 'res-pytorch-tutorials',
    name: 'Official PyTorch Deep Learning Tutorials',
    stageId: '06',
    stageTitle: '06 — Deep Learning',
    type: 'Documentation',
    description: 'Hands-on recipes for PyTorch tensors, autograd, custom Neural Network modules, GPU acceleration, and DataLoader pipelines.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'PyTorch'
  },

  // Stage 07 - LLM Engineering
  {
    id: 'res-openai-cookbook',
    name: 'OpenAI Cookbook & Developer Guides',
    stageId: '07',
    stageTitle: '07 — LLM Engineering',
    type: 'GitHub',
    description: 'Practical code examples for structured outputs, function calling, streaming tokens, embeddings, and prompt engineering patterns.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'LLM APIs',
    featured: true
  },
  {
    id: 'res-ollama-docs',
    name: 'Ollama: Run Open-Source LLMs Locally',
    stageId: '07',
    stageTitle: '07 — LLM Engineering',
    type: 'Documentation',
    description: 'Run Llama 3, Mistral, and Qwen models locally on your laptop or server with lightweight CLI commands and REST APIs.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Local Models'
  },
  {
    id: 'res-prompt-engineering-guide',
    name: 'DAIR.AI Prompt Engineering Guide',
    stageId: '07',
    stageTitle: '07 — LLM Engineering',
    type: 'Documentation',
    description: 'Comprehensive compendium of advanced prompt techniques: Chain-of-Thought, ReAct, Directional Stimulus, and Few-Shot learning.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'Prompting'
  },

  // Stage 08 - RAG
  {
    id: 'res-rag-survey-paper',
    name: 'Retrieval-Augmented Generation for Large Language Models: A Survey',
    stageId: '08',
    stageTitle: '08 — RAG',
    type: 'Papers',
    description: 'Authoritative academic taxonomy of Naive RAG, Advanced RAG, and Modular RAG architectures and benchmarking paradigms.',
    difficulty: 'Advanced',
    urlPlaceholder: '#',
    tag: 'RAG Architecture',
    featured: true
  },
  {
    id: 'res-qdrant-docs',
    name: 'Qdrant Vector Database Official Documentation',
    stageId: '08',
    stageTitle: '08 — RAG',
    type: 'Documentation',
    description: 'Production vector search engine docs covering HNSW index parameters, payload metadata filtering, and dense + sparse hybrid search.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Vector DB'
  },
  {
    id: 'res-cohere-rerank-docs',
    name: 'Cohere Rerank API & Cross-Encoder Documentation',
    stageId: '08',
    stageTitle: '08 — RAG',
    type: 'Documentation',
    description: 'How to utilize cross-encoder rerankers to dramatically boost retrieval precision and eliminate noise in production RAG systems.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Reranking'
  },

  // Stage 09 - Agents
  {
    id: 'res-langgraph-docs',
    name: 'LangGraph Official Documentation & Conceptual Guides',
    stageId: '09',
    stageTitle: '09 — AI Agents',
    type: 'Documentation',
    description: 'Master cyclical state graphs, persistent checkpointing, human-in-the-loop validation, and multi-agent coordination.',
    difficulty: 'Advanced',
    urlPlaceholder: '#',
    tag: 'LangGraph',
    featured: true
  },
  {
    id: 'res-react-paper',
    name: 'ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al.)',
    stageId: '09',
    stageTitle: '09 — AI Agents',
    type: 'Papers',
    description: 'The foundational paper detailing how combining reasoning traces (Thought) with action execution (Action) creates reliable autonomous agents.',
    difficulty: 'Advanced',
    urlPlaceholder: '#',
    tag: 'Agent Theory'
  },

  // Stage 10 - Evaluation
  {
    id: 'res-ragas-docs',
    name: 'Ragas: Evaluation Framework for RAG Pipelines',
    stageId: '10',
    stageTitle: '10 — Evaluation',
    type: 'Documentation',
    description: 'Compute automated quantitative metrics for RAG: Faithfulness, Answer Relevance, Context Precision, and Context Recall using LLM judges.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Evaluation',
    featured: true
  },
  {
    id: 'res-deepeval-github',
    name: 'DeepEval: Open-Source LLM Evaluation & CI Unit Testing',
    stageId: '10',
    stageTitle: '10 — Evaluation',
    type: 'GitHub',
    description: 'Unit testing framework for LLMs and RAG pipelines designed to plug directly into pytest and GitHub Actions CI pipelines.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'CI Testing'
  },

  // Stage 11 - Production AI
  {
    id: 'res-langfuse-docs',
    name: 'Langfuse: Open Source LLM Engineering Platform',
    stageId: '11',
    stageTitle: '11 — Production AI',
    type: 'Documentation',
    description: 'Distributed tracing, prompt management, cost tracking, latency profiling, and evaluation logging for production GenAI applications.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Observability',
    featured: true
  },
  {
    id: 'res-owasp-llm-top10',
    name: 'OWASP Top 10 for Large Language Model Applications',
    stageId: '11',
    stageTitle: '11 — Production AI',
    type: 'Documentation',
    description: 'Essential security checklist covering Prompt Injection, Insecure Output Handling, Training Data Poisoning, and Sensitive Information Disclosure.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'AI Security'
  },

  // Stage 12 - Cloud & Deployment
  {
    id: 'res-github-actions-docs',
    name: 'GitHub Actions Documentation: Building & Testing Containers',
    stageId: '12',
    stageTitle: '12 — Cloud & Deployment',
    type: 'Documentation',
    description: 'Learn how to configure automated CI/CD workflows, build Docker images, and securely inject cloud secret credentials.',
    difficulty: 'Beginner',
    urlPlaceholder: '#',
    tag: 'CI/CD'
  },
  {
    id: 'res-gcp-cloudrun-docs',
    name: 'Google Cloud Run: Serverless Containers Documentation',
    stageId: '12',
    stageTitle: '12 — Cloud & Deployment',
    type: 'Documentation',
    description: 'Deploy streaming FastAPI microservices in autoscaling, fully-managed containers with zero server management overhead.',
    difficulty: 'Intermediate',
    urlPlaceholder: '#',
    tag: 'Cloud Deployment'
  }
];
