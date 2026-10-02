import { CourseSkillComparison } from '../models/course-comparison.model';

export const COURSE_COMPARISONS: CourseSkillComparison[] = [
  {
    skill: 'Python Foundations & OOP',
    category: 'Programming',
    course1: 'Strong',
    course2: 'Partial',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 1 has 33 dedicated lectures on Python syntax, data structures, functions, OOP, and magic methods. Course 2 uses UV package manager.'
  },
  {
    skill: 'Classical NLP & Text Vectorization',
    category: 'Foundations',
    course1: 'Strong',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 1 thoroughly covers NLTK, Stemming, Lemmatization, BOW, N-Grams, TF-IDF, and Word2Vec (CBOW & Skip-Gram).'
  },
  {
    skill: 'Classical Machine Learning (Scikit-Learn)',
    category: 'Foundations',
    course1: 'Partial',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Partial',
    notes: 'Course 1 covers feature transformations and basic regression/classification; in-depth algorithms (Random Forest, SVM, hyperparameter tuning) are not covered.'
  },
  {
    skill: 'Deep Learning (ANN, RNN, LSTM, GRU)',
    category: 'Deep Learning',
    course1: 'Strong',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 1 provides extensive mathematical intuition, gating formulas (Forget/Input/Output), Seq2Seq, and Streamlit prediction projects.'
  },
  {
    skill: 'Transformers Architecture & Attention',
    category: 'Deep Learning',
    course1: 'Strong',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 1 features 15 detailed lectures on Scaled Dot-Product Attention, Multi-Head Attention, Positional Encoding, LayerNorm, and Decoders.'
  },
  {
    skill: 'LLM Fundamentals & Open-Source (Groq / Ollama)',
    category: 'GenAI & LLMs',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Partial',
    overall: 'Strong',
    notes: 'Courses 1 & 2 teach Ollama local inference and Groq LPU API. Course 3 focuses on OpenAI and AWS Bedrock foundation models.'
  },
  {
    skill: 'Prompt Engineering & Structured Outputs',
    category: 'GenAI & LLMs',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'All 3 courses emphasize structured JSON generation with Pydantic v2 schemas, TypedDict, and Dataclasses.'
  },
  {
    skill: 'RAG Fundamentals (Ingestion, Chunking, Vectors)',
    category: 'RAG & Retrieval',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Partial',
    overall: 'Strong',
    notes: 'Courses 1 & 2 parse PDF, Word, CSV, Excel, JSON, and SQL DBs with ChromaDB, FAISS, Pinecone, and AstraDB.'
  },
  {
    skill: 'Advanced Semantic Chunking',
    category: 'RAG & Retrieval',
    course1: 'Missing',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 2 provides in-depth theory, pure Python implementation from scratch, and LangChain SemanticChunker pipelines.'
  },
  {
    skill: 'Hybrid Search (Dense + BM25) & Reranking',
    category: 'RAG & Retrieval',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 1 uses Pinecone + RRF; Course 2 provides detailed LangChain Dense + Sparse fusion and Cross-Encoder rerankers.'
  },
  {
    skill: 'Retrieval Optimization (HyDE, Expansion, MMR)',
    category: 'RAG & Retrieval',
    course1: 'Missing',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 2 dedicates complete sections to Query Expansion, Query Decomposition, HyDE, and Maximal Marginal Relevance (MMR).'
  },
  {
    skill: 'Multimodal RAG (PDF Images & Text)',
    category: 'RAG & Retrieval',
    course1: 'Missing',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 2 covers multimodal document ingestion, extracting images and charts, and vision LLM embeddings.'
  },
  {
    skill: 'Vectorless RAG (PageIndex) & Cache RAG (CAG)',
    category: 'RAG & Retrieval',
    course1: 'Missing',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 2 explores cutting-edge PageIndex tree navigation and Cache-Augmented Generation (CAG) in LangGraph.'
  },
  {
    skill: 'Knowledge Graph & Graph RAG (Neo4j)',
    category: 'RAG & Retrieval',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Courses 1 & 2 teach Neo4j AuraDB, Cypher Query Language (basics to advanced), and LangChain GraphQuery chains.'
  },
  {
    skill: 'Autonomous AI Agents (ReAct & Tools)',
    category: 'Agents',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Taught across all 3 courses: custom tools, ReAct reasoning loops, Agent Executors, and CrewAI multi-agent teams.'
  },
  {
    skill: 'LangGraph (Cyclical State Machines)',
    category: 'Agents',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Courses 1 & 2 provide master-level coverage of StateGraph, Pydantic schemas, Routers, ToolsNodes, HITL, and Studio debugging.'
  },
  {
    skill: 'Agentic, Corrective (CRAG) & Multi-Agent RAG',
    category: 'Agents',
    course1: 'Partial',
    course2: 'Strong',
    course3: 'Partial',
    overall: 'Strong',
    notes: 'Course 2 details Corrective RAG (CRAG) with web fallback, Adaptive RAG, and Supervisor / Hierarchical Multi-Agent RAG networks.'
  },
  {
    skill: 'Model Context Protocol (MCP) & Claude Code',
    category: 'Agents',
    course1: 'Strong',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 1 covers Claude Code developer agents and MCP Desktop. Course 3 builds MCP servers for security (Semgrep) and research.'
  },
  {
    skill: 'AI Evaluation & LLM-as-a-Judge',
    category: 'Evaluation',
    course1: 'Missing',
    course2: 'Strong',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 2 covers chatbot/RAG test sets and evaluators. Course 3 implements production LLM-as-a-Judge with Langfuse.'
  },
  {
    skill: 'Full-Stack AI (FastAPI, React, Streaming)',
    category: 'Production',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 builds full-stack apps with FastAPI async endpoints, Next.js App Router, Server-Sent Events, and Clerk auth.'
  },
  {
    skill: 'Docker Containerization for AI',
    category: 'Production',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 covers writing production Dockerfiles, multi-stage builds, containerizing agents, and pushing to Amazon ECR.'
  },
  {
    skill: 'AWS Cloud (Lambda, S3, API Gateway, App Runner)',
    category: 'Cloud & DevOps',
    course1: 'Partial',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 dedicates Weeks 1, 2, and 3 to AWS IAM, S3 vectors, Lambda serverless APIs, App Runner auto-scaling, and CloudFront.'
  },
  {
    skill: 'Amazon Bedrock & SageMaker Deployments',
    category: 'Cloud & DevOps',
    course1: 'Partial',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 1 introduces Bedrock. Course 3 builds Bedrock AgentCore, SageMaker custom embeddings, and S3 vector pipelines.'
  },
  {
    skill: 'Infrastructure as Code (Terraform)',
    category: 'Cloud & DevOps',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 covers Terraform HCL scripts, automating AWS/Azure/GCP resources, and multi-environment Dev/Test/Prod deployments.'
  },
  {
    skill: 'CI/CD Automation (GitHub Actions)',
    category: 'Cloud & DevOps',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 teaches automated GitHub Actions workflows deploying AI models and agents directly from Git Push to live production.'
  },
  {
    skill: 'Multi-Cloud Deployments (Azure & GCP)',
    category: 'Cloud & DevOps',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 deploys containerized AI agents to Microsoft Azure Container Apps and Google Cloud Run using Terraform.'
  },
  {
    skill: 'Production Databases (Amazon Aurora Serverless)',
    category: 'Production',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 3 covers relational database architecture for multi-agent systems using Amazon Aurora Serverless and connection pooling.'
  },
  {
    skill: 'AI Security, Guardrails & Prompt Injection',
    category: 'Security',
    course1: 'Missing',
    course2: 'Strong',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Course 2 covers LangChain Guardrails & LLM Gateways. Course 3 covers enterprise Bedrock guardrails, prompt injection, and Semgrep.'
  },
  {
    skill: 'Production Observability (LangSmith & Langfuse)',
    category: 'Observability',
    course1: 'Strong',
    course2: 'Strong',
    course3: 'Strong',
    overall: 'Strong',
    notes: 'Courses 1 & 2 use LangSmith and LangGraph Studio. Course 3 implements AWS CloudWatch dashboards and open-source Langfuse tracing.'
  },
  {
    skill: 'Model Fine-Tuning & Quantization (LoRA / QLoRA)',
    category: 'Deep Learning',
    course1: 'Strong',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Strong',
    notes: 'Course 1 covers weight quantization (INT8/4), mathematical intuition of LoRA/QLoRA, fine-tuning Gemma, and Lamini AI Cloud.'
  },
  {
    skill: 'Kubernetes (K8s) Cluster Management',
    category: 'Cloud & DevOps',
    course1: 'Missing',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Missing',
    notes: 'None of the courses cover Kubernetes or Helm. Course 3 specifically focuses on serverless containers (App Runner, Cloud Run, Container Apps).'
  },
  {
    skill: 'Advanced Math (Calculus & Linear Algebra Proofs)',
    category: 'Foundations',
    course1: 'Partial',
    course2: 'Missing',
    course3: 'Missing',
    overall: 'Missing',
    notes: 'Courses explain geometric intuition (dot products, cosine distance, gradients) but do not teach formal calculus or theoretical linear algebra proofs.'
  }
];
