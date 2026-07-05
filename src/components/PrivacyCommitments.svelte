<!-- PrivacyCommitments: inline, no-jargon data commitment block -->
<script>
  import Check from '@lucide/svelte/icons/check';
  import X from '@lucide/svelte/icons/x';
  import Scale from '@lucide/svelte/icons/scale';
</script>

<section class="privacy-commitments" id="privacy-commitments" aria-labelledby="pc-heading">
  <div class="container">

    <div class="section-header">
      <p class="section-label">Our data commitment</p>
      <h2 class="section-title" id="pc-heading">
        What we do — and don't — with your data.
      </h2>
      <p class="section-desc intro-desc">
        Not a link to a privacy policy. This is the actual list — in plain language.
      </p>
    </div>

    <div class="commitments-grid">
      <!-- Left: what we do -->
      <div class="commitment-col" aria-label="What we do">
        <p class="col-heading" aria-hidden="true"><Check size={13} strokeWidth={3} /> What we do</p>
        <ul class="commitment-list" aria-label="Things Bloqr does do">
          <li>
            <span class="commit-icon" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
            <span>Filter your DNS traffic to apply your rules</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
            <span>Store your account info — email, subscription status, your rule config</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
            <span>Document exactly what we store and why — no hidden data fields</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
            <span>Delete your data completely when you close your account — no retention</span>
          </li>
        </ul>
      </div>

      <!-- Right: what we never do -->
      <div class="commitment-col" aria-label="What we never do">
        <p class="col-heading" aria-hidden="true"><X size={13} strokeWidth={3} /> What we never do</p>
        <ul class="commitment-list" aria-label="Things Bloqr never does">
          <li>
            <span class="commit-icon" aria-hidden="true"><X size={15} strokeWidth={3} /></span>
            <span>Log your DNS queries or browsing patterns</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><X size={15} strokeWidth={3} /></span>
            <span>Build a profile of your browsing behavior</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><X size={15} strokeWidth={3} /></span>
            <span>Sell, share, or license your data — ever, to anyone</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><X size={15} strokeWidth={3} /></span>
            <span>Make it hard to leave — export your config anytime, no contracts</span>
          </li>
          <li>
            <span class="commit-icon" aria-hidden="true"><X size={15} strokeWidth={3} /></span>
            <span>Use "no-log" as a marketing phrase without the architecture to back it up</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Callout box -->
    <div class="callout-box" role="note" aria-label="Why architecture matters more than policy">
      <span class="callout-icon" aria-hidden="true"><Scale size={22} strokeWidth={2} /></span>
      <p class="callout-text">
        The most effective legal protection isn't a favorable jurisdiction. It's not having
        the data in the first place. What's never logged can't be leaked, sold, or produced
        in court. That's an architectural decision, not a policy claim.
      </p>
    </div>

  </div>
</section>

<style>
  .privacy-commitments {
    padding: 80px 0;
    border-top: 1px solid var(--border);
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .intro-desc {
    max-width: 480px;
    margin: 0 auto;
  }

  /* ── Commitments grid ── */
  .commitments-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }

  @media (max-width: 700px) {
    .commitments-grid { grid-template-columns: 1fr; gap: 24px; }
  }

  .commitment-col {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px;
  }

  .col-heading {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 20px;
  }

  /* ── Commitment list ── */
  .commitment-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .commitment-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.9rem;
    color: var(--text-2);
    line-height: 1.55;
  }

  .commit-icon {
    flex-shrink: 0;
    display: inline-flex;
    margin-top: 3px;
    color: var(--text-3);
  }

  .commitment-col:first-child .commit-icon {
    color: var(--orange);
  }

  /* ── Callout box ── */
  .callout-box {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 28px;
    border: 1px solid rgba(255, 85, 0, 0.25);
    border-radius: 12px;
    background: rgba(255, 85, 0, 0.04);
  }

  .callout-icon {
    display: inline-flex;
    flex-shrink: 0;
    color: var(--orange);
    margin-top: 2px;
  }

  .callout-text {
    font-size: 0.9rem;
    color: var(--text-2);
    line-height: 1.7;
    margin: 0;
  }
</style>
