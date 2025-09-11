import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Phone, 
  Stethoscope, 
  Leaf, 
  Users, 
  Clock, 
  Mic, 
  Languages,
  Activity,
  Pill
} from "lucide-react";
import heroWellness from "@/assets/hero-wellness.jpg";
import { SymptomChecker } from "./SymptomChecker";
import { EmergencyCall } from "./EmergencyCall";
import { LanguageSelector } from "./LanguageSelector";
import { VoiceRecognition } from "./VoiceRecognition";
import { YogaRecommendations } from "./YogaRecommendations";
import { MedicineReminder } from "./MedicineReminder";

const HealthDashboard = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: "symptoms",
      title: "Symptom Checker",
      description: "Check your symptoms and get Ayurvedic remedies",
      icon: Stethoscope,
      variant: "default" as const,
      component: SymptomChecker
    },
    {
      id: "emergency",
      title: "Emergency Call",
      description: "Quick access to nearby hospitals",
      icon: Phone,
      variant: "emergency" as const,
      component: EmergencyCall
    },
    {
      id: "yoga",
      title: "Yoga for You",
      description: "Age-appropriate yoga exercises",
      icon: Activity,
      variant: "wellness" as const,
      component: YogaRecommendations
    },
    {
      id: "medicine",
      title: "Medicine Reminder",
      description: "Never miss your medication",
      icon: Pill,
      variant: "secondary" as const,
      component: MedicineReminder
    },
    {
      id: "voice",
      title: "Voice Assistant",
      description: "Speak your symptoms",
      icon: Mic,
      variant: "ayurveda" as const,
      component: VoiceRecognition
    }
  ];

  const ActiveComponent = activeFeature 
    ? features.find(f => f.id === activeFeature)?.component 
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroWellness})` }}
        />
        <div className="absolute inset-0 bg-healing-gradient opacity-90" />
        
        <div className="relative z-10 container mx-auto px-4 py-12 text-center text-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-white" />
              <h1 className="text-3xl font-bold">स्वास्थ्य सेवक</h1>
            </div>
            <LanguageSelector />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Personal Health Companion
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Traditional Ayurvedic wisdom meets modern convenience. Get personalized health guidance, 
            emergency support, and wellness recommendations designed for your golden years.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setActiveFeature("symptoms")}
              className="text-xl"
            >
              <Stethoscope className="w-6 h-6" />
              Check Your Health
            </Button>
            <Button 
              variant="emergency" 
              size="lg"
              onClick={() => setActiveFeature("emergency")}
              className="text-xl"
            >
              <Phone className="w-6 h-6" />
              Emergency Help
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {activeFeature && ActiveComponent ? (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setActiveFeature(null)}
              className="mb-6"
            >
              ← Back to Dashboard
            </Button>
            <ActiveComponent />
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="glass-effect border-wellness/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-wellness/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-wellness" />
                  </div>
                  <h3 className="text-2xl font-bold text-wellness mb-2">50,000+</h3>
                  <p className="text-muted-foreground">Happy Users</p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-ayurveda/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-ayurveda/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-ayurveda" />
                  </div>
                  <h3 className="text-2xl font-bold text-ayurveda mb-2">500+</h3>
                  <p className="text-muted-foreground">Ayurvedic Remedies</p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-accent/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Languages className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-2">4</h3>
                  <p className="text-muted-foreground">Languages Supported</p>
                </CardContent>
              </Card>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card 
                    key={feature.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] glass-effect"
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 float-gentle">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button 
                        variant={feature.variant} 
                        className="w-full"
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Health Tips Section */}
            <div className="mt-16">
              <Card className="bg-wellness-gradient text-white">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Today's Wellness Tip</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 mr-3" />
                    <span className="text-xl">Morning Routine</span>
                  </div>
                  <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                    Start your day with warm water mixed with honey and lemon. This ancient Ayurvedic practice 
                    helps cleanse your system, boost metabolism, and improve digestion naturally.
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HealthDashboard;