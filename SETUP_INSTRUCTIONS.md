# Car Import Website Setup Instructions

## Overview
This is a car import website that connects customers with trusted importers. The website features live car data from Google Sheets, Google Sign-In, and a Chatbase bot integration.

## Features Implemented

### ✅ Completed Features
1. **Homepage with Car Listings**
   - Live car data from Google Sheets API (mock data for now)
   - Local price vs Initiative price display
   - Car selection functionality
   - Responsive design

2. **Registration System**
   - Google Sign-In integration (mock implementation)
   - Email/Phone registration form
   - Initiative checkbox option
   - Budget selection

3. **Confirmation Page**
   - Order summary display
   - Car details and pricing
   - Registration data confirmation

4. **Chatbase Bot Integration**
   - Floating chat bubble
   - Connected to live car data
   - Available 24/7 for customer support

5. **FAQ Page**
   - Common questions and answers
   - Contact information
   - Process explanation

6. **Navigation**
   - Updated navigation menu
   - Removed "partners" section as requested
   - Added FAQ link

## Setup Instructions

### 1. Environment Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Google Sheets Integration

To connect with your Google Sheets:

1. **Create Google Sheets API Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create API credentials (Service Account or API Key)

2. **Configure Environment Variables:**
   ```bash
   # Create .env file
   GOOGLE_SHEETS_API_KEY=your_api_key_here
   GOOGLE_SHEETS_URL=http://bit.ly/4oA5zoy
   ```

3. **Update Google Sheets Structure:**
   Your Google Sheets should have the following columns:
   - Column A: Brand
   - Column B: Model
   - Column C: Year
   - Column D: Local Price
   - Column E: Initiative Price
   - Column F: Image URL
   - Column G: Features (comma-separated)
   - Column H: Category

### 3. Google Sign-In Setup

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized origins and redirect URIs

2. **Update Auth Configuration:**
   ```javascript
   // In src/hooks/useAuth.jsx
   // Replace mock implementation with actual Google OAuth
   ```

### 4. Chatbase Bot Configuration

The Chatbase bot is already integrated with the provided iframe:
```html
<iframe
  src="https://www.chatbase.co/chatbot-iframe/kHcJYDNgLO1E4FHxTh3Iy"
  width="400"
  height="600"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15)"
  title="Chatbot"
/>
```

### 5. Backend API Setup

The website includes a Python API for handling car data:

```bash
# Install Python dependencies
pip install requests flask

# Run the API server
python api/cars.py
```

## File Structure

```
src/
├── pages/
│   ├── Home.tsx              # Main homepage with car listings
│   └── FAQ.tsx               # FAQ page
├── services/
│   ├── carService.ts         # Car data management
│   └── registrationService.ts # Registration handling
├── hooks/
│   └── useAuth.jsx           # Authentication management
└── components/
    └── layout/
        └── Navigation.tsx    # Updated navigation

api/
└── cars.py                   # Backend API for car data

public/
└── google-icon.svg           # Google Sign-In icon
```

## Customization

### 1. Styling
- The website uses Tailwind CSS for styling
- Colors and branding can be customized in `tailwind.config.ts`
- Arabic RTL support is included

### 2. Content
- Update car data in `src/services/carService.ts`
- Modify FAQ content in `src/pages/FAQ.tsx`
- Update contact information in navigation

### 3. Features
- Add more car categories
- Implement real Google OAuth
- Add payment integration
- Implement admin dashboard

## Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the dist folder to Netlify
```

## API Endpoints

### Cars API
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get specific car
- `GET /api/cars/category/:category` - Get cars by category

### Registration API
- `POST /api/registrations` - Submit registration
- `GET /api/registrations` - Get all registrations (admin)

## Environment Variables

```bash
# Google Sheets
GOOGLE_SHEETS_API_KEY=your_api_key
GOOGLE_SHEETS_URL=your_sheets_url

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Database (if using)
DATABASE_URL=your_database_url

# Email Service (if using)
SENDGRID_API_KEY=your_sendgrid_key
```

## Troubleshooting

### Common Issues

1. **Google Sheets API Error:**
   - Check API key configuration
   - Verify Google Sheets permissions
   - Ensure correct sheet structure

2. **Google Sign-In Not Working:**
   - Verify OAuth credentials
   - Check authorized origins
   - Update redirect URIs

3. **Chatbase Bot Not Loading:**
   - Check internet connection
   - Verify iframe URL
   - Check browser console for errors

### Support

For technical support or questions:
- Check the FAQ page
- Use the Chatbase bot
- Contact the development team

## Next Steps

1. **Production Deployment:**
   - Set up production environment
   - Configure SSL certificates
   - Set up monitoring and analytics

2. **Additional Features:**
   - Admin dashboard for managing registrations
   - Email notifications
   - Payment processing
   - Car comparison tool

3. **Performance Optimization:**
   - Image optimization
   - Code splitting
   - Caching strategies
   - CDN setup

## License

This project is proprietary and confidential. All rights reserved.