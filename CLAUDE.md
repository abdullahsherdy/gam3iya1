@AGENTS.md

# Claude Code specifics

- `AGENTS.md` is the single source of truth for conventions, teaching modes and definition of done. This file only adds Claude Code behavior.
- **Read the "Current week" line in `AGENTS.md` first** and apply the matching mode (TUTOR weeks 1 to 5, PAIR weeks 6 to 16).
- Before writing code, read the relevant PRD story and SRS requirement ids, and the work package in `plan/milestones.md`. Quote the ids in commit messages and PR descriptions.
- Verification loop: after any change run `pnpm lint && pnpm typecheck && pnpm test`; fix everything before reporting done. Do not claim success without running them.
- Small, focused changes: one idea per commit, usually 20 to 100 lines across 1 to 5 files. Refactors are separate commits and only with tests in place.
- Project rules override generic advice. In particular: no `useMemo`/`useCallback` without a measured reason (React Compiler is evaluated in WP 4.7); inline event handlers in JSX are fine.
- Never edit `packages/domain` tests to make them pass. Never paste generated markup from Stitch or other tools.
- Slash commands in `.claude/commands/`: `/hint`, `/explain-back`, `/review`.
- Tutor mode enforcement: copy `.claude/tutor-mode.settings.json` over `.claude/settings.json` before Esraa's first session (see `docs/claude-code-kickoff.md`).
