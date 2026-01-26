# related-posts Specification

## Purpose
The purpose of this specification is to define the algorithm for finding related blog posts. Related posts are suggested based on shared tags and recency to help readers discover relevant content.

## Requirements

### Requirement: Tag-Based Scoring
The system SHALL score posts based on shared tags with the current post.

#### Scenario: Score by shared tags
- **WHEN** calculating related posts for a post with tags ["AI", "Kotlin"]
- **AND** another post has tags ["AI", "Java"]
- **THEN** that post receives 10 points for the shared "AI" tag

#### Scenario: Multiple shared tags increase score
- **WHEN** calculating related posts for a post with tags ["AI", "Kotlin"]
- **AND** another post has tags ["AI", "Kotlin", "Spring"]
- **THEN** that post receives 20 points (10 per shared tag)

### Requirement: Recency Preference
The system SHALL slightly prefer more recent posts.

#### Scenario: Recent posts have higher scores
- **WHEN** two posts have the same number of shared tags
- **THEN** the more recent post has a slightly higher score

#### Scenario: Tag matching outweighs recency
- **WHEN** an older post has more shared tags than a recent post
- **THEN** the older post ranks higher

### Requirement: Self-Exclusion
The system SHALL exclude the current post from related posts.

#### Scenario: Exclude current post
- **WHEN** calculating related posts for a post
- **THEN** that post is not included in the results

### Requirement: Result Limiting
The system SHALL limit the number of related posts returned.

#### Scenario: Default limit of 3
- **WHEN** related posts are requested without a limit
- **THEN** a maximum of 3 posts are returned

#### Scenario: Custom limit
- **WHEN** related posts are requested with a custom limit
- **THEN** at most that many posts are returned

### Requirement: Ranking Order
The system SHALL return posts in order of relevance score.

#### Scenario: Highest scores first
- **WHEN** related posts are calculated
- **THEN** posts are ordered by descending score (most related first)

### Requirement: Handle No Matches
The system SHALL handle posts with no related content.

#### Scenario: No shared tags
- **WHEN** no other posts share tags with the current post
- **THEN** an empty array is returned
