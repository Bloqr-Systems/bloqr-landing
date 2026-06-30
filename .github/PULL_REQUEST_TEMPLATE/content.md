## Content PR

<!-- Use this template for blog posts, changelog entries, or copy-only edits — no code changes. -->

**Closes** #<!-- issue number, if any -->

### What changed?

<!-- New blog post, changelog entry, or copy edit? One sentence is fine. -->

-

### Content checklist

- [ ] Lives in `src/content/blog/` (or the appropriate content collection) as Markdown
- [ ] Frontmatter is complete and matches the schema in `src/content.config.ts`
- [ ] Uses `post.id` conventions consistent with Astro 6 Content Layer API (not `post.slug`)
- [ ] No inline HTML/CSS that hardcodes colors, fonts, or spacing — content relies on site styles

### Brand voice (guidelines/BLOQR_COPY_PATTERNS.md, guidelines/BLOQR_DESIGN_LANGUAGE.md)

- [ ] Matches Bloqr voice: short declarative sentences, specific verifiable numbers, "you"-focused copy
- [ ] Avoids forbidden vocabulary ("leveraging", "seamlessly", "best-in-class", "enterprise-grade", "game-changing")
- [ ] "Privacy" and "anonymity" used correctly and not interchangeably
- [ ] AI is framed as complementing human curation, never replacing it
- [ ] No adversarial framing of DNS vendors/partners (AdGuard, NextDNS, Pi-hole, etc.)
- [ ] Naming follows convention: **Bloqr** / **Bloqr AI** — never `BLOQR`/`bloqr`/`BloQr`

### Secrets & credential safety

- [ ] No `.dev.vars`, `.env`, API keys, tokens, or connection strings are present in this diff

### Testing

- [ ] `npm run dev` checked locally — post/page renders correctly, links resolve, no broken images

### Screenshots

<!-- Screenshot of the rendered post/page. -->

---

### Notes for reviewers

<!-- Anything the reviewer should know that isn't obvious from the diff? -->
