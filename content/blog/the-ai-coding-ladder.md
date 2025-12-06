---
title: "The AI Coding Ladder"
description: "A look at the different levels of AI."
date: "2025-12-01"
tags: ["AI", "Coding", "Career"]
---

# The AI Coding Ladder

<Intro text description of different levels of AI.> The different levels appeared over the past few years and more might appear in the future. The levels are not fexed and one is not better than the other.

## Level 0: The purist (No AI)

In this level, there is no AI involved. The developer is the only one who writes the code. It's just you, the blinking cursor, and searching Stack overflow for hours. It may feel old fashioned, but until very recently, this was the only way to go. Many people still find pride in crafting code by hand.

* Autonomy: None. You drive 100%
* Context: No AI, so the AI has no context.
* The Upgrade: Total Mastery. You have zero dependencies. You understand exactly how every line works.
* The Frustration: The Blank Canvas. Getting stuck on syntax. Spending 45 minutes searching for a solution to a problem you know is simple. The physical fatigue of typing boilerplate.

## Level 1: The Copy-Paster

In this level, AI is slowly replacing Googling for solutions. The Chat interface of the chosen AI is used to ask questions, or ask for a specific piece of code. The AI will then answer and you can copy paste the code into your project. This is also where many people start using AI. It is stunning to see how a piece of code magically appears in front of you after just a short question. You start to get amazed by the power of AI and afraid for your job. Then you copy the code and paste it into your project to find out that it used non existing functions. This is where people get frustrated.

The AI is not aware of your project and only knows what you tell it. Of course, it has impressive training knowledge, which can help you to find the right solution. Compared to Stackoverflow, it can give a better tailored answer to your problem / question.

* Autonomy: No autonomy. You ask, it answers, you paste.
* Context: Global Knowledge (Zero Local). It knows programming languages perfectly based on internet training data, but it has no idea what your specific variable names or file structures are unless you paste them in.
* The Upgrade: Replacement of the Stack overflow search. You can ask it questions and it will answer them. You have a senior developer with encyclopedic knowledge on speed dial. Great for generic algorithms or learning new syntax.
* The Frustration: Context Switching & Hallucinations. You have to manually bridge the gap between the browser and your IDE. It invents libraries that don't exist. You spend time debugging code that doesn't fit your existing style.

## Level 2: The Autocompleter

Now we incorporate AI into the editor. The editor will predict the next few words, paragraph, or function based on the context of the current file and maybe a few other files you have open in your editor (the "context window"). Sometimes it feels like magic, like the AI is reading your mind. But other times, it creates a big function that looks like something you want, but on closer look is just not it. Refactoring that feels like it is more work than that you would have written it yourself immediately. It is possible to steer it better by starting with comments to indicate to the AI what you want to do next. The upgrade compared to level 1 is that you don't have to switch between your browser and your IDE and copy-paste the result. Completion is also additive only. It will not change existing code.

 * Autonomy: Reactive. It predicts the next few words, paragraph, or function.
 * Context: The Cursor & Open Tabs. It sees the current file and maybe a few other files you have open in your editor (the "context window"). It creates a "bag of words" association.
 * The Upgrade: Flow State. It handles the boring syntax (brackets, semicolons, standard patterns) so you can focus on logic. It reduces physical typing significantly. Compared to level 1, you don't have to switch between your browser and your IDE and copy pasting the result. Code may still be invalid.
 * The Frustration: The "Wait, What?" Effect. You accept a suggestion because it looks right structurally, but later realize this wasn't exactly what you wanted. It used a variable that doesn't exist or hallucinated a method. Depending how much guidance you provided via comments up front, it has little knowledge of your intention.

## Level 3: The Inline Editor (The Helper)

Auto completion can only add code, but with the inline editor, we can select pieces of code and ask the AI to change code. Or ask to create a new function or class. In code completion we needed to write a comment to indicate intent and then remove the comment if it didn't add any value. Now we can instruct the AI immediately and indicate intent. It's also very powerful to be able to ask the AI to refactor a function or class. This feels like a companion you can direct at specific pieces of code. Asking for clarification when code is difficult to understand. Ask for change when you want to refactor/improve a piece of code. The developer is still very deeply involved in every line that gets written. The downside is that the companion sometimes really feels stupid. If you ask it to add a parameter to a function, it will add it perfectly. However, it does not oversee the impact of the change and just adds the parameter, breaking all call sites, or breaking interface.

 * Autonomy: Direct Command. "Refactor this."
 * Context: The Selection & open tabs. With giving an explicit command, you give more context about the intent. What do you want to be changed/implemented. It has a strong understanding of the specific block of code you highlighted and the immediate file structure, allowing for transformation rather than just prediction.
 * The Upgrade: AI knows what you want. Micro-Refactoring Speed. You can highlight a messy function and say "Make this cleaner" or "Add error handling," and it’s done. 
 * The Frustration: It fixes the local function, sometimes breaking the call site. It doesn't see the bigger picture.

## Level 4: The Vibe Coder

In this level we do a step up from the inline editor. We no longer live in a file, but in another dedicated window where we can interact with the AI Agent. With this change, the context of the AI also changes. In the previous level, the AI knew about the open files, but now it can also see the entire codebase. This feels like you got some superpower. Ask for bigger refactoring. Ask for architecture changes. See it all materialize before your eyes. 

It can also go wrong in many occasions. You give a command and the AI will think what it needs to do and happily starts changing your files. If it does the correct thing it is perfect, but if it goes into the wrong direction you end up with a lot of code you don't want. Trying to give a new prompt to steer it in the correct direction may lead into some sort of a doom loop, where you just keep trying, but it never seems to give the right result.

This level also has acces to tools. So it can run commands on your system to build the code, call MCPs to get extra information, or perform an action.

* Autonomy: Multi-step / Task-based. "Rename this model and update all references."
* Context: The Repository. It can "read" your entire codebase, understanding dependencies and project structure.
* The Upgrade: The Force Multiplier. You move from "typing code" to "managing changes." You can perform architectural moves (migrating a library, renaming a core model) across 20 files in minutes.
* The Frustration: The "Blast Radius." If the AI misunderstands the architecture, it sprays bad code across multiple files. Cleaning up a multi-file mess is often harder than doing the work manually.

## Level 5: The Agentic Loop (The Junior Dev)

In this level there is the option for sub-agents and skills. You create context around your Agent, such that it knows not only about your codebase, but also about standards within your organization. For instance, certain frameworks that are used, or how security is organized within your company. What are standards, like commit message format. There is a significant change compared to the previous level, as you get better results that meet your standards. In this level you can ask to add security to an endpoint and it knows how that works in your organization.

 * Autonomy: Iterative / Self-Correcting. It writes, runs, fails, fixes.
 * Context: The Runtime Environment. It doesn't just see code; it sees Tool Outputs. It can read terminal logs, compiler errors, database schemas, and documentation.
 * The Upgrade: Asynchronous Problem Solving. You can give it a vague error ("Fix the memory leak"), and it can investigate, reproduce, and verify the fix on its own.
 * The Frustration: The Infinite Loop. Without perfect instructions (specs), it can get stuck in a loop of trying the same wrong fix over and over, wasting money and time. You have to "manage" it like a very literal intern.


## Level 6: The Architect (Spec-Driven)

In this level we change the role of the developer. We no longer think about how to implement a feature, but what we want to achieve. This is a structured way of working. We start specifying what we want to achieve. Use the AI to investigate what needs to happen and process that into a spec with a plan how to achieve it. 
We lift the whole process to a higher level. By putting a lot of effort into the spec phase, we try to set the AI up for success. We can steer here in the right direction before the AI started changing any line of code. Once we aimed at the goal precisely, we can pull the trigger and let the AI do its job. There are different frameworks to do this, such as GitHub Spec-kit and OpenSpec. I landed on OpenSpec for now.


* Autonomy: Delegated. You define what and structure, AI figures out how.
* Context: The Specification + Repository. It works from a structured document (SPEC.md, AGENTS.md) that captures intent, constraints, and acceptance criteria - combined with codebase awareness. Also provide further context via `skills`, such that the AI can understand certain tools or standards in your company.
* The Upgrade: Thinking at the Right Altitude. You stop context-switching between "what do I want" and "how do I code it." You become a reviewer and course-corrector, not a typist.
* The Frustration: Spec Quality = Output Quality. Garbage spec, garbage code. You discover that writing good specs is a skill - and it's harder than you thought. Also: the AI confidently builds the wrong thing if your spec has gaps.

## Level 7: The Product Owner

This level is not achievable yet. At this moment, we still need developers that can evaluate the result of the AI. When we achieve this level, the AI can continue asking questions for clarification and continue to improve the result. Giving push back on the ideas that are fed to the AI. It can take up the full role of developers and the Product Owner can interact directly with the AI. 

Maybe other levels will pop up, but from this point it is only speculation. 

* Autonomy: Full. Product Owner -> AI -> App.
 * Context: Business & User Value. It understands the intent of the software and the user requirements, not just the code syntax.
 * The Upgrade: Pure Value Creation. Development becomes purely about specifying what you want, not how to build it.
 * The Frustration (Hypothetical): Loss of Control (The Black Box). If the AI builds the whole system, humans may lose the ability to maintain or understand the underlying logic. You become an operator, not a creator.



