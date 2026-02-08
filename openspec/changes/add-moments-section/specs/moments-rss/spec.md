## ADDED Requirements

### Requirement: Generate moments RSS feed
The system SHALL generate an RSS 2.0 feed at `public/moments-rss.xml` during the build process.

#### Scenario: RSS file created at build time
- **WHEN** the static assets generation script runs
- **THEN** a `moments-rss.xml` file is written to the `public/` directory

#### Scenario: No moments available
- **WHEN** there are no published moments
- **THEN** an RSS feed is still generated with an empty channel (no items)

### Requirement: One RSS item per day
The system SHALL create one RSS item for each day that has moments, ordered newest first.

#### Scenario: Day as RSS item
- **WHEN** a moment file exists for a given date
- **THEN** an RSS item is created with the formatted date as the title (e.g., "February 8, 2025")

#### Scenario: Item content
- **WHEN** an RSS item is created for a day
- **THEN** the item's `content:encoded` contains the full rendered HTML of that day's moments

#### Scenario: Item link
- **WHEN** an RSS item is created for a day
- **THEN** the item's link points to `/moments#YYYY-MM-DD` (the date anchor on the moments page)

#### Scenario: Item publication date
- **WHEN** an RSS item is created for a day
- **THEN** the item's `pubDate` is set to the moment's date

### Requirement: RSS feed metadata
The system SHALL include appropriate channel metadata in the moments RSS feed.

#### Scenario: Channel metadata
- **WHEN** the moments RSS feed is generated
- **THEN** the channel includes a title (e.g., "Inspired IT - Moments"), link to the moments page, description, and language

#### Scenario: Self-referencing atom link
- **WHEN** the moments RSS feed is generated
- **THEN** the channel includes an `atom:link` pointing to `moments-rss.xml`

### Requirement: Use BASE_URL for absolute URLs
The system SHALL use the `BASE_URL` environment variable for all URLs in the feed.

#### Scenario: Absolute URLs in content
- **WHEN** the RSS content contains relative URLs (e.g., `/images/...`)
- **THEN** they are converted to absolute URLs using the configured BASE_URL

### Requirement: Exclude draft moments from RSS
The system SHALL exclude moments with `publish_status: draft` from the RSS feed.

#### Scenario: Draft filtering
- **WHEN** a moment has `publish_status: draft`
- **THEN** it is not included in the RSS feed
