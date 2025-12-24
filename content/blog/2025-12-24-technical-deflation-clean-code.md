---
title: "Technical Deflation"
description: "Changing code tomorrow is cheaper than doing it today."
date: "2025-12-24"
tags: ["AI", "Programming"]
cover: /images/technical-deflation.png
---

# Technical Deflation: Why Your "Clean Code" is a Bad Investment

In an economy, deflation is terrible. When prices drop, consumers stop spending because they know things will be cheaper tomorrow. The economy comes to a halt.

But what if the same logic applied to code? This is what Dan Shapiro describes in his blog [Technical Deflation](https://www.danshapiro.com/blog/2025/12/this-is-a-time-of-technical-deflation/). The cost of producing and modifying code is dropping fast. And it will be even cheaper next month.

For decades, we’ve created code with the following rule in mind: *code is read ten times more often than it is written*. So we invested heavily in readability. We debated variable names. We refactored until our functions were small and pure. We've "gold-plated" our code because we take pride in it and argue that the investment is worth it, because maintaining code is expensive.

**That rule is breaking.**

## The New Math

The technical debt you have today is cheaper to fix than ever. It will even be cheaper tomorrow. If it's not actively slowing you down or causing bugs, why fix it now? You'll pay less later.

And when writing new code, technical debt can be used to your advantage. As Shapiro puts it:

> You are borrowing expensive human hours today, and you will get to pay them back with cheap AI hours tomorrow.

This isn't an excuse for writing garbage or [AI-slop](https://en.wikipedia.org/wiki/AI_slop). It's a shift in the economics of software development. If the end-of-year refactoring sprint isn't removing real friction, it's an investment with a negative return. You're paying premium prices today for maintenance work that will cost pennies in the near future. However, the cost of fixing a badly architected data model will deflate slower than code-shape debt like a messy class or naming.

Different types of tech debt deflate at different rates.

## The Swiss Watch Moment

We are in the [Quartz Crisis](https://en.wikipedia.org/wiki/Quartz_crisis) of software development. For centuries, Swiss craftsmen built mechanical movements by hand. Then quartz arrived. Many watchmakers "thought that moving into electronic watches was unnecessary". They were wrong, and the Swiss watch industry plunged into a crisis.

The handmade watch became a luxury. It didn't tell the time any better than a quartz watch.

I wrote about this in [2026: The Year the IDE Died](/blog/the-death-of-the-ide). Creating code is becoming a commodity. The developer's value isn't in writing code anymore. It's in making sure the correct code gets generated.

[The Purist (Level 0)](/blog/the-ai-coding-ladder/#level-0-the-purist-no-ai) worries about syntax. [The Architect (Level 6)](/blog/the-ai-coding-ladder/#level-6-the-architect) is concerned about whether we're solving the right problem.

## The Objections

**"AI won't understand my spaghetti code any better than a developer would."**

Consider this: Today’s AI is the worst you'll ever use. It gets better every month. Messy code is less expensive for an AI agent than for us humans, and the gap is growing. The things that make messy code expensive for humans (cognitive load and context-switching) don't apply to an LLM the same way. *What's messy for us isn't necessarily messy for the AI agent.* But keep in mind that we still pay a price. Missing tests, unclear boundaries, flaky builds, and unstable contracts make both humans and agents slow and error-prone. This is friction which makes you slower and needs to be fixed.

**"What if we end up with a mess? Developers will need to fix that."**

That argument denies the whole point of Technical Deflation. It's essentially betting that AI will go away and we'll have to start hand-coding everything again. Remember the watchmakers?

The real question isn't whether your code is clean. It's whether your code is **blocking you right now.** If not, move on. The cleanup will be cheaper when you actually need it.

## The Uncomfortable Conclusion

In a deflationary environment, the smartest move is to delay spending. For code, that means: **ship the feature, defer the polish, fix problems when they become problems.**

This feels wrong. It violates everything we were taught. But the developers who understand this will ship faster. And in a world where code is cheap, the only thing that remains expensive is **time.**

Your clean code repo might be a museum piece. Beautiful, maintainable, and months behind the competition.

---
*Remarks:*

1. *[Alef Arendsen](https://www.linkedin.com/feed/update/urn:li:activity:7409493456089272320?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7409493456089272320%2C7409501926263898112%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287409501926263898112%2Curn%3Ali%3Aactivity%3A7409493456089272320%29) rightfully pointed out that the terminology in the title is not entirely correct. It's the work that is getting cheaper, not the technology.*
2. *Some people seem to take this blog as an advice to no longer think about the quality of the code. An advice to create a "mess". That's not the point. It's about code getting cheaper, how does that affect our choices?*