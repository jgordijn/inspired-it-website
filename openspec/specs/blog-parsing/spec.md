# blog-parsing Specification

## Purpose
The purpose of this specification is to define how blog posts are parsed from markdown files. This includes extracting frontmatter metadata, generating slugs, calculating reading time, and filtering draft posts based on environment.

## Requirements

### Requirement: Frontmatter Extraction
The system SHALL extract metadata from YAML frontmatter in blog post markdown files.

#### Scenario: Extract all frontmatter fields
- **WHEN** a markdown file with valid YAML frontmatter is parsed
- **THEN** the system extracts title, description, date, author, tags, cover, and publish_status fields

#### Scenario: Handle missing optional fields
- **WHEN** a frontmatter field is missing
- **THEN** the system uses graceful defaults:
  - title: 'Untitled'
  - description: ''
  - date: current date
  - author: 'Jeroen Gordijn'
  - tags: []
  - cover: null
  - publish_status: null

### Requirement: Slug Generation
The system SHALL generate URL-friendly slugs from markdown filenames.

#### Scenario: Strip date prefix from filename
- **WHEN** a file is named `2025-01-25-my-post-title.md`
- **THEN** the slug is `my-post-title`

#### Scenario: Remove file extension
- **WHEN** a file is named `my-post.md`
- **THEN** the slug does not include the `.md` extension

### Requirement: Reading Time Calculation
The system SHALL calculate estimated reading time for blog posts.

#### Scenario: Calculate reading time at 200 words per minute
- **WHEN** a blog post contains 400 words
- **THEN** the reading time is 2 minutes

#### Scenario: Round up partial minutes
- **WHEN** a blog post contains 250 words
- **THEN** the reading time is 2 minutes (rounded up from 1.25)

### Requirement: Draft Filtering
The system SHALL filter draft posts based on the environment.

#### Scenario: Hide drafts in production
- **WHEN** NODE_ENV is 'production'
- **AND** a post has publish_status: 'draft'
- **THEN** the post is excluded from the blog post list

#### Scenario: Show drafts in development
- **WHEN** NODE_ENV is not 'production'
- **AND** a post has publish_status: 'draft'
- **THEN** the post is included in the blog post list

#### Scenario: Published posts always visible
- **WHEN** a post has publish_status: 'published' or no publish_status
- **THEN** the post is included in the blog post list regardless of environment

### Requirement: Post Sorting
The system SHALL sort blog posts by date.

#### Scenario: Newest posts first
- **WHEN** blog posts are retrieved
- **THEN** they are sorted by date in descending order (newest first)

### Requirement: BlogPost Interface
The system SHALL provide a consistent BlogPost data structure.

#### Scenario: BlogPost contains all required fields
- **WHEN** a blog post is parsed
- **THEN** the BlogPost object contains: slug, title, description, date, author, tags, cover, content (raw markdown), html (rendered), readingTime, and publish_status
