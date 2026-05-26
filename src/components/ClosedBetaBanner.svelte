<script lang="ts">
  import { LINKS } from '../config';

  const DISMISS_KEY = 'beta-banner-dismissed';

  let visible = $state(true);

  $effect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === '1') {
        visible = false;
      }
    } catch {
      // sessionStorage unavailable — keep banner visible
    }
  });

  function dismiss(): void {
    visible = false;
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // sessionStorage unavailable — dismiss is still applied for this render
    }
  }
</script>

{#if visible}
  <div class="beta-banner" role="status" aria-live="polite">
    <p class="beta-banner__text">
      <strong>Closed Beta</strong> — You can
      <a href={LINKS.app} rel="noopener noreferrer" target="_blank">create an account</a>
      today. Not everything works yet. We ship in Q3 '26.
    </p>
    <button
      type="button"
      class="beta-banner__close"
      aria-label="Dismiss beta notice"
      onclick={dismiss}
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>
{/if}

<style>
  .beta-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 10px 48px 10px 16px;
    background: var(--orange);
    border-bottom: 1px solid var(--border);
    box-sizing: border-box;
    z-index: 101;
  }

  .beta-banner__text {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
    color: var(--bg-surface);
    text-align: center;
    line-height: 1.4;
  }

  .beta-banner__text strong {
    font-weight: 700;
  }

  .beta-banner__text a {
    color: var(--bg-surface);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .beta-banner__text a:hover {
    opacity: 0.85;
  }

  .beta-banner__close {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 6px;
    color: var(--bg-surface);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    transition: background 150ms, border-color 150ms;
    flex-shrink: 0;
  }

  .beta-banner__close:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.55);
  }
</style>
