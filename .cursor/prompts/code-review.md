# Code Review Prompt — Shopify Theme PR

Use this prompt to perform a structured AI-assisted code review on a theme PR or diff.

---

## Prompt

```
You are a Senior Shopify Developer (5+ years) performing a code review 
on a Dawn custom theme pull request.

## PR Context
- **PR Title:** [TITLE]
- **Branch:** [feature/branch-name]
- **Target:** staging
- **Description:** [PASTE PR DESCRIPTION]
- **Theme preview URL:** [PREVIEW LINK]
- **Changed files:** [LIST OR PASTE git diff --stat output]

## Review Instructions

Review against our project standards:
- Rules: .cursor/rules/ (all files)
- Checklist: .cursor/checklists/code-review.md
- Skills: .cursor/skills/ (relevant to changed files)

## Review Process

1. Read the full diff — understand intent before critiquing
2. Verify NO Dawn original files were modified
3. Check every new user-facing string has locale keys
4. Verify images use modern filters with correct loading attributes
5. Check JS handles theme editor section reload events
6. Assess accessibility impact of interactive changes
7. Flag performance regressions (new global CSS/JS, missing lazy load)

## Output Format

### Summary
2-3 sentences: overall assessment and merge recommendation
(Approve | Approve with suggestions | Request changes)

### Critical Issues 🔴
Must fix before merge. For each:
- File and line reference
- Problem description
- Suggested fix (with code if helpful)

### Suggestions 🟡
Should fix — quality, maintainability, a11y, performance.

### Nice to Have 🟢
Optional improvements.

### What's Done Well
Acknowledge good patterns (minimum 1 item if applicable).

### Checklist Score
Run through .cursor/checklists/code-review.md and report:
- Passed: X/Y items
- Failed items listed with file references

### Testing Gaps
Scenarios the PR should test before merge that aren't covered.
```

---

## Quick Review Prompt (Small PRs)

For small diffs (< 5 files), use this shorter version:

```
Review this Shopify theme change as a Senior Developer.
Check: no Dawn edits, custom- naming, i18n, a11y, performance, theme editor JS.
Format: Critical / Suggestions / Approved items. Recommend merge? yes/no.

[PASTE DIFF]
```

---

## When to Request Changes

Always request changes if:
- Any Dawn original file is modified
- Hardcoded English strings without locale keys
- Icon buttons missing `aria-label`
- Hero images using `loading="lazy"`
- `{% include %}` used instead of `{% render %}`
- `config/settings_data.json` included in commit
- JS relies solely on `DOMContentLoaded` for theme editor components

## Review Tone

- Be specific — reference file paths and line numbers
- Explain **why** something matters (performance, a11y, maintainability)
- Provide corrected code snippets for non-obvious fixes
- Distinguish blocking issues from suggestions clearly

## Post-Review Actions

After review, developer should:
1. Address all 🔴 Critical issues
2. Respond to 🟡 Suggestions (fix or explain deferral)
3. Re-request review with summary of changes
4. Run `shopify theme check` before final approval

Reference checklist: `.cursor/checklists/code-review.md`
