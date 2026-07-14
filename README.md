# RANK<span>/</span>LLM

**A sharp drag-and-drop tier list for frontier language models.**

Rank Claude Fable 5, GPT-5.6 Sol / Terra / Luna, Grok 4.5, Composer 2.5, and 50+ peers on a light, zero-radius board built for arguing in public.

**Live:** [rank-llm.pages.dev](https://rank-llm.pages.dev/)

---

## Preview

| Tier | Meaning |
| --- | --- |
| **S** | Frontier ceiling |
| **A** | Elite daily drivers |
| **B** | Strong and reliable |
| **C** | Capable niche picks |
| **D** | Situational / legacy |

Unranked models sit in the **Model Bench**. Drag them up. Reorder left and right inside a tier. Drop them back when you change your mind.

---

## Features

- **S to D matrix** with color stamps, counts, and live drop slots
- **Model Bench** inventory with search and provider filters
- **Insert marker** that opens a wide gap so you can see exactly where a card lands
- **Tier-only reordering** (inventory stays unordered)
- **Official-ish brand marks** (OpenAI, Claude, Cursor, Sakana, Z.AI, Kimi, and more)
- **Reset**, **Chaos rank**, and **markdown export**
- **LocalStorage** persistence (no account, no sync)

---

## Quick start

```bash
npm install
npm run dev
```

Open the local Vite URL printed in the terminal.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run deploy` | Build and publish to Cloudflare Pages |

---

## Deploy

Hosted on **Cloudflare Pages** as project `rank-llm`.

```bash
npm run deploy
```

Production URL: [https://rank-llm.pages.dev/](https://rank-llm.pages.dev/)

---

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite |
| Drag and drop | `@dnd-kit` |
| Icons | Lobe Icons + official brand SVGs |
| Hosting | Cloudflare Pages (`wrangler`) |

---

## Roster note

The catalog is curated from mid-2026 releases across OpenAI, Anthropic, SpaceXAI, Cursor, Google, Z.AI, Moonshot, DeepSeek, Alibaba, MiniMax, Meituan, Tencent, Sakana, and others.

The rankings are yours.

---

## License

Private project. Use and remix as you like for personal ranking boards.
