from typing import Dict, Any
from services.google_search import GoogleSearchService
from services.website_parser import WebsiteParser


class BrandAgent:

    def analyze(self, data: Dict[str, Any]):

        product = data.get("product", {})
        brand = product.get("brand", "Unknown Brand")
        country = data.get("country", "United States")

        search = GoogleSearchService()
        website = search.find_official_website(brand)

        parser = WebsiteParser()

        if website.get("source") == "Placeholder - SerpAPI key missing":
            website_analysis = {
                "website_url": website["official_website"],
                "status": "skipped",
                "pages_found": [],
                "notes": "Website crawling skipped because official website is only a placeholder."
            }
        else:
            website_analysis = parser.analyze_brand_website(
                website["official_website"]
            )

        return {
            "status": "success",
            "agent": "Brand Intelligence Agent",
            "brand": brand,
            "country": country,
            "mission_status": "Mission Started",
            "official_website": website,
            "website_analysis": website_analysis,
            "research_plan": [
                {"step": 1, "task": "Find official brand website"},
                {"step": 2, "task": "Find wholesale page"},
                {"step": 3, "task": "Find dealer application"},
                {"step": 4, "task": "Find distributor locator"},
                {"step": 5, "task": "Find contact email"},
                {"step": 6, "task": f"Search authorized distributors in {country}"}
            ]
        }