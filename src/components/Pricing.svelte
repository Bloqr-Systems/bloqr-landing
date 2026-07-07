<!-- Pricing section -->

<script lang="ts">
  import { PRICING_AUDIENCES, PRICING_TIERS_BY_AUDIENCE, PRICING_ADDONS } from '../lib/pricing';
  import type { AudienceId } from '../lib/pricing';
  import Check from '@lucide/svelte/icons/check';

  function trackPricingCta(tierName: string, cta: string): void {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('pricing_cta_clicked', { tier: tierName, cta });
    }
  }

  /** Which audience track is currently shown */
  let activeAudience = $state<AudienceId>('personal');

  const audiences = PRICING_AUDIENCES;
  const tiersByAudience = PRICING_TIERS_BY_AUDIENCE;
  const addons = PRICING_ADDONS;

  /** Group add-ons for display */
  const addonGroups = [...new Set(addons.map(a => a.group))];
</script>

<section class="pricing" id="pricing">
  <div class="container">

    <div class="section-header">
      <p class="section-label">Pricing</p>
      <h2 class="section-title">
        Pick your plan.<br />
        <em>No surprises.</em>
      </h2>
      <p class="section-sub">
        Transparent subscription pricing for every audience. Usage above your plan's
        limits is always billed separately via Stripe. Early access locks in your
        rate for the life of the account. No crypto. No wallet. Just a card.
      </p>
    </div>

    <!-- Audience selector tabs -->
    <div class="audience-tabs" role="tablist" aria-label="Audience">
      {#each audiences as aud}
        <button
          role="tab"
          class="tab-btn"
          class:active={activeAudience === aud.id}
          aria-selected={activeAudience === aud.id}
          id={`tab-${aud.id}`}
          aria-controls="pricing-tiers-panel"
          onclick={() => { activeAudience = aud.id; }}
          onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activeAudience = aud.id; } }}
        >
          {aud.label}
        </button>
      {/each}
    </div>

    <!-- Tiers for selected audience -->
    <div class="tiers" role="tabpanel" id="pricing-tiers-panel" aria-labelledby={`tab-${activeAudience}`}>
      {#each tiersByAudience[activeAudience] as tier}
        <div class="tier" class:featured={tier.featured}>
          {#if tier.featured}
            <div class="featured-badge">Most popular</div>
          {/if}

          <div class="tier-header">
            <div class="tier-name">{tier.name}</div>
            <div class="tier-price">
              <span class="price">{tier.price}</span>
              {#if tier.period}
                <span class="period">{tier.period}</span>
              {/if}
            </div>
            <div class="tier-aside">{tier.aside}</div>
            <p class="tier-tagline">{tier.tagline}</p>
          </div>

          <ul class="feature-list">
            {#each tier.items as item}
              <li>
                <span class="check" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                {item}
              </li>
            {/each}
          </ul>

          <a
            href={tier.href}
            class="tier-cta"
            class:primary={tier.featured}
            class:outline={!tier.featured}
            onclick={() => trackPricingCta(tier.name, tier.cta)}
          >
            {tier.cta}
          </a>
          <p class="stripe-note">Powered by Stripe</p>
        </div>
      {/each}
    </div>

    <!-- Usage note -->
    <p class="usage-note">
      Usage above plan limits billed at <strong>$0.20/compile</strong> and
      <strong>$0.10/1,000 rules</strong>. Web API calls via the local SDK always
      incur usage charges and require verified entitlements.
    </p>

    <!-- Add-ons -->
    <div class="addons-section">
      <div class="addons-header">
        <p class="section-label">Add-ons</p>
        <h3 class="addons-title">Every extra, individually priced.</h3>
        <p class="addons-sub">Available to any plan. Some are bundled in higher tiers — check the comparison table for what's included.</p>
      </div>

      <div class="addons-grid">
        {#each addonGroups as group}
          <div class="addon-group">
            <p class="addon-group-label">{group}</p>
            <ul class="addon-list">
              {#each addons.filter(a => a.group === group) as addon}
                <li class="addon-item">
                  <span class="addon-name">{addon.name}</span>
                  <span class="addon-price">{addon.price}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>

    <p class="fine-print">
      All paid plans include a 30-day money-back guarantee, no questions asked.
      Cancel anytime. Usage charges are non-refundable.
      Business entity pricing is slightly higher — see the comparison table.
    </p>

  </div>
</section>

<style>
  .pricing {
    padding: 96px 0;
    border-top: 1px solid var(--border);
  }

  /* ── Header ── */
  .section-header {
    text-align: left;
    max-width: 680px;
    margin: 0 0 48px;
  }

  .section-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16px;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--text-1);
    line-height: 1.2;
    margin-bottom: 16px;
  }

  .section-title em {
    font-style: normal;
    color: var(--orange);
  }

  .section-sub {
    font-size: 1rem;
    color: var(--text-2);
    line-height: 1.7;
  }

  /* ── Audience tabs ── */
  .audience-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .tab-btn {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-2);
    cursor: pointer;
    transition: all 150ms;
  }

  .tab-btn:hover {
    border-color: var(--border-2);
    color: var(--text-1);
  }

  .tab-btn.active {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--text-on-accent);
  }

  /* ── Tiers grid ── */
  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    align-items: start;
    max-width: 1100px;
    margin: 0 auto;
  }

  .tier {
    position: relative;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transition: border-color 150ms;
  }

  .tier:hover { border-color: var(--border-2); }

  .tier.featured {
    border-color: var(--orange);
    background: linear-gradient(
      160deg,
      rgba(255, 85, 0, 0.06) 0%,
      var(--bg-surface) 60%
    );
    box-shadow: 0 0 40px rgba(255, 85, 0, 0.08);
  }

  .featured-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--orange);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .stripe-note {
    text-align: center;
    font-size: 11px;
    color: var(--text-3);
    margin-top: -8px;
    letter-spacing: 0.04em;
  }

  /* ── Tier header ── */
  .tier-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-3);
  }

  .tier-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 8px;
  }

  .price {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--text-1);
    line-height: 1;
  }

  .period {
    font-size: 0.875rem;
    color: var(--text-3);
  }

  .tier-aside {
    font-size: 12px;
    color: var(--text-3);
    font-style: italic;
    margin-top: 4px;
  }

  .tier-tagline {
    font-size: 0.9375rem;
    color: var(--text-2);
    line-height: 1.5;
    margin-top: 4px;
  }

  /* ── Feature list ── */
  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .feature-list li {
    display: flex;
    gap: 10px;
    font-size: 0.9rem;
    color: var(--text-2);
    line-height: 1.5;
  }

  .check {
    color: var(--orange);
    flex-shrink: 0;
    display: inline-flex;
    margin-top: 1px;
  }

  /* ── CTA buttons ── */
  .tier-cta {
    display: block;
    text-align: center;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 150ms;
    cursor: pointer;
  }

  .tier-cta.primary {
    background: var(--orange);
    color: #fff;
    box-shadow: 0 0 20px rgba(255, 85, 0, 0.3);
  }
  .tier-cta.primary:hover {
    background: var(--orange-hover);
    box-shadow: 0 0 32px rgba(255, 85, 0, 0.45);
    transform: translateY(-1px);
  }

  .tier-cta.outline {
    background: transparent;
    color: var(--text-1);
    border: 1px solid var(--border-2);
  }
  .tier-cta.outline:hover {
    border-color: var(--text-3);
    background: rgba(255, 255, 255, 0.04);
  }

  /* ── Usage note ── */
  .usage-note {
    text-align: center;
    margin-top: 28px;
    font-size: 13px;
    color: var(--text-2);
    max-width: 620px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.65;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 20px;
  }

  /* ── Add-ons ── */
  .addons-section {
    margin-top: 72px;
  }

  .addons-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .addons-title {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    color: var(--text-1);
    margin-bottom: 8px;
  }

  .addons-sub {
    font-size: 0.9375rem;
    color: var(--text-2);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .addons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .addon-group {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px 22px;
  }

  .addon-group-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 14px;
  }

  .addon-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .addon-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .addon-name {
    font-size: 0.875rem;
    color: var(--text-2);
  }

  .addon-price {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-1);
    white-space: nowrap;
  }

  /* ── Fine print ── */
  .fine-print {
    text-align: center;
    margin-top: 40px;
    font-size: 13px;
    color: var(--text-3);
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.65;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .tiers {
      grid-template-columns: 1fr;
      max-width: 480px;
      margin: 0 auto;
    }
  }

  @media (max-width: 600px) {
    .pricing { padding: 64px 0; }
    .addons-grid { grid-template-columns: 1fr; }
  }
</style>
