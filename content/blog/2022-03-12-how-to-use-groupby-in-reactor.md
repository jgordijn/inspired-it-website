---
title: How to use groupBy in Reactor
description: >-
  A detailed guide on using the groupBy operator in Reactor, including common
  pitfalls like stream stalling.
date: '2022-03-12'
author: Jeroen Gordijn
tags:
  - Kotlin
  - Reactive
---
# How to use groupBy in Reactor

[Project Reactor](https://projectreactor.io/) is a great reactive streams project that you will probably run into when you want to write reactive code in Spring. It is very powerful and can also be complex to wrap your head around. In this article I will look at the [groupBy](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html#groupBy-java.util.function.Function-) function of a [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html).

## groupBy

The `groupBy` function will split the current flux into multiple fluxes. See it like a router. Based on a function you specify it will route the message to one of the groups. For example, when you you have a stream of numbers and perform `intFlux.groupBy { it % 2 == 0 }` , it will cut the flux in 2 fluxes. One will have a stream of even numbers and the other will have a stream with odd numbers. The resulting type of this groupBy is `Flux<GroupedFlux<Boolean, Int>>`. The outer flux is actually a finite stream of 2 `GroupedFlux<Boolean, Int>` elements. If the source on which the `groupBy` was applied was infinite, the 2 `GroupedFlux` objects are also infinite.

## Processing the groups

Given the above example, there are 2 groups in a flux. Now we can write the logic to be performed on each group. Each `GroupedFlux` can be treated like a regular flux, but with an extra function: `key()`. This key function will return the result of the grouping function for all elements in this group. So in our example `true` for all the even numbers.

There is one little detail which is quite important. We need to make sure that we subscribe to all groups. This sounds trivial, but because it is part of a stream this could easily go wrong.

Let's work with another example in which we divide the numbers in 10 groups: `intFlux.groupBy { it % 10 }`. Each group function will just count how many numbers came through. This is what the `countNumbers` function does with the help of the `increment` function:

```kotlin
val countOccurrences = ConcurrentHashMap<Int, Long>()  

fun increment(group: Int) = countOccurrences.compute(group) { _, k -> (k ?: 0) + 1 }  

fun countNumbers(group: GroupedFlux<Int, Int>): Flux<Int> =  
    group.doOnNext { increment(group.key()) }
```

The `countNumbers` function has to be wired together in the flux with the `groupBy`:

```kotlin
Flux.generate<Int> { it.next(emitCounter.incrementAndGet()) }  
 .groupBy { it % 10 }  
 .flatMap(::countNumbers)  
 .subscribeOn(Schedulers.parallel())  
 .subscribe()
```

Simple enough isn't it. This works and when we inspect the `countOccurrences` every so often we would see something like:

```shell
nrs emited: 6324660 Occurrences per group: 0: 634584, 1: 634802, 2: 634804, 3: 634804, 4: 634805, 5: 634805, 6: 634805, 7: 634805, 8: 634806, 9: 634806
nrs emited: 13912044 Occurrences per group: 0: 1391214, 1: 1391220, 2: 1391221, 3: 1391221, 4: 1391222, 5: 1391222, 6: 1391222, 7: 1391222, 8: 1391223, 9: 1391223
nrs emited: 22109057 Occurrences per group: 0: 2210915, 1: 2210921, 2: 2210935, 3: 2210936, 4: 2210936, 5: 2210937, 6: 2210964, 7: 2210966, 8: 2210966, 9: 2210967
nrs emited: 30416867 Occurrences per group: 0: 3041697, 1: 3041703, 2: 3041704, 3: 3041704, 4: 3041704, 5: 3041704, 6: 3041704, 7: 3041705, 8: 3041705, 9: 3041705
nrs emited: 38748273 Occurrences per group: 0: 3874837, 1: 3874843, 2: 3874844, 3: 3874844, 4: 3874844, 5: 3874844, 6: 3874844, 7: 3874845, 8: 3874845, 9: 3874845
nrs emited: 47157048 Occurrences per group: 0: 4715713, 1: 4715719, 2: 4715720, 3: 4715720, 4: 4715720, 5: 4715720, 6: 4715720, 7: 4715720, 8: 4715721, 9: 4715721
nrs emited: 55470463 Occurrences per group: 0: 5547095, 1: 5547106, 2: 5547107, 3: 5547120, 4: 5547121, 5: 5547121, 6: 5547122, 7: 5547122, 8: 5547122, 9: 5547122
nrs emited: 62455436 Occurrences per group: 0: 6245552, 1: 6245557, 2: 6245557, 3: 6245558, 4: 6245558, 5: 6245558, 6: 6245558, 7: 6245558, 8: 6245558, 9: 6245559
nrs emited: 69543352 Occurrences per group: 0: 6954345, 1: 6954351, 2: 6954351, 3: 6954351, 4: 6954351, 5: 6954352, 6: 6954352, 7: 6954352, 8: 6954352, 9: 6954352
```

The elements are nicely distributed over the groups. Notice that we did not specify an explicit concurrency on the `flatMap`. If it is left out it will default to `Queues.SMALL_BUFFER_SIZE`, which is 256 (unless configured differently). The `groupBy` made it such that we only have a limited amount of groups and as long as the number of groups stay below 256, this will work perfectly.

Let's look at what will happen when we tune the concurrency to be lower than the number of groups:

```kotlin
Flux.generate<Int> { it.next(emitCounter.incrementAndGet()) }  
 .groupBy { it % 10 }  
 .flatMap(::countNumbers, 9)  
 .subscribeOn(Schedulers.parallel())  
 .subscribe()
```

The resulting output is:

```kotlin
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
```

This will continue forever without any progress. The problem is that we have 10 groups, but only 9 workers. Each worker consumes 1 `GroupedFlux`, which means that there will be 1 group remaining without a worker. But why does the stream get stuck?

## No more demand

To understand why the stream grinds to a halt we should look at the demand. You can read more about it in my blog ["Debugging demand in Reactor"](https://inspired-it.nl/2022/03/06/debugging-demand-in-reactor/). After adding the log statements:

```kotlin
fun countNumbers(group: GroupedFlux<Key, Int>): Flux<Int> =  
    group  
 .log("countNumbers", Level.INFO, SignalType.REQUEST, SignalType.ON_SUBSCRIBE, SignalType.ON_NEXT, SignalType.ON_NEXT)  
 .doOnNext { increment(group.key()) }

Flux.generate<Int> { it.next(emitCounter.incrementAndGet()) }  
 .log("groupBy", Level.INFO, SignalType.REQUEST, SignalType.ON_SUBSCRIBE, SignalType.ON_NEXT)
 .groupBy { it % 10 }
 .log("flatMap", Level.INFO, SignalType.REQUEST, SignalType.ON_SUBSCRIBE, SignalType.ON_NEXT)
 .flatMap(::countNumbers, 9)
 .subscribeOn(Schedulers.parallel())  
 .subscribe()
```

The resulting output is like this:

```shell
[groupBy] - onSubscribe([Fuseable] FluxGenerate.GenerateSubscription)
[flatMap] - onSubscribe([Fuseable] FluxGroupBy.GroupByMain)
[subscribe] - onSubscribe(FluxFlatMap.FlatMapMain)
[subscribe] - request(unbounded)
[flatMap] - request(9)
[groupBy] - request(256)
[groupBy] - onNext(1)
[countNumbers-1] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-1] - request(32)
[countNumbers-1] - onNext(1)
[groupBy] - request(1)
[groupBy] - onNext(2)
[countNumbers-2] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-2] - request(32)
[countNumbers-2] - onNext(2)
[groupBy] - request(1)
[groupBy] - onNext(3)
[countNumbers-3] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-3] - request(32)
[countNumbers-3] - onNext(3)
[groupBy] - request(1)
[groupBy] - onNext(4)
[countNumbers-4] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-4] - request(32)
[countNumbers-4] - onNext(4)
[groupBy] - request(1)
[groupBy] - onNext(5)
[countNumbers-5] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-5] - request(32)
[countNumbers-5] - onNext(5)
[groupBy] - request(1)
[groupBy] - onNext(6)
[countNumbers-6] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-6] - request(32)
[countNumbers-6] - onNext(6)
[groupBy] - request(1)
[groupBy] - onNext(7)
[countNumbers-7] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-7] - request(32)
[countNumbers-7] - onNext(7)
[groupBy] - request(1)
[groupBy] - onNext(8)
[countNumbers-8] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-8] - request(32)
[countNumbers-8] - onNext(8)
[groupBy] - request(1)
[groupBy] - onNext(9)
[countNumbers-9] - onSubscribe([Fuseable] FluxGroupBy.UnicastGroupedFlux)
[countNumbers-9] - request(32)
[countNumbers-9] - onNext(9)
[groupBy] - request(1)
[groupBy] - onNext(10)
[groupBy] - onNext(11)
[countNumbers-1] - onNext(11)
[groupBy] - request(1)
[groupBy] - onNext(12)
[countNumbers-2] - onNext(12)
[groupBy] - request(1)
[groupBy] - onNext(13)
[countNumbers-3] - onNext(13)
[groupBy] - request(1)
[groupBy] - onNext(14)
[countNumbers-4] - onNext(14)
[groupBy] - request(1)
[groupBy] - onNext(15)
[countNumbers-5] - onNext(15)
[groupBy] - request(1)
[groupBy] - onNext(16)
[countNumbers-6] - onNext(16)
[groupBy] - request(1)
[groupBy] - onNext(17)
[countNumbers-7] - onNext(17)
[groupBy] - request(1)
[groupBy] - onNext(18)
[countNumbers-8] - onNext(18)
[groupBy] - request(1)
[groupBy] - onNext(19)
...
[countNumbers-8] - onNext(468)
[groupBy] - request(1)
[groupBy] - onNext(469)
[countNumbers-9] - onNext(469)
[groupBy] - request(1)
[groupBy] - onNext(470)
[groupBy] - onNext(471)
[countNumbers-1] - onNext(471)
[countNumbers-1] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(472)
[countNumbers-2] - onNext(472)
[countNumbers-2] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(473)
[countNumbers-3] - onNext(473)
[countNumbers-3] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(474)
[countNumbers-4] - onNext(474)
[countNumbers-4] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(475)
[countNumbers-5] - onNext(475)
[countNumbers-5] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(476)
[countNumbers-6] - onNext(476)
[countNumbers-6] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(477)
[countNumbers-7] - onNext(477)
[countNumbers-7] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(478)
[countNumbers-8] - onNext(478)
[countNumbers-8] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(479)
[countNumbers-9] - onNext(479)
[countNumbers-9] - request(24)
[groupBy] - request(1)
[groupBy] - onNext(480)
[groupBy] - onNext(481)
[countNumbers-1] - onNext(481)
[groupBy] - request(1)
[groupBy] - onNext(482)
[countNumbers-2] - onNext(482)
[groupBy] - request(1)
[groupBy] - onNext(483)
[countNumbers-3] - onNext(483)
[groupBy] - request(1)
[groupBy] - onNext(484)
[countNumbers-4] - onNext(484)
[groupBy] - request(1)
[groupBy] - onNext(485)
[countNumbers-5] - onNext(485)
...
[groupBy] - request(1)
[groupBy] - onNext(2558)
[countNumbers-8] - onNext(2558)
[groupBy] - request(1)
[groupBy] - onNext(2559)
[countNumbers-9] - onNext(2559)
[groupBy] - request(1)
[groupBy] - onNext(2560)
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
nrs emitted: 2560 Occurrences per group: 1: 256, 2: 256, 3: 256, 4: 256, 5: 256, 6: 256, 7: 256, 8: 256, 9: 256
```

The logs give a lot of information about what is going on under the hood. At first the `onSubscribe` event that starts the `Flux` is passed along. Keep in mind that a `Flux` is nothing but a definition until you subscribe, ["nothing happens until you **subscribe**"](https://projectreactor.io/docs/core/release/reference/#_from_imperative_to_reactive_programming). This is called a cold stream. When the subscribe reaches the last element in the stream, the demand will start flowing back.

The `subscribe` has not back-pressure and can handle everything, so it wil request an `unbouded` demand. The `flatMap` has a concurrency of 9, so it will send a demand upstream of 9. Note that this is a demand for 9 elements of type `GroupedFlux<Int>`, so we request 9 groups. The `groupBy` has the default behaviour to request a demand of 256 elements. This will reach the source and the source will start emitting 256 elements (if possible, which it is in this case). These 256 elements will be distributed over the 10 groups that are defined in the grouping function. The output above shows that the first time an element is emitted (`onNext(1)`) it will subscribe to the that group and we immediately see demand flowing.

This shows that the subscription to a `GroupedFlux` only happens once the first element for that group is available. We also see that the first element was dispatched to a group and immediately the `groupBy` will signal new demand upstream. This will happen 8 more times until we reach element 10 which would end up in a `countNumbers-10`, but we do not have a processor for that group. So it will stay in the groupBy, which has a 256 demand, but now 1 element cannot dispatched. Element 11 will be dispatched to group 1 again. Every subflux has a demand of 32 as we can see. The elements will be divided over the active 9 groups, but the elements that are for group 10 will get stuck.

When 3/4 of the demand for a group is fulfilled it will re-signal demand. This is the `request(24)`. The `groupBy` with a buffer of `256` will continuously pass elements downstream when they are available. This will happen a few times until the `groupBy` has 256 elements for group 10 and needs to keep that. The `groupBy` indicated a demand of 256 and now all demand is filled with elements for group 10. There is no more demand and we have full back-pressure. Therefore, the pipeline is now stuck "waiting" for demand for the elements of group 10.

# Conclusion

If you use the `groupBy` function in a `Flux`, you must make sure that there are enough subscribers in the `flatMap`, otherwise your stream will get stuck. To ["Debugging demand in Reactor"](https://inspired-it.nl/2022/03/06/debugging-demand-in-reactor/) the loggin functionality is really helpful. I learned a lot while I was writing this blog and got even more insight into the internals of Reactor.
