---
title: How does limitRate work in Reactor
description: >-
  An in-depth explanation of the limitRate operator in Project Reactor and how
  it improves performance by batching demand requests.
date: '2022-03-21'
author: Jeroen Gordijn
tags:
  - kotlin
  - reactive
  - reactor
---
[Project Reactor](https://projectreactor.io/) is a great reactive streams project that you will probably run into when you want to write reactive code in Spring. It is very powerful and can also be complex to wrap your head around. In this article I will look at the [`limitRate`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html#limitRate-int-) function of a [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html).

The first time I ran into `limitRate` I thought it would help in limiting/throttling the amount of events flowing downstream. And according to the documentation this is the case:

> Ensure that backpressure signals from downstream subscribers are split into batches capped at the provided `prefetchRate` when propagated upstream, effectively rate limiting the upstream [`Publisher`](https://www.reactive-streams.org/reactive-streams-1.0.3-javadoc/org/reactivestreams/Publisher.html?is-external=true "class or interface in org.reactivestreams").

This means that `limitRate` will split big requests from downstream into smaller requests. It also states that this is effectively rate limiting the publisher.

> Typically used for scenarios where consumer(s) request a large amount of data (eg. `Long.MAX_VALUE`) but the data source behaves better or can be optimized with smaller requests (eg. database paging, etc...). All data is still processed, unlike with [`limitRequest(long)`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html#limitRequest-long-) which will cap the grand total request amount.

According to this documentation it will typically be useful when the requests to upstream is unlimited. The rate limiter can cut this up in smaller pieces. While there might be a usecase for this, I think it is far more useful for rate limiting the number of requests from downstream to upstream.

## To many demand requests

Let's look at a scenario where we want to process messages from PubSub using [Spring](https://googlecloudplatform.github.io/spring-cloud-gcp/3.1.0/reference/html/index.html#reactive-stream-subscriber).

```kotlin

fun process(msg: AcknowledgeablePubsubMessage): Mono<String> = ...

pubSubReactiveFactory.poll("exampleSubscription", 1000 /* not important with limited demand*/)
  .flatMap(::process, 16)
  ...
  .subscribe()
```

In above sample, there will be an initial demand of 16 element going up to the source. The `PubSubReactiveFactory` will request 16 elements from PubSub and send them downstream. Whenever one of the workers in the flatMap is done, it will send a `request(1)` upstream. The `pubSubReactiveFactory` will request one element from PubSub. A fraction later, another demand may reach the source and it needs to do an extra call to pubsub to get 1 extra element. The pipeline is effectively transformed such that it will pull message per message from PubSub. Message handling time is `pull latency + processing time`. Doing a request for just 1 element is very wasteful, certainly when `processing time` is well within the deadline bounds and having a buffer makes sense.

## Limiting number of demand requests

Best way to minimize the impact of pulling messages from a source is make sure we pull more than 1 message per request. This is exactly what `limitRate` can do. It limits the number of demand requests to the source by grouping them together. Internally, `limitRate` has a buffer from which it can feed the consumers downstream, while making sure to fill the buffer in time, by requesting elements from the source. By default, in time means when the buffer is 75% depleted.

When `limitRate(100)` is used, it will first demand 100 elements from the source, to fill the buffer. The moment elements arrive, the `limitRate` can send them downstream as long as there is demand. When the buffer only has 25 elements left (75% depleted), it will request elements 75 elements `request(75)` from the source to fill the buffer.

This makes sure the source can emit batches of events, making the latency overhead much less of an issue. The `limitRate` function is then more of a performance increaser than a throttler.

## Example

Let's create an example to show the impact of `limitRate`. The source in this example can have unlimited outstanding requests and will add a 200ms latency to getting the elements that are requested. Processing take somewhere between 10-15ms.

```kotlin
val start = Instant.now()
val job = Flux.create<Int> { sink ->
  sink.onRequest { demand ->
    scheduler.schedule({
      repeat(demand.toInt()) {
        sink.next(nextInt())
      }
    }, 200, TimeUnit.MILLISECONDS)
  }
}
  .log("demandflow", Level.INFO, SignalType.REQUEST)
  .limitRate(100)
  .flatMap({ nr ->
    Mono.fromCallable { nr.toString() }.delayElement(Duration.ofMillis(nextLong(10, 15)))
  }, 16)
  .subscribeOn(Schedulers.parallel())
  .take(1000)
  .doOnComplete {
    println("Time: ${Duration.between(start, Instant.now())}")
  }
  .subscribe()
```

### Without limitRate

If we start the code above with the line `limitRate(100)` commented, we get the following result:

```
20:46:29.092 [parallel-1 ] INFO  demandflow - request(16)
20:46:29.367 [parallel-3 ] INFO  demandflow - request(1)
20:46:29.367 [parallel-8 ] INFO  demandflow - request(1)
20:46:29.368 [parallel-9 ] INFO  demandflow - request(1)
20:46:29.369 [parallel-1 ] INFO  demandflow - request(1)
20:46:29.369 [parallel-1 ] INFO  demandflow - request(1)
20:46:29.370 [parallel-10] INFO  demandflow - request(3)
20:46:29.370 [parallel-10] INFO  demandflow - request(1)
20:46:29.371 [parallel-2 ] INFO  demandflow - request(1)
20:46:29.371 [parallel-2 ] INFO  demandflow - request(1)
20:46:29.371 [parallel-2 ] INFO  demandflow - request(1)
...
20:46:42.551 [parallel-7 ] INFO  demandflow - request(1)
20:46:42.561 [parallel-10] INFO  demandflow - request(1)
20:46:42.732 [parallel-2 ] INFO  demandflow - request(1)
20:46:42.733 [parallel-3 ] INFO  demandflow - request(1)
20:46:42.735 [parallel-6 ] INFO  demandflow - request(1)
20:46:42.736 [parallel-4 ] INFO  demandflow - request(1)
20:46:42.736 [parallel-5 ] INFO  demandflow - request(1)
20:46:42.737 [parallel-7 ] INFO  demandflow - request(1)
20:46:42.739 [parallel-8 ] INFO  demandflow - request(1)

Time: PT13.752124S
```

After the first 16 elements that were demanded, it wil request mostly 1 at a time. Sometimes multiple request are bundled together. As you can see, processing this took over 13s. When ran with the `limitRate(100)` enable we have a completely different result:

```
20:49:55.068 [parallel-1 ] INFO  demandflow - request(100)
20:49:55.407 [parallel-7 ] INFO  demandflow - request(75)
20:49:55.644 [parallel-4 ] INFO  demandflow - request(75)
20:49:55.884 [parallel-9 ] INFO  demandflow - request(75)
20:49:56.125 [parallel-3 ] INFO  demandflow - request(75)
20:49:56.362 [parallel-8 ] INFO  demandflow - request(75)
20:49:56.601 [parallel-12] INFO  demandflow - request(75)
20:49:56.843 [parallel-12] INFO  demandflow - request(75)
20:49:57.082 [parallel-8 ] INFO  demandflow - request(75)
20:49:57.320 [parallel-8 ] INFO  demandflow - request(75)
20:49:57.560 [parallel-8 ] INFO  demandflow - request(75)
20:49:57.794 [parallel-5 ] INFO  demandflow - request(75)
20:49:58.034 [parallel-9 ] INFO  demandflow - request(75)
20:49:58.270 [parallel-3 ] INFO  demandflow - request(75)

Time: PT3.273889S
```

The first request is 100 to fill the initial buffer and the every so often we'll see a request for 75 elements to fill the buffer. With this configuration the processing took only a bit over 3 seconds. The impact of the 200ms latency is now minimized by requesting batches of elements.

## Conclusion

The `limitRate` function is very useful to limit the number of demand requests flowing upstream. Instead of limiting the number of messages that can be processed by the pipeline, it actually greatly improves the performance. This function has helped me a lot to improve the performance of processing pipelines subscribing to a PubSub source.
