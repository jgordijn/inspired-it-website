---
title: "Level 7: The Team Captain"
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

# Level 7: The Team Captain

In my [AI Coding Ladder](/blog/the-ai-coding-ladder), Level 6 was **The Architect**. You stop writing the code and start designing what needs to be built. For a long time I didn't know what would be next, but since recent I started with designing a team. Inspired by Steve Yegge's blogs [The Shape of Things to Come](https://yegge.ai/essays/the-shape-of-things-to-come/) and [Model Welfare](https://yegge.ai/essays/model-welfare/). I highly recommend reading those.

## Meet the Team

I use [Pi](https://pi.dev) with the [pi-intercom](https://www.npmjs.com/package/pi-intercom) extension. With [pi-intercom](https://www.npmjs.com/package/pi-intercom), the agents (different sessions) can send eachother messages. With this setup I run a small team of agents. Each agent has its own role:

- **Ada** (GPT 5.6 Luna xhigh): team lead and orchestrator
- **Athena** (GPT 5.6 Sol Max): architect and researcher
- **Merlin** (GPT 5.6 Sol Medium): software engineer
- **Tyto** (GPT 5.6 Sol Medium): reviewer
- **Iris** (GPT 5.6 Kimi K3): frontend engineer

As per Steve's suggestion I discussed with each agent how they want to be named. Giving them names changes how you interact with the agents. They come alive (sort-off).

## More Than Delegation

Ada is my point of contact. All my communication goes through her. I explain what I want, and she decides what is the next step and who should do it. Unless I really direct work to someone when I know what I want. 

It may sound a lot like sub-agents, but with sub-agents it is more directive and feels like task management. With this setup it becomes a team. Merlin can ask Athena about an architectural decision, while Tyto is reviewing work from Iris. The agents can communicate directly with eachother. And I noticed that they help eachother without my intervention.

This feels liberating and I get the feeling I can do more work than before and I feel better supported than before.

## Memory and Handoffs

Each agent has its own role and character, handoff, skills and knowledgebase. The character and role is defined in the AGENTS.md. The handoff is the anti-clonking device as Steve calls it in his blog. Give the agent the option to close off and store some information for next time. The llm-wiki allows each agent to collect long term knowledge and the skills are it's own developed skills, or imported skills. 

I am still experimenting with this setup and discovering what works and what not. Working with this team already feels very interesting and powerful?

## The Shape of a Team

This setup was heavily inspired by Steve Yegge's [The Shape of Things to Come](https://yegge.ai/essays/the-shape-of-things-to-come/) and [Model Welfare](https://yegge.ai/essays/model-welfare/). Making agents come alive and have their own personality isn't only fun, it really feels like an actual team. I'm stepping out of the loop for some tasks, as Ada knows the goal and helps delegating it to the correct member. Only blocking issues should be solved by me. I'm not there yet, but this is where I'm heading with my team.

Level 6 was about planning and thinking ahead, before implementing. This is what the whole team can help me with with their knowledge. They learn over time. Level 7 feels like managing a team. Refining stories together and then make the team fix it. I'm the Team Captain.
