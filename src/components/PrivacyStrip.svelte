<script lang="ts">
  import { LINKS } from '../config';
</script>

<section class="privacy-strip" aria-labelledby="privacy-strip-heading">
  <div class="container">
    <h2 class="sr-only" id="privacy-strip-heading">Privacy commitments summary</h2>
    <ul class="privacy-points" aria-label="Top privacy commitments">
      <li>🚫 We never see your DNS queries</li>
      <li>🗄️ No logs, no retention, no resale</li>
      <li>📦 Export everything, leave any time</li>
    </ul>
    <a href={LINKS.privacy} class="privacy-link">Read our full privacy commitments →</a>
  </div>
</section>

<style>
  .privacy-strip {
    padding: 56px 0;
    border-top: 1px solid var(--border);
  }

  .privacy-points {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 18px;
  }

  .privacy-points li {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 16px;
    color: var(--text-1);
    font-size: 0.92rem;
    line-height: 1.45;
  }

  .privacy-link {
    color: var(--cyan);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .privacy-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 960px) {
    .privacy-points {
      grid-template-columns: 1fr;
    }
  }
</style>
