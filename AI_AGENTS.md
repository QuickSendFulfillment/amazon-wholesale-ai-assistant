# QuickSend AI - AI Agent Specification

## Philosophy

QuickSend AI is not a single AI.

It is a team of specialized AI agents coordinated by one central Procurement Manager Agent.

Each agent has one responsibility and becomes excellent at that responsibility.

The Procurement Manager decides which agents should be used for every request.

---

# Agent Hierarchy

                     USER
                       │
                       ▼
          Procurement Manager Agent
                       │
 ┌────────────┬────────────┬────────────┐
 ▼            ▼            ▼            ▼
Amazon     Brand      Supplier     Catalog
Agent      Agent       Agent        Agent
 │            │            │            │
 ▼            ▼            ▼            ▼
Keepa     Website    Verification  Outreach
Agent      Agent        Agent        Agent
                       │
                       ▼
                    CRM Agent

---

# 1 Procurement Manager Agent

Purpose

Acts as the brain of QuickSend AI.

Responsibilities

- Understand user intent
- Build execution plan
- Decide which agents to call
- Combine all results
- Generate final recommendation
- Ask for confirmation before major actions

Example

User:

Find suppliers of NARS in Germany.

Execution

↓

Brand Agent

↓

Supplier Agent

↓

Verification Agent

↓

Final Report

---

# 2 Amazon Intelligence Agent

Input

Amazon URL

ASIN

Responsibilities

Extract

- Brand
- Title
- ASIN
- Price
- Seller
- Category
- Images
- Product details

Future

- Keepa integration
- SellerAmp integration
- Product qualification

---

# 3 Keepa Intelligence Agent

Purpose

Determine whether a product deserves research.

Checks

- Amazon dominance
- Brand dominance
- Buy Box rotation
- Seller count
- FBA sellers
- FBM sellers
- Price stability
- Sales trend

Output

Research Priority

LOW

MEDIUM

HIGH

---

# 4 Brand Intelligence Agent

Responsibilities

Find

- Official website
- Contact page
- Wholesale page
- Dealer application
- Distributor page
- MAP policy
- Amazon reseller policy

Output

Brand Profile

---

# 5 Global Supplier Hunter Agent

Purpose

Find suppliers anywhere in the world.

Input

Brand

Product

Country

Output

Supplier candidates

Supplier types

- Wholesaler
- Distributor
- Importer
- Exporter
- Dealer
- Stockist
- Manufacturer
- Regional Distributor

---

# 6 Country Intelligence Agent

Purpose

Adapt supplier search based on country.

Responsibilities

Determine

- Search language
- Wholesale keywords
- Local directories
- Business registries
- Local review websites

Example

Germany

Großhandel

Importeur

Distributor

France

Grossiste

Fournisseur

Spain

Mayorista

Proveedor

---

# 7 Supplier Verification Agent

Purpose

Determine supplier legitimacy.

Checks

Website quality

Address

Warehouse

Google Maps

Google Reviews

Trustpilot

BBB

Business registration

Email

Phone

Domain age

Brands carried

Output

Supplier Score

0–100

Risk Level

---

# 8 Website Intelligence Agent

Purpose

Read supplier websites.

Extract

Emails

Phones

Addresses

Brands

Categories

Dealer forms

Catalogs

Price files

XML feeds

CSV feeds

---

# 9 Outreach Agent

Responsibilities

Generate

Wholesale emails

Follow-ups

Negotiation emails

Brand-direct emails

Future

Create Gmail drafts

---

# 10 CRM Agent

Tracks

Brands

Suppliers

Research jobs

Emails

Replies

Follow-ups

Notes

Account approvals

Account rejections

---

# 11 Learning Agent (Future)

Purpose

Improve QuickSend AI over time.

Example

User marks

Supplier A

Good

Supplier B

Fake

Supplier C

Approved

QuickSend AI learns from these decisions.

Future supplier rankings become smarter.

---

# Design Rules

Every agent should

Have one responsibility

Return evidence

Return confidence score

Never guess

Never hide uncertainty

Allow human approval before important actions
