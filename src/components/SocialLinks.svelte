<script>
  import Briefcase from '@lucide/svelte/icons/briefcase';
  import Code from '@lucide/svelte/icons/code';
  import Send from '@lucide/svelte/icons/send';
  import Mail from '@lucide/svelte/icons/mail';
  import Rss from '@lucide/svelte/icons/rss';
  import Share from '@lucide/svelte/icons/share';
  import Play from '@lucide/svelte/icons/play';

  const SOCIAL_LINKS = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/bloqr-ai',
      icon: Briefcase,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Bloqr-Systems',
      icon: Code,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/bloqr_ai',
      icon: Send,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/bloqr.ai',
      icon: Share,
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@bloqr-ai',
      icon: Play,
    },
    {
      name: 'Email',
      url: 'mailto:contact@bloqr.dev',
      icon: Mail,
    },
    {
      name: 'RSS Feed',
      url: '/rss.xml',
      icon: Rss,
    },
  ];

  let hoveredIndex = -1;
</script>

<aside class="social-links" aria-label="Social links">
  <nav>
    <ul>
      {#each SOCIAL_LINKS as link, index (link.name)}
        <li>
          <a
            href={link.url}
            rel="noopener noreferrer"
            target={link.url.startsWith('mailto:') || link.url.startsWith('/') ? '' : '_blank'}
            title={link.name}
            aria-label={link.name}
            on:mouseenter={() => (hoveredIndex = index)}
            on:mouseleave={() => (hoveredIndex = -1)}
          >
            <span class="icon-wrapper">
              <svelte:component this={link.icon} size={24} strokeWidth={1.5} />
            </span>
            <span class="tooltip">{link.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  .social-links {
    position: fixed;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    /* Avoid interaction with page content and horizontal dividers */
    pointer-events: auto;
  }

  nav ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    color: var(--orange);
    text-decoration: none;
    transition: all 200ms ease-out;
  }

  a:hover {
    background: var(--bg-surface);
    border-color: var(--orange);
    box-shadow: 0 0 16px rgba(255, 85, 0, 0.2);
    transform: scale(1.08);
  }

  a:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: 3px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .tooltip {
    position: absolute;
    left: 100%;
    margin-left: 12px;
    padding: 6px 12px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-1);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 200ms, transform 200ms;
  }

  a:hover .tooltip {
    opacity: 1;
    transform: translateX(0);
  }

  /* Accessibility: hide tooltips on mobile and respect reduced motion */
  @media (max-width: 768px) {
    .social-links {
      display: none;
    }

    .tooltip {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    a,
    .tooltip {
      transition: none;
    }

    a:hover {
      transform: none;
    }
  }
</style>
