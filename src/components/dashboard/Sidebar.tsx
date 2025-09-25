import { useState } from 'react';
import { Shield, Users, AlertTriangle, MapPin, Settings, LogOut, Menu, X, Bell, Hotel, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ViewType, User, Alert } from '@/types';

interface SidebarProps {
  user: User;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onLogout: () => void;
  alerts: Alert[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ user, activeView, setActiveView, onLogout, alerts, isOpen, setIsOpen }: SidebarProps) {
  const criticalAlerts = alerts.filter(a => a.severity === 'high').length;
  
  const navigationItems = [
    { 
      id: 'dashboard' as ViewType, 
      name: 'Dashboard', 
      icon: Shield, 
      badge: null 
    },
    { 
      id: 'tourists' as ViewType, 
      name: 'Tourists', 
      icon: Users, 
      badge: null 
    },
    { 
      id: 'alerts' as ViewType, 
      name: 'Alerts', 
      icon: AlertTriangle, 
      badge: criticalAlerts > 0 ? criticalAlerts : null,
      urgent: criticalAlerts > 0
    },
    { 
      id: 'geofences' as ViewType, 
      name: 'Geofences', 
      icon: MapPin, 
      badge: null 
    },
    { 
      id: 'hotels' as ViewType, 
      name: 'Hotels', 
      icon: Hotel, 
      badge: null 
    },
    { 
      id: 'travel' as ViewType, 
      name: 'Travel Assistance', 
      icon: HeartHandshake, 
      badge: null 
    },
    { 
      id: 'settings' as ViewType, 
      name: 'Settings', 
      icon: Settings, 
      badge: null 
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 
        w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-sidebar-accent border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center glow-primary">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">Safety HQ</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8 px-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setIsOpen(false);
              }}
              variant={activeView === item.id ? 'secondary' : 'ghost'}
              className={`
                w-full justify-start text-left h-12 px-4 transition-all duration-200
                ${activeView === item.id 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground glow-primary shadow-lg' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }
                ${item.urgent ? 'animate-pulse-alert' : ''}
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <Badge 
                  className={`
                    ml-2 px-2 py-1 text-xs
                    ${item.urgent 
                      ? 'bg-danger text-danger-foreground glow-alert' 
                      : 'bg-primary text-primary-foreground'
                    }
                  `}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="mb-4 p-3 bg-sidebar-accent rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.email}
                </p>
                <p className="text-xs text-sidebar-foreground/70 capitalize">
                  {user.type} Access
                </p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-danger/10 hover:text-danger"
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
}