# mermaid-diagrams Specification

## Purpose
The purpose of this specification is to define client-side Mermaid diagram rendering for blog posts. Mermaid diagrams are rendered from code blocks, support theme switching, and include security measures.

## Requirements

### Requirement: Client-Side Rendering
The system SHALL render Mermaid diagrams on the client after page load.

#### Scenario: Find and render diagrams
- **WHEN** the page loads and contains `.mermaid-diagram` elements
- **THEN** each element's content is rendered as an SVG diagram

#### Scenario: Use textContent for diagram code
- **WHEN** reading diagram code from the DOM
- **THEN** textContent is used (which auto-unescapes HTML entities)

### Requirement: Script Loading
The system SHALL load the Mermaid library efficiently.

#### Scenario: Singleton loading
- **WHEN** multiple MermaidDiagram components exist
- **THEN** the Mermaid script is loaded only once

#### Scenario: Self-hosted script
- **WHEN** Mermaid is loaded
- **THEN** it is loaded from `/mermaid.min.js` (self-hosted for security)

#### Scenario: Handle load failure
- **WHEN** the Mermaid script fails to load
- **THEN** all diagram containers show an error message

### Requirement: Theme Support
The system SHALL support light and dark themes based on system preference.

#### Scenario: Detect system theme
- **WHEN** the page loads
- **THEN** diagrams are rendered with the theme matching the system preference (light or dark)

#### Scenario: Theme change listener
- **WHEN** the system color scheme preference changes
- **THEN** all diagrams are re-rendered with the new theme

#### Scenario: Preserve original code for re-rendering
- **WHEN** theme changes
- **THEN** diagrams are re-rendered from the original code (not the SVG)

### Requirement: Security
The system SHALL protect against XSS attacks in diagram output.

#### Scenario: Sanitize SVG output
- **WHEN** Mermaid renders a diagram
- **THEN** the SVG is sanitized using DOMPurify before insertion

#### Scenario: Use strict security level
- **WHEN** Mermaid is initialized
- **THEN** securityLevel is set to 'strict'

### Requirement: Error Handling
The system SHALL handle rendering errors gracefully.

#### Scenario: Show error on render failure
- **WHEN** Mermaid fails to render a diagram
- **THEN** the container shows an accessible error message
- **AND** the container has class `mermaid-error`

#### Scenario: Accessible error messages
- **WHEN** a diagram fails to render
- **THEN** the container has role="alert" and aria-live="polite"

### Requirement: Loading State
The system SHALL indicate loading state before diagrams render.

#### Scenario: Show loading state
- **WHEN** a diagram container exists but hasn't rendered yet
- **THEN** it displays a pulsing loading animation

#### Scenario: Clear loading state after render
- **WHEN** a diagram successfully renders
- **THEN** the container has class `mermaid-rendered` and no loading animation

### Requirement: Unique IDs
The system SHALL generate unique IDs for diagram rendering.

#### Scenario: Generate unique ID per render
- **WHEN** a diagram is rendered
- **THEN** a unique ID is generated using an incrementing counter
