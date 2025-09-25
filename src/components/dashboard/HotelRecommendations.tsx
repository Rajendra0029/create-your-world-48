import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Hotel, 
  MapPin, 
  Star, 
  Shield, 
  Phone, 
  Mail, 
  Wifi, 
  Car,
  Heart,
  ExternalLink
} from 'lucide-react';
import { Hotel as HotelType } from '@/types';
import { mockHotels } from '@/data/mockData';

export function HotelRecommendations() {
  const [hotels] = useState<HotelType[]>(mockHotels);
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('security') || amenity.toLowerCase().includes('safe')) {
      return <Shield className="w-4 h-4" />;
    }
    if (amenity.toLowerCase().includes('wifi')) {
      return <Wifi className="w-4 h-4" />;
    }
    if (amenity.toLowerCase().includes('parking')) {
      return <Car className="w-4 h-4" />;
    }
    return <Heart className="w-4 h-4" />;
  };

  const getSafetyColor = (rating: number) => {
    if (rating >= 9) return 'text-success';
    if (rating >= 8) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Hotel Recommendations</h2>
          <p className="text-muted-foreground">Safe and verified accommodations for tourists</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>View on Map</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card 
            key={hotel.id} 
            className={`bg-card/50 backdrop-blur-sm border-border/30 hover:shadow-lg transition-all duration-300 cursor-pointer ${
              selectedHotel?.id === hotel.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedHotel(selectedHotel?.id === hotel.id ? null : hotel)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Hotel className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {hotel.name}
                  </CardTitle>
                </div>
                <Badge 
                  variant={hotel.availability ? "default" : "secondary"}
                  className={hotel.availability ? "bg-success text-success-foreground" : ""}
                >
                  {hotel.availability ? "Available" : "Booked"}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span>{hotel.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {hotel.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className={`w-5 h-5 ${getSafetyColor(hotel.safetyRating)}`} />
                  <span className={`text-sm font-medium ${getSafetyColor(hotel.safetyRating)}`}>
                    Safety: {hotel.safetyRating}/10
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    ${hotel.price}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    per {hotel.priceUnit}
                  </div>
                </div>
              </div>

              {selectedHotel?.id === hotel.id && (
                <div className="border-t border-border/30 pt-4 space-y-4 animate-in slide-in-from-top-1">
                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Safety Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center space-x-1">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Contact Information</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{hotel.contact.phone}</span>
                      </div>
                      {hotel.contact.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3" />
                          <span>{hotel.contact.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {hotel.bookingUrl && (
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs"
                        disabled={!hotel.availability}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Book Now
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {hotels.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 text-center">
          <CardContent>
            <Hotel className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Hotels Available</h3>
            <p className="text-muted-foreground">
              There are currently no hotels available in your selected area. Please try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}