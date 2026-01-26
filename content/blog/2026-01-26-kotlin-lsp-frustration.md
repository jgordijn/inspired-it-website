---
title: "Kotlin's LSP Problem is Real"
description: "I just want to click through code. Is that too much to ask? The state of Kotlin's LSP is driving me away from the language."
date: "2026-01-26"
author: "Jeroen Gordijn"
tags:
  - Kotlin
  - AI
  - Tools
  - LSP
---

# Kotlin's LSP Problem is Real

I wrote about [The Kotlin Paradox](/blog/java-vs-kotlin-ai) last month. Back then, it was mostly theoretical: "In an AI-driven future, Java's robust LSP might beat Kotlin's nicer syntax." It felt like speculation about a problem I foresaw.

It's not theoretical anymore. I'm living it.

## The Daily Grind

Here's my typical day: I have AI agents writing code across multiple worktrees. They're doing the implementation while I architect and review. When I need to check something, I just want to **click through the code**.

That's it. Go-to-definition. Find references. Basic navigation.

With IntelliJ, this works perfectly. It's a nice IDE, but it is too heavy for my task. Opening IntelliJ for each git worktree (is that even working now? There was a bug with git worktrees) is killing my productivity. I wait... and wait... for indexing to finish.

I don't want a full IDE. I want to open Helix, or Zed, or VS Code, navigate quickly, and close it.

## The Remote Work Problem

It gets worse. A lot of my work happens in devcontainers or on remote boxes.

Open a full remote JetBrains session? Tried that, gone are 5GB of memory, just to watch a few files. The process is also painfull. I just want to `hx .` and browse to the file and check something. With all other options, I have to click through menus, to open a folder somewhere on the remote filesystem. With [OpenCode](https://opencode.ai) and [Claude Code](https://github.com/anthropics/claude-code), my work happens more and more in the terminal. Going outside, breaks the productivity flow.

With Go or Python, I'd just open Helix or VS Code Remote if I want a little more tools. The LSP connects, and I'm navigating code within seconds. `gd` to jump to definition, `gr` to find references. It just works.

With Kotlin? I get a text file with pretty colors.

The Kotlin LSP situation is terrible. There's work in progress by JetBrains, developing an LSP, that is in pre-alpha state and barely functions. 

## The Agent Perspective

The AI agents ([OpenCode](https://opencode.ai), [Claude Code](https://github.com/anthropics/claude-code)) face the same problem. When I'm working with Go or Python codebases, I see them using LSP features. I'm not sure yet as to which features are used, but I do see error messages coming back. This allows for faster iteration, because the agent already sees the error, before needing to compile and wasting time waiting on the results.

## The Breaking Point

I feel sad. Kotlin is still a nice language, and a few months ago I was in camp: "Use an IDE to develop, not a text editor!". But I don't write code by hand anymore. My agents do. And when I need to review, navigate, or verify, I need tooling that works outside the JetBrains ecosystem.

If I were starting a new project today, knowing what I know now about agentic workflows and the importance of universal tooling?

Kotlin wouldn't be my choice.

## What Would Fix This

JetBrains, if you're reading: the community needs a real Kotlin LSP. Not "pre-alpha." Not "experimental." A proper language server that works in all editors and AI agents that support it.

Until that changes, every new project I start is going to be a harder sell for Kotlin. And I suspect I'm not alone.
