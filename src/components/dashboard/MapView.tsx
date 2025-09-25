import { useRef, useEffect } from 'react';
import { MapPin, Eye, Shield, Navigation } from 'lucide-react';
import { Tourist, Geofence } from '@/types';
import { Button } from '@/components/ui/button';

interface MapViewProps {
  tourists: Tourist[];
  geofences: Geofence[];
  selectedTourist: Tourist | null;
  onTouristSelect: (tourist: Tourist) => void;
}

export function MapView({ tourists, geofences, selectedTourist, onTouristSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock map initialization - in real app this would integrate with Mapbox/Google Maps
  }, []);

  const getStatusColor = (status: Tourist['status']) => {
    switch (status) {
      case 'alert': return 'bg-danger shadow-[0_0_12px_hsl(0_84%_60%/0.8)]';
      case 'warning': return 'bg-warning shadow-[0_0_12px_hsl(45_100%_51%/0.6)]';
      case 'safe': return 'bg-safe shadow-[0_0_8px_hsl(120_60%_50%/0.6)]';
      default: return 'bg-muted';
    }
  };

  const getTouristPosition = (index: number) => ({
    left: `${15 + (index * 20)}%`,
    top: `${25 + (index * 15)}%`
  });

  const getGeofencePosition = (index: number) => ({
    left: `${40 + (index * 25)}%`,
    top: `${50 + (index * 12)}%`
  });

  return (
    <div className="relative h-full rounded-xl overflow-hidden border border-border/30">
      <div 
        ref={mapRef} 
        className="w-full h-full gradient-map relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, hsl(217 91% 60% / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, hsl(189 94% 43% / 0.1) 0%, transparent 50%)
          `
        }}
      >
        {/* Map Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(215 25% 27% / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(215 25% 27% / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Tourist Markers */}
        {tourists.map((tourist, index) => (
          <div
            key={tourist.id}
            onClick={() => onTouristSelect(tourist)}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20 group"
            style={getTouristPosition(index)}
          >
            <div className={`
              w-4 h-4 rounded-full border-2 border-white transition-all duration-300
              ${getStatusColor(tourist.status)}
              ${tourist.status === 'alert' ? 'animate-pulse-alert' : ''}
              ${selectedTourist?.id === tourist.id ? 'scale-150 ring-4 ring-primary/30' : 'hover:scale-125'}
            `} />
            
            {selectedTourist?.id === tourist.id && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm text-foreground p-3 rounded-lg shadow-xl border border-border/50 whitespace-nowrap text-sm animate-fade-in z-30">
                <div className="font-semibold text-primary">{tourist.name}</div>
                <div className="text-muted-foreground">{tourist.lastLocation}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Safety Score: <span className={`font-medium ${
                    tourist.safetyScore >= 80 ? 'text-safe' :
                    tourist.safetyScore >= 60 ? 'text-warning' : 'text-danger'
                  }`}>{tourist.safetyScore}%</span>
                </div>
                <div className="text-xs text-muted-foreground">{tourist.lastSeen}</div>
              </div>
            )}
          </div>
        ))}

        {/* Geofence Overlays */}
        {geofences.map((zone, index) => (
          <div
            key={zone.id}
            className="absolute border-2 rounded-lg transition-all duration-300 hover:bg-opacity-30"
            style={{
              ...getGeofencePosition(index),
              width: '140px',
              height: '90px',
              borderColor: zone.name.includes('Restricted') ? 'hsl(0 84% 60%)' : 
                          zone.name.includes('Safe') ? 'hsl(120 60% 50%)' : 'hsl(189 94% 43%)',
              backgroundColor: zone.name.includes('Restricted') ? 'hsl(0 84% 60% / 0.15)' : 
                              zone.name.includes('Safe') ? 'hsl(120 60% 50% / 0.15)' : 'hsl(189 94% 43% / 0.15)',
              borderStyle: 'dashed'
            }}
          >
            <div className={`
              text-xs font-medium p-1 rounded 
              ${zone.name.includes('Restricted') ? 'text-danger' : 
                zone.name.includes('Safe') ? 'text-safe' : 'text-accent'}
            `}>
              {zone.name}
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90"
          >
            <MapPin className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
          <div className="text-sm font-medium text-foreground mb-2">Status Legend</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-safe"></div>
              <span className="text-muted-foreground">Safe</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-danger animate-pulse"></div>
              <span className="text-muted-foreground">Alert</span>
            </div>
          </div>
        </div>

        {/* Safety HQ Branding */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Safety HQ Live Map</span>
        </div>
      </div>
    </div>
  );
}