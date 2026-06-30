#!/usr/bin/env bash
# init.sh — bootstraps Claude with project context
echo "Project: warschau-evangelisch | Stack: Next.js 16 + Tailwind v4 + TS (Supabase later)"
echo "Relaunch of warschau-evangelisch.de (German Lutheran parish, Warsaw)"
[ ! -d node_modules ] && pnpm install
echo ""
echo "Dev:    pnpm dev   (port 3000)"
echo "Build:  pnpm build (38 static/SSG pages)"
echo "Tests:  pnpm test"
echo ""
echo "Preview: https://warschau-evangelisch-relaunch.netlify.app"
echo "Read first: PROJECT_STATE.md, OPEN_ITEMS.md (open facts), SPEC.md"
echo ""
echo "Recent commits:"
git log --oneline -5
