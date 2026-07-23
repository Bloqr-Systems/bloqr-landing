<script lang="ts">
  interface TestMetricsType {
    score: number;
    blocked: number;
    notBlocked: number;
    avgResponseTime: number;
    totalWasted: number;
  }

  export let bloqrDisabled: TestMetricsType;
  export let bloqrEnabled: TestMetricsType;

  const disabledPercentage = Math.round((bloqrDisabled.blocked / (bloqrDisabled.blocked + bloqrDisabled.notBlocked)) * 100);
  const enabledPercentage = Math.round((bloqrEnabled.blocked / (bloqrEnabled.blocked + bloqrEnabled.notBlocked)) * 100);
</script>

<section class="comparison-section">
  <div class="container">
    <h2 class="section-title">Real-Time Protection Comparison</h2>
    <p class="section-subtitle">
      How many ad domains are blocked vs. unblocked across 382 tests
    </p>

    <div class="comparison-grid">
      <!-- Bloqr Disabled Card -->
      <div class="comparison-card disabled">
        <div class="card-header">
          <h3>Without Bloqr</h3>
          <div class="score-badge">{bloqrDisabled.score}% Protected</div>
        </div>

        <div class="visualization">
          <div class="progress-bar">
            <div class="progress-fill blocked" style="width: {disabledPercentage}%">
              <span class="progress-label">{bloqrDisabled.blocked}</span>
            </div>
            <div class="progress-fill not-blocked" style="width: {100 - disabledPercentage}%">
              <span class="progress-label">{bloqrDisabled.notBlocked}</span>
            </div>
          </div>

          <div class="legend">
            <div class="legend-item">
              <div class="legend-color blocked"></div>
              <span>{bloqrDisabled.blocked} blocked</span>
            </div>
            <div class="legend-item">
              <div class="legend-color not-blocked"></div>
              <span>{bloqrDisabled.notBlocked} not blocked</span>
            </div>
          </div>
        </div>

        <div class="card-stats">
          <div class="stat">
            <div class="stat-label">Avg Response</div>
            <div class="stat-value">{bloqrDisabled.avgResponseTime}ms</div>
          </div>
          <div class="stat">
            <div class="stat-label">Total Wasted</div>
            <div class="stat-value warning">{bloqrDisabled.totalWasted}ms</div>
          </div>
        </div>

        <p class="card-note">
          ⚠️ Most trackers and ads get through. Your browsing data exposed to {bloqrDisabled.notBlocked} domains.
        </p>
      </div>

      <!-- Bloqr Enabled Card -->
      <div class="comparison-card enabled">
        <div class="card-header">
          <h3>With Bloqr</h3>
          <div class="score-badge success">{bloqrEnabled.score}% Protected</div>
        </div>

        <div class="visualization">
          <div class="progress-bar">
            <div class="progress-fill blocked" style="width: {enabledPercentage}%">
              <span class="progress-label">{bloqrEnabled.blocked}</span>
            </div>
            <div class="progress-fill not-blocked" style="width: {100 - enabledPercentage}%">
              <span class="progress-label">{bloqrEnabled.notBlocked}</span>
            </div>
          </div>

          <div class="legend">
            <div class="legend-item">
              <div class="legend-color blocked"></div>
              <span>{bloqrEnabled.blocked} blocked</span>
            </div>
            <div class="legend-item">
              <div class="legend-color not-blocked"></div>
              <span>{bloqrEnabled.notBlocked} not blocked</span>
            </div>
          </div>
        </div>

        <div class="card-stats">
          <div class="stat">
            <div class="stat-label">Avg Response</div>
            <div class="stat-value">{bloqrEnabled.avgResponseTime}ms</div>
          </div>
          <div class="stat">
            <div class="stat-label">Total Wasted</div>
            <div class="stat-value success">{bloqrEnabled.totalWasted}ms</div>
          </div>
        </div>

        <p class="card-note">
          ✓ Comprehensive protection. Nearly all trackers and ads blocked. {bloqrEnabled.notBlocked} domains expose your data.
        </p>
      </div>
    </div>

    <!-- Key Insights -->
    <div class="insights-section">
      <h3 class="insights-title">What These Numbers Mean</h3>

      <div class="insights-grid">
        <div class="insight">
          <div class="insight-icon">🚀</div>
          <h4>Speed Improvement</h4>
          <p>
            Blocking {bloqrEnabled.blocked - bloqrDisabled.blocked} additional domains saves {bloqrDisabled.totalWasted - bloqrEnabled.totalWasted}ms per page load.
            Across 50 pages a day, that's {Math.round((bloqrDisabled.totalWasted - bloqrEnabled.totalWasted) * 50 / 1000)} seconds saved.
          </p>
        </div>

        <div class="insight">
          <div class="insight-icon">🔒</div>
          <h4>Privacy Gain</h4>
          <p>
            {bloqrDisabled.notBlocked} unblocked domains means {bloqrDisabled.notBlocked} places collecting your browsing data.
            Bloqr reduces this to just {bloqrEnabled.notBlocked}, keeping your privacy intact.
          </p>
        </div>

        <div class="insight">
          <div class="insight-icon">⚡</div>
          <h4>Network Efficiency</h4>
          <p>
            Each tracker that doesn't load means less bandwidth used, faster page rendering, and less power consumed.
            Perfect for mobile and low-bandwidth connections.
          </p>
        </div>

        <div class="insight">
          <div class="insight-icon">📊</div>
          <h4>Real-Time Blocking</h4>
          <p>
            Bloqr uses AI-powered threat intelligence to identify and block nuisances in real-time,
            staying ahead of new trackers and ads as they appear.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .comparison-section {
    padding: var(--space-24) 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 212, 255, 0.04) 100%
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

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
    margin-bottom: var(--space-16);
  }

  .comparison-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: var(--space-8);
    transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .comparison-card.disabled:hover {
    border-color: var(--orange-500);
    background: var(--bg-elevated);
  }

  .comparison-card.enabled:hover {
    border-color: var(--cyan-500);
    background: var(--bg-elevated);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6);
  }

  .card-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--fg-1);
    margin: 0;
  }

  .score-badge {
    background: linear-gradient(135deg, var(--orange-500), rgba(255, 85, 0, 0.8));
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .score-badge.success {
    background: linear-gradient(135deg, #22c55e, rgba(34, 197, 94, 0.8));
  }

  .visualization {
    margin-bottom: var(--space-6);
  }

  .progress-bar {
    display: flex;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: var(--space-4);
    border: 1px solid var(--border-subtle);
  }

  .progress-fill {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: white;
    font-family: 'JetBrains Mono', monospace;
    transition: flex 300ms ease;
  }

  .progress-fill.blocked {
    background: linear-gradient(135deg, #22c55e, rgba(34, 197, 94, 0.9));
  }

  .progress-fill.not-blocked {
    background: linear-gradient(135deg, var(--orange-500), rgba(255, 85, 0, 0.9));
  }

  .progress-label {
    opacity: 0.9;
    font-size: 0.8rem;
  }

  .legend {
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 0.9rem;
    color: var(--fg-2);
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }

  .legend-color.blocked {
    background: #22c55e;
  }

  .legend-color.not-blocked {
    background: var(--orange-500);
  }

  .card-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin: var(--space-6) 0;
    padding: var(--space-4) 0;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
  }

  .stat {
    text-align: center;
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--fg-2);
    font-weight: 500;
    margin-bottom: 4px;
  }

  .stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--fg-1);
    font-family: 'JetBrains Mono', monospace;
  }

  .stat-value.warning {
    color: var(--orange-500);
  }

  .stat-value.success {
    color: #22c55e;
  }

  .card-note {
    font-size: 0.9rem;
    color: var(--fg-2);
    line-height: 1.5;
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-subtle);
  }

  .insights-section {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(255, 85, 0, 0.04));
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: var(--space-8);
  }

  .insights-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--fg-1);
    margin-bottom: var(--space-6);
    text-align: center;
  }

  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-6);
  }

  .insight {
    text-align: center;
  }

  .insight-icon {
    font-size: 2rem;
    margin-bottom: var(--space-2);
    display: block;
  }

  .insight h4 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--fg-1);
    margin-bottom: var(--space-2);
  }

  .insight p {
    font-size: 0.9rem;
    color: var(--fg-2);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .comparison-section {
      padding: var(--space-12) 0;
    }

    .comparison-grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .progress-bar {
      height: 48px;
    }

    .progress-label {
      font-size: 0.75rem;
    }

    .insights-grid {
      grid-template-columns: 1fr;
    }

    .card-stats {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
