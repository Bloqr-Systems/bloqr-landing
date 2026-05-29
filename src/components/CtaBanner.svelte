<script>
  import { LINKS } from '../config';

  function trackCtaBanner(label) {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('cta_banner_clicked', { label });
    }
  }
</script>
<!-- Final CTA section -->

<section class="cta">
  <div class="container">
    <p class="section-label">Ready for better internet hygiene?</p>
    <h2 class="section-title">Set it. Bloqr it. Done.<br />No tunnel required.</h2>
    <p class="section-desc">
      We're in closed beta — account creation is open today, and we're shipping the full product in
      Q3 '26. Pick the plan that fits, lock in early access.
    </p>
    <div class="tiers">
      <div class="tier">
        <span class="tier-name">Personal</span>
        <span class="tier-desc">From $3.99/mo · SaaS, fully managed</span>
      </div>
      <div class="tier-sep" aria-hidden="true">·</div>
      <div class="tier">
        <span class="tier-name">Developer</span>
        <span class="tier-desc">From $9.99/mo · SDK + pipelines + APIs</span>
      </div>
      <div class="tier-sep" aria-hidden="true">·</div>
      <div class="tier">
        <span class="tier-name">Vendor</span>
        <span class="tier-desc">From $29.99/mo · Multi-instance + edge</span>
      </div>
    </div>
    <div class="actions">
      <a href={LINKS.app} class="btn btn-primary" rel="noopener noreferrer" target="_blank" onclick={() => trackCtaBanner('join_the_beta')}>
        Join the beta <span aria-hidden="true">→</span>
      </a>
      <a href={LINKS.docs} class="btn btn-outline cta-secondary" rel="noopener noreferrer" target="_blank" onclick={() => trackCtaBanner('view_docs')}>
        View docs
      </a>
    </div>
  </div>
</section>

<style>
  .cta {
    padding: 80px 0;
    text-align: center;
    border-top: 1px solid var(--border);
  }

  .section-title { max-width: 600px; margin: 0 auto 16px; }
  .section-desc   { max-width: 480px; margin: 0 auto 32px; }

  .tiers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 40px;
    padding: 20px 32px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
  }

  .tier { text-align: center; }

  .tier-name {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 4px;
  }

  .tier-desc {
    display: block;
    font-size: 0.75rem;
    color: var(--text-3);
  }

  .tier-sep {
    color: var(--border-2);
    font-size: 1.5rem;
    line-height: 1;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .cta-secondary {
    color: var(--cyan);
    border-color: color-mix(in srgb, var(--cyan) 30%, var(--border-2));
  }
</style>
