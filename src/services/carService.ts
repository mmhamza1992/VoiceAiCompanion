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
const GOOGLE_SHEETS_URL = 'http://bit.ly/4oA5zoy';
const GOOGLE_SERVICE_ACCOUNT_KEY = {
  "type": "service_account",
  "project_id": "n8nn-456312",
  "private_key_id": "4723315dedb9408acca8d78cef6d7a48a22ecf15",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeSnIRkVPCg1e0\n17AwHkyAx+dqI50kqAnRUwAitn344C8hVR1rWNbaxzIOatkTO6VGmmO5G8fVMd5a\n0uBaQ8NqyU+naHxxVrHsPOXxReRUO/lcAEWpH/d20o/pvu1erofZ1KPo2tEXj0H4\ngRByZTuE2XHIGReXwwEerpVUhqiJ4MV/zAdF+B1KfEKpw8RHgWpiWcFnUe6VHuWe\npm4Z6sAmqEN5XDp3IWv0wfICskofG1GF/IDjhMWgB8XR0ZZ1unxydS5U3jKOOXjX\nqtWGXMOen4yBn5pn7qSThLTyV9lW1cRFHzajdlYDgUdX2TLE5IyQcsJcH1k2LTP6\nCeSVyW8ZAgMBAAECggEAQteH/LAkMRbaggS0o1UgFB+WMqVQVerZnnmQrJfocSBl\n9orlLe/pZqBIHHt1KCB/ReWrJ7857uaskSjMUYGc8yqIRtah+hBUeMAsj2pmpUVg\nIsAAqo7Tpmr7F4cm4F0OA+e9wXYpZmv5vTDvG4dxD0PtPsSNyGmxvt2VNIjagcHs\n+CWZF4yfhXUnHQ9LLBQtuIdqZEefgpVDKV75RegjAFEgZ+3um+9Q5XMbwAaP1fBH\nDTrXPAu4dc57RcYx4uUc6iYImJ/9p3nQB8MpMVeZaNUt4Nk/Vmk85dv3BW+ZxzBU\nFvS5BLHclIxGeCHL+O2kEuDnJVvIZIhSkr0DdYA02wKBgQDWn/VzaZlRJmGxEUmD\nE1jDKKEsO1UPM2MvjiSPXXKCAlMtAjqOjwPpyg2A/M43TLDL31cuhQUKeNx19OW7\nBoEEtRF9IFGeo0PuCTKtpDKdnp9/JRoujsWTpC/p/qTdJ0byRM6DNeELsM6X48Nc\nNJ3DsxmmFzbWU6ZUPnv1MLPf0wKBgQC8zlJrbQ2/3EJNmm9T7X8WDEI6slE12j/d\nWrLmgyQnJCj5pl2ToojVRRdv9m0N++YAQ808zrmiQ7r16OfPAqcSoW47E4dvxt55\n7uBX6CbNVerCrZhXW3E3Y0ugcoL8yfujrWDBU9mEyB+yS0/OBM16xcv7SNOSGB8j\nmioSGPrN4wKBgGZZb76zDAcz64B6Qvk7/6dJt9qVDNIr6k/iVDL+GD5Bh5K+LliP\ngQk7bsclR939N45xmmy3yJie3FtwByHyTxKEmqt1/xZMu3dHcaB23iBmZZ9HfT3Y\nngXzVVocMli4g0/DWkweJIzjqxGp7x8IhHev8DpRdbgtufMQvSJHMHA7AoGAdqfn\nzlGb+X7QQHsVChbQ7qdHnCHivchqqI9OrWWve9XS1oqCdr0H55hjUV76THaJppL1\n0ghNS7frMI5t2IBfRWsknoX4cPv3Z4QDg9uHPzaGslBs1EHIljmWFsDAp2O8/LGC\nhB1RL4yhtuhzwBLunADg4Ax1wnPcZgCF/heqz2cCgYEAgmhuOuYchHnW0L6bhirA\n+v4UJERR9nxN8/1ptwVXHls9pPZwBbw3nPXLqzm0bs6v+Pt5JvcmBFUisTZ27cJ0\nf62aMbYbYugPArmIdgwGoipm6YGy0PJ4kzFYWNKk5/sJWCpvtXxn5wrdMkkihLSF\nK8oXGoPoWCB3a8Bn3RFbgAc=\n-----END PRIVATE KEY-----\n",
  "client_email": "replit@n8nn-456312.iam.gserviceaccount.com",
  "client_id": "107283498481771264551",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/replit%40n8nn-456312.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

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
      // Try to fetch from Google Sheets first
      const sheetsData = await this.fetchCarsFromGoogleSheets();
      if (sheetsData && sheetsData.length > 0) {
        this.cache = sheetsData;
        this.lastFetch = Date.now();
        return sheetsData;
      }
      
      // Fallback to mock data
      const mockCars = this.getMockCars();
      this.cache = mockCars;
      this.lastFetch = Date.now();
      return mockCars;
    } catch (error) {
      console.error('Error fetching car data:', error);
      // Return cached data if available, otherwise return mock data
      return this.cache.length > 0 ? this.cache : this.getMockCars();
    }
  }

  async fetchCarsFromGoogleSheets(): Promise<CarData[]> {
    try {
      // For now, we'll use a proxy approach since direct Google Sheets API calls from frontend
      // require CORS handling. In production, this should be handled by your backend API.
      
      // You can implement this by:
      // 1. Creating a backend endpoint that uses the service account
      // 2. Or using Google Sheets API with proper CORS headers
      
      // For now, return null to trigger mock data
      return [];
      
      // Example implementation for backend:
      /*
      const response = await fetch('/api/cars/sheets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.cars;
      }
      */
    } catch (error) {
      console.error('Error fetching from Google Sheets:', error);
      return [];
    }
  }

  private getMockCars(): CarData[] {
    return [
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