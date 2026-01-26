# markdown-rendering Specification

## Purpose
The purpose of this specification is to define the core markdown-to-HTML rendering functionality. This includes syntax highlighting for code blocks, HTML escaping, link processing, and typography enhancements.

## Requirements

### Requirement: Markdown to HTML Conversion
The system SHALL convert markdown content to HTML.

#### Scenario: Convert standard markdown
- **WHEN** markdown content is processed
- **THEN** it is converted to valid HTML using markdown-it

#### Scenario: Enable HTML passthrough
- **WHEN** raw HTML is included in markdown
- **THEN** it is preserved in the output (html: true mode)

### Requirement: Code Syntax Highlighting
The system SHALL apply syntax highlighting to fenced code blocks.

#### Scenario: Highlight known languages
- **WHEN** a code block has a recognized language (e.g., ```kotlin)
- **THEN** syntax highlighting is applied using highlight.js

#### Scenario: Handle unknown languages
- **WHEN** a code block has an unrecognized language
- **THEN** the code is HTML-escaped and rendered without highlighting

#### Scenario: Render without language
- **WHEN** a code block has no language specified
- **THEN** the code is HTML-escaped and rendered in a pre/code block

### Requirement: HTML Escaping
The system SHALL escape HTML special characters in code.

#### Scenario: Escape special characters
- **WHEN** code contains &, <, >, or " characters
- **THEN** they are converted to HTML entities (&amp;, &lt;, &gt;, &quot;)

### Requirement: Link Processing
The system SHALL auto-link URLs in content.

#### Scenario: Auto-link URLs
- **WHEN** a bare URL appears in content
- **THEN** it is automatically converted to a clickable link (linkify: true)

### Requirement: Typography Enhancements
The system SHALL apply typographic improvements.

#### Scenario: Enable typographer mode
- **WHEN** markdown content is processed
- **THEN** typography replacements are applied (smart quotes, dashes, etc.)

### Requirement: Mermaid Code Block Handling
The system SHALL preserve mermaid code blocks for client-side rendering.

#### Scenario: Output mermaid as escaped pre block
- **WHEN** a code block has language "mermaid"
- **THEN** it is rendered as `<pre class="mermaid-diagram">` with escaped content
- **AND** no syntax highlighting is applied

### Requirement: Code Block Styling
The system SHALL apply consistent styling to code blocks.

#### Scenario: Add hljs class
- **WHEN** a code block is rendered
- **THEN** it has the `hljs` class for consistent styling
