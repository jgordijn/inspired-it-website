# language-tabs Specification

## Purpose
The purpose of this specification is to define multi-language content tabs for blog posts. Language tabs allow content to be presented in multiple languages (e.g., Dutch and English) with automatic browser language detection.

## Requirements

### Requirement: Tab Container Recognition
The system SHALL recognize `<lang-tabs>` custom elements in blog content.

#### Scenario: Find lang-tabs containers
- **WHEN** the page loads
- **THEN** all `<lang-tabs>` elements are identified for initialization

#### Scenario: Find tab children
- **WHEN** a lang-tabs container is initialized
- **THEN** all direct `<tab>` children are identified

### Requirement: Toggle Button Injection
The system SHALL inject toggle buttons for language selection.

#### Scenario: Create toggle buttons
- **WHEN** a lang-tabs container is initialized
- **THEN** a toggle button is created for each tab's language

#### Scenario: Use tab labels
- **WHEN** a tab has a `label` attribute
- **THEN** that label is used for the button text

#### Scenario: Default to language code
- **WHEN** a tab has no label attribute
- **THEN** the language code (uppercase) is used as the button text

#### Scenario: Prevent duplicate initialization
- **WHEN** a container already has toggle buttons
- **THEN** initialization is skipped

### Requirement: Browser Language Detection
The system SHALL detect the user's preferred language from browser settings.

#### Scenario: Detect Dutch browser
- **WHEN** navigator.language starts with "nl"
- **THEN** Dutch (nl) is the preferred language

#### Scenario: Default to English
- **WHEN** navigator.language does not start with "nl"
- **THEN** English (en) is the preferred language

### Requirement: Initial Language Selection
The system SHALL set the initial tab based on browser preference.

#### Scenario: Use preferred language if available
- **WHEN** the preferred language exists in the tabs
- **THEN** that language tab is initially active

#### Scenario: Fall back to first tab
- **WHEN** the preferred language is not available
- **THEN** the first tab is initially active

### Requirement: Tab Switching
The system SHALL allow users to switch between languages.

#### Scenario: Click to switch
- **WHEN** a user clicks a language toggle button
- **THEN** the corresponding tab becomes active

#### Scenario: Update button state
- **WHEN** a language is selected
- **THEN** the corresponding button has the `active` class

#### Scenario: Hide inactive tabs
- **WHEN** a language is selected
- **THEN** all other tabs are hidden

### Requirement: Tab Synchronization
The system SHALL synchronize language selection across all tab groups.

#### Scenario: Sync all tabs on page
- **WHEN** a user switches language in one tab group
- **THEN** all other tab groups on the page switch to the same language

### Requirement: Styling
The system SHALL apply consistent styling to tabs.

#### Scenario: Active tab styling
- **WHEN** a tab is active
- **THEN** it is displayed with a blue left border and italic text

#### Scenario: Active button styling
- **WHEN** a toggle button is active
- **THEN** it has a blue underline and blue text color
