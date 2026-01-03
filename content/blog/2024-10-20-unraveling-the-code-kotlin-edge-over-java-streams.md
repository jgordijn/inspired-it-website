---
title: 'Unraveling the Code: Kotlin''s Edge Over Java Streams'
description: >-
  A comprehensive comparison of Kotlin vs Java for 7 coding challenges,
  demonstrating Kotlin's superior conciseness and readability.
date: '2024-10-20'
author: Jeroen Gordijn
tags:
  - Java
  - Kotlin
---
# Unraveling the Code: Kotlin's Edge Over Java Streams

This blog is inspired by the Devoxx talk titled "If Streams Are So Great, Let's Use Them Everywhere... Right??" by Maurice Naftalin and José Paumard. You can watch the full talk [here on YouTube](https://www.youtube.com/watch?v=GwKRRsjfBOA). In the talk, Maurice and José explore various examples that highlight the strengths of Java Streams, but also demonstrate how they can become overly complex and verbose in certain situations. In this blog, we will explore these examples and see how we can implement these snippets in Kotlin. Will the Kotlin code be easier, or do we run into the same complexity as with Java?

In this blog, we are going to explore the following examples:

1.  [Finding the First Word Longer Than Three Characters](#example-1-finding-the-first-word-longer-than-three-characters)
2.  [Finding a Word of Length 3 with Its Index](#example-2-finding-a-word-of-length-3-with-its-index)
3.  [Creating the Cross Product of Two Ranges](#example-3-creating-the-cross-product-of-two-ranges)
4.  [Grouping Cities by Country](#example-4-grouping-cities-by-country)
5.  [Finding the Country with the Least Number of Cities](#example-5-finding-the-country-with-the-least-number-of-cities)
6.  [Finding All Countries with the Minimum Number of Cities](#example-6-finding-all-countries-with-the-minimum-number-of-cities)
7.  [Reading and Processing Temperature Data from a File](#example-7-reading-and-processing-temperature-data-from-a-file)

After examining these examples, we'll wrap up with a [conclusion](#conclusion) summarizing our findings.

## Example 1: Finding the First Word Longer Than Three Characters

### Java Code Examples

#### Classical Java Looping

Let's start with a Java snippet that splits a line by spaces and returns the first word longer than three characters using classical Java looping:

```java
String splitLoop(String line) {
     var pattern = Pattern.compile(" ");
     var words = pattern.split(line);
     for (var word : words) {
         if (word.length() > 3) {
             return word;
         }
     }
     throw new NoSuchElementException("No word longer than 3 characters found");
}
```

This snippet demonstrates the traditional imperative approach in Java. It's straightforward but involves several steps: compiling a pattern, splitting the string, looping through the results, and manually throwing an exception if no match is found.

#### Java Streams Version

With Java Streams, we can be more expressive and concise. Here's the same functionality implemented using Streams:

```java
String splitStream(String line) {
    var pattern = Pattern.compile(" ");
    return pattern.splitAsStream(line)
            .filter(word -> word.length() > 3)
            .findFirst()
            .orElseThrow();
}
```

The Streams version is more declarative, clearly stating what we want to achieve rather than how to do it step-by-step.

### Kotlin Implementation

Now, let's see how we can implement the same functionality in Kotlin:

```kotlin
fun splitKotlin(line: String): String {
    return line.split(" ")
        .first { it.length > 3 }
}
```

### Analysis

The Kotlin version demonstrates a more powerful and concise approach compared to both Java implementations. The key to its effectiveness lies in the `first` function, which accepts a lambda to specify precisely what we're looking for. It's worth noting, however, that while this approach is more elegant, the `NoSuchElementException` that would be thrown if no matching word is found is implicit here, unlike the Java versions where the exception handling is more explicit.

## Example 2: Finding a Word of Length 3 with Its Index

For our next example, we'll try to find a word with exactly three characters and return both the word and its index in the original string. This adds a layer of complexity to our previous example.

### Java Implementation

In Java, we'll use a record to represent our result:

```java
record IndexWord(int index, String value) { }
```

#### Classical Java Looping

Here's how we might implement this using a traditional loop:

```java
IndexWord splitLoop(String line) {
    var pattern = Pattern.compile(" ");
    var words = pattern.split(line);
    for (int index = 0; index < words.length; index++) {
        if (words[index].length() == 3) {
            return new IndexWord(index, words[index]);
        }
    }
    throw new NoSuchElementException("Not found");
}
```

This implementation is straightforward, but requires the reader to reason through all paths. The early `return` inside the loop is crucial to understanding the function's behavior.

#### Java Streams Version

To accomplish the same task using Streams, we need a way to index the elements. We can use `IntStream` for this purpose:

```java
IndexWord splitLoop(String line) {
    var pattern = Pattern.compile(" ");
    var words = pattern.split(line);
    return IntStream.range(0, words.length)
            .filter(index -> words[index].length() == 3)
            .mapToObj(index -> new IndexWord(index, words[index]))
            .findFirst()
            .orElseThrow();
}
```

The Java Streams version leverages the `groupingBy` collector, which is specifically designed for such grouping operations. While it's a powerful tool, the syntax can be somewhat convoluted, especially for developers new to Streams. The nesting of collectors (`groupingBy` and `counting`) may not be immediately intuitive.

### Kotlin Implementation

In Kotlin, we use a data class instead of a record:

```kotlin
data class IndexWord(val index: Int, val value: String)
```

The implementation then becomes:

```kotlin
fun splitIndexStream(line: String): IndexWord =
    line.split(" ")
        .withIndex()
        .map { (index, value) -> IndexWord(index, value) }
        .first { it.value.length == 3 }
```

This Kotlin implementation showcases the power and readability of Kotlin's standard library. The `groupBy` function, available on any list, allows for straightforward grouping operations. Following this, the `mapValues` call efficiently counts the items in each group. This approach combines the declarative style seen in Streams with Kotlin's more intuitive syntax, resulting in a concise and easily understandable solution.

### Analysis

This example showcases how different approaches handle grouping operations, a common task in data processing.

Kotlin's implementation stands out for its simplicity and expressiveness. It achieves the grouping and counting in a single, easily readable line of code, without the need for specialized collectors or explicit mutation of a map. This example further demonstrates how Kotlin's design choices and rich standard library can lead to more intuitive and concise code, especially for common operations like grouping and counting.

As we continue to explore these examples, we see a consistent pattern: Kotlin often provides a balance between the clarity of imperative code and the power of functional operations, resulting in solutions that are both expressive and easy to understand.

## Example 3: Creating the Cross Product of Two Ranges

For our next example, we'll create the cross product of two ranges, specifically for the range 0 to 3. This example demonstrates how different approaches handle nested operations.

### Java Implementations

#### Imperative Java Solution

Let's start with the imperative Java solution:

```java
var resultLoop = new ArrayList<Pair>();
for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
        resultLoop.add(new Pair(i, j));
    }
}
```

This imperative approach is straightforward and easily understandable for anyone familiar with Java. It uses nested loops to create all possible pairs of numbers from the given ranges.

#### Java Streams Version

Now, let's look at how we can achieve the same result using Java Streams:

```java
var resultStream = IntStream.range(0, 4)
        .boxed()
        .flatMap(a -> IntStream.range(0, 4)
                .mapToObj(b -> new Pair(a, b)))
        .toList();
```

This Streams version aims to be more declarative, using `flatMap` to combine the results of the inner stream operations. The use of `boxed()` here is crucial. We need to use `boxed()` because we want to `flatMap` the inner stream into the outer stream, where the inner stream has a different type than the outer stream. Specifically, we're going from `int` to `Pair`. But because the outer stream is initially a stream of primitives, this direct mapping is not possible. With `boxed()`, we convert it to a `Stream<Integer>`, changing it from primitives to objects. This allows us to then map to other object types, such as `Pair`.

### Kotlin Implementation

The Kotlin version looks similar to the Java Streams version, but with some notable simplifications:

```kotlin
val result = (0..3)
    .flatMap { i ->
        (0..3)
            .map { j -> Pair(i, j) }
    }
```

### Analysis

This example showcases how different approaches handle more complex operations like creating a cross product. The imperative Java solution, while verbose, is straightforward and easily understood by most Java developers. It clearly shows the nested structure of the operation through its use of nested loops.

The Java Streams version attempts to make the operation more declarative, but introduces some complexity. A key point to note is the use of `boxed()` in this version. This method is necessary because we want to `flatMap` the inner stream into the outer stream, where the inner stream has a different type than the outer stream (from `int` to `Pair`). Since the outer stream is initially a stream of primitives (`IntStream`), this direct mapping is not possible. The `boxed()` method converts the `IntStream` to a `Stream<Integer>`, changing it from a stream of primitives to a stream of objects. This conversion allows us to then map to other object types, such as `Pair`. This necessity for explicit type handling adds a layer of complexity to the Java Streams version.

The Kotlin version strikes a balance between the declarative style of Streams and the simplicity of the imperative approach. It's visually similar to the Java Streams version, but with some key advantages. Kotlin's range operator `..` is more concise than `IntStream.range()`. The Kotlin version also doesn't need `boxed()` as Kotlin handles the type conversion implicitly. Furthermore, the `toList()` call is unnecessary in Kotlin as the result is already a List.

While the Kotlin and Java Streams versions are quite similar in structure, the Kotlin version appears cleaner and more straightforward. It maintains the functional style and declarative nature of the Streams approach, but with less boilerplate and type juggling. This example demonstrates how Kotlin can offer the benefits of functional programming constructs while avoiding some of the verbosity that can creep into Java Streams code.

As we progress through these examples, we continue to see how Kotlin's design choices and standard library can lead to code that is both functional and readable, often simplifying operations that require more verbose handling in Java. Kotlin's ability to handle type conversions implicitly in such scenarios showcases its design philosophy of reducing boilerplate while maintaining type safety.

## Example 4: Grouping Cities by Country

Our next example demonstrates how different approaches handle grouping operations. We'll group a list of cities by their country and count how many cities are in each country.

### Java Implementations

#### Imperative Java Solution

Let's start with the imperative Java solution:

```java
Map<Country, Long> cityCountPerCountry = new HashMap<>();
for (var city : Cities.cities) {
    cityCountPerCountry.merge(city.country(), 1L, Long::sum);
}
```

This imperative approach is clear and straightforward. It iterates through the list of cities, using the `merge` method of `HashMap` to count the occurrences of each country. The only potential downside is the need to mutate the map during the process.

#### Java Streams Version

Now, let's look at how we can achieve the same result using Java Streams:

```java
Map<Country, Long> cityCountPerCountry =
        Cities.cities.stream()
                .collect(
                        Collectors.groupingBy(
                                City::country,
                                Collectors.counting()
                        )
                );
```

The Java Streams version leverages the `groupingBy` collector, which is specifically designed for such grouping operations. While it's a powerful tool, the syntax can be somewhat convoluted, especially for developers new to Streams. The nesting of collectors (`groupingBy` and `counting`) may not be immediately intuitive.

### Kotlin Implementation

Here's how we can implement the same functionality in Kotlin:

```kotlin
val citiesSizeStream = cities.groupBy({ it.country }).mapValues { it.value.size }
```

This Kotlin implementation showcases the power and readability of Kotlin's standard library. The `groupBy` function, available on any list, allows for straightforward grouping operations. Following this, the `mapValues` call efficiently counts the items in each group. This approach combines the declarative style seen in Streams with Kotlin's more intuitive syntax, resulting in a concise and easily understandable solution.

### Analysis

This example showcases how different approaches handle grouping operations, a common task in data processing.

Kotlin's implementation stands out for its simplicity and expressiveness. It achieves the grouping and counting in a single, easily readable line of code, without the need for specialized collectors or explicit mutation of a map. This example further demonstrates how Kotlin's design choices and rich standard library can lead to more intuitive and concise code, especially for common operations like grouping and counting.

As we continue to explore these examples, we see a consistent pattern: Kotlin often provides a balance between the clarity of imperative code and the power of functional operations, resulting in solutions that are both expressive and easy to understand.

## Example 5: Finding the Country with the Least Number of Cities

Our next example demonstrates how to find the country with the least number of cities using different approaches.

### Java Implementations

#### Java Collections Approach

Let's start with the Java Collections approach:

```java
var result = Collections.min(cityCountPerCountry.entrySet(), Map.Entry.comparingByValue());
```

This solution is clear and concise. It directly uses the `Collections.min()` method with a custom comparator. While effective, this approach requires knowledge of specific utility methods in the Collections framework, which might not be immediately obvious to all developers.

#### Java Streams Version

Now, let's look at how we can achieve the same result using Java Streams:

```java
var result = CitiesStream.getCountryLongMap().entrySet()
        .stream()
        .min(Map.Entry.comparingByValue())
        .orElseThrow();
```

The Streams version is more discoverable and arguably easier to understand. It clearly expresses the intent of finding the minimum value from the stream of map entries.

### Kotlin Implementation

Here's how we can implement the same functionality in Kotlin:

```kotlin
val result = citiesSizeStream.minByOrNull { it.value }!!
```

This Kotlin implementation is even more concise. It directly uses the `minByOrNull` function on the map, specifying that we want to find the minimum based on the value of each entry. The `!!` operator is used here to assert that the result is non-null, though in production code, a safer null-handling approach might be preferred.

It's worth noting that we can apply the `minByOrNull` function immediately on the map without calling `entrySet()` first, as would be necessary in Java. This leads to simpler, more discoverable code during development, effectively removing an extra step that's required in the Java versions.

It's also interesting to note an inconsistency in Kotlin's standard library. While we used `first` in earlier examples, which throws a `NoSuchElementException` if the collection is empty, here we use `minByOrNull`. The `min` function is deprecated in favor of `minByOrNull`, even though `firstOrNull` is also available alongside `first`. This inconsistency in the API design is something to be aware of when working with Kotlin collections.

### Analysis

This example highlights different approaches to finding a minimum value in a collection or map.

The Java Collections approach is succinct but requires specific knowledge of utility methods. The Java Streams version offers better discoverability and readability, clearly expressing the operation's intent.

Kotlin's implementation stands out for its brevity. It leverages Kotlin's extension functions on collections, allowing for a very concise expression of the desired operation. However, the inconsistency between `first`/`firstOrNull` and the deprecation of `min` in favor of `minByOrNull` shows that even well-designed languages can have quirks in their APIs.

These implementations demonstrate how different language features and standard library designs can affect the way we express common operations. While all three achieve the same result, they differ in terms of discoverability, conciseness, and the level of language-specific knowledge required.

## Example 6: Finding All Countries with the Minimum Number of Cities

Our previous example had a limitation: it only found one country with the minimum number of cities, but there could be multiple countries with the same minimum. In this example, we'll address this by finding all countries that have the minimum number of cities.

### Java Implementations

#### Imperative Java Approach

Let's start with the imperative Java approach:

```java
var map = new TreeMap<Long, List<Country>>();
for (var countryCount : cityCountPerCountry.entrySet()) {
    // This initial value must be a mutable List, because we add data to it later.
        map.computeIfAbsent(countryCount.getValue(), _ -> new ArrayList<>()).add(countryCount.getKey());
}
var result = map.firstEntry();
```

This solution leverages a `TreeMap`, which keeps its entries sorted by key. We populate this map with the count of cities as the key and a list of countries as the value. The `computeIfAbsent` method is used to initialize a new list if needed and add the country to it. Finally, we retrieve the first entry, which corresponds to the minimum count.

While this code is relatively concise, it can be challenging to ensure it's bug-free due to the use of mutable collections. The logic, involving mutable lists and maps, may not be immediately clear at first glance.

#### Java Streams Version

Now, let's look at the Java Streams approach:

```java
TreeMap<Long, List<Country>> countriesCountPerCity =
        cityCountPerCountry.entrySet()
                .stream()
                .collect(
                        Collectors.groupingBy(
                                Map.Entry::getValue,
                                TreeMap::new,
                                Collectors.mapping(
                                        Map.Entry::getKey,
                                        Collectors.toList()
                                )
                        )
                );
var result = countriesCountPerCity.firstEntry();
```

This Streams version uses a nested collector to group countries by their city count. While it achieves the desired result, the code is quite complex and not easily understandable at a glance. The use of nested collectors (`groupingBy` and `mapping`) makes this solution particularly challenging to write and comprehend, even for developers well-versed in Java Streams.

### Kotlin Implementation

Here's how we can implement the same functionality in Kotlin:

```kotlin
val allMinCities = citiesSizeStream.entries
    .groupBy({ it.value }) { it.key }
    .minByOrNull { it.key }!!
```

The Kotlin implementation stands out for its simplicity and readability. It first groups the entries by their value (city count), transforming the values to be the country. Then it finds the entry with the minimum key (which represents the minimum city count). The result is a pair where the key is the minimum count and the value is a list of all countries with that count.

### Analysis

This example highlights the stark differences between the approaches when dealing with a more complex data manipulation task. The Kotlin version stands out as the most simple and readable, leveraging the language's powerful standard library functions to express a complex operation in just three lines of easily understandable code. This demonstrates Kotlin's ability to maintain clarity and conciseness even as the complexity of the task increases.

## Example 7: Reading and Processing Temperature Data from a File

Our final example demonstrates how to read a file containing temperature data, skip comments, and handle invalid data. The file format looks like this:

```
# temperatures
25.12
1.3
@@@@@@@@@@@@@@@@@
-3.2
```

### Java Implementations

#### Imperative Java Approach

Let's start with the imperative Java approach:

```java
static List<Float> readLoop(Path file) throws IOException {
    try (var reader = Files.newBufferedReader(file)) {
        var floats = new ArrayList<Float>();
        var line = reader.readLine();
        while (line != null) {
            if (!line.startsWith("#")) {
                try {
                    var f = Float.parseFloat(line);
                    floats.add(f);
                } catch (NumberFormatException _) {
                    // Ignoring invalid float lines
                }
            }
            line = reader.readLine();
        }
        return Collections.unmodifiableList(floats);
    }
}
```

This imperative approach handles multiple concerns:

1.  File opening and closing (using try-with-resources)
2.  Line-by-line reading
3.  Skipping comments
4.  Parsing valid floats and ignoring invalid ones
5.  Collecting results in a mutable list
6.  Returning an unmodifiable list

While functional, the code mixes business logic with technical details, making it harder to understand and maintain.

#### Java Streams Version 1

Now, let's look at a Java Streams approach:

```java
static List<Float> readStreamV1(Path file) throws IOException {
    try (var lines = Files.lines(file)) {
        return lines
                .filter(line -> !line.startsWith("#"))
                .filter(line -> {
                    try {
                        var f = Float.parseFloat(line);
                        return true;
                    } catch (NumberFormatException _) {
                        return false;
                    }
                })
                .map(Float::parseFloat)
                .toList();
    }
}
```

This version is more readable, separating the concerns more clearly. However, it still requires try-with-resources for file handling and has a duplicated parsing step.

#### Java Streams Version 2

We can further improve the Streams version using `mapMulti`:

```java
static List<Float> readStreamV2(Path file) throws IOException {
    try (var lines = Files.lines(file)) {
        return lines
                .filter(line -> !line.startsWith("#"))
                .<Float>mapMulti((line, downstream) -> {
                    try {
                        var f = Float.parseFloat(line);
                        downstream.accept(f);
                    } catch (NumberFormatException _) {
                        // Ignoring invalid float lines
                    }
                })
                .toList();
    }
}
```

This version eliminates the duplicate parsing but introduces the more complex `mapMulti` operation.

### Kotlin Implementation

Here's how we can implement the same functionality in Kotlin:

```kotlin
fun readStreamKt(file: Path): List<Float> =
    file.useLines { lines ->
        lines
            .filterNot { it.startsWith("#") }
            .mapNotNull { it.toFloatOrNull() }
            .toList()
    }
```

The Kotlin implementation stands out for its simplicity and readability. It leverages Kotlin's standard library functions to express the complex operation in just a few lines of easily understandable code.

It's crucial to note that the `.toList()` call is inside the `useLines` block. This is very important because `useLines` returns a `Sequence<String>`, which is lazily evaluated. If we were to return the `Sequence<Float>` (by omitting `.toList()` or placing it outside `useLines`), and then try to use it after the `useLines` block has completed, we would get an exception as the underlying file stream would already be closed. By calling `.toList()` inside `useLines`, we ensure that all lines are processed and collected into a list while the file is still open.

### Analysis

This example highlights the stark differences between the approaches when dealing with a complex file processing task involving multiple concerns.

The imperative Java version, while comprehensive, mixes different levels of abstraction, making it harder to understand and maintain. The Java Streams versions improve readability but still require explicit resource management and exception handling.

The Kotlin version shines in its simplicity and expressiveness. It uses `useLines` for automatic resource management, `filterNot` for clear intent in skipping comments, and `mapNotNull` with `toFloatOrNull` to elegantly handle parsing and invalid data. This approach separates concerns effectively and reduces boilerplate, resulting in code that's both concise and easy to understand.

This final example powerfully demonstrates Kotlin's ability to simplify complex operations through its thoughtful standard library design and language features, leading to more maintainable and readable code.

## Conclusion

Throughout this exploration of various coding challenges, from simple string manipulations to complex file processing tasks, we've seen a consistent pattern emerge. Kotlin, in comparison to both imperative Java and Java Streams, consistently demonstrates a remarkable ability to simplify code while maintaining readability and functionality.

Key takeaways from our comparison:

1.  **Simplicity**: Kotlin code generally appears simpler to both read and write. The language's design and standard library functions often allow for more intuitive expressions of complex operations.
    
2.  **Discoverability**: Most, if not all, of the Kotlin APIs we used were easily discoverable through IDE autocompletion. This feature significantly enhances the developer experience, making it easier to explore and utilize the language's capabilities.
    
3.  **Conciseness**: Kotlin solutions were consistently shorter than their Java counterparts. This brevity allows developers to express complex operations in fewer lines of code, potentially reducing the chances of errors and improving maintainability.
    
4.  **Readability**: Despite being more concise, Kotlin code maintains, and often enhances, readability. The language's design choices and expressive syntax allow for code that clearly communicates intent.
    
5.  **Powerful Standard Library**: Kotlin's standard library provides a rich set of functions that make common programming tasks more straightforward. Functions like `groupBy`, `mapNotNull`, and `useLines` demonstrate how well-designed library functions can significantly simplify code.
    
6.  **Balance**: Kotlin seems to strike a good balance between the clarity of imperative code and the power of functional programming constructs, often resulting in solutions that combine the best of both worlds.
    

While Java, especially with the addition of Streams, has made significant strides in enabling more functional and expressive code, Kotlin appears to take this a step further. It offers a language design and standard library that consistently allow for cleaner, more intuitive solutions across a wide range of programming tasks. Notably, while working with Java often requires choosing between imperative and functional styles (as we've seen in cases where imperative code sometimes looks easier than the equivalent Streams version), Kotlin seems to eliminate this dilemma. In Kotlin, the most straightforward and readable solution often naturally combines both paradigms, removing the need for an explicit choice between styles.
