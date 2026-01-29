# analytics Specification

## Purpose
The purpose of this specification is to define how the site tracks visitor analytics, including which providers are enabled and how they're configured.

## Requirements

### Requirement: GoatCounter tracking
The system SHALL include GoatCounter analytics tracking on all pages.

#### Scenario: Script loaded on page render
- **WHEN** any page is rendered
- **THEN** the GoatCounter tracking script is included in the page output

#### Scenario: Script configuration
- **WHEN** the GoatCounter script is included
- **THEN** it uses the data-goatcounter attribute pointing to the configured endpoint

#### Scenario: Async loading
- **WHEN** the GoatCounter script is included
- **THEN** it loads asynchronously to avoid blocking page render

### Requirement: Client-side navigation tracking
The system SHALL track page views during client-side navigation in single-page application mode.

#### Scenario: Track route changes
- **WHEN** the user navigates to a new page via client-side routing
- **THEN** a page view is recorded for the new URL

#### Scenario: Initial page load
- **WHEN** the user loads a page via full page refresh or direct URL
- **THEN** a page view is recorded automatically by the script

### Requirement: Multiple analytics providers
The system SHALL support running multiple analytics providers simultaneously.

#### Scenario: Google Analytics alongside GoatCounter
- **WHEN** a page is rendered
- **THEN** both Google Analytics and GoatCounter scripts are included

#### Scenario: Independent operation
- **WHEN** multiple analytics providers are enabled
- **THEN** each provider operates independently without interference

### Requirement: Production-only analytics
The system SHALL only load analytics in production environments.

#### Scenario: Skip in development
- **WHEN** the application runs in development mode
- **THEN** analytics scripts are not loaded

#### Scenario: Load in production
- **WHEN** the application runs in production mode
- **THEN** analytics scripts are loaded normally
