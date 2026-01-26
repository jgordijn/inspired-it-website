# site-layout Specification

## Purpose
The purpose of this specification is to define the overall site layout including the header, footer, and navigation. The layout wraps all pages and provides consistent branding and navigation.

## Requirements

### Requirement: Page Structure
The system SHALL provide a consistent page structure.

#### Scenario: Flex column layout
- **WHEN** a page is rendered
- **THEN** the layout uses flex column with minimum full viewport height

#### Scenario: Main content grows
- **WHEN** a page has less content than the viewport
- **THEN** the main area expands to push the footer to the bottom

### Requirement: Header
The system SHALL display a sticky header with navigation.

#### Scenario: Sticky header
- **WHEN** the page is scrolled
- **THEN** the header remains fixed at the top

#### Scenario: Logo display
- **WHEN** the header is rendered
- **THEN** the logo and site name "Inspired IT" are displayed

#### Scenario: Logo links to home
- **WHEN** a user clicks the logo
- **THEN** they navigate to the home page

### Requirement: Desktop Navigation
The system SHALL display navigation links on desktop.

#### Scenario: Show navigation links
- **WHEN** the viewport is >= lg breakpoint
- **THEN** navigation links are displayed: Home, Blog, About, Contact

#### Scenario: Show Tools link in development
- **WHEN** NODE_ENV is not 'production'
- **AND** the viewport is >= lg breakpoint
- **THEN** a "Tools" link is displayed pointing to the markdown converter

### Requirement: Mobile Navigation
The system SHALL provide a hamburger menu on mobile.

#### Scenario: Show hamburger button
- **WHEN** the viewport is < lg breakpoint
- **THEN** a hamburger menu button is displayed

#### Scenario: Toggle mobile menu
- **WHEN** a user clicks the hamburger button
- **THEN** the mobile menu expands or collapses

#### Scenario: Mobile menu links
- **WHEN** the mobile menu is open
- **THEN** navigation links are displayed: Home, Blog, About, Contact

#### Scenario: Close menu on navigation
- **WHEN** a user clicks a link in the mobile menu
- **THEN** the menu closes

### Requirement: Footer
The system SHALL display a footer with links and copyright.

#### Scenario: Quick links section
- **WHEN** the footer is rendered
- **THEN** quick links to Blog, About, and Contact are displayed

#### Scenario: Social links section
- **WHEN** the footer is rendered
- **THEN** links to LinkedIn and GitHub are displayed

#### Scenario: Copyright notice
- **WHEN** the footer is rendered
- **THEN** a copyright notice with the current year is displayed

#### Scenario: Sitemap and RSS links
- **WHEN** the footer is rendered
- **THEN** links to sitemap.xml and rss.xml are displayed

### Requirement: Page Title Display
The system SHALL display page titles when provided.

#### Scenario: Show title banner
- **WHEN** a page has a title prop
- **THEN** a gradient banner with the title is displayed

#### Scenario: Show description in banner
- **WHEN** a page has a title and description prop
- **THEN** the description is displayed below the title in the banner

#### Scenario: No banner without title
- **WHEN** a page has no title prop
- **THEN** no banner is displayed

### Requirement: Container Sizing
The system SHALL constrain content width.

#### Scenario: Max width container
- **WHEN** content is rendered
- **THEN** it is contained within a max-w-4xl container with horizontal padding
