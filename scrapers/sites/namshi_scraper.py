from typing import List, Optional
from datetime import datetime
import re
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from ..base_scraper import BaseScraper, Deal

class NamshiScraper(BaseScraper):
    def __init__(self):
        super().__init__("Namshi")
        self.base_url = "https://www.namshi.com"
        self.deals_url = f"{self.base_url}/oman/men/clothing/under-99/"

    def _parse_price(self, price_str: str) -> Optional[float]:
        try:
            price = re.sub(r"[^\d.]", "", price_str)
            return float(price)
        except (ValueError, TypeError):
            return None

    def _parse_discount(self, discount_str: str) -> Optional[float]:
        try:
            match = re.search(r"(\d+)%", discount_str)
            return float(match.group(1)) if match else None
        except (ValueError, TypeError):
            return None

    def scrape(self) -> List[Deal]:
        deals = []
        self.logger.info("Starting Namshi deals scraping")
        
        try:
            driver = self._get_driver()
            driver.get(self.deals_url)
            
            # Wait for deals to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".productContainer"))
            )
            
            # Scroll to load more products
            for _ in range(3):
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                WebDriverWait(driver, 5).until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".productContainer")) > len(deals))
            
            soup = BeautifulSoup(driver.page_source, "html.parser")
            deal_elements = soup.select(".productContainer")
            
            for element in deal_elements:
                try:
                    name_elem = element.select_one(".itemName")
                    price_elem = element.select_one(".price")
                    original_price_elem = element.select_one(".oldPrice")
                    discount_elem = element.select_one(".discount")
                    url_elem = element.select_one("a.itemLink")
                    brand_elem = element.select_one(".brandName")
                    
                    if not name_elem or not price_elem or not url_elem:
                        continue
                        
                    brand = brand_elem.text.strip() if brand_elem else ""
                    name = f"{brand} {name_elem.text.strip()}"
                    price = self._parse_price(price_elem.text)
                    original_price = self._parse_price(original_price_elem.text) if original_price_elem else None
                    discount = self._parse_discount(discount_elem.text) if discount_elem else None
                    url = f"{self.base_url}{url_elem['href']}"
                    
                    # Calculate discount if not directly provided
                    if not discount and original_price and price:
                        discount = round(((original_price - price) / original_price) * 100, 1)
                    
                    deal = Deal(
                        name=name,
                        category="Fashion",
                        discount=discount,
                        original_price=original_price,
                        discounted_price=price,
                        url=url,
                        location="Oman",
                        source="Namshi"
                    )
                    deals.append(deal)
                except Exception as e:
                    self.logger.error(f"Error parsing deal: {str(e)}")
                    continue
                
        except Exception as e:
            self.logger.error(f"Error scraping Namshi: {str(e)}")
        finally:
            if self._driver:
                self._driver.quit()
        
        self.logger.info(f"Found {len(deals)} deals from Namshi")
        return deals
