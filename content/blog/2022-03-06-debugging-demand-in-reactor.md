---
title: Debugging demand in Reactor
description: >-
  Learn how to use the log function to debug demand flow in Project Reactor and
  understand backpressure behavior.
date: '2022-03-06'
author: Jeroen Gordijn
tags:
  - kotlin
  - reactive
  - reactor
---
# Debugging demand in Reactor

[Project Reactor](https://projectreactor.io/) is a great reactive streams project that you will probably run into when you want to write reactive code in Spring. It is very powerful and can also be complex to wrap your head around. Something that can be confusing is how demand flows upstream and messages flow downstream.

## Getting insight in flow of demand

In any [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) it is possible to show demand by using the `log` function on a flux. With this function you can specify what `SignalType` you want to be logged. Let's look at an example:

```kotlin
val counter = AtomicLong()  

fun process(nr: Long): Mono<Long> =  
    Mono.just(nr).delayElement(Duration.ofMillis(nextLong(1, 25)))  

Flux.generate<Long> { it.next(counter.incrementAndGet()) }  
 .log("beforeFlatmap", Level.INFO, SignalType.REQUEST)  
 .flatMap(::process)  
 .log("beforeTake", Level.INFO, SignalType.REQUEST)  
 .take(100)  
 .log("beforeSubscribe", Level.INFO, SignalType.REQUEST)  
 .subscribeOn(Schedulers.parallel())  
 .subscribe()  

Thread.sleep(4000)  
println("Counter: ${counter.get()}")
```

When run this will print:

```kotlin
13:43:15.197 [parallel-1] INFO beforeSubscribe - request(unbounded)
13:43:15.200 [parallel-1] INFO beforeTake - request(unbounded)
13:43:15.200 [parallel-1] INFO beforeFlatmap - | request(256)
13:43:15.251 [parallel-6] INFO beforeFlatmap - | request(1)
13:43:15.251 [parallel-6] INFO beforeFlatmap - | request(1)
13:43:15.251 [parallel-6] INFO beforeFlatmap - | request(1)
13:43:15.252 [parallel-6] INFO beforeFlatmap - | request(1)
13:43:15.252 [parallel-8] INFO beforeFlatmap - | request(1)
...
13:43:15.260 [parallel-2] INFO beforeFlatmap - | request(4)
13:43:15.260 [parallel-2] INFO beforeFlatmap - | request(12)
13:43:15.260 [parallel-2] INFO beforeFlatmap - | request(2)
13:43:15.261 [parallel-2] INFO beforeFlatmap - | request(6)
13:43:15.261 [parallel-2] INFO beforeFlatmap - | request(7)
13:43:15.261 [parallel-2] INFO beforeFlatmap - | request(3)
13:43:15.261 [parallel-2] INFO beforeFlatmap - | request(2)
13:43:15.262 [parallel-2] INFO beforeFlatmap - | request(3)
13:43:15.262 [parallel-2] INFO beforeFlatmap - | request(3)
13:43:15.262 [parallel-2] INFO beforeFlatmap - | request(1)
Counter: 350
```

The logs we showing the `request` is the demand flowing up (towards the source) and gives us insight in what happens with the demand. The first demand that is sent is when the stream is subscribed to. Remember, demand flows upstream, so in our code bottom to top. The `subscribe` function will always request an `unbounded` amount of events. Next we will reach the `take` function that doesn't change the demand and also sends `unbounded` demand. So up until this point we do not have any back pressure control. Or said differently, these function can keep up with anything upstream may send. Next we will hit the `flatMap`, with it's default concurrency (256). The `flatMap` changes the demand. There are only 256 workers, so it can only process 256 messages at this time. Therefore it signals a demand of 256. This demand will reach the source and the source can now emit 256 elements. When a task in the `flatMap` is done it will not encounter any back pressure, because the demand downstream is `unbounded`. This means, that when a task is done it can immediately emit the message and signal it has new demand, by requesting 1 extra message.

When 100 messages reached the `take` function the stream will be completed. However, in the end we see much more messages were submitted from the source, namely 350. This happens, because everything is happening at the same time. When a task in the `flatMap` is done, it will signal demand by requesting a new element. Therefore it can happen, that there are more messages emitted than the 100 requested.

## Conclusion

Using the `log` on a `Flux` can greatly help in understanding what's going on under the covers. We've seen in above example that even in trivial flows it leads to interesting discoveries.
