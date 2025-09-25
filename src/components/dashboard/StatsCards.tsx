import { Users, AlertTriangle, Shield, MapPin, Activity, Clock } from 'lucide-react';
import { Tourist, Alert } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  tourists: Tourist[];
  alerts: Alert[];
}

export function StatsCards({ tourists, alerts }: StatsCardsProps) {
  const activeTourists = tourists.length;
  const criticalAlerts = alerts.filter(a => a.severity === 'high').length;
  const avgSafetyScore = Math.round(tourists.reduce((acc, t) => acc + t.safetyScore, 0) / tourists.length);
  const safeTourists = tourists.filter(t => t.status === 'safe').length;
  const alertTourists = tourists.filter(t => t.status === 'alert').length;
  
  const stats = [
    {
      title: 'Active Tourists',
      value: activeTourists,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      trend: '+2 today'
    },
    {
      title: 'Critical Alerts',
      value: criticalAlerts,
      icon: AlertTriangle,
      color: criticalAlerts > 0 ? 'text-danger' : 'text-safe',
      bgColor: criticalAlerts > 0 ? 'bg-danger/20' : 'bg-safe/20',
      trend: criticalAlerts > 0 ? 'Active' : 'All Clear',
      pulse: criticalAlerts > 0
    },
    {
      title: 'Avg Safety Score',
      value: `${avgSafetyScore}%`,
      icon: Shield,
      color: avgSafetyScore >= 80 ? 'text-safe' : avgSafetyScore >= 60 ? 'text-warning' : 'text-danger',
      bgColor: avgSafetyScore >= 80 ? 'bg-safe/20' : avgSafetyScore >= 60 ? 'bg-warning/20' : 'bg-danger/20',
      trend: '+3% this week'
    },
    {
      title: 'Safe Status',
      value: safeTourists,
      icon: Activity,
      color: 'text-safe',
      bgColor: 'bg-safe/20',
      trend: `${Math.round((safeTourists / activeTourists) * 100)}% safe`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`
            bg-card/50 backdrop-blur-sm border-border/30 hover:bg-card/70 transition-all duration-300
            ${stat.pulse ? 'glow-alert' : ''}
          `}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
                ${stat.bgColor}
                ${stat.pulse ? 'animate-pulse-alert' : ''}
              `}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-foreground leading-none">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.title}
                </p>
                <p className={`text-xs mt-1 ${
                  stat.trend.includes('Active') ? 'text-danger' :
                  stat.trend.includes('All Clear') ? 'text-safe' :
                  'text-muted-foreground'
                }`}>
                  {stat.trend}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}