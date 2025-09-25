import { AlertTriangle, MapPin, Clock, Bell, Users } from 'lucide-react';
import { Alert } from '@/types';
import { Card } from '@/components/ui/card';

interface AlertFeedProps {
  alerts: Alert[];
}

export function AlertFeed({ alerts }: AlertFeedProps) {
  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'alert-high glow-alert';
      case 'medium':
        return 'alert-medium';
      case 'low':
        return 'alert-low';
      default:
        return 'border-l-4 border-muted bg-muted/10';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'Panic':
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      case 'Geofence':
        return <MapPin className="w-4 h-4 text-warning" />;
      case 'Inactivity':
        return <Clock className="w-4 h-4 text-accent" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (severity: Alert['severity']) => {
    const styles = {
      high: 'bg-danger/20 text-danger border-danger/30',
      medium: 'bg-warning/20 text-warning border-warning/30',
      low: 'bg-accent/20 text-accent border-accent/30'
    };
    
    return (
      <span className={`
        px-2 py-1 text-xs font-medium rounded-full border 
        ${styles[severity]}
      `}>
        {severity.toUpperCase()}
      </span>
    );
  };

  if (alerts.length === 0) {
    return (
      <Card className="p-6 text-center bg-card/50 border-border/30">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-safe/20 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-safe" />
          </div>
          <div>
            <p className="text-foreground font-medium">All Clear</p>
            <p className="text-sm text-muted-foreground">No active alerts</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`
            p-4 transition-all duration-300 hover:scale-[1.01] cursor-pointer
            ${getSeverityStyles(alert.severity)}
            animate-slide-in
          `}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getTypeIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-foreground text-sm">
                    {alert.type} Alert
                  </span>
                  {getPriorityBadge(alert.severity)}
                </div>
                <span className="text-xs text-muted-foreground flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{alert.time}</span>
                </span>
              </div>
              
              <p className="text-sm text-foreground/90 mb-2 leading-relaxed">
                {alert.message}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{alert.touristId}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{alert.location}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}