<script lang="ts">
  import { LINKS } from '../config';

  type Theme = 'dark' | 'light';
  type StoredTheme = Theme | null;

  const THEME_STORAGE_KEY = 'theme';
  const THEME_MEDIA_QUERY = '(prefers-color-scheme: light)';
  const SCROLL_THRESHOLD = 10;

  let scrolled    = $state(false);
  let menuOpen    = $state(false);
  let currentPath = $state('/');
  let theme       = $state<Theme>('dark');

  /** Bound to the hamburger <button> so focus can return there on menu close. */
  let hamburgerEl = $state<HTMLButtonElement | null>(null);
  /** Bound to the mobile-menu <div> for focus-trap queries. */
  let menuEl      = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (typeof window === 'undefined') return;

    currentPath = window.location.pathname;
    scrolled = window.scrollY > SCROLL_THRESHOLD;
    syncTheme();

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
    let scrollRafId: number | null = null;

    const updateScrolledState = (): void => {
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;
      if (nextScrolled !== scrolled) scrolled = nextScrolled;
    };
    const handleScroll = (): void => {
      if (scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = null;
        updateScrolledState();
      });
    };
    const handlePageLoad = (): void => {
      currentPath = window.location.pathname;
      updateScrolledState(); // re-sync scroll state — View Transitions don't fire a scroll event
      menuOpen    = false;                 // always close mobile menu after navigation
      syncTheme();
    };
    const handleThemeChange = (): void => {
      if (readStoredTheme() === null) syncTheme();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('astro:page-load', handlePageLoad);
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      if (scrollRafId !== null) window.cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('astro:page-load', handlePageLoad);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  });

  // Focus trap: while the mobile menu is open, keep Tab focus inside it.
  // On close (by any means), return focus to the hamburger button.
  $effect(() => {
    if (!menuOpen || typeof document === 'undefined') return;

    const handleKeydown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || !menuEl) return;

      const focusable = Array.from(
        menuEl.querySelectorAll<HTMLElement>('a, button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    // Move focus to first focusable item in the menu
    queueMicrotask((): void => {
      menuEl?.querySelector<HTMLElement>('a, button')?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      // Return focus to the trigger button when the menu closes by any means
      hamburgerEl?.focus();
    };
  });

  function readStoredTheme(): StoredTheme {
    if (typeof window === 'undefined') return null;

    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
    } catch {
      return null;
    }
  }

  function getSystemTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia(THEME_MEDIA_QUERY).matches ? 'light' : 'dark';
  }

  function syncTheme(): void {
    const storedTheme = readStoredTheme();
    theme = storedTheme ?? getSystemTheme();

    if (typeof document === 'undefined') return;

    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function persistTheme(nextTheme: Theme): void {
    theme = nextTheme;

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
    }

    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}
  }

  function toggleTheme(): void {
    persistTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function closeMenu(): void { menuOpen = false; }
  function toggleMenu(): void { menuOpen = !menuOpen; }

  function isActive(href: string): boolean {
    if (!href || href.startsWith('/#')) return false;
    return currentPath === href || currentPath.startsWith(href + '/');
  }
</script>

<nav class:scrolled class:menu-open={menuOpen} aria-label="Main navigation">
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
  <div class="inner container">

    <!-- Logo -->
    <a href="/" class="logo" aria-label="Bloqr AI — home" onclick={closeMenu}>
      <div class="logo-icon" aria-hidden="true">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
      </div>
      <div class="logo-text">
        <span class="logo-name">BLOQR<span class="logo-ai">AI</span></span>
      </div>
    </a>

    <!-- Desktop links -->
    <ul class="nav-links" role="list">
      <li><a href="/#why">Why</a></li>
      <li><a href="/#how">How</a></li>
      <li><a href="/#audiences">Who</a></li>
      <li><a href="/#features">Features</a></li>
      <li><a href={LINKS.pricing} class:active={isActive(LINKS.pricing)} aria-current={isActive(LINKS.pricing) ? 'page' : undefined}>Pricing</a></li>
      <li><a href={LINKS.changelog} class:active={isActive(LINKS.changelog)} aria-current={isActive(LINKS.changelog) ? 'page' : undefined}>Changelog</a></li>
      <li><a href={LINKS.about} class:active={isActive(LINKS.about)} aria-current={isActive(LINKS.about) ? 'page' : undefined}>About</a></li>
      <li><a href="/#waitlist" class="nav-highlight">Early Access</a></li>
    </ul>

    <!-- Desktop CTA -->
    <div class="nav-cta">
      <a href={LINKS.vpnMyths} class="nav-myths" class:active={isActive(LINKS.vpnMyths)} aria-current={isActive(LINKS.vpnMyths) ? 'page' : undefined}>VPN Myths</a>
      <a href={LINKS.blog} class="nav-news" class:active={isActive(LINKS.blog)} aria-current={isActive(LINKS.blog) ? 'page' : undefined}>News</a>
      <a href={LINKS.docs} class="btn btn-ghost btn-sm" rel="noopener noreferrer" target="_blank">Docs</a>
      <a href={LINKS.app} class="btn btn-primary btn-sm" rel="noopener noreferrer" target="_blank">
        Launch App <span aria-hidden="true">→</span>
      </a>
    </div>

    <button
      type="button"
      class="theme-toggle theme-toggle--desktop"
      onclick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'light'}
    >
      <span class="theme-toggle__icon" aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      <span class="sr-only">{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>

    <!-- Hamburger button (mobile only) -->
    <button
      bind:this={hamburgerEl}
      class="hamburger"
      onclick={toggleMenu}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
    >
      <span class="ham-bar"></span>
      <span class="ham-bar"></span>
      <span class="ham-bar"></span>
    </button>

  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <button
      type="button"
      class="mobile-backdrop"
      onclick={closeMenu}
      onkeydown={(e) => e.key === 'Escape' && closeMenu()}
      aria-label="Close navigation menu"
      tabindex="-1"
    ></button>
    <div bind:this={menuEl} id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <ul class="mobile-links" role="list">
        <li><a href="/#why"           onclick={closeMenu}>Why Bloqr AI</a></li>
        <li><a href="/#how"           onclick={closeMenu}>How it works</a></li>
        <li><a href="/#audiences"     onclick={closeMenu}>Who it's for</a></li>
        <li><a href="/#features"      onclick={closeMenu}>Features</a></li>
        <li><a href={LINKS.pricing} onclick={closeMenu} class:active={isActive(LINKS.pricing)} aria-current={isActive(LINKS.pricing) ? 'page' : undefined}>Pricing</a></li>
        <li><a href={LINKS.vpnMyths}  onclick={closeMenu} class:active={isActive(LINKS.vpnMyths)} aria-current={isActive(LINKS.vpnMyths) ? 'page' : undefined}>VPN Myths</a></li>
        <li><a href={LINKS.blog}      onclick={closeMenu} class:active={isActive(LINKS.blog)} aria-current={isActive(LINKS.blog) ? 'page' : undefined}>News</a></li>
        <li><a href={LINKS.changelog} onclick={closeMenu} class:active={isActive(LINKS.changelog)} aria-current={isActive(LINKS.changelog) ? 'page' : undefined}>Changelog</a></li>
        <li><a href={LINKS.about}     onclick={closeMenu} class:active={isActive(LINKS.about)} aria-current={isActive(LINKS.about) ? 'page' : undefined}>About</a></li>
        <li class="mobile-divider" aria-hidden="true"></li>
        <li><a href="/#waitlist" class="mobile-highlight" onclick={closeMenu}>Join Early Access →</a></li>
      </ul>
      <div class="mobile-footer">
        <button
          type="button"
          class="theme-toggle theme-toggle--mobile"
          onclick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={theme === 'light'}
        >
          <span class="theme-toggle__icon" aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
        <a href={LINKS.docs} class="btn btn-outline btn-sm" rel="noopener noreferrer" target="_blank" onclick={closeMenu}>Docs</a>
        <a href={LINKS.app} class="btn btn-primary btn-sm" rel="noopener noreferrer" target="_blank" onclick={closeMenu}>
          Launch App →
        </a>
      </div>
    </div>
  {/if}
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid transparent;
    transition: border-color 200ms, background 200ms, backdrop-filter 200ms;
  }

  .skip-to-content {
    position: absolute;
    top: -100%;
    left: 16px;
    background: var(--orange);
    color: #fff;
    padding: 8px 16px;
    border-radius: 0 0 8px 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    z-index: 9999;
    transition: top 150ms;
  }

  .skip-to-content:focus {
    top: 0;
  }

  nav.scrolled,
  nav.menu-open {
    border-bottom-color: var(--border);
    background: color-mix(in srgb, var(--bg-base) 95%, transparent);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  /* ── Logo ── */
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-icon {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .bar {
    display: block;
    height: 3px;
    border-radius: 2px;
    background: var(--text-1);
    transition: width 200ms var(--ease-out);
  }

  .bar-1 { width: 20px; }
  .bar-2 { width: 15px; background: var(--cyan); opacity: 0.85; }
  .bar-3 { width: 8px; background: var(--orange); }

  .logo:hover .bar-2 { width: 18px; }
  .logo:hover .bar-3 { width: 12px; }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .logo-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--text-1);
  }

  .logo-ai {
    color: var(--cyan);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.12em;
    margin-left: 4px;
    vertical-align: super;
    opacity: 0.9;
  }

  /* ── Desktop nav links ── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
  }

  .nav-links a {
    font-size: 14px;
    color: var(--text-2);
    text-decoration: none;
    transition: color 150ms;
    white-space: nowrap;
  }

  .nav-links a:hover { color: var(--text-1); }
  .nav-highlight { color: var(--orange) !important; }

  /* ── Active nav link ── */
  .nav-links a.active {
    color: var(--cyan);
    font-weight: 600;
    position: relative;
  }

  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--cyan);
    border-radius: 1px;
    opacity: 0.5;
  }

  .mobile-links a.active {
    color: var(--cyan);
    font-weight: 600;
  }

  .nav-cta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition: color 150ms, border-color 150ms, background 150ms;
    flex-shrink: 0;
  }

  .theme-toggle--desktop {
    margin-left: 4px;
  }

  .theme-toggle:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    background: var(--bg-surface);
  }

  .theme-toggle__icon {
    font-size: 18px;
    line-height: 1;
  }

  /* ── Hamburger button ── */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    padding: 8px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .ham-bar {
    display: block;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: var(--text-2);
    transition: transform 200ms, opacity 200ms;
  }

  /* ── Mobile menu ── */
  .mobile-backdrop {
    position: fixed;
    inset: 64px 0 0 0;
    background: color-mix(in srgb, var(--bg-base) 60%, transparent);
    backdrop-filter: blur(2px);
    z-index: 98;
    /* button reset */
    border: none;
    padding: 0;
    cursor: default;
    display: block;
    width: 100%;
  }

  .mobile-menu {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: color-mix(in srgb, var(--bg-base) 98%, transparent);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px 24px;
    z-index: 99;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .mobile-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 20px;
  }

  .mobile-links a {
    display: block;
    padding: 12px 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-2);
    text-decoration: none;
    border-radius: 8px;
    transition: background 150ms, color 150ms;
  }

  .mobile-links a:hover,
  .mobile-links a:active {
    color: var(--text-1);
    background: color-mix(in srgb, var(--text-1) 5%, transparent);
  }

  .mobile-highlight {
    color: var(--orange) !important;
    font-weight: 700 !important;
  }

  .mobile-divider {
    height: 1px;
    background: var(--border);
    margin: 8px 0;
  }

  .mobile-footer {
    display: flex;
    gap: 12px;
  }

  .mobile-footer .btn,
  .mobile-footer .theme-toggle {
    flex: 1;
    justify-content: center;
  }

  /* ── Responsive breakpoint ── */
  @media (max-width: 860px) {
    .nav-links,
    .nav-cta,
    .theme-toggle--desktop { display: none; }
    .hamburger { display: flex; }
  }



  .nav-news,
  .nav-myths {
    font-size: 14px;
    text-decoration: none;
    transition: opacity 150ms;
    white-space: nowrap;
  }
  .nav-news:hover,
  .nav-myths:hover { opacity: 0.75; }

  .nav-news { color: var(--cyan); }
  .nav-myths { color: var(--orange); }

  .nav-news.active { opacity: 0.75; }
  .nav-myths.active { opacity: 0.75; }
</style>
