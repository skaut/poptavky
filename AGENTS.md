# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Overview

IT Poptávky (https://itpoptavky.skaut.cz) is a website listing Skaut IT projects and their GitHub issues that need help. The repo contains two independent npm packages under `packages/` (no root `package.json`, no workspaces — run `npm ci` and all commands inside each package directory):

- `packages/collector` — Node script (Node 26, run directly as TypeScript via `node src/index.ts`) that fetches data from GitHub and writes `listings.json`.
- `packages/frontend` — React 19 SPA (Vite, Emotion, react-router, SWR) that renders `listings.json`.

The UI and user-facing text are in Czech.

## Commands

Run from inside `packages/collector` or `packages/frontend`:

- `npm run lint` — ESLint + `tsc --noEmit` in parallel
- `npm test` — Vitest with coverage; `npm run test-watch` for watch mode
- Single test: `npx vitest run tests/path/to/file.test.ts` (or `-t "test name"`)

Collector only:
- `npm run collect` — requires a GitHub token in the `PAT` env var; reads `../../config.json` and writes `../../listings.json` (repo root).

Frontend only:
- `npm start` — Vite dev server
- `npm run build` — builds to `packages/frontend/dist` (Vite `root` is `src/`, `outDir` is `../dist`)
- `npm run check` — runs `es-check es2022` on the built output (needs a build first)
- `npm run test-accept` — update Vitest snapshots (many component/page tests are snapshot tests)

## Architecture / data flow

1. `config.json` (repo root) lists the participating repos as `{ owner, repo }`.
2. The collector (`src/run.ts`) iterates the projects in parallel; for each, `getProjectListing` fetches the repo's `.project-info.json` (format documented in `README.md`), the repo visibility, and open issues with the project's `help-issue-label` (default `help wanted`). Issue links are only included for public repos. A failing project is logged via `@actions/core` and skipped; only a broken global config fails the run.
3. GitHub Actions (`collect.yml`, daily cron + on `config.json` changes) runs the collector and deploys `listings.json` to the `gh-pages` branch. `deploy.yml` builds and deploys the frontend to the same branch, excluding `listings.json`, `CNAME` and `404.html` from cleanup.
4. The frontend fetches `listings.json` from the production URL in `src/config.ts` (also in dev) and derives all views from it client-side (`src/utils/`).

Key points:
- The interfaces in `packages/collector/src/interfaces/` and `packages/frontend/src/interfaces/` are duplicated copies of the same data model. The collector versions additionally contain runtime `assertIs*` validators throwing `PoptavkyError` subclasses (`src/exceptions/`). Keep both in sync when changing the `listings.json` shape.
- Collector imports use explicit `.ts` extensions (native Node TS execution); frontend imports are extensionless.
- Collector tests mock HTTP with `nock` (`tests/setup.ts` disables real network and swaps the `octokit` module for one using `node-fetch` so nock can intercept it).
- Frontend tests run in jsdom with `@testing-library/react`, using shared fixtures from `tests/testData.ts`.
