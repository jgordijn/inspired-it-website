---
title: "Your AI Skills Need a Package Manager"
description: "I built a package manager for AI agent skills. Here's why."
date: "2026-02-08"
author: "Jeroen Gordijn"
cover: "/images/cover-agentdeps.png"
tags:
  - AI
  - Tools
  - Agents
---

# Your AI Skills Need a Package Manager

Every time I start a new project, I have to do some mumbo jumbo to get the correct skills available for my project and client. Copying skills from one project to another, or installing them globally. It's a mess. I want to be able to manage my skills and agents like I manage my code dependencies. 

I play around with different coding agents and I need to do this whole copy-paste-install process every time. Forgetting to copy a skill, and then wondering why the behavior of this new coding agent is different.

[skills.sh](https://skills.sh) is a nice tool to install skills. But there is no management. I have to remember which skills I need to install, and updating only works on global skills. So I decided to build dependency management for agents.

Enter [agentdeps](https://www.npmjs.com/package/agentdeps).

**Agentdeps** allows you to create an `agents.yaml` file in your repo. This file contains the skills and agents you want to use. You can commit this file, just like your pom.xml or requirements.txt, and everyone working with the repo will have the same skills and agents. When you change the file, everyone can update their environment with a single command.

### Adding skills and agents to your repo

With the `add` command you can interactively add skills and agents to your project (or globally). You can select the ones you want and it will create an `agents.yaml` file in your repo. If there is already an `agents.yaml` file, it will update it with the new skills and agents you selected.
 
```
npx agentdeps add vercel-labs/agent-skills
```

Choose your skill (or all):
<img src="/images/installing_skills.png" alt="Select skills" style="max-width: 600px;" />

### Updating

Did the config change, or did you just clone a repo with an `agents.yaml` file? Run `install`.

```
npx agentdeps install
```

### Configuration

On first run, **agentdeps** will ask for some configuration. Mainly, which cloning mechanism to use (https/ssh), and how to install skills and agents (symlink or copy). You can change this configuration at any time. Just run `npx agentdeps config` and it will ask you the configuration questions again.

***We've been managing code dependencies for decades. Why are we still manually wrangling our AI skills? Give [agentdeps](https://www.npmjs.com/package/agentdeps) a try and let me know what you think.***
