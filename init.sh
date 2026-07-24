#!/usr/bin/env bash
# init.sh — bootstraps a new session with project context
echo "Project: warschau-evangelisch | Stack: Next.js 16 + Tailwind v4 + TS + Netlify Blobs"
echo "Relaunch of warschau-evangelisch.de (German Lutheran parish, Warsaw)"
[ ! -d node_modules ] && pnpm install
echo ""
echo "Dev:    pnpm dev   (port 3000; content from .data/ or data/seed fallback)"
echo "Build:  pnpm build"
echo "Tests:  pnpm test"
echo ""
echo "Preview: https://warschau-evangelisch-relaunch.netlify.app  (admin: /admin)"
echo "Repo:    https://github.com/tsielknovnomis/warschau-evangelisch"
echo "Read first: PROJECT_STATE.md, OPEN_ITEMS.md (open facts + go-live plan)"
echo ""
echo "Recent commits:"
git log --oneline -5
