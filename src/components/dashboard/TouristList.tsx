import { Tourist } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone } from 'lucide-react';

interface TouristListProps {
  tourists: Tourist[];
  selectedTourist: Tourist | null;
  onTouristSelect: (tourist: Tourist) => void;
}

export function TouristList({ tourists, selectedTourist, onTouristSelect }: TouristListProps) {
  const getStatusStyles = (status: Tourist['status']) => {
    switch (status) {
      case 'alert':
        return 'bg-danger/20 text-danger border-danger/30 glow-alert';
      case 'warning':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'safe':
        return 'bg-safe/20 text-safe border-safe/30';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return 'text-safe';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span>Live Tourist Feed</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {tourists.map((tourist) => (
          <Card
            key={tourist.id}
            onClick={() => onTouristSelect(tourist)}
            className={`
              cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-card/30 border-border/20
              ${selectedTourist?.id === tourist.id ? 'ring-2 ring-primary/50 bg-primary/10' : 'hover:bg-card/50'}
              ${tourist.status === 'alert' ? 'animate-pulse-alert' : ''}
            `}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                    ${tourist.status === 'alert' ? 'bg-danger' : 
                      tourist.status === 'warning' ? 'bg-warning' : 'bg-safe'}
                  `}>
                    {tourist.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tourist.name}</p>
                    <p className="text-xs text-muted-foreground">ID: {tourist.id}</p>
                  </div>
                </div>
                <Badge className={getStatusStyles(tourist.status)}>
                  {tourist.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Safety Score</span>
                  <span className={`font-semibold ${getSafetyScoreColor(tourist.safetyScore)}`}>
                    {tourist.safetyScore}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{tourist.lastLocation}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{tourist.lastSeen}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span className="font-mono">{tourist.phone.slice(-4)}</span>
                  </div>
                </div>

                {/* Mini Progress Bar for Safety Score */}
                <div className="w-full bg-muted/30 rounded-full h-1.5 mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tourist.safetyScore >= 80 ? 'bg-safe' :
                      tourist.safetyScore >= 60 ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${tourist.safetyScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}