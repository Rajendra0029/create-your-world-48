export interface Tourist {
  id: string;
  name: string;
  safetyScore: number;
  lastLocation: string;
  status: 'safe' | 'warning' | 'alert';
  lat: number;
  lng: number;
  lastSeen: string;
  txHash: string;
  phone: string;
  email: string;
}

export interface Alert {
  id: number;
  type: 'Panic' | 'Geofence' | 'Inactivity';
  touristId: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
  location: string;
  message: string;
}

export interface Geofence {
  id: number;
  name: string;
  coordinates: [number, number][];
}

export interface User {
  email: string;
  type: 'admin' | 'tourist';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  priceUnit: 'night' | 'week' | 'month';
  amenities: string[];
  images: string[];
  description: string;
  safetyRating: number;
  lat: number;
  lng: number;
  contact: {
    phone: string;
    email: string;
  };
  availability: boolean;
  bookingUrl?: string;
}

export interface TravelService {
  id: string;
  type: 'transport' | 'guide' | 'emergency' | 'medical' | 'translation';
  name: string;
  description: string;
  location: string;
  rating: number;
  price: number;
  priceUnit: string;
  contact: {
    phone: string;
    email?: string;
  };
  availability: 'available' | 'busy' | 'offline';
  responseTime: string;
  languages?: string[];
  specialties?: string[];
}

export interface TravelRecommendation {
  id: string;
  type: 'hotel' | 'restaurant' | 'attraction' | 'activity';
  name: string;
  location: string;
  rating: number;
  description: string;
  safetyScore: number;
  lat: number;
  lng: number;
  images: string[];
  tips: string[];
}

export type UserType = 'admin' | 'tourist';
export type ViewType = 'dashboard' | 'tourists' | 'alerts' | 'geofences' | 'hotels' | 'travel' | 'settings';