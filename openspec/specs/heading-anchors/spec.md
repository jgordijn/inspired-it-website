# heading-anchors Specification

## Purpose
The purpose of this specification is to define clickable anchor links for blog post headings. These anchors allow users to link directly to specific sections of a post.

## Requirements

### Requirement: ID Generation
The system SHALL generate URL-friendly IDs for headings.

#### Scenario: Slugify heading text
- **WHEN** a heading contains text "My Section Title"
- **THEN** the ID is `my-section-title`

#### Scenario: Handle special characters
- **WHEN** a heading contains special characters like "What's Next?"
- **THEN** they are removed and the ID is `whats-next`

#### Scenario: Handle multiple spaces
- **WHEN** a heading contains multiple consecutive spaces
- **THEN** they are collapsed to a single hyphen

#### Scenario: Strip inline HTML
- **WHEN** a heading contains inline HTML (like code tags)
- **THEN** the HTML is stripped before generating the ID

### Requirement: Heading Level Support
The system SHALL add anchors to headings h2 through h6.

#### Scenario: Process h2-h6 headings
- **WHEN** an h2, h3, h4, h5, or h6 heading is rendered
- **THEN** it receives an ID and anchor link

#### Scenario: Skip h1 headings
- **WHEN** an h1 heading is rendered
- **THEN** it is not modified (h1 is typically the page title)

### Requirement: Anchor Link
The system SHALL add a clickable anchor icon to each heading.

#### Scenario: Add anchor link
- **WHEN** a heading is rendered
- **THEN** an anchor link is appended with class `heading-anchor`

#### Scenario: Anchor href matches ID
- **WHEN** a heading with ID "my-section" is rendered
- **THEN** the anchor link href is `#my-section`

#### Scenario: Accessible label
- **WHEN** an anchor link is rendered
- **THEN** it has aria-label="Link to this section"

### Requirement: Anchor Icon
The system SHALL display an SVG link icon in the anchor.

#### Scenario: Display link icon
- **WHEN** an anchor is rendered
- **THEN** it contains an SVG link icon with class `heading-anchor-icon`

### Requirement: Hover Reveal
The system SHALL reveal anchors on heading hover.

#### Scenario: Hidden by default
- **WHEN** a heading is not hovered
- **THEN** the anchor icon is invisible (opacity 0)

#### Scenario: Show on hover
- **WHEN** a heading is hovered
- **THEN** the anchor icon becomes visible with a smooth transition

#### Scenario: Show on focus
- **WHEN** the anchor link is focused
- **THEN** the anchor icon becomes visible

### Requirement: Scroll Offset
The system SHALL account for sticky header when scrolling to anchors.

#### Scenario: Scroll margin top
- **WHEN** a user clicks an anchor link
- **THEN** the heading is scrolled into view with margin for the sticky header (6rem)
