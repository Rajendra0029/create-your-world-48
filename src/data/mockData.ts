import { Tourist, Alert, Geofence, Hotel, TravelService, TravelRecommendation } from '@/types';

export const mockTourists: Tourist[] = [
  { 
    id: 'T001', 
    name: 'John Doe', 
    safetyScore: 85, 
    lastLocation: 'Times Square', 
    status: 'safe', 
    lat: 40.7589, 
    lng: -73.9851, 
    lastSeen: '2 min ago', 
    txHash: '0x1a2b3c4d5e6f...', 
    phone: '+1-555-0123', 
    email: 'john@email.com' 
  },
  { 
    id: 'T002', 
    name: 'Jane Smith', 
    safetyScore: 92, 
    lastLocation: 'Central Park', 
    status: 'safe', 
    lat: 40.7829, 
    lng: -73.9654, 
    lastSeen: '5 min ago', 
    txHash: '0x4d5e6f7g8h9i...', 
    phone: '+1-555-0456', 
    email: 'jane@email.com' 
  },
  { 
    id: 'T003', 
    name: 'Mike Johnson', 
    safetyScore: 45, 
    lastLocation: 'Brooklyn Bridge', 
    status: 'alert', 
    lat: 40.7061, 
    lng: -73.9969, 
    lastSeen: '1 min ago', 
    txHash: '0x7g8h9i0j1k2l...', 
    phone: '+1-555-0789', 
    email: 'mike@email.com' 
  },
  { 
    id: 'T004', 
    name: 'Sarah Wilson', 
    safetyScore: 78, 
    lastLocation: 'Empire State Building', 
    status: 'warning', 
    lat: 40.7484, 
    lng: -73.9857, 
    lastSeen: '3 min ago', 
    txHash: '0x2l3m4n5o6p7q...', 
    phone: '+1-555-0321', 
    email: 'sarah@email.com' 
  },
];

export const mockAlerts: Alert[] = [
  { 
    id: 1, 
    type: 'Panic', 
    touristId: 'T003', 
    severity: 'high', 
    time: '2 min ago', 
    location: 'Brooklyn Bridge', 
    message: 'Tourist pressed panic button - immediate assistance required' 
  },
  { 
    id: 2, 
    type: 'Geofence', 
    touristId: 'T004', 
    severity: 'medium', 
    time: '5 min ago', 
    location: 'Restricted Zone A', 
    message: 'Tourist entered restricted area without authorization' 
  },
  { 
    id: 3, 
    type: 'Inactivity', 
    touristId: 'T001', 
    severity: 'low', 
    time: '10 min ago', 
    location: 'Times Square', 
    message: 'No movement detected for 30 minutes' 
  },
  { 
    id: 4, 
    type: 'Geofence', 
    touristId: 'T002', 
    severity: 'medium', 
    time: '15 min ago', 
    location: 'Safe Zone Boundary', 
    message: 'Tourist exited designated safe zone' 
  },
];

export const mockGeofences: Geofence[] = [
  { 
    id: 1, 
    name: 'Restricted Zone A', 
    coordinates: [[40.7500, -73.9800], [40.7520, -73.9780], [40.7540, -73.9820], [40.7520, -73.9840]] 
  },
  { 
    id: 2, 
    name: 'Safe Zone Central', 
    coordinates: [[40.7800, -73.9700], [40.7820, -73.9680], [40.7840, -73.9720], [40.7820, -73.9740]] 
  },
  { 
    id: 3, 
    name: 'Emergency Assembly Point', 
    coordinates: [[40.7600, -73.9750], [40.7620, -73.9730], [40.7630, -73.9760], [40.7610, -73.9770]] 
  },
];

export const mockHotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "Grand Safety Plaza",
    location: "Downtown District",
    rating: 4.8,
    price: 150,
    priceUnit: "night",
    amenities: ["24/7 Security", "Emergency Button", "CCTV", "Safe Room", "Medical Kit"],
    images: ["/placeholder.svg"],
    description: "Premium hotel with advanced security features and emergency protocols.",
    safetyRating: 9.5,
    lat: 40.7589,
    lng: -73.9851,
    contact: {
      phone: "+1-555-0101",
      email: "info@grandsafetyplaza.com"
    },
    availability: true,
    bookingUrl: "https://booking.example.com/grand-safety-plaza"
  },
  {
    id: "hotel-2",
    name: "Secure Haven Hotel",
    location: "Tourist Quarter",
    rating: 4.6,
    price: 120,
    priceUnit: "night",
    amenities: ["Panic Button", "24/7 Concierge", "Secure Parking", "Medical Center"],
    images: ["/placeholder.svg"],
    description: "Family-friendly hotel with comprehensive safety measures.",
    safetyRating: 9.2,
    lat: 40.7612,
    lng: -73.9776,
    contact: {
      phone: "+1-555-0102",
      email: "reservations@securehaven.com"
    },
    availability: true
  },
  {
    id: "hotel-3",
    name: "Guardian Inn",
    location: "Business District",
    rating: 4.4,
    price: 95,
    priceUnit: "night",
    amenities: ["Security Guards", "Emergency Exits", "First Aid", "Safe Deposit"],
    images: ["/placeholder.svg"],
    description: "Budget-friendly accommodation with essential safety features.",
    safetyRating: 8.8,
    lat: 40.7505,
    lng: -73.9733,
    contact: {
      phone: "+1-555-0103",
      email: "bookings@guardianinn.com"
    },
    availability: false
  }
];

export const mockTravelServices: TravelService[] = [
  {
    id: "service-1",
    type: "emergency",
    name: "24/7 Emergency Response",
    description: "Immediate assistance for any emergency situation",
    location: "Citywide Coverage",
    rating: 4.9,
    price: 0,
    priceUnit: "free",
    contact: {
      phone: "+1-911",
      email: "emergency@safetravelers.com"
    },
    availability: "available",
    responseTime: "5-10 minutes"
  },
  {
    id: "service-2",
    type: "medical",
    name: "Tourist Medical Center",
    description: "Specialized medical care for travelers",
    location: "Central Medical District",
    rating: 4.7,
    price: 75,
    priceUnit: "consultation",
    contact: {
      phone: "+1-555-MEDIC",
      email: "care@touristmedical.com"
    },
    availability: "available",
    responseTime: "15-30 minutes",
    languages: ["English", "Spanish", "French", "Mandarin"],
    specialties: ["Travel Medicine", "Emergency Care", "Vaccination"]
  },
  {
    id: "service-3",
    type: "guide",
    name: "Certified Safety Guide",
    description: "Professional tour guide with safety expertise",
    location: "Tourist Areas",
    rating: 4.8,
    price: 50,
    priceUnit: "hour",
    contact: {
      phone: "+1-555-GUIDE"
    },
    availability: "available",
    responseTime: "30-60 minutes",
    languages: ["English", "Spanish", "French"],
    specialties: ["City Tours", "Safety Planning", "Emergency Protocols"]
  },
  {
    id: "service-4",
    type: "transport",
    name: "Secure Transport",
    description: "Safe and monitored transportation service",
    location: "Airport & City",
    rating: 4.6,
    price: 25,
    priceUnit: "trip",
    contact: {
      phone: "+1-555-RIDE"
    },
    availability: "available",
    responseTime: "10-15 minutes"
  },
  {
    id: "service-5",
    type: "translation",
    name: "Emergency Translation",
    description: "Real-time translation for emergencies",
    location: "Phone/Video Support",
    rating: 4.5,
    price: 2,
    priceUnit: "minute",
    contact: {
      phone: "+1-555-TRANSLATE"
    },
    availability: "available",
    responseTime: "immediate",
    languages: ["20+ Languages Supported"]
  }
];

export const mockRecommendations: TravelRecommendation[] = [
  {
    id: "rec-1",
    type: "restaurant",
    name: "Safe Eats Bistro",
    location: "Downtown",
    rating: 4.7,
    description: "High-rated restaurant with excellent food safety standards",
    safetyScore: 9.3,
    lat: 40.7580,
    lng: -73.9855,
    images: ["/placeholder.svg"],
    tips: ["Always check food temperature", "Avoid tap water", "Ask about allergens"]
  },
  {
    id: "rec-2",
    type: "attraction",
    name: "Security Museum",
    location: "Cultural District",
    rating: 4.5,
    description: "Educational museum with modern security systems",
    safetyScore: 9.1,
    lat: 40.7614,
    lng: -73.9776,
    images: ["/placeholder.svg"],
    tips: ["Keep valuables secure", "Stay with groups", "Follow posted guidelines"]
  },
  {
    id: "rec-3",
    type: "activity",
    name: "Guided Safety Walk",
    location: "Historic Quarter",
    rating: 4.9,
    description: "Educational walking tour focusing on personal safety",
    safetyScore: 9.8,
    lat: 40.7505,
    lng: -73.9733,
    images: ["/placeholder.svg"],
    tips: ["Wear comfortable shoes", "Bring water", "Stay close to guide"]
  }
];