import { Phone, Mail, CheckCircle, XCircle, MapPin, Shield, Clock } from 'lucide-react';
import { Tourist } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TouristModalProps {
  tourist: Tourist | null;
  onClose: () => void;
  onVerifyId: (touristId: string) => void;
}

export function TouristModal({ tourist, onClose, onVerifyId }: TouristModalProps) {
  if (!tourist) return null;

  const getStatusStyles = (status: Tourist['status']) => {
    switch (status) {
      case 'alert':
        return 'bg-danger text-danger-foreground';
      case 'warning':
        return 'bg-warning text-foreground';
      case 'safe':
        return 'bg-safe text-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return 'text-safe';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-border/50 animate-fade-in">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                ${tourist.status === 'alert' ? 'bg-danger glow-alert' : 
                  tourist.status === 'warning' ? 'bg-warning' : 'bg-safe'}
              `}>
                {tourist.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Tourist Profile</h3>
                <p className="text-sm text-muted-foreground">ID: {tourist.id}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground"
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-foreground">{tourist.name}</h4>
              <Badge className={getStatusStyles(tourist.status)}>
                {tourist.status.charAt(0).toUpperCase() + tourist.status.slice(1)}
              </Badge>
            </div>

            {/* Safety Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/50 rounded-lg p-3 border border-border/30">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Safety Score</span>
                </div>
                <p className={`text-xl font-bold ${getSafetyScoreColor(tourist.safetyScore)}`}>
                  {tourist.safetyScore}%
                </p>
              </div>
              <div className="bg-card/50 rounded-lg p-3 border border-border/30">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Last Seen</span>
                </div>
                <p className="text-sm font-medium text-foreground">{tourist.lastSeen}</p>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-card/50 rounded-lg p-3 border border-border/30">
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Current Location</span>
              </div>
              <p className="font-medium text-foreground">{tourist.lastLocation}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {tourist.lat.toFixed(4)}, {tourist.lng.toFixed(4)}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-foreground/80">Contact Information</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 bg-card/30 rounded-lg">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{tourist.phone}</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-card/30 rounded-lg">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{tourist.email}</span>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="border-t border-border/30 pt-4">
              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Blockchain ID</span>
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    Verified
                  </Badge>
                </div>
                <p className="text-xs font-mono text-muted-foreground mb-3 break-all">
                  {tourist.txHash}
                </p>
                <Button
                  onClick={() => onVerifyId(tourist.id)}
                  className="w-full glow-primary"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Re-verify Blockchain Identity
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}