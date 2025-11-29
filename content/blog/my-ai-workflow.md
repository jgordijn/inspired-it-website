---
title: My AI Writes Code. Yours Can Too.
description: A detailed look into my personal workflow using AI tools to enhance productivity and creativity in my projects.
date: '2025-11-29'
author: Jeroen Gordijn
tags:
  - AI
  - opencode
  - claude
  - github copilot
  - openspec
---

![A software engineer orchestrating an AI-assisted workflow, supervising digital agents as they build software architecture using tools like OpenCode.](/images/ai-puppeteer.png)
"AI tools don't work," "AI generates junk," "It never does what I want." These are common complaints I hear from developers skeptical about AI workflows. And honestly? They're not wrong. These frustrations are real. But I've found that with the right structure, these tools become genuinely useful. Over the past few months, I've dedicated myself to mastering these tools in my daily work. Here is my personal AI workflow and how it has transformed the way I develop software.

## The Tools

I've experimented with various tools but have settled on [OpenCode](https://opencode.ai) as my daily driver. It stands out because of its flexibility, plugin support, and ability to interface with different AI models, including GitHub Copilot, which I use professionally. I'm really impressed by [Claude Code](https://claude.ai) and its recently added "skills" capability. Thankfully, thanks to a [plugin](https://github.com/malhashemi/opencode-skills) by Mohammad Alhashemi, I can now leverage these skills directly within OpenCode.

## The Process

Tools like OpenCode, Claude, and GitHub Copilot are powerful, but they aren't magic boxes that magically understand what you want. You must guide them. Think of them as very good coders who have no clue about software engineering principles. They will happily churn out code the moment you ask. However, like an energetic puppy, they are easily distracted and can derail quickly. As their manager, it is your job to provide clear instructions and keep them on the right path.

Relying solely on a chat interface is a recipe for frustration. Context is limited, and models can lose track of the objective even within that window. To keep this "puppy" focused, we need a system that allows us to pause and resume work without losing context. This requires documenting our goals, tasks, and progress in a file.

Before writing a single line of code, we build this framework using markdown.

You don't need to invent this structure from scratch. I've explored two frameworks:

- [openspec](https://openspec.dev)
- [Spec-kit](https://github.github.io/spec-kit/)

I currently use `openspec` because it is simple, lightweight, and easy to adopt. Both are solid options, and this space is evolving rapidly, so it's worth keeping an eye out for new tools.

While some details below are specific to `openspec`, the underlying principles apply universally.

### 0. Foundation: [AGENTS.md](https://agents.md)

Before diving into the workflow, there's a crucial piece of setup: `AGENTS.md`. This file is your way of onboarding the AI to your codebase. It documents architectural decisions, coding styles, guidelines, and even how to build the code or run tests. The more context you provide here, the better the agent can adhere to your standards.

If you follow a specific pattern, like Ports and Adapters, document it here with examples. Don't assume the agent will infer it correctly from the existing code. Be explicit.

Example of a section in `AGENTS.md`testing:

````markdown
# ARCHITECTURE PRINCIPLES

- Layers: domain (pure), core (core functionality void of technology), adapters.
- Define inbound/outbound Ports (interfaces) in ports; implement outbound ports in adapters. inbound ports implemented in core.
- Adapters: web/rest, messaging, persistence, external systems.
...
````

In my `AGENTS.md`, I specify a preference for Test-Driven Development (TDD). The agent usually writes tests first, but it does not always adhere to this. I'm still tuning this. For now, comprehensive passing tests by the end is good enough.

*(I'll leave "skills" out of this discussion for now. That's a topic for a future post.)*

### 1. Making a Proposal

We start by creating a spec file (or "proposal") for the feature we want to implement. In `openspec`, you can use the command `/openspec-proposal` or simply ask the agent to create a proposal. This phase is about describing *what* we want to achieve. Detail is key.

```
/openspec-proposal For JIRA ticket PROJ-1234, we need to listen to the Kafka topic
'Users' to store the name and email of every new user. The topic uses an Avro schema 
available at http://schemaregistry:8081/schemas/Users. Fetch this schema and store it 
in `src/main/avro`. Ensure classes are generated during the build. Create a new User 
entity and persist it for every message received.
```

Note that I provided a URL to the Avro schema, rather than copying content manually. This lets the AI fetch current information directly. I do the same when creating REST clients. I will provide the URL to the OpenAPI spec instead of copying it myself. You can use references and you should use references so that the AI can get more information.

`openspec` will then generate several markdown files:
- `proposal.md`: The high-level plan.
- `tasks.md`: A checklist of steps.
- `design.md`: (Optional) For structural changes.

### 2. Reviewing and Iterating

This is the most important step. The agent will create code based on the documents created in the previous phase. Carefully inspect these plans. Is this really what you want? If not, ask for changes. Iterate until you are confident that if you handed this plan to a human developer, they would deliver exactly what you need.

### 3. Implementation

Now, the agent starts coding. It will create classes, methods, and tests based on the proposal and design. I usually monitor this process, but if I find myself steering too much, it's a sign that the plan wasn't clear enough.

Sometimes you may come to the conclusion that you forgot something during the proposal phase. Seeing the actual code implementation often reveals implications or requirements I hadn't considered. When this happens, you have two options:
1. **Course-correct:** Update the proposal and guide the agent back.
2. **Reset:** If you're early in the process, it's often faster to discard the current attempt, refine the proposal, and start over.

I usually try to course-correct, but for major divergences, I don't hesitate to restart. During this phase, my role shifts from "manager" to "reviewer."

AI models are probabilistic, not deterministic machines. They won't always follow instructions perfectly. You have to stay engaged, nudging them to update the task list and checking progress.

### 4. Final Review and Merge

Once the agent reports completion, I perform a final manual check. I look for oddities or small stylistic preferences and ask the agent to fix them.

For larger changes, I add an extra layer of safety: I ask the agent to review its own work using specific sub-agents (I'll cover sub-agent configuration in a future post). I have a "Code Reviewer" agent and a "Compatibility Checker" agent.

```
Ask @code-reviewer to review the changes in this branch, and ask @compatibility-checker 
to assess any backward compatibility risks. Have them write a report and present their 
findings.
```

These sub-agents catch things I might miss: inconsistent naming, potential breaking changes in APIs. Once their reports come back clean (or I've addressed their findings), I make a pull request.

## What This Has Changed

Looking back at the skepticism I mentioned at the start: yes, AI tools can generate junk. Yes, they can be frustrating. But with this structured approach, I've found that:

- **Iteration is faster.** The proposal phase catches misunderstandings before any code is written.
- **Context survives.** I can step away from a task and pick it up the next day.
- **Quality is higher.** The multi-agent review catches issues I would have missed.
- **I work confidently in unfamiliar territory.** The agent handles syntax and boilerplate while I focus on architecture and business logic.

Today, I write nearly 100% of my code this way.

Is it perfect? No. I still course-correct, still restart when plans go sideways, still find myself nudging the agent back on track. But this is the worst AI will ever be, and it's already useful. I'd rather learn to work with it now than catch up later.
