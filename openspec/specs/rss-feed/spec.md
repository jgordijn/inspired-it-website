# rss-feed Specification

## Purpose
The purpose of this specification is to define RSS 2.0 feed generation for the blog. The feed includes full post content, cover image enclosures, and proper XML escaping.

## Requirements

### Requirement: RSS 2.0 Format
The system SHALL generate a valid RSS 2.0 feed.

#### Scenario: Valid RSS structure
- **WHEN** the RSS feed is generated
- **THEN** it includes proper XML declaration, rss element with version 2.0, and channel element

#### Scenario: Include content:encoded namespace
- **WHEN** the RSS feed is generated
- **THEN** it includes the content:encoded namespace for full HTML content

#### Scenario: Include Atom namespace
- **WHEN** the RSS feed is generated
- **THEN** it includes the Atom namespace for self-referencing link

### Requirement: Channel Metadata
The system SHALL include channel-level metadata.

#### Scenario: Include channel title
- **WHEN** the RSS feed is generated
- **THEN** the channel title is "Inspired IT - Technical Blog"

#### Scenario: Include channel link
- **WHEN** the RSS feed is generated
- **THEN** the channel link is the BASE_URL

#### Scenario: Include channel description
- **WHEN** the RSS feed is generated
- **THEN** the channel description describes the blog

#### Scenario: Include last build date
- **WHEN** the RSS feed is generated
- **THEN** the lastBuildDate is set to the current date

#### Scenario: Include self-referencing Atom link
- **WHEN** the RSS feed is generated
- **THEN** an atom:link element points to the RSS feed URL

### Requirement: Item Generation
The system SHALL generate an item for each published blog post.

#### Scenario: Include item metadata
- **WHEN** an item is generated
- **THEN** it includes title, link, guid, description, pubDate, and author

#### Scenario: Include full HTML content
- **WHEN** an item is generated
- **THEN** the content:encoded element contains the full HTML content

#### Scenario: Include categories from tags
- **WHEN** a post has tags
- **THEN** each tag is included as a category element

### Requirement: Cover Image Enclosures
The system SHALL include cover images as enclosures.

#### Scenario: Add enclosure for cover image
- **WHEN** a post has a local cover image
- **THEN** an enclosure element is included with url, length, and type

#### Scenario: Calculate file size
- **WHEN** an enclosure is generated
- **THEN** the length attribute is the file size in bytes

#### Scenario: Determine MIME type
- **WHEN** an enclosure is generated
- **THEN** the type attribute is the correct MIME type (image/png, image/jpeg, etc.)

#### Scenario: Skip non-local images
- **WHEN** a cover image is an external URL
- **THEN** no enclosure is included

### Requirement: URL Handling
The system SHALL convert relative URLs to absolute URLs.

#### Scenario: Convert image sources
- **WHEN** content contains relative image URLs (src="/images/...)
- **THEN** they are converted to absolute URLs using BASE_URL

#### Scenario: Convert link hrefs
- **WHEN** content contains relative link URLs (href="/...)
- **THEN** they are converted to absolute URLs using BASE_URL

### Requirement: Content Processing
The system SHALL process content for RSS compatibility.

#### Scenario: Remove first H1
- **WHEN** content starts with an H1 heading
- **THEN** the H1 is removed (it duplicates the item title)

#### Scenario: Prepend cover image
- **WHEN** a post has a cover image
- **THEN** an img tag is prepended to the content for RSS readers

### Requirement: XML Escaping
The system SHALL properly escape XML special characters.

#### Scenario: Escape title and description
- **WHEN** title or description contains &, <, >, ", or '
- **THEN** they are converted to XML entities

#### Scenario: Use CDATA for content
- **WHEN** full HTML content is included
- **THEN** it is wrapped in CDATA to allow HTML passthrough

### Requirement: Draft Exclusion
The system SHALL exclude draft posts from the feed.

#### Scenario: Filter drafts
- **WHEN** the RSS feed is generated
- **THEN** posts with publish_status: 'draft' are excluded

### Requirement: Security
The system SHALL validate cover image paths.

#### Scenario: Reject external URLs
- **WHEN** a cover path is an external URL
- **THEN** it is not included as an enclosure

#### Scenario: Prevent path traversal
- **WHEN** a cover path attempts directory traversal (../)
- **THEN** it is rejected

#### Scenario: Validate within public directory
- **WHEN** a cover path is processed
- **THEN** the resolved path must be within the public directory
