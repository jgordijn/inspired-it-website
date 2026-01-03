---
title: "The Kotlin Paradox"
description: "Kotlin may be a nicer language, but Java might be the best choice when paired with AI. Here is why."
date: "2025-12-19"
tags: ["AI", "Kotlin", "Java", "LSP"]
cover: /images/ai-kotlin-paradox.png
---

# Why Java Might Be Better for AI Coding

I love Kotlin. It is concise, expressive, and null-safe. It saved us from the boilerplate hell of Java versions of the past. Java has been catching up quickly and is getting better and better. But [Kotlin](/blog/unraveling-the-code-kotlin-edge-over-java-streams) still has some major advantages over Java. For years, "Java vs. Kotlin" was a settled debate: Kotlin was simply better for developers.

But recently, as I shifted my workflow to be [100% AI-generated](/blog/my-ai-workflow) (reaching Level 6 on the [AI Coding Ladder](/blog/the-ai-coding-ladder)), I started thinking about how AI works with my codebase. It essentially searches for and replaces text, then checks whether it works. This was the workflow in the early days of programming. Relying on text manipulation via search-and-replace does not seem like the best idea.

Maybe in the age of AI, the "better" language might not be the one with the nicest syntax. It might be the one with the best **LSP**.

## The IntelliJ Lock-in

Kotlin was born at JetBrains. It was designed *for* IntelliJ IDEA. Coding inside IntelliJ is excellent. But it doesn't easily transfer to other editors. Mainly, because there is no good LSP for Kotlin. Coding Kotlin on other IDEs is a bad experience. 

As a developer, I was perfectly happy with IntelliJ, and therefore ignored how unpleasant it is to use in other IDEs like VS Code, Vim or others.

## Enter AI

Today, most AI agents work without using an LSP. Some mention the possibility of using an LSP, for instance OpenCode, but in my experience, it does not seem to work yet. If asked, OpenCode simply denies that it knows how to use an LSP. Even if it would work, on their site they state that it can only use the diagnostics from the LSP, not the full features.

![OpenCode LSP](/images/opencode-lsp.png)

However, in the future, to understand your code, they will rely heavily on the **Language Server Protocol (LSP)**.

> [!INFO]
> The [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) is a standard that allows editors to communicate with language servers. Ideally, it provides features such as auto-complete, go-to-definition, find all references, refactoring, and more, regardless of the editor you use.


Without a good LSP, the AI is just working with the code like a developer would work with code in Notepad. Just search and replace, change the code, and then compile it to see any errors. LLMs are fantastic in this and do a very good job, an amazing job even. But imagine if we gave them a good LSP and they knew how to use it. They would essentially get the same powerful tools you have when using IntelliJ—being able to refactor code and immediately see when there is an error. They would stop guessing based on text patterns and start understanding the *structure* of your code.

## The Problem

Here lies the problem:

*   **Java**: Has the Eclipse JDT LS. It is mature, battle-tested, and robust. It exposes deep insights about the code structure to VS Code.
*   **Kotlin**: The LSP situation is... bad. There is a community-driven server, and recently JetBrains released an experimental one (which they call "Pre-alpha"). But at the current state, it's barely usable.

## The Paradox

This leads to a weird conclusion for the future: **If you want the best AI agent, you might be better off writing Java.**

Currently, AI tools do not make much use of LSPs yet. But going towards the future, they may more and more. And hopefully in 2026, they will be better integrated into the tools I am mostly using, like OpenCode.

When LSPs really find their place in AI coding, it may feel like coding with Java is like you're fully connected, while with programming Kotlin it's like going back in time. It will possibly be slower and more expensive because doing search and replace will cost more tokens than doing a call to the LSP.

## Conclusion

For the last decade, many people migrated to Kotlin to escape Java’s "noise". We wanted clean syntax because humans have a limited bandwidth for boilerplate. We chose Kotlin because it made us better coders and helped us enjoy coding more.

By moving away from the nicer language and back towards a language with a robust, open-standard LSP like Java, we are making a trade-off that feels wrong but yields right:

- If you are on the [AI Ladder Level 0-3](/blog/the-ai-coding-ladder): You write the code. You need the language to be concise.\
**Winner: Kotlin**.
- If you are moving towards the higher levels [Level 4 and up](/blog/the-ai-coding-ladder), the verbose syntax of Java matters less (since you aren't typing it), and the deep understanding the AI will get from the LSP matters more.\
**Winner: Java**.

## The Choice for 2026

If you are a purist who enjoys the craft of manual coding, stay in IntelliJ with Kotlin. It remains the gold standard for human-centric development.

However, if you are moving toward an Agentic Workflow, where you act more as an architect than a typist, you have to ask yourself: Am I writing this for me, or for the AI? We may be entering an era where we intentionally choose "worse" languages to get better results. It’s counter-intuitive, it’s frustrating, and it’s a total paradox, but in the age of AI, the best code might be in a language that you didn't even want to write yourself.
