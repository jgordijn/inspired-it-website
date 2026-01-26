# blog-listing Specification

## Purpose
The purpose of this specification is to define the blog overview page functionality. This includes displaying blog posts in a list, filtering by tags, searching across post content, and responsive mobile behavior.

## Requirements

### Requirement: Blog Post Display
The system SHALL display blog posts in a list format on the blog overview page.

#### Scenario: Display post cards
- **WHEN** the blog overview page is loaded
- **THEN** each post is displayed as a card showing title, description, date, reading time, and tags

#### Scenario: Show draft badge in development
- **WHEN** a post has publish_status: 'draft'
- **AND** the environment is not production
- **THEN** a yellow "DRAFT" badge is displayed on the card

### Requirement: Tag Filtering
The system SHALL allow filtering blog posts by tag.

#### Scenario: Filter by selected tag
- **WHEN** a user clicks on a tag in the sidebar
- **THEN** only posts containing that tag are displayed

#### Scenario: Show all articles
- **WHEN** "All Articles" is selected
- **THEN** all posts are displayed regardless of tags

#### Scenario: Tag click on card filters list
- **WHEN** a user clicks a tag button on a blog card
- **THEN** the list is filtered to show only posts with that tag
- **AND** the user remains on the blog overview page

### Requirement: Search Functionality
The system SHALL allow searching across blog post content.

#### Scenario: Search by title
- **WHEN** a user enters text in the search field
- **THEN** posts with matching titles are displayed

#### Scenario: Search by description
- **WHEN** a user enters text in the search field
- **THEN** posts with matching descriptions are displayed

#### Scenario: Search by content
- **WHEN** a user enters text in the search field
- **THEN** posts with matching content are displayed

#### Scenario: Combined search and filter
- **WHEN** a user has both a search term and a selected tag
- **THEN** only posts matching both criteria are displayed

### Requirement: Post Count Display
The system SHALL display the count of filtered posts.

#### Scenario: Show total articles
- **WHEN** posts are filtered
- **THEN** the sidebar displays "Total Articles" with the count of matching posts

### Requirement: Mobile Responsive Sidebar
The system SHALL provide a collapsible filter panel on mobile devices.

#### Scenario: Hide sidebar on mobile by default
- **WHEN** the page is viewed on a mobile device (< lg breakpoint)
- **THEN** the search and tag filter sidebar is hidden

#### Scenario: Toggle sidebar visibility
- **WHEN** a user clicks the filter toggle button on mobile
- **THEN** the sidebar expands or collapses

#### Scenario: Show current filter state in toggle
- **WHEN** a tag is selected on mobile
- **THEN** the toggle button displays "Filter: [tag name]"
