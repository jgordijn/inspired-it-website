# deploy-pipeline Specification

## Purpose
The purpose of this specification is to define how the website is deployed to test and production environments via GitHub Actions and local scripts, including environment configuration and approval workflows.

## Requirements

### Requirement: Automatic Deployment on Push
The system SHALL automatically deploy to both test and production environments when code is pushed to the `main` branch, with no manual approval step.

#### Scenario: Push to main triggers full deployment
- **WHEN** code is pushed to the `main` branch
- **THEN** both test and production builds are triggered
- **AND** test is deployed first
- **AND** production is deployed after successful test deployment
- **AND** no manual approval is required at any stage

#### Scenario: Non-main branch push builds only
- **WHEN** code is pushed to a branch other than `main`
- **THEN** builds run for CI validation
- **AND** no deployment occurs

### Requirement: Manual Deployment Trigger
The system SHALL support manual deployment via workflow dispatch.

#### Scenario: Deploy to test only
- **WHEN** a workflow dispatch is triggered with environment "test"
- **THEN** only the test environment is built and deployed

#### Scenario: Deploy to production only
- **WHEN** a workflow dispatch is triggered with environment "production"
- **THEN** only the production environment is built and deployed
- **AND** no manual approval is required

#### Scenario: Deploy to both environments
- **WHEN** a workflow dispatch is triggered with environment "both"
- **THEN** both environments are built and deployed
- **AND** production deploys after successful test deployment

### Requirement: Draft Visibility Per Environment
The system SHALL control draft content visibility via the `SHOW_DRAFTS` environment variable at build time.

#### Scenario: Test build includes drafts
- **WHEN** the test environment is built
- **THEN** `SHOW_DRAFTS=true` is set as a build-time environment variable

#### Scenario: Production build excludes drafts
- **WHEN** the production environment is built
- **THEN** `SHOW_DRAFTS` is NOT set (or is not `true`)

### Requirement: No GitHub Environment Protection on Production
The system SHALL NOT require manual reviewers or approval gates on the production GitHub environment.

#### Scenario: Production environment has no required reviewers
- **WHEN** the production deployment job runs
- **THEN** it proceeds without waiting for manual approval

### Requirement: Clean Build Output
The system SHALL not include debug logging in production build steps.

#### Scenario: No debug echo statements in production build
- **WHEN** the production build step runs
- **THEN** no `DEBUG:` echo statements or diagnostic `grep` commands are present
