## MODIFIED Requirements

### Requirement: Draft Filtering
The system SHALL filter draft posts based on the `SHOW_DRAFTS` environment variable.

#### Scenario: Hide drafts by default
- **WHEN** `SHOW_DRAFTS` is not set or is not `true`
- **AND** a post has publish_status: 'draft'
- **THEN** the post is excluded from the blog post list

#### Scenario: Show drafts when opted in
- **WHEN** `SHOW_DRAFTS` is `true`
- **AND** a post has publish_status: 'draft'
- **THEN** the post is included in the blog post list

#### Scenario: Published posts always visible
- **WHEN** a post has publish_status: 'published' or no publish_status
- **THEN** the post is included in the blog post list regardless of `SHOW_DRAFTS`

### Requirement: Reusable Draft Check
The system SHALL provide a shared utility function for draft visibility that can be reused by other content types.

#### Scenario: Shared shouldShowDrafts function
- **WHEN** any content parsing module needs to determine draft visibility
- **THEN** it calls a shared `shouldShowDrafts()` function that checks `process.env.SHOW_DRAFTS === 'true'`
