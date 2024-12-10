# Oman Deals Scraper

A Python-based web scraping tool to collect deals and discounts from various Omani e-commerce and retail websites.

## Features

- Scrapes deals from multiple sources (Amazon, Carrefour, etc.)
- Extracts detailed deal information (price, discount, expiry date)
- Categorizes deals by type (Electronics, Groceries, etc.)
- Sorts deals by discount percentage
- Saves results in JSON format
- Handles dynamic content using Selenium
- Implements ethical scraping practices

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd oman-deals-scraper
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install Chrome WebDriver (required for Selenium)

## Usage

Run the main script:
```bash
python main.py
```

The script will:
1. Scrape deals from all configured sources
2. Sort and categorize the deals
3. Save results in the `data` directory

Results are saved in two formats:
- By category: `data/deals_<category>_<timestamp>.json`
- Top deals: `data/top_deals_<timestamp>.json`

## Adding New Scrapers

1. Create a new scraper in `scrapers/sites/`
2. Inherit from `BaseScraper` class
3. Implement the `scrape()` method
4. Add the scraper to the list in `main.py`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
