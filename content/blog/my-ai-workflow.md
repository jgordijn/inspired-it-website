---
title: "My AI Workflow"
description: "A detailed look into my personal workflow using AI tools to enhance productivity and creativity in my projects."
date: "2025-11-29"
author: "Jeroen Gordijn"
tags: ["AI", "opencode", "claude", "github copilot", "openspec"]
---

"AI tools do not work", "AI tools generate junk", "AI tools do not do what I want"—these are common refrains I hear from developers skeptical about using AI in their workflows. These criticisms are not totally wrong, but they often stem from not using the tools effectively. Over the past months I've put a lot of effort in trying to learn how to use AI tools in my daily work. I want to share my personal AI workflow and how it has transformed the way I work.

## Tools

I've been using different tools, but lately landed on [opencode](https://opencode.ai). This works well for me because it supports different AI models (among GitHub Copilot which I need to use professionally) and is flexible and supports plugins. Privately I use [Claude Code](https://claude.ai) and like the skills they recently added. Luckily Mohammad Alhashemi created a [plugin](https://github.com/malhashemi/opencode-skills) that allows the use of skills in opencode.


## Process

AI tools like opencode, Claude Code, and GitHub Copilot are powerful, but not magic boxes that magically understand what you want. You need to guide them. View them as very smart coders, who have no clue about Software Development. They will happily start coding when you ask them to change something. However, like a hyped puppy, they can get distracted and derail easily. As their manager, we need to give them clear instructions to make sure they follow the right path. 

Trying to use the chat window alone will run into problems, because the context is limited and tools can loose track even if the context is not full. We need to keep this puppy on track. This means we need to be able to start a new conversation and continue where we left off. To be able to do this, we need to write the goal, the tasks and progress to a file.

Before we start implementation, we will create this framework in markdown files.  

You don't have to invent this from scratch. There are frameworks that help you. I've been looking at these two:

- [openspec](https://openspec.dev)
- [Spec-kit](https://github.github.io/spec-kit/)

For now I landed on `openspec` because it is simple and easy to use and more lightweight compared to `spec-kit`. But both are good options and the world in this space is evolving fast, so keep an eye out for new tools.

Some things I'm going to describe may be openspec specific, but the general principles is what matters.

### Making a proposal

We start by creating a new spec file for the feature we want to implement. In openspec this is called a proposal. We can use the command `/openspec-proposal` to create a new proposal, or just ask. In this phase we want to describe what we want to achieve. The more details the better. 

```
/openspec-proposal For JIRA ticket PROJ-1234, we need to to listen to kafka topic Users to store the name and email of every user that get's created. The topic has an Avro schema that we can get from the schema registry at http://schemaregistry:8081/schemas/Users. We need to get the schema and store that in `src/main/avro`. Make sure to generate the classes during the build. Create the new User entity and make sure to persist it for every user we receive. 
```

The instructions for openspec will make it create different markdown files:
- proposal.md
- tasks.md
- design.md (when structural changes are needed)

#### The importance of AGENTS.md

AGENTS.md help the coding agent undertand the codebase. This is a place where you can document important guidelines, architecture decisions, coding styles, and other important information that the coding agent needs to know to do a good job. The more information you can provide here, the better the coding agent can adhere to your standards.

If you have a specific architecture pattern, like ports and adapters, make sure to document it here. Put examples of where to put code and how to structure things. Don't assume the coding agent will figure it out by itself by looking at the codebase. Be explicit.

***I'll leave skills out of this discussion for now. Maybe for a different blog post.***

### Reviewing and Iterating

This is the most important part of the process. The coding agent will create code based on the documents that we created in the previous step. Carefully inspect the documents to understand what the coding agent will do. Is this really what you want? Ask it to make changes. Get it to a state where you are happy and you know that when you would give this to any developer, they would reliably give you the code you want.

### Implementation

In this phase, the coding agent will start implementing the feature based on the specifications outlined in the proposal and design documents. The agent will create the necessary code files, including any new classes, methods, or other structures needed to fulfill the requirements. I usually keep an eye on this, but the moment you need to steer here a lot, it becomes harder and harder. Sometimes you may come to the conclusion that you forgot something during the proposal phase. There are two ways to cope with this:

1. Prompt it to change the proposal and then try to steer it back on track
2. If you're at the beginning of the implementation, throw everything away, change the proposal, and do it again

I mostly find myself following the first path. But if I come to the conclusion that the changes are really big, then I will start again. Change the proposal and start implementing from scratch. During this phase, I'm mostly a reviewer.

In my AGENTS.md. I've said that I wanted to follow test-driven development, and because of that, the agent will usually create tests first and then the code. I'm not strictly following always TDD, so I'm a little bit lenient in the order in which it creates the test in the code as long as I understand the tests and the tests are green in the end, I'm fine with it. 

The coding agents at this point in time are not perfect and, as they are not deterministic machines but probabilistic machines, they will not always follow all instructions. So, I try to stay focused on what it's doing and steer it back on track, having to nudge it sometimes to update the tasks and check again how far we are with implementing the feature. You can take this and say, "Coding agents are not good enough. I will not use them," or "This is just the current state of work, and tomorrow will be better than today." 

### Final Review and Merge

When the coding agent is done, I do a final check on all files that are changed. Do I still see some oddities in the code? Do I see some stuff that I want changed? These are small changes which I just type in the chat to the agent and ask it to make some changes. For big changes, I add a last step. I ask the agent to review its own code. I have a code reviewer agent, with it's own prompt, that I ask to review the current codebase. I also have an agent that focuses on backwards compatibility that I ask to check if he sees any risks in breaking changes. I ask:

```
ask @code-reviewer to review the changes made in this branch and ask the @compatibility-checker to check for any potential backwards compatibility issues. Let them write a report and report their findings back to me.
```


