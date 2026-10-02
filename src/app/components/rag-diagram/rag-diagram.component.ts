import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RagStep {
  id: string;
  name: string;
  icon: string;
  category: 'Ingestion' | 'Indexing' | 'Retrieval' | 'Generation';
  description: string;
  tech: string;
}

@Component({
  selector: 'app-rag-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rag-architecture-box">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 class="mb-1 text-accent"><i class="fa-solid fa-diagram-project me-2"></i>Visual RAG Architecture Pipeline</h5>
          <p class="text-secondary small mb-0">Interactive end-to-end data flow from raw documents to verified citations</p>
        </div>
        <span class="badge bg-primary-subtle text-primary border border-primary">Production RAG</span>
      </div>

      <!-- Interactive Stepper Track -->
      <div class="pipeline-track">
        <div 
          *ngFor="let step of steps; let i = index; let last = last" 
          class="pipeline-node-wrapper"
        >
          <div 
            class="pipeline-node" 
            [class.active]="selectedStep.id === step.id"
            (click)="selectStep(step)"
            [title]="step.name"
          >
            <div class="node-icon">
              <i [class]="step.icon"></i>
            </div>
            <span class="node-num">{{ i + 1 }}</span>
            <div class="node-name">{{ step.name }}</div>
          </div>
          <div *ngIf="!last" class="pipeline-arrow">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <!-- Step Detail Card -->
      <div class="step-detail-card mt-3">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <span class="badge bg-secondary-subtle text-info border border-secondary mb-1">{{ selectedStep.category }}</span>
            <h6 class="mb-0 text-white font-monospace">{{ selectedStep.name }}</h6>
          </div>
          <span class="badge bg-dark border text-light font-monospace small">{{ selectedStep.tech }}</span>
        </div>
        <p class="text-secondary small mb-0 leading-relaxed">{{ selectedStep.description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .rag-architecture-box {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px;
    }
    .text-accent {
      color: var(--primary-light);
    }
    .pipeline-track {
      display: flex;
      align-items: center;
      overflow-x: auto;
      padding: 12px 4px;
      gap: 6px;
      scrollbar-width: thin;
    }
    .pipeline-node-wrapper {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    .pipeline-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 10px 12px;
      min-width: 82px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    .pipeline-node:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
      transform: translateY(-2px);
    }
    .pipeline-node.active {
      border-color: var(--primary);
      background: rgba(59, 130, 246, 0.15);
      box-shadow: 0 0 14px var(--primary-glow);
    }
    .node-icon {
      font-size: 1.1rem;
      color: var(--accent-cyan);
      margin-bottom: 4px;
    }
    .node-num {
      position: absolute;
      top: 3px;
      right: 5px;
      font-size: 0.65rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }
    .node-name {
      font-size: 0.72rem;
      color: var(--text-primary);
      font-weight: 500;
      text-align: center;
      white-space: nowrap;
    }
    .pipeline-arrow {
      color: var(--text-muted);
      font-size: 0.75rem;
      margin: 0 4px;
    }
    .step-detail-card {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px 18px;
    }
  `]
})
export class RagDiagramComponent {
  steps: RagStep[] = [
    { id: '1', name: 'Documents', icon: 'fa-solid fa-file-lines', category: 'Ingestion', description: 'Raw enterprise files across various formats: PDFs, Word DOCX, CSV tables, Markdown, and JSON archives.', tech: 'Unstructured / PyPDF' },
    { id: '2', name: 'Parsing', icon: 'fa-solid fa-gears', category: 'Ingestion', description: 'Extracting text and structural elements while preserving Markdown tables, headers, and metadata hierarchies.', tech: 'Docling / Tesseract' },
    { id: '3', name: 'Cleaning', icon: 'fa-solid fa-broom', category: 'Ingestion', description: 'Stripping noise, unicode normalization, boilerplate removal, and scrubbing sensitive PII if needed.', tech: 'Regex / Presidio' },
    { id: '4', name: 'Chunking', icon: 'fa-solid fa-scissors', category: 'Indexing', description: 'Partitioning documents into semantic passages (e.g. 512 tokens with 15% overlap) to avoid diluting context.', tech: 'Recursive Splitter' },
    { id: '5', name: 'Embeddings', icon: 'fa-solid fa-network-wired', category: 'Indexing', description: 'Translating text chunks into dense 768 or 1536-dimensional vectors using bi-encoder embedding models.', tech: 'OpenAI / bge-large' },
    { id: '6', name: 'Vector DB', icon: 'fa-solid fa-database', category: 'Indexing', description: 'Indexing vectors using Approximate Nearest Neighbor graphs (HNSW) for sub-10ms distance searches.', tech: 'Qdrant / pgvector' },
    { id: '7', name: 'Retriever', icon: 'fa-solid fa-magnifying-glass', category: 'Retrieval', description: 'Executing Hybrid Search combining dense vector similarity with sparse BM25 keyword matching.', tech: 'Hybrid BM25 + Dense' },
    { id: '8', name: 'Reranker', icon: 'fa-solid fa-arrow-down-wide-short', category: 'Retrieval', description: 'Cross-encoder joint attention rescoring top-30 candidate passages down to the top-5 high-signal chunks.', tech: 'Cohere Rerank / BGE' },
    { id: '9', name: 'Context', icon: 'fa-solid fa-layer-group', category: 'Generation', description: 'Context window compression, lost-in-the-middle ordering, and prompt template injection with source IDs.', tech: 'Prompt Template' },
    { id: '10', name: 'LLM', icon: 'fa-solid fa-brain', category: 'Generation', description: 'Frontier foundation model generating an answer grounded strictly in the injected context passages.', tech: 'GPT-4o / Claude 3.5' },
    { id: '11', name: 'Answer + Sources', icon: 'fa-solid fa-shield-halved', category: 'Generation', description: 'Streaming response with exact inline citation tags referencing specific document titles and page numbers.', tech: 'SSE + Citations' }
  ];

  selectedStep = this.steps[6]; // Default to Retriever

  selectStep(step: RagStep) {
    this.selectedStep = step;
  }
}
