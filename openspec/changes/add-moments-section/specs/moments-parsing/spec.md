## ADDED Requirements

### Requirement: Read moment files from content directory
The system SHALL read markdown files from the `content/moments/` directory. Each file SHALL be named `YYYY-MM-DD.md` representing a single day's content.

#### Scenario: Parse valid moment files
- **WHEN** the `content/moments/` directory contains `.md` files
- **THEN** each file is parsed using gray-matter to extract frontmatter and content

#### Scenario: Empty or missing directory
- **WHEN** the `content/moments/` directory does not exist or is empty
- **THEN** an empty array is returned

#### Scenario: Ignore non-markdown files
- **WHEN** the directory contains non-`.md` files
- **THEN** those files are ignored

### Requirement: Extract moment metadata from frontmatter
The system SHALL extract metadata from each moment file's frontmatter.

#### Scenario: Extract date
- **WHEN** a moment file has a `date` field in frontmatter
- **THEN** the date value is used as the moment's date

#### Scenario: Fallback date from filename
- **WHEN** a moment file has no `date` field in frontmatter
- **THEN** the date is derived from the `YYYY-MM-DD` filename pattern

#### Scenario: Extract publish status
- **WHEN** a moment file has a `publish_status` field
- **THEN** the value is used for draft filtering

### Requirement: Render moment content as HTML
The system SHALL render each moment file's markdown content to HTML using markdown-it with HTML enabled and linkify enabled.

#### Scenario: Standard markdown rendering
- **WHEN** a moment file contains markdown content
- **THEN** the content is rendered to HTML with standard markdown features (bold, italic, links, code, lists, images)

### Requirement: Filter draft moments in production
The system SHALL exclude moments with `publish_status: draft` when running in production.

#### Scenario: Hide drafts in production
- **WHEN** `NODE_ENV` is `production`
- **AND** a moment has `publish_status: draft`
- **THEN** that moment is excluded from the results

#### Scenario: Show drafts in development
- **WHEN** `NODE_ENV` is not `production`
- **THEN** all moments are returned, including drafts

### Requirement: Sort moments by date descending
The system SHALL return moments sorted by date with the newest first.

#### Scenario: Multiple moments sorted
- **WHEN** multiple moment files exist with different dates
- **THEN** they are returned in reverse chronological order (newest first)
