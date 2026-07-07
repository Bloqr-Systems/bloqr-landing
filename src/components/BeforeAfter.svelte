<!-- BeforeAfter: "how blocking works" explainer + animated waterfall chart -->
<script>
  import { onMount } from 'svelte';
  import Globe from '@lucide/svelte/icons/globe';
  import Phone from '@lucide/svelte/icons/phone';
  import Waves from '@lucide/svelte/icons/waves';
  import Timer from '@lucide/svelte/icons/timer';
  import Shield from '@lucide/svelte/icons/shield';
  import Ban from '@lucide/svelte/icons/ban';
  import Zap from '@lucide/svelte/icons/zap';
  import Clipboard from '@lucide/svelte/icons/clipboard';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import Check from '@lucide/svelte/icons/check';

  const STEP_ICONS = {
    'globe': Globe,
    'phone': Phone,
    'waves': Waves,
    'timer': Timer,
    'shield': Shield,
    'ban': Ban,
    'zap': Zap,
    'clipboard': Clipboard,
    'warning': TriangleAlert,
  };

  // ── Reactive state ──────────────────────────────────────────────────────────
  let visible = $state(true);
  let sectionVisible = $state(false);
  let modalStep = $state(0);
  /** Set to true the first time the user manually clicks Back/Next/dot — stops auto-advance */
  let userTookControl = $state(false);

  /** @type {HTMLDialogElement | null} */
  let dialogEl = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let autoTimer = null;

  const STEP_MS = 3500;

  onMount(() => {
    visible = false;
    const t = setTimeout(() => (visible = true), 120);

    const target = document.getElementById('how-blocking-works');
    /** @type {IntersectionObserver | undefined} */
    let obs;
    if (target) {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            sectionVisible = true;
            obs?.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(target);
    }

    return () => {
      clearTimeout(t);
      if (autoTimer) clearTimeout(autoTimer);
      obs?.disconnect();
    };
  });

  function openModal() {
    modalStep = 0;
    userTookControl = false;
    if (!dialogEl?.showModal) return;

    dialogEl.showModal();
    scheduleTick();
  }

  function closeModal() {
    if (autoTimer) clearTimeout(autoTimer);
    if (dialogEl?.open && typeof dialogEl.close === 'function') dialogEl.close();
  }

  function scheduleTick() {
    if (autoTimer) clearTimeout(autoTimer);
    if (!userTookControl && modalStep < modalSteps.length - 1) {
      autoTimer = setTimeout(() => {
        modalStep++;
        scheduleTick();
      }, STEP_MS);
    }
  }

  /**
   * @param {number} n
   * @param {boolean} [manual] - true when triggered by a user click
   */
  function goStep(n, manual = false) {
    if (autoTimer) clearTimeout(autoTimer);
    if (manual) userTookControl = true;
    modalStep = Math.max(0, Math.min(n, modalSteps.length - 1));
    if (!userTookControl) scheduleTick();
  }

  function handleDialogClose() {
    if (autoTimer) clearTimeout(autoTimer);
  }

  // ── Waterfall data ─────────────────────────────────────────────────────────

  // Without Bloqr bars: type = 'content' | 'tracker' | 'ad' | 'malware'
  const barsWithout = [
    { type: 'content',  label: 'index.html',          w: 18, delay: 0   },
    { type: 'content',  label: 'main.css',             w: 22, delay: 60  },
    { type: 'content',  label: 'app.js',               w: 38, delay: 80  },
    { type: 'tracker',  label: 'analytics.js',         w: 28, delay: 120 },
    { type: 'tracker',  label: 'pixel.png',            w: 14, delay: 140 },
    { type: 'ad',       label: 'ad-script.js',         w: 45, delay: 160 },
    { type: 'content',  label: 'hero-image.webp',      w: 55, delay: 180 },
    { type: 'tracker',  label: 'fb-pixel.js',          w: 20, delay: 200 },
    { type: 'ad',       label: 'doubleclick.js',       w: 52, delay: 210 },
    { type: 'malware',  label: 'malware-cdn.js',       w: 30, delay: 230 },
    { type: 'tracker',  label: 'hotjar.js',            w: 35, delay: 250 },
    { type: 'content',  label: 'fonts.woff2',          w: 26, delay: 270 },
    { type: 'ad',       label: 'prebid.js',            w: 60, delay: 280 },
    { type: 'malware',  label: 'tracking-beacon.gif',  w: 18, delay: 300 },
    { type: 'tracker',  label: 'segment.io',           w: 40, delay: 310 },
    { type: 'content',  label: 'content.json',         w: 24, delay: 330 },
    { type: 'malware',  label: 'cryptominer.js',       w: 50, delay: 340 },
    { type: 'ad',       label: 'ad-network.js',        w: 42, delay: 360 },
  ];

  // With Bloqr: only content bars survive; blocked ones shown as ghost bars
  const barsWith = barsWithout.map((b) => ({
    ...b,
    blocked: b.type !== 'content',
    delay: b.delay + 20,
  }));

  // ── Inline flow diagram data ────────────────────────────────────────────────

  const stepsWithout = [
    {
      icon: 'globe',
      title: 'You visit a site',
      desc: 'Your browser loads the page — then discovers a list of 18 extra things to fetch: images, fonts, ads, scripts, trackers.',
    },
    {
      icon: 'phone',
      title: '"Where does each thing live?"',
      desc: 'Your browser asks the DNS phone book for the address of every single item — one lookup per resource.',
    },
    {
      icon: 'waves',
      title: 'The whole list floods in',
      desc: '5 trackers silently logging your session. 4 ad-auction scripts bidding on your attention. 3 suspicious domains nobody invited.',
      variant: 'warn',
    },
    {
      icon: 'timer',
      title: '4.2 seconds to load',
      desc: 'Slow because your browser waited for all of it. Watched because trackers got everything they wanted.',
      variant: 'bad',
    },
  ];

  const stepsWith = [
    {
      icon: 'globe',
      title: 'You visit a site',
      desc: 'Same page, same browser — Bloqr is running quietly in the background.',
    },
    {
      icon: 'shield',
      title: 'Bloqr answers the phone book first',
      desc: 'At the DNS lookup step, Bloqr intercepts every address request and checks it against known threats — before the connection is ever opened.',
      variant: 'shield',
    },
    {
      icon: 'ban',
      title: '12 bad actors turned away at the door',
      desc: 'Blocked at DNS. No connection opened. No bytes downloaded. No milliseconds wasted waiting for them.',
      variant: 'blocked',
    },
    {
      icon: 'zap',
      title: '1.1 seconds to load',
      desc: 'Fast because your browser never waited for junk. Private because trackers were never given the chance.',
      variant: 'good',
    },
  ];

  // ── Modal walkthrough data ──────────────────────────────────────────────────

  const modalSteps = [
    {
      icon: 'globe',
      title: 'You open a website',
      body: 'You click a link and your browser starts loading the page. But getting a webpage isn\'t just one download — your browser discovers a list of 18 separate things it needs to fetch: images, fonts, layout files, and scripts. Each one lives at a completely different address on the internet.',
      variant: 'neutral',
      items: null,
      stats: null,
    },
    {
      icon: 'clipboard',
      title: 'Every item needs an address lookup',
      body: 'Before your browser can fetch anything, it has to ask: "Where does this live?" That\'s called a DNS lookup — think of it as the internet\'s phone book. Your browser looks up the address for every single item on that list. This happens in milliseconds, but each lookup is a door that can be opened to things you never wanted.',
      variant: 'neutral',
      items: null,
      stats: null,
    },
    {
      icon: 'warning',
      title: 'Without protection, everyone gets in',
      body: 'Of those 18 items, only 6 are things you actually asked for. The other 12 are uninvited: trackers that build a profile of what you read, ad-auction scripts that run a real-time bidding war in the background, and malware that could record your keystrokes or silently mine cryptocurrency using your device\'s power.',
      variant: 'bad',
      items: ['analytics.js — logs your reading habits', 'doubleclick.js — runs a background ad auction', 'cryptominer.js — burns your CPU to mine crypto'],
      stats: null,
    },
    {
      icon: 'shield',
      title: 'Bloqr steps in at the phone book',
      body: 'Bloqr works at the DNS layer — right at that address-lookup step. Before your browser can even open a connection to analytics.js, Bloqr checks: "Is this a known bad actor?" If it is, the lookup fails instantly. No connection is opened. The request simply never happens — in under a millisecond.',
      variant: 'shield',
      items: null,
      stats: null,
    },
    {
      icon: 'ban',
      title: '12 domains blocked. Zero bytes. Zero wait.',
      body: 'Because Bloqr said no during the lookup phase, your browser never opened a connection to any of them. It didn\'t download a single byte from trackers, ad scripts, or malware. And since it never waited for those 12 requests, your page loads as if they were never on the list.',
      variant: 'blocked',
      items: ['analytics.js', 'fb-pixel.js', 'doubleclick.js', 'hotjar.js', 'prebid.js', 'cryptominer.js'],
      stats: null,
    },
    {
      icon: 'zap',
      title: '74% faster. Every page. No trade-off.',
      body: 'Privacy and performance aren\'t opposites — they\'re the same thing here. Every domain Bloqr blocks is load time you get back, CPU cycles saved, and data you keep to yourself. It happens automatically, on every page, every visit. You don\'t configure anything. You don\'t click anything. It just works.',
      variant: 'result',
      items: null,
      stats: [
        { label: 'Without Bloqr', value: '4.2s', bad: true,  good: false },
        { label: 'With Bloqr',    value: '1.1s', bad: false, good: true },
      ],
    },
  ];

  // ── Legend data ─────────────────────────────────────────────────────────────

  const legendItems = [
    { swatch: 'content', label: 'Your content',    desc: 'HTML, images, fonts — what you asked for' },
    { swatch: 'tracker', label: 'Tracker',          desc: 'Scripts that log what you read' },
    { swatch: 'ad',      label: 'Ad script',        desc: 'Background auction — slows your page' },
    { swatch: 'malware', label: 'Malware / miner',  desc: 'Could steal passwords or mine crypto' },
  ];
</script>

<section class="before-after" id="before-after" aria-labelledby="ba-title">
  <div class="container">

    <!-- ── Section header ──────────────────────────────────────────────────── -->
    <div class="section-header">
      <p class="section-label">Performance</p>
      <h2 class="section-title" id="ba-title">Privacy and speed aren't a tradeoff.</h2>
      <p class="section-desc">
        When Bloqr blocks a domain, your browser never waits for it.
        Every tracker that doesn't load is time back in your life.
      </p>
    </div>

    <!-- ── How blocking actually works ────────────────────────────────────── -->
    <div class="how-blocking" id="how-blocking-works" aria-labelledby="hb-title">
      <div class="hb-header">
        <div>
          <p class="section-label">Under the hood</p>
          <h3 id="hb-title">How blocking actually works</h3>
          <p class="hb-intro">
            Every website visit starts with your browser asking "where is each thing?"
            Bloqr sits right at that moment — and says no to the bad actors before they even get a chance.
          </p>
        </div>
        <button class="walkthrough-btn" onclick={openModal} aria-haspopup="dialog">
          See it happen →
        </button>
      </div>

      <div class="flow-comparison" class:flow-comparison--visible={sectionVisible}>

        <!-- Without Bloqr flow -->
        <div class="flow flow--bad" aria-label="Page load journey without Bloqr">
          <div class="flow-col-header flow-col-header--bad">
            <span class="flow-pill flow-pill--bad">Without Bloqr</span>
          </div>
          {#each stepsWithout as step, i}
            <div
              class="flow-step flow-step--{step.variant ?? 'neutral'}"
              style="--step-i: {i}"
            >
              <span class="flow-step__icon" aria-hidden="true">
                {#if STEP_ICONS[step.icon]}
                  {@const Icon = STEP_ICONS[step.icon]}
                  <Icon size={16} strokeWidth={2} />
                {/if}
              </span>
              <span class="flow-step__text">
                <strong class="flow-step__title">{step.title}</strong>
                <span class="flow-step__desc">{step.desc}</span>
              </span>
            </div>
            {#if i < stepsWithout.length - 1}
              <div class="flow-arrow" style="--step-i: {i}" aria-hidden="true"><ArrowDown size={16} strokeWidth={2.5} /></div>
            {/if}
          {/each}
        </div>

        <!-- VS divider -->
        <div class="flow-vs" aria-hidden="true">vs</div>

        <!-- With Bloqr flow -->
        <div class="flow flow--good" aria-label="Page load journey with Bloqr">
          <div class="flow-col-header flow-col-header--good">
            <span class="flow-pill flow-pill--good">With Bloqr <span aria-hidden="true"><Check size={12} strokeWidth={3} /></span></span>
          </div>
          {#each stepsWith as step, i}
            <div
              class="flow-step flow-step--{step.variant ?? 'neutral'}"
              style="--step-i: {i}"
            >
              <span class="flow-step__icon" aria-hidden="true">
                {#if STEP_ICONS[step.icon]}
                  {@const Icon = STEP_ICONS[step.icon]}
                  <Icon size={16} strokeWidth={2} />
                {/if}
              </span>
              <span class="flow-step__text">
                <strong class="flow-step__title">{step.title}</strong>
                <span class="flow-step__desc">{step.desc}</span>
              </span>
            </div>
            {#if i < stepsWith.length - 1}
              <div class="flow-arrow" style="--step-i: {i}" aria-hidden="true"><ArrowDown size={16} strokeWidth={2.5} /></div>
            {/if}
          {/each}
        </div>

      </div>
    </div>

    <!-- ── Chart intro + legend ───────────────────────────────────────────── -->
    <div class="chart-intro">
      <p class="chart-intro__text">
        Each bar below is one network request — the longer the bar, the longer your browser
        waited. Ghost bars on the right show what Bloqr stopped.
      </p>
      <div class="legend" role="list" aria-label="Chart colour key">
        {#each legendItems as item}
          <div class="legend-item" role="listitem">
            <span class="legend-swatch legend-swatch--{item.swatch}" aria-hidden="true"></span>
            <strong class="legend-label">{item.label}</strong>
            <span class="legend-desc">{item.desc}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- ── Waterfall panels ───────────────────────────────────────────────── -->
    <p id="ba-panels-desc" class="sr-only">
      Side-by-side page load comparison: without Bloqr shows 18 requests including 5 trackers,
      4 ad scripts, and 3 suspicious domains; with Bloqr shows only 6 legitimate content
      requests with 12 domains blocked.
    </p>
    <div class="panels" aria-describedby="ba-panels-desc">
      <!-- Without Bloqr -->
      <div class="panel panel--bad">
        <div class="panel-header">
          <span class="panel-label">Without Bloqr</span>
          <span class="load-time bad-time" aria-label="Page load time: 4.2 seconds">4.2s</span>
        </div>
        <div class="waterfall" aria-hidden="true">
          {#each barsWithout as bar}
            <div class="bar-row">
              <span class="bar-name">{bar.label}</span>
              <div class="bar-track">
                <div
                  class="bar bar--{bar.type}"
                  class:bar--visible={visible}
                  style="--w: {bar.w}%; --delay: {bar.delay}ms"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          {/each}
        </div>
        <div class="panel-footer bad-footer">
          <span>18 requests</span>
          <span class="sep" aria-hidden="true">·</span>
          <span>5 trackers</span>
          <span class="sep" aria-hidden="true">·</span>
          <span>4 ad scripts</span>
          <span class="sep" aria-hidden="true">·</span>
          <span class="muted">3 suspicious domains · real content buried in noise</span>
        </div>
      </div>

      <!-- With Bloqr -->
      <div class="panel panel--good">
        <div class="panel-header">
          <span class="panel-label">
            With Bloqr
            <span class="check-badge" aria-label="Protected"><Check size={14} strokeWidth={3} /></span>
          </span>
          <span class="load-time good-time" aria-label="Page load time: 1.1 seconds">1.1s</span>
        </div>
        <div class="waterfall" aria-hidden="true">
          {#each barsWith as bar}
            <div class="bar-row">
              <span class="bar-name" class:bar-name--blocked={bar.blocked}>{bar.label}</span>
              <div class="bar-track">
                {#if bar.blocked}
                  <div
                    class="bar bar--ghost"
                    class:bar--visible={visible}
                    style="--w: {bar.w}%; --delay: {bar.delay}ms"
                    aria-hidden="true"
                  >
                    <span class="block-icon">✗</span>
                  </div>
                {:else}
                  <div
                    class="bar bar--clean"
                    class:bar--visible={visible}
                    style="--w: {bar.w}%; --delay: {bar.delay}ms"
                    aria-hidden="true"
                  ></div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
        <div class="panel-footer good-footer">
          <span>6 requests</span>
          <span class="sep" aria-hidden="true">·</span>
          <span class="good-stat">0 trackers</span>
          <span class="sep" aria-hidden="true">·</span>
          <span class="good-stat">0 ads</span>
          <span class="sep" aria-hidden="true">·</span>
          <span class="muted">12 domains blocked before your browser asked</span>
        </div>
      </div>
    </div>

    <p class="callout">
      "Blocking isn't just a privacy improvement. When Bloqr stops a domain, your browser
      never waits for it. Less noise, faster pages — as a direct side effect of better hygiene."
    </p>
  </div>
</section>

<!-- ── Modal: step-by-step walkthrough ───────────────────────────────────── -->
<dialog
  bind:this={dialogEl}
  class="flow-modal"
  aria-labelledby="modal-title"
  aria-modal="true"
  onclose={handleDialogClose}
>
  <div class="modal-inner">

    <!-- Progress bar + close -->
    <div class="modal-top">
      <div class="modal-progress" role="progressbar" aria-valuenow={modalStep + 1} aria-valuemin={1} aria-valuemax={modalSteps.length}>
        <div
          class="modal-progress__fill"
          style="width: {((modalStep + 1) / modalSteps.length * 100).toFixed(1)}%"
        ></div>
      </div>
      <button class="modal-close" onclick={closeModal} aria-label="Close walkthrough">✕</button>
    </div>

    <!-- Step content (keyed so it re-mounts and re-animates on step change) -->
    {#key modalStep}
      <div class="modal-step modal-step--{modalSteps[modalStep].variant}" aria-live="polite">
        <div class="modal-step__emoji" aria-hidden="true">
          {#if STEP_ICONS[modalSteps[modalStep].icon]}
            {@const Icon = STEP_ICONS[modalSteps[modalStep].icon]}
            <Icon size={28} strokeWidth={2} />
          {/if}
        </div>
        <p class="modal-step__counter" aria-label={`Step ${modalStep + 1} of ${modalSteps.length}`}>
          {String(modalStep + 1).padStart(2, '0')} / {String(modalSteps.length).padStart(2, '0')}
        </p>
        <h2 class="modal-step__title" id="modal-title">{modalSteps[modalStep].title}</h2>
        <p class="modal-step__body">{modalSteps[modalStep].body}</p>
        {#if modalSteps[modalStep].items}
          <ul class="modal-step__list">
            {#each modalSteps[modalStep].items as item}
              <li>{item}</li>
            {/each}
          </ul>
        {/if}
        {#if modalSteps[modalStep].stats}
          <div class="modal-step__stats">
            {#each modalSteps[modalStep].stats as stat}
              <div
                class="modal-stat"
                class:modal-stat--bad={stat.bad}
                class:modal-stat--good={stat.good}
              >
                <span class="modal-stat__label">{stat.label}</span>
                <span class="modal-stat__value">{stat.value}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/key}

    <!-- Step navigation -->
    <div class="modal-nav">
      <button
        class="modal-nav__btn"
        onclick={() => goStep(modalStep - 1, true)}
        disabled={modalStep === 0}
        aria-label="Previous step"
      >← Back</button>

      <div class="modal-dots" aria-label="Walkthrough steps">
        {#each modalSteps as _, i}
          <button
            class="modal-dot"
            class:modal-dot--active={i === modalStep}
            onclick={() => goStep(i, true)}
            aria-pressed={i === modalStep}
            aria-label={`Go to step ${i + 1}`}
          ></button>
        {/each}
      </div>

      {#if modalStep < modalSteps.length - 1}
        <button
          class="modal-nav__btn modal-nav__btn--next"
          onclick={() => goStep(modalStep + 1, true)}
          aria-label="Next step"
        >Next →</button>
      {:else}
        <button
          class="modal-nav__btn modal-nav__btn--done"
          onclick={closeModal}
        >Close ✓</button>
      {/if}
    </div>

  </div>
</dialog>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }

  .before-after {
    padding: 80px 0;
    border-top: 1px solid var(--border);
  }

  .section-header {
    text-align: left;
    margin-bottom: 56px;
  }

  .section-header .section-desc {
    max-width: 640px;
  }

  /* ── How blocking works ───────────────────────────────────────────────────── */

  .how-blocking {
    margin-bottom: 56px;
    padding: 40px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 20px;
  }

  .hb-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  .hb-header h3 {
    font-size: clamp(1.25rem, 2.5vw, 1.6rem);
    font-weight: 800;
    color: var(--text-1);
    margin: 6px 0 10px;
    letter-spacing: -0.03em;
  }

  .hb-intro {
    font-size: 0.95rem;
    color: var(--text-2);
    max-width: 540px;
    line-height: 1.6;
    margin: 0;
  }

  .walkthrough-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 12px 22px;
    background: var(--cyan);
    color: var(--bg-base);
    font-weight: 800;
    font-size: 0.9rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: transform 0.18s, opacity 0.18s;
    white-space: nowrap;
    align-self: center;
  }
  .walkthrough-btn:hover { transform: translateY(-1px); opacity: 0.9; }
  .walkthrough-btn:active { transform: none; }

  /* ── Flow comparison grid ─────────────────────────────────────────────────── */

  .flow-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: start;
  }

  @media (max-width: 720px) {
    .flow-comparison { grid-template-columns: 1fr; }
    .flow-vs { display: none; }
  }

  /* ── Flow column header ───────────────────────────────────────────────────── */

  .flow-col-header {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }

  .flow-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .flow-pill--bad  { background: var(--color-error-dim); color: var(--color-error); border: 1px solid var(--color-error-border); }
  .flow-pill--good { background: var(--cyan-dim); color: var(--cyan); border: 1px solid color-mix(in srgb, var(--cyan) 25%, transparent); }

  /* ── Flow step card ───────────────────────────────────────────────────────── */

  .flow-step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg-elevated);
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.4s var(--ease-out, cubic-bezier(0.16,1,0.3,1)),
                transform 0.4s var(--ease-out, cubic-bezier(0.16,1,0.3,1));
    transition-delay: calc(var(--step-i, 0) * 80ms + 100ms);
  }

  .flow-comparison--visible .flow-step {
    opacity: 1;
    transform: none;
  }

  .flow-step--warn    { border-color: var(--color-warning-border); background: var(--color-warning-dim); }
  .flow-step--bad     { border-color: var(--color-error-border); background: var(--color-error-dim); }
  .flow-step--shield  { border-color: color-mix(in srgb, var(--cyan) 35%, transparent); background: var(--cyan-dim); }
  .flow-step--blocked { border-color: color-mix(in srgb, var(--cyan) 20%, transparent); background: color-mix(in srgb, var(--cyan) 8%, transparent); }
  .flow-step--good    { border-color: var(--color-success-border); background: var(--color-success-dim); }

  .flow-step__icon {
    display: inline-flex;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .flow-step__text {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .flow-step__title {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-1);
    line-height: 1.25;
  }

  .flow-step__desc {
    font-size: 0.8rem;
    color: var(--text-2);
    line-height: 1.5;
  }

  /* ── Flow arrow connector ─────────────────────────────────────────────────── */

  .flow-arrow {
    display: flex;
    justify-content: center;
    color: var(--text-3);
    padding: 4px 0;
    opacity: 0;
    transition: opacity 0.3s;
    transition-delay: calc(var(--step-i, 0) * 80ms + 200ms);
  }

  .flow-comparison--visible .flow-arrow { opacity: 1; }

  /* ── VS divider ───────────────────────────────────────────────────────────── */

  .flow-vs {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--text-3);
    text-transform: uppercase;
    padding-top: 56px;
    opacity: 0.5;
  }

  /* ── Shield icon pulse (only used in flow-step--shield) ──────────────────── */

  .flow-step--shield .flow-step__icon {
    animation: shield-pulse 2s ease-in-out infinite;
  }

  @keyframes shield-pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.12); }
  }

  /* ── Chart intro + legend ─────────────────────────────────────────────────── */

  .chart-intro {
    margin-bottom: 28px;
    padding: 24px 28px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 14px;
  }

  .chart-intro__text {
    font-size: 0.9rem;
    color: var(--text-2);
    margin: 0 0 16px;
    line-height: 1.6;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .legend-swatch {
    flex-shrink: 0;
    width: 14px;
    height: 10px;
    border-radius: 2px;
  }

  .legend-swatch--content { background: rgba(148,163,184,0.5); }
  .legend-swatch--tracker { background: rgba(239,68,68,0.5); }
  .legend-swatch--ad      { background: rgba(251,146,60,0.6); }
  .legend-swatch--malware { background: rgba(220,38,38,0.65); }

  .legend-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-2);
    white-space: nowrap;
  }

  .legend-desc {
    font-size: 11px;
    color: var(--text-3);
    white-space: nowrap;
  }

  /* ── Two-panel layout ───────────────────────────────────────────────────── */
  .panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 800px) {
    .panels { grid-template-columns: 1fr; }
  }

  .panel {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    overflow: hidden;
  }

  .panel--good {
    border-color: rgba(0, 212, 255, 0.2);
  }

  /* ── Panel header ── */
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .panel-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-2);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .check-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(0, 212, 255, 0.15);
    border: 1px solid rgba(0, 212, 255, 0.3);
    color: var(--cyan);
    font-size: 10px;
    font-weight: 800;
  }

  .load-time {
    font-size: 1.4rem;
    font-weight: 800;
    font-family: var(--font-mono);
    letter-spacing: -0.03em;
  }

  .bad-time  { color: var(--color-error); }
  .good-time { color: var(--cyan); }

  /* ── Waterfall bars ── */
  .waterfall {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 16px;
  }

  .bar-name {
    flex-shrink: 0;
    width: 130px;
    font-size: 10px;
    font-family: var(--font-mono);
    color: var(--text-3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bar-name--blocked {
    text-decoration: line-through;
    opacity: 0.45;
  }

  .bar-track {
    flex: 1;
    height: 10px;
    border-radius: 3px;
    background: var(--bg-elevated);
    overflow: hidden;
    position: relative;
  }

  .bar {
    height: 100%;
    border-radius: 3px;
    width: 0;
    transition: width 0.55s var(--ease-out, cubic-bezier(0.16,1,0.3,1));
    transition-delay: var(--delay, 0ms);
    position: relative;
  }

  .bar--visible { width: var(--w); }

  .bar--content { background: rgba(148, 163, 184, 0.5); }
  .bar--tracker { background: rgba(239, 68,  68,  0.5); }
  .bar--ad      { background: rgba(251, 146, 60,  0.6); }
  .bar--malware { background: rgba(220, 38,  38,  0.65); }

  .bar--clean {
    background: linear-gradient(90deg, rgba(0,212,255,0.5), rgba(0,212,255,0.3));
  }

  .bar--ghost {
    background: var(--bg-elevated);
    border: 1px solid rgba(148, 163, 184, 0.12);
    display: flex;
    align-items: center;
    padding-left: 4px;
    max-width: var(--w);
    opacity: 0.4;
  }

  .block-icon {
    font-size: 8px;
    line-height: 1;
  }

  /* ── Panel footer ── */
  .panel-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
    font-size: 11px;
    color: var(--text-3);
    padding-top: 16px;
    border-top: 1px solid var(--border);
    align-items: center;
  }

  .sep { opacity: 0.4; }

  .muted { opacity: 0.7; }

  .good-stat { color: var(--cyan); font-weight: 600; }

  /* ── Callout quote ── */
  .callout {
    margin-top: 40px;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 1rem;
    color: var(--text-2);
    line-height: 1.65;
    font-style: italic;
    border-top: 1px solid var(--border);
    padding-top: 32px;
  }

  /* ── Modal dialog ─────────────────────────────────────────────────────────── */

  :global(.flow-modal::backdrop) {
    background: rgba(7, 11, 20, 0.8);
    backdrop-filter: blur(4px);
  }

  .flow-modal {
    position: fixed;
    inset: 0;
    margin: auto;
    width: min(540px, calc(100vw - 32px));
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    background: var(--bg-surface);
    border: 1px solid var(--border-2, var(--border));
    border-radius: 20px;
    padding: 0;
    color: var(--text-1);
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.06);
  }

  .modal-inner {
    display: flex;
    flex-direction: column;
    padding: 28px 28px 24px;
    min-height: 400px;
  }

  /* Progress bar */
  .modal-top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .modal-progress {
    flex: 1;
    height: 3px;
    background: var(--bg-elevated);
    border-radius: 2px;
    overflow: hidden;
  }

  .modal-progress__fill {
    height: 100%;
    background: var(--cyan);
    border-radius: 2px;
    transition: width 0.4s var(--ease-out, cubic-bezier(0.16,1,0.3,1));
  }

  .modal-close {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-3);
    font-size: 12px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .modal-close:hover { background: var(--bg-elevated); color: var(--text-1); }

  /* Step content */
  .modal-step {
    flex: 1;
    animation: step-in 0.35s var(--ease-out, cubic-bezier(0.16,1,0.3,1)) both;
  }

  @keyframes step-in {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: none; }
  }

  .modal-step__emoji {
    display: inline-flex;
    margin-bottom: 10px;
  }

  /* Pulse shield in modal */
  .modal-step--shield .modal-step__emoji {
    display: inline-block;
    animation: shield-pulse 2s ease-in-out infinite;
  }

  .modal-step__counter {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-3);
    letter-spacing: 0.08em;
    margin: 0 0 8px;
  }

  .modal-step__title {
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 12px;
    color: var(--text-1);
  }

  .modal-step--bad    .modal-step__title { color: var(--color-error); }
  .modal-step--shield .modal-step__title { color: var(--cyan); }
  .modal-step--blocked .modal-step__title { color: var(--cyan); }
  .modal-step--result .modal-step__title { color: var(--color-success); }

  .modal-step__body {
    font-size: 0.92rem;
    line-height: 1.65;
    color: var(--text-2);
    margin: 0 0 14px;
  }

  .modal-step__list {
    list-style: none;
    padding: 0;
    margin: 0 0 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .modal-step__list li {
    font-size: 0.85rem;
    font-family: var(--font-mono);
    color: var(--text-2);
    background: var(--bg-elevated);
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid var(--border);
  }

  .modal-step--blocked .modal-step__list li {
    color: var(--text-3);
    text-decoration: line-through;
    opacity: 0.7;
  }

  /* Stats comparison */
  .modal-step__stats {
    display: flex;
    gap: 12px;
    margin-top: 4px;
  }

  .modal-stat {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg-elevated);
    text-align: center;
  }

  .modal-stat--bad  { border-color: var(--color-error-border); background: var(--color-error-dim); }
  .modal-stat--good { border-color: color-mix(in srgb, var(--cyan) 30%, transparent); background: var(--cyan-dim); }

  .modal-stat__label {
    display: block;
    font-size: 11px;
    color: var(--text-3);
    margin-bottom: 4px;
  }

  .modal-stat__value {
    display: block;
    font-size: 1.6rem;
    font-weight: 800;
    font-family: var(--font-mono);
    letter-spacing: -0.04em;
  }

  .modal-stat--bad  .modal-stat__value { color: var(--color-error); }
  .modal-stat--good .modal-stat__value { color: var(--cyan); }

  /* Navigation */
  .modal-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 20px;
    margin-top: auto;
    border-top: 1px solid var(--border);
  }

  .modal-nav__btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--bg-elevated);
    color: var(--text-2);
    transition: background 0.15s, color 0.15s, transform 0.15s;
    min-width: 84px;
  }
  .modal-nav__btn:hover:not(:disabled) { background: var(--bg-surface); color: var(--text-1); transform: translateY(-1px); }
  .modal-nav__btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .modal-nav__btn--next {
    background: var(--cyan);
    color: var(--bg-base);
    border-color: transparent;
  }
  .modal-nav__btn--next:hover { opacity: 0.9; }

  .modal-nav__btn--done {
    background: var(--color-success);
    color: var(--bg-base);
    border-color: transparent;
  }
  .modal-nav__btn--done:hover { opacity: 0.9; }

  .modal-dots {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .modal-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: none;
    background: var(--bg-elevated);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, transform 0.2s;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  .modal-dot:hover    { background: var(--text-3); }
  .modal-dot--active  { background: var(--cyan); transform: scale(1.3); }
  .modal-dot:focus-visible { outline-color: var(--cyan); }

  /* ── Reduced motion ───────────────────────────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    .flow-step,
    .flow-arrow,
    .modal-step         { transition: none; animation: none; }
    .bar                { transition: none; }
    .modal-progress__fill { transition: none; }
    .flow-step--shield .flow-step__icon,
    .modal-step--shield .modal-step__emoji { animation: none; }
  }
</style>
