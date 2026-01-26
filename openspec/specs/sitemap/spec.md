# sitemap Specification

## Purpose
The purpose of this specification is to define XML sitemap generation for the website. The sitemap includes all static pages and published blog posts with appropriate priority values.

## Requirements

### Requirement: Sitemap Format
The system SHALL generate a valid XML sitemap.

#### Scenario: Valid sitemap structure
- **WHEN** the sitemap is generated
- **THEN** it includes proper XML declaration and urlset element with sitemap namespace

### Requirement: Static Page Inclusion
The system SHALL include static pages in the sitemap.

#### Scenario: Include home page
- **WHEN** the sitemap is generated
- **THEN** the home page (BASE_URL) is included

#### Scenario: Include main sections
- **WHEN** the sitemap is generated
- **THEN** /blog, /about, and /contact pages are included

### Requirement: Blog Post Inclusion
The system SHALL include all published blog posts.

#### Scenario: Include blog posts
- **WHEN** the sitemap is generated
- **THEN** each published blog post is included with URL /blog/{slug}

#### Scenario: Exclude draft posts
- **WHEN** a post has publish_status: 'draft'
- **THEN** it is not included in the sitemap

### Requirement: Priority Values
The system SHALL assign appropriate priority values to URLs.

#### Scenario: Home page priority
- **WHEN** the home page is included
- **THEN** priority is 1.0 (highest)

#### Scenario: Section page priority
- **WHEN** section pages (blog, about, contact) are included
- **THEN** priority is 0.8

#### Scenario: Blog post priority
- **WHEN** blog posts are included
- **THEN** priority is 0.7

### Requirement: Last Modified Date
The system SHALL include lastmod for all URLs.

#### Scenario: Static page lastmod
- **WHEN** static pages are included
- **THEN** lastmod is the current date (build date)

#### Scenario: Blog post lastmod
- **WHEN** blog posts are included
- **THEN** lastmod is the post's publication date

### Requirement: URL Generation
The system SHALL generate correct absolute URLs.

#### Scenario: Use BASE_URL
- **WHEN** URLs are generated
- **THEN** they use the BASE_URL environment variable

#### Scenario: Handle trailing slashes
- **WHEN** the home page URL is generated
- **THEN** it is the BASE_URL without trailing slash

#### Scenario: Include route paths
- **WHEN** section pages are generated
- **THEN** the path is appended to BASE_URL (e.g., BASE_URL/blog)
