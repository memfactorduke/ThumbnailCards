# ThumbnailTweets

## Project Overview
ThumbnailCards — free web app for generating fake social media post cards optimized for YouTube thumbnails. Built with Vite + React + TypeScript + Tailwind CSS v4. Multi-route SPA with per-platform generators (Twitter/X for MVP).

## Build & Run
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npx vitest run` or `npm test`
- Lint: `npm run lint` (runs `tsc --noEmit`)

## Code Style
- Use TypeScript strict mode when applicable
- Prefer named exports over default exports
- Use descriptive variable names; avoid abbreviations
- Keep functions under 50 lines; extract helpers if needed

## Architecture
<!-- Update as project grows -->
- Source code in `src/`
- Components in `src/components/`
- Tests colocated with source files (`*.test.ts`)

## Workflow Rules
- Use plan mode for any task with 3+ steps
- Use subagents liberally to preserve context
- Never mark tasks complete without verification (run tests/build)
- After editing files, verify with lint/typecheck before moving on
- Prefer editing existing files over creating new ones
- Keep PRs focused — one concern per PR

## Common Mistakes (Add to this list!)
<!-- When Claude does something wrong, add a rule here -->
