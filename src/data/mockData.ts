import { Tourist, Alert, Geofence } from '@/types';

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