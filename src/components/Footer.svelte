<script>
  import { LINKS } from '../config';
  import Briefcase from '@lucide/svelte/icons/briefcase';
  import Code from '@lucide/svelte/icons/code';
  import Send from '@lucide/svelte/icons/send';
  import Share from '@lucide/svelte/icons/share';
  import Play from '@lucide/svelte/icons/play';
  import Mail from '@lucide/svelte/icons/mail';
  import Rss from '@lucide/svelte/icons/rss';

  const HYGIENE_TERM   = 'Internet Hygiene';
  const HYGIENE_SUFFIX = ' (n.) — the ongoing practices that keep your digital life clean, private, and safe.';
  const HYGIENE_DEF    = `${HYGIENE_TERM}${HYGIENE_SUFFIX}`;
  const HYGIENE_FULL   = `${HYGIENE_DEF} Think washing your hands, but for everything you do online.`;

  const SOCIAL_LINKS = [
    { name: 'LinkedIn', url: 'https://linkedin.com/company/bloqr-ai', icon: Briefcase },
    { name: 'GitHub', url: 'https://github.com/Bloqr-Systems', icon: Code },
    { name: 'Twitter', url: 'https://twitter.com/bloqr_ai', icon: Send },
    { name: 'Facebook', url: 'https://facebook.com/bloqr.ai', icon: Share },
    { name: 'YouTube', url: 'https://youtube.com/@bloqr-ai', icon: Play },
    { name: 'Email', url: 'mailto:contact@bloqr.dev', icon: Mail },
    { name: 'RSS', url: '/rss.xml', icon: Rss },
  ];
</script>
<!-- Site footer -->

<footer>
  <div class="container inner">
    <span class="copy">
      © 2026 Bloqr <span class="footer-ai">AI</span><span class="footer-tm" aria-hidden="true">&trade;</span>, a trademark of
      <a href={LINKS.bloqrSystems} rel="noopener" target="_blank">Bloqr Systems</a> ·
      Made by <a href={LINKS.author} rel="noopener" target="_blank">Jayson Knight</a>
    </span>
    <p class="hygiene-def">
      <strong
        class="hygiene-term"
        tabindex="0"
        aria-describedby="hygiene-tooltip"
      >{HYGIENE_TERM}</strong>{HYGIENE_SUFFIX}
      <span id="hygiene-tooltip" class="sr-only">{HYGIENE_FULL}</span>
    </p>
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href={LINKS.app}      rel="noopener noreferrer" target="_blank">Join Beta</a></li>
        <li><a href={LINKS.docs}     rel="noopener noreferrer" target="_blank">Docs</a></li>
        <li><a href={LINKS.pricing}>Pricing</a></li>
        <li><a href={LINKS.api}      rel="noopener noreferrer" target="_blank">API</a></li>
        <li><a href={LINKS.vpnMyths}>VPN Myths</a></li>
        <li><a href={LINKS.privacy}>Privacy</a></li>
        <li><a href={LINKS.terms}>Terms</a></li>
        <li><a href={LINKS.github}   rel="noopener noreferrer" target="_blank">GitHub</a></li>
      </ul>
    </nav>
    <nav class="social-links-mobile" aria-label="Social media links">
      <ul>
        {#each SOCIAL_LINKS as link (link.name)}
          <li>
            <a
              href={link.url}
              rel={link.url.startsWith('mailto:') || link.url.startsWith('/') ? '' : 'noopener noreferrer'}
              target={link.url.startsWith('mailto:') || link.url.startsWith('/') ? '' : '_blank'}
              title={link.name}
              aria-label={link.name}
            >
              <svelte:component this={link.icon} size={20} strokeWidth={1.5} />
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    padding: 48px 0;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .hygiene-def {
    font-size: 12px;
    color: var(--text-3);
    font-style: italic;
    margin: 0;
    flex-basis: 100%;
    text-align: center;
    order: 2;
  }

  .hygiene-term {
    font-weight: 600;
    color: var(--orange);
    cursor: help;
    border-bottom: 1px dotted color-mix(in srgb, var(--orange) 40%, transparent);
    font-style: normal;
  }

  .copy {
    font-size: 13px;
    color: var(--text-3);
  }

  .copy a {
    color: var(--text-2);
    text-decoration: none;
    transition: color 150ms;
  }

  .footer-ai {
    color: var(--cyan);
    margin-left: 4px;
  }

  .footer-tm {
    font-size: 9px;
    vertical-align: super;
    margin-left: 1px;
    opacity: 0.8;
  }

  .copy a:hover { color: var(--text-1); }

  ul {
    display: flex;
    gap: 24px;
    list-style: none;
  }

  a {
    font-size: 13px;
    color: var(--text-3);
    text-decoration: none;
    transition: color 150ms;
  }

  a:hover { color: var(--text-2); }

  /* Mobile social links — only visible on mobile viewports */
  .social-links-mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .social-links-mobile {
      display: block;
      flex-basis: 100%;
      order: 3;
      margin-top: 12px;
    }

    .social-links-mobile ul {
      display: flex;
      gap: 16px;
      list-style: none;
      margin: 0;
      padding: 0;
      justify-content: center;
    }

    .social-links-mobile a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      color: var(--orange);
      transition: all 150ms ease-out;
    }

    .social-links-mobile a:hover {
      background: var(--bg-surface);
      border-color: var(--orange);
      color: var(--orange);
    }
  }
</style>
