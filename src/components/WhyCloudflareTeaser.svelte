<script lang="ts">
  import { LINKS } from '../config';

  let detailsDialog = $state<HTMLDialogElement | null>(null);

  function openDetails(): void {
    detailsDialog?.showModal();
  }

  function closeDetails(): void {
    detailsDialog?.close();
  }
</script>

<section class="cf-teaser" aria-labelledby="cf-teaser-heading">
  <div class="container">
    <div class="cf-teaser__row">
      <div>
        <p class="section-label">Infrastructure</p>
        <h2 class="section-title" id="cf-teaser-heading">Why Cloudflare?</h2>
      </div>
      <p class="cf-teaser__facts">300+ PoPs · Zero Trust · V8 isolation</p>
    </div>
    <p class="section-desc cf-teaser__summary">
      Bloqr runs at the edge for fast updates and strict isolation. We picked Cloudflare because
      their security model and transparency posture are publicly verifiable.
    </p>
    <div class="cf-teaser__actions">
      <button class="cf-teaser__link" type="button" onclick={openDetails}>
        Why we chose Cloudflare →
      </button>
      <a class="cf-teaser__link" href={LINKS.about}>Learn more on /about →</a>
    </div>
  </div>

  <dialog class="cf-dialog" bind:this={detailsDialog} aria-labelledby="cf-dialog-title">
    <article class="cf-dialog__content">
      <h3 id="cf-dialog-title">Why Cloudflare powers Bloqr</h3>
      <ul>
        <li>Edge execution with V8 isolates reduces persistent attack surface.</li>
        <li>Global PoP coverage keeps latency low while rules update quickly.</li>
        <li>Zero Trust defaults align with Bloqr's privacy-first architecture.</li>
      </ul>
      <div class="cf-dialog__actions">
        <a href={LINKS.about} class="btn btn-outline">Read the full breakdown</a>
        <button type="button" class="btn btn-cyan" onclick={closeDetails}>Close</button>
      </div>
    </article>
  </dialog>
</section>

<style>
  .cf-teaser {
    padding: 72px 0;
    border-top: 1px solid var(--border);
  }

  .cf-teaser__row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-end;
    margin-bottom: 12px;
  }

  .cf-teaser__facts {
    color: var(--text-2);
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }

  .cf-teaser__summary {
    max-width: 760px;
  }

  .cf-teaser__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 16px;
  }

  .cf-teaser__link {
    border: none;
    padding: 0;
    background: transparent;
    color: var(--cyan);
    text-decoration: none;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
  }

  .cf-teaser__link:hover {
    text-decoration: underline;
  }

  .cf-dialog {
    border: 1px solid var(--border-2);
    border-radius: 14px;
    max-width: 640px;
    width: min(92vw, 640px);
    background: var(--bg-base);
    color: var(--text-1);
    padding: 0;
  }

  .cf-dialog::backdrop {
    background: rgba(0, 0, 0, 0.55);
  }

  .cf-dialog__content {
    padding: 24px;
  }

  .cf-dialog__content h3 {
    margin-bottom: 12px;
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .cf-dialog__content ul {
    padding-left: 18px;
    margin-bottom: 20px;
    color: var(--text-2);
    line-height: 1.6;
  }

  .cf-dialog__actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 700px) {
    .cf-teaser__row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
