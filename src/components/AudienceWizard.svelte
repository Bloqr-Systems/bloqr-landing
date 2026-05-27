<script lang="ts">
  import { audienceStore, type Persona } from '../lib/audience.svelte.ts';

  const STORAGE_KEY = 'bloqr_persona';

  const tiles: { persona: Persona; icon: string; label: string; tagline: string; sub: string }[] = [
    {
      persona: 'consumer',
      icon: '🛡️',
      label: 'Just browsing',
      tagline: 'Set it. Bloqr it. Forget it.',
      sub: 'The internet you always thought you had. No setup.',
    },
    {
      persona: 'poweruser',
      icon: '⚡',
      label: 'Power user',
      tagline: 'Keep your vendor. Stop doing it in 12 places.',
      sub: 'Already on AdGuard, NextDNS, or Pi-hole? Great. Stay.',
    },
    {
      persona: 'developer',
      icon: '🛠️',
      label: 'Developer / list maker',
      tagline: 'Your pipeline. Our engine.',
      sub: 'Build tools or maintain filter lists. API-first.',
    },
    {
      persona: 'vendor',
      icon: '🤝',
      label: 'Vendor / partner',
      tagline: 'Bring your own. Or use ours.',
      sub: 'Your users trust you. We make that trust more powerful.',
    },
  ];

  let dismissed = $state(false);

  const personaLabels: Record<string, string> = {
    consumer:  'Just browsing',
    poweruser: 'Power user',
    developer: 'Developer / list maker',
    vendor:    'Vendor / partner',
  };

  $effect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const validPersonas: Persona[] = ['consumer', 'poweruser', 'developer', 'vendor'];
    const validSaved: Persona = validPersonas.includes(saved as Persona) ? (saved as Persona) : null;
    if (validSaved && validSaved !== audienceStore.persona) {
      audienceStore.persona = validSaved;
      document.body.dataset.persona = validSaved;
      dismissed = true;
    }
  });

  function select(p: Persona): void {
    audienceStore.persona = p;
    if (p) {
      localStorage.setItem(STORAGE_KEY, p);
      document.body.dataset.persona = p;
    } else {
      localStorage.removeItem(STORAGE_KEY);
      delete document.body.dataset.persona;
    }
    dismissed = true;
    window.dispatchEvent(new CustomEvent('bloqr:persona-selected', { detail: { persona: p } }));
  }

  function reset(): void {
    audienceStore.persona = null;
    localStorage.removeItem(STORAGE_KEY);
    delete document.body.dataset.persona;
    dismissed = false;
    window.dispatchEvent(new CustomEvent('bloqr:persona-selected', { detail: { persona: null } }));
  }
</script>

<!-- AudienceWizard: always in DOM for SEO, visibility toggled by CSS -->
<div class="wizard" aria-label="Personalize your experience">

  <!-- Collapsed bar shown after selection -->
  <div class="wizard__bar" class:wizard__bar--visible={dismissed && audienceStore.persona !== null}>
    <span class="wizard__bar-text">
      Personalized for: <strong>{audienceStore.persona ? personaLabels[audienceStore.persona] : ''}</strong>
    </span>
    <button class="wizard__bar-change" onclick={reset} aria-label="Change persona">
      change
    </button>
  </div>

  <!-- Full wizard shown until selection -->
  <div class="wizard__card" class:wizard__card--hidden={dismissed}>
    <p class="wizard__prompt">Which best describes you?</p>
    <div class="wizard__tiles">
      {#each tiles as tile}
        <button
          class="wizard__tile"
          class:wizard__tile--active={audienceStore.persona === tile.persona}
          onclick={() => select(tile.persona)}
          aria-pressed={audienceStore.persona === tile.persona}
        >
          <span class="wizard__tile-icon" aria-hidden="true">{tile.icon}</span>
          <span class="wizard__tile-label">{tile.label}</span>
          <span class="wizard__tile-tagline">{tile.tagline}</span>
          <span class="wizard__tile-sub">{tile.sub}</span>
        </button>
      {/each}
    </div>
    <button class="wizard__skip" onclick={() => select(null)}>
      Skip / show all
    </button>
  </div>

</div>

<style>
  .wizard {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px 40px;
  }

  /* ── Collapsed bar ─────────────────────────────────── */
  .wizard__bar {
    display: none;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    border-radius: 10px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-2);
  }

  .wizard__bar--visible {
    display: flex;
  }

  .wizard__bar-text strong {
    color: var(--text-1);
  }

  .wizard__bar-change {
    margin-left: auto;
    background: none;
    border: none;
    color: var(--orange);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .wizard__bar-change:hover {
    color: var(--orange-hover);
  }

  /* ── Full wizard card ──────────────────────────────── */
  .wizard__card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 28px 20px;
  }

  .wizard__card--hidden {
    display: none;
  }

  .wizard__prompt {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-1);
    margin-bottom: 18px;
    text-align: center;
  }

  /* ── Tiles grid ────────────────────────────────────── */
  .wizard__tiles {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 16px;
  }

  @media (max-width: 700px) {
    .wizard__tiles {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 420px) {
    .wizard__tiles {
      grid-template-columns: 1fr;
    }
  }

  .wizard__tile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 16px 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg-elevated);
    cursor: pointer;
    text-align: left;
    transition: border-color 150ms, background 150ms, box-shadow 150ms;
  }

  .wizard__tile:hover {
    border-color: var(--border-2);
    background: var(--bg-surface);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .wizard__tile--active {
    border-color: var(--orange);
    background: var(--orange-dim);
    box-shadow: 0 0 0 1px var(--orange);
  }

  .wizard__tile-icon {
    font-size: 22px;
    line-height: 1;
    margin-bottom: 4px;
  }

  .wizard__tile-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-1);
  }

  .wizard__tile-tagline {
    font-size: 11px;
    font-weight: 600;
    color: var(--orange);
    line-height: 1.3;
  }

  .wizard__tile-sub {
    font-size: 11px;
    color: var(--text-3);
    line-height: 1.4;
    margin-top: 2px;
  }

  /* ── Skip link ─────────────────────────────────────── */
  .wizard__skip {
    display: block;
    width: 100%;
    background: none;
    border: none;
    font-size: 12px;
    color: var(--text-3);
    text-align: center;
    cursor: pointer;
    padding: 6px;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .wizard__skip:hover {
    color: var(--text-2);
  }
</style>
