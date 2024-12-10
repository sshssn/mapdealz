import asyncio
from datetime import datetime
from typing import List
import json
from pathlib import Path
from scrapers.sites.amazon_scraper import AmazonScraper
from scrapers.sites.sharafdg_scraper import SharafDGScraper
from scrapers.sites.namshi_scraper import NamshiScraper
from scrapers.base_scraper import Deal

async def run_scrapers() -> List[Deal]:
    all_deals = []
    scrapers = [
        AmazonScraper(),
        SharafDGScraper(),
        NamshiScraper()
    ]
    
    for scraper in scrapers:
        try:
            deals = scraper.scrape()
            all_deals.extend(deals)
        except Exception as e:
            print(f"Error running {scraper.name} scraper: {str(e)}")
    
    return all_deals

def sort_deals_by_discount(deals: List[Deal]) -> List[Deal]:
    return sorted(
        [d for d in deals if d.discount is not None],
        key=lambda x: x.discount or 0,
        reverse=True
    )

def group_deals_by_category(deals: List[Deal]) -> dict:
    categories = {}
    for deal in deals:
        if deal.category not in categories:
            categories[deal.category] = []
        categories[deal.category].append(deal)
    return categories

def save_results(deals: List[Deal]):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    Path("data").mkdir(exist_ok=True)
    
    # Save by category
    categorized = group_deals_by_category(deals)
    for category, category_deals in categorized.items():
        deals_data = [deal.to_dict() for deal in category_deals]
        filename = f"data/deals_{category.lower()}_{timestamp}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(deals_data, f, indent=2, ensure_ascii=False)
    
    # Save top deals
    top_deals = sort_deals_by_discount(deals)[:20]
    deals_data = [deal.to_dict() for deal in top_deals]
    filename = f"data/top_deals_{timestamp}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(deals_data, f, indent=2, ensure_ascii=False)

def main():
    print("Starting deal scrapers...")
    deals = asyncio.run(run_scrapers())
    print(f"Found {len(deals)} deals")
    save_results(deals)
    print("Results saved to data directory")

if __name__ == "__main__":
    main() 