# seo Specification

## Purpose
The purpose of this specification is to define SEO functionality including meta tags and structured data. This ensures proper indexing by search engines and rich previews on social media.

## Requirements

### Requirement: Basic Meta Tags
The system SHALL generate essential meta tags for all pages.

#### Scenario: Page title
- **WHEN** a page is rendered
- **THEN** the title tag is set (e.g., "Page Title | Inspired IT")

#### Scenario: Meta description
- **WHEN** a page is rendered
- **THEN** the meta description tag is set

### Requirement: Open Graph Tags
The system SHALL generate Open Graph tags for social sharing.

#### Scenario: OG title
- **WHEN** a page is rendered
- **THEN** og:title is set to the page title

#### Scenario: OG description
- **WHEN** a page is rendered
- **THEN** og:description is set to the page description

#### Scenario: OG URL
- **WHEN** a page is rendered
- **THEN** og:url is set to the canonical page URL

#### Scenario: OG image
- **WHEN** a page has an image (cover or default)
- **THEN** og:image is set to the absolute image URL

#### Scenario: OG type
- **WHEN** a page is rendered
- **THEN** og:type is set (default "website", "article" for blog posts)

### Requirement: Twitter Card Tags
The system SHALL generate Twitter Card tags.

#### Scenario: Twitter card type
- **WHEN** a page is rendered
- **THEN** twitter:card is set to "summary_large_image"

#### Scenario: Twitter title and description
- **WHEN** a page is rendered
- **THEN** twitter:title and twitter:description are set

#### Scenario: Twitter image
- **WHEN** a page has an image
- **THEN** twitter:image is set to the absolute image URL

### Requirement: Canonical URL
The system SHALL set canonical URLs.

#### Scenario: Set canonical link
- **WHEN** a canonical URL is provided
- **THEN** a canonical link tag is included

### Requirement: Robots Meta
The system SHALL support noindex directive.

#### Scenario: Noindex when specified
- **WHEN** noindex is set to true
- **THEN** robots meta tag with "noindex" is included

### Requirement: HTML Escaping
The system SHALL escape HTML in meta content.

#### Scenario: Escape special characters
- **WHEN** title or description contains HTML special characters
- **THEN** they are escaped to prevent injection

### Requirement: Blog Post Structured Data
The system SHALL generate BlogPosting JSON-LD for blog posts.

#### Scenario: BlogPosting schema
- **WHEN** a blog post is rendered
- **THEN** a script tag with type="application/ld+json" containing BlogPosting schema is included

#### Scenario: Include blog post metadata
- **WHEN** BlogPosting schema is generated
- **THEN** it includes headline, description, datePublished, dateModified, author, publisher, and url

#### Scenario: Include image in schema
- **WHEN** a blog post has a cover image
- **THEN** the image URL is included in the schema

#### Scenario: Author schema
- **WHEN** author data is included
- **THEN** it uses @type: Person with name and url

#### Scenario: Publisher schema
- **WHEN** publisher data is included
- **THEN** it uses @type: Organization with name and logo

### Requirement: Organization Structured Data
The system SHALL generate Organization JSON-LD for the site.

#### Scenario: Organization schema
- **WHEN** organization structured data is generated
- **THEN** it includes @type: Organization with name, url, description, and sameAs links

#### Scenario: Social profile links
- **WHEN** organization schema is generated
- **THEN** sameAs includes LinkedIn and GitHub profile URLs

### Requirement: Default Values
The system SHALL provide sensible defaults.

#### Scenario: Default OG image
- **WHEN** no specific image is provided
- **THEN** the default logo.png is used

#### Scenario: Default description
- **WHEN** no description is provided
- **THEN** a default description is used
