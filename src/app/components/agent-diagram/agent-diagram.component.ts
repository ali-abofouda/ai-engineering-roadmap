import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="agent-architecture-box">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 class="mb-1 text-emerald"><i class="fa-solid fa-robot me-2"></i>Autonomous Agent Architecture (ReAct / LangGraph)</h5>
          <p class="text-secondary small mb-0">Cyclical stateful reasoning loop: Observation, Thought, Action, and Checkpointed State</p>
        </div>
        <span class="badge bg-success-subtle text-success border border-success">Cyclical Graph</span>
      </div>

      <div class="agent-grid">
        <div class="agent-block goal-block">
          <div class="block-badge"><i class="fa-solid fa-bullseye me-1"></i>Input</div>
          <h6>User Goal / Prompt</h6>
          <p class="small text-secondary mb-0">High-level objective requiring multi-step planning and tool interaction.</p>
        </div>

        <div class="arrow-down text-center text-secondary py-1">
          <i class="fa-solid fa-arrow-down"></i>
        </div>

        <div class="agent-block loop-block">
          <div class="block-badge text-warning"><i class="fa-solid fa-arrows-spin me-1"></i>Cyclical Reasoning Loop</div>
          
          <div class="row g-2 mt-1">
            <div class="col-md-4">
              <div class="inner-subnode">
                <span class="subnode-title text-info"><i class="fa-solid fa-lightbulb me-1"></i>1. Planning & ReAct</span>
                <p class="small text-secondary mb-0">Decomposes task, evaluates prior observations, and synthesizes next action.</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="inner-subnode">
                <span class="subnode-title text-purple"><i class="fa-solid fa-memory me-1"></i>2. State & Memory</span>
                <p class="small text-secondary mb-0">LangGraph State schema with checkpointer to persist context across turns.</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="inner-subnode">
                <span class="subnode-title text-warning"><i class="fa-solid fa-wrench me-1"></i>3. Tool Calling</span>
                <p class="small text-secondary mb-0">Emits validated JSON parameters for Web Search, SQL DB, Python REPL, or APIs.</p>
              </div>
            </div>
          </div>

          <div class="row g-2 mt-2">
            <div class="col-md-6">
              <div class="inner-subnode">
                <span class="subnode-title text-success"><i class="fa-solid fa-terminal me-1"></i>4. Tool Execution</span>
                <p class="small text-secondary mb-0">Sandboxed execution of external actions returning observations back to the agent.</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="inner-subnode">
                <span class="subnode-title text-danger"><i class="fa-solid fa-user-shield me-1"></i>5. Human-In-The-Loop</span>
                <p class="small text-secondary mb-0">Interrupts execution to obtain human approval before executing destructive actions.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="arrow-down text-center text-secondary py-1">
          <i class="fa-solid fa-arrow-down"></i>
        </div>

        <div class="agent-block result-block">
          <div class="block-badge text-success"><i class="fa-solid fa-circle-check me-1"></i>Output</div>
          <h6>Synthesized Solution & Verification</h6>
          <p class="small text-secondary mb-0">Termination condition met: verified, grounded response with complete execution log audit trail.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .agent-architecture-box {
      background: var(--surface-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px;
    }
    .text-emerald {
      color: var(--success);
    }
    .text-purple {
      color: var(--accent-violet);
    }
    .agent-block {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
      position: relative;
    }
    .block-badge {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 6px;
      color: var(--text-muted);
    }
    .loop-block {
      border: 1px dashed rgba(34, 197, 94, 0.35);
      background: var(--surface-card);
    }
    .inner-subnode {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 10px 12px;
      height: 100%;
    }
    .subnode-title {
      font-size: 0.78rem;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
      font-family: var(--font-mono);
    }
  `]
})
export class AgentDiagramComponent {}
