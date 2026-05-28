<!-- Feature comparison table for /pricing page -->

<script lang="ts">
  import { PRICING_FEATURE_ROWS } from '../lib/pricing';

  const features = PRICING_FEATURE_ROWS;
</script>

<section class="pricing-table-section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Compare Plans</p>
      <h2 class="section-title">Everything, side by side.</h2>
      <p class="section-sub">
        All usage above plan limits is billed per-call. Web API calls from the local SDK
        always incur usage charges regardless of plan.
      </p>
    </div>

    <div class="table-wrap">
      <table class="comparison-table" aria-label="Feature comparison across Bloqr pricing tiers">
        <thead>
          <tr>
            <th scope="col" class="feature-col">Feature</th>
            <th scope="col">Starter<br /><span class="price-hint">from $3.99</span></th>
            <th scope="col" class="col-pro">Dev Pro<br /><span class="price-hint">from $24.99</span></th>
            <th scope="col">Vendor<br /><span class="price-hint">from $29.99</span></th>
            <th scope="col">Enterprise<br /><span class="price-hint">Custom</span></th>
          </tr>
        </thead>
        <tbody>
          {#each features as row}
            <tr>
              <th scope="row" class="feature-label">{row.label}</th>
              <td>{@render cell(row.starter)}</td>
              <td class="col-pro">{@render cell(row.devPro)}</td>
              <td>{@render cell(row.vendor)}</td>
              <td>{@render cell(row.enterprise)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <p class="table-note">
      Business entity pricing is slightly higher than personal pricing.
      All add-ons are available à la carte — see the pricing section above.
    </p>
  </div>
</section>

{#snippet cell(value)}
  {#if value === true}
    <span class="check" aria-label="Included">✓</span>
  {:else if value === false}
    <span class="cross" aria-label="Not included">✕</span>
  {:else}
    {value}
  {/if}
{/snippet}

<style>
  .pricing-table-section {
    padding: 80px 0;
    border-top: 1px solid var(--border);
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 12px;
  }

  .section-title {
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 700;
    color: var(--text-1);
    line-height: 1.2;
    margin-bottom: 12px;
  }

  .section-sub {
    font-size: 0.9rem;
    color: var(--text-2);
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  thead th {
    background: var(--bg-elevated);
    padding: 16px 20px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-2);
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
    line-height: 1.5;
  }

  .price-hint {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text-3);
    margin-top: 2px;
  }

  thead th.feature-col {
    text-align: left;
    color: var(--text-3);
  }

  thead th.col-pro {
    color: var(--orange);
    border-left: 2px solid var(--orange);
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 100ms;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(255, 255, 255, 0.02); }

  tbody td,
  tbody th {
    padding: 14px 20px;
    text-align: center;
    color: var(--text-2);
    vertical-align: middle;
  }

  tbody th.feature-label {
    text-align: left;
    color: var(--text-1);
    font-weight: 500;
    white-space: nowrap;
  }

  tbody td.col-pro {
    border-left: 2px solid rgba(255, 85, 0, 0.35);
  }

  .check {
    color: var(--orange);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .cross {
    color: var(--text-3);
    font-size: 0.8rem;
  }

  .table-note {
    text-align: center;
    margin-top: 24px;
    font-size: 12px;
    color: var(--text-3);
    line-height: 1.6;
  }

  @media (max-width: 700px) {
    .comparison-table { font-size: 0.8rem; }
    tbody td, tbody th, thead th { padding: 12px 14px; }
  }
</style>
