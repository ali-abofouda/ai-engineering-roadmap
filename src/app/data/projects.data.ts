import { ProjectItem } from '../models/project.model';

export const PROJECTS_DATA: ProjectItem[] = [
  // -------------------------------------------------------------------
  // BEGINNER PROJECTS
  // -------------------------------------------------------------------
  {
    id: 'ann-streamlit-predictor',
    title: 'Customer Churn Classification & Regression with ANN',
    badge: 'COURSE 01',
    difficulty: 'Beginner',
    category: 'Deep Learning',
    summary: 'An Artificial Neural Network (ANN) trained on tabular data for classification and regression, integrated into an interactive Streamlit web application.',
    technologies: ['Python', 'TensorFlow / Keras', 'Scikit-learn', 'Streamlit', 'Pandas'],
    whatYouLearn: [
      'Feature transformation and scaling using Sklearn with neural networks',
      'Step-by-step training of an ANN with optimizers (Adam) and loss functions',
      'Hyperparameter tuning: finding optimal hidden layers and neurons',
      'Deploying a trained Keras model inside a real-time Streamlit web app'
    ],
    architectureSteps: [
      'Raw tabular data ingestion & exploratory analysis',
      'Preprocessing pipeline with StandardScaler fitted on train split',
      'Multi-layer perceptron training with binary cross-entropy loss',
      'Model serialization (.h5 / SavedModel format)',
      'Streamlit web UI capturing inputs and rendering real-time predictions'
    ],
    expectedOutcome: 'A deployed Streamlit application predicting customer churn with verified accuracy curves and interactive probability dials.',
    keySkills: ['Artificial Neural Networks', 'Keras / TensorFlow', 'Streamlit Deployment', 'Feature Scaling']
  },
  {
    id: 'lstm-next-word-predictor',
    title: 'Next Word Prediction Engine with LSTM & GRU',
    badge: 'COURSE 01',
    difficulty: 'Beginner',
    category: 'Deep Learning',
    summary: 'A sequence prediction neural network trained on text corpora to predict the most probable subsequent word using LSTM and GRU memory gates.',
    technologies: ['Python', 'TensorFlow / Keras', 'LSTM', 'GRU', 'Streamlit', 'NLTK'],
    whatYouLearn: [
      'Text tokenization, sequence padding, and Keras Embedding Layers',
      'Implementing Long Short-Term Memory (LSTM) with Forget, Input, and Output gates',
      'Comparing LSTM performance and training speed against Gated Recurrent Units (GRU)',
      'Building an interactive auto-complete text suggestion interface in Streamlit'
    ],
    architectureSteps: [
      'Text corpus ingestion and vocabulary building with Tokenizer',
      'Generating n-gram input sequences and padding to uniform lengths',
      'Training an LSTM/GRU network with categorical cross-entropy',
      'Top-K softmax probability sampling for candidate next words',
      'Streamlit UI rendering live word completions as the user types'
    ],
    expectedOutcome: 'A working next-word predictor demonstrating recurrent gating mechanisms and generative sequence modeling.',
    keySkills: ['LSTM RNNs', 'GRU Variants', 'Embedding Layers', 'Sequence Modeling']
  },
  {
    id: 'groq-llama3-rag-assistant',
    title: 'Ultra-Fast Document Q&A RAG with Groq LPU & Llama 3',
    badge: 'COURSE 01',
    difficulty: 'Beginner',
    category: 'RAG',
    summary: 'A responsive document question-answering system using open-source Llama 3 running on Groq LPU inference with LangChain vector retrieval.',
    technologies: ['LangChain', 'Groq API', 'Llama 3', 'ChromaDB', 'PyPDF', 'Streamlit'],
    whatYouLearn: [
      'Connecting to Groq Cloud and leveraging the Language Processing Unit (LPU) engine',
      'Parsing unstructured PDFs and splitting with RecursiveCharacterTextSplitter',
      'Creating dense vector embeddings and executing similarity search in ChromaDB',
      'Constructing context-grounded prompt templates that prevent hallucinations'
    ],
    architectureSteps: [
      'PDF Document upload and text extraction with PyPDF',
      'Recursive chunking with 15% overlap and metadata tagging',
      'Vector indexing in ChromaDB with cosine distance metric',
      'User query -> Retriever searches top-3 relevant chunks',
      'Groq LPU invokes Llama 3 delivering sub-second grounded responses'
    ],
    expectedOutcome: 'A high-speed document assistant capable of answering questions over 50-page reports with 300ms Time-to-First-Token.',
    keySkills: ['Groq LPU', 'Llama 3', 'ChromaDB Vector Store', 'Document Q&A RAG']
  },
  {
    id: 'sql-db-agent-toolkit',
    title: 'Natural Language to SQL Database Agent',
    badge: 'COURSE 01',
    difficulty: 'Beginner',
    category: 'Agents',
    summary: 'An autonomous agent that accepts plain English questions, inspects database schemas, writes and executes SQL queries, and explains results.',
    technologies: ['LangChain', 'SQLite3 / MySQL', 'OpenAI API', 'SQLAlchemy', 'Streamlit'],
    whatYouLearn: [
      'Configuring relational database connections (SQLite3 and MySQL) with SQLAlchemy',
      'Using LangChain SQL Database Toolkit and SQL Agent types',
      'Preventing destructive queries (read-only execution constraints)',
      'Building an executive analytics dashboard where non-technical users query databases in English'
    ],
    architectureSteps: [
      'User asks question: "What were our top 3 selling products last month?"',
      'Agent inspects schema (table names, column types, foreign keys)',
      'LLM synthesizes syntactically valid SQL query',
      'Query executed against database engine returning tabular rows',
      'Agent converts raw SQL result set into natural language summary with figures'
    ],
    expectedOutcome: 'A secure Text-to-SQL assistant capable of querying multi-table relational databases without writing manual SQL.',
    keySkills: ['Text-to-SQL', 'LangChain SQL Toolkit', 'Database Schema Introspection', 'Agent Executors']
  },

  // -------------------------------------------------------------------
  // INTERMEDIATE PROJECTS
  // -------------------------------------------------------------------
  {
    id: 'crewai-multi-agent-blog',
    title: 'Autonomous Multi-Agent YouTube-to-Blog Platform',
    badge: 'COURSE 01',
    difficulty: 'Intermediate',
    category: 'Agents',
    summary: 'A multi-agent team orchestrated with CrewAI that extracts YouTube transcripts, conducts research, writes comprehensive blog articles, and reviews SEO quality.',
    technologies: ['CrewAI', 'LangChain', 'YouTube Transcript API', 'OpenAI / Claude', 'Python'],
    whatYouLearn: [
      'Defining specialized AI agent roles: Researcher, Content Writer, and SEO Critic',
      'Configuring agent goals, backstories, and tool assignments in CrewAI',
      'Passing state and intermediate task outputs sequentially between agents',
      'Automating video content repurposing into structured Markdown articles'
    ],
    architectureSteps: [
      'User submits YouTube URL -> Transcript extraction tool parses subtitles',
      'Researcher Agent analyzes video content and extracts core concepts and data points',
      'Writer Agent drafts an engaging, structured article with headers and code blocks',
      'SEO Critic Agent evaluates readability, adds keywords, and outputs final Markdown'
    ],
    expectedOutcome: 'A fully automated multi-agent content pipeline producing publication-ready articles from video URLs in under 60 seconds.',
    keySkills: ['CrewAI', 'Multi-Agent Collaboration', 'Role-Based Prompts', 'Autonomous Task Handoff']
  },
  {
    id: 'neo4j-graph-rag-platform',
    title: 'Knowledge Graph RAG with Neo4j AuraDB & Cypher',
    badge: 'COURSE 01 + COURSE 02',
    difficulty: 'Intermediate',
    category: 'RAG',
    summary: 'A relationship-aware Graph RAG system that models entities and connections in Neo4j AuraDB, translating user questions into Cypher queries for multi-hop reasoning.',
    technologies: ['Neo4j AuraDB', 'Cypher Query Language', 'LangChain Neo4j', 'OpenAI', 'Python'],
    whatYouLearn: [
      'Provisioning a cloud Neo4j AuraDB instance and designing a Property Graph schema',
      'Populating knowledge graphs with entities (nodes) and directed relationships (edges)',
      'Writing and debugging Cypher query language statements',
      'Building LangChain GraphQuery chains that convert natural language to Cypher'
    ],
    architectureSteps: [
      'Structured entity-relationship ingestion into Neo4j AuraDB',
      'User query -> LangChain GraphQuery chain inspects graph schema',
      'LLM translates question into Cypher: MATCH (c:Company)-[:SUPPLIES]->(p:Product)...',
      'Neo4j engine executes graph traversal across multi-degree connections',
      'Graph result returned to LLM for relationship-aware answer synthesis'
    ],
    expectedOutcome: 'A Graph RAG system capable of answering complex multi-hop connection queries that traditional vector databases fail to resolve.',
    keySkills: ['Neo4j AuraDB', 'Cypher Query Language', 'Property Graph Modeling', 'Graph RAG']
  },
  {
    id: 'multimodal-rag-pdf-vision',
    title: 'Multimodal Document RAG for Text & Technical Diagrams',
    badge: 'COURSE 02',
    difficulty: 'Intermediate',
    category: 'RAG',
    summary: 'A multimodal RAG system that parses PDF documents containing both text narrative and complex architectural diagrams or charts using vision foundation models.',
    technologies: ['Python', 'GPT-4o Vision', 'PyMuPDF / Fitz', 'ChromaDB', 'LangChain'],
    whatYouLearn: [
      'Extracting and isolating image figures and technical charts from PDF pages',
      'Using vision models to generate dense descriptive summaries of diagrams',
      'Joint indexing of textual passages and image description embeddings',
      'Retrieving both source text and original image figures in user answers'
    ],
    architectureSteps: [
      'PDF ingestion pipeline extracts text blocks and image bounding boxes separately',
      'Vision LLM describes and transcribes every image/chart into structured metadata',
      'Text chunks and image descriptions embedded and stored in unified vector index',
      'User query retrieves matching passages and corresponding image assets',
      'Interface renders textual explanation alongside the original referenced diagram'
    ],
    expectedOutcome: 'A document assistant that answers technical questions accurately referencing both paragraph text and visual engineering diagrams.',
    keySkills: ['Multimodal RAG', 'GPT-4o Vision', 'Image Extraction', 'Unified Vector Search']
  },
  {
    id: 'healthcare-ai-saas-fastapi',
    title: 'Production Healthcare AI SaaS with FastAPI, Clerk & Stripe',
    badge: 'COURSE 03',
    difficulty: 'Intermediate',
    category: 'Production',
    summary: 'A commercial healthcare AI SaaS platform with a Next.js frontend, FastAPI backend, real-time token streaming (SSE), Clerk authentication, and Stripe subscription billing.',
    technologies: ['FastAPI', 'Next.js App Router', 'React', 'Clerk Auth', 'Stripe Billing', 'Server-Sent Events (SSE)'],
    whatYouLearn: [
      'Decoupled Frontend-Backend architecture for high-concurrency LLM web apps',
      'Building FastAPI async endpoints streaming completions with Server-Sent Events',
      'Enforcing user authentication, session tokens, and route protection with Clerk',
      'Integrating Stripe subscription billing tiers (Free vs Pro quotas) in AI SaaS apps',
      'Structuring domain-specific medical prompts with strict safety boundaries'
    ],
    architectureSteps: [
      'User signs in via Clerk Auth on Next.js frontend (protected route)',
      'Stripe webhook verifies active subscription tier and available token credits',
      'Frontend establishes SSE streaming connection to FastAPI backend endpoint',
      'FastAPI validates structured input schema and invokes LLM with streaming=True',
      'Tokens streamed real-time to UI with zero UI freezing or client timeout'
    ],
    expectedOutcome: 'A deployed, commercial-ready AI SaaS application on Vercel with authentication, billing, and real-time streaming.',
    keySkills: ['FastAPI Async', 'Next.js App Router', 'Clerk Auth', 'Stripe Subscriptions', 'Streaming SSE']
  },

  // -------------------------------------------------------------------
  // ADVANCED PROJECTS
  // -------------------------------------------------------------------
  {
    id: 'crag-adaptive-langgraph-search',
    title: 'Corrective & Adaptive Agentic RAG with LangGraph',
    badge: 'COURSE 02',
    difficulty: 'Advanced',
    category: 'RAG',
    summary: 'A stateful LangGraph agent that dynamically evaluates retrieved document relevance, automatically rewrites failing queries, and falls back to live web search when vector data is insufficient.',
    technologies: ['LangGraph', 'Python', 'ChromaDB / Qdrant', 'Tavily Search', 'LangSmith', 'Streamlit'],
    whatYouLearn: [
      'Building stateful, cyclical reasoning graphs with LangGraph StateGraph',
      'Implementing retrieval grading nodes to classify chunks as relevant or ambiguous',
      'Corrective RAG (CRAG): routing to real-time web search when document relevance is low',
      'Adaptive RAG: routing queries between direct answer, vector DB, or web search based on complexity',
      'Debugging state transitions and node executions using LangGraph Studio and LangSmith'
    ],
    architectureSteps: [
      'Query Node -> Retrieves candidate documents from Vector DB',
      'Grading Node -> LLM evaluates whether retrieved chunks contain sufficient answer',
      'Decision Router: If relevant -> Answer Synthesis Node; If irrelevant -> Query Rewrite Node',
      'Fallback Web Search Node queries Tavily/Wikipedia for external up-to-date facts',
      'Synthesis Node produces grounded answer with verifiable source citations'
    ],
    expectedOutcome: 'A resilient, self-correcting RAG system that eliminates context-starved hallucinations and handles out-of-domain questions gracefully.',
    keySkills: ['LangGraph StateGraph', 'Corrective RAG (CRAG)', 'Adaptive Routing', 'LangSmith Tracing']
  },
  {
    id: 'aws-bedrock-digital-twin-terraform',
    title: 'Serverless AI Digital Twin on AWS with Terraform & CI/CD',
    badge: 'COURSE 03',
    difficulty: 'Advanced',
    category: 'Cloud & DevOps',
    summary: 'An enterprise serverless AI assistant deployed to AWS: Lambda function compute, S3 conversational memory, API Gateway endpoints, CloudFront CDN, and Amazon Bedrock models, fully provisioned via Terraform and GitHub Actions.',
    technologies: ['AWS Lambda', 'Amazon Bedrock', 'Amazon S3', 'API Gateway', 'CloudFront', 'Terraform', 'GitHub Actions'],
    whatYouLearn: [
      'Migrating AI backends from proprietary third-party APIs to Amazon Bedrock (Claude 3.5)',
      'Designing serverless LLM architectures on AWS Lambda with S3 conversational memory',
      'Writing Infrastructure as Code (IaC) with Terraform for reproducible cloud deployments',
      'Configuring automated GitHub Actions CI/CD pipelines deploying infrastructure on git push',
      'Setting up CloudWatch metrics and cost budget alerts for production AI workloads'
    ],
    architectureSteps: [
      'Git Push triggers GitHub Actions CI/CD workflow',
      'Terraform validates HCL and provisions AWS Lambda, S3, API Gateway, and CloudFront',
      'Client requests routed through CloudFront CDN to API Gateway with CORS',
      'AWS Lambda function retrieves chat history from S3, builds prompt, and invokes Bedrock',
      'Response streamed back to client and CloudWatch monitors token usage and latency'
    ],
    expectedOutcome: 'A complete, enterprise-grade serverless cloud architecture deployed with zero manual console clicking and automated CI/CD.',
    keySkills: ['Amazon Bedrock', 'AWS Lambda Serverless', 'Terraform IaC', 'GitHub Actions CI/CD', 'CloudFront']
  },
  {
    id: 'cybersecurity-mcp-agent-azure',
    title: 'AI Security & Code Audit Agent with MCP & Semgrep on Azure',
    badge: 'COURSE 03',
    difficulty: 'Advanced',
    category: 'Security',
    summary: 'An autonomous cybersecurity agent that leverages the Model Context Protocol (MCP) to run Semgrep static code analysis, identifying vulnerabilities and deploying to Azure Container Apps via Terraform.',
    technologies: ['Model Context Protocol (MCP)', 'Semgrep', 'Docker', 'Azure Container Apps', 'Terraform', 'Python'],
    whatYouLearn: [
      'Building Model Context Protocol (MCP) servers exposing security analysis tools',
      'Integrating Semgrep static analysis engine into agent tool execution loops',
      'Containerizing AI agents with Docker and multi-stage builds',
      'Deploying containerized agents to Microsoft Azure Container Apps using Terraform',
      'Securing agent tool execution and enforcing least-privilege security boundaries'
    ],
    architectureSteps: [
      'Agent receives target source repository code as an MCP Resource',
      'Agent invokes custom Semgrep MCP tool to scan code for OWASP vulnerabilities',
      'Agent parses AST static analysis findings and prioritizes severity levels',
      'Generates automated code remediation pull request with patched syntax',
      'Packaged in Docker and deployed to Azure Container Apps via Terraform module'
    ],
    expectedOutcome: 'A containerized cybersecurity agent running on Microsoft Azure that automatically audits codebases and generates verified security patches.',
    keySkills: ['Model Context Protocol (MCP)', 'Semgrep Code Analysis', 'Azure Container Apps', 'Agent Security']
  },
  {
    id: 'alex-financial-multi-agent-capstone',
    title: 'ALEX: Multi-Agent Financial AI Platform on Aurora Serverless & Langfuse',
    badge: 'COURSE 03 (Capstone)',
    difficulty: 'Advanced',
    category: 'Production',
    summary: 'The flagship capstone: A multi-agent financial intelligence system running on Amazon Aurora Serverless, AWS Lambda, Amazon Bedrock, and Langfuse production observability with automated LLM-as-a-judge monitoring and prompt injection guardrails.',
    technologies: ['Amazon Aurora Serverless', 'AWS Bedrock AgentCore', 'Langfuse', 'AWS Lambda', 'Terraform', 'Docker', 'FastAPI'],
    whatYouLearn: [
      'Architecting multi-agent financial systems with Context Engineering and structured outputs',
      'Designing production relational schemas on Amazon Aurora Serverless for multi-agent state',
      'Packaging and deploying multi-agent systems to AWS Lambda with connection pooling',
      'Building production Bedrock Guardrails against Prompt Injection and jailbreak attempts',
      'Implementing end-to-end LLM observability and automated LLM-as-a-Judge evaluations with Langfuse'
    ],
    architectureSteps: [
      'User financial query submitted to API Gateway -> Authenticated & passed to AWS Lambda',
      'Supervisor Agent decomposes financial task into Market Research and Risk Analysis subtasks',
      'Worker agents query enterprise financial APIs, vector memory in S3, and Aurora Serverless',
      'Bedrock Guardrails intercept prompts and responses, blocking prompt injection or leakage',
      'Aggregated financial intelligence report stored in Aurora Serverless and returned to UI',
      'Langfuse captures complete execution trace, token cost, TTFT, and automated judge quality scores'
    ],
    expectedOutcome: 'A production-grade, enterprise-ready multi-agent financial platform deployed on AWS cloud with full observability and security guardrails.',
    keySkills: ['Multi-Agent Architecture', 'Amazon Aurora Serverless', 'Bedrock AgentCore', 'Langfuse Observability', 'Prompt Injection Defense']
  }
];
