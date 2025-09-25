import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Phone, 
  Clock, 
  Star, 
  Shield, 
  Search,
  AlertTriangle,
  Heart,
  Car,
  BookOpen,
  Globe,
  MapPin
} from 'lucide-react';
import { TravelService, TravelRecommendation } from '@/types';
import { mockTravelServices, mockRecommendations } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function TravelAssistance() {
  const [services] = useState<TravelService[]>(mockTravelServices);
  const [recommendations] = useState<TravelRecommendation[]>(mockRecommendations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<TravelService | null>(null);
  const { toast } = useToast();

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-danger" />;
      case 'medical': return <Heart className="w-5 h-5 text-success" />;
      case 'transport': return <Car className="w-5 h-5 text-primary" />;
      case 'guide': return <BookOpen className="w-5 h-5 text-accent" />;
      case 'translation': return <Globe className="w-5 h-5 text-warning" />;
      default: return <Shield className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'offline': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleContactService = (service: TravelService) => {
    toast({
      title: "Contacting Service",
      description: `Connecting you with ${service.name}...`,
    });
    
    // Mock contact process
    setTimeout(() => {
      toast({
        title: "Contact Established ✓",
        description: `You are now connected with ${service.name}. Expected response time: ${service.responseTime}`,
      });
    }, 1500);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Travel Assistance</h2>
          <p className="text-muted-foreground">24/7 support services and travel recommendations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-danger" />
            <span>Emergency Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices
              .filter(service => service.type === 'emergency')
              .map((service) => (
                <Card key={service.id} className="border-danger/20 bg-danger/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{service.name}</h4>
                      <Badge className="bg-success text-success-foreground">
                        Available 24/7
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <Button 
                      className="w-full bg-danger hover:bg-danger/90 text-danger-foreground"
                      onClick={() => handleContactService(service)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Call
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Available Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredServices
              .filter(service => service.type !== 'emergency')
              .map((service) => (
                <Card 
                  key={service.id} 
                  className={`border-border/30 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedService?.id === service.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedService(selectedService?.id === service.id ? null : service)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {getServiceIcon(service.type)}
                        <div>
                          <h4 className="font-semibold text-foreground">{service.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{service.type}</p>
                        </div>
                      </div>
                      <Badge className={getAvailabilityColor(service.availability)}>
                        {service.availability}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span>{service.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{service.responseTime}</span>
                        </div>
                      </div>
                      <div className="text-primary font-semibold">
                        {service.price === 0 ? 'Free' : `$${service.price}/${service.priceUnit}`}
                      </div>
                    </div>

                    {selectedService?.id === service.id && (
                      <div className="border-t border-border/30 pt-4 mt-4 space-y-3 animate-in slide-in-from-top-1">
                        {service.languages && (
                          <div>
                            <h5 className="text-sm font-semibold text-foreground mb-1">Languages</h5>
                            <div className="flex flex-wrap gap-1">
                              {service.languages.map((lang, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {service.specialties && (
                          <div>
                            <h5 className="text-sm font-semibold text-foreground mb-1">Specialties</h5>
                            <div className="flex flex-wrap gap-1">
                              {service.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleContactService(service)}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Contact
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            Locate
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>

        {/* Travel Recommendations */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Safe Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="border-border/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{rec.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{rec.type} • {rec.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm">{rec.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">{rec.safetyScore}/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  
                  {rec.tips && rec.tips.length > 0 && (
                    <div className="bg-primary/5 rounded-md p-3">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Safety Tips</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {rec.tips.slice(0, 2).map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
