<script lang="ts">
  interface TestMetricsType {
    score: number;
    blocked: number;
    notBlocked: number;
    avgResponseTime: number;
    totalWasted: number;
  }

  export let timeSaved: number;
  export let percentageFaster: number;
  export let bloqrDisabled: TestMetricsType;
  export let bloqrEnabled: TestMetricsType;
</script>

<section class="stats-section">
  <div class="container">
    <h2 class="section-title">The Bloqr Difference</h2>
    <p class="section-subtitle">
      Based on real test data from adblocktester.pages.dev with Bloqr enabled and disabled
    </p>

    <!-- Main Impact Stats -->
    <div class="impact-grid">
      <div class="impact-stat">
        <div class="stat-value orange">{timeSaved}ms</div>
        <div class="stat-label">Saved Per Test</div>
      </div>

      <div class="impact-stat">
        <div class="stat-value cyan">{percentageFaster}%</div>
        <div class="stat-label">Faster</div>
      </div>

      <div class="impact-stat">
        <div class="stat-value orange">{bloqrEnabled.blocked - bloqrDisabled.blocked}x</div>
        <div class="stat-label">More Blocked</div>
      </div>
    </div>

    <!-- Detailed Comparison -->
    <div class="comparison-table">
      <div class="table-row header">
        <div class="table-col label">Metric</div>
        <div class="table-col">Bloqr Disabled</div>
        <div class="table-col">Bloqr Enabled</div>
        <div class="table-col">Improvement</div>
      </div>

      <div class="table-row">
        <div class="table-col label">Protection Score</div>
        <div class="table-col">
          <span class="metric-value">{bloqrDisabled.score}%</span>
        </div>
        <div class="table-col">
          <span class="metric-value success">{bloqrEnabled.score}%</span>
        </div>
        <div class="table-col">
          <span class="improvement">+{bloqrEnabled.score - bloqrDisabled.score}%</span>
        </div>
      </div>

      <div class="table-row">
        <div class="table-col label">Domains Blocked</div>
        <div class="table-col">
          <span class="metric-value">{bloqrDisabled.blocked}</span>
        </div>
        <div class="table-col">
          <span class="metric-value success">{bloqrEnabled.blocked}</span>
        </div>
        <div class="table-col">
          <span class="improvement">+{bloqrEnabled.blocked - bloqrDisabled.blocked}</span>
        </div>
      </div>

      <div class="table-row">
        <div class="table-col label">Unblocked Domains</div>
        <div class="table-col">
          <span class="metric-value warning">{bloqrDisabled.notBlocked}</span>
        </div>
        <div class="table-col">
          <span class="metric-value success">{bloqrEnabled.notBlocked}</span>
        </div>
        <div class="table-col">
          <span class="improvement">-{bloqrDisabled.notBlocked}</span>
        </div>
      </div>

      <div class="table-row">
        <div class="table-col label">Avg Response Time</div>
        <div class="table-col">
          <span class="metric-value">{bloqrDisabled.avgResponseTime}ms</span>
        </div>
        <div class="table-col">
          <span class="metric-value success">{bloqrEnabled.avgResponseTime}ms</span>
        </div>
        <div class="table-col">
          <span class="improvement">-{bloqrDisabled.avgResponseTime - bloqrEnabled.avgResponseTime}ms</span>
        </div>
      </div>

      <div class="table-row">
        <div class="table-col label">Total Time Wasted</div>
        <div class="table-col">
          <span class="metric-value warning">{bloqrDisabled.totalWasted}ms</span>
        </div>
        <div class="table-col">
          <span class="metric-value success">{bloqrEnabled.totalWasted}ms</span>
        </div>
        <div class="table-col">
          <span class="improvement">-{bloqrDisabled.totalWasted - bloqrEnabled.totalWasted}ms</span>
        </div>
      </div>
    </div>

    <div class="stats-note">
      <p>
        <strong>What does this mean?</strong> Without Bloqr, you waste {bloqrDisabled.totalWasted}ms per page
        load fetching ads, trackers, and internet nuisances. That adds up quickly across dozens of pages per day.
        Bloqr reduces that to just {bloqrEnabled.totalWasted}ms, blocking nearly everything.
      </p>
    </div>
  </div>
</section>

<style>
  .stats-section {
    padding: var(--space-24) 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(255, 85, 0, 0.04) 100%
    );
    border-bottom: 1px solid var(--border-subtle);
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--fg-1);
    margin-bottom: var(--space-2);
    text-align: center;
  }

  .section-subtitle {
    text-align: center;
    color: var(--fg-2);
    font-size: 0.95rem;
    margin-bottom: var(--space-12);
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-6);
    margin-bottom: var(--space-16);
  }

  .impact-stat {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: var(--space-8);
    text-align: center;
    transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .impact-stat:hover {
    background: var(--bg-elevated);
    border-color: var(--border-accent);
    transform: translateY(-2px);
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1;
    margin-bottom: var(--space-2);
  }

  .stat-value.orange {
    color: var(--orange-500);
  }

  .stat-value.cyan {
    color: var(--cyan-500);
  }

  .stat-label {
    font-size: 0.95rem;
    color: var(--fg-2);
    font-weight: 500;
  }

  .comparison-table {
    margin-bottom: var(--space-12);
    overflow-x: auto;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: var(--space-4);
    padding: var(--space-4) 0;
    border-bottom: 1px solid var(--border-subtle);
    align-items: center;
  }

  .table-row.header {
    background: var(--bg-surface);
    padding: var(--space-4);
    border-radius: 8px 8px 0 0;
    border-bottom: 2px solid var(--border);
    font-weight: 700;
    color: var(--fg-1);
    font-size: 0.9rem;
  }

  .table-col {
    font-size: 0.95rem;
    color: var(--fg-2);
  }

  .table-col.label {
    color: var(--fg-1);
    font-weight: 600;
  }

  .metric-value {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: var(--fg-1);
  }

  .metric-value.success {
    color: #22c55e;
  }

  .metric-value.warning {
    color: var(--orange-500);
  }

  .improvement {
    font-family: 'JetBrains Mono', monospace;
    color: #22c55e;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .stats-note {
    background: linear-gradient(
      135deg,
      rgba(0, 212, 255, 0.08),
      rgba(255, 85, 0, 0.04)
    );
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: var(--space-6);
    color: var(--fg-2);
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .stats-note p {
    margin: 0;
  }

  .stats-note strong {
    color: var(--fg-1);
  }

  @media (max-width: 768px) {
    .stats-section {
      padding: var(--space-12) 0;
    }

    .impact-grid {
      grid-template-columns: 1fr;
      margin-bottom: var(--space-8);
    }

    .table-row {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2);
    }

    .table-row.header {
      grid-template-columns: 1fr 1fr;
      font-size: 0.8rem;
    }

    .table-col {
      font-size: 0.85rem;
    }

    .stat-value {
      font-size: 1.75rem;
    }
  }
</style>
