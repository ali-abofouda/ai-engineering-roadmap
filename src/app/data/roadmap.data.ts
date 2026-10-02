import { RoadmapStage } from '../models/roadmap.model';

export const ROADMAP_STAGES: RoadmapStage[] = [
  // -------------------------------------------------------------
  // STAGE 01: Programming & Python Foundations
  // -------------------------------------------------------------
  {
    id: '01',
    number: 1,
    title: 'Programming & Python Foundations',
    tagline: 'Master core Python, OOP, clean code, data structures, and modern UV package environments.',
    description: 'Establish rock-solid programming foundations in Python 3.11+. Learn syntax, control flow, functions, lambdas, file I/O, exception handling, and Object-Oriented Programming (OOP) with inheritance and magic methods.',
    category: 'Foundations',
    difficulty: 'Beginner',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Course 1 thoroughly covers Python syntax, OOP, modules, and file handling. Course 2 uses modern uv package workflows.',
    whatIsIt: 'The foundational programming layer: variables, control flow, data structures, functions, modules, and OOP classes in Python.',
    whyNeeded: 'All modern AI frameworks (PyTorch, LangChain, LangGraph, FastAPI) are written in Python. Without mastery of OOP, custom exception handling, and virtual environments, AI engineers cannot build maintainable microservices or custom tools.',
    whatToLearn: [
      'Python syntax, variables, operators, and basic datatypes',
      'Control flow: conditional branching (if, elif, else) and loops',
      'Data structures: Lists, Tuples, Dictionaries, and List Comprehensions',
      'Functions, Lambda expressions, map(), and filter()',
      'Modules, packages, and standard libraries overview',
      'File operations, path handling, and stream reading',
      'Exception handling (try, except, else, finally blocks)',
      'Object-Oriented Programming: Classes, Single/Multiple Inheritance, Polymorphism, Encapsulation, Abstraction',
      'Magic methods (__init__, __call__, __repr__) and Operator Overloading',
      'Virtual environment management with Conda and UV'
    ],
    whatCoursesCover: [
      'Course 1: Section 1 (Lectures 1–10: Introduction, VS Code, Python Environments, Syntax, Data Types)',
      'Course 1: Section 2 (Lectures 11–12: Conditional Statements, Loops)',
      'Course 1: Section 3 (Lectures 13–16: Lists, Tuples, Dictionaries, Real-world use cases)',
      'Course 1: Section 4 (Lectures 17–21: Functions, Lambda, Map, Filter)',
      'Course 1: Section 5 (Lectures 22–23: Modules, Packages, Standard Libraries)',
      'Course 1: Section 6 (Lectures 24–25: File Operations, Working with Paths)',
      'Course 1: Section 7 (Lecture 26: Exception Handling with try/except/else/finally)',
      'Course 1: Section 8 (Lectures 27–33: Classes, Inheritance, Polymorphism, Encapsulation, Magic Methods)',
      'Course 2: Section 5 (Lecture 9: Project Structure and Environment Setup with UV Package)'
    ],
    whatIsMissing: 'Static type checking with mypy, Pydantic v2 validation deep-dive, and async/await event loops (covered later in production sections).',
    interviewFocus: [
      {
        question: 'What is the purpose of magic methods like __call__ in Python, and how are they used in AI classes?',
        answerStrategy: 'Explain that __call__ allows an instance of a class to be invoked like a function. In AI frameworks like PyTorch or LangChain, models, prompt templates, and custom tools implement __call__ so that calling model(input) executes the underlying forward pass or runnable chain.'
      },
      {
        question: 'Why is multiple inheritance used with caution in production systems, and what is MRO (Method Resolution Order)?',
        answerStrategy: 'Discuss the diamond problem. Explain that Python uses the C3 linearization algorithm for MRO to determine the order in which base classes are searched for methods, ensuring predictable attribute lookups.'
      }
    ],
    practicalTask: 'Create an object-oriented Python module with custom exceptions and magic methods that parses local text files and computes word frequency statistics.',
    projectConnection: 'Forms the baseline programming capability for writing custom LangChain tools, FastAPI route handlers, and data preprocessing scripts throughout all subsequent projects.',
    tools: ['Python 3.11+', 'uv', 'VS Code', 'Conda'],
    topicsList: [
      'Python Syntax & Data Types',
      'Loops & Conditionals',
      'Data Structures (Lists, Dicts, Tuples)',
      'Functions & Lambdas',
      'File Handling & Pathlib',
      'Exception Handling',
      'OOP: Inheritance & Polymorphism',
      'OOP: Encapsulation & Abstraction',
      'Magic Methods & Operator Overloading',
      'UV Package Manager'
    ],
    nextStageId: '02'
  },

  // -------------------------------------------------------------
  // STAGE 02: NLP & Machine Learning Foundations
  // -------------------------------------------------------------
  {
    id: '02',
    number: 2,
    title: 'NLP & Machine Learning Foundations',
    tagline: 'Understand classical text preprocessing, tokenization, TF-IDF, and Word2Vec embeddings.',
    description: 'Before jumping into massive neural models, master classical Natural Language Processing (NLP) techniques: stemming, lemmatization, stop words, Bag-of-Words, N-Grams, TF-IDF, and Word2Vec (CBOW & Skip-Gram) using NLTK and Streamlit.',
    category: 'Foundations',
    difficulty: 'Beginner',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01'],
    coverageStatus: 'Partially Covered',
    coverageNote: 'Text preprocessing and NLP vectorization are covered in depth. Classical tabular ML algorithms (Random Forests, SVM, Scikit-learn cross-validation) are only partially covered.',
    whatIsIt: 'Classical NLP techniques and feature representation methods that convert raw human text strings into structured numerical matrices.',
    whyNeeded: 'Understanding how text is tokenized, vectorized, and measured for lexical similarity is critical for debugging chunking pipelines, building BM25 sparse indexes, and understanding dense embedding limitations in modern RAG.',
    whatToLearn: [
      'Text preprocessing: Tokenization, Stemming (Porter/Snowball) vs Lemmatization (WordNet)',
      'Stopwords removal and linguistic noise reduction with NLTK',
      'Parts-of-Speech (POS) tagging and Named Entity Recognition (NER)',
      'Vectorization: One-Hot Encoding (OHE) and its sparsity/memory bottlenecks',
      'Bag of Words (BOW) intuition, advantages, and NLTK implementation',
      'N-Grams (Bigrams, Trigrams) for preserving local word context',
      'Term Frequency-Inverse Document Frequency (TF-IDF) mathematical intuition and practical code',
      'Word Embeddings intuition: distributed dense semantic representations',
      'Word2Vec architectures: Continuous Bag of Words (CBOW) vs Skip-Gram',
      'Average Word2Vec calculation for document-level embeddings',
      'Building interactive NLP data apps with Streamlit'
    ],
    whatCoursesCover: [
      'Course 1: Section 9 (Lectures 34–35: Getting Started With Streamlit, Example ML App)',
      'Course 1: Section 10 (Lectures 36–45: NLP Roadmap, Tokenization, Stemming, Lemmatization, Stopwords, POS, NER)',
      'Course 1: Section 10 (Lectures 46–55: One-Hot Encoding, Bag of Words, N-Grams, TF-IDF Intuition & Practice)',
      'Course 1: Section 10 (Lectures 56–62: Word Embeddings, Word2Vec CBOW, Skip-Gram, Average Word2Vec)'
    ],
    whatIsMissing: 'Mathematical linear algebra foundations (eigenvectors, SVD), classical classification benchmarks (ROC-AUC, Precision/Recall trade-offs), and Scikit-learn pipelines.',
    interviewFocus: [
      {
        question: 'What is the fundamental difference between Stemming and Lemmatization, and when would you use each in a search pipeline?',
        answerStrategy: 'Stemming uses heuristic rule-based suffix chopping (e.g. "studies" -> "studi") and is fast but produces non-words. Lemmatization uses morphological vocabularies and POS tags to return dictionary root words (e.g. "studies" -> "study"). Lemmatization is preferred for semantic search accuracy; stemming is used for fast lexical keyword indexing.'
      },
      {
        question: 'Why does TF-IDF downweight common terms, and how does Word2Vec overcome the limitations of TF-IDF?',
        answerStrategy: 'TF-IDF downweights terms appearing in many documents because they provide little discriminative power. However, TF-IDF still creates high-dimensional sparse vectors and cannot capture semantic synonymy (e.g. "car" and "automobile" have zero similarity). Word2Vec embeds words into low-dimensional dense vectors where semantic relationships correspond to vector geometry.'
      }
    ],
    practicalTask: 'Build a Streamlit web application that accepts user text, applies NLTK preprocessing, and generates a comparative visual matrix of Bag-of-Words vs TF-IDF scores.',
    projectConnection: 'Supplies the lexical search theory needed to implement BM25 and sparse retrieval in Stage 09 (Hybrid Search RAG).',
    tools: ['Python', 'NLTK', 'Streamlit', 'Gensim / Word2Vec'],
    topicsList: [
      'Tokenization (NLTK)',
      'Stemming vs Lemmatization',
      'Stopwords & POS Tagging',
      'Named Entity Recognition (NER)',
      'One-Hot Encoding & Sparsity',
      'Bag of Words (BOW)',
      'N-Grams Representation',
      'TF-IDF Mathematics',
      'Word2Vec (CBOW & Skip-Gram)',
      'Streamlit ML UI'
    ],
    previousStageId: '01',
    nextStageId: '03'
  },

  // -------------------------------------------------------------
  // STAGE 03: Deep Learning & Sequence Models (ANN, RNN, LSTM, GRU)
  // -------------------------------------------------------------
  {
    id: '03',
    number: 3,
    title: 'Deep Learning & Sequence Models',
    tagline: 'Master Artificial Neural Networks, Recurrent Neural Networks, LSTMs, and GRU gates.',
    description: 'Transition from classical NLP to deep learning: Artificial Neural Networks (ANN), forward/backward propagation with time (BPTT), vanishing/exploding gradients, Long Short-Term Memory (LSTM) gating mechanisms, Gated Recurrent Units (GRU), and Sequence-to-Sequence (Seq2Seq) architectures.',
    category: 'Deep Learning',
    difficulty: 'Intermediate',
    durationWeeks: '4 Weeks',
    courseSources: ['COURSE 01'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 1 with end-to-end projects in Keras/TensorFlow and Streamlit.',
    whatIsIt: 'Neural network architectures designed for processing sequential data where current outputs depend on preceding historical context.',
    whyNeeded: 'Understanding recurrence, memory cells, and gating mechanisms (forget gate, input gate) provides the historical foundation and mathematical intuition that led directly to the development of the Self-Attention mechanism.',
    whatToLearn: [
      'ANN vs RNN: feedforward vs cyclic sequence processing',
      'Simple RNN: Forward propagation with time and Backpropagation Through Time (BPTT)',
      'The Vanishing and Exploding Gradient Problem in standard RNNs',
      'End-to-End ANN Classification & Regression with Keras and Streamlit',
      'Embedding layers in deep learning models (Keras Embedding Layer)',
      'LSTM Architecture: Cell State ($C_t$), Hidden State ($h_t$), and gates',
      'Forget Gate: determining what past information to discard',
      'Input Gate and Candidate Memory: incorporating new information',
      'Output Gate: computing the new hidden state',
      'Gated Recurrent Unit (GRU): combining hidden and cell states with Reset and Update gates',
      'Bidirectional RNNs: capturing both left-to-right and right-to-left contextual semantics',
      'Encoder-Decoder Sequence-to-Sequence (Seq2Seq) architecture and information bottlenecks'
    ],
    whatCoursesCover: [
      'Course 1: Section 11 (Lectures 63–64: Introduction to Deep Learning for NLP, ANN vs RNN)',
      'Course 1: Section 12 (Lectures 65–67: Simple RNN Forward/Backward Propagation with Time, Problems with RNN)',
      'Course 1: Section 13 (Lectures 68–75: ANN Classification/Regression Project with Streamlit)',
      'Course 1: Section 14 (Lectures 76–82: End-to-End Simple RNN Project on IMDB Dataset)',
      'Course 1: Section 15 (Lectures 83–90: LSTM Intuition, Architecture, Forget/Input/Output Gates, GRU)',
      'Course 1: Section 16 (Lectures 91–96: LSTM & GRU Next Word Prediction Project with Streamlit)',
      'Course 1: Section 17 (Lecture 97: Bidirectional RNN)',
      'Course 1: Section 18 (Lectures 98–99: Sequence to Sequence Encoder-Decoder Architecture & Bottlenecks)'
    ],
    whatIsMissing: 'PyTorch implementation details (Course 1 uses TensorFlow/Keras for deep learning projects) and CUDA low-level memory optimizations.',
    interviewFocus: [
      {
        question: 'How does the LSTM cell architecture solve the vanishing gradient problem inherent in simple RNNs?',
        answerStrategy: 'Explain the constant error carousel provided by the Cell State ($C_t$). Because updates to the cell state are primarily additive ($C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$), gradients can flow backward through time without decaying exponentially, unlike standard RNNs where gradients repeatedly multiply weight matrices.'
      },
      {
        question: 'What is the structural information bottleneck in classical Encoder-Decoder Seq2Seq models without attention?',
        answerStrategy: 'The entire input sequence, regardless of length, is compressed into a single fixed-length context vector emitted by the final encoder hidden state. For long sentences, early tokens are forgotten and nuance is lost.'
      }
    ],
    practicalTask: 'Implement a character- or word-level next-word text prediction model using LSTM/GRU layers in Keras and wrap it in a Streamlit interactive typing interface.',
    projectConnection: 'Provides the foundation for understanding sequence modeling, token predictions, and autoregressive generation utilized in all modern LLMs.',
    tools: ['TensorFlow / Keras', 'Streamlit', 'Python', 'NumPy'],
    topicsList: [
      'ANN Classification & Regression',
      'Simple RNN & BPTT',
      'Vanishing / Exploding Gradients',
      'Keras Embedding Layers',
      'LSTM Architecture & Cell State',
      'LSTM Forget / Input / Output Gates',
      'GRU Reset & Update Gates',
      'Bidirectional RNN',
      'Seq2Seq Encoder-Decoder',
      'Next Word Prediction Project'
    ],
    previousStageId: '02',
    nextStageId: '04'
  },

  // -------------------------------------------------------------
  // STAGE 04: The Transformer Architecture & Attention
  // -------------------------------------------------------------
  {
    id: '04',
    number: 4,
    title: 'The Transformer Architecture & Attention',
    tagline: 'Deep dive into Self-Attention, Multi-Head Attention, Positional Encoding, and LayerNorm.',
    description: 'Master the revolutionary architecture behind modern AI: the Attention Mechanism, Scaled Dot-Product Self-Attention ($QK^T / \\sqrt{d_k}$), Multi-Head Attention, Positional Encodings, Pre/Post Layer Normalization, Feed-Forward Networks, and Masked Multi-Head Attention in Decoders.',
    category: 'Deep Learning',
    difficulty: 'Intermediate',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01'],
    coverageStatus: 'Covered',
    coverageNote: 'Excellently covered in Course 1 with full mathematical intuition across 15 in-depth lectures.',
    whatIsIt: 'The foundational neural network architecture ("Attention Is All You Need") that replaced recurrent sequence processing with parallelized self-attention.',
    whyNeeded: 'Every modern LLM (GPT-4, Claude, Llama 3, Gemini, Mistral) is built on the Transformer architecture. You cannot optimize context windows, KV-caching, or temperature without understanding attention mechanics.',
    whatToLearn: [
      'Seq2Seq Attention Mechanism: computing alignment scores across input tokens',
      'Why Transformers replaced RNNs: O(1) sequential operations and full GPU parallelization',
      'Query (Q), Key (K), and Value (V) linear projections',
      'Scaled Dot-Product Self-Attention: $Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$',
      'Multi-Head Attention: allowing the model to jointly attend to information at different subspace representations',
      'Feed-Forward Neural Networks (FFN) with Multi-Head Attention',
      'Positional Encodings (sinusoidal and learned) to preserve word order',
      'Layer Normalization vs Batch Normalization and residual skip connections',
      'Complete Encoder Transformer Architecture end-to-end',
      'Decoder Transformer Architecture: Masked Multi-Head Attention preventing future token peeking',
      'Encoder-Decoder Cross-Attention mechanics',
      'Final Linear and Softmax output projection over the token vocabulary'
    ],
    whatCoursesCover: [
      'Course 1: Section 19 (Lecture 100: Attention Mechanism In-depth Architecture Explanation)',
      'Course 1: Section 20 (Lectures 101–103: Plan of Action, What & Why Transformers, Encoder Architecture)',
      'Course 1: Section 20 (Lectures 104–106: Self-Attention Layer Working [1hr 2m deep-dive!], Multi-Head Attention, FFN)',
      'Course 1: Section 20 (Lectures 107–110: Positional Encoding, Layer Normalization, Complete Encoder)',
      'Course 1: Section 20 (Lectures 111–114: Decoder Masked Attention, Encoder-Decoder Attention, Final Linear/Softmax)'
    ],
    whatIsMissing: 'Modern decoder-only optimizations such as FlashAttention-2, Grouped-Query Attention (GQA), and Rotary Position Embedding (RoPE) mathematical derivation.',
    interviewFocus: [
      {
        question: 'Why are dot products scaled by $1 / \\sqrt{d_k}$ in the Scaled Dot-Product Attention formula?',
        answerStrategy: 'For large values of $d_k$, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (gradient vanishing). Scaling by $1 / \\sqrt{d_k}$ preserves unit variance and maintains stable gradients during backpropagation.'
      },
      {
        question: 'What is the role of the causal attention mask in the Transformer Decoder?',
        answerStrategy: 'The causal mask sets attention scores for future positions to $-\\infty$ before the softmax step. This ensures that during autoregressive generation, predictions for token at position $t$ can only depend on known tokens at positions $< t$.'
      }
    ],
    practicalTask: 'Write a pure NumPy or PyTorch implementation of the Scaled Dot-Product Self-Attention function including causal masking.',
    projectConnection: 'Underpins all downstream LLM engineering, token generation parameters, and cross-encoder rerankers used in advanced RAG.',
    tools: ['Transformers', 'PyTorch / NumPy', 'Attention Visualization'],
    topicsList: [
      'Attention Mechanism in Seq2Seq',
      'Query, Key, Value Projections',
      'Scaled Dot-Product Self-Attention',
      'Multi-Head Attention',
      'Positional Encodings',
      'Layer Normalization & Residuals',
      'Encoder Architecture',
      'Masked Decoder Attention',
      'Encoder-Decoder Cross-Attention',
      'Softmax Token Probabilities'
    ],
    previousStageId: '03',
    nextStageId: '05'
  },

  // -------------------------------------------------------------
  // STAGE 05: LLM Foundations & Prompt Engineering
  // -------------------------------------------------------------
  {
    id: '05',
    number: 5,
    title: 'LLM Foundations & Prompt Engineering',
    tagline: 'Understand pretraining, Llama 3, OpenAI, Groq LPU, Ollama local inference, and prompt strategies.',
    description: 'Learn how modern Large Language Models are pretrained and fine-tuned. Compare frontier APIs (OpenAI, Anthropic Claude) with open-source models (Llama 3, Mistral) running locally on Ollama and accelerated via Groq LPU cloud inference.',
    category: 'GenAI & LLMs',
    difficulty: 'Intermediate',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered across Course 1 (Sections 21, 23, 25) and Course 2 (Sections 2, 7).',
    whatIsIt: 'The operational layer for working with autoregressive foundation models, API providers, local runtimes, and prompt crafting.',
    whyNeeded: 'AI engineers must choose the right model for each task balancing cost, privacy, context window, and latency (Time-to-First-Token).',
    whatToLearn: [
      'What is Generative AI: AI vs ML vs DL vs GenAI',
      'How ChatGPT and Llama 3 models are trained (Pretraining, SFT, RLHF)',
      'Evolution of open-source vs proprietary LLM architectures',
      'Prompt Engineering vs Fine-Tuning vs RAG trade-offs',
      'System prompts, instruction tuning, and few-shot in-context learning',
      'Sampling parameters: Temperature, Top-P, and Context Windows',
      'Cloud inference with Groq LPU (Language Processing Unit) for ultra-low latency',
      'Local model execution with Ollama (Llama 3, Mistral, Gemma 2)',
      'Building basic GenAI apps with OpenAI and Ollama backends'
    ],
    whatCoursesCover: [
      'Course 1: Section 21 (Lectures 115–118: GenAI Introduction, Training ChatGPT/Llama3, Model Evolution)',
      'Course 1: Section 23 (Lecture 121: Getting Started With LangChain and OpenAI)',
      'Course 1: Section 25 (Lectures 134–139: Open AI and Ollama Setup, GenAI Apps, LangSmith Tracking)',
      'Course 1: Section 26 (Lecture 140: Open-source models using Groq API)',
      'Course 2: Section 2 (Lecture 5: Prompt Engineering vs Fine-Tuning vs RAG)',
      'Course 2: Section 7 (Lecture 31: How to use GROQ LLM)'
    ],
    whatIsMissing: 'Direct-preference optimization (DPO) and detailed inference quantization kernels (vLLM, GGUF).',
    interviewFocus: [
      {
        question: 'When should a company choose RAG over Fine-Tuning or Prompt Engineering?',
        answerStrategy: 'Prompt Engineering is for task definition; Fine-Tuning is for teaching tone, specialized formatting, or domain vocabulary; RAG is for injecting dynamic, proprietary, or real-time factual knowledge with verifiable source citations and access controls.'
      },
      {
        question: 'What is the architectural difference between running an LLM on Groq LPUs versus standard Nvidia GPUs?',
        answerStrategy: 'Groq LPUs use a Tensor Streaming Processor (TSP) architecture with deterministic execution and massive SRAM bandwidth on-chip, eliminating GPU memory bus bottlenecks and achieving hundreds of tokens per second.'
      }
    ],
    practicalTask: 'Deploy a local Llama 3 instance using Ollama and build a Python script comparing its latency and completion against Groq LPU cloud API.',
    projectConnection: 'Sets up the foundational model backends used across all RAG and Agent projects.',
    tools: ['Ollama', 'Groq API', 'OpenAI API', 'Llama 3', 'Python'],
    topicsList: [
      'Pretraining & SFT & RLHF',
      'Open vs Proprietary Models',
      'Prompt vs RAG vs Fine-Tuning',
      'System Prompts & Few-Shot',
      'Temperature & Top-P',
      'Groq LPU Acceleration',
      'Local LLMs with Ollama',
      'Context Windows & Latency'
    ],
    previousStageId: '04',
    nextStageId: '06'
  },

  // -------------------------------------------------------------
  // STAGE 06: LLM Application Engineering & Structured Outputs
  // -------------------------------------------------------------
  {
    id: '06',
    number: 6,
    title: 'LLM Application Engineering & Structured Outputs',
    tagline: 'Build production chains with LangChain Expression Language (LCEL), Pydantic schemas, and streaming.',
    description: 'Master modern application orchestration: LangChain v1, LangChain Expression Language (LCEL), streaming invocations, message types, and strict structured outputs using Pydantic, TypedDict, and Python DataClasses.',
    category: 'GenAI & LLMs',
    difficulty: 'Intermediate',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02', 'COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered across Course 1 (Sections 26, 29), Course 2 (Section 13), and Course 3 (Week 1).',
    whatIsIt: 'The orchestration framework that connects prompts, models, output parsers, and external tools into composable, streaming pipelines.',
    whyNeeded: 'Raw LLM completions produce unstructured conversational text. Production applications require guaranteed, validated JSON schemas to drive APIs, databases, and frontends.',
    whatToLearn: [
      'LangChain Expression Language (LCEL) piping syntax: prompt | model | output_parser',
      'Message abstractions: SystemMessage, HumanMessage, AIMessage, ToolMessage',
      'Batch processing, streaming (astream), and event streaming (astream_events)',
      'Structured Outputs: enforcing Pydantic BaseModel validation on LLM completions',
      'Alternative schema typing: TypedDict and Python Dataclasses for output formatting',
      'Deploying runnables as standalone REST APIs using LangServe',
      'Summarization and Human-in-the-loop middleware patterns in LangChain v1',
      'Conversational memory and managing chat message history'
    ],
    whatCoursesCover: [
      'Course 1: Section 26 (Lectures 141–142: Building Chains with LCEL, Deploying with LangServe)',
      'Course 1: Section 27 (Lectures 143–145: Chatbots with Message History & Memory)',
      'Course 1: Section 29 (Lectures 148–159: LangChain v1 updates, Structured Output with Pydantic, TypedDict, DataClasses)',
      'Course 2: Section 13 (Lectures 57–67: LangChain v1, Invoke & Batch Streaming, Structured Output, Middleware)',
      'Course 3: Section 1 (Lectures 9–14: Frontend-Backend Architecture, Streaming APIs, Structured Prompts)'
    ],
    whatIsMissing: 'Outlines / Instructor grammar-constrained sampling at the C-level (covered via Pydantic API layer).',
    interviewFocus: [
      {
        question: 'Why should you prefer LCEL (LangChain Expression Language) over legacy LangChain chains?',
        answerStrategy: 'LCEL provides first-class support for streaming, asynchronous execution, parallel batching, transparent component inspection, and easy integration with LangSmith observability without subclassing boilerplate.'
      },
      {
        question: 'How does structured output with Pydantic guarantee schema conformity in production?',
        answerStrategy: 'Modern models support constrained decoding (json_schema) at the sampling level, where the API masks out tokens that violate the Pydantic schema, guaranteeing valid JSON without relying on regex post-processing.'
      }
    ],
    practicalTask: 'Build an LCEL pipeline that accepts customer feedback, streams tokens via Server-Sent Events, and outputs a validated Pydantic object containing sentiment, category, and urgency score.',
    projectConnection: 'Used to build structured backends in the Healthcare AI SaaS (Course 3) and Agentic RAG projects (Course 2).',
    tools: ['LangChain v1', 'LCEL', 'Pydantic v2', 'LangServe', 'FastAPI'],
    topicsList: [
      'LCEL Pipe Syntax',
      'PromptTemplates & Messages',
      'Pydantic Structured Outputs',
      'TypedDict & DataClasses',
      'Token Streaming (SSE)',
      'LangServe API Deployment',
      'Summarization Middleware',
      'Conversation Memory'
    ],
    previousStageId: '05',
    nextStageId: '07'
  },

  // -------------------------------------------------------------
  // STAGE 07: RAG Fundamentals & Document Ingestion
  // -------------------------------------------------------------
  {
    id: '07',
    number: 7,
    title: 'RAG Fundamentals & Document Ingestion',
    tagline: 'Build ingestion pipelines for PDF, DOCX, CSV, Excel, JSON, and SQL with vector stores.',
    description: 'Master the core mechanics of Retrieval-Augmented Generation: document ingestion, handling messy PDFs, Word documents, tabular data (CSV/Excel), JSON, and SQL database parsing. Generate embeddings and index them in ChromaDB, FAISS, AstraDB, and Pinecone.',
    category: 'RAG',
    difficulty: 'Intermediate',
    durationWeeks: '4 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 1 (Sections 24, 25, 40) and Course 2 (Sections 3, 5, 6, 7).',
    whatIsIt: 'The data engineering and ingestion foundation of RAG that converts heterogenous enterprise files into chunked, embedded vector representations.',
    whyNeeded: '80% of RAG failures stem from poor ingestion: bad PDF parsing, lost table structures, or inappropriate chunk sizes that fragment crucial context.',
    whatToLearn: [
      'Core RAG components: Ingestion, Chunking, Embedding, Vector Storage, Retrieval, Generation',
      'Document loaders: TextLoader, PyPDFLoader, UnstructuredWordDocumentLoader',
      'Handling messy PDF issues (multi-column text, headers/footers, scanned artifacts)',
      'Parsing structured tabular files: CSV, Excel, and JSON',
      'SQL database parsing and ingestion for RAG systems',
      'Text splitting algorithms: CharacterTextSplitter, RecursiveCharacterTextSplitter, HTMLHeaderTextSplitter',
      'Dense vector embeddings: HuggingFace sentence-transformers and OpenAI text-embedding-3',
      'Cosine similarity vs Euclidean distance vs Dot product',
      'Vector Stores vs Full Vector Databases: ephemeral vs distributed persistence',
      'Building traditional RAG with ChromaDB, FAISS, DataStax AstraDB, and Pinecone',
      'Adding and updating documents dynamically in existing vector indexes'
    ],
    whatCoursesCover: [
      'Course 1: Section 24 (Lectures 122–133: LangChain Loaders, Recursive Splitters, OpenAI/Ollama/HuggingFace Embeddings, FAISS, ChromaDB)',
      'Course 1: Section 40 (Lecture 198: PDF Query RAG with LangChain and AstraDB)',
      'Course 2: Section 3 (Lectures 6–7: Core Components in RAG: Ingestion vs Query Phase)',
      'Course 2: Section 5 (Lectures 9–18: Ingesting & Parsing Text, PDFs, Word, CSV, Excel, JSON, SQL DBs)',
      'Course 2: Section 6 (Lectures 19–23: Embeddings, Cosine Similarity Visualization, HuggingFace & OpenAI Embeddings)',
      'Course 2: Section 7 (Lectures 24–36: Vector Stores vs Vector DBs, ChromaDB, FAISS, InMemory, AstraDB, Pinecone)'
    ],
    whatIsMissing: 'OCR parsing for handwritten scanned records (Tesseract/PaddleOCR deep dive) and high-throughput chunking queues (Kafka/Celery).',
    interviewFocus: [
      {
        question: 'Why is RecursiveCharacterTextSplitter preferred over simple CharacterTextSplitter for natural text?',
        answerStrategy: 'RecursiveCharacterTextSplitter attempts to split on a hierarchy of characters (double newlines, single newlines, spaces, characters). This preserves semantic paragraphs and complete sentences together, whereas simple splitters cut text arbitrarily mid-sentence.'
      },
      {
        question: 'What is the architectural difference between a local Vector Store like FAISS and a cloud Vector Database like Pinecone or AstraDB?',
        answerStrategy: 'FAISS is an in-memory library for approximate nearest neighbor search; it lacks CRUD operations, horizontal clustering, metadata filtering at scale, and replication. Cloud vector DBs (Pinecone/AstraDB) provide managed distributed storage, high availability, scalar metadata filtering, and real-time upserts.'
      }
    ],
    practicalTask: 'Build a multi-document ingestion pipeline using UV that ingests PDFs, CSVs, and Word docs, chunks them with RecursiveCharacterTextSplitter, and indexes them in ChromaDB with metadata.',
    projectConnection: 'Forms the baseline ingestion pipeline for the End-to-End RAG Search Project (Course 2) and Document Q&A (Course 1).',
    tools: ['ChromaDB', 'FAISS', 'AstraDB', 'Pinecone', 'LangChain', 'uv'],
    topicsList: [
      'Document Loaders',
      'PDF Parsing & Issues',
      'Word & Excel & CSV Parsing',
      'SQL DB Ingestion',
      'Recursive Text Splitting',
      'Dense Embeddings',
      'Cosine Similarity',
      'Vector Stores vs Vector DBs',
      'ChromaDB & FAISS',
      'AstraDB & Pinecone'
    ],
    diagramType: 'rag',
    previousStageId: '06',
    nextStageId: '08'
  },

  // -------------------------------------------------------------
  // STAGE 08: Advanced Chunking & Semantic Splitting
  // -------------------------------------------------------------
  {
    id: '08',
    number: 8,
    title: 'Advanced Chunking & Semantic Splitting',
    tagline: 'Break free from fixed-token splits with semantic breakpoint chunking.',
    description: 'Fixed-character splitting often breaks sentences across semantic boundaries. Master Semantic Chunking: embedding consecutive sentences, computing cosine distance spikes, and splitting documents only when the topical meaning actually shifts.',
    category: 'RAG',
    difficulty: 'Advanced',
    durationWeeks: '2 Weeks',
    courseSources: ['COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Exclusively taught in Course 2 (Section 8) with mathematical intuition and custom Python implementations.',
    whatIsIt: 'A dynamic text partitioning strategy that places chunk boundaries at points of semantic divergence rather than arbitrary token counts.',
    whyNeeded: 'Fixed chunking arbitrarily slices paragraphs in half, severing explanations from their context. Semantic chunking ensures every retrieved passage represents a coherent, self-contained thought.',
    whatToLearn: [
      'The limitations of fixed-size and sliding-window chunking',
      'Sentence splitting and sliding buffer windowing',
      'Computing consecutive sentence embedding vectors',
      'Calculating cosine distance differentials between adjacent sentence pairs',
      'Identifying breakpoint thresholds (percentile-based or standard deviation spikes)',
      'Implementing Semantic Chunking in pure Python from scratch',
      'Using LangChain Experimental SemanticChunker with HuggingFace/OpenAI embeddings',
      'Evaluating chunk boundary quality on technical documents'
    ],
    whatCoursesCover: [
      'Course 2: Section 8 (Lecture 37: Semantic Chunking with RAG Concept)',
      'Course 2: Section 8 (Lecture 38: Semantic Chunking with Python Implementation from scratch)',
      'Course 2: Section 8 (Lecture 39: Building RAG Pipeline with Semantic Chunker)',
      'Course 2: Section 8 (Lecture 40: Semantic Chunking with LangChain)'
    ],
    whatIsMissing: 'Hierarchical Late Chunking and Contextual Retrieval (Anthropic late chunking embeddings).',
    interviewFocus: [
      {
        question: 'How does Semantic Chunking determine where to place a split boundary in a document?',
        answerStrategy: 'It splits text into sentences, computes embeddings for each sentence, and calculates the cosine distance between adjacent sentences. When the distance exceeds a specified threshold (e.g. 95th percentile of distances across the document), it indicates a topic shift and places a chunk split.'
      }
    ],
    practicalTask: 'Write a Python script that takes a long technical essay, plots the cosine distance curve between consecutive sentences using Matplotlib, and generates semantic chunks at peak distance spikes.',
    projectConnection: 'Integrated into the End-to-End RAG Document Search project to significantly boost retrieval quality.',
    tools: ['Python', 'LangChain SemanticChunker', 'OpenAI Embeddings', 'Matplotlib'],
    topicsList: [
      'Fixed vs Semantic Chunking',
      'Sentence Embeddings',
      'Cosine Distance Spikes',
      'Breakpoint Thresholds',
      'Python Semantic Chunker',
      'LangChain SemanticChunker',
      'Topical Coherence'
    ],
    previousStageId: '07',
    nextStageId: '09'
  },

  // -------------------------------------------------------------
  // STAGE 09: Hybrid Search & Retrieval Optimization
  // -------------------------------------------------------------
  {
    id: '09',
    number: 9,
    title: 'Hybrid Search & Retrieval Optimization',
    tagline: 'Combine Dense Vector embeddings with BM25 Sparse search, RRF, Rerankers, and MMR.',
    description: 'Solve the single biggest weakness of vector search: keyword blindness. Combine dense semantic retrieval with sparse lexical BM25 matching using Reciprocal Rank Fusion (RRF), Cross-Encoder Rerankers, and Maximal Marginal Relevance (MMR) for diversity.',
    category: 'RAG',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Taught in Course 1 (Section 46 with Pinecone) and Course 2 (Section 9 with LangChain & Rerankers).',
    whatIsIt: 'Multi-stage retrieval systems that fuse dense geometric vectors with sparse inverted keyword indexes and rescore candidates.',
    whyNeeded: 'Dense vector search captures general meaning but fails catastrophically on exact acronyms, model numbers, IDs, and domain jargon. Hybrid search delivers enterprise-grade retrieval precision.',
    whatToLearn: [
      'Dense vs Sparse representations (Dense vector embeddings vs Sparse BM25 / TF-IDF vectors)',
      'Building a dual-index retriever combining Dense + BM25 in LangChain',
      'Reciprocal Rank Fusion (RRF) algorithm: $RRF(d) = \\sum \\frac{1}{k + rank(d)}$',
      'Implementing Hybrid Search with Pinecone and LangChain',
      'Cross-Encoder Reranking: re-evaluating top candidates with joint attention',
      'Reranking hybrid search strategies and practical latency trade-offs',
      'Maximal Marginal Relevance (MMR): balancing relevance against passage diversity',
      'MMR mathematical formula: $\\arg\\max [\\lambda \\text{Sim}_1(d, q) - (1-\\lambda) \\max \\text{Sim}_2(d, d_i)]$',
      'When to use and when NOT to use MMR (avoiding redundancy in summaries)'
    ],
    whatCoursesCover: [
      'Course 1: Section 46 (Lectures 209–211: Hybrid Search Intro, Reciprocal Rank Fusion, Pinecone DB Hybrid RAG)',
      'Course 2: Section 9 (Lectures 41–43: Combining Dense & Sparse Matrix, Dense/Sparse Retriever in LangChain, Benefits)',
      'Course 2: Section 9 (Lectures 44–45: Reranking Hybrid Search Strategy & Implementation)',
      'Course 2: Section 9 (Lectures 46–48: Maximal Marginal Relevance [MMR] Theory, Implementation, Trade-offs)'
    ],
    whatIsMissing: 'ColBERT late-interaction token retrieval (multi-vector token matching) and Elasticsearch dense/sparse hybrid pipelines.',
    interviewFocus: [
      {
        question: 'Why does Reciprocal Rank Fusion (RRF) work better than simply adding raw vector similarity scores to BM25 scores?',
        answerStrategy: 'Dense vector similarity scores (typically between 0 and 1) and BM25 scores (unbounded positive numbers) operate on completely different statistical distributions. RRF relies solely on rank positions ($1 / (k + rank)$), making it scale-invariant and immune to score calibration discrepancies.'
      },
      {
        question: 'What problem does Maximal Marginal Relevance (MMR) solve during the retrieval stage?',
        answerStrategy: 'Standard vector search returns the top-K most similar chunks, which are often nearly identical duplicate sentences. MMR balances query similarity against novelty relative to already selected chunks using a parameter $\\lambda$, preventing repetitive context.'
      }
    ],
    practicalTask: 'Implement a Hybrid Retriever combining BM25 and ChromaDB embeddings, merge candidates using RRF, and apply an MMR filter to return 5 distinct, non-redundant passages.',
    projectConnection: 'A core architectural component of the End-to-End Hybrid Search RAG project (Course 1) and Autonomous RAG (Course 2).',
    tools: ['Pinecone', 'ChromaDB', 'BM25', 'LangChain MMR', 'Cohere Rerank'],
    topicsList: [
      'Dense vs Sparse Vectors',
      'BM25 Keyword Matching',
      'Reciprocal Rank Fusion (RRF)',
      'Hybrid Retrieval Pipeline',
      'Cross-Encoder Reranking',
      'Maximal Marginal Relevance (MMR)',
      'Diversity vs Relevance Tuning'
    ],
    previousStageId: '08',
    nextStageId: '10'
  },

  // -------------------------------------------------------------
  // STAGE 10: Query Enhancement (HyDE, Expansion, Decomposition)
  // -------------------------------------------------------------
  {
    id: '10',
    number: 10,
    title: 'Query Enhancement (HyDE, Expansion, Decomposition)',
    tagline: 'Transform ambiguous user queries using Hypothetical Document Embeddings and Decomposition.',
    description: 'Users rarely write optimal search queries. Master Query Enhancement techniques: Query Expansion (generating multiple semantic perspectives), Query Decomposition (breaking complex multi-hop questions into sub-questions), and HyDE (Hypothetical Document Embeddings).',
    category: 'RAG',
    difficulty: 'Advanced',
    durationWeeks: '2 Weeks',
    courseSources: ['COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 2 (Section 10) with complete implementations.',
    whatIsIt: 'Pre-retrieval processing techniques where an LLM rewrites, expands, or hallucinates hypothetical answers to bridge the vocabulary gap between short queries and detailed documents.',
    whyNeeded: 'Short user questions ("how does x work?") have low embedding similarity to dense, detailed document passages. HyDE and Query Expansion align query representations directly with document corpora.',
    whatToLearn: [
      'The semantic vocabulary gap between queries and documents',
      'Query Expansion: prompting an LLM to generate 3–5 alternative rephrasings of user intent',
      'Executing parallel multi-query vector searches and deduplicating retrieved sets',
      'Query Decomposition: breaking complex multi-part questions into sequential sub-queries',
      'Sub-question retrieval and aggregate context synthesis',
      'Hypothetical Document Embeddings (HyDE) technique: generating a hypothetical answer to embed instead of the raw query',
      'When HyDE excels (exploratory conceptual queries) and when it fails (factual lookup of unknown data)'
    ],
    whatCoursesCover: [
      'Course 2: Section 10 (Lectures 49–50: Query Expansion Technique & Implementation)',
      'Course 2: Section 10 (Lecture 51: Query Decomposition Understanding and Implementation)',
      'Course 2: Section 10 (Lecture 52: HyDE Technique and Implementation)'
    ],
    whatIsMissing: 'Step-back prompting and conversational multi-turn query recontextualization (partially covered in LangGraph conversational memory).',
    interviewFocus: [
      {
        question: 'How does HyDE (Hypothetical Document Embeddings) work, and why does embedding a hallucinated document improve retrieval?',
        answerStrategy: 'An LLM generates a hypothetical answer to the query without external knowledge. Even if factually inaccurate, this hypothetical document shares the structure, style, and domain terminology of actual answer documents. Embedding the hypothetical text places the query closer to real relevant documents in vector space than the short query would.'
      }
    ],
    practicalTask: 'Build a LangChain runnable that takes a user query, generates a HyDE document, retrieves top-5 chunks, and compares recall against raw query search.',
    projectConnection: 'Elevates basic RAG retrieval to handle complex user questions in the Autonomous RAG and Financial Agent systems.',
    tools: ['LangChain', 'OpenAI / Groq', 'ChromaDB'],
    topicsList: [
      'Vocabulary Gap in Search',
      'Query Expansion',
      'Parallel Multi-Query Retrieval',
      'Query Decomposition',
      'Sub-Question Routing',
      'HyDE Technique',
      'Hypothetical Document Generation'
    ],
    previousStageId: '09',
    nextStageId: '11'
  },

  // -------------------------------------------------------------
  // STAGE 11: Multimodal, Conversational & Vectorless RAG
  // -------------------------------------------------------------
  {
    id: '11',
    number: 11,
    title: 'Multimodal, Conversational & Vectorless RAG',
    tagline: 'Process images, maintain conversational memory, and explore Cache RAG (CAG) & PageIndex.',
    description: 'Expand beyond basic text RAG: Multimodal RAG extracting text and diagrams from PDFs, conversational RAG with persistent session memory, Cache-Augmented Generation / Cache RAG (CAG), and Vectorless RAG using PageIndex.',
    category: 'RAG',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered in Course 2 (Sections 11, 21, 22, 23).',
    whatIsIt: 'Specialized RAG paradigms handling non-text modalities, persistent conversational context, prompt caching architectures, and non-vector document indexing.',
    whyNeeded: 'Enterprise documents are full of charts, images, and tables that pure text splitters ignore. Furthermore, long-context models now enable Vectorless RAG (PageIndex) and Cache RAG (CAG) for smaller document sets without vector DB overhead.',
    whatToLearn: [
      'Multimodal RAG concepts: joint text and image processing in documents',
      'Extracting and summarizing images from PDFs with vision LLMs (GPT-4o / Claude 3.5)',
      'Conversational RAG: maintaining multi-turn chat history alongside retrieved context',
      'RAG with Persistent Memory in LangGraph',
      'Cache-Augmented Generation (CAG) / Cache RAG: leveraging LLM prompt caching instead of vector databases',
      'Vectorless RAG with PageIndex: tree-based document structure navigation without vector embeddings',
      'Traditional Vector RAG vs Vectorless RAG trade-offs'
    ],
    whatCoursesCover: [
      'Course 2: Section 11 (Lectures 53–54: Introduction to MultiModal RAG, Implementation with PDF Text & Images)',
      'Course 2: Section 21 (Lectures 110–111: RAG with Persistent Memory with LangGraph, Agent RAG Memory)',
      'Course 2: Section 22 (Lectures 112–113: What is CAG [Cache-Augmented Generation], Advanced CAG with LangGraph)',
      'Course 2: Section 23 (Lectures 114–115: Vectorless RAG with PageIndex, Traditional vs Vectorless RAG)'
    ],
    whatIsMissing: 'Audio and video multimodal RAG (Whisper speech-to-text frame extraction).',
    interviewFocus: [
      {
        question: 'What is Cache-Augmented Generation (CAG) and how does it challenge traditional vector RAG?',
        answerStrategy: 'With modern million-token context windows and provider prompt caching (e.g. Claude/Gemini), entire document sets (hundreds of pages) can be placed directly into cached prompt context. This completely bypasses vector chunking, embedding generation, and retrieval errors, providing 100% recall at low cached-token cost.'
      }
    ],
    practicalTask: 'Build a Multimodal RAG pipeline that parses a PDF with embedded charts, uses a vision model to generate text descriptions for diagrams, and queries the combined index.',
    projectConnection: 'Powers complex enterprise document assistants that must process financial charts and multi-turn conversations.',
    tools: ['GPT-4o Vision', 'LangGraph Memory', 'PageIndex', 'Prompt Caching'],
    topicsList: [
      'Multimodal Document Parsing',
      'Vision LLM Embeddings',
      'Conversational RAG Memory',
      'LangGraph Checkpointed Memory',
      'Cache-Augmented Generation (CAG)',
      'Vectorless RAG (PageIndex)',
      'Prompt Caching Economies'
    ],
    previousStageId: '10',
    nextStageId: '12'
  },

  // -------------------------------------------------------------
  // STAGE 12: Knowledge Graphs & Graph RAG (Neo4j)
  // -------------------------------------------------------------
  {
    id: '12',
    number: 12,
    title: 'Knowledge Graphs & Graph RAG (Neo4j)',
    tagline: 'Connect structured entities and relationships using Neo4j AuraDB and Cypher queries.',
    description: 'Vector databases understand proximity but cannot traverse multi-hop relationships. Master Knowledge Graphs: Neo4j AuraDB cloud setup, Property Graph Data Models, Cypher Query Language (basic to advanced), LangChain GraphQuery chains, and Text-to-Cypher generation.',
    category: 'RAG',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered across Course 1 (Sections 47–48) and Course 2 (Sections 27–28) with hands-on Neo4j AuraDB labs.',
    whatIsIt: 'Representing knowledge as a network of nodes (entities) and directed edges (relationships) queried via structured graph languages like Cypher.',
    whyNeeded: 'When questions require multi-hop relationship reasoning ("Which suppliers of Company X share a director with Company Y?"), vector databases fail because the facts are separated across multiple documents. Graph RAG solves multi-hop reasoning.',
    whatToLearn: [
      'What is a Knowledge Graph: Entities, Attributes, and Relationships',
      'RDBMS vs Vector Database vs Graph Database comparisons',
      'Setting up a cloud Neo4j AuraDB database instance',
      'Neo4j Property Graph Data Model (Nodes, Labels, Relationships, Properties)',
      'Cypher Query Language syntax: MATCH, WHERE, RETURN, CREATE, MERGE',
      'Intermediate to Advanced Cypher: path traversals, aggregations, and variable-length patterns',
      'Inserting data into Graph DB with Python and LangChain',
      'Creating GraphQuery chains with LangChain for automated Text-to-Cypher translation',
      'Prompting strategies for Graph DB with LLMs (providing graph schema in prompt)'
    ],
    whatCoursesCover: [
      'Course 1: Section 47 (Lectures 212–218: Intro to Graph DB, Knowledge Graphs, Neo4j AuraDB, RDBMS vs Graph, Cypher Language)',
      'Course 1: Section 48 (Lectures 219–222: Inserting Data with Python & LangChain, GraphQuery Chains, Prompting Strategies)',
      'Course 2: Section 27 (Lectures 123–129: Graph DBs, Neo4j Setup, Cypher Query Language Basics to Advanced)',
      'Course 2: Section 28 (Lectures 130–133: Practical Implementation, GraphQuery Chains, Prompting Strategies)'
    ],
    whatIsMissing: 'Microsoft GraphRAG community clustering algorithm (Leiden hierarchical summarization).',
    interviewFocus: [
      {
        question: 'Why does Graph RAG outperform Vector RAG on multi-hop reasoning questions?',
        answerStrategy: 'Vector search retrieves documents based on isolated semantic similarity to the query string, which misses connected chains of facts. Graph RAG explicitly models relationships as graph edges, enabling Cypher queries to traverse 2-, 3-, or 4-degree connections between entities across disparate documents.'
      }
    ],
    practicalTask: 'Set up a free Neo4j AuraDB instance, model an enterprise relationship schema (Companies, Founders, Investors), and build a LangChain Text-to-Cypher agent.',
    projectConnection: 'Provides the relationship reasoning engine for enterprise intelligence and financial multi-agent systems.',
    tools: ['Neo4j AuraDB', 'Cypher Query Language', 'LangChain Neo4j', 'Python'],
    topicsList: [
      'Knowledge Graphs Concepts',
      'RDBMS vs Vector DB vs Graph DB',
      'Neo4j AuraDB Setup',
      'Property Graph Data Model',
      'Cypher Query Language',
      'Graph Traversal & Patterns',
      'Text-to-Cypher with LangChain',
      'Graph Prompting Strategies'
    ],
    previousStageId: '11',
    nextStageId: '13'
  },

  // -------------------------------------------------------------
  // STAGE 13: Autonomous Agents & The ReAct Framework
  // -------------------------------------------------------------
  {
    id: '13',
    number: 13,
    title: 'Autonomous Agents & The ReAct Framework',
    tagline: 'Build agents capable of reasoning, selecting tools, taking actions, and utilizing memory.',
    description: 'Transition from single-turn pipelines to autonomous reasoning loops. Master AI Agents vs Agentic AI, the ReAct (Reason + Act) design pattern, creating custom tools in LangChain, Agent Executors, multi-tool orchestration, and multi-agent workflows with CrewAI.',
    category: 'Autonomous Agents',
    difficulty: 'Intermediate',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered in Course 1 (Sections 30, 34, 35, 45) and Course 2 (Sections 12, 14, 15).',
    whatIsIt: 'Systems where the LLM is given tools and a goal, autonomously determining the sequence of actions to take based on environmental feedback.',
    whyNeeded: 'Real-world business tasks require external actions: querying live SQL databases, executing math calculators, searching the web, and iterating when errors occur.',
    whatToLearn: [
      'AI Agents vs Agentic AI: reactive tool usage vs autonomous workflow orchestration',
      'The ReAct pattern: Thought -> Action -> Observation -> Thought cycle',
      'Creating custom tools in LangChain with @tool decorator and schema type hints',
      'Agent Executors: orchestrating tool invocation and handling tool output messages',
      'Building search engines using LangChain tools and agents with open-source LLMs',
      'Building SQL Database Agents using LangChain SQL Toolkit for SQLite3 and MySQL',
      'Multi-agent workflows with CrewAI (e.g. YouTube Video to Blog Post agent team)',
      'Agent memory architectures for retaining intermediate tool findings'
    ],
    whatCoursesCover: [
      'Course 1: Section 34 (Lectures 178–181: Tools & Agents Intro, Creating Tools, Agent Executors, Search Engine App)',
      'Course 1: Section 35 (Lectures 182–186: Chat with SQL DB with LangChain SQL Toolkit and SQLite3/MySQL)',
      'Course 1: Section 45 (Lecture 208: Creating Multi AI Agents Using CrewAI: YouTube to Blog Project)',
      'Course 2: Section 12 (Lectures 55–56: AI Agents vs Agentic AI Conceptual Differences & Examples)',
      'Course 2: Section 15 (Lectures 84–86: Agents and ReAct Architecture Implementation, Agent with Memory)'
    ],
    whatIsMissing: 'Sandboxed code execution runtimes (E2B / Docker execution sandboxes) and agent security privilege escalation controls.',
    interviewFocus: [
      {
        question: 'How does the ReAct framework improve agent reliability over simple direct tool calling?',
        answerStrategy: 'ReAct forces the LLM to emit a verbal reasoning trace ("Thought") before calling an action ("Action"). This gives the model test-time compute to plan, observe the action result, adjust its strategy if a tool errors, and synthesize observations into a final grounded answer.'
      }
    ],
    practicalTask: 'Build a LangChain ReAct agent equipped with a custom calculator tool, Wikipedia search, and a SQLite database query tool that answers multi-step factual questions.',
    projectConnection: 'Directly utilized in the Search Engine Agent, Chat with SQL DB, and CrewAI Multi-Agent project.',
    tools: ['LangChain Tools', 'CrewAI', 'ReAct', 'SQLite3', 'AgentExecutor'],
    topicsList: [
      'AI Agents vs Agentic AI',
      'ReAct Pattern (Thought/Action/Obs)',
      'Custom Tools (@tool)',
      'Agent Executors',
      'SQL Database Toolkit',
      'CrewAI Multi-Agent Teams',
      'Tool Error Recovery'
    ],
    diagramType: 'agent',
    previousStageId: '12',
    nextStageId: '14'
  },

  // -------------------------------------------------------------
  // STAGE 14: LangGraph: Stateful Multi-Actor Agentic Workflows
  // -------------------------------------------------------------
  {
    id: '14',
    number: 14,
    title: 'LangGraph: Stateful Multi-Actor Workflows',
    tagline: 'Design cyclical state graphs, state schemas, conditional routers, and human-in-the-loop gates.',
    description: 'Linear DAG chains cannot handle production agent loops. Master LangGraph: StateGraph construction, State Schemas with Dataclasses and Pydantic validation, conditional routers, ToolsNode integration, token streaming (astream/stream_events), Human-In-The-Loop checkpoints, and LangGraph Studio.',
    category: 'Autonomous Agents',
    difficulty: 'Advanced',
    durationWeeks: '4 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'Thoroughly covered across Course 1 (Sections 30, 51, 52) and Course 2 (Sections 14, 15).',
    whatIsIt: 'A low-level orchestration framework that models agentic applications as state machines and cyclical graphs with durable persistence.',
    whyNeeded: 'Production agents require retry loops, dynamic branching, multi-actor coordination, persistent memory, and the ability to pause for human approval before executing irreversible actions.',
    whatToLearn: [
      'Why LangGraph: from linear DAGs to cyclical state graphs',
      'Setting up LangGraph with OpenAI, Groq, and LangSmith observability',
      'State Schema design using Python Dataclasses and Pydantic BaseModel validation',
      'Nodes as python functions mutating state and Edges defining control flow',
      'Conditional Edges and Routers based on LLM decisions or tool outputs',
      'Tools and ToolsNode integration for seamless multi-tool calling',
      'Building stateful conversational chatbots with persistent checkpointers',
      'Human-in-the-Loop (HITL) implementation: interrupting the graph before critical actions',
      'Streaming token responses using astream and stream_events',
      'Debugging and visual graph inspection with LangGraph Studio and LangSmith'
    ],
    whatCoursesCover: [
      'Course 1: Section 30 (Lectures 160–168: LangGraph Basics, ReAct Agent, Memory, HITL, Multi-Agents, LangSmith Debugging)',
      'Course 1: Section 51 (Lectures 227–230: Multi-Actor Apps with LangGraph, AstraDB Multi-AI RAG Chatbot)',
      'Course 1: Section 52 (Lectures 231–239: LangGraph Agent Architecture, Memory, HITL, LangSmith Tracing)',
      'Course 2: Section 14 (Lectures 68–83: LangGraph Basics, State Schema, Pydantic, Chains, Routers, ToolsNode, Multi-Tool Chatbots)',
      'Course 2: Section 15 (Lectures 87–89: Streaming with Astream, Stream Events, Debugging with LangGraph Studio)'
    ],
    whatIsMissing: 'Multi-tenant database checkpointing with PostgreSQL pools (course demonstrates in-memory/SQLite checkpointers).',
    interviewFocus: [
      {
        question: 'What is the role of reducers (e.g. add_messages) in a LangGraph State Schema?',
        answerStrategy: 'Reducers specify how updates from graph nodes are merged into the central state. Without a reducer, a node returning new messages would overwrite the entire message list; add_messages ensures new messages append to the conversation history while updating existing messages by ID.'
      },
      {
        question: 'How does LangGraph achieve Human-in-the-Loop (HITL) without losing execution state?',
        answerStrategy: 'Using checkpointers and interrupt_before / interrupt_after parameters on nodes. LangGraph executes up to the breakpoint, writes the full graph state to durable storage, and halts. Once human approval arrives, the graph resumes execution from that exact checkpoint.'
      }
    ],
    practicalTask: 'Build a LangGraph state machine with a research node, a tool node, and a human approval node that requires user confirmation before writing an email.',
    projectConnection: 'The foundational architectural engine for Agentic RAG, Autonomous RAG, and multi-agent systems in Courses 1 and 2.',
    tools: ['LangGraph', 'LangSmith', 'LangGraph Studio', 'Pydantic', 'Python'],
    topicsList: [
      'StateGraph & Cyclical Graphs',
      'State Schema (Pydantic/Dataclass)',
      'Nodes & Reducers (add_messages)',
      'Conditional Edges & Routers',
      'ToolsNode Integration',
      'Checkpointers & Memory',
      'Human-In-The-Loop (HITL)',
      'Streaming (astream_events)',
      'LangGraph Studio Debugging'
    ],
    previousStageId: '13',
    nextStageId: '15'
  },

  // -------------------------------------------------------------
  // STAGE 15: Advanced Agentic, Corrective (CRAG) & Multi-Agent RAG
  // -------------------------------------------------------------
  {
    id: '15',
    number: 15,
    title: 'Advanced Agentic, Corrective (CRAG) & Multi-Agent RAG',
    tagline: 'Implement Self-Reflection, Corrective RAG (CRAG), Adaptive RAG, and Supervisor multi-agent RAG.',
    description: 'Combine autonomous agents with retrieval systems: Traditional vs Agentic RAG, Chain-of-Thought (CoT) retrieval, Self-Reflection, Corrective RAG (CRAG) with web fallback, Adaptive RAG routing, and Multi-Agent RAG networks with Supervisor and Hierarchical architectures.',
    category: 'RAG',
    difficulty: 'Advanced',
    durationWeeks: '4 Weeks',
    courseSources: ['COURSE 02'],
    coverageStatus: 'Covered',
    coverageNote: 'One of the most valuable, advanced sections of Course 2 (Sections 16, 17, 18, 19, 20, 29).',
    whatIsIt: 'Intelligent RAG architectures where agents dynamically assess retrieval relevance, rewrite queries if retrieved documents are inadequate, and coordinate multi-agent teams to answer complex questions.',
    whyNeeded: 'Naive RAG blindly feeds whatever the vector DB returns into the generator, causing hallucinations when retrieval fails. Agentic and Corrective RAG verify retrieval quality before generation.',
    whatToLearn: [
      'Traditional RAG vs Agentic RAG: static chains vs dynamic query and retrieval loops',
      'Tool creation for RAG agents with LangGraph',
      'Autonomous RAG: Chain-of-Thought (CoT) and Self-Reflection node mechanics',
      'Query Planning and Decomposition with iterative retrieval loops',
      'Answer synthesis across disparate heterogeneous sources',
      'Corrective RAG (CRAG): evaluating document relevance; fallback to web search if relevance is low',
      'Adaptive RAG: dynamically routing queries between direct answer, vector DB, or web search based on complexity',
      'Multi-Agent RAG networks: specialized retrieval agents collaborating on complex queries',
      'Supervisor Multi-Agent RAG architecture: a central manager delegating subtasks to worker agents',
      'Hierarchical Agents with RAG for large-scale enterprise workflows'
    ],
    whatCoursesCover: [
      'Course 2: Section 16 (Lectures 90–95: Traditional vs Agentic RAG, Basic RAG with LangGraph, Tool Creation, Detailed Project)',
      'Course 2: Section 17 (Lectures 96–101: Autonomous RAG, Chain of Thoughts, Self-Reflection, Iterative Retrieval, Synthesis)',
      'Course 2: Section 18 (Lectures 102–105: Multi-Agent RAG, Multi-Agent Implementation, Supervisor Pattern, Hierarchical Agents)',
      'Course 2: Section 19 (Lectures 106–107: Corrective RAG [CRAG] Detailed Explanation and Implementation)',
      'Course 2: Section 20 (Lectures 108–109: Adaptive RAG Theoretical Understanding and Implementation)',
      'Course 2: Section 29 (Lectures 134–141: End-to-End RAG Document Search Project with LangGraph & ReAct)'
    ],
    whatIsMissing: 'RL-based agent reward fine-tuning (e.g. GRPO for RAG agents).',
    interviewFocus: [
      {
        question: 'How does Corrective RAG (CRAG) handle low-confidence or irrelevant document retrieval?',
        answerStrategy: 'CRAG incorporates a lightweight retrieval evaluator node that grades each retrieved chunk (relevant vs ambiguous vs irrelevant). If all chunks are graded irrelevant, the agent automatically rewrites the query and falls back to a real-time web search tool (e.g. Tavily/DuckDuckGo), completely preventing context-starved hallucinations.'
      },
      {
        question: 'What is the architectural difference between a Supervisor Multi-Agent network and Hierarchical Multi-Agent RAG?',
        answerStrategy: 'In a Supervisor network, a single supervisor LLM directly routes tasks to flat peer worker agents and aggregates responses. In Hierarchical Multi-Agent systems, managers delegate to domain team-lead agents who further coordinate specialized sub-workers, allowing deeper recursive problem decomposition.'
      }
    ],
    practicalTask: 'Build a Corrective RAG (CRAG) system in LangGraph that grades retrieved passages, triggers query rewriting and web search if scores are low, and outputs a verified cited answer.',
    projectConnection: 'The capstone project of Course 2: End-to-End RAG Document Search Project with LangGraph and Streamlit.',
    tools: ['LangGraph', 'CRAG', 'Adaptive RAG', 'Supervisor Pattern', 'Tavily / Wikipedia'],
    topicsList: [
      'Traditional vs Agentic RAG',
      'Self-Reflection Loops',
      'Corrective RAG (CRAG)',
      'Adaptive RAG Routing',
      'Multi-Agent RAG Networks',
      'Supervisor Agent Pattern',
      'Hierarchical Multi-Agent RAG',
      'Iterative Retrieval'
    ],
    previousStageId: '14',
    nextStageId: '16'
  },

  // -------------------------------------------------------------
  // STAGE 16: Deep Agents, Claude Code & Model Context Protocol (MCP)
  // -------------------------------------------------------------
  {
    id: '16',
    number: 16,
    title: 'Deep Agents, Claude Code & Model Context Protocol (MCP)',
    tagline: 'Harness the Model Context Protocol (MCP), Claude Code developer agents, and Deep Agent context engineering.',
    description: 'Explore the newest frontier in agent engineering: Anthropic Model Context Protocol (MCP) architecture, MCP servers for data pipelines and cybersecurity (Semgrep), Claude Code for developers (agent teams, views, hooks, plugins), and Deep Agents with context engineering and subagents.',
    category: 'Autonomous Agents',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered in Course 1 (Sections 52, 53, 54, 55) and Course 3 (Week 3 Lectures 65, 69, 83).',
    whatIsIt: 'Standardized protocols (MCP) and developer tool environments (Claude Code, Deep Agents) that allow agents to securely connect to tools, local files, and external systems across organizations.',
    whyNeeded: 'Standardizing tool integrations via MCP eliminates bespoke API wrappers. Claude Code and Deep Agents represent the state of the art in agentic software engineering and context manipulation.',
    whatToLearn: [
      'Introduction to Model Context Protocol (MCP): standardized client-host-server protocol',
      'Core components of MCP: Prompts, Resources, and Tools',
      'Communication between MCP components and integration with Claude Desktop',
      'Building MCP servers for AI agents in LangGraph and cloud runtimes',
      'Building AI Security Agents with MCP servers and Semgrep code analysis',
      'Claude Code ecosystem for developers: installation, agent views, and agent teams',
      'Hooks, skills, and plugins in Claude Code workflows',
      'Deep Agents with LangChain: backends, input context, and memory context engineering',
      'Skills context and SubAgents coordination in Deep Agent architectures'
    ],
    whatCoursesCover: [
      'Course 1: Section 52 (Lecture 239: MCP Implementation with LangGraph)',
      'Course 1: Section 53 (Lectures 240–246: Claude Code for Developers: Installation, Agents, Views, Teams, Hooks, Skills, Plugins)',
      'Course 1: Section 54 (Lectures 247–254: Building Deep Agents with LangChain, Context Engineering, SubAgents)',
      'Course 1: Section 55 (Lectures 255–258: Model Context Protocol [MCP] Intro, Components, Communication, Claude Desktop Demo)',
      'Course 3: Section 3 (Lectures 65, 69: AI Security Agents with MCP Servers and Semgrep, Deploying to Azure Container Apps)',
      'Course 3: Section 3 (Lectures 83, 85: AI Research Agents with MCP Servers, Deploying with Docker and App Runner)'
    ],
    whatIsMissing: 'MCP bidirectional streaming over WebSockets (courses focus on stdio and HTTP/SSE MCP transport).',
    interviewFocus: [
      {
        question: 'What problem does Anthropic Model Context Protocol (MCP) solve in agent application architectures?',
        answerStrategy: 'Previously, every AI framework (LangChain, AutoGen, CrewAI) had custom, incompatible tool wrappers. MCP creates a universal open protocol (analogous to LSP for IDEs) where developers write an MCP tool/resource server once, and any client (Claude Desktop, LangGraph, IDEs) can consume it securely.'
      }
    ],
    practicalTask: 'Build a custom MCP server in Python exposing local file search and database tools, connect it to Claude Desktop, and verify tool execution.',
    projectConnection: 'Integrated into the Cybersecurity Agent (Course 3) and AI Research Agent (Course 3).',
    tools: ['Model Context Protocol (MCP)', 'Claude Code', 'LangChain Deep Agents', 'Semgrep', 'Docker'],
    topicsList: [
      'MCP Architecture (Host/Client/Server)',
      'MCP Tools & Resources',
      'Claude Desktop Integration',
      'Claude Code Developer CLI',
      'Agent Teams & Hooks',
      'Deep Agents Context Engineering',
      'SubAgents Coordination',
      'Semgrep Security MCP Server'
    ],
    previousStageId: '15',
    nextStageId: '17'
  },

  // -------------------------------------------------------------
  // STAGE 17: AI Evaluation, Benchmarking & LLM-as-a-Judge
  // -------------------------------------------------------------
  {
    id: '17',
    number: 17,
    title: 'AI Evaluation, Benchmarking & LLM-as-a-Judge',
    tagline: 'Quantify chatbot and RAG quality with test datasets, LLM-as-a-Judge, and Langfuse.',
    description: 'Move past subjective "vibe checks" to empirical, automated evaluation: Chatbot input/output schema evaluation, building RAG test datasets, quantitative evaluators with metrics, comparing model performance, and implementing the LLM-as-a-Judge pattern in production using Langfuse.',
    category: 'Evaluation',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 02', 'COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Taught in Course 2 (Section 26) and Course 3 (Week 4 Lecture 112).',
    whatIsIt: 'The automated quality assurance discipline of measuring retrieval accuracy, answer faithfulness, and conversational quality against golden datasets.',
    whyNeeded: 'You cannot deploy an AI system to production without regression testing. A small prompt change can silently cause hallucinations or drop retrieval precision without automated evaluators.',
    whatToLearn: [
      'Evaluation of Chatbots: creating structured test input/output datasets with schemas',
      'Defining quantitative evaluation metrics for conversational AI',
      'The LLM-as-a-Judge pattern: using frontier models to grade system responses against ground truth',
      'Running comparative evaluation metrics across different LLMs (GPT-4o vs Claude vs Llama 3)',
      'RAG Evaluation: building test datasets with query, context, and ground truth answers',
      'Building automated RAG evaluators with retrieval and generation metrics',
      'Production LLM-as-a-Judge implementation using Langfuse observability platform'
    ],
    whatCoursesCover: [
      'Course 2: Section 26 (Lectures 118–120: Evaluation of Chatbot: Schema, Metrics, LLM-as-a-Judge across LLMs)',
      'Course 2: Section 26 (Lectures 121–122: RAG Evaluation: Build RAG, Create Test Dataset, Build Evaluators with Metrics)',
      'Course 3: Section 4 (Lecture 112: LLM-as-a-Judge Pattern with Langfuse Observability in Production)'
    ],
    whatIsMissing: 'Mathematical precision formulas for MRR and NDCG (taught conceptually via evaluator metrics) and synthetic dataset generation with Ragas.',
    interviewFocus: [
      {
        question: 'What are the main biases in LLM-as-a-Judge evaluation and how do you mitigate them?',
        answerStrategy: 'Key biases include position bias (preferring the first candidate), verbosity bias (preferring longer answers), and self-enhancement bias (favoring their own completions). Mitigations include pairwise swap evaluation (running A-B then B-A), strict rubric-based prompts, and averaging scores across different judge models.'
      }
    ],
    practicalTask: 'Create a 25-question golden benchmark dataset for a customer support bot and build an automated LLM-as-a-Judge script grading Faithfulness and Answer Relevance.',
    projectConnection: 'Validates quality across the End-to-End RAG project (Course 2) and Financial AI Agent (Course 3).',
    tools: ['LLM-as-a-Judge', 'Langfuse', 'LangChain Evaluators', 'Python'],
    topicsList: [
      'Chatbot Input/Output Schemas',
      'Test Dataset Creation',
      'LLM-as-a-Judge Pattern',
      'Comparative Model Evaluation',
      'RAG Evaluator Metrics',
      'Langfuse Production Evaluation',
      'Regression Testing'
    ],
    diagramType: 'eval',
    previousStageId: '16',
    nextStageId: '18'
  },

  // -------------------------------------------------------------
  // STAGE 18: Full-Stack Production AI & Streaming APIs
  // -------------------------------------------------------------
  {
    id: '18',
    number: 18,
    title: 'Full-Stack Production AI & Streaming APIs',
    tagline: 'Build production SaaS apps with FastAPI, Next.js, Clerk authentication, and Stripe billing.',
    description: 'Bridge the gap between Python scripts and commercial SaaS applications: Frontend-Backend architectures for LLMs (React, FastAPI, Next.js App Router), real-time Server-Sent Events (SSE) streaming, user authentication with Clerk, and subscription billing.',
    category: 'Production',
    difficulty: 'Intermediate',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 3: Week 1 (Lectures 1–22).',
    whatIsIt: 'The end-to-end full-stack application layer that wraps AI models into authenticated, monetizable, commercial web applications.',
    whyNeeded: 'Companies do not run Jupyter notebooks in production. An AI engineer must know how to build high-concurrency FastAPI backends, stream tokens to modern UIs, and enforce user authentication.',
    whatToLearn: [
      'Instant AI deployment: deploying live apps on Vercel with OpenAI integration',
      'Frontend-Backend decoupled architecture for LLM applications',
      'Building FastAPI backends for production LLM deployment',
      'Full-stack integration: Next.js App Router frontend communicating with FastAPI',
      'Implementing real-time token streaming (Server-Sent Events) with responsive UI',
      'Adding user authentication to production AI apps using Clerk',
      'Adding subscription billing (Stripe) to production AI SaaS applications',
      'Building commercial applications: Production Healthcare AI SaaS with streaming and structured prompts'
    ],
    whatCoursesCover: [
      'Course 3: Section 1 (Lectures 1–6: Instant AI Deployment on Vercel, Live SaaS Deployment, OpenAI Integration)',
      'Course 3: Section 1 (Lectures 9–14: Frontend-Backend Architecture with React, FastAPI, Next.js, Real-Time Streaming)',
      'Course 3: Section 1 (Lectures 15–18: Adding User Authentication with Clerk and Subscription Billing)',
      'Course 3: Section 1 (Lectures 19–22: Building Production Healthcare AI SaaS with FastAPI, Structured Prompts, Streaming)'
    ],
    whatIsMissing: 'WebSockets for bidirectional audio/video streaming (course focuses on REST and Server-Sent Events).',
    interviewFocus: [
      {
        question: 'Why are Server-Sent Events (SSE) preferred over standard REST request-response for LLM web applications?',
        answerStrategy: 'LLMs take seconds to generate full completions. Traditional REST blocks the HTTP connection, leading to poor user experience and client timeouts. SSE streams tokens incrementally as they are generated, reducing Time-to-First-Token (TTFT) to hundreds of milliseconds.'
      }
    ],
    practicalTask: 'Build a full-stack AI application with a FastAPI backend streaming responses via SSE to a Next.js/React frontend with Clerk authentication.',
    projectConnection: 'Directly builds the Production Healthcare AI SaaS application in Course 3 Week 1.',
    tools: ['FastAPI', 'Next.js / React', 'Server-Sent Events (SSE)', 'Clerk Auth', 'Vercel', 'Stripe'],
    topicsList: [
      'Full-Stack AI Architecture',
      'FastAPI Async Endpoints',
      'Next.js App Router Integration',
      'Token Streaming (SSE)',
      'Clerk User Authentication',
      'Subscription Billing',
      'Healthcare AI SaaS Project',
      'Vercel Cloud Deployment'
    ],
    previousStageId: '17',
    nextStageId: '19'
  },

  // -------------------------------------------------------------
  // STAGE 19: Containerization (Docker) & AWS Cloud Deployment
  // -------------------------------------------------------------
  {
    id: '19',
    number: 19,
    title: 'Containerization (Docker) & AWS Cloud Deployment',
    tagline: 'Package AI apps in Docker and deploy to AWS App Runner, Lambda, S3, API Gateway, and CloudFront.',
    description: 'Take containerized AI applications to enterprise cloud scale: Writing production Dockerfiles, containerizing AI agents, deploying to AWS Elastic Container Registry (ECR) and App Runner with auto-scaling, and building serverless architectures with AWS Lambda, S3, API Gateway, and CloudFront.',
    category: 'Cloud & DevOps',
    difficulty: 'Intermediate',
    durationWeeks: '4 Weeks',
    courseSources: ['COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 3: Week 1 (Lectures 23–31) and Week 2 (Lectures 32–49).',
    whatIsIt: 'Packaging AI microservices into immutable Docker containers and provisioning serverless cloud infrastructure on Amazon Web Services (AWS).',
    whyNeeded: 'Containerization guarantees environment parity across development and cloud runtimes. AWS provides the serverless auto-scaling compute (Lambda, App Runner) required for enterprise traffic.',
    whatToLearn: [
      'AWS setup, cost monitoring, and secure IAM user permissions for AI engineers',
      'Containerizing AI applications with Docker: writing optimized Docker images',
      'Pushing container images to Amazon Elastic Container Registry (ECR)',
      'Deploying Dockerized AI apps to AWS App Runner with automatic horizontal scaling',
      'Migrating AI applications from Vercel to AWS for production scale',
      'Serverless AI architectures: AWS Lambda + S3 + Amazon Bedrock',
      'Building Digital Twin AI assistants with Next.js and AWS Lambda',
      'Configuring AWS S3 buckets for production conversational memory storage',
      'Setting up API Gateway endpoints with CORS for LLM APIs',
      'Deploying AI frontends globally using Amazon CloudFront Content Delivery Network (CDN)',
      'Monitoring cloud resources and controlling AWS budget limits'
    ],
    whatCoursesCover: [
      'Course 3: Section 1 (Lectures 23–31: AWS Setup, IAM, Cost Monitoring, Docker Containerization, ECR, App Runner Auto-Scaling)',
      'Course 3: Section 2 (Lectures 32–38: AWS Foundations, S3, Lambda, Bedrock, Digital Twin with Next.js, Conversational Memory)',
      'Course 3: Section 2 (Lectures 39–45: AI Agents with Lambda & S3, API Gateway, CloudFront Global Frontend, CORS Configuration)',
      'Course 3: Section 2 (Lectures 46–49: Setting Up Bedrock on AWS, Lambda Deployment, CloudWatch Monitoring)'
    ],
    whatIsMissing: 'Kubernetes (EKS) cluster management and Helm charts (Course 3 focuses on Docker, App Runner, and Lambda serverless).',
    interviewFocus: [
      {
        question: 'When should an AI microservice be deployed on AWS App Runner versus AWS Lambda?',
        answerStrategy: 'AWS Lambda is ideal for event-driven, intermittent tasks with fast startup, but has strict execution timeouts (15 minutes) and cold-start latency with heavy Python AI packages. AWS App Runner runs persistent containers with zero cold starts and built-in auto-scaling, making it superior for continuous HTTP streaming workloads.'
      }
    ],
    practicalTask: 'Containerize a FastAPI LLM application with Docker, push the image to AWS ECR, and deploy it to AWS App Runner with auto-scaling.',
    projectConnection: 'Builds the AWS Digital Twin AI assistant and containerized infrastructure for Week 1 & 2 in Course 3.',
    tools: ['Docker', 'AWS IAM', 'AWS ECR', 'AWS App Runner', 'AWS Lambda', 'AWS S3', 'API Gateway', 'CloudFront'],
    topicsList: [
      'Docker Containerization',
      'AWS IAM & Cost Controls',
      'Amazon ECR Repositories',
      'AWS App Runner Auto-Scaling',
      'Serverless AWS Lambda',
      'Amazon S3 Memory Storage',
      'API Gateway & CORS',
      'CloudFront CDN Distribution',
      'Migrating Vercel to AWS'
    ],
    previousStageId: '18',
    nextStageId: '20'
  },

  // -------------------------------------------------------------
  // STAGE 20: Infrastructure as Code (Terraform) & CI/CD (GitHub Actions)
  // -------------------------------------------------------------
  {
    id: '20',
    number: 20,
    title: 'Infrastructure as Code (Terraform) & CI/CD',
    tagline: 'Automate multi-environment cloud infrastructure with Terraform and GitHub Actions CI/CD.',
    description: 'Never provision cloud resources manually through the console. Master Infrastructure as Code (IaC) with Terraform: provisioning AWS Lambda, S3, API Gateway, and multi-environment setups (Dev, Test, Prod), plus building automated GitHub Actions CI/CD pipelines deploying AI agents on git push.',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 3: Week 2 (Lectures 50–63).',
    whatIsIt: 'Defining cloud infrastructure declaratively in code and automating software delivery pipelines from git commit to live production.',
    whyNeeded: 'Manual cloud clicking leads to configuration drift, security holes, and untracked infrastructure costs. Automated CI/CD guarantees reliable testing and zero-downtime deployment for AI systems.',
    whatToLearn: [
      'Infrastructure as Code (IaC) fundamentals: declarative configuration with Terraform',
      'Writing Terraform HCL scripts for AWS Lambda, S3 buckets, and API Gateway',
      'Automating AI deployments combining Terraform and shell scripts',
      'Multi-environment AI deployments: setting up Dev, Test, and Production stages',
      'Testing production AI deployments and automated terraform destroy cleanup workflows',
      'Setting up Git and GitHub Actions for automated AI infrastructure deployment',
      'Building CI/CD workflows for automated AI model and agent deployments',
      'Live CI/CD pipeline deployment: from Git Push to verified production AI agent'
    ],
    whatCoursesCover: [
      'Course 3: Section 2 (Lectures 50–55: Infrastructure as Code with Terraform, Shell Scripts, Multi-Environment Dev/Test/Prod, Cleanup)',
      'Course 3: Section 2 (Lectures 56–62: GitHub Actions CI/CD for AI, Automated Infrastructure & Agent Deployments, Git Push to Live)',
      'Course 3: Section 2 (Lecture 63: Resource Management and Cost Control for Production AI Systems)'
    ],
    whatIsMissing: 'Terraform remote state locking with DynamoDB backend (demonstrated with local/cloud state).',
    interviewFocus: [
      {
        question: 'Why is Infrastructure as Code (Terraform) essential for multi-environment AI deployments (Dev, Test, Prod)?',
        answerStrategy: 'Terraform ensures environmental parity across Dev, Test, and Prod through reusable modules and environment-specific variable files (tfvars). This eliminates "works in dev, breaks in prod" bugs and allows spinning up or tearing down temporary test environments with a single command.'
      }
    ],
    practicalTask: 'Write a Terraform configuration provisioning an AWS Lambda function and S3 bucket, and set up a GitHub Actions workflow that automatically validates and deploys on push to main.',
    projectConnection: 'The deployment automation backbone used to deploy all subsequent Course 3 projects (ALEX Financial Agent, Research Agent).',
    tools: ['Terraform', 'GitHub Actions', 'AWS CLI', 'Git', 'Bash'],
    topicsList: [
      'Terraform IaC Fundamentals',
      'HCL AWS Provider & Resources',
      'Multi-Environment (Dev/Test/Prod)',
      'Terraform Cleanup Workflows',
      'GitHub Actions Workflows',
      'CI/CD Pipeline Automation',
      'Automated Agent Deployment',
      'Git Push to Production'
    ],
    previousStageId: '19',
    nextStageId: '21'
  },

  // -------------------------------------------------------------
  // STAGE 21: Enterprise AI on AWS Bedrock & SageMaker
  // -------------------------------------------------------------
  {
    id: '21',
    number: 21,
    title: 'Enterprise AI on AWS Bedrock & SageMaker',
    tagline: 'Orchestrate Claude models on AWS Bedrock, deploy SageMaker embeddings, and build Bedrock AgentCore.',
    description: 'Master Amazon Web Services dedicated AI platforms: Amazon Bedrock (serverless Claude 3.5, Llama 3, Titan), migrating from OpenAI to Bedrock, Amazon SageMaker vs Bedrock comparisons, deploying custom SageMaker embedding endpoints, vector data pipelines with S3, and Bedrock AgentCore loop-based reasoning systems.',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    durationWeeks: '4 Weeks',
    courseSources: ['COURSE 01', 'COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered in Course 1 (Section 43) and Course 3 (Week 2 Lectures 46–49, Week 3 Lectures 74–87, Week 4 Lectures 116–122).',
    whatIsIt: 'Amazon enterprise managed AI foundation model service (Bedrock) and custom machine learning model deployment platform (SageMaker).',
    whyNeeded: 'Enterprise companies with strict compliance, SOC2, and data residency policies forbid sending data to third-party endpoints. Deploying inside AWS Bedrock and SageMaker VPCs satisfies enterprise compliance.',
    whatToLearn: [
      'Amazon Bedrock architecture: serverless access to Anthropic Claude, Llama 3, and Titan',
      'Migrating AI applications from OpenAI API to AWS Bedrock for enterprise compliance',
      'Deploying Bedrock LLMs to AWS Lambda and testing production endpoints',
      'SageMaker vs Bedrock: when to use managed Bedrock APIs vs custom SageMaker model endpoints',
      'Deploying custom SageMaker embedding models for production RAG systems',
      'Building vector data pipelines with SageMaker and S3 for AI memory',
      'Cost-effective vector storage with S3 and Lambda ingestion pipelines',
      'Automating AI agent workflows with AWS EventBridge scheduled triggers',
      'Amazon Bedrock AgentCore: managed agent platforms vs custom deployments',
      'Loop-based reasoning systems and adding code execution tools to Bedrock agents'
    ],
    whatCoursesCover: [
      'Course 1: Section 43 (Lectures 202–206: AWS Bedrock Intro, RAG with LangChain & Bedrock, Lambda Blog Generator, SageMaker Endpoints)',
      'Course 3: Section 2 (Lectures 46–49: Setting Up Bedrock on AWS, Migrating from OpenAI to Bedrock, Lambda Testing, CloudWatch)',
      'Course 3: Section 3 (Lectures 74–82: SageMaker vs Bedrock, Deploying Embedding Models, S3 Vector Pipelines, Ingestion with Terraform)',
      'Course 3: Section 3 (Lectures 83–87: AI Research Agents with Bedrock & OpenAI SDK, EventBridge Scheduling)',
      'Course 3: Section 4 (Lectures 116–122: Bedrock AgentCore, Managed vs Custom Agents, Loop-Based Reasoning, Code Execution Tools)'
    ],
    whatIsMissing: 'SageMaker HyperPod distributed cluster training (course focuses on model inference endpoints).',
    interviewFocus: [
      {
        question: 'Under what conditions should an enterprise choose AWS Bedrock over Amazon SageMaker for Generative AI?',
        answerStrategy: 'AWS Bedrock is fully managed and serverless with zero infrastructure to provision, charging per token; it is ideal for consuming frontier foundation models (Claude, Llama 3). SageMaker provides dedicated compute instances and is required when you need custom fine-tuned weights, proprietary model architectures, or constant high throughput where per-instance pricing is cheaper than per-token.'
      }
    ],
    practicalTask: 'Provision an Amazon Bedrock Claude 3.5 endpoint via AWS Lambda, connect an S3 vector pipeline, and configure EventBridge to trigger automated daily research reports.',
    projectConnection: 'Builds the AI Research Agent (Course 3 Week 3) and Bedrock AgentCore deployment (Course 3 Week 4).',
    tools: ['AWS Bedrock', 'AWS SageMaker', 'Claude 3.5 Sonnet', 'AWS EventBridge', 'AWS S3', 'Terraform'],
    topicsList: [
      'Amazon Bedrock Architecture',
      'OpenAI to Bedrock Migration',
      'SageMaker vs Bedrock',
      'SageMaker Embedding Endpoints',
      'S3 Vector Data Pipelines',
      'EventBridge Scheduled Agents',
      'Bedrock AgentCore Platform',
      'Code Execution Tools'
    ],
    previousStageId: '20',
    nextStageId: '22'
  },

  // -------------------------------------------------------------
  // STAGE 22: Multi-Cloud Architectures (Azure & GCP)
  // -------------------------------------------------------------
  {
    id: '22',
    number: 22,
    title: 'Multi-Cloud Architectures (Azure & GCP)',
    tagline: 'Deploy containerized AI agents to Microsoft Azure Container Apps and Google Cloud Run with Terraform.',
    description: 'Enterprise AI is rarely single-cloud. Master Multi-Cloud AI deployment: provisioning Microsoft Azure Container Apps with Terraform, deploying containerized agents to Google Cloud Platform (GCP) Cloud Run, and managing cross-cloud deployments.',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    durationWeeks: '2 Weeks',
    courseSources: ['COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 3: Week 3 (Lectures 64–73).',
    whatIsIt: 'Architecting and deploying AI container workloads across Microsoft Azure and Google Cloud Platform alongside AWS.',
    whyNeeded: 'Enterprise clients frequently mandate deployment inside their existing cloud vendor (Azure for enterprise Microsoft shops, GCP for Kubernetes/BigQuery environments).',
    whatToLearn: [
      'Multi-cloud deployment strategies: avoiding single-vendor cloud lock-in',
      'Setting up Microsoft Azure infrastructure for production AI container deployments',
      'Deploying AI container apps to Azure Container Apps with Terraform IaC',
      'Deploying AI agents with MCP servers to Azure Container Apps',
      'Setting up Google Cloud Platform (GCP) infrastructure and Google Cloud CLI',
      'Deploying containerized AI agents to GCP Cloud Run with Terraform',
      'Cross-cloud deployment paradigms: running services across GCP and Azure simultaneously'
    ],
    whatCoursesCover: [
      'Course 3: Section 3 (Lectures 64–69: Multi-Cloud Overview, Azure Infrastructure, Azure Container Apps with Terraform, MCP on Azure)',
      'Course 3: Section 3 (Lectures 70–73: GCP Infrastructure, Google Cloud CLI, Deploying Agents to GCP Cloud Run with Terraform)'
    ],
    whatIsMissing: 'Azure OpenAI private endpoints and GCP Vertex AI Model Garden deep dive.',
    interviewFocus: [
      {
        question: 'What are the architectural similarities between AWS App Runner, Azure Container Apps, and GCP Cloud Run for AI microservices?',
        answerStrategy: 'All three are fully managed, serverless container platforms. They abstract away the underlying Kubernetes/virtual machine cluster, auto-scale from zero based on incoming HTTP traffic, provide built-in HTTPS/TLS termination, and support custom container images from any registry.'
      }
    ],
    practicalTask: 'Write a Terraform module that deploys a containerized AI agent to GCP Cloud Run, and a companion module deploying to Azure Container Apps.',
    projectConnection: 'Expands the AI Security Agent and Research Agent to run across multi-cloud environments in Course 3 Week 3.',
    tools: ['Google Cloud Run', 'Azure Container Apps', 'GCP CLI', 'Terraform', 'Docker'],
    topicsList: [
      'Multi-Cloud AI Strategy',
      'Azure Container Apps',
      'Azure Terraform IaC',
      'Google Cloud Platform (GCP)',
      'GCP Cloud Run Deployments',
      'Google Cloud CLI',
      'Cross-Cloud Containers'
    ],
    previousStageId: '21',
    nextStageId: '23'
  },

  // -------------------------------------------------------------
  // STAGE 23: Production Database Architecture (Aurora Serverless)
  // -------------------------------------------------------------
  {
    id: '23',
    number: 23,
    title: 'Production Database Architecture (Aurora Serverless)',
    tagline: 'Architect enterprise relational storage with Amazon Aurora Serverless for multi-agent systems.',
    description: 'Move beyond local SQLite: Master production database architectures for AI agent systems using Amazon Aurora Serverless. Design schemas for conversational history, financial transactions, and multi-agent coordination with connection pooling.',
    category: 'Production',
    difficulty: 'Advanced',
    durationWeeks: '2 Weeks',
    courseSources: ['COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered in Course 3: Week 4 (Lectures 89–94).',
    whatIsIt: 'High-availability, on-demand auto-scaling relational database infrastructure powering enterprise AI applications.',
    whyNeeded: 'Multi-agent workflows and financial AI systems require ACID transactional integrity, durable state persistence, and automatic scaling to handle unpredictable query spikes.',
    whatToLearn: [
      'Single-agent vs Multi-agent state storage requirements',
      'Relational database architecture for production AI applications',
      'Amazon Aurora Serverless: on-demand auto-scaling PostgreSQL/MySQL clusters',
      'Setting up Aurora Serverless database infrastructure for multi-agent systems',
      'Designing schemas for multi-agent coordination, financial data, and user sessions',
      'Database connection pooling for serverless AWS Lambda execution'
    ],
    whatCoursesCover: [
      'Course 3: Section 4 (Lectures 89–94: Multi-Agent vs Single-Agent Architectures, Aurora Serverless for LLM Apps, Infrastructure Setup)'
    ],
    whatIsMissing: 'In-depth PostgreSQL EXPLAIN ANALYZE query planning (covered conceptually) and Redis distributed locks.',
    interviewFocus: [
      {
        question: 'Why is Amazon Aurora Serverless well-suited for AI agent microservices deployed on AWS Lambda?',
        answerStrategy: 'Aurora Serverless scales compute capacity (ACUs) up and down automatically based on application load and can scale to zero during idle periods. When combined with RDS Proxy, it handles thousands of transient connections from serverless Lambda functions without connection exhaustion.'
      }
    ],
    practicalTask: 'Provision an Amazon Aurora Serverless database instance via Terraform and design a multi-table schema storing agent conversation threads and tool transaction logs.',
    projectConnection: 'The foundational persistence layer for ALEX: The Multi-Agent Financial AI System in Course 3 Week 4.',
    tools: ['Amazon Aurora Serverless', 'PostgreSQL / MySQL', 'AWS RDS Proxy', 'Terraform'],
    topicsList: [
      'Multi-Agent Database Design',
      'Amazon Aurora Serverless',
      'Serverless Relational Scaling',
      'ACID State Persistence',
      'RDS Connection Pooling',
      'Financial Schema Architecture'
    ],
    previousStageId: '22',
    nextStageId: '24'
  },

  // -------------------------------------------------------------
  // STAGE 24: AI Security, Guardrails & LLM Gateways
  // -------------------------------------------------------------
  {
    id: '24',
    number: 24,
    title: 'AI Security, Guardrails & LLM Gateways',
    tagline: 'Defend AI systems against Prompt Injection, enforce Guardrails, and deploy LLM Gateways.',
    description: 'AI systems open completely new attack surfaces. Master enterprise AI defense: Prompt Injection & Jailbreak mitigation, Input/Output Guardrails with LangChain and Bedrock, building AI Security Agents with Semgrep, and implementing central LLM Gateways.',
    category: 'Production',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 02', 'COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered in Course 2 (Sections 24, 25) and Course 3 (Week 4 Lectures 107, 108, 110, 114, 116).',
    whatIsIt: 'The security architecture that monitors, sanitizes, and enforces safety boundaries on LLM prompts and completions.',
    whyNeeded: 'Prompt injection can trick AI agents into executing unauthorized tools, leaking system secrets, or exfiltrating private financial data. Enterprise adoption requires strict guardrails.',
    whatToLearn: [
      'Direct vs Indirect Prompt Injection vulnerabilities in production systems',
      'Implementing Guardrails with LangChain',
      'Enterprise AI Guardrails on AWS Bedrock',
      'Building Cybersecurity AI Agents with MCP servers and Semgrep integration',
      'Architecting and implementing LLM Gateways for centralized routing and policy enforcement',
      'Content moderation, PII redaction, and output validation',
      'Real-time agent monitoring and mitigating security risks of autonomous agent systems'
    ],
    whatCoursesCover: [
      'Course 2: Section 24 (Lecture 116: Guardrails with LangChain)',
      'Course 2: Section 25 (Lecture 117: LLM Gateways and Implementation)',
      'Course 3: Section 3 (Lecture 65: Building AI Security Agents with MCP Servers and Semgrep Integration)',
      'Course 3: Section 4 (Lectures 107, 108: Enterprise-Grade AI: Monitoring, Security & Scaling)',
      'Course 3: Section 4 (Lectures 110, 114, 116: Guardrails for Production Agents, Securing Against Prompt Injection, Enterprise Guardrails)'
    ],
    whatIsMissing: 'OWASP Top 10 for LLM threat modeling formal audits (taught conceptually via injection and guardrails).',
    interviewFocus: [
      {
        question: 'What is Indirect Prompt Injection, and how can an enterprise guardrail prevent it in an autonomous agent?',
        answerStrategy: 'Indirect Prompt Injection occurs when untrusted external data (e.g. an email, web page, or ingested PDF) contains adversarial instructions disguised as text. When the agent reads it, the LLM confuses data for instructions. Guardrails prevent this by isolating untrusted content in XML tags, enforcing least-privilege tool execution, and validating tool parameters with guardrail filters.'
      }
    ],
    practicalTask: 'Build an LLM Gateway proxy in FastAPI with LangChain Guardrails that intercepts user prompts, blocks prompt injection attempts, and masks PII before forwarding to the model.',
    projectConnection: 'Secures the ALEX Multi-Agent Financial System and Healthcare SaaS application in Course 3.',
    tools: ['LangChain Guardrails', 'AWS Bedrock Guardrails', 'LLM Gateway', 'Semgrep', 'FastAPI'],
    topicsList: [
      'Prompt Injection & Jailbreaks',
      'Input/Output Guardrails',
      'Bedrock Guardrails',
      'LLM Gateways Architecture',
      'AI Security Agents (Semgrep)',
      'PII Redaction & Sanitization',
      'Principle of Least Privilege'
    ],
    previousStageId: '23',
    nextStageId: '25'
  },

  // -------------------------------------------------------------
  // STAGE 25: Production Observability, Monitoring & Tracing
  // -------------------------------------------------------------
  {
    id: '25',
    number: 25,
    title: 'Production Observability, Monitoring & Tracing',
    tagline: 'Track latency, token costs, and multi-step agent traces with Langfuse, LangSmith, and CloudWatch.',
    description: 'Production AI cannot be a black box. Master full-lifecycle observability: LangSmith for chain/agent tracing, Amazon CloudWatch metrics and dashboards for Bedrock, and Langfuse for advanced LLM telemetry, latency profiling, token cost accounting, and LLM-as-a-judge monitoring.',
    category: 'Production',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01', 'COURSE 02', 'COURSE 03'],
    coverageStatus: 'Covered',
    coverageNote: 'Covered across Course 1 (Sections 25, 52), Course 2 (Section 15), and Course 3 (Week 2 Lecture 49, Week 4 Lectures 109, 111, 112).',
    whatIsIt: 'Distributed tracing, telemetry collection, and metrics visualization specifically tailored for non-deterministic LLM pipelines.',
    whyNeeded: 'Traditional APM tools only monitor HTTP status codes. LLM observability captures intermediate tool calls, prompt versions, token consumption, model pricing, and hallucination scores per request.',
    whatToLearn: [
      'Why traditional APM tools fail on LLM systems',
      'Debugging, monitoring, and tracing with LangSmith in LangChain and LangGraph',
      'Setting up Amazon CloudWatch metrics and dashboards for Bedrock deployments',
      'Advanced LLM observability with Langfuse: open-source tracing and evaluation',
      'Tracing multi-step agent tool calls, latency (TTFT), and token costs ($) per user',
      'Logging prompt versions and monitoring real-time agent execution failures',
      'Integrating LLM-as-a-Judge evaluations directly into Langfuse dashboards'
    ],
    whatCoursesCover: [
      'Course 1: Section 25 (Lecture 139: Tracking GenAI App Using LangSmith)',
      'Course 1: Section 52 (Lecture 237: Debugging, Monitoring and Observability with LangSmith)',
      'Course 2: Section 15 (Lecture 89: Debugging with LangGraph Studio and LangSmith)',
      'Course 3: Section 2 (Lecture 49: Monitoring Production AI with CloudWatch and Bedrock Metrics)',
      'Course 3: Section 4 (Lectures 109, 111, 112, 113: CloudWatch Dashboards, Advanced Observability with Langfuse, LLM-as-a-Judge with Langfuse, Real-Time Monitoring)'
    ],
    whatIsMissing: 'OpenTelemetry collector setup for custom Grafana/Prometheus dashboards (courses focus on Langfuse, LangSmith, and CloudWatch).',
    interviewFocus: [
      {
        question: 'What telemetry metrics are essential to track for every production LLM completion call?',
        answerStrategy: 'Unique trace ID, user ID, model name & version, prompt template version, input token count, output token count, total latency, Time-to-First-Token (TTFT), estimated cost ($), tool call execution latency, and automated LLM judge scores.'
      }
    ],
    practicalTask: 'Instrument a multi-tool LangGraph agent with Langfuse, log prompt executions, and create a dashboard tracking token usage and cost per query.',
    projectConnection: 'Provides complete production observability for the ALEX Multi-Agent Financial System in Course 3 Week 4.',
    tools: ['Langfuse', 'LangSmith', 'AWS CloudWatch', 'LangGraph Studio'],
    topicsList: [
      'LLM Observability vs APM',
      'LangSmith Tracing',
      'AWS CloudWatch Metrics',
      'Langfuse Open-Source Tracing',
      'Token Cost Accounting',
      'Time-to-First-Token (TTFT)',
      'Multi-Step Agent Tracing',
      'Real-Time Failure Alerts'
    ],
    previousStageId: '24',
    nextStageId: '26'
  },

  // -------------------------------------------------------------
  // STAGE 26: Fine-Tuning & Quantization (LoRA & QLoRA)
  // -------------------------------------------------------------
  {
    id: '26',
    number: 26,
    title: 'Fine-Tuning & Quantization (LoRA & QLoRA)',
    tagline: 'Master weight quantization, Low-Rank Adaptation (LoRA), QLoRA math, and Lamini AI Cloud.',
    description: 'When prompt engineering and RAG reach their limits for task alignment, fine-tune your own models: Weight Quantization (FP16 to INT8/INT4), mathematical intuition behind Low-Rank Adaptation (LoRA) and QLoRA, fine-tuning Google Gemma on custom data, and enterprise cloud training with Lamini.',
    category: 'Deep Learning',
    difficulty: 'Advanced',
    durationWeeks: '3 Weeks',
    courseSources: ['COURSE 01'],
    coverageStatus: 'Covered',
    coverageNote: 'Fully covered in Course 1: Sections 49 & 50.',
    whatIsIt: 'Parameter-Efficient Fine-Tuning (PEFT) techniques that adapt pretrained model weights using low-rank decomposition matrices and quantized precisions.',
    whyNeeded: 'Full-parameter fine-tuning of 7B+ parameter models requires massive GPU clusters. LoRA and QLoRA allow fine-tuning models on a single consumer GPU by updating less than 1% of parameters.',
    whatToLearn: [
      'What is Quantization: floating-point representations (FP32, FP16, INT8, INT4) and memory savings',
      'Mathematical intuition of Low-Rank Adaptation (LoRA): decomposing weight updates $\\Delta W = A \\times B$',
      'Quantized Low-Rank Adaptation (QLoRA): 4-bit NormalFloat (NF4) and Double Quantization',
      'Practical implementation: fine-tuning Google Gemma on custom dataset',
      'End-to-end cloud fine-tuning using the Lamini AI Platform',
      'Evaluating fine-tuned models against baseline foundation models'
    ],
    whatCoursesCover: [
      'Course 1: Section 49 (Lecture 223: What is Quantization In-depth Intuition)',
      'Course 1: Section 49 (Lecture 224: LoRA and QLoRA In-depth Mathematical Intuition)',
      'Course 1: Section 49 (Lecture 225: Practical Implementation: Fine-Tuning Custom Data with Google Gemma Model)',
      'Course 1: Section 50 (Lecture 226: End-to-End Fine-Tuning LLM Models with Lamini AI Cloud Platform)'
    ],
    whatIsMissing: 'Direct Preference Optimization (DPO) and Reinforcement Learning from Human Feedback (RLHF) algorithms.',
    interviewFocus: [
      {
        question: 'Explain the mathematical intuition behind LoRA (Low-Rank Adaptation). How does it drastically reduce GPU memory during training?',
        answerStrategy: 'Instead of updating the full $d \\times k$ weight matrix $W$ (which requires storing massive optimizer states), LoRA freezes $W$ and represents the weight update as the product of two low-rank matrices: $\\Delta W = B \\times A$, where $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times k}$ with rank $r \\ll \\min(d, k)$. This cuts trainable parameters by up to 99%.'
      }
    ],
    practicalTask: 'Fine-tune a small open-source model (Google Gemma or Llama 3 8B) on a domain dataset using QLoRA 4-bit quantization and compare inference quality.',
    projectConnection: 'Complements the multi-language code assistant and specialized task-aligned model deployments in Course 1.',
    tools: ['LoRA / QLoRA', 'Google Gemma', 'Lamini AI Cloud', 'HuggingFace PEFT', 'BitsAndBytes'],
    topicsList: [
      'Weight Quantization (INT4/INT8)',
      'LoRA Mathematical Intuition',
      'QLoRA (NF4 & Double Quantization)',
      'Parameter-Efficient Fine-Tuning',
      'Google Gemma Fine-Tuning',
      'Lamini AI Cloud Training',
      'PEFT vs Full Fine-Tuning'
    ],
    previousStageId: '25'
  }
];
