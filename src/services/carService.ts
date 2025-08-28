interface CarData {
  id: string;
  brand: string;
  model: string;
  year: string;
  localPrice: string;
  initiativePrice: string;
  image: string;
  features: string[];
  category: string;
}

// Google Sheets API configuration
const GOOGLE_SHEETS_URL = 'http://bit.ly/4oA5zoy'; // This would be your actual Google Sheets API endpoint

export class CarService {
  private static instance: CarService;
  private cache: CarData[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static getInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
    }
    return CarService.instance;
  }

  async fetchCars(): Promise<CarData[]> {
    // Check if cache is still valid
    if (this.cache.length > 0 && Date.now() - this.lastFetch < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      // In a real implementation, you would fetch from Google Sheets API
      // For now, using mock data that simulates the structure
      const mockCars: CarData[] = [
        {
          id: '1',
          brand: 'BMW',
          model: 'X5',
          year: '2023',
          localPrice: '2,500,000',
          initiativePrice: '1,000,000',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          features: ['SUV', 'Luxury', '4WD'],
          category: 'SUV'
        },
        {
          id: '2',
          brand: 'Mercedes',
          model: 'C-Class',
          year: '2024',
          localPrice: '1,800,000',
          initiativePrice: '800,000',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          features: ['Sedan', 'Luxury', 'Premium'],
          category: 'Sedan'
        },
        {
          id: '3',
          brand: 'Toyota',
          model: 'Camry',
          year: '2023',
          localPrice: '1,200,000',
          initiativePrice: '600,000',
          image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
          features: ['Sedan', 'Reliable', 'Fuel Efficient'],
          category: 'Sedan'
        },
        {
          id: '4',
          brand: 'Honda',
          model: 'CR-V',
          year: '2024',
          localPrice: '1,500,000',
          initiativePrice: '750,000',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          features: ['SUV', 'Practical', 'Safe'],
          category: 'SUV'
        },
        {
          id: '5',
          brand: 'Audi',
          model: 'A4',
          year: '2024',
          localPrice: '2,200,000',
          initiativePrice: '1,100,000',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          features: ['Sedan', 'Luxury', 'Performance'],
          category: 'Sedan'
        },
        {
          id: '6',
          brand: 'Lexus',
          model: 'RX',
          year: '2023',
          localPrice: '2,800,000',
          initiativePrice: '1,400,000',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          features: ['SUV', 'Luxury', 'Hybrid'],
          category: 'SUV'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      this.cache = mockCars;
      this.lastFetch = Date.now();

      return mockCars;
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Return cached data if available, otherwise return empty array
      return this.cache.length > 0 ? this.cache : [];
    }
  }

  async fetchCarsFromGoogleSheets(): Promise<CarData[]> {
    try {
      // This is where you would implement the actual Google Sheets API call
      // You would need to:
      // 1. Set up Google Sheets API credentials
      // 2. Use the Google Sheets API to fetch data
      // 3. Transform the data into the CarData format
      
      // Example implementation (you'll need to replace this with actual API call):
      /*
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
      const data = await response.json();
      
      return data.values.map((row, index) => ({
        id: index.toString(),
        brand: row[0],
        model: row[1],
        year: row[2],
        localPrice: row[3],
        initiativePrice: row[4],
        image: row[5] || 'https://via.placeholder.com/400/300',
        features: row[6] ? row[6].split(',').map(f => f.trim()) : [],
        category: row[7] || 'Sedan'
      }));
      */
      
      // For now, return mock data
      return this.fetchCars();
    } catch (error) {
      console.error('Error fetching from Google Sheets:', error);
      return this.fetchCars(); // Fallback to mock data
    }
  }

  getCarById(id: string): CarData | undefined {
    return this.cache.find(car => car.id === id);
  }

  getCarsByCategory(category: string): CarData[] {
    return this.cache.filter(car => car.category === category);
  }

  clearCache(): void {
    this.cache = [];
    this.lastFetch = 0;
  }
}

export default CarService.getInstance();