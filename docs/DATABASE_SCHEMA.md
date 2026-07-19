# DATABASE_SCHEMA.md

# Arixia Database Schema v1.0

**Project:** Arixia

**Version:** 1.0

**Database:** PostgreSQL (Supabase)

**Status:** Approved for Development

---

# Overview

This document defines the complete relational database schema for Arixia.

The schema is designed to support:

* User authentication
* Personalized AI shopping experiences
* Search history
* AI conversations
* Product recommendations
* User preferences
* Saved recommendations
* Future scalability

## Database Design Principles

* UUID primary keys
* Normalized schema
* Row Level Security (RLS)
* Soft deletion where appropriate
* Audit timestamps on every table
* Strict foreign key relationships
* Minimal data duplication
* Optimized indexes for search performance

---

# Naming Conventions

## Tables

Plural, snake_case

Examples

```
profiles

search_sessions

recommendations
```

---

## Columns

snake_case

Examples

```
created_at

updated_at

confidence_score
```

---

## Primary Keys

```
id UUID PRIMARY KEY
```

Generated using

```
gen_random_uuid()
```

---

# Relationships Overview

```
auth.users
      │
      ▼
profiles
      │
      ├──────── preferences
      │
      ├──────── conversations
      │              │
      │              ▼
      │          messages
      │
      ├──────── search_sessions
      │              │
      │              ▼
      │          recommendations
      │                    │
      │                    ▼
      │            marketplace_results
      │
      ├──────── saved_items
      │
      └──────── search_history
```

---

# TABLE: profiles

Stores public user information.

## Columns

| Column       | Type        | Constraints               |
| ------------ | ----------- | ------------------------- |
| id           | UUID        | PK                        |
| auth_user_id | UUID        | FK → auth.users.id UNIQUE |
| full_name    | TEXT        | NOT NULL                  |
| avatar_url   | TEXT        | NULL                      |
| email        | TEXT        | NOT NULL                  |
| created_at   | TIMESTAMPTZ | DEFAULT now()             |
| updated_at   | TIMESTAMPTZ | DEFAULT now()             |

---

## Indexes

```
email

auth_user_id
```

---

# TABLE: preferences

Stores user shopping preferences.

One-to-one relationship.

---

## Columns

| Column                 | Type        |
| ---------------------- | ----------- |
| id                     | UUID        |
| profile_id             | UUID        |
| budget_min             | NUMERIC     |
| budget_max             | NUMERIC     |
| currency               | TEXT        |
| favorite_categories    | TEXT[]      |
| preferred_marketplaces | TEXT[]      |
| preferred_brands       | TEXT[]      |
| prioritize_price       | BOOLEAN     |
| prioritize_quality     | BOOLEAN     |
| prioritize_shipping    | BOOLEAN     |
| prioritize_seller      | BOOLEAN     |
| prioritize_reviews     | BOOLEAN     |
| dark_mode              | BOOLEAN     |
| created_at             | TIMESTAMPTZ |
| updated_at             | TIMESTAMPTZ |

---

## Relationships

```
profile_id

↓

profiles.id
```

---

# TABLE: search_sessions

Represents one shopping session.

A session begins when a user searches or uploads an image.

---

## Columns

| Column       | Type        |
| ------------ | ----------- |
| id           | UUID        |
| profile_id   | UUID        |
| query        | TEXT        |
| search_type  | TEXT        |
| image_url    | TEXT        |
| status       | TEXT        |
| completed_at | TIMESTAMPTZ |
| created_at   | TIMESTAMPTZ |

---

## search_type

Allowed values

```
text

image
```

---

## status

```
processing

completed

failed
```

---

# TABLE: conversations

Every AI conversation.

---

## Columns

| Column     | Type        |
| ---------- | ----------- |
| id         | UUID        |
| profile_id | UUID        |
| title      | TEXT        |
| active     | BOOLEAN     |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |

---

# TABLE: messages

Stores chat messages.

---

## Columns

| Column          | Type        |
| --------------- | ----------- |
| id              | UUID        |
| conversation_id | UUID        |
| role            | TEXT        |
| content         | TEXT        |
| created_at      | TIMESTAMPTZ |

---

## role

```
user

assistant

system
```

---

# TABLE: products

Normalized product catalog.

Multiple marketplace listings may point to the same product.

---

## Columns

| Column          | Type        |
| --------------- | ----------- |
| id              | UUID        |
| product_name    | TEXT        |
| normalized_name | TEXT        |
| brand           | TEXT        |
| category        | TEXT        |
| image_url       | TEXT        |
| description     | TEXT        |
| specifications  | JSONB       |
| created_at      | TIMESTAMPTZ |

---

## specifications

JSON example

```json
{
  "color": "Black",
  "capacity": "1L",
  "material": "Stainless Steel"
}
```

---

# TABLE: marketplace_results

Represents one marketplace listing.

Many listings can belong to one product.

---

## Columns

| Column            | Type        |
| ----------------- | ----------- |
| id                | UUID        |
| product_id        | UUID        |
| recommendation_id | UUID        |
| marketplace       | TEXT        |
| listing_url       | TEXT        |
| title             | TEXT        |
| seller_name       | TEXT        |
| seller_rating     | NUMERIC     |
| price             | NUMERIC     |
| currency          | TEXT        |
| shipping_price    | NUMERIC     |
| shipping_days     | INTEGER     |
| product_rating    | NUMERIC     |
| review_count      | INTEGER     |
| availability      | BOOLEAN     |
| condition         | TEXT        |
| image_url         | TEXT        |
| created_at        | TIMESTAMPTZ |

---

# TABLE: recommendations

The heart of Arixia.

One recommendation belongs to one search.

---

## Columns

| Column                 | Type        |
| ---------------------- | ----------- |
| id                     | UUID        |
| search_session_id      | UUID        |
| recommended_product_id | UUID        |
| confidence_score       | NUMERIC     |
| recommendation_reason  | TEXT        |
| tradeoffs              | TEXT        |
| alternatives           | JSONB       |
| ai_summary             | TEXT        |
| created_at             | TIMESTAMPTZ |

---

## alternatives

Example

```json
[
  {
    "marketplace":"Amazon",
    "reason":"Faster shipping"
  }
]
```

---

# TABLE: review_analysis

AI-generated review intelligence.

---

## Columns

| Column                | Type        |
| --------------------- | ----------- |
| id                    | UUID        |
| marketplace_result_id | UUID        |
| summary               | TEXT        |
| positives             | TEXT[]      |
| negatives             | TEXT[]      |
| sentiment_score       | NUMERIC     |
| authenticity_score    | NUMERIC     |
| created_at            | TIMESTAMPTZ |

---

# TABLE: seller_analysis

AI evaluation of seller quality.

---

## Columns

| Column                | Type        |
| --------------------- | ----------- |
| id                    | UUID        |
| marketplace_result_id | UUID        |
| trust_score           | NUMERIC     |
| risk_level            | TEXT        |
| reasoning             | TEXT        |
| created_at            | TIMESTAMPTZ |

---

# TABLE: saved_items

Stores bookmarked recommendations.

---

## Columns

| Column            | Type        |
| ----------------- | ----------- |
| id                | UUID        |
| profile_id        | UUID        |
| recommendation_id | UUID        |
| created_at        | TIMESTAMPTZ |

---

# TABLE: search_history

Quick history lookup.

---

## Columns

| Column            | Type        |
| ----------------- | ----------- |
| id                | UUID        |
| profile_id        | UUID        |
| search_session_id | UUID        |
| query             | TEXT        |
| created_at        | TIMESTAMPTZ |

---

# TABLE: notifications

Future-ready.

---

## Columns

| Column     | Type        |
| ---------- | ----------- |
| id         | UUID        |
| profile_id | UUID        |
| title      | TEXT        |
| message    | TEXT        |
| read       | BOOLEAN     |
| created_at | TIMESTAMPTZ |

---

# Relationships

```
profiles

↓

preferences

↓

search_sessions

↓

recommendations

↓

marketplace_results

↓

review_analysis

↓

seller_analysis
```

---

# Foreign Keys

```
profiles.auth_user_id

→ auth.users.id

preferences.profile_id

→ profiles.id

search_sessions.profile_id

→ profiles.id

conversations.profile_id

→ profiles.id

messages.conversation_id

→ conversations.id

recommendations.search_session_id

→ search_sessions.id

recommendations.recommended_product_id

→ products.id

marketplace_results.product_id

→ products.id

marketplace_results.recommendation_id

→ recommendations.id

review_analysis.marketplace_result_id

→ marketplace_results.id

seller_analysis.marketplace_result_id

→ marketplace_results.id

saved_items.profile_id

→ profiles.id

saved_items.recommendation_id

→ recommendations.id

search_history.profile_id

→ profiles.id

search_history.search_session_id

→ search_sessions.id

notifications.profile_id

→ profiles.id
```

---

# Required Indexes

## profiles

```
email

auth_user_id
```

---

## search_sessions

```
profile_id

created_at DESC

status
```

---

## conversations

```
profile_id

updated_at DESC
```

---

## messages

```
conversation_id

created_at
```

---

## recommendations

```
search_session_id

confidence_score
```

---

## marketplace_results

```
product_id

marketplace

price

seller_rating
```

---

## products

```
normalized_name

brand

category
```

---

## saved_items

```
profile_id
```

---

# Row Level Security

Enable RLS on every user-owned table.

Policy:

Users may only

* Read their own data
* Insert their own data
* Update their own data
* Delete their own data

Public marketplace metadata (if later introduced) can have separate read-only policies.

---

# Triggers

## updated_at Trigger

Automatically updates

```
updated_at
```

on every UPDATE.

Applies to

* profiles
* preferences
* conversations

---

# Constraints

* Every profile must map to exactly one authenticated user.
* Every preference record belongs to exactly one profile.
* Every search session belongs to one profile.
* Every recommendation belongs to one search session.
* Every marketplace result belongs to one recommendation and one normalized product.
* Messages cannot exist without a conversation.
* Saved items cannot exist without both a profile and a recommendation.

---

# Data Lifecycle

## Search

1. User submits a query or uploads an image.
2. A `search_session` is created.
3. AI processes the request.
4. Normalized `products` are matched or created.
5. `marketplace_results` are stored.
6. A `recommendation` is generated.
7. `review_analysis` and `seller_analysis` are attached to each listing.
8. A `search_history` record is written.
9. The user may save the recommendation to `saved_items`.

---

# Future Extensions

The schema is intentionally extensible to support:

* Affiliate links and commission tracking
* Price history
* Wishlist collections
* Shared recommendation links
* Browser extension synchronization
* Product availability monitoring
* Price drop alerts
* Voice shopping sessions
* Multi-language support
* Team or family shopping accounts

No breaking schema changes should be required to support these future capabilities; only additive tables and relationships should be necessary.
