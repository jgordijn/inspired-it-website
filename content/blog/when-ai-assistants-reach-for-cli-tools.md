---
title: "When AI Assistants Reach for CLI Tools"
description: "Why does Copilot sometimes choose perl one-liners over proper edit tools? A look at AI assistant habits and how to guide them back on track."
date: "2025-10-30"
author: "Jeroen Gordijn"
tags: ["AI", "development", "tools", "copilot"]
---

## When AI Assistants Reach for CLI Tools

Working with AI coding assistants is fascinating. They're incredibly powerful, but sometimes they surprise you with their tool choices.

Take this recent example. I was working with Github Copilot (model: Claude Sonnet 4.5) on a Kotlin test file, and it needed to rename a method call from `update()` to `upsert()`. Simple enough, right?

Instead of using its built-in edit capabilities, Copilot decided to go old-school:

> perl -pi -e 's/storeStorageAdapter\.update\(/storeStorageAdapter.upsert(/g' src/test/kotlin/MyStorageAdapterIT.kt

I had to pause and ask:

> "Wait, what? Why are you doing it via perl? You have edit skills, use that."

This put Copilot back on track and it replied:

> You're absolutely right, my apologies. Let me use the proper edit tool instead. Let me read the file and update it directly:

Both methods get the job done, but the built-in edit tool is the proper approach. Over time, tools get better and better, and I wonder if in a few weeks this will still happen.
