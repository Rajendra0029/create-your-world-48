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

export type UserType = 'admin' | 'tourist';
export type ViewType = 'dashboard' | 'tourists' | 'alerts' | 'geofences' | 'settings';