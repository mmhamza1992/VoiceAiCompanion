import os
import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CarAPI:
    def __init__(self):
        self.cache = {}
        self.cache_duration = timedelta(minutes=5)
        self.last_fetch = None
        
        # Google Sheets configuration
        self.sheets_url = os.getenv('GOOGLE_SHEETS_URL', 'http://bit.ly/4oA5zoy')
        self.api_key = os.getenv('GOOGLE_SHEETS_API_KEY')
        
    def get_cars(self) -> List[Dict[str, Any]]:
        """Fetch cars data from Google Sheets or return cached data"""
        try:
            # Check if cache is still valid
            if self._is_cache_valid():
                logger.info("Returning cached car data")
                return self.cache.get('cars', [])
            
            # Fetch fresh data
            cars_data = self._fetch_from_sheets()
            if cars_data:
                self.cache['cars'] = cars_data
                self.last_fetch = datetime.now()
                logger.info(f"Fetched {len(cars_data)} cars from Google Sheets")
                return cars_data
            else:
                # Return mock data if sheets fetch fails
                logger.warning("Failed to fetch from Google Sheets, returning mock data")
                return self._get_mock_cars()
                
        except Exception as e:
            logger.error(f"Error fetching cars: {str(e)}")
            return self._get_mock_cars()
    
    def _is_cache_valid(self) -> bool:
        """Check if cached data is still valid"""
        if not self.last_fetch or 'cars' not in self.cache:
            return False
        return datetime.now() - self.last_fetch < self.cache_duration
    
    def _fetch_from_sheets(self) -> Optional[List[Dict[str, Any]]]:
        """Fetch data from Google Sheets API"""
        try:
            # This is a placeholder for actual Google Sheets API integration
            # You would need to implement the actual API call here
            
            # Example implementation:
            # if not self.api_key:
            #     logger.error("Google Sheets API key not configured")
            #     return None
            # 
            # response = requests.get(
            #     f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{RANGE}",
            #     params={'key': self.api_key}
            # )
            # 
            # if response.status_code == 200:
            #     data = response.json()
            #     return self._parse_sheets_data(data['values'])
            # else:
            #     logger.error(f"Google Sheets API error: {response.status_code}")
            #     return None
            
            # For now, return None to trigger mock data
            return None
            
        except Exception as e:
            logger.error(f"Error fetching from Google Sheets: {str(e)}")
            return None
    
    def _parse_sheets_data(self, rows: List[List[str]]) -> List[Dict[str, Any]]:
        """Parse Google Sheets data into car objects"""
        cars = []
        for i, row in enumerate(rows[1:], 1):  # Skip header row
            if len(row) >= 7:
                car = {
                    'id': str(i),
                    'brand': row[0].strip(),
                    'model': row[1].strip(),
                    'year': row[2].strip(),
                    'localPrice': row[3].strip(),
                    'initiativePrice': row[4].strip(),
                    'image': row[5].strip() if len(row) > 5 else self._get_default_image(),
                    'features': row[6].split(',') if len(row) > 6 else [],
                    'category': row[7].strip() if len(row) > 7 else 'Sedan'
                }
                cars.append(car)
        return cars
    
    def _get_default_image(self) -> str:
        """Get default car image"""
        return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"
    
    def _get_mock_cars(self) -> List[Dict[str, Any]]:
        """Return mock car data for development/testing"""
        return [
            {
                'id': '1',
                'brand': 'BMW',
                'model': 'X5',
                'year': '2023',
                'localPrice': '2,500,000',
                'initiativePrice': '1,000,000',
                'image': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
                'features': ['SUV', 'Luxury', '4WD'],
                'category': 'SUV'
            },
            {
                'id': '2',
                'brand': 'Mercedes',
                'model': 'C-Class',
                'year': '2024',
                'localPrice': '1,800,000',
                'initiativePrice': '800,000',
                'image': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
                'features': ['Sedan', 'Luxury', 'Premium'],
                'category': 'Sedan'
            },
            {
                'id': '3',
                'brand': 'Toyota',
                'model': 'Camry',
                'year': '2023',
                'localPrice': '1,200,000',
                'initiativePrice': '600,000',
                'image': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
                'features': ['Sedan', 'Reliable', 'Fuel Efficient'],
                'category': 'Sedan'
            },
            {
                'id': '4',
                'brand': 'Honda',
                'model': 'CR-V',
                'year': '2024',
                'localPrice': '1,500,000',
                'initiativePrice': '750,000',
                'image': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
                'features': ['SUV', 'Practical', 'Safe'],
                'category': 'SUV'
            },
            {
                'id': '5',
                'brand': 'Audi',
                'model': 'A4',
                'year': '2024',
                'localPrice': '2,200,000',
                'initiativePrice': '1,100,000',
                'image': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
                'features': ['Sedan', 'Luxury', 'Performance'],
                'category': 'Sedan'
            },
            {
                'id': '6',
                'brand': 'Lexus',
                'model': 'RX',
                'year': '2023',
                'localPrice': '2,800,000',
                'initiativePrice': '1,400,000',
                'image': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
                'features': ['SUV', 'Luxury', 'Hybrid'],
                'category': 'SUV'
            }
        ]
    
    def get_car_by_id(self, car_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific car by ID"""
        cars = self.get_cars()
        return next((car for car in cars if car['id'] == car_id), None)
    
    def get_cars_by_category(self, category: str) -> List[Dict[str, Any]]:
        """Get cars filtered by category"""
        cars = self.get_cars()
        return [car for car in cars if car['category'].lower() == category.lower()]
    
    def search_cars(self, query: str) -> List[Dict[str, Any]]:
        """Search cars by brand, model, or features"""
        cars = self.get_cars()
        query_lower = query.lower()
        
        return [
            car for car in cars
            if (query_lower in car['brand'].lower() or
                query_lower in car['model'].lower() or
                any(query_lower in feature.lower() for feature in car['features']))
        ]
    
    def clear_cache(self):
        """Clear the cache to force fresh data fetch"""
        self.cache = {}
        self.last_fetch = None
        logger.info("Car cache cleared")

# Global instance
car_api = CarAPI()

def handle_cars_request(event, context):
    """Lambda handler for cars API endpoint"""
    try:
        method = event.get('httpMethod', 'GET')
        path = event.get('path', '')
        
        if method == 'GET':
            if path == '/api/cars':
                cars = car_api.get_cars()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                    },
                    'body': json.dumps({
                        'success': True,
                        'data': cars,
                        'count': len(cars)
                    })
                }
            elif path.startswith('/api/cars/'):
                car_id = path.split('/')[-1]
                car = car_api.get_car_by_id(car_id)
                if car:
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'success': True,
                            'data': car
                        })
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'success': False,
                            'error': 'Car not found'
                        })
                    }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Method not allowed'
            })
        }
        
    except Exception as e:
        logger.error(f"Error handling cars request: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Internal server error'
            })
        }

if __name__ == "__main__":
    # Test the API
    cars = car_api.get_cars()
    print(f"Found {len(cars)} cars")
    for car in cars[:3]:
        print(f"- {car['brand']} {car['model']} ({car['year']})")