---
title: "The Technical Deflation"
description: "Changing code tomorrow is cheaper than writing it today."
date: "2025-12-24"
tags: ["AI", "Programming"]
publish_status: draft
---

# Technical Deflation: Why Your "Clean Code" is a Bad Investment

In an economy, deflation is terrible. When prices drop, consumers will stop spending, because it will be cheaper tomorrow. The economy comes to a halt.

But what if the same logic applied to code? This is what Dan Shapiro describes in his blog [Technical Deflation](https://www.danshapiro.com/blog/2025/12/this-is-a-time-of-technical-deflation/). The cost of producing and modifying code is dropping fast. And it will be even cheaper next month.

For decades, we’ve created code with the following rule in mind: code is read ten times more often than it is written. So we invested heavily in readability. We debated variable names. We refactored until our functions were small and pure. We've gold plated our code, because we take pride in it with the argument that maintaining code is expensive.

That rule is slowly breaking apart.

## The New Math

The technical debt you have today is cheaper to fix than ever. It will even be cheaper tomorrow. If it's not actively slowing you down or causing bugs, why fix it now? You'll pay less later.

And when writing new code, technical debt can be used to your advantage. As Shapiro puts it:

> You are borrowing expensive human hours today, and you will get to pay them back with cheap AI hours tomorrow.

This isn't an excuse for writing garbage. It's a shift in the economics of Software Development. That refactoring sprint that is planned for the weeks of Christmas? That's an investment with a negative return. You're paying premium prices today for maintenance work that will cost pennies in the future.

## The Swiss Watch Moment

We are in the [Quartz crisis](https://en.wikipedia.org/wiki/Quartz_crisis) of Software Development. For centuries, Swiss craftsmen built mechanical movements by hand. Then quartz arrived. The craftsmanship "thought that moving into electronic watches was unnecessary". They were wrong and the Swiss watch industry plunged into a crisis. The handmade watch became a luxury, it didn't tell the time better than a quartz watch. I wrote about this in [2026: The Year the IDE Died](/blog/the-death-of-the-ide). Creating code is becoming a commodity. Your value isn't in writing code anymore. It's in letting correct code be written for you. 

The ["Purist" (Level 0)](/blog/the-ai-coding-ladder) worries about syntax. The "Architect" (Level 6) worries about whether we're solving the right problem.

## The Objections

"AI won't understand my spaghetti code any better that a developer would."

Consider this: Todays AI is the worst you've ever used. They get better every month. And AI can keep on working without getting frustrated. It can hold your entire codebase in context and trace dependencies you forgot existed. The things that make messy code expensive for humans—cognitive load, context-switching, don't apply the same way. If AI starts struggling on the code, because it became too complex, fix it. Spend a few sessions to clean it up. 

"What if we end up with a mess? Developers will need to fix that."

That's reversing and denying the whole point of Technical Deflation. Essentially betting that AI will go away and we will have to start hand coding again. Remember the Watch makers?

The real question isn't whether your code is clean. It's whether your code is *blocking you right now*. If not, move on. The cleanup will be cheaper when you actually need it.

## The Uncomfortable Conclusion

In a deflationary environment, the smartest move is to delay spending. For code, that means: ship the feature, defer the polish, fix problems when they become problems.

This feels wrong. It violates everything we were taught. But the developers that understand this will ship faster. And in a world where code is cheap, the only thing that remains expensive is **time**.

Your clean code repo might be a museum piece—beautiful, maintainable, and months behind the competition.

What do you think? Let me know on LinkedIn.
