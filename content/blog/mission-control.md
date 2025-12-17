---
title: "Mission Control: Orchestrating AI Across Services"
description: "How I stopped juggling proactive changes and built a Mission Control for my AI agents."
date: "2025-12-17"
tags: ["AI", "Microservices", "Workflow", "OpenSource"]
cover: /images/mission-control.png
publish_status: draft
---

# Mission Control: Orchestrating AI Across Services

"I need to change two services."

It sounds simple, right? But if you've ever tried to get an AI agent to coordinate changes across multiple repositories, you know specific pain. You start in one repo, get half the work done, then switch to the other, try to explain what you just did, paste some context... and before you know it, you're just a glorified copy-paste machine again.

I want to say something else, in this sense. I had such a change recently and decided to try another approach.

So, I did what any reasonable engineer would do: I created a folder and gave it a boring name.

## The Birth of "Overarching-Initiatives"

I created a top-level directory called `overarching-initiatives` (I know, catchy, right?) as a sibling to my project folders. The idea was simple: this would be the brain. The place where the plan lives.

Inside, I placed my trusty `AGENTS.md`, It wasn't about one project, but it was the roadmap to all my microservices. It described the *landscape*. It listed the microservices, their relationships, and where they lived on the filesystem.

Then, I wrote the "Open Spec" proposal. Not for `service-a`, not for `service-b`, but for the *initiative*. I pointed clearly to the services that needed changes. I went back and forth with the AI, refining the plan until it was solid.

And then... I hit "Go".

## From Folder to "Mission Control"

It worked. The agents picked up the tasks for both services. Implementation kicked off in parallel. I watched as terminals buzzed and files updated in two different projects simultaneously. 

That's when I realized `overarching-initiatives` was a terrible name. It sounded like a corporate committee.

This wasn't a committee. This was **Mission Control**.

Renaming that folder shifted my mindset. I wasn't just "managing files"; I was orchestrating a fleet.

## How It Works

The structure is surprisingly simple:

```text
/projects
  /service-authentication
  /service-payment
  /mission-control
    /AGENTS.md
    /initiatives
      /2025-12-oauth-upgrade
        /proposal.md
        /tasks.md
```

In `mission-control/AGENTS.md`, I define the high-level architecture. "Auth Service handles tokens, Payment Service talks to Stripe."

In the specific initiative folder, I write the spec that bridges them. "Update Auth to issue new claims, and update Payment to verify them."

By lifting the context *out* of the individual repos, the AI sees the bigger picture. It doesn't get tunnel vision on just one codebase.

## The "Architect" Moment

Remember Level 6 from my [AI Coding Ladder](/blog/the-ai-coding-ladder)? The Architect?

This feels like the truest expression of that level yet. I spent my time in Mission Control, designing the interaction, while the agents were down in the engine rooms of `service-a` and `service-b` turning the wrenches.

There are still spots to fill in. I need better tooling to visualize this "fleet" status. I need to figure out how to handle rollback if one service fails and the other succeeds.

But for now? I'm never going back to juggling repos. I'll be in Mission Control.
