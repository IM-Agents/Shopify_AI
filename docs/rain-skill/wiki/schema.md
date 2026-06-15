# Wiki Schema

How this project's knowledge base is organized.

## Layout

```
docs/rain-skill/
├── tasks/                 ← one file per task: <YYYY-MM-DD>-<slug>.md
└── wiki/
    ├── sources/           ← immutable raw source docs (never edit after ingest)
    ├── schema.md          ← this file
    └── wiki/
        ├── INDEX.md       ← auto-maintained table of contents
        ├── architecture.md
        ├── api-contracts.md
        ├── data-model.md
        ├── decisions.md
        ├── bugs-fixed.md
        ├── glossary.md
        └── open-questions.md
```

## Rules

- **sources/** is append-only. Ingested documents are copied here verbatim and
  never edited; distilled knowledge goes into the `wiki/wiki/` pages.
- Each wiki page is a living document. Cross-link with relative markdown links.
- `INDEX.md` is regenerated/maintained on every wiki update.
- Keep entries factual and dated. Convert relative dates to absolute.
- One concept per section; prefer linking over duplicating.

## Operations (via `/wiki-update` or `project-wiki` skill)

- **init** — create the tree (done).
- **ingest `<path|url>`** — copy a source into `sources/`, distill into pages.
- **query `<question>`** — answer from the wiki, then file the answer back.
- **lint** — find contradictions, orphans, and drift vs. the codebase.
