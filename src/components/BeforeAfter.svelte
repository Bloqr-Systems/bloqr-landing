<!-- BeforeAfter: how-it-works journey diagrams + animated waterfall chart -->
<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(true);

  // ── Mermaid diagram definitions ────────────────────────────────────────────
  // Written in plain language — no technical terms.
  // "Without" shows every lookup going through unchecked.
  // "With" shows Bloqr intercepting known bad actors before the device ever asks.

  const diagramWithout = `flowchart TD
    A["🖥️ You open a webpage"]:::node --> B["Your device sends a lookup\\nfor every item the page needs\\n— no filter, no questions asked"]:::node
    B --> C["📄 Your article loads"]:::good
    B --> D["🕵️ A hidden tracker also loads\\nit quietly logs what you read"]:::bad
    B --> E["📢 An ad network loads too\\nbidding slows your page down"]:::warn
    B --> F["⚠️ A suspicious script sneaks in\\ncould record passwords or mine crypto"]:::danger
    classDef node  fill:#1e2738,stroke:#334155,color:#e2e8f0
    classDef good  fill:#14532d,stroke:#22c55e,color:#dcfce7
    classDef bad   fill:#7f1d1d,stroke:#ef4444,color:#fee2e2
    classDef warn  fill:#7c2d12,stroke:#f97316,color:#ffedd5
    classDef danger fill:#7f1d1d,stroke:#dc2626,color:#fee2e2`;

  const diagramWith = `flowchart TD
    A["🖥️ You open a webpage"]:::node --> B["🛡️ Bloqr checks every address\\nagainst a list of known bad actors\\n— before your device even asks"]:::bloqr
    B -- "Known troublemaker\\n🚫 tracker · ad · threat" --> C["Blocked instantly\\nYour device never waits\\nfor something it shouldn't load"]:::blocked
    B -- "Trusted address\\n✅ real content" --> D["Lookup goes through\\nnormally"]:::node
    D --> E["📄 Your article loads\\nclean and fast — nothing extra"]:::good
    classDef node    fill:#1e2738,stroke:#334155,color:#e2e8f0
    classDef bloqr   fill:#7c2d00,stroke:#ff5500,color:#fff7ed
    classDef blocked fill:#0c2a33,stroke:#00d4ff,color:#ecfeff
    classDef good    fill:#14532d,stroke:#22c55e,color:#dcfce7`;

  onMount(() => {
    // Reset so waterfall animation plays on mount
    visible = false;
    const t = setTimeout(() => { visible = true; }, 120);

    // Load Mermaid (bundled) and render the diagrams (progressive enhancement)
    (async () => {
      try {
        const mod = await import('mermaid');
        // Resolve design tokens at runtime so the diagram palette adapts to
        // the active colour theme (dark / light / OS preference).
        const style = getComputedStyle(document.documentElement);
        const v = (name: string) => style.getPropertyValue(name).trim();
        mod.default.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            background:          v('--bg-base'),
            primaryColor:        v('--bg-elevated'),
            primaryTextColor:    v('--text-1'),
            primaryBorderColor:  v('--border-2'),
            lineColor:           v('--text-3'),
            secondaryColor:      v('--bg-surface'),
            tertiaryColor:       v('--bg-base'),
            titleColor:          v('--text-1'),
            edgeLabelBackground: v('--bg-elevated'),
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '13px',
          },
        });
        await mod.default.run({ querySelector: '.mermaid-diagram' });
      } catch {
        // Diagrams are supplementary — degrade silently
      }
    })();

    return () => clearTimeout(t);
  });

  // ── Waterfall bar data ─────────────────────────────────────────────────────
  // type = 'content' | 'tracker' | 'ad' | 'malware'
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

  const legend = [
    { type: 'content', label: 'Real content',          desc: 'Your article, images, fonts — the stuff you actually came for.' },
    { type: 'tracker', label: 'Tracker',                desc: 'Scripts that log your behaviour across sites. Bloqr blocks these.' },
    { type: 'ad',      label: 'Ad network',             desc: 'Real-time bidding scripts — slow to load, and watching you.' },
    { type: 'malware', label: 'Suspicious / malicious', desc: 'Known bad actors: cryptominers, beacons, credential harvesters.' },
  ] as const;
</script>

<section class="before-after" id="before-after" aria-labelledby="ba-title">
  <div class="container">

    <!-- ── Section header ── -->
    <div class="section-header">
      <p class="section-label">Performance</p>
      <h2 class="section-title" id="ba-title">Privacy and speed aren't a tradeoff.</h2>
      <p class="section-desc">
        When Bloqr blocks a domain, your browser never waits for it.
        Every tracker that doesn't load is time back in your life.
      </p>
    </div>

    <!-- ── How blocking actually works ── -->
    <div class="how-it-works" aria-labelledby="hiw-title">
      <div class="hiw-header">
        <h3 class="hiw-title" id="hiw-title">How blocking actually works</h3>
        <p class="hiw-desc">
          Every time you open a webpage, your device sends out a small lookup — like asking
          directory assistance for a phone number — for every item the page needs to load.
          Without a filter, <em>all</em> of those requests go through: the article you wanted,
          but also trackers, ad scripts, and occasionally something worse.
          Bloqr sits at that moment of asking, checks each name against a continuously updated
          list of known bad actors, and quietly drops the ones that shouldn't be there —
          before your device ever sends the request.
        </p>
      </div>

      <div class="diagrams-grid" role="img" aria-label="Side-by-side journey diagrams: without Bloqr all requests go through unchecked; with Bloqr known bad actors are blocked before the lookup is sent.">
        <!-- Without Bloqr diagram -->
        <div class="diagram-panel diagram-panel--bad">
          <div class="diagram-panel-header">
            <span class="diagram-panel-label">Without Bloqr</span>
            <span class="diagram-panel-tag bad-tag">Unfiltered</span>
          </div>
          <pre class="mermaid-diagram">{diagramWithout}</pre>
          <p class="diagram-caption">
            Your device loads everything the page asks for — including scripts
            that track you, slow you down, or worse.
          </p>
        </div>

        <!-- With Bloqr diagram -->
        <div class="diagram-panel diagram-panel--good">
          <div class="diagram-panel-header">
            <span class="diagram-panel-label">
              With Bloqr
              <span class="check-badge" aria-hidden="true">✓</span>
            </span>
            <span class="diagram-panel-tag good-tag">Filtered</span>
          </div>
          <pre class="mermaid-diagram">{diagramWith}</pre>
          <p class="diagram-caption">
            Bloqr intercepts every lookup. Known bad actors are dropped instantly —
            your device never waits for them, so your page loads faster.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Waterfall intro + legend ── -->
    <div class="chart-intro">
      <h3 class="chart-intro-title">See it in a real page load</h3>
      <p class="chart-intro-desc">
        The chart below replays what happens when you open a typical news article.
        Each bar is one network request — the longer the bar, the longer your
        browser waited. On the left, everything loads. On the right, Bloqr has
        already dropped 12 of the 18 requests before they were sent.
      </p>
      <div class="legend" role="list" aria-label="Bar colour legend">
        {#each legend as item}
          <div class="legend-item" role="listitem">
            <span class="legend-swatch legend-swatch--{item.type}" aria-hidden="true"></span>
            <span class="legend-label">{item.label}</span>
            <span class="legend-desc">{item.desc}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- ── Waterfall panels ── -->
    <p id="ba-panels-desc" class="sr-only">
      Side-by-side page load comparison: without Bloqr shows 18 requests including 5 trackers,
      4 ad scripts, and 3 suspicious domains; with Bloqr shows only 6 legitimate content
      requests with 12 domains blocked.
    </p>
    <div class="panels" aria-describedby="ba-panels-desc">

      <!-- Without Bloqr panel -->
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

      <!-- With Bloqr panel -->
      <div class="panel panel--good">
        <div class="panel-header">
          <span class="panel-label">
            With Bloqr
            <span class="check-badge" aria-label="Protected">✓</span>
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
                    <span class="block-icon">🚫</span>
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

<style>
  /* ── Screen-reader utility ── */
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }

  /* ── Section shell ── */
  .before-after {
    padding: 80px 0;
    border-top: 1px solid var(--border);
  }

  .section-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .section-header .section-desc {
    max-width: 520px;
    margin: 0 auto;
  }

  /* ── How It Works subsection ── */
  .how-it-works {
    margin-bottom: 64px;
  }

  .hiw-header {
    text-align: center;
    margin-bottom: 36px;
  }

  .hiw-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text-1);
  }

  .hiw-desc {
    max-width: 640px;
    margin: 0 auto;
    font-size: 0.9rem;
    color: var(--text-2);
    line-height: 1.7;
  }

  /* ── Diagram grid ── */
  .diagrams-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 860px) {
    .diagrams-grid { grid-template-columns: 1fr; }
  }

  .diagram-panel {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .diagram-panel--good {
    border-color: var(--cyan-border);
  }

  .diagram-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .diagram-panel-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-2);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .diagram-panel-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 999px;
  }

  .bad-tag {
    background: var(--color-error-dim);
    color: var(--color-error);
    border: 1px solid var(--color-error-border);
  }

  .good-tag {
    background: var(--cyan-dim);
    color: var(--cyan);
    border: 1px solid var(--cyan-border);
  }

  /* Pre-render state: mermaid source is readable plain text before JS runs */
  .mermaid-diagram {
    white-space: pre-wrap;
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-3);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    margin: 0;
    overflow-x: auto;
    flex: 1;
  }

  /* Once Mermaid has rendered the SVG it replaces the pre's text */
  .mermaid-diagram svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .diagram-caption {
    font-size: 0.78rem;
    color: var(--text-3);
    line-height: 1.55;
    margin: 0;
  }

  /* ── Chart intro + legend ── */
  .chart-intro {
    margin-bottom: 32px;
    padding: 28px 32px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
  }

  .chart-intro-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text-1);
  }

  .chart-intro-desc {
    font-size: 0.85rem;
    color: var(--text-2);
    line-height: 1.65;
    max-width: 680px;
    margin-bottom: 24px;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
  }

  .legend-item {
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-size: 12px;
  }

  .legend-swatch {
    flex-shrink: 0;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    position: relative;
    top: 1px;
  }

  .legend-swatch--content { background: color-mix(in srgb, var(--text-2) 50%, transparent); }
  .legend-swatch--tracker { background: color-mix(in srgb, var(--color-error) 50%, transparent); }
  .legend-swatch--ad      { background: color-mix(in srgb, var(--color-warning) 60%, transparent); }
  .legend-swatch--malware { background: color-mix(in srgb, var(--color-error) 65%, transparent); }

  .legend-label {
    font-weight: 600;
    color: var(--text-2);
    white-space: nowrap;
  }

  .legend-desc {
    color: var(--text-3);
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    .legend-desc { display: none; }
  }

  /* ── Two-panel waterfall layout ── */
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

  .panel--good { border-color: var(--cyan-border); }

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
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--cyan-dim);
    border: 1px solid var(--cyan-border);
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

  /* ── Closing callout ── */
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

  /* ── Chart intro responsive ── */
  @media (max-width: 600px) {
    .chart-intro { padding: 20px; }
  }
</style>
