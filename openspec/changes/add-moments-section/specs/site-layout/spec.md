## MODIFIED Requirements

### Requirement: Desktop Navigation
The system SHALL display navigation links on desktop.

#### Scenario: Show navigation links
- **WHEN** the viewport is >= lg breakpoint
- **THEN** navigation links are displayed: Home, Blog, Moments, About, Contact

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
- **THEN** navigation links are displayed: Home, Blog, Moments, About, Contact

#### Scenario: Close menu on navigation
- **WHEN** a user clicks a link in the mobile menu
- **THEN** the menu closes

### Requirement: Footer
The system SHALL display a footer with links and copyright.

#### Scenario: Quick links section
- **WHEN** the footer is rendered
- **THEN** quick links to Blog, Moments, About, and Contact are displayed

#### Scenario: Social links section
- **WHEN** the footer is rendered
- **THEN** links to LinkedIn and GitHub are displayed

#### Scenario: Copyright notice
- **WHEN** the footer is rendered
- **THEN** a copyright notice with the current year is displayed

#### Scenario: Sitemap and RSS links
- **WHEN** the footer is rendered
- **THEN** links to sitemap.xml, rss.xml, and moments-rss.xml are displayed
