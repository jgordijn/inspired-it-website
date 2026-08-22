---
title: "Level 7: The Team Captain"
description: "The next step after becoming the Architect: building a team of AI agents that collaborate like real team members."
date: "2026-08-22"
author: "Jeroen Gordijn"
tags:
  - AI
  - Coding
  - Workflow
  - Tools
cover: /images/ai-coding-team.png
---

# Level 7: The Team Captain

In my [AI Coding Ladder](/blog/the-ai-coding-ladder), Level 6 was **The Architect**. You stop writing the code and start designing what needs to be built. For a long time I didn't know what would come next, but recently I started designing a team, inspired by Steve Yegge's blogs [The Shape of Things to Come](https://yegge.ai/essays/the-shape-of-things-to-come/) and [Model Welfare](https://yegge.ai/essays/model-welfare/). I highly recommend reading those.

## Meet the Team

I use [Pi](https://pi.dev) with the [pi-intercom](https://www.npmjs.com/package/pi-intercom) extension. With pi-intercom, the agents (different sessions) can send each other messages. With this setup I run a small team of agents. Each agent has its own role:

- **Ada** (GPT 5.6 Luna xhigh): team coordinator and orchestrator
- **Athena** (GPT 5.6 Sol Max): architect and researcher
- **Merlin** (GPT 5.6 Sol Medium): software engineer
- **Tyto** (GPT 5.6 Sol Medium): reviewer
- **Iris** (GPT 5.6 Kimi K3): frontend engineer

As Steve suggested, I discussed with each agent what name they wanted. Giving them names changes how you interact with the agents. They come alive (sort of).

## More Than Delegation

Ada is my point of contact. All my communication goes through her. I explain what I want, and she decides what the next step is and who should do it—unless I direct work to someone when I already know what I want.

It may sound like sub-agents, but working with sub-agents feels more directive, like task management. With this setup it becomes a team. Merlin can ask Athena about an architectural decision, while Tyto can review Iris's work. The agents can communicate directly with each other. I've noticed that they help each other without my intervention.

This feels liberating. I get the feeling I can accomplish more and am better supported than before.

## Memory and Handoffs

Each agent has its own role and character, a handoff, skills, and a knowledge base. The character and role are defined in the AGENTS.md. The handoff is the anti-clonking device, as Steve calls it in his blog. It gives the agent the option to wrap up and store information for next time, instead of a rough exit. The [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) allows each agent to collect long-term knowledge, while its skills are either self-developed or imported.

I am still experimenting with this setup and discovering what works and what doesn't. Working with this team already feels very interesting and powerful.

## The Shape of a Team

Bringing agents to life by giving them their own personalities isn't just fun. It really feels like an actual team. I'm stepping out of the loop for some tasks, as Ada knows the goal and helps delegate the work to the right member. Only blocking issues need to come back to me. Small decisions can be made by the team. I'm not there yet, but this is where I'm heading with my team.

Level 6 was about planning and thinking ahead before implementing. This is what the whole team can help me with by combining their knowledge. They collect this knowledge over time. Level 7 feels like managing a team: refining stories together and then having the team implement them. I'm the Team Captain.

This has been working for me for the past week. My next experiment is to make the roster less rigid. Assemble the right team for a goal, instead of a fixed team. Level 7 is about managing a team, let's discover how this team should be created.
