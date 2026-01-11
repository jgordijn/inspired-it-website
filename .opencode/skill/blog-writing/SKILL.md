---
name: blog-writing
description: Use when writing new blog posts for the Inspired IT website, reviewing blog content, or generating cover images for blogs
---

# Blog Writing for Inspired IT

## Overview

This skill covers the complete blog writing process for the Inspired IT website, including writing style, frontmatter format, file naming conventions, and cover image generation.

## When to Use

- Writing a new blog post
- Reviewing blog content for tone and style
- Generating cover images for blog posts
- Converting draft blogs to published posts

## Frontmatter Format

Every blog post requires YAML frontmatter at the top:

```yaml
---
title: "The Blog Title"
description: "A compelling 1-2 sentence description for SEO and previews"
date: "YYYY-MM-DD"
author: "Jeroen Gordijn"
tags:
  - Tag1
  - Tag2
cover: /images/cover-image-name.png
---
```

### Required Fields

| Field | Description |
|-------|-------------|
| `title` | The blog title (use quotes if it contains colons or special chars) |
| `description` | SEO description, 1-2 sentences summarizing the post |
| `date` | Publication date in YYYY-MM-DD format |
| `tags` | Array of relevant tags (AI, Kotlin, Java, Tools, Workflow, etc.) |

### Optional Fields

| Field | Description |
|-------|-------------|
| `author` | Defaults to "Jeroen Gordijn" if omitted |
| `cover` | Path to cover image (e.g., `/images/blog-cover.png`) |

## File Naming Convention

**Draft files:** `DRAFT-slug-name.md`
- Example: `DRAFT-my-new-blog.md`

**Published files:** `YYYY-MM-DD-slug-name.md`
- Example: `2026-01-08-my-new-blog.md`

When creating a new blog, always start with a draft file:
  - set publish status in frontmatter to draft with: `publish_status: draft`

When converting a draft to published:
1. Update the `date` field in frontmatter to the publication date
2. Remove the `publish_status` field
3. Rename the file with the date prefix

## Writing Style Guide

### Tone
- **Conversational and personal** - Write as if talking to a peer
- **First-person perspective** - Use "I" throughout
- **Slightly humorous** - Light, accessible tone without being unprofessional
- **Tech enthusiast but grounded** - Passionate about technology without hype

### Structure
- **Short, punchy paragraphs** - 2-4 sentences max
- **Use rhetorical questions** - Engage the reader directly
- **Include specific examples** - Screenshots, dialogues, code snippets where relevant
- **Clear headings** - Break content into scannable sections

### Opening
- Start with a hook: a provocative quote, surprising statement, or relatable problem
- Don't waste words on generic introductions
- Example: `"AI tools don't work," "AI generates junk," "It never does what I want." These are common complaints...`

### Ending
- End with a clear conclusion, reflective question, or thought-provoking statement
- Avoid trailing off or generic calls to action
- Can include remarks/disclaimers as a separate section if needed

### Language
- Avoid jargon unless necessary and explained
- Use contractions naturally (don't, isn't, won't)
- Bold key terms or important phrases sparingly
- Use bullet points for lists, but prose for narrative

### Code Examples
- Use fenced code blocks with language specification
- Keep examples concise and relevant
- Include comments only when necessary

### Internal References
- Link to other blog posts when relevant
- Use relative paths: `/blog/slug-name`
- Example: `[My AI Writes Code](/blog/my-ai-workflow)`

## Blog Writing Process

### 1. Start as Draft
Always create new blogs as drafts:
```
content/blog/DRAFT-topic-name.md
```

### 2. Write Content
Follow the writing style guide above. Structure typically includes:
- Hook/Introduction
- Main content sections (2-5 sections)
- Conclusion or takeaway

### 3. Review
Use the `@blog-reviewer` agent to check:
- Tone consistency
- Grammar and spelling
- Logical flow
- Formatting

### 4. Generate Cover Image
Use the `@cover-image-generator` agent to create a cover image. Provide:
- Blog title
- Brief description of the content
- Key visual themes

### 5. Publish
When ready to publish:
1. Update the `date` field to today's date
2. Add the `cover` field with the image path
3. Rename file: `DRAFT-topic.md` → `YYYY-MM-DD-topic.md`

## Cover Image Guidelines

Cover images for this blog follow a consistent visual style:

### Visual Style
- **Theme:** Futuristic tech aesthetic with blue/purple neon lighting
- **Elements:** AI robots, code screens, digital interfaces, holographic displays
- **Setting:** Modern workspace, server rooms, or abstract tech environments
- **Mood:** Professional but approachable, innovative, forward-looking

### Technical Requirements
- Format: PNG
- Location: `public/images/`
- Naming: kebab-case matching blog topic (e.g., `ai-coding-ladder.png`)

### Example Descriptions for Image Generation
| Blog Topic | Image Description |
|------------|-------------------|
| AI workflow | Developer at multi-monitor setup with floating AI robot assistants, code on screens, blue neon lighting |
| AI coding ladder | Glowing ladder made of code/light with small robots climbing it, holographic UI elements |
| Technical deflation | Hand holding mechanical watch parts with AI/digital code streaming toward robotic hand |
| Java vs Kotlin | Humanoid robot at desk with two code screens showing Java and Kotlin, contemplative pose |
| AI reviewer | Developer at workstation with two AI robots (coder and reviewer) exchanging feedback, blue tech environment |

## Common Tags

Use existing tags when possible:
- `AI` - Artificial intelligence topics
- `Kotlin` - Kotlin language
- `Java` - Java language
- `Tools` - Development tools
- `Workflow` - Development processes
- `OpenCode` - OpenCode specific
- `Claude` - Anthropic Claude
- `GitHub Copilot` - GitHub Copilot
- `Coding` - General coding topics
- `Announcement` - Site announcements

## Examples of Good Style

**Good opening:**
> "If you're using an IDE starting on... I'll give you till January 1st. You're a bad engineer."
> That's a quote from Steve Yegge...

**Good paragraph structure:**
> This is our "Swiss Watch Moment." Remember the quartz crisis? Swiss mechanical watchmakers were craftsmen, proud of their intricate work. Then came quartz—cheaper, faster, more accurate. They were made obsolete almost overnight.

**Good internal reference:**
> This is what I described in [My AI Writes Code. Yours Can Too](/blog/my-ai-workflow).

**Good conclusion:**
> Your clean code repo might be a museum piece. Beautiful, maintainable, and months behind the competition.
