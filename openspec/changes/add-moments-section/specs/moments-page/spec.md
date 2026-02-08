## ADDED Requirements

### Requirement: Moments page at /moments
The system SHALL provide a page at `/moments` that displays all moments grouped by date.

#### Scenario: Page renders with layout
- **WHEN** a user navigates to `/moments`
- **THEN** the page is rendered within the site Layout component with the title "Moments"

#### Scenario: Empty state
- **WHEN** there are no moments to display
- **THEN** a friendly message is shown indicating there are no moments yet

### Requirement: Group moments by date
The system SHALL display moments grouped under date headings, with the newest date first.

#### Scenario: Date headings
- **WHEN** moments exist for multiple dates
- **THEN** each date is displayed as a heading (e.g., "February 8, 2025") with the day's content below it

#### Scenario: Date anchor IDs
- **WHEN** a date group is rendered
- **THEN** the date heading has an `id` attribute matching the ISO date (e.g., `id="2025-02-08"`) for anchor navigation

### Requirement: Render moment content
The system SHALL render each day's HTML content below its date heading.

#### Scenario: Markdown content displayed
- **WHEN** a moment has rendered HTML content
- **THEN** the HTML is displayed with prose styling consistent with the blog

### Requirement: Date navigation sidebar
The system SHALL provide a date navigation sidebar for jumping to specific dates.

#### Scenario: Desktop sidebar
- **WHEN** the viewport is >= lg breakpoint
- **THEN** a sidebar is displayed listing all available dates as anchor links

#### Scenario: Mobile date navigation
- **WHEN** the viewport is < lg breakpoint
- **THEN** the date navigation is displayed above the moments content as a collapsible list

#### Scenario: Click date link
- **WHEN** a user clicks a date in the navigation
- **THEN** the page scrolls to the corresponding date group

### Requirement: Static generation
The system SHALL statically generate the moments page at build time using `getStaticProps`.

#### Scenario: Build-time data fetching
- **WHEN** the site is built
- **THEN** all moments are fetched and passed as props to the page component

### Requirement: SEO metadata
The system SHALL include appropriate SEO metadata for the moments page.

#### Scenario: Page metadata
- **WHEN** the moments page is rendered
- **THEN** the page title, description, and Open Graph tags are set via the Layout component
