---
title: "Demystifying the AI Agent"
description: "AI agents sound complex, but they're surprisingly simple. A system prompt, a few tools, and a model doing the real work. Here's what's actually under the hood."
date: "2026-02-07"
author: "Jeroen Gordijn"
tags:
  - AI
  - Tools
  - Agents
---

# Demystifying the AI Agent

"My coding Agent is the best!" I keep hearing this in developer communities. People debate which agent is the best AI coding tool. Claude Code, OpenCode, Cursor, etc. And people are passionate about their choice and trying to get their company to support their agent of choice. But here's the thing: the agent isn't doing what you think it's doing.

I discovered [Pi](https://pi.dev) this week. It's a minimal AI agent with just four tools: read, write, edit, and bash. That's it. No MCP, no Todos, no sub-agents, and no fancy UI tweaks. Just four tools and a model. And it works.

That got me thinking. If four tools are enough, what exactly are all these agents *actually* doing?

## What is an Agent, Really?

An agent is three things:

1. **A system prompt.** This is the "personality" and "harness" of the agent. It tells the model how to behave, what tone to use, what rules to follow. 

2. **A list of tools.** These are the actions the model can ask to perform. Read a file, write a file, run a command in bash. Each tool has a name, a description and a schema that defines the arguments. This way the model knows when to use it and how.

3. **A loop.** The agent takes your question/prompt, attaches the system prompt and tool list and sends it to the model. The model either responds with text (shown to you) or asks to use a tool. If it's a tool call, the agent executes it and sends the result back to the model. Repeat until the model sends back text. That's when the loop is done and the agent waits for user input.

That's it. That's the whole thing.

The model decides what to do. The model decides which tools to use. The model decides when it's finished. The agent is the plumbing. The model is the brain.

## So Where's the Magic?

The magic is in the model. Always has been. When Claude Code writes a beautiful refactoring of your messy function, that's Claude Opus/Sonnet/Haiku doing the thinking. The agent just handed it the right files when the model asked for it. 

So when someone says "my agent is better," what they usually mean is "my model + context + UX combo is better." Some agents may have a better (for you) system prompt than others. It may have a nicer UX and some quality of life features. These things matter a lot day-to-day. But the actual intelligence? That comes from the model.

## Skills Are Just Text Files

After my Pi discovery, I had another "wait, that's it?" moment about skills. In my [AI Coding Ladder](/blog/the-ai-coding-ladder) post, I described Level 5 (the Agentic Coder) where the AI gets access to tools and organizational knowledge. Skills are a big part of that.

But a skill is nothing more than a name, a description, and a markdown file. The system prompt nudges the model to check available skills to see if the task matches a skill description. When it matches, the model reads the skill file (by asking via a tool call). What you put into that file is up to you. References to websites, scripts, templates, coding standards. The model will just receive the SKILL.md and based on the content may try to read further resources or perform certain actions (again through tool calling). The outcome depends on how good your SKILL.md is.

There's no framework. No magic folders. It's a text file that the model reads when it seems relevant. That's the whole mechanism.

## Pi: Power Through Simplicity

This is what makes [Pi](https://pi.dev) so interesting. Instead of building a massive tool with hundreds of features, it gives you the bare essentials and says: "You figure out the rest."

Four tools. Read, write, edit, bash. With these four, the model can do almost anything. Need to search your codebase? Bash. Need to run tests? Bash. Need to modify a file? Edit. Need to understand what's going on? Read. Need MCP? Just let it write a bash script!

But here's the really clever part: from what I've tried so far, Pi can extend itself. Want a new feature? Ask Pi to build it and add it to Pi. It writes its own tools. It has a very powerful extension mechanism, with which you can tweak everything, from UI to system prompt. It grows with your needs instead of shipping with a thousand features you'll never use.


> [!NOTE]
> Pi is also the core of [OpenClaw](https://openclaw.ai)

## Why Does This Matter?

Because understanding the simplicity changes how you work.

If you know the agent is just plumbing, you stop attributing magic to the wrong thing. You focus on what actually matters: the model you're using, the context you're providing, and the instructions you're giving. A better system prompt will improve your results more than switching agents. Whenever something strange happens, look at the context. What did the model receive and why did it do what it did?

It also means you don't need to wait for your favorite agent to ship a feature. Need something? Build it. Write a skill. Add a tool. The barrier is surprisingly low.

## Build Your Own

I think we're moving into an era where heavy, expensive SaaS solutions are being replaced by in-house, purpose-built tools. Why buy an expensive software solution with a lot of functions you don't need, when building it yourself is cheaper? If we developers think we can easily build any system, why should our AI coding agents be any different?

Start bare. Add what you need. Remove what you don't. No need to try to understand all the features that your agent brings. You only add the features you need. Your agent should fit like a glove, not like a one-size-fits-all winter coat.

The next time someone tells you their agent is the best, ask them: which model does it use?

That's where the real answer lives.
