import os
import requests
from dotenv import load_dotenv
from typing import Dict

load_dotenv()


class GoogleSearchService:

    def __init__(self):
        self.api_key = os.getenv("SERPAPI_API_KEY")

    def find_official_website(self, brand: str) -> Dict:

        if not self.api_key:
            return {
                "brand": brand,
                "official_website": f"https://www.{brand.lower().replace(' ', '')}.com",
                "confidence": 50,
                "source": "Placeholder - SerpAPI key missing"
            }

        params = {
            "engine": "google",
            "q": f"{brand} official website",
            "api_key": self.api_key
        }

        response = requests.get(
            "https://serpapi.com/search",
            params=params,
            timeout=15
        )

        data = response.json()
        results = data.get("organic_results", [])

        if not results:
            return {
                "brand": brand,
                "official_website": None,
                "confidence": 0,
                "source": "SerpAPI - No results found"
            }

        top_result = results[0]

        return {
            "brand": brand,
            "official_website": top_result.get("link"),
            "title": top_result.get("title"),
            "snippet": top_result.get("snippet"),
            "confidence": 75,
            "source": "SerpAPI"
        }