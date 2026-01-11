---
title: "Ralph Wiggum: Loop it!"
description: "How a simple Bash script and a clever prompt pattern turned 35 skill reviews into a 30-minute automated session."
date: '2026-01-08'
author: Jeroen Gordijn
cover: /images/ralph-wiggum.png
tags:
  - AI
  - Automation
  - OpenCode
  - Agentic Loops
---

# Ralph Wiggum: Loop it!

I ran an AI agent in a loop and came back to 35 commits. That felt… irresponsible. And also kind of cool.

I've been hearing more and more about "Ralph Wiggum" lately. It's a loop pattern for AI coding assistants, [coined by Geoffrey Huntley](https://ghuntley.com/ralph/). The main idea is to keep pressing forward and create a fresh context for each iteration. Each loop does exactly one thing, then stops. No context bloat. No accumulated confusion.

I was a bit hesitant to try, because I felt safer constantly validating what the AI was doing. I felt comfortable with the "human-in-the-loop" approach. But Geoffrey made a point to put people on the loop, not in the loop. So when I had a repetitive task to do recently, I had a reason to try it out.

## The Problem

I have over 35 skills in my OpenCode setup. But I noticed most of them weren't used much. While looking around the internet, my fellow AI enthusiast [Jeroen Dee](https://www.jeroendee.nl) pointed me towards the [writing-skills](https://github.com/obra/superpowers/tree/main/skills/writing-skills) skill in Jesse Vincent's [Superpowers](https://github.com/obra/superpowers) project. This looked like a very thorough skill with lots of details about making good skills.

I used the skill on a few of my skills and noticed improvements. But doing this manually on 35+ skills? Maybe a good opportunity to try Ralph Wiggum.

## The Prompt

The trick with Ralph Wiggum is designing a prompt that does exactly one thing and then stops. No questions. No waiting for input. Just do the work, commit, and stop. And keep rerunning that same prompt until all work is done.

I deviated a little from the classic pattern. Instead of keeping state in a separate file, I kept the state in the prompt and changed that on every iteration. Here's what I came up with:

```markdown
Take the topmost skill from the list below and do the following:

- Thoroughly review the skill (use the writing-skills skill to learn what "good" looks like).
- Apply all recommendations, even small ones. No questions to the user. Decide what needs to happen. When in doubt think double hard and come up with an answer yourself.
- Remove the skill from the list below and save this file.
- Commit.
- Stop.

When the list below is empty (after the commit), reply with "DONE - STOP RALPH".

Skills:
  - agent-builder
  - convert-plan-to-beads
  - reviewing-skill
  - ...
```

A few important details:

**No questions allowed.** This is crucial. If the AI asks a question, the loop breaks. There's no human watching to answer. The prompt explicitly says "No questions to the user" and "When in doubt think double hard and come up with an answer yourself."

**The "stop" instruction.** This ends the current loop iteration. Without it, the AI might keep going within the same context. Increasing the context increases the risk of the Agent going off the rails.

**"DONE - STOP RALPH"** is the signal that all work is done. The bash script watches for this to know when to exit.

## The Script

With the prompt ready, I needed a way to run it repeatedly. A simple Bash script does the job:

```bash
#!/bin/bash

MAX_ITERATIONS=35
STOP_SIGNAL="DONE - STOP RALPH"

for ((i = 1; i <= MAX_ITERATIONS; i++)); do
    echo "=== Iteration $i of $MAX_ITERATIONS ==="

    output=$(opencode run -m "github-copilot/claude-haiku-4.5" "read and perform @prompt.md" 2>&1 | tee /dev/stderr)

    # Check last 20 lines for stop signal
    if echo "$output" | tail -20 | grep -q "$STOP_SIGNAL"; then
        echo ""
        echo "=== Stop signal detected. Exiting. ==="
        exit 0
    fi

    echo ""
done

echo "=== Reached maximum iterations ($MAX_ITERATIONS). Exiting. ==="
```

The script runs OpenCode with the prompt, captures the output, and checks for the stop signal. When it sees "DONE - STOP RALPH", it exits. Otherwise, it loops again with fresh context.

One important detail: I configured OpenCode to allow all tool use (in Claude Code, the equivalent is the `--dangerously-skip-permissions` flag). The loop needed to run autonomously, without permission prompts breaking the flow.

## The Result

I kicked it off and went to make coffee.

About 30 minutes later, I came back to find all 35+ skills reviewed, improved, and committed. Each iteration handled exactly one skill. Review it, apply the improvements, remove it from the list, commit, stop. Next iteration: fresh context, next skill, repeat.

The git log was 35 clean commits, each one a focused improvement to a single skill.

This sounds risky. If you let your AI agent loose, it's better to run it in a sandbox. But in the end, you will review the result and you can always go back to previous versions. That's the beauty of Git. You can watch the loop going, but you don't need to be involved in it.

We just have to put these machines to work. Do more work for us, so we can do more work. 

## Context Management

The important part is the fresh context. Asking one session to do it all will pollute the context with too much data. At some point the Agent starts to forget or ignore instructions. Keeping your context clean and focused is key for getting better results.

Ralph Wiggum throws all that away. Each iteration starts clean. The AI reads the prompt, does the work, commits, and stops. The next iteration has no memory of the previous one. 

It's like hiring a contractor for one specific job instead of keeping them around for everything. They show up, do their thing well, and leave. No baggage.

## Key Takeaways

The whole thing boils down to: keep it small, keep it deterministic.

If you want to try Ralph Wiggum:

1. **Fresh context per loop.** Each iteration starts clean. This is the core insight.
2. **One task per loop.** Keep things focused and reliable. Don't try to do too much.
3. **No questions.** Design prompts that don't require human interaction. The AI must be able to make all decisions itself.
4. **Clear stop conditions.** Both per-iteration ("stop") and for completion ("DONE - STOP RALPH").

## The Future is On the Loop

With the increasing power of these models, we are heading toward a reality where we are less involved in the actual implementation of our specs. As Geoffrey Huntley put it, we should be **on the loop**, not **in the loop**. We need to learn to let go. Let the agent work and verify the outcome later, instead of hovering over it while it types.

This was my first attempt at the Ralph Wiggum way of working, but it definitely left me wanting more. I want to spend my time thinking about *what* needs to be done, and let the AI handle the execution.

Let the robot do the heavy lifting. I have other things to do.

Now I'm wondering: what else am I still doing manually just because it feels safer?
