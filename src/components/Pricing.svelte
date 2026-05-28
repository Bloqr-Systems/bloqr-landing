<!-- Pricing section -->

<script>
  import { LINKS } from '../config';

  function trackPricingCta(tierName, cta) {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('pricing_cta_clicked', { tier: tierName, cta });
    }
  }

  /** Which audience track is currently shown */
  let activeAudience = $state('personal');

  const audiences = [
    { id: 'personal', label: 'Personal' },
    { id: 'developer', label: 'Developer' },
    { id: 'vendor',  label: 'Vendor / Business' },
  ];

  const tiersByAudience = {
    personal: [
      {
        name:     'Starter',
        price:    '$3.99',
        period:   '/month',
        aside:    'Less than a streaming rental.',
        tagline:  'For households who just want it handled.',
        cta:      'Get started',
        href:     LINKS.app,
        featured: false,
        items: [
          'Web API / SaaS — fully managed',
          'AI-curated filter list maintained for you',
          'Works with NextDNS, AdGuard, Pi-hole & more',
          '50 compiles/day · 2,000 rules/compile',
          '2 filter sources',
          '30-day output retention',
          'Weekly threat list updates',
          'Community support',
        ],
      },
      {
        name:     'Plus',
        price:    '$7.99',
        period:   '/month',
        aside:    'Roughly the price of a decent coffee.',
        tagline:  'More sources, more DNS integrations, more control.',
        cta:      'Get started',
        href:     LINKS.app,
        featured: false,
        items: [
          'Everything in Starter',
          '200 compiles/day · 10,000 rules/compile',
          '5 filter sources',
          '3 DNS provider integrations',
          '90-day output retention',
          'Email notifications for major incidents',
          'Email support',
        ],
      },
      {
        name:     'Premium',
        price:    '$14.99',
        period:   '/month',
        aside:    'The full personal experience.',
        tagline:  'Natural language rules + REST API included.',
        cta:      'Get started',
        href:     LINKS.app,
        featured: true,
        items: [
          'Everything in Plus',
          '500 compiles/day · 25,000 rules/compile',
          '10 filter sources',
          'Natural language rule builder included',
          'REST API access included',
          'Full config export (JSON/YAML)',
          'Priority email support',
        ],
      },
    ],
    developer: [
      {
        name:     'Dev',
        price:    '$9.99',
        period:   '/month',
        aside:    'Build without limits on calls.',
        tagline:  'CLI and REST API — all unlocked.',
        cta:      'Start building',
        href:     LINKS.app,
        featured: false,
        items: [
          'Web API/SaaS + CLI build tools',
          'REST API access',
          '1,000 compiles/day · 50,000 rules/compile',
          '10 filter sources',
          'Basic custom pipelines',
          '90-day output retention',
          'Email support',
        ],
      },
      {
        name:     'Dev Pro',
        price:    '$24.99',
        period:   '/month',
        aside:    'The full pipeline — locally and in the cloud.',
        tagline:  'SDK license + streaming + async API included.',
        cta:      'Start building',
        href:     LINKS.app,
        featured: true,
        items: [
          'Everything in Dev',
          'SDK license for local library embedding',
          'Web APIs callable from local SDK (usage billed)',
          'Streaming API + async/batch API included',
          '5,000 compiles/day · 100,000 rules/compile',
          'Unlimited filter sources',
          'Full transformation pipeline suite',
          'Priority queue · priority threat intelligence',
          '1-year output retention',
          'Priority email support',
        ],
      },
      {
        name:     'Dev Enterprise',
        price:    '$49.99',
        period:   '/month',
        aside:    'Unlimited scale. Guaranteed uptime.',
        tagline:  'Full suite, SLA, and dedicated support.',
        cta:      'Contact us',
        href:     '/#waitlist',
        featured: false,
        items: [
          'Everything in Dev Pro',
          'Unlimited compiles/day',
          'Unlimited rules per compile',
          'All API modes (REST, streaming, async, batch)',
          'SLA — 99.9% uptime guaranteed',
          '2-year output retention',
          'Dedicated support channel (Slack or email)',
          'Custom pipeline consulting',
        ],
      },
    ],
    vendor: [
      {
        name:     'Vendor',
        price:    '$29.99',
        period:   '/month',
        aside:    'Pipeline-first for teams and products.',
        tagline:  'Multi-instance, resource consumption, API marketplace.',
        cta:      'Contact us',
        href:     '/#waitlist',
        featured: false,
        items: [
          'All Dev features',
          'Resource-based consumption (Cloudflare usage included)',
          'Multi-instance management',
          'REST + async API included',
          'API marketplace listing (when live)',
          'Invoice billing available',
          'Priority queue',
          '90-day output retention',
          'Email support',
        ],
      },
      {
        name:     'Vendor Pro',
        price:    '$79.99',
        period:   '/month',
        aside:    'The full stack — edge-deployed and SLA-backed.',
        tagline:  'Cloudflare edge + full pipeline suite + dedicated support.',
        cta:      'Contact us',
        href:     '/#waitlist',
        featured: true,
        items: [
          'Everything in Vendor',
          'Cloudflare edge deployment',
          'Streaming API + full pipeline suite',
          'SDK license for local embedding',
          'Web APIs from SDK (usage billed)',
          'Priority threat intelligence feed',
          '2-year output retention',
          'SLA — 99.9% uptime',
          'Dedicated support channel',
        ],
      },
      {
        name:     'Enterprise',
        price:    'Custom',
        period:   '',
        aside:    'White-label. Custom SLA. Dedicated infra.',
        tagline:  'For high-volume vendors and OEM integrators.',
        cta:      'Talk to us',
        href:     '/#waitlist',
        featured: false,
        items: [
          'Everything in Vendor Pro',
          'Unlimited compiles + custom rate limits',
          'White-label / OEM options',
          'Custom integrations',
          'Dedicated infrastructure',
          'Custom SLA negotiated',
          'Dedicated account manager',
        ],
      },
    ],
  };

  const addons = [
    { group: 'API access',       name: 'REST API',                  price: '$2.99/mo' },
    { group: 'API access',       name: 'Streaming API',             price: '$4.99/mo' },
    { group: 'API access',       name: 'Async / batch API',         price: '$3.99/mo' },
    { group: 'Compiler',         name: 'SDK license (local embed)', price: '$9.99/mo' },
    { group: 'Compiler',         name: 'CLI build tools',           price: '$1.99/mo' },
    { group: 'Compiler',         name: 'Natural language rules',    price: '$3.99/mo' },
    { group: 'Compiler',         name: 'Custom pipelines',          price: '$4.99/mo' },
    { group: 'Compiler',         name: 'Priority threat intel',     price: '$4.99/mo' },
    { group: 'Infrastructure',   name: 'Priority queue',            price: '$2.99/mo' },
    { group: 'Infrastructure',   name: '1-year output retention',   price: '$2.99/mo' },
    { group: 'Infrastructure',   name: 'Multi-instance mgmt',       price: '$3.99/mo' },
    { group: 'Infrastructure',   name: 'Cloudflare edge deploy',    price: '$9.99/mo' },
    { group: 'DNS integrations', name: 'NextDNS',                   price: '$1.99/mo' },
    { group: 'DNS integrations', name: 'AdGuard Home',              price: '$1.99/mo' },
    { group: 'DNS integrations', name: 'Pi-hole',                   price: '$1.99/mo' },
    { group: 'DNS integrations', name: 'Cloudflare Gateway',        price: '$2.99/mo' },
    { group: 'DNS integrations', name: 'Custom DNS provider',       price: '$2.99/mo' },
    { group: 'Support',          name: 'Priority email support',    price: '$4.99/mo' },
    { group: 'Support',          name: 'SLA (99.9% uptime)',        price: '$9.99/mo' },
    { group: 'Support',          name: 'Dedicated support channel', price: '$19.99/mo' },
  ];

  /** Group add-ons for display */
  const addonGroups = [...new Set(addons.map(a => a.group))];


</script>

<section class="pricing" id="pricing">
  <div class="container">

    <div class="section-header">
      <p class="section-label">Pricing</p>
      <h2 class="section-title">
        Pick your plan.<br />
        <em>No free tier. No surprises.</em>
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
                <span class="check" aria-hidden="true">✓</span>
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
      ⚡ Usage above plan limits billed at <strong>$0.002/compile</strong> and
      <strong>$0.001/1,000 rules</strong>. Web API calls via the local SDK always
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
    text-align: center;
    max-width: 600px;
    margin: 0 auto 48px;
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
    font-weight: 700;
    flex-shrink: 0;
    font-size: 0.875rem;
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
