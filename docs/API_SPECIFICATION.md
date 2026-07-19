# API_SPECIFICATION.md

# Arixia API Specification v1.0

**Project:** Arixia

**Version:** 1.0

**API Style:** RESTful JSON API

**Authentication:** Supabase JWT

**Status:** Approved for Development

---

# Overview

The Arixia API provides all backend functionality required for the AI-powered shopping assistant. It is responsible for:

* Authentication
* AI search
* Image analysis
* Marketplace aggregation
* Recommendation generation
* Conversation management
* User preferences
* Search history
* Saved recommendations

The API follows REST principles, returns JSON exclusively, and uses standard HTTP status codes.

---

# General Standards

## Base URL

```
/api
```

---

## Content Type

All requests and responses:

```
application/json
```

Image uploads:

```
multipart/form-data
```

---

## Authentication

Protected endpoints require a valid Supabase JWT.

Header:

```
Authorization: Bearer <access_token>
```

---

## Standard Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request.",
    "details": {}
  }
}
```

---

# Error Codes

| Code                  | Meaning                    |
| --------------------- | -------------------------- |
| UNAUTHORIZED          | Authentication required    |
| FORBIDDEN             | Access denied              |
| VALIDATION_ERROR      | Invalid input              |
| NOT_FOUND             | Resource not found         |
| RATE_LIMITED          | Too many requests          |
| MARKETPLACE_ERROR     | Marketplace unavailable    |
| AI_PROVIDER_ERROR     | AI request failed          |
| IMAGE_ANALYSIS_FAILED | Unable to identify product |
| INTERNAL_ERROR        | Unexpected server error    |

---

# Authentication API

---

## POST /api/auth/signup

Creates a new account.

Authentication Required

No

### Request

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "********"
}
```

### Success

201 Created

```json
{
  "success": true,
  "user": {}
}
```

---

## POST /api/auth/login

Authentication Required

No

### Request

```json
{
  "email": "john@example.com",
  "password": "********"
}
```

### Success

200 OK

Returns

* access token
* refresh token
* profile

---

## POST /api/auth/logout

Authentication Required

Yes

Invalidates current session.

---

## GET /api/auth/me

Returns authenticated user.

Authentication Required

Yes

---

# User API

---

## GET /api/profile

Returns profile information.

Authentication Required

Yes

---

## PUT /api/profile

Updates profile.

### Editable Fields

* Full Name
* Avatar
* Preferred Currency

---

# Preferences API

---

## GET /api/preferences

Returns shopping preferences.

Authentication Required

Yes

---

## PUT /api/preferences

Updates shopping preferences.

Example

```json
{
  "budgetMin": 50,
  "budgetMax": 300,
  "preferredBrands": [
    "Sony",
    "Samsung"
  ],
  "preferredMarketplaces": [
    "Amazon",
    "Jumia"
  ],
  "prioritizePrice": true,
  "prioritizeShipping": false,
  "prioritizeQuality": true
}
```

---

# Search API

---

## POST /api/search

Primary product search endpoint.

Authentication Required

Yes

---

### Request

```json
{
  "query": "Best wireless headphones under $150"
}
```

---

### Pipeline

1. Validate request
2. Detect intent
3. Extract preferences
4. Query marketplaces
5. Normalize listings
6. Generate recommendation
7. Save history
8. Return decision report

---

### Response

```json
{
  "success": true,
  "searchId": "...",
  "recommendationId": "...",
  "results": []
}
```

---

# Image Search API

---

## POST /api/image-search

Accepts image upload.

Authentication Required

Yes

Content Type

```
multipart/form-data
```

---

### Request

Field

```
image
```

---

### Pipeline

Upload

↓

Validation

↓

Image Storage

↓

Vision AI

↓

Product Identification

↓

Marketplace Search

↓

Recommendation

---

### Response

```json
{
  "success": true,
  "product": {},
  "recommendation": {}
}
```

---

# AI Chat API

---

## POST /api/chat

Conversational shopping assistant.

Authentication Required

Yes

---

### Request

```json
{
  "conversationId": "...",
  "message": "I'm looking for a backpack for university."
}
```

---

### Response

```json
{
  "success": true,
  "reply": "...",
  "conversationId": "...",
  "followUpQuestions": []
}
```

---

# Recommendation API

---

## GET /api/recommendation/{id}

Returns complete recommendation.

Authentication Required

Yes

---

### Response

```json
{
  "success": true,
  "recommendation": {
    "confidenceScore": 94,
    "summary": "...",
    "pros": [],
    "cons": [],
    "tradeoffs": [],
    "alternatives": [],
    "marketplaceResults": []
  }
}
```

---

# Marketplace API

---

## GET /api/marketplaces

Returns supported marketplaces.

Authentication Required

No

---

### Response

```json
[
  "Amazon",
  "Jumia",
  "eBay",
  "AliExpress"
]
```

---

# History API

---

## GET /api/history

Returns search history.

Authentication Required

Yes

Supports pagination.

Query Parameters

```
page

limit

sort
```

---

### Response

```json
{
  "items": [],
  "total": 45
}
```

---

# Saved Items API

---

## GET /api/saved

Returns bookmarked recommendations.

Authentication Required

Yes

---

## POST /api/saved

Save recommendation.

### Request

```json
{
  "recommendationId": "..."
}
```

---

## DELETE /api/saved/{id}

Removes bookmark.

---

# Conversation API

---

## GET /api/conversations

Returns conversations.

---

## GET /api/conversations/{id}

Returns messages.

---

## DELETE /api/conversations/{id}

Deletes conversation.

---

# Upload API

---

## POST /api/upload

Uploads user image.

Returns

Storage URL

Public URL

Metadata

---

# AI Provider API

This endpoint is internal.

Not exposed publicly.

Responsibilities

Intent Detection

Vision Analysis

Recommendation Generation

Review Summarization

Confidence Calculation

Trade-off Analysis

---

# Marketplace Adapter API

Internal.

Responsibilities

Marketplace Search

Normalization

Deduplication

Currency Standardization

Shipping Standardization

---

# Recommendation Engine API

Internal.

Responsibilities

Product Ranking

Trade-off Analysis

Recommendation Generation

Alternative Selection

Confidence Score

---

# Health Check

---

## GET /api/health

Returns

```json
{
  "status": "healthy",
  "database": "connected",
  "ai": "available"
}
```

No authentication required.

Used for monitoring and deployment verification.

---

# Request Validation

All incoming requests must be validated before processing.

Validation Rules

* Required fields enforced
* String length limits
* Image type validation
* Maximum upload size
* Numeric range validation
* UUID validation
* Enum validation

Validation failures return:

```
400 Bad Request
```

---

# Pagination

Endpoints returning collections support:

```
page

limit

cursor
```

Default page size:

```
20
```

Maximum:

```
100
```

---

# Filtering

Supported where applicable.

Examples

```
marketplace

brand

priceMin

priceMax

rating

shippingDays
```

---

# Sorting

Supported values

```
price

rating

shipping

confidence

createdAt
```

Ascending or descending.

---

# Rate Limiting

Unauthenticated

```
60 requests/hour
```

Authenticated

```
500 requests/hour
```

Image uploads

```
30/hour
```

AI chat

```
100/hour
```

---

# Caching Strategy

Cache

Marketplace metadata

Supported brands

Categories

Static assets

Do not cache

User preferences

Recommendations

Conversations

Authentication

---

# Logging

Log

Authentication events

Search requests

AI requests

Marketplace requests

Errors

Latency

Performance metrics

Never log

Passwords

JWTs

Secrets

Payment information

---

# Security Requirements

* HTTPS only
* JWT authentication
* Row Level Security enforced
* Input sanitization
* Output escaping where required
* Rate limiting
* File type validation
* File size validation
* SQL injection protection
* XSS protection
* CSRF protection where applicable
* Secure HTTP headers

---

# API Versioning

Current version

```
v1
```

Future versions should be introduced using URL versioning:

```
/api/v2/...
```

Breaking changes must never be introduced to an existing version.

---

# HTTP Status Codes

| Status | Meaning                |
| ------ | ---------------------- |
| 200    | Success                |
| 201    | Resource Created       |
| 204    | No Content             |
| 400    | Validation Error       |
| 401    | Unauthorized           |
| 403    | Forbidden              |
| 404    | Not Found              |
| 409    | Conflict               |
| 413    | Payload Too Large      |
| 415    | Unsupported Media Type |
| 422    | Unprocessable Entity   |
| 429    | Rate Limited           |
| 500    | Internal Server Error  |
| 502    | Upstream Service Error |
| 503    | Service Unavailable    |

---

# API Design Principles

* Every endpoint has a single responsibility.
* All business logic resides in the service layer, not route handlers.
* All responses follow a consistent JSON structure.
* Authentication is required for all user-specific resources.
* External AI providers and marketplace integrations are abstracted behind internal service interfaces.
* APIs are stateless, idempotent where appropriate, and designed for future extensibility.
* All endpoints must provide meaningful error messages and predictable response formats.
* Every request and response should be fully type-safe and documented through shared TypeScript interfaces.
