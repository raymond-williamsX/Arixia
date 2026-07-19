# SYSTEM_ARCHITECTURE.md

# Arixia System Architecture v1.0

**Project:** Arixia

**Version:** 1.0

**Status:** Approved for Development

**Purpose:** This document defines the complete technical architecture of Arixia. It is the authoritative reference for all engineering decisions and implementation. Every module, service, API, and component must conform to this architecture.

---

# 1. Architecture Principles

Arixia is designed around five core engineering principles.

## AI First

AI is the primary product capability. Every major user interaction should either leverage AI reasoning directly or support AI-driven decision making.

---

## Modular

Every major subsystem should be independently replaceable without affecting the rest of the application.

Examples:

* Switching Gemini to OpenAI
* Adding another marketplace
* Adding another authentication provider

should require minimal code changes.

---

## Provider Agnostic

The application should never directly depend on one AI provider or one marketplace.

Instead, all integrations must go through adapters/interfaces.

---

## Scalable

Although the MVP is built for a hackathon, the architecture should support future production scaling without major restructuring.

---

## Type Safe

All frontend and backend code must use strict TypeScript.

No usage of `any`.

Shared types should be reused across client and server.

---

# 2. High-Level Architecture

```
┌──────────────────────────────┐
│          User                │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Next.js Frontend       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        API Layer             │
└──────────────┬───────────────┘
               │
       ┌───────┴─────────┐
       ▼                 ▼
AI Provider        Marketplace Layer
       │                 │
       └───────┬─────────┘
               ▼
     Recommendation Engine
               │
               ▼
          Supabase DB
```

---

# 3. Technology Stack

## Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

---

## Backend

* Next.js Route Handlers
* TypeScript

---

## Database

Supabase PostgreSQL

---

## Authentication

Supabase Auth

Supported providers

* Email
* Google

Architecture should allow future providers.

---

## Storage

Supabase Storage

Stores:

* Uploaded images
* User avatars

---

## AI Runtime

Primary

Gemini 2.5 Flash

Architecture prepared for

* GPT
* Claude
* DeepSeek
* Qwen

---

## Deployment

Frontend

Vercel

Backend

Next.js API Routes

Database

Supabase

---

# 4. System Modules

The system consists of independent modules.

---

## Authentication Module

Responsibilities

* Sign Up
* Login
* Session Management
* Authorization
* Profile Retrieval

Owns

Users

Sessions

Profiles

Preferences

---

## Search Module

Responsibilities

Natural language search.

Converts user intent into structured search requests.

Example

Input

"I need a laptop for programming under $900."

Output

```
Category:
Laptop

Budget:
900

Purpose:
Programming

Priority:
Battery
```

---

## Image Analysis Module

Responsibilities

Accept uploaded image.

Identify

* Product
* Brand
* Category
* Similar Items

Returns structured product metadata.

---

## Marketplace Module

Responsibilities

Query marketplace providers.

Normalize product information.

Deduplicate similar products.

Return standardized listings.

---

## Recommendation Module

Core intelligence of the application.

Responsibilities

Receive normalized listings.

Analyze

Price

Ratings

Shipping

Seller

Review quality

Generate

Recommendation

Alternatives

Trade-offs

Confidence

---

## History Module

Stores

Searches

Recommendations

User interactions

Allows replaying previous recommendation sessions.

---

## Preferences Module

Stores user preferences.

Examples

Budget

Favorite Stores

Preferred Brands

Fast Shipping

Lowest Price

Highest Quality

These preferences influence recommendation generation.

---

# 5. Frontend Architecture

```
App

│

├── Public Routes

│      ├── Landing

│      ├── Login

│      └── Register

│

├── Protected Routes

│      ├── Home

│      ├── Search

│      ├── History

│      ├── Saved

│      ├── Profile

│      └── Settings
```

---

# 6. Frontend Layers

## Presentation Layer

Pure UI.

Contains

Buttons

Cards

Dialogs

Inputs

Icons

Animations

---

## Feature Layer

Business features.

Examples

Search

Recommendation

History

Image Upload

Preferences

---

## State Layer

Handles application state.

Responsible for

Current User

Search Session

Recommendation

Marketplace Results

Loading

Errors

---

## Service Layer

Communicates with backend.

Contains

Search Service

Recommendation Service

Image Upload Service

History Service

Preference Service

---

# 7. Backend Architecture

API Layer

↓

Business Logic

↓

AI Layer

↓

Marketplace Layer

↓

Database Layer

---

## API Responsibilities

Authentication

Validation

Authorization

Error Handling

Logging

Response Formatting

---

## Business Logic

No UI logic.

No database queries.

Only application rules.

---

## Database Layer

Only responsible for

CRUD

Transactions

Queries

Indexes

Policies

---

# 8. AI Provider Layer

The application should never directly call an AI provider.

Instead

```
AIProvider

↓

GeminiAdapter

Future

GPTAdapter

ClaudeAdapter

DeepSeekAdapter
```

Every provider must expose

```
analyzeImage()

chat()

recommend()

summarizeReviews()

generateConfidence()
```

This allows providers to be swapped without changing business logic.

---

# 9. Marketplace Layer

Every marketplace follows the same interface.

```
MarketplaceProvider

↓

Amazon

eBay

Jumia

AliExpress

Future Providers
```

Each provider returns

```
MarketplaceResult

{

title

image

price

currency

rating

seller

shipping

marketplace

url

}
```

The recommendation engine never knows which marketplace produced the data.

---

# 10. Recommendation Engine

This is the heart of Arixia.

Pipeline

```
User Request

↓

Intent Detection

↓

Preference Extraction

↓

Marketplace Search

↓

Product Normalization

↓

Similarity Matching

↓

Review Summarization

↓

Seller Evaluation

↓

Trade-off Analysis

↓

Recommendation

↓

Confidence Score

↓

Decision Report
```

---

# 11. Product Normalization

Marketplace data differs.

Normalize into one model.

Example

Amazon

"Ships Tomorrow"

Jumia

"Delivery 2 Days"

AliExpress

"Estimated 5 Days"

↓

Normalized

```
ShippingDays = 2
```

Same for

Ratings

Currencies

Conditions

Stock

Seller Names

---

# 12. Decision Engine

Every recommendation evaluates

Price

Shipping

Ratings

Authenticity

Seller Trust

Review Sentiment

Return Policy (if available)

Overall Value

Never rank by price alone.

---

# 13. Confidence Engine

Every recommendation returns

```
Confidence

0–100%
```

Calculated using

Data Completeness

Review Quality

Listing Similarity

Seller Trust

Image Match

Information Consistency

---

# 14. Review Intelligence

The AI should summarize customer feedback.

Instead of

4.7★

Generate

Pros

Cons

Common Complaints

Who Should Buy

Who Should Avoid

---

# 15. Explainability Layer

Every recommendation must answer

Why?

Trade-offs?

Alternatives?

Confidence?

No recommendation should ever be unexplained.

---

# 16. Database Architecture

Primary entities

Users

Profiles

Preferences

Searches

Products

MarketplaceListings

Recommendations

SavedItems

Conversations

Messages

History

Relationships should use UUID primary keys.

Soft deletes where appropriate.

Indexes on frequently queried fields.

---

# 17. Authentication Flow

```
User

↓

Supabase Auth

↓

Session

↓

Middleware

↓

Protected Route

↓

Application
```

Unauthorized users cannot access protected routes.

---

# 18. Search Flow

```
User

↓

Search Input

↓

Validation

↓

Intent Extraction

↓

Marketplace Queries

↓

Normalization

↓

Recommendation

↓

Decision Report

↓

History Saved
```

---

# 19. Image Search Flow

```
Upload Image

↓

Validation

↓

Storage

↓

Vision Analysis

↓

Product Identification

↓

Marketplace Search

↓

Recommendation

↓

Decision Report
```

---

# 20. Error Handling

Every layer handles errors independently.

Frontend

User-friendly messages.

Backend

Structured JSON errors.

AI

Retry strategy.

Marketplace

Graceful degradation.

Database

Transaction rollback.

---

# 21. Logging

Log

Authentication

Searches

Errors

AI failures

Marketplace failures

API failures

Performance metrics

Never log secrets.

---

# 22. Security

Environment variables only.

Input validation.

Output sanitization.

Supabase RLS.

Authentication middleware.

HTTPS only.

Rate limiting.

No client-side secrets.

---

# 23. Performance

Parallel marketplace requests.

Lazy loading.

Image optimization.

Server Components where appropriate.

Streaming AI responses where supported.

Aggressive caching for static resources.

Debounced search input.

---

# 24. Scalability

The architecture must support future additions without restructuring.

Future additions

Additional AI providers

Additional marketplaces

Affiliate systems

Browser extension

Mobile application

Price alerts

Wishlist

Voice shopping

---

# 25. Deployment Architecture

```
User

↓

Vercel Edge

↓

Next.js

↓

Supabase

↓

Gemini API

↓

Marketplace Services
```

---

# 26. Folder Structure

```
app/
│
├── (auth)/
├── (dashboard)/
├── api/
├── search/
├── history/
├── profile/
├── settings/
│
components/
│
├── ui/
├── layout/
├── search/
├── recommendation/
├── marketplace/
├── profile/
├── history/
│
features/
│
├── auth/
├── search/
├── recommendations/
├── marketplace/
├── history/
├── preferences/
│
services/
│
├── ai/
├── marketplace/
├── auth/
├── storage/
│
lib/
│
├── supabase/
├── validation/
├── utils/
│
hooks/
│
types/
│
config/
│
styles/
│
public/
│
docs/
```

---

# 27. Architectural Constraints

* No component may directly communicate with the database.
* No UI component may contain business logic.
* All AI interactions must go through the AI Provider Layer.
* All marketplace interactions must go through the Marketplace Layer.
* Business logic must remain independent of UI.
* Shared types must be reused between frontend and backend.
* API routes must remain thin and delegate logic to services.
* Every external dependency must be abstracted behind an interface.
* The Recommendation Engine is the only module authorized to produce final purchasing recommendations.

---

# Final Architecture Statement

Arixia is designed as an AI-first, modular, provider-agnostic platform where intelligence—not marketplace integration—is the core product. Every architectural decision prioritizes maintainability, extensibility, explainability, and user trust. The system separates presentation, business logic, AI reasoning, marketplace integration, and persistence into distinct layers, ensuring that future growth, provider changes, and new features can be introduced with minimal impact on the overall application architecture.
