# For Pratitee ❤️

A private, cinematic proposal microsite built as a static Next.js app. It follows a gentle six-part story—from the opening note to a respectful answer—without a backend, analytics, or tracking.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Motion, Lucide React, and pnpm.

## Run locally

```bash
pnpm install
pnpm dev
```

Use `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` before deployment. `pnpm build` produces the static `out/` folder.

## Customize the message

All names and copy live in `src/data/proposal-content.ts`. Update that file to personalize the recipient, letter, cards, confession, outcome messages, and signature without changing components.

## GitHub Pages

The included workflow deploys pushes to `main`. In the repository, enable **Settings → Pages → GitHub Actions**. The workflow sets `NEXT_PUBLIC_BASE_PATH` to the repository name for project Pages URLs. For a custom domain or a root user/organization Pages site, build with no base path:

```bash
pnpm build
```

For a project URL, use:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repository-name pnpm build
```

If assets 404 on Pages, confirm the base path matches the repository name exactly and that GitHub Pages is configured to use GitHub Actions.
