import { useState } from 'react';
import { Menu, Bell, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Tourist, Alert, Geofence, ViewType } from '@/types';
import { mockTourists, mockAlerts, mockGeofences } from '@/data/mockData';
import { Sidebar } from './Sidebar';
import { MapView } from './MapView';
import { AlertFeed } from './AlertFeed';
import { TouristModal } from './TouristModal';
import { StatsCards } from './StatsCards';
import { TouristList } from './TouristList';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [tourists] = useState<Tourist[]>(mockTourists);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [geofences] = useState<Geofence[]>(mockGeofences);
  const { toast } = useToast();

  const handleVerifyId = async (touristId: string) => {
    toast({
      title: "Blockchain Verification",
      description: `Verifying identity for tourist ${touristId}...`,
    });
    
    // Mock verification process
    setTimeout(() => {
      toast({
        title: "Verification Complete ✓",
        description: `Tourist ${touristId} identity verified successfully via blockchain.`,
      });
    }, 2000);
  };

  const criticalAlerts = alerts.filter(a => a.severity === 'high').length;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={onLogout}
        alerts={alerts}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border/30 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {activeView === 'dashboard' ? 'Tourist Safety Dashboard' : 
                   activeView.charAt(0).toUpperCase() + activeView.slice(1)}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time monitoring and safety management
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Alert Bell */}
              <Button
                variant="ghost"
                size="sm"
                className={`relative ${criticalAlerts > 0 ? 'text-danger animate-pulse' : 'text-muted-foreground'}`}
              >
                <Bell className="h-5 w-5" />
                {criticalAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 bg-danger text-danger-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold glow-alert">
                    {criticalAlerts}
                  </span>
                )}
              </Button>
              
              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <div className="text-sm text-muted-foreground">
                  Welcome, <span className="text-foreground font-medium">{user.email}</span>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-semibold">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-hidden p-6 space-y-6">
          {activeView === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <StatsCards tourists={tourists} alerts={alerts} />

              {/* Main Dashboard Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-240px)]">
                {/* Map Section */}
                <div className="xl:col-span-3">
                  <MapView 
                    tourists={tourists}
                    geofences={geofences}
                    selectedTourist={selectedTourist}
                    onTouristSelect={setSelectedTourist}
                  />
                </div>

                {/* Side Panel */}
                <div className="xl:col-span-1 space-y-6 overflow-y-auto">
                  {/* Alert Feed */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
                        <Bell className="w-5 h-5 text-primary" />
                        <span>Live Alerts</span>
                        {criticalAlerts > 0 && (
                          <span className="bg-danger text-danger-foreground text-xs px-2 py-1 rounded-full glow-alert">
                            {criticalAlerts} Critical
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-80 overflow-y-auto">
                      <AlertFeed alerts={alerts} />
                    </CardContent>
                  </Card>

                  {/* Tourist List */}
                  <TouristList
                    tourists={tourists}
                    selectedTourist={selectedTourist}
                    onTouristSelect={setSelectedTourist}
                  />
                </div>
              </div>
            </>
          )}

          {/* Other Views */}
          {activeView !== 'dashboard' && (
            <div className="flex items-center justify-center h-full">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 text-center">
                <CardContent>
                  <div className="space-y-4">
                    {activeView === 'tourists' && <Users className="w-16 h-16 text-primary mx-auto" />}
                    {activeView === 'alerts' && <Bell className="w-16 h-16 text-danger mx-auto" />}
                    {activeView === 'geofences' && <MapPin className="w-16 h-16 text-accent mx-auto" />}
                    {activeView === 'settings' && <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">⚙️</div>}
                    
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2 capitalize">
                        {activeView} Management
                      </h2>
                      <p className="text-muted-foreground">
                        This section is under development. Return to the dashboard to access live monitoring features.
                      </p>
                    </div>
                    
                    <Button onClick={() => setActiveView('dashboard')} className="mt-4">
                      Return to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Tourist Profile Modal */}
      <TouristModal
        tourist={selectedTourist}
        onClose={() => setSelectedTourist(null)}
        onVerifyId={handleVerifyId}
      />
    </div>
  );
}
