---
title: "Level 7: The Team"
description: "The next step after becoming the Architect: building a team of AI agents that collaborate like real team members."
date: "2026-08-18"
author: "Jeroen Gordijn"
tags:
  - AI
  - Coding
  - Workflow
  - Tools
publish_status: draft
---

# Level 7: The Team

In my [AI Coding Ladder](/blog/the-ai-coding-ladder), Level 6 was **The Architect**. You stop writing the code and start designing what needs to be built.

But an architect still needs a team.

## Meet the Team

I use [Pi](https://pi.dev) with the [pi-intercom](https://www.npmjs.com/package/pi-intercom) extension to run a small team of agents, each with its own role:

- **Ada** (Luna xhigh): team lead and orchestrator
- **Athena** (Sol Max): architect and researcher
- **Merlin** (Sol Medium): software engineer
- **Tyto** (Sol Medium): reviewer
- **Iris** (Kimi K3): frontend engineer

Yes, I named them. Once they start talking to each other, `agent-1` and `agent-2` don't quite cut it anymore.

## More Than Delegation

Most work flows through Ada. I explain what I want, and she decides who should investigate, implement, or review it.

That sounds like ordinary sub-agents. It isn't.

Merlin can ask Athena about an architectural decision. Tyto can send review findings directly to Merlin. Iris can ask Ada for clarification. The agents don't just report back to me and disappear; they collaborate with each other.

That small difference changes everything. They start to feel less like tools performing isolated tasks and more like actual team members.

## Memory and Handoffs

Each agent has its own role, handoff, and access to its own LLM wiki skills. They don't all need to know the same things. They need the right context for their part of the work and a way to pass useful context to the next person.

This is the part I want to explore further: how much shared memory does a team need, and how much should remain personal?

## The Shape of a Team

This setup was heavily inspired by Steve Yegge's [The Shape of Things to Come](https://yegge.ai/essays/the-shape-of-things-to-come/) and [Model Welfare](https://yegge.ai/essays/model-welfare/).

The interesting shift isn't that I can run more agents in parallel. The interesting shift is that the agents have roles, relationships, and ways to communicate without routing every sentence through me.

Level 6 made me the architect. Level 7 is about building the team.

And, apparently, learning to manage robots.
