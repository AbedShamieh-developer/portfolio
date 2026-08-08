# Engineering Systems

Build an Award-Level Interactive Software Engineer Portfolio

Act as a world-class UI/UX designer, creative developer, frontend architect, motion designer, and digital art director.

Design and build a production-ready personal portfolio for Abdulrahman Shamieh, a Computer Science graduate and Backend/Software Engineer specializing in building backend systems, APIs, serverless architectures, AWS cloud solutions, logging/observability systems, and CI/CD automation.

This must NOT look like a generic developer portfolio, résumé template, Bootstrap website, SaaS landing page, or collection of cards.

I want the reaction to be:

“This person clearly thinks like an engineer, but someone also cared deeply about the experience.”

The site should feel like an interactive engineering system that gradually reveals Abdulrahman's story.

Core Identity

The visual identity should communicate:

Backend Engineering × Cloud Architecture × Systems Thinking × Precision × Curiosity

Abdulrahman enjoys solving problems and transforming complex requirements into systems that are clean, reliable, maintainable, and built to last.

His work includes:

Backend engineering

TypeScript

JavaScript

Node.js

Express

Python

AWS

REST APIs

AWS Lambda

API Gateway

Amazon Cognito

CloudWatch

Amazon Data Firehose

Amazon S3

IAM

GitHub Actions

CI/CD architecture

OIDC authentication

Serverless architecture

Logging and observability

Multi-account and multi-region AWS systems

Software architecture and technical documentation

He graduated in Computer Science with a 3.89 GPA, consistently earned a place on the Honor List, has leadership experience through university activities, and has professional backend/cloud engineering experience.

His target identity is:

Backend Engineer / Software Engineer

Do not portray him as a student looking for his first opportunity.

Portray him as an early-career engineer who has already worked on serious engineering problems and is ready to take ownership.

Technology

Use a modern production stack:

Next.js 16 with App Router

React 19.2

TypeScript

Tailwind CSS 4.3

Motion for React

React Three Fiber / Three.js only where the 3D interaction genuinely improves the experience

Drei where useful

WebGL shaders only for subtle premium effects

SVG animations

CSS transforms and modern CSS features

Server Components by default

Client Components only where interaction requires them

React Compiler compatible architecture

Optimized next/image assets

next/font

Semantic HTML

Strong metadata / OpenGraph / SEO

Accessible components

Responsive architecture

Excellent Lighthouse performance

Do not introduce a huge dependency stack merely to create visual effects.

Prefer GPU-friendly transforms, opacity, SVG, Canvas and WebGL over expensive DOM animation.

Creative Direction

Create a visual language inspired by:

distributed systems + cloud infrastructure + command centers + architecture diagrams + observability interfaces + premium editorial design

But do NOT literally make the portfolio look like AWS Console.

Think:

Apple-level restraint
× Linear-level precision
× Vercel-level engineering aesthetic
× interactive digital-art portfolio
× futuristic cloud infrastructure visualization.

The site should feel technical without becoming cyberpunk.

Avoid:

Matrix rain

excessive neon

giant gradient blobs

random glassmorphism

generic Bento grids everywhere

fake terminal interfaces

animated code purely for decoration

excessive glowing borders

generic particle backgrounds

spinning 3D objects with no meaning

template-looking skill progress bars

percentage-based skill ratings

“Hello World”

“I turn coffee into code”

generic programmer clichés

Use an obsidian / graphite / near-black foundation, warm off-white typography, subtle steel shades and a controlled electric blue/cyan accent representing data moving through systems.

Use gradients extremely selectively.

Typography must be a major part of the design.

Use oversized editorial headlines mixed with precise monospace microcopy.

Signature Interaction Concept

The website should behave as if the visitor is navigating through a living distributed system representing Abdulrahman's engineering journey.

Create a subtle network topology in the background.

Nodes represent:

Experience
Projects
Architecture
Skills
Education
Leadership
Contact

As the visitor scrolls, connections between these nodes activate.

Small packets of light can occasionally travel between relevant nodes.

Do not make this distracting.

The visualization should evolve based on which section is currently visible.

Example:

When TraceLens appears, the network transforms into:

Lambda → CloudWatch → Firehose → Router → S3 → API → User

When the CI/CD project appears:

Git Push → GitHub Actions → Build → Verify → OIDC → AWS Accounts → Lambda

This makes the website itself demonstrate Abdulrahman's systems-thinking mindset.

Custom Mouse Experience

Desktop should have a custom cursor system.

Do NOT merely replace the pointer with a circle.

Create a context-aware cursor.

Default:
small precise point + soft magnetic outer ring.

When hovering interactive elements:
the outer cursor expands and subtly magnetizes toward the target.

Project cards:
cursor becomes VIEW CASE STUDY →

External links:
cursor becomes OPEN ↗

Architecture visualization:
cursor becomes EXPLORE

Copy email:
cursor becomes COPY

Drag interactions:
cursor becomes DRAG ↔

Buttons should react slightly to cursor proximity.

Cards can have extremely subtle perspective tilt based on pointer position.

Background light can respond subtly to pointer coordinates.

Everything needs to be smooth and restrained.

Disable the custom cursor on touch devices.

Opening Experience

Do NOT immediately show a normal navigation bar and hero.

Create a short cinematic entrance.

Start with almost complete darkness.

A small system-status message appears:

INITIALIZING ENGINEERING PROFILE

Then several short lines appear sequentially:

BACKEND SYSTEMS ........ ONLINE
CLOUD ARCHITECTURE ..... ONLINE
APIs ................... ONLINE
AUTOMATION ............. ONLINE

A thin line travels across the screen and forms part of the main hero composition.

Then reveal:

ABDULRAHMAN
SHAMIEH

Large, confident typography.

Under it:

Backend Engineer building reliable systems behind the interface.

Supporting line:

APIs · Cloud · Serverless · Automation · Observability

CTA:

Explore my work ↓

Secondary:

Contact me ↗

The opening sequence should be short and skippable.

Returning visitors should not have to endure a long intro.

Hero Interaction

Make the hero react to pointer movement.

Behind the name is an abstract infrastructure topology composed of lines and nodes.

Pointer movement should gently influence depth/parallax.

Some nodes represent:

API
Lambda
Cloud
Data
CI/CD
Logs

Hovering those nodes exposes tiny technical labels.

The visual should communicate that Abdulrahman works on the systems operating behind what users see.

Include a small animated indicator:

SYSTEM STATUS — AVAILABLE FOR BACKEND / SOFTWARE ENGINEERING

Keep this elegant rather than looking like a gamer HUD.

Navigation

Create a minimal floating navigation system.

Possible items:

01 / About
02 / Experience
03 / Projects
04 / Stack
05 / Journey
06 / Contact

The navigation should know which section is active.

On desktop, create a subtle scroll-progress indicator.

On mobile, transform navigation into an elegant compact menu.

Transitions between sections should feel continuous rather than like separate pages pasted together.

About Section — “Behind the Interface”

Headline:

I build the systems users never see — but everything depends on.

Describe Abdulrahman as a backend-focused software engineer who enjoys taking complex requirements and turning them into clean, maintainable systems.

Mention professional experience with TypeScript, Node.js, Express, Python and AWS.

Show the philosophy as interactive engineering principles rather than generic biography cards:

RELIABILITY
OWNERSHIP
CLARITY
SCALABILITY
CURIOSITY

When hovering a principle, reveal one concise sentence describing what it means in engineering practice.

Include:

Computer Science
3.89 GPA
Honor List
Backend & Cloud Engineering
Leadership

But do not make this look like a statistics dashboard.

Experience

Create a vertical engineering timeline rather than a normal résumé timeline.

The timeline should resemble a data pipeline.

Each position is a node.

The active node illuminates as it enters the viewport.

Feature professional experience at Oreyeon LDA prominently.

Use public-safe descriptions only. Never reveal confidential client information, credentials, internal account IDs, private infrastructure values, NDA-protected details, or proprietary implementation details.

Present the work through engineering outcomes.

Include areas such as:

Centralized Observability

Designed and implemented a centralized multi-tenant logging architecture for 14+ AWS Lambda functions using CloudWatch Logs, Amazon Data Firehose, Python Lambda routing and tenant-separated S3 storage.

Secure Log Retrieval

Built REST API functionality using API Gateway, AWS Lambda, Amazon Cognito, S3 pagination and presigned URLs.

Reusable Logging Infrastructure

Developed reusable structured logging capabilities with AWS Lambda Powertools.

Production Engineering

Refactored backend Lambda systems into maintainable modular Python structures while preserving production behavior and created technical deployment/runbook documentation.

CI/CD Architecture

Designed a multi-account, multi-region AWS Lambda CI/CD architecture involving GitHub Actions, OIDC authentication, deterministic artifacts, DEV verification, deployment safeguards and rollback strategies.

Do not simply dump these as résumé bullet points.

Turn them into visual engineering stories.

Featured Project 01 — TraceLens

This should be the visual centerpiece of the portfolio.

Title:

TraceLens

Subtitle:

Turning distributed serverless logs into one observable system.

Start with the problem:

Many serverless functions generate logs independently.

Understanding behavior across functions, environments and tenants becomes difficult as systems scale.

Then animate the solution architecture.

Create a horizontally flowing architecture diagram:

AWS Lambda
↓
CloudWatch Logs
↓
Amazon Data Firehose
↓
Python Router Lambda
↓
Tenant-specific S3
↓
Secure REST API
↓
TraceLens Interface

As the visitor scrolls through this section, each service activates sequentially.

Animate a log event traveling through the complete pipeline.

Allow users to hover each architecture component and see:

WHAT IT DOES
WHY IT EXISTS

Example:

Firehose

Buffers and transports centralized log events before transformation and routing.

Router Lambda

Decodes, validates, groups and routes structured log data to the appropriate storage destination.

Use technical diagrams elegantly.

No AWS screenshots.

At the bottom show:

Engineering challenges

Multi-tenant routing
Structured logging
Serverless observability
Secure retrieval
Pagination
Authentication
Operational documentation

Include a View Architecture interaction that expands the system diagram into an immersive view.

Featured Project 02 — Multi-Account Lambda CI/CD

Title:

Deploy once. Verify everywhere.

Explain the engineering challenge:

A central repository contains multiple serverless functions that must be deployed safely across multiple AWS accounts and regions without manually repeating deployments.

Visualize the pipeline:

Developer
→ Git Push
→ GitHub Actions
→ Detect Changed Functions
→ Deterministic Build
→ Artifact Verification
→ GitHub OIDC
→ AWS Deployment Roles
→ Account / Region Matrix
→ Lambda $LATEST
→ Smoke Tests
→ Deployment Verification

Make the pipeline interactive.

Clicking or hovering a stage should explain why it exists.

Show an account/region topology that fans outward from one verified artifact.

Important concepts to surface visually:

BUILD ONCE
DEPLOY MANY

DETERMINISTIC ARTIFACTS

OIDC — NO LONG-LIVED AWS KEYS

REVISION-SAFE DEPLOYMENTS

SMOKE TESTS

MULTI-ACCOUNT

MULTI-REGION

ROLLBACK-AWARE DESIGN

This section should make it obvious that Abdulrahman thinks beyond “write code and upload it” into deployment safety and operational architecture.

Additional Projects

Create a horizontal project gallery with strong typography and motion.

Project cards should feel tactile.

On hover:

card depth changes

background architecture comes alive

title moves subtly

project number animates

cursor changes to VIEW CASE STUDY

Each project can expose:

Problem
Architecture
Responsibilities
Stack
Result

Do not use generic screenshots as the dominant visual language.

Generate abstract visual representations of the underlying architecture.

Engineering Stack

Do NOT create a cloud of technology logos.

Create an interactive Engineering Toolbox.

Divide the technology ecosystem by purpose:

Languages

TypeScript
JavaScript
Python
SQL

Backend

Node.js
Express
REST APIs

Cloud

AWS Lambda
API Gateway
S3
CloudWatch
Data Firehose
Cognito
IAM

Engineering

Git
GitHub Actions
CI/CD
OIDC
Serverless Architecture
Observability

When users hover technologies, show relationships.

For example:

Hover AWS Lambda and highlight:

Python
API Gateway
CloudWatch
S3
GitHub Actions

The message should be:

technologies are tools within systems, not isolated badges.

How I Think

Add a section based on Abdulrahman's engineering approach.

Headline:

The interesting part isn't writing the code.
It's deciding how the system should behave.

Create an interactive sequence:

01 — Understand the problem
02 — Model the system
03 — Identify failure modes
04 — Build the smallest reliable solution
05 — Verify behavior
06 — Improve the architecture

When scrolling, connect the six stages as an evolving diagram.

This section should distinguish him from portfolios that only present tools.

Education

Present education elegantly.

Computer Science

GPA 3.89

Honor List

Do not create a boring education card.

Use an animated typography composition where the academic numbers emerge from a grid.

Tie academics to engineering discipline:

Consistency became a habit before it became an engineering principle.

Also provide room for certifications such as AWS credentials to be added later.

Leadership

Show that engineering ability is not Abdulrahman's entire profile.

Include leadership / communication experience from university and professional presentations.

Design this around:

Build. Explain. Lead.

Communicating technical ideas
Presenting engineering systems
Helping others understand complex concepts
Taking ownership

Use subtle animated quotation marks / speaking-wave visual elements.

Do not exaggerate titles or accomplishments.

GitHub / Engineering Activity

If GitHub integration is available, display selected public repositories.

Do NOT use the clichéd contribution heatmap as the centerpiece.

Instead create a “Currently Building” engineering stream.

Show:

Recent repositories
Languages
Selected commits
Architecture projects

Everything should degrade gracefully if GitHub data is unavailable.

Never expose private repositories.

Scroll Experience

Scrolling needs to feel authored.

Use:

sticky storytelling sections

scroll-linked line drawing

masked text reveals

subtle depth movement

object transitions

architecture nodes activating

section-to-section morphing

numbers counting only where meaningful

progressive diagram construction

Avoid making every element fade upward.

Use different animation grammar depending on meaning.

Architecture should construct.

Text should reveal.

Data should flow.

Projects should expand.

Navigation should respond.

Page Transitions

If project case studies use separate routes, implement sophisticated shared-element transitions.

Clicking TraceLens should cause its project title/card to expand naturally into the case-study hero instead of performing a traditional page reload.

Use modern browser View Transition capabilities where appropriate, with graceful fallbacks.

Contact Finale

Do not finish with a generic contact form inside a rectangle.

Make the final section feel like the conclusion of the system journey.

As the visitor reaches the bottom, all previously seen network nodes slowly converge into one final node.

Then display:

LET'S BUILD
SOMETHING RELIABLE.

Supporting line:

Backend engineering, software engineering, cloud systems and ambitious technical challenges.

Primary CTA:

Start a conversation →

Secondary links:

LinkedIn
GitHub
Email
Phone

On email hover:

COPY EMAIL

When clicked:

COPIED ✓

Finish with:

Designed as a system. Built with intention.

and a minimal footer containing Abdulrahman's name and year.

Microinteractions

Make the site rich with carefully designed details.

Examples:

Navigation numbers scramble briefly before resolving.

Copy actions produce tiny confirmation animations.

Architecture nodes pulse once when activated.

Buttons magnetically respond to pointer proximity.

Text links draw their underline from the cursor's entry direction.

Project cards slightly shift depth based on cursor position.

External-link arrows rotate subtly.

Scroll progress appears as a data packet traveling through the navigation track.

Technology relationships animate like dependency graphs.

Timeline lines physically connect as the visitor progresses.

Section numbers transition from outlined to solid when active.

Use tasteful text scrambling for occasional system labels, never paragraph text.

Hidden Easter Eggs

Add a few subtle details for technical visitors.

For example:

Pressing / opens a command palette.

Commands:

About
Projects
TraceLens
CI/CD
GitHub
Resume
Contact

Pressing G then H navigates to GitHub.

Pressing R opens the résumé.

A tiny system indicator can reveal:

BUILD STATUS: STABLE

One tasteful developer-console message may be included for people who inspect DevTools:

“Curious enough to inspect the system? We should probably talk.”

Keep Easter eggs optional and never obstruct usability.

Mobile

The mobile experience must be intentionally designed rather than merely responsive.

Remove desktop-only cursor effects.

Simplify expensive WebGL effects.

Turn architecture diagrams into swipeable / vertically flowing visualizations.

Preserve storytelling.

Maintain large expressive typography.

Keep interactions touch-friendly.

Aim for an experience that feels designed specifically for mobile.

Accessibility

The site must respect:

prefers-reduced-motion

When reduced motion is enabled:

eliminate parallax

remove cursor-following effects

remove unnecessary transforms

simplify page transitions

show architecture diagrams in their completed state

retain functional interaction

Ensure keyboard navigation works everywhere.

Maintain visible focus states.

Use proper semantic landmarks.

Maintain WCAG-friendly contrast.

Animation must enhance comprehension, not prevent it.

Performance

Despite being visually ambitious, the portfolio must remain extremely fast.

Requirements:

Server Components wherever possible

lazy-load Three.js/WebGL experiences

dynamically import expensive interactive components

no unnecessary hydration

avoid giant JavaScript bundles

use transform/opacity for animations where possible

optimize SVG paths

responsive images

prefetch intelligently

avoid layout shift

clean up event listeners

use requestAnimationFrame appropriately

avoid cursor effects causing React rerenders every frame

use MotionValues or direct animation primitives

target excellent Core Web Vitals

Do not sacrifice engineering quality for animation.

The code itself should be portfolio-worthy.

Code Architecture

Build with reusable components.

Suggested conceptual structure:

app/
components/
components/layout/
components/motion/
components/visualizations/
components/projects/
components/ui/
data/
hooks/
lib/
public/

Separate portfolio content from presentation so projects and experience can easily be updated later.

Create typed data models for:

Project
Experience
Technology
Education
SocialLink

Avoid giant page components.

Avoid excessive "use client".

Do not create abstractions simply for abstraction's sake.

SEO

Create excellent metadata around:

Abdulrahman Shamieh
Backend Engineer
Software Engineer
Node.js Developer
TypeScript Developer
Python Developer
AWS Developer
Cloud Engineer
Serverless Engineer

Add:

OpenGraph metadata
Twitter cards
JSON-LD Person schema
canonical URLs after a domain is set
robots.txt
favicon system
social preview artwork

Design System

Create a consistent token system for:

spacing
typography
colors
motion durations
easing
radius
borders
surface elevation

Motion should have a consistent physics language.

Use spring motion for interaction.

Use elegant easing for narrative transitions.

Do not assign arbitrary animation durations everywhere.

Final Requirement

Before coding, define the visual concept and component architecture.

Then build the site.

Do not settle for the first obvious layout.

Continuously ask:

Could this section exist in any other developer portfolio?

If yes, redesign it.

Every major interaction should reinforce Abdulrahman's identity as a backend and cloud engineer.

The final product should feel like:

a distributed system transformed into a personal story.

It should be technically impressive enough that another engineer wants to inspect the implementation, visually polished enough that a recruiter remembers it, and clear enough that a hiring manager understands Abdulrahman's value within the first 30 seconds.

Prioritize, in this order:

Storytelling

Engineering identity

Usability

Visual originality

Motion

Technical experimentation

Do not make “flashy” the goal.

Make memorable engineering the goal.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/839c0d12-174b-480b-90bf-a4cd3a96a36d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
