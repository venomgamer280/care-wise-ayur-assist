import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Navigation,
  Heart,
  Shield,
  Users
} from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  distance: string;
  phone: string;
  address: string;
  specialty: string[];
  rating: number;
  estimatedTime: string;
  emergency24h: boolean;
}

export const EmergencyCall = () => {
  const [userLocation, setUserLocation] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string | null>(null);

  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "City General Hospital",
      distance: "0.8 km",
      phone: "+91-11-2345-6789",
      address: "123 Medical Street, Central Delhi",
      specialty: ["Emergency", "Cardiology", "Neurology"],
      rating: 4.5,
      estimatedTime: "5 mins",
      emergency24h: true
    },
    {
      id: "2",
      name: "Ayurveda Health Center",
      distance: "1.2 km",
      phone: "+91-11-2345-6790",
      address: "456 Wellness Avenue, South Delhi",
      specialty: ["Ayurvedic Medicine", "Geriatric Care", "Emergency"],
      rating: 4.3,
      estimatedTime: "8 mins",
      emergency24h: true
    },
    {
      id: "3",
      name: "Senior Care Medical Center",
      distance: "1.5 km",
      phone: "+91-11-2345-6791",
      address: "789 Elder Street, West Delhi",
      specialty: ["Geriatric Medicine", "Emergency", "Orthopedics"],
      rating: 4.7,
      estimatedTime: "10 mins",
      emergency24h: true
    }
  ];

  const emergencyTypes = [
    { id: "chest-pain", name: "Chest Pain", icon: Heart, severity: "critical" },
    { id: "breathing", name: "Breathing Problems", icon: AlertTriangle, severity: "critical" },
    { id: "fall", name: "Fall/Injury", icon: Shield, severity: "urgent" },
    { id: "dizziness", name: "Severe Dizziness", icon: Users, severity: "urgent" },
    { id: "other", name: "Other Emergency", icon: AlertTriangle, severity: "urgent" }
  ];

  const getCurrentLocation = async () => {
    setIsLocating(true);
    
    try {
      // Simulate getting location
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUserLocation("New Delhi, India");
      setNearbyHospitals(mockHospitals);
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setIsLocating(false);
    }
  };

  const callHospital = (phone: string, hospitalName: string) => {
    // In a real app, this would trigger a phone call
    window.open(`tel:${phone}`);
    
    // You can also show a confirmation dialog
    alert(`Calling ${hospitalName} at ${phone}`);
  };

  const callEmergencyServices = () => {
    // Emergency numbers for India
    const emergencyNumbers = ["108", "102", "112"];
    window.open(`tel:${emergencyNumbers[0]}`);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      <Card className="border-emergency bg-emergency/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emergency rounded-full flex items-center justify-center pulse-emergency">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emergency">Emergency Services</h2>
              <p className="text-base text-muted-foreground">Quick access to medical help</p>
            </div>
          </div>
          
          <Button 
            variant="emergency" 
            size="xl" 
            onClick={callEmergencyServices}
            className="w-full mb-4"
          >
            <Phone className="w-6 h-6" />
            Call Emergency (108/112)
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            For immediate life-threatening emergencies, call the national emergency number
          </p>
        </CardContent>
      </Card>

      {/* Emergency Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-secondary" />
            What type of emergency?
          </CardTitle>
          <CardDescription>
            Select the type of emergency to get appropriate guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emergencyTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={emergencyType === type.id ? "default" : "outline"}
                  onClick={() => setEmergencyType(type.id)}
                  className="h-auto p-4 justify-start"
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">{type.name}</div>
                    <Badge 
                      variant={type.severity === "critical" ? "destructive" : "secondary"}
                      className="text-xs mt-1"
                    >
                      {type.severity}
                    </Badge>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Location and Hospital Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <MapPin className="w-6 h-6 text-primary" />
            Nearby Hospitals
          </CardTitle>
          <CardDescription>
            Find hospitals and medical centers near your location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter your location or use GPS"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="text-lg h-12"
            />
            <Button 
              onClick={getCurrentLocation}
              disabled={isLocating}
              variant="outline"
              size="lg"
            >
              {isLocating ? (
                <>
                  <Navigation className="w-5 h-5 animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  Use GPS
                </>
              )}
            </Button>
          </div>

          {nearbyHospitals.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Nearby Medical Centers:</h3>
              {nearbyHospitals.map((hospital) => (
                <Card key={hospital.id} className="border-wellness/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{hospital.name}</h4>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.distance} • {hospital.estimatedTime} away</span>
                        </div>
                        <p className="text-sm">{hospital.address}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          ⭐ {hospital.rating}
                        </Badge>
                        {hospital.emergency24h && (
                          <Badge variant="outline" className="block">
                            <Clock className="w-3 h-3 mr-1" />
                            24/7
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hospital.specialty.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => callHospital(hospital.phone, hospital.name)}
                        variant="default"
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.open(`https://maps.google.com/search/${encodeURIComponent(hospital.address)}`)}
                        className="flex-1"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Instructions */}
      {emergencyType && (
        <Card className="bg-secondary/10 border-secondary/30">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">
              Immediate Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {emergencyType === "chest-pain" && (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-emergency">⚠️ Chest Pain Emergency Protocol:</p>
                <ul className="space-y-2 text-base">
                  <li>• Sit down and rest immediately</li>
                  <li>• Chew aspirin if available and not allergic</li>
                  <li>• Loosen tight clothing</li>
                  <li>• Call emergency services NOW</li>
                  <li>• Stay calm and try to relax</li>
                </ul>
              </div>
            )}
            
            {emergencyType === "breathing" && (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-emergency">⚠️ Breathing Emergency Protocol:</p>
                <ul className="space-y-2 text-base">
                  <li>• Sit upright, lean slightly forward</li>
                  <li>• Use inhaler if prescribed</li>
                  <li>• Try to breathe slowly through nose</li>
                  <li>• Call for help immediately</li>
                  <li>• Stay as calm as possible</li>
                </ul>
              </div>
            )}
            
            {emergencyType === "fall" && (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-secondary">🛡️ After a Fall:</p>
                <ul className="space-y-2 text-base">
                  <li>• Don't move if you feel pain</li>
                  <li>• Check for injuries carefully</li>
                  <li>• Call for help if unable to get up</li>
                  <li>• Apply ice to swollen areas</li>
                  <li>• Monitor for delayed symptoms</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Important Contacts */}
      <Card className="bg-ayurveda/10 border-ayurveda/30">
        <CardHeader>
          <CardTitle className="text-xl text-ayurveda-foreground">
            Important Emergency Numbers (India)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Emergency Services:</strong> 108, 112</p>
              <p><strong>Ambulance:</strong> 102</p>
              <p><strong>Police:</strong> 100</p>
            </div>
            <div className="space-y-2">
              <p><strong>Fire Service:</strong> 101</p>
              <p><strong>Disaster Management:</strong> 1078</p>
              <p><strong>Women Helpline:</strong> 1091</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};