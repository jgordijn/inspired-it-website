---

title: "The new website of Inspired IT"
description: "How I used Claude Code and OpenAI Codex to design, migrate, and refine my new Inspired IT website with AI assistance."
date: "2025-10-16"
author: "Jeroen Gordijn"
tags:
  - Announcement
  - AI
------------------------------------------------------

## The new website of Inspired IT

Welcome to the new and improved website of **Inspired IT**!
This new site wasn’t built in the traditional way, no WordPress templates, no endless evenings of tweaking colors or layouts. Instead, it was built *with AI*.

As a developer (not a designer), I wanted something that looked professional, that reflected who I am and what I do, but without diving deep into the world of front-end design or CMS intricacies. What I did want, though, was **simplicity**:

* a clean, professional site
* a place for my blogs
* written in Markdown
* rendered as a static site (no databases, no forms, no complexity)

So, as an AI programming advocate, I thought:
**“Let’s try to build this website with AI.”**

---

### Phase 1: Building with Claude Code

I started with **Claude Code** from Anthropic.
I gave it some clear instructions:

> “Generate a new website that’s more professional than my current one at [www.inspired-it.nl](https://www.inspired-it.nl). It should include a blog section, support Markdown content, and produce a static site.”

Claude did its research, analyzed my existing website, and came back with a complete redesign. It was impressive, a fully generated layout, new structure, and improved visuals.

Halfway through the process, Anthropic released **Haiku 4.5**, their new model. I decided to switch over from **Sonnet 4.5** to see the difference. I immediately noticed that **Haiku 4.5 was much faster**, which made the workflow far more interactive. I didn’t have to wait as long for responses, so the iteration cycle was smoother and easier to work with.

The AI handled the overall site design beautifully. I then refined the content to make sure it reflected more about me and what I do. The information was correct, but I wanted it to be more personal and authentic.

---

### Phase 2: The Blog Migration Challenge

After the design was done, I wanted all my **existing blogs** on the new site.
So I asked Claude to copy them from the old website. It did, but then decided to *rewrite* them “to make them better.”

Even though in some cases the rewritten versions looked better, with cleaner sentence structures, I still wanted to keep the original content. Many of the original links and references were gone. After some back-and-forth, I managed to get most of the original content back, though some links were still missing.

That's when I decided to try another AI tool.

---

### Phase 3: Refining with Codex

I turned to **Codex from OpenAI**.
I set up the MCP server for Chrome DevTools and gave it a precise prompt:

> “Inspect the current website and compare the blogs with the originals at [www.inspired-it.nl](http://www.inspired-it.nl).
> If there are differences, copy over the original content exactly as it was.
> Do not change the text, only improve the layout if needed.”

Codex dove right in. It used a lot of `curl` calls to fetch data and quickly realized that the old site was a WordPress installation. It fetched the necessary files directly from WordPress and started comparing them.

The result?
**Perfectly restored blog posts**, now rendered beautifully in the new static format with all links, formatting, and details intact.

If you want to look under the hood, the entire codebase for this site now lives on GitHub: [jgordijn/inspired-it-website](https://github.com/jgordijn/inspired-it-website).

---

### The Result

And here we are.
The new **Inspired IT** website was built by me, with the creative power of **Claude Code** and **Codex** working alongside.

It’s still fully under my control, fully static, and fully Markdown-driven, but it was *AI-assisted* from start to finish.
