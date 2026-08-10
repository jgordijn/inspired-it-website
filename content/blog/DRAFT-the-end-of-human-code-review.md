---
title: "The End of Human Code Review"
description: "AI makes writing code faster than ever, but human pull-request reviews are becoming the new bottleneck. Here is what needs to replace them."
date: "2026-08-10"
author: "Jeroen Gordijn"
tags:
  - AI
  - Workflow
  - Coding
publish_status: draft
---

# The End of Human Code Review

I wrote earlier that 2026 is [the year the IDE died](/blog/the-death-of-the-ide/). That was the easy prediction. If an agent can write the code, the editor naturally becomes less important.

But there is an awkward follow-up question: **what happens to code review?**

Right now, I can ask an agent to implement something while I make coffee. Then it opens a pull request and the work stops. Not because the computer is busy. Because I am waiting for a colleague to find half an hour between meetings to read a diff.

We have moved the factory to CNC machines and kept the clipboard approval process.

## The New Bottleneck

A traditional review assumes that a human author wrote the code and another human needs to protect the repository from their mistakes. That made sense when typing the implementation was the expensive part.

Now I can have several agents build several approaches in parallel. Frontier models—GPT-5, GPT-6, Sonnet/Opus, and whatever excellent model arrives next—are getting remarkably capable. Smaller and cheaper models will follow. The exact leaderboard matters less than the direction: generated code is improving faster than review capacity.

A pull request can be ready in minutes. Its review might take two days.

And what is the reviewer actually reviewing? Often it is formatting, naming, a missing null check, a test that ought to exist, or an overlooked project convention. Those are important things. They are also exactly the things a machine can check tirelessly and consistently.

The strangest part is that the code itself is becoming an increasingly poor interface for review. An agent may touch twenty files to deliver a tiny behaviour change. Reading every line is not understanding the change; it is archaeology with a deadline.

## I Don't Want a Rubber Stamp

"Skip human review" sounds reckless, so let me be precise. I do not want a bot to approve its own homework and call that quality.

I want **evidence**, not optimism.

A green build is evidence that it compiles. A focused test suite is evidence for particular behaviour. Browser automation and screenshots are evidence that a user can complete a flow. Deployment checks are evidence that the thing survived contact with an actual environment.

None of these prove everything. Neither does a tired human skimming a 900-line diff on a Friday afternoon.

The goal is not to remove scrutiny. It is to move scrutiny from "does this line look sensible?" to "what proves this change is safe and solves the intended problem?"

## Review the Outcome, Not the Diff

This is the pattern I think we need: the agent must deliver a review packet along with the change.

For a small feature, that packet might include:

- the requirement and the acceptance criteria it implemented;
- the tests it added and the results of the full relevant suite;
- static analysis, security and dependency scan results;
- screenshots or an automated browser trace for UI work;
- a concise explanation of important design decisions and risks;
- a deployment verification, when the change reaches a test environment.

Now the human reviewer has something useful to inspect. Not 43 files of generated glue code, but the intended behaviour, the boundaries, and the proof.

This also changes the pull-request description. "Implemented feature X" is not a reviewable statement. "A new customer can complete these three steps; here is the browser recording, the API contract test, the migration plan, and the rollback path" is.

## Independent Agents, Not One Very Confident Agent

The coding agent should not be the only judge. A second, fresh agent should attack the work as a reviewer.

I described this in [The Reviewer](/blog/the-reviewer/): let one model implement, then give another model a clean context, the diff, the requirements and project-specific review rules. It looks for missing cases, unnecessary complexity, dangerous configuration changes and broken assumptions. Findings go back to the implementer. Repeat until the reviewer passes—or escalate when the agents cannot agree.

Using a different model is useful because models have blind spots, just like humans do. The implementer may be Opus while the critic is GPT, or the other way around. A cheaper model can run broad checks; a stronger one can examine risky changes. This is not magic independence, but it is considerably better than asking the same context that made a decision to congratulate itself for making it.

And the review instructions matter. A generic "please review this code" produces generic comments. A project skill can tell the reviewer how to examine database migrations, permissions, infrastructure, public APIs, performance-sensitive code, or a payment flow. That knowledge compounds instead of being rediscovered in every PR comment.

## Close More Loops

This is really the next step of [Closing the Loop](/blog/closing-the-loop/). Every manual comment is a clue that a loop is still open.

Did someone catch a missing authorization check? Add a security test or a reviewer rule. Did someone notice a migration lacks a rollback? Make that a required check. Did a UI regression slip through? Add a browser assertion or visual comparison.

At first, this feels slower. You need to build the skills, test fixtures, deployment checks and agent instructions. But that work is reusable. The next agent gets the feedback immediately, at machine speed, rather than after a colleague eventually notices it.

There will still be moments where a human must stop the line: a high-risk production change, an architectural trade-off, a product decision, a security boundary, or simply a result that feels wrong. But that person should review the decision and the evidence—not every comma in code that will be obsolete after the next prompt.

## The Human Review That Remains

I do not think engineers disappear from the process. I think our review job gets better.

We should ask: did we solve the right problem? Are the acceptance criteria complete? Does this fit the architecture? What could harm customers? Is the evidence convincing? Those questions need context, judgement and accountability. They are also much more valuable than catching a typo in a generated mapper.

Code review was built for a world where humans were the production system. We are becoming the people who design the production system, define its guardrails, and inspect its output.

If agents can build at the speed we keep promising, human diff review cannot remain the toll booth. We need automated proof, independent AI critics, and a human final check focused on consequences.

Otherwise we will have replaced the IDE with an agent—and replaced flow with a queue.
