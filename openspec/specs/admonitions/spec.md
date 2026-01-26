# admonitions Specification

## Purpose
The purpose of this specification is to define GFM-style admonition/callout boxes for blog posts. Admonitions are used to highlight important information like notes, tips, warnings, and cautions.

## Requirements

### Requirement: Admonition Syntax
The system SHALL recognize GFM-style admonition syntax in blockquotes.

#### Scenario: Recognize admonition types
- **WHEN** a blockquote starts with [!TYPE] where TYPE is NOTE, TIP, INFO, WARNING, IMPORTANT, or CAUTION
- **THEN** it is converted to an admonition block

#### Scenario: Case insensitive matching
- **WHEN** a blockquote uses [!note] or [!NOTE] or [!Note]
- **THEN** all variations are recognized as a NOTE admonition

### Requirement: Custom Titles
The system SHALL support optional custom titles for admonitions.

#### Scenario: Use custom title
- **WHEN** text follows the [!TYPE] marker (e.g., "[!NOTE] Custom Title")
- **THEN** that text is used as the admonition title

#### Scenario: Default to type name
- **WHEN** no text follows the [!TYPE] marker
- **THEN** the capitalized type name is used as the title (e.g., "Note")

### Requirement: Type-Specific Styling
The system SHALL apply distinct visual styling for each admonition type.

#### Scenario: NOTE styling
- **WHEN** a NOTE admonition is rendered
- **THEN** it has a gray border and neutral styling

#### Scenario: TIP styling
- **WHEN** a TIP admonition is rendered
- **THEN** it has a green border and success styling

#### Scenario: INFO styling
- **WHEN** an INFO admonition is rendered
- **THEN** it has a blue border and informational styling

#### Scenario: WARNING styling
- **WHEN** a WARNING admonition is rendered
- **THEN** it has a yellow/orange border and caution styling

#### Scenario: IMPORTANT and CAUTION styling
- **WHEN** an IMPORTANT or CAUTION admonition is rendered
- **THEN** it has a red border and alert styling

### Requirement: Icon Display
The system SHALL display a type-appropriate icon in admonition titles.

#### Scenario: Render SVG icon
- **WHEN** an admonition is rendered
- **THEN** an SVG icon matching the type is displayed before the title

### Requirement: Content Preservation
The system SHALL preserve the content following the admonition marker.

#### Scenario: Render content after title line
- **WHEN** an admonition has content after the [!TYPE] line
- **THEN** that content is rendered inside the admonition body

#### Scenario: Remove marker from content
- **WHEN** an admonition is rendered
- **THEN** the [!TYPE] marker is not visible in the output

### Requirement: HTML Structure
The system SHALL generate a consistent HTML structure for admonitions.

#### Scenario: Generate semantic structure
- **WHEN** an admonition is rendered
- **THEN** it produces:
  - A div with class `admonition admonition-{type}`
  - A div with class `admonition-title` containing the icon and title
  - A div with class `admonition-content` containing the body
