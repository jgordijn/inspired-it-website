## ADDED Requirements

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
