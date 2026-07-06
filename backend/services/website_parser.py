import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from typing import Dict, List


class WebsiteParser:

    def analyze_brand_website(self, website_url: str) -> Dict:

        if not website_url:
            return {
                "website_url": None,
                "status": "missing",
                "pages_found": [],
                "notes": "No official website available."
            }

        try:
            response = requests.get(
                website_url,
                timeout=15,
                headers={
                    "User-Agent": "Mozilla/5.0"
                }
            )

            if response.status_code >= 400:
                return {
                    "website_url": website_url,
                    "status": "error",
                    "pages_found": [],
                    "notes": f"Website returned status code {response.status_code}"
                }

            soup = BeautifulSoup(response.text, "html.parser")

            keywords = [
                "contact",
                "wholesale",
                "dealer",
                "distributor",
                "retailer",
                "stockist",
                "become a dealer",
                "become a retailer",
                "where to buy"
            ]

            pages_found: List[Dict] = []
            seen_urls = set()

            for link in soup.find_all("a", href=True):
                text = link.get_text(" ", strip=True).lower()
                href = link["href"].strip()
                full_url = urljoin(website_url, href)

                parsed_original = urlparse(website_url)
                parsed_found = urlparse(full_url)

                if parsed_original.netloc != parsed_found.netloc:
                    continue

                combined = f"{text} {full_url}".lower()

                for keyword in keywords:
                    if keyword in combined and full_url not in seen_urls:
                        seen_urls.add(full_url)

                        pages_found.append({
                            "type": keyword.title(),
                            "text": text,
                            "url": full_url
                        })

            return {
                "website_url": website_url,
                "status": "success",
                "pages_found": pages_found,
                "notes": f"Found {len(pages_found)} possible useful pages."
            }

        except Exception as error:
            return {
                "website_url": website_url,
                "status": "error",
                "pages_found": [],
                "notes": str(error)
            }