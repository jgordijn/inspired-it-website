---
title: Closing the Loop
description: "Why I automate every step of the development process so the only thing left for me is reviewing the proof"
date: "2026-03-16"
tags:
  - AI
  - Coding
  - Workflow
cover: /images/ai-closing-the-loop.png
---

# Closing the Loop

I don't want to test. I don't want to run the app and click around. I don't want to verify that the code compiles. I don't even want to review the code myself. I want my robot to do all of that and then prove to me that it works.

That's the goal. Automate every step of the feedback loop so the only thing left for me as a human is looking at the proof and deciding: is this correct?

## Why Automation Matters

AI agents can generate a lot of code quickly. But without feedback, they'll happily produce code that doesn't compile, fails edge cases, or ignores your standards.

> [!IMPORTANT]
> The agent doesn't know it's wrong unless something tells it.

If I need to tell all errors to the robot, then I am the bottleneck. Every time I need to manually test, manually review, or manually point out issues, I'm slowing the whole process down.

Every time you find yourself doing something again and again, you should ask yourself: "can I delegate this to the robot?". The answer is most definitely: "yes!". The robot is very good at performing repetitive tasks and generating its own feedback.

Compilation fails? The agent sees the error and fixes it. Tests fail? Same thing. Linter complains? It knows immediately. But also think about testing through the browser. Checking if the deployment succeeded when it created a PR on GitHub. This is what I mean by closing the loop.

## The Feedback Stack

There are different gates that need to pass before I consider it worthwhile to really put my own time into it.

**Compilation** is the first gate. If it doesn't compile, nothing else matters. This is mostly out of the box and most agents will automatically do this.

**Static analysis and linting** catch style issues, potential bugs, and deviations from project standards. This should already be part of your build setup.

**Tests** are where the real proof lives. I'm pushing harder and harder for 100% test coverage. This is where you need to nudge the agent into doing this. Make it part of your project's documentation or AGENTS.md.

By driving it to 100% coverage you are sure that all code is covered and thought of. Make sure it doesn't write nonsense tests. Review it and put it in your description.

**Browser testing** takes it further. The agent can use [playwright](https://playwright.dev) or [rodney](https://github.com/simonw/rodney) to control a browser, navigate to pages, take screenshots, and verify that the UI looks right. This catches so many errors before I need to lift a finger.

**Showboat documents** are my recent find and really nice. A [showboat](https://github.com/simonw/showboat) document is an executable markdown file that runs code, captures output, and produces a readable proof of the work. I let the robot build a showboat document to prove to me that the functionality works. Thanks to [Simon Willison](https://simonwillison.net) for creating showboat and rodney.

This is just during the development phase (although the showboat and browser tests can span to deployment). When I create a PR, it is automatically deployed to a test environment, we can continue there:

**Monitor deployments** to verify that the PR will be deployed correctly. Using [showboat](https://github.com/simonw/showboat) again to prove that it works on test. 

**Monitor the PR** for feedback from automatic tools, or team members.

If during any of these steps an issue pops-up, the robot can fix it without me intervening. I do have to figure out how to **Monitor the PR** automatically. Right now I nudge the robot when I see that there is feedback on the PR.

## Code Review Without Me

Even with all that automation, the agent might still miss things. Subtle logic errors, forgotten edge cases, or code that works but violates the project's conventions. That's where I bring in a [reviewer agent](/blog/the-reviewer/). Another model, or the same model, but a fresh session. Its only job is to check if the code is complete, correct and according to our standards. The result of the review is passed to the coding agent to fix the code and resubmit. This cycle runs automatically until the reviewer gives a pass.

I wrote about this in detail in [The Reviewer](/blog/the-reviewer/). 

## What's Left for Me?

I want to get to a stage where I can focus on what really matters: The functionality. Code has become commodity and I should not need to worry about it. When the robot is done, I get:
- Code that compiles and passes linting
- A full test suite that passes
- Screenshots of the UI in action
- A showboat document proving the functionality works
- A code review that's already been addressed

My job is to look at all of this and decide: does this solve the problem? Is the approach sound? That's a much better use of my time than copy pasting errors to the robot. 

## Lean In

When the agent keeps getting something wrong, the temptation is to just fix it yourself. Don't. Instead, figure out why it's failing and automate the check. Can you write a test for it? A reviewer instruction?

Every time you manually correct the agent, you're doing a one-time fix. Every time you automate the feedback, you're fixing it forever.

## Go Slower to Go Faster

Yes, all of this makes each individual task slower. Setting up tests, writing reviewer instructions, configuring browser checks — that's real upfront work. But it pays for itself on the very next task. And the one after that. The compound effect is enormous.

I spent my time crafting the OpenSpec proposal and reviewing the end result. The robot handles the rest. I have become [The Architect](/blog/the-ai-coding-ladder/#level-6-the-architect).

Close the loop. Then let the robot run.
