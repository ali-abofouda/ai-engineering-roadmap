import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eval-benchmark',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="eval-benchmark-box">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 class="mb-1 text-cyan"><i class="fa-solid fa-chart-column me-2"></i>Multi-Stage Retrieval Benchmark (Example Progression)</h5>
          <p class="text-secondary small mb-0">Empirical measurement of retrieval improvements across pipeline iterations</p>
        </div>
        <span class="badge bg-info-subtle text-info border border-info">Illustrative Benchmark</span>
      </div>

      <!-- Progression Bars -->
      <div class="benchmark-grid mb-3">
        <div *ngFor="let stage of benchmarks" class="benchmark-row p-3 mb-2">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <span class="benchmark-name font-monospace">{{ stage.name }}</span>
              <span class="badge bg-secondary-subtle text-secondary ms-2 small">{{ stage.technique }}</span>
            </div>
            <div class="text-end">
              <span class="metric-val text-cyan font-monospace fw-bold">{{ stage.recall }}</span>
              <small class="text-secondary ms-1">Recall&#64;5</small>
            </div>
          </div>
          <div class="progress progress-dark" style="height: 10px;">
            <div 
              class="progress-bar" 
              role="progressbar" 
              [style.width.%]="stage.pct"
              [class]="stage.barClass"
            ></div>
          </div>
          <p class="small text-secondary mb-0 mt-2">{{ stage.rationale }}</p>
        </div>
      </div>

      <!-- Metric Disclaimer Alert -->
      <div class="alert alert-dark border border-secondary-subtle py-2 px-3 mb-0 small text-secondary">
        <i class="fa-solid fa-circle-info text-info me-2"></i>
        <strong>Note:</strong> These metrics are illustrative examples demonstrating typical relative gains from multi-stage retrieval engineering, not absolute claims for all document corpora.
      </div>
    </div>
  `,
  styles: [`
    .eval-benchmark-box {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px;
    }
    .text-cyan {
      color: var(--accent-cyan);
    }
    .benchmark-row {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
    }
    .benchmark-row:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
    }
    .benchmark-name {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .metric-val {
      font-size: 1.15rem;
    }
    .progress-dark {
      background: var(--surface-elevated);
      border-radius: 999px;
    }
    .bg-gradient-1 {
      background: #64748b;
    }
    .bg-gradient-2 {
      background: #3b82f6;
    }
    .bg-gradient-3 {
      background: #0ea5e9;
    }
    .bg-gradient-4 {
      background: var(--brand-gradient);
    }
  `]
})
export class EvalBenchmarkComponent {
  benchmarks = [
    {
      name: 'Baseline RAG',
      technique: 'Fixed 1000-char chunks, naive vector search',
      recall: '72%',
      pct: 72,
      barClass: 'bg-gradient-1',
      rationale: 'Prone to chunk fragmentation and misses exact keyword matches.'
    },
    {
      name: 'Improved Chunking',
      technique: 'Recursive semantic splitting with 15% overlap',
      recall: '79%',
      pct: 79,
      barClass: 'bg-gradient-2',
      rationale: 'Preserves sentence boundaries and header hierarchies cleanly.'
    },
    {
      name: 'Hybrid Search',
      technique: 'Dense vector ANN + BM25 keyword fusion (RRF)',
      recall: '86%',
      pct: 86,
      barClass: 'bg-gradient-3',
      rationale: 'Captures both semantic conceptual meaning and exact domain acronyms.'
    },
    {
      name: 'Hybrid + Reranker',
      technique: 'Hybrid candidates rescored by Cross-Encoder',
      recall: '91%',
      pct: 91,
      barClass: 'bg-gradient-4',
      rationale: 'Filters out noisy passages through deep query-document joint attention.'
    }
  ];
}
