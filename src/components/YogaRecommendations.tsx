import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Activity, 
  Clock, 
  User, 
  Heart, 
  Zap, 
  Shield, 
  Play,
  Pause,
  RotateCcw,
  Star
} from "lucide-react";

interface YogaPose {
  id: string;
  name: string;
  hindiName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  benefits: string[];
  instructions: string[];
  precautions: string[];
  ageGroup: string[];
  category: "breathing" | "strength" | "flexibility" | "balance" | "relaxation";
}

export const YogaRecommendations = () => {
  const [userAge, setUserAge] = useState<string>("");
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recommendations, setRecommendations] = useState<YogaPose[]>([]);
  const [currentPose, setCurrentPose] = useState<YogaPose | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const conditions = [
    { id: "arthritis", name: "Arthritis / गठिया" },
    { id: "back-pain", name: "Back Pain / कमर दर्द" },
    { id: "diabetes", name: "Diabetes / मधुमेह" },
    { id: "hypertension", name: "High BP / उच्च रक्तचाप" },
    { id: "heart", name: "Heart Issues / हृदय संबंधी" },
    { id: "anxiety", name: "Anxiety / चिंता" },
  ];

  const categories = [
    { id: "all", name: "All Poses", icon: Activity },
    { id: "breathing", name: "Breathing", icon: Zap },
    { id: "strength", name: "Strength", icon: Shield },
    { id: "flexibility", name: "Flexibility", icon: User },
    { id: "balance", name: "Balance", icon: Star },
    { id: "relaxation", name: "Relaxation", icon: Heart },
  ];

  const yogaPoses: YogaPose[] = [
    {
      id: "sukhasana",
      name: "Easy Pose",
      hindiName: "सुखासन",
      difficulty: "beginner",
      duration: "5-10 minutes",
      benefits: ["Calms the mind", "Improves posture", "Reduces stress"],
      instructions: [
        "Sit cross-legged on the floor",
        "Keep your spine straight",
        "Rest hands on knees",
        "Breathe deeply and slowly",
        "Focus on your breath"
      ],
      precautions: ["Use cushion if knee pain", "Avoid if severe back issues"],
      ageGroup: ["50+", "60+", "70+"],
      category: "relaxation"
    },
    {
      id: "pranayama",
      name: "Deep Breathing",
      hindiName: "प्राणायाम",
      difficulty: "beginner",
      duration: "10-15 minutes",
      benefits: ["Lowers blood pressure", "Reduces anxiety", "Improves lung capacity"],
      instructions: [
        "Sit comfortably with spine erect",
        "Close your eyes gently",
        "Inhale slowly through nose for 4 counts",
        "Hold breath for 2 counts",
        "Exhale slowly through mouth for 6 counts",
        "Repeat 10-15 times"
      ],
      precautions: ["Don't strain", "Stop if dizzy"],
      ageGroup: ["50+", "60+", "70+", "80+"],
      category: "breathing"
    },
    {
      id: "marjaryasana",
      name: "Cat-Cow Pose",
      hindiName: "मार्जरीआसन",
      difficulty: "beginner",
      duration: "3-5 minutes",
      benefits: ["Improves spine flexibility", "Relieves back tension", "Strengthens core"],
      instructions: [
        "Start on hands and knees",
        "Inhale, arch your back (cow pose)",
        "Exhale, round your spine (cat pose)",
        "Move slowly between positions",
        "Repeat 8-10 times"
      ],
      precautions: ["Use knee pad", "Avoid if wrist pain"],
      ageGroup: ["50+", "60+"],
      category: "flexibility"
    },
    {
      id: "vrikshasana",
      name: "Tree Pose",
      hindiName: "वृक्षासन",
      difficulty: "intermediate",
      duration: "1-2 minutes each side",
      benefits: ["Improves balance", "Strengthens legs", "Enhances focus"],
      instructions: [
        "Stand straight with feet together",
        "Shift weight to left foot",
        "Place right foot on left inner thigh",
        "Bring palms together at chest",
        "Hold for 30 seconds, switch sides",
        "Use wall support if needed"
      ],
      precautions: ["Use wall for support", "Avoid if ankle injury"],
      ageGroup: ["50+", "60+"],
      category: "balance"
    },
    {
      id: "tadasana",
      name: "Mountain Pose",
      hindiName: "ताड़ासन",
      difficulty: "beginner",
      duration: "2-3 minutes",
      benefits: ["Improves posture", "Strengthens legs", "Enhances awareness"],
      instructions: [
        "Stand with feet hip-width apart",
        "Distribute weight evenly",
        "Engage thigh muscles",
        "Lengthen spine upward",
        "Relax shoulders away from ears",
        "Breathe naturally"
      ],
      precautions: ["Hold chair if balance issues"],
      ageGroup: ["50+", "60+", "70+"],
      category: "strength"
    },
    {
      id: "shavasana",
      name: "Corpse Pose",
      hindiName: "शवासन",
      difficulty: "beginner",
      duration: "10-20 minutes",
      benefits: ["Deep relaxation", "Reduces stress", "Lowers blood pressure"],
      instructions: [
        "Lie flat on your back",
        "Let arms rest naturally at sides",
        "Allow feet to fall open",
        "Close your eyes softly",
        "Focus on releasing tension",
        "Breathe naturally and deeply"
      ],
      precautions: ["Use pillow under knees if back pain"],
      ageGroup: ["50+", "60+", "70+", "80+"],
      category: "relaxation"
    }
  ];

  const getRecommendations = () => {
    if (!userAge) {
      alert("Please enter your age first");
      return;
    }

    const age = parseInt(userAge);
    let filtered = yogaPoses.filter(pose => {
      // Age-appropriate filtering
      if (age >= 80) return pose.ageGroup.includes("80+");
      if (age >= 70) return pose.ageGroup.includes("70+") || pose.ageGroup.includes("80+");
      if (age >= 60) return pose.ageGroup.includes("60+") || pose.ageGroup.includes("70+") || pose.ageGroup.includes("80+");
      if (age >= 50) return pose.ageGroup.includes("50+") || pose.ageGroup.includes("60+") || pose.ageGroup.includes("70+") || pose.ageGroup.includes("80+");
      return true;
    });

    // Category filtering
    if (selectedCategory !== "all") {
      filtered = filtered.filter(pose => pose.category === selectedCategory);
    }

    // Health condition based recommendations
    if (healthConditions.includes("arthritis") || healthConditions.includes("back-pain")) {
      filtered = filtered.filter(pose => 
        pose.difficulty === "beginner" && 
        (pose.category === "flexibility" || pose.category === "relaxation")
      );
    }

    setRecommendations(filtered);
  };

  const toggleCondition = (conditionId: string) => {
    setHealthConditions(prev => 
      prev.includes(conditionId) 
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const startPose = (pose: YogaPose) => {
    setCurrentPose(pose);
    const durationMinutes = parseInt(pose.duration.split('-')[0]) || 5;
    setTimerSeconds(durationMinutes * 60);
  };

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            Personalized Yoga for Seniors
          </CardTitle>
          <CardDescription className="text-lg">
            Age-appropriate yoga poses and breathing exercises for your wellness journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="age" className="text-base font-semibold mb-2 block">
                Your Age (आपकी उम्र)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                className="text-lg h-12"
                min="40"
                max="100"
              />
            </div>
            
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Health Conditions (स्वास्थ्य स्थिति)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {conditions.map(condition => (
                  <Button
                    key={condition.id}
                    variant={healthConditions.includes(condition.id) ? "default" : "outline"}
                    onClick={() => toggleCondition(condition.id)}
                    className="h-auto p-2 text-sm justify-start"
                  >
                    {condition.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Choose Focus Area (क्षेत्र चुनें)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map(category => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="h-auto p-3 flex-col gap-2"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={getRecommendations}
            variant="default"
            size="lg"
            className="w-full"
            disabled={!userAge}
          >
            <Activity className="w-5 h-5" />
            Get My Yoga Plan
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Star className="w-8 h-8 text-wellness" />
            Recommended Yoga Poses for You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map(pose => (
              <Card key={pose.id} className="border-wellness/30 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {pose.name} ({pose.hindiName})
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge 
                          variant={pose.difficulty === "beginner" ? "secondary" : "outline"}
                        >
                          {pose.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pose.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-wellness mb-2">🌟 Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      {pose.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-wellness">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => startPose(pose)}
                    variant="wellness"
                    className="w-full"
                  >
                    <Play className="w-4 h-4" />
                    Start This Pose
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Current Pose Guide */}
      {currentPose && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl">
                Now Practicing: {currentPose.name} ({currentPose.hindiName})
              </CardTitle>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {formatTime(timerSeconds)}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={isTimerActive ? "secondary" : "default"}
                    onClick={toggleTimer}
                    size="sm"
                  >
                    {isTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPose(null)}
                    size="sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-primary">
                  📋 Step-by-Step Instructions:
                </h4>
                <ol className="space-y-2">
                  {currentPose.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-base">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3 text-secondary">
                  ⚠️ Important Precautions:
                </h4>
                <ul className="space-y-2">
                  {currentPose.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-base">{precaution}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 p-4 bg-wellness/10 rounded-lg border border-wellness/30">
                  <p className="text-sm text-wellness-foreground">
                    <strong>Remember:</strong> Listen to your body. Stop if you feel pain or discomfort. 
                    Breathe naturally throughout the pose.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Routine Suggestion */}
      {recommendations.length > 0 && (
        <Card className="bg-ayurveda/10 border-ayurveda/30">
          <CardHeader>
            <CardTitle className="text-xl text-ayurveda-foreground">
              🌅 Suggested Daily Routine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Morning (सुबह)</h4>
                <p className="text-sm">5-10 minutes breathing exercises</p>
                <p className="text-sm">2-3 gentle poses</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Afternoon (दोपहर)</h4>
                <p className="text-sm">Simple stretches</p>
                <p className="text-sm">Balance poses with support</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Evening (शाम)</h4>
                <p className="text-sm">Relaxation poses</p>
                <p className="text-sm">Deep breathing before sleep</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};