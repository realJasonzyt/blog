---
slug: github-pages-nuxt-deployment
title: 文档踩坑：Nuxt3 部署到 GitHub Pages
description: Nuxt3 部署到 GitHub Pages
cover: /assets/img/blogs/github-pages-nuxt-deployment/77733667_p0.webp
author:
  name: Jasonzyt
  avatar: /assets/img/avatar.jpg
tags: ["github", "pages", "nuxt", "deploy", "actions"]
category: Tech
pinned: 1
created: 2024-12-31T13:08:56.000Z
updated: 2024-12-31T13:08:56.000Z
---

今天想把 Nuxt3 部署到 GitHub Pages，看了[官方的文档](https://nuxt.com/deploy/github-pages)，是这样写的:

```yaml
# ...
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      # Pick your own package manager and build script
      - run: npm install
      - run: npx nuxt build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public
  # deploy: ...
```

官方 example 使用的是`npx`，但是我用的是`pnpm`，直接改成`pnpm exec nuxi build`会发现报错：

```{4}
/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22373
              throw new UsageError(`This project is configured to use ${result.spec.name} because ${result.target} has a "packageManager" field`);

Usage Error: This project is configured to use yarn because /home/runner/work/campu/campu/package.json
```

最后试了半天发现`corepack enable`应该放到`setup-node`后面……

放个完整 pnpm 预设在这里，自取，就酱

```yaml
name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4.0.0
        with:
          version: latest
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: corepack enable
      # Pick your own package manager and build script
      - run: pnpm install
      - run: pnpm exec nuxi build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public
  # Deployment job
  deploy:
    # Add a dependency to the build job
    needs: build
    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write # to deploy to Pages
      id-token: write # to verify the deployment originates from an appropriate source
    # Deploy to the github_pages environment
    environment:
      name: github_pages
      url: ${{ steps.deployment.outputs.page_url }}
    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
