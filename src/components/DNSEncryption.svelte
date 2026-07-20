<script lang="ts">
  import { LINKS } from '../config';
</script>

<section class="dns-encryption" id="dns-encryption" aria-labelledby="dns-heading">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Privacy Foundation</p>
      <h2 class="section-title" id="dns-heading">DNS Encryption: Why Your ISP Shouldn't See What You're Looking For</h2>
      <p class="section-desc">
        DNS is the internet's address book — it translates domain names into IP addresses.
        But by default, it's completely unencrypted. Your ISP can see every domain you visit.
        They sell this data. Encrypted DNS (DoH/DoT) closes this gap.
      </p>
    </div>

    <!-- The Problem -->
    <div class="problem-visual">
      <div class="visual-grid">
        <!-- Unencrypted DNS (The Problem) -->
        <div class="visual-card unencrypted">
          <h3>Unencrypted DNS (The Current Reality)</h3>
          <div class="diagram">
            <div class="diagram-step">
              <div class="entity-box">Your Device</div>
              <div class="arrow-group">
                <div class="arrow-plaintext">DNS Request<br/><span class="plaintext-label">"What's the IP for google.com?"</span></div>
              </div>
              <div class="entity-box">ISP's DNS Server</div>
            </div>

            <div class="diagram-step" style="margin-top: 24px;">
              <div class="problem-highlight">
                <div class="icon">👁️</div>
                <p><strong>ISP can see:</strong> Every domain you query, when you query it, how often you visit sites</p>
              </div>
            </div>

            <div class="diagram-step" style="margin-top: 24px;">
              <div class="problem-highlight danger">
                <div class="icon">💰</div>
                <p><strong>ISP sells this data:</strong> To advertisers, data brokers, and third parties for behavioral targeting</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Encrypted DNS (The Solution) -->
        <div class="visual-card encrypted">
          <h3>Encrypted DNS (DoH/DoT) — The Solution</h3>
          <div class="diagram">
            <div class="diagram-step">
              <div class="entity-box">Your Device</div>
              <div class="arrow-group">
                <div class="arrow-encrypted">Encrypted DNS Request<br/><span class="encrypted-label">🔒 Completely Hidden</span></div>
              </div>
              <div class="entity-box">Trusted DNS Server<br/><span class="server-note">(Cloudflare, Quad9, etc.)</span></div>
            </div>

            <div class="diagram-step" style="margin-top: 24px;">
              <div class="solution-highlight">
                <div class="icon">🔒</div>
                <p><strong>ISP cannot see:</strong> Your DNS queries are encrypted end-to-end</p>
              </div>
            </div>

            <div class="diagram-step" style="margin-top: 24px;">
              <div class="solution-highlight safe">
                <div class="icon">✓</div>
                <p><strong>Protected:</strong> Your browsing privacy is restored, even on open networks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How ISPs Profit -->
    <div class="profit-breakdown">
      <h3>The Data Pipeline: How ISPs Monetize Your DNS Metadata</h3>
      <div class="profit-flow">
        <div class="profit-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>ISP Collects</h4>
            <p>Every DNS query you make is logged with your IP address, timestamp, and domain</p>
          </div>
        </div>
        <div class="profit-arrow">→</div>
        <div class="profit-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Data Broker Aggregates</h4>
            <p>Third-party companies purchase this data in bulk and combine it with other sources</p>
          </div>
        </div>
        <div class="profit-arrow">→</div>
        <div class="profit-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Ad Networks Target You</h4>
            <p>Advertisers buy profiles showing your interests, health concerns, shopping habits</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloqr's Solution -->
    <div class="bloqr-solution">
      <h3>How Bloqr Protects Your DNS Queries</h3>
      <div class="solution-grid">
        <div class="solution-card">
          <div class="solution-icon">🔐</div>
          <h4>All-in-One Package</h4>
          <p>When using Bloqr's all-in-one offering, encrypted DNS is automatically enabled via <strong>Cloudflare's 1.1.1.1</strong> (DoH/DoT). Your queries leave your device encrypted and never expose your browsing patterns.</p>
        </div>

        <div class="solution-card">
          <div class="solution-icon">🔧</div>
          <h4>Bring Your Own Vendor</h4>
          <p>Using your own DNS provider (Pi-hole, NextDNS, AdGuard, Quad9)? If they support encrypted DNS, those mechanisms are automatically used. Bloqr simply manages your filter lists.</p>
        </div>

        <div class="solution-card">
          <div class="solution-icon">🚀</div>
          <h4>End-to-End Protection</h4>
          <p>Bloqr never touches your DNS queries. We compile filter lists and push them to your provider. The encryption happens at your DNS layer — we have no ability to see your traffic.</p>
        </div>
      </div>
    </div>

    <!-- Key Differences Table -->
    <div class="comparison-table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Unencrypted DNS</th>
            <th>Encrypted DNS (DoH/DoT)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ISP can see your queries</td>
            <td><span class="badge-no">❌ Yes</span></td>
            <td><span class="badge-yes">✓ No</span></td>
          </tr>
          <tr>
            <td>Your data is sold to third parties</td>
            <td><span class="badge-no">❌ Yes</span></td>
            <td><span class="badge-yes">✓ No</span></td>
          </tr>
          <tr>
            <td>Public WiFi can intercept queries</td>
            <td><span class="badge-no">❌ Yes</span></td>
            <td><span class="badge-yes">✓ No</span></td>
          </tr>
          <tr>
            <td>Performance impact</td>
            <td><span class="badge-neutral">Baseline</span></td>
            <td><span class="badge-neutral">Minimal (&lt;1ms)</span></td>
          </tr>
          <tr>
            <td>Requires VPN</td>
            <td><span class="badge-no">❌ No, still exposed</span></td>
            <td><span class="badge-yes">✓ Standalone protection</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CTA -->
    <div class="dns-cta">
      <h3>Start Protecting Your DNS Today</h3>
      <p>
        Bloqr comes with encrypted DNS built-in. No configuration needed.
        Your filter lists update automatically, and your privacy is protected at the DNS layer.
      </p>
      <a href={LINKS.signup || '#'} class="btn btn-primary">
        Enable Encrypted DNS →
      </a>
    </div>
  </div>
</section>

<style>
  .dns-encryption {
    padding: 80px 0;
    border-top: 1px solid var(--border);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16px;
    display: block;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 24px;
  }

  .section-desc {
    font-size: 1.05rem;
    color: var(--text-2);
    max-width: 600px;
    line-height: 1.65;
    margin: 0 auto;
  }

  /* Problem Visual */
  .problem-visual {
    margin-bottom: 80px;
  }

  .visual-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .visual-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    position: relative;
  }

  .visual-card.unencrypted {
    border-color: rgba(239, 68, 68, 0.3);
  }

  .visual-card.encrypted {
    border-color: rgba(0, 212, 255, 0.3);
  }

  .visual-card h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 28px;
    color: var(--text-1);
  }

  .diagram {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .diagram-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .entity-box {
    background: var(--bg-elevated);
    border: 1px solid var(--border-2);
    border-radius: 8px;
    padding: 12px 16px;
    font-weight: 600;
    font-size: 0.9rem;
    text-align: center;
    width: 100%;
    max-width: 240px;
  }

  .server-note {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--text-3);
    margin-top: 4px;
  }

  .arrow-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow-plaintext,
  .arrow-encrypted {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    width: 100%;
    max-width: 240px;
  }

  .arrow-plaintext {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .plaintext-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 4px;
    opacity: 0.8;
  }

  .arrow-encrypted {
    background: rgba(0, 212, 255, 0.1);
    color: var(--cyan);
    border: 1px solid rgba(0, 212, 255, 0.3);
  }

  .encrypted-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 4px;
    opacity: 0.8;
  }

  .problem-highlight {
    width: 100%;
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .problem-highlight.danger {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.3);
  }

  .solution-highlight {
    width: 100%;
    background: rgba(0, 212, 255, 0.08);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .solution-highlight.safe {
    background: rgba(76, 175, 80, 0.08);
    border-color: rgba(76, 175, 80, 0.2);
  }

  .icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }

  .problem-highlight p,
  .solution-highlight p {
    font-size: 0.9rem;
    color: var(--text-2);
    line-height: 1.5;
  }

  /* Profit Breakdown */
  .profit-breakdown {
    margin-bottom: 80px;
  }

  .profit-breakdown h3 {
    text-align: center;
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--text-1);
  }

  .profit-flow {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 16px;
    align-items: center;
    margin-bottom: 32px;
  }

  .profit-step {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    position: relative;
  }

  .step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--orange-dim);
    color: var(--orange);
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    font-family: var(--font-mono);
  }

  .step-content h4 {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text-1);
  }

  .step-content p {
    font-size: 0.85rem;
    color: var(--text-2);
    line-height: 1.5;
  }

  .profit-arrow {
    color: var(--text-3);
    font-size: 1.25rem;
    text-align: center;
  }

  /* Bloqr Solution */
  .bloqr-solution {
    margin-bottom: 80px;
  }

  .bloqr-solution h3 {
    text-align: center;
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--text-1);
  }

  .solution-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .solution-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    transition: border-color 250ms, transform 250ms;
  }

  .solution-card:hover {
    border-color: var(--border-2);
    transform: translateY(-2px);
  }

  .solution-icon {
    font-size: 2rem;
    margin-bottom: 16px;
  }

  .solution-card h4 {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text-1);
  }

  .solution-card p {
    font-size: 0.85rem;
    color: var(--text-2);
    line-height: 1.6;
  }

  /* Comparison Table */
  .comparison-table-wrapper {
    margin-bottom: 80px;
    overflow-x: auto;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .comparison-table thead {
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
  }

  .comparison-table th {
    padding: 16px;
    text-align: left;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-1);
    letter-spacing: 0.02em;
  }

  .comparison-table td {
    padding: 14px 16px;
    border-top: 1px solid var(--border);
    font-size: 0.9rem;
    color: var(--text-2);
  }

  .comparison-table tbody tr:hover {
    background: var(--bg-elevated);
  }

  .badge-yes {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(76, 175, 80, 0.1);
    color: #4caf50;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .badge-no {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .badge-neutral {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(148, 163, 184, 0.1);
    color: var(--text-2);
    font-weight: 600;
    font-size: 0.85rem;
  }

  /* CTA Section */
  .dns-cta {
    text-align: center;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 48px;
  }

  .dns-cta h3 {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text-1);
  }

  .dns-cta p {
    font-size: 1rem;
    color: var(--text-2);
    margin-bottom: 32px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 8px;
    font-family: var(--font-display, sans-serif);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 150ms;
    cursor: pointer;
    border: none;
    white-space: nowrap;
  }

  .btn-primary {
    color: #fff;
    background: var(--orange);
    box-shadow: 0 0 20px rgba(255, 85, 0, 0.3);
  }

  .btn-primary:hover {
    background: var(--orange-hover, #ff7033);
    box-shadow: 0 0 32px rgba(255, 85, 0, 0.45);
    transform: translateY(-1px);
  }

  /* Responsive */
  @media (max-width: 960px) {
    .visual-grid {
      grid-template-columns: 1fr;
    }

    .profit-flow {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .profit-arrow {
      transform: rotate(90deg);
    }

    .solution-grid {
      grid-template-columns: 1fr;
    }

    .dns-cta {
      padding: 32px 24px;
    }
  }
</style>
