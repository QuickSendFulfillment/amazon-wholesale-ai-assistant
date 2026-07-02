# QuickSend AI

## Product Name

QuickSend AI

## Tagline

The AI Procurement Operating System

## Mission

QuickSend AI is an AI-powered procurement platform designed to automate and improve the Amazon Wholesale sourcing workflow.

Its mission is to help QuickSend Fulfillment research products, find brands, discover suppliers worldwide, verify supplier legitimacy, generate outreach emails, and track supplier communication from one centralized system.

---

# 1. Core Business Problem

QuickSend Fulfillment currently performs many sourcing tasks manually:

- Finding products on Amazon and Keepa
- Checking whether a product is worth researching
- Finding the official brand website
- Searching Google for suppliers, wholesalers, distributors, importers, and dealers
- Checking supplier legitimacy
- Verifying physical addresses and warehouses
- Checking Google reviews, Trustpilot, BBB, Google Maps, and other sources
- Contacting suppliers by email or contact form
- Tracking replies manually in Gmail and CRM
- Updating spreadsheets manually

QuickSend AI should reduce this manual work and help the team make faster, more accurate sourcing decisions.

---

# 2. North Star Workflow

The ideal QuickSend AI workflow:

1. User gives QuickSend AI an input:
   - Amazon URL
   - ASIN
   - Keepa export
   - Brand name
   - Product name
   - UPC/EAN
   - Supplier website
   - Supplier catalog
   - XML feed
   - Excel price file
   - PDF catalog

2. QuickSend AI understands the user's goal.

3. QuickSend AI decides which agents/tools to use.

4. QuickSend AI researches, verifies, scores, and reports.

5. QuickSend AI saves results to the database/CRM.

6. QuickSend AI helps generate emails and follow-ups.

7. User reviews and approves final actions.

---

# 3. Key Principle

QuickSend AI should not simply automate clicks.

QuickSend AI should automate sourcing decisions.

Every feature must answer this question:

> Does this save QuickSend Fulfillment measurable time or improve sourcing quality?

If the answer is no, we do not build it.

---

# 4. Core Research Modes

QuickSend AI must support multiple starting points.

## 4.1 Amazon Product Mode

Input:
- Amazon URL
- ASIN

Output:
- Brand
- Product title
- ASIN
- Price
- Category
- Seller
- Main image
- Availability
- Product details
- Qualification summary
- Suggested next action

## 4.2 Keepa Mode

Input:
- Keepa export
- Keepa product data
- Keepa API data

Output:
- Product qualification score
- Amazon dominance analysis
- Brand dominance analysis
- Buy Box rotation
- Seller count
- FBA/FBM mix
- Rank/sales signals
- Price stability
- Recommended research priority

## 4.3 Brand Mode

Input:
- Brand name
- Brand website
- Brand from Amazon/Keepa

Output:
- Official website
- Contact page
- Wholesale page
- Dealer application
- Distributor page
- MAP policy
- Amazon reseller policy
- Social links
- Brand risk assessment

## 4.4 Product Mode

Input:
- Product name
- UPC/EAN
- Product description

Output:
- Brand identification
- Official website
- Possible suppliers
- Country-specific distributor list
- Product-specific sourcing options

## 4.5 Supplier Mode

Input:
- Supplier website
- Supplier name
- Supplier email
- Supplier catalog
- Supplier price file

Output:
- Legitimacy score
- B2B status
- Warehouse/address verification
- Reviews
- Brands carried
- Contact details
- Risk level
- Recommended action

## 4.6 Catalog Mode

Input:
- Excel file
- CSV file
- XML feed
- PDF catalog

Output:
- Extracted products
- Brands carried
- UPC/EAN data
- Pricing
- Stock
- MOQ
- Potential profitable products
- Supplier suitability

---

# 5. Global Supplier Research Requirement

QuickSend AI must be global from day one.

The user should be able to ask:

- Find suppliers for NARS in the USA
- Find Duracell distributors in Germany
- Find Ahmed Al Maghribi wholesalers in UAE
- Find this product's suppliers in Canada
- Verify this supplier in France
- Find distributors in any country

The system must adapt to the target country.

## 5.1 Country-Aware Search

For every supplier search, QuickSend AI should consider:

- Target country
- Local business language
- Local wholesale terminology
- Local business directories
- Local review sources
- Local company registration sources
- Local address and map verification sources

## 5.2 Supplier Types

QuickSend AI should search for:

- Wholesalers
- Distributors
- Authorized distributors
- Importers
- Exporters
- B2B suppliers
- Regional distributors
- Stockists
- Dealers
- Dealer networks
- Brand-direct wholesale programs
- Manufacturer-direct accounts

## 5.3 Search Terms

The system should generate multiple search query variations:

- Brand + wholesale distributor + country
- Brand + supplier + country
- Brand + authorized distributor + country
- Brand + importer + country
- Brand + B2B + country
- Brand + dealer application
- Brand + wholesale account
- Brand + trade distributor
- Brand + stockist
- Product name + wholesale + country
- UPC/EAN + distributor + country

## 5.4 Local Language Search

For non-English countries, QuickSend AI should generate translated search terms.

Examples:

Germany:
- Großhandel
- Händler
- Distributor
- Importeur
- Wiederverkäufer

France:
- Grossiste
- Distributeur
- Fournisseur
- Importateur

Spain:
- Mayorista
- Distribuidor
- Proveedor
- Importador

UAE:
- Distributor
- Supplier
- Wholesale
- Importer
- Trading LLC

Japan:
- 卸売
- 販売代理店
- 代理店
- 輸入業者

---

# 6. AI Agent Architecture

QuickSend AI should use multiple specialized agents.

## 6.1 Procurement Manager Agent

Main coordinator.

Responsibilities:
- Understand user intent
- Decide which agents to use
- Break work into steps
- Combine results
- Produce final recommendation
- Ask user for confirmation before major actions

## 6.2 Amazon Intelligence Agent

Responsibilities:
- Extract Amazon product data
- Identify brand
- Identify ASIN
- Read title/category/seller/price
- Later: integrate Keepa/SellerAmp data
- Estimate whether product is worth researching

## 6.3 Keepa Intelligence Agent

Responsibilities:
- Analyze Keepa data
- Detect Amazon dominance
- Detect brand dominance
- Analyze Buy Box rotation
- Review seller count
- Review FBA/FBM sellers
- Identify price stability
- Generate product qualification score

## 6.4 Brand Intelligence Agent

Responsibilities:
- Find official brand website
- Verify website confidence
- Find contact page
- Find wholesale page
- Find dealer application
- Find distributor page
- Find MAP policy
- Find Amazon reseller policy
- Find social media profiles

## 6.5 Global Supplier Hunter Agent

Responsibilities:
- Search suppliers by brand/product/country
- Use country-aware search queries
- Search deeply beyond first results
- Find wholesalers, distributors, importers, dealers
- Remove duplicates
- Rank suppliers by relevance

## 6.6 Supplier Verification Agent

Responsibilities:
- Check if supplier is legitimate
- Verify physical address
- Check warehouse indicators
- Check Google Maps
- Check Google reviews
- Check Trustpilot
- Check BBB where applicable
- Check domain email vs free email
- Check domain age where possible
- Identify risk signals
- Generate supplier score

## 6.7 Website Scraper Agent

Responsibilities:
- Read supplier websites
- Extract company name
- Extract emails
- Extract phone numbers
- Extract addresses
- Extract brands carried
- Extract wholesale pages
- Extract catalog links
- Extract XML/CSV/Excel feed links
- Extract dealer application forms
- Respect robots.txt and legal/ethical limits

## 6.8 Outreach Agent

Responsibilities:
- Generate personalized supplier outreach emails
- Generate brand-direct account emails
- Generate follow-up emails
- Generate negotiation emails
- Create Gmail drafts later
- Track outreach status later

## 6.9 CRM Agent

Responsibilities:
- Track brands researched
- Track suppliers found
- Track suppliers contacted
- Track replies
- Track follow-ups
- Track approved/rejected accounts
- Keep sourcing history organized

---

# 7. Supplier Verification Score

Each supplier should receive a score from 0 to 100.

## 7.1 Positive Signals

- B2B/wholesale language on website
- Physical warehouse/business address
- Google Maps presence
- Positive Google reviews
- Positive Trustpilot reviews
- BBB profile where applicable
- Company email domain
- Business phone number
- Brands carried listed publicly
- Wholesale account page
- Dealer application page
- Catalog/price file availability
- Established domain
- Clear payment/shipping terms
- Real company registration

## 7.2 Risk Signals

- No address
- Fake or residential address
- No phone number
- Free Gmail/Yahoo/Outlook email only
- Very new domain
- No reviews
- Bad reviews
- Unrealistic pricing
- Wire-only pressure
- No invoice details
- Poor website quality
- No company information
- Refuses basic business documentation
- Claims to carry many premium brands without evidence

## 7.3 Score Labels

- 90–100: Excellent
- 75–89: Strong
- 60–74: Medium
- 40–59: Risky
- 0–39: Avoid / Not enough evidence

---

# 8. User Interface Vision

QuickSend AI should eventually have three interfaces.

## 8.1 Chrome Extension

Purpose:
- Work directly on Amazon pages and supplier websites

Main features:
- Extract product data
- Send product/brand to backend
- Quick supplier research
- Quick supplier verification
- Save lead
- Generate email
- Open dashboard

## 8.2 Web Dashboard

Purpose:
- Main control center

Main sections:
- Dashboard
- Product Research
- Brand Intelligence
- Global Supplier Finder
- Supplier Verification
- Outreach Center
- CRM
- Catalog Analyzer
- Settings

## 8.3 Backend API

Purpose:
- AI brain and automation layer

Main responsibilities:
- Run agents
- Store data
- Search web
- Scrape websites
- Verify suppliers
- Generate reports
- Integrate APIs

---

# 9. Data Model

## 9.1 Product

Fields:
- id
- source
- amazon_url
- asin
- title
- brand
- price
- category
- seller
- image_url
- upc
- ean
- keepa_data
- qualification_score
- created_at

## 9.2 Brand

Fields:
- id
- name
- official_website
- country
- contact_page
- wholesale_page
- dealer_application_page
- distributor_page
- map_policy_url
- amazon_policy_notes
- social_links
- confidence_score
- created_at

## 9.3 Supplier

Fields:
- id
- name
- website
- country
- state_region
- city
- address
- phone
- email
- contact_page
- wholesale_page
- brands_carried
- supplier_type
- b2b_status
- verification_score
- risk_level
- reviews
- notes
- created_at

## 9.4 Outreach

Fields:
- id
- supplier_id
- brand_id
- email
- subject
- body
- status
- sent_at
- replied_at
- follow_up_date
- notes

## 9.5 Research Job

Fields:
- id
- input_type
- input_value
- target_country
- status
- agents_used
- summary
- created_at
- completed_at

---

# 10. Folder Structure

Project root:

```text
amazon-wholesale-ai-assistant/

├── chrome-extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.css
│   ├── popup.js
│   ├── assets/
│   ├── scripts/
│   └── components/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── api/
│   ├── agents/
│   ├── services/
│   ├── scrapers/
│   ├── scoring/
│   ├── database/
│   └── integrations/
│
├── dashboard/
│   └── future web dashboard
│
├── docs/
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   ├── CHANGELOG.md
│   └── SETUP.md
│
├── data/
│   ├── sample_inputs/
│   └── sample_outputs/
│
├── tests/
│
└── README.md