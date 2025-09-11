import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Thermometer,
  Heart,
  Brain,
  Zap
} from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
}

interface Disease {
  name: string;
  probability: number;
  description: string;
  ayurvedicRemedies: string[];
  precautions: string[];
  severity: "mild" | "moderate" | "severe";
}

export const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [analysis, setAnalysis] = useState<Disease[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms: Symptom[] = [
    { id: "fever", name: "Fever", severity: "moderate" },
    { id: "headache", name: "Headache", severity: "mild" },
    { id: "cough", name: "Cough", severity: "mild" },
    { id: "fatigue", name: "Fatigue", severity: "mild" },
    { id: "nausea", name: "Nausea", severity: "moderate" },
    { id: "dizziness", name: "Dizziness", severity: "moderate" },
    { id: "joint-pain", name: "Joint Pain", severity: "moderate" },
    { id: "stomach-ache", name: "Stomach Ache", severity: "mild" },
    { id: "shortness-breath", name: "Shortness of Breath", severity: "severe" },
    { id: "chest-pain", name: "Chest Pain", severity: "severe" },
    { id: "back-pain", name: "Back Pain", severity: "moderate" },
    { id: "insomnia", name: "Sleep Problems", severity: "mild" }
  ];

  const mockDiseases: Record<string, Disease> = {
    "common-cold": {
      name: "Common Cold",
      probability: 85,
      description: "A viral infection affecting the upper respiratory system",
      ayurvedicRemedies: [
        "गर्म पानी में शहद और अदरक मिलाकर पिएं (Honey and ginger in warm water)",
        "तुलसी की चाय पिएं (Tulsi tea)",
        "हल्दी वाला दूध रात में लें (Turmeric milk at bedtime)",
        "भाप लें नीलगिरी के तेल के साथ (Steam inhalation with eucalyptus)"
      ],
      precautions: [
        "आराम करें और पर्याप्त नींद लें",
        "गर्म तरल पदार्थ का सेवन करें",
        "ठंडी चीजों से बचें"
      ],
      severity: "mild"
    },
    "hypertension": {
      name: "High Blood Pressure",
      probability: 75,
      description: "Elevated blood pressure that may require medical attention",
      ayurvedicRemedies: [
        "अर्जुन की छाल का काढ़ा (Arjuna bark decoction)",
        "लहसुन का नियमित सेवन (Regular garlic consumption)",
        "आंवला का रस सुबह खाली पेट (Amla juice on empty stomach)",
        "ध्यान और प्राणायाम करें (Meditation and breathing exercises)"
      ],
      precautions: [
        "नमक कम करें",
        "नियमित व्यायाम करें",
        "तनाव कम करें",
        "डॉक्टर से सलाह लें"
      ],
      severity: "moderate"
    },
    "arthritis": {
      name: "Arthritis",
      probability: 70,
      description: "Joint inflammation causing pain and stiffness",
      ayurvedicRemedies: [
        "सरसों के तेल में लहसुन पकाकर मालिश (Garlic oil massage)",
        "हल्दी और दूध का सेवन (Turmeric and milk)",
        "अदरक की चाय (Ginger tea)",
        "गर्म सेक करें (Hot compress)"
      ],
      precautions: [
        "हल्का व्यायाम करें",
        "वजन नियंत्रित रखें",
        "ठंड से बचें"
      ],
      severity: "moderate"
    }
  };

  const addSymptom = (symptom: Symptom) => {
    if (!selectedSymptoms.find(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim()) {
      const newSymptom: Symptom = {
        id: `custom-${Date.now()}`,
        name: customSymptom.trim(),
        severity: "mild"
      };
      setSelectedSymptoms([...selectedSymptoms, newSymptom]);
      setCustomSymptom("");
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple symptom matching logic
    const results: Disease[] = [];
    
    if (selectedSymptoms.some(s => s.name.toLowerCase().includes("cough") || s.name.toLowerCase().includes("fever"))) {
      results.push(mockDiseases["common-cold"]);
    }
    
    if (selectedSymptoms.some(s => s.name.toLowerCase().includes("joint") || s.name.toLowerCase().includes("pain"))) {
      results.push(mockDiseases["arthritis"]);
    }
    
    if (selectedSymptoms.some(s => s.name.toLowerCase().includes("dizziness") || s.name.toLowerCase().includes("headache"))) {
      results.push(mockDiseases["hypertension"]);
    }
    
    setAnalysis(results);
    setIsAnalyzing(false);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "mild": return <CheckCircle className="w-5 h-5 text-wellness" />;
      case "moderate": return <Clock className="w-5 h-5 text-secondary" />;
      case "severe": return <AlertTriangle className="w-5 h-5 text-emergency" />;
      default: return <CheckCircle className="w-5 h-5 text-wellness" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Search className="w-8 h-8 text-primary" />
            Symptom Checker
          </CardTitle>
          <CardDescription className="text-lg">
            Select your symptoms to get personalized Ayurvedic remedies and health guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common Symptoms */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              Common Symptoms
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonSymptoms.map((symptom) => (
                <Button
                  key={symptom.id}
                  variant={selectedSymptoms.find(s => s.id === symptom.id) ? "default" : "outline"}
                  onClick={() => addSymptom(symptom)}
                  className="h-auto p-3 text-left justify-start"
                  disabled={!!selectedSymptoms.find(s => s.id === symptom.id)}
                >
                  <span className="text-base">{symptom.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Symptom */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              Describe Other Symptoms
            </h3>
            <div className="flex gap-3">
              <Input
                placeholder="Type your symptom here..."
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomSymptom()}
                className="text-lg h-12"
              />
              <Button onClick={addCustomSymptom} disabled={!customSymptom.trim()}>
                Add
              </Button>
            </div>
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Selected Symptoms
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSymptoms.map((symptom) => (
                  <Badge
                    key={symptom.id}
                    variant="secondary"
                    className="text-base p-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeSymptom(symptom.id)}
                  >
                    {symptom.name} ✕
                  </Badge>
                ))}
              </div>
              
              <Button
                onClick={analyzeSymptoms}
                disabled={isAnalyzing}
                variant="default"
                size="lg"
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-5 h-5 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Get Health Analysis
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Leaf className="w-8 h-8 text-wellness" />
            Health Analysis & Ayurvedic Remedies
          </h2>
          
          {analysis.map((disease, index) => (
            <Card key={index} className="glass-effect border-wellness/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-3">
                    {getSeverityIcon(disease.severity)}
                    {disease.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {disease.probability}% Match
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {disease.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-wellness">
                    🌿 Ayurvedic Remedies:
                  </h4>
                  <ul className="space-y-2">
                    {disease.ayurvedicRemedies.map((remedy, remedyIndex) => (
                      <li key={remedyIndex} className="flex items-start gap-2 text-base">
                        <Leaf className="w-5 h-5 text-wellness mt-0.5 flex-shrink-0" />
                        {remedy}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-secondary">
                    ⚠️ Precautions:
                  </h4>
                  <ul className="space-y-2">
                    {disease.precautions.map((precaution, precautionIndex) => (
                      <li key={precautionIndex} className="flex items-start gap-2 text-base">
                        <AlertTriangle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        {precaution}
                      </li>
                    ))}
                  </ul>
                </div>

                {disease.severity === "severe" && (
                  <div className="bg-emergency/10 border border-emergency/30 rounded-lg p-4">
                    <p className="text-emergency font-semibold text-lg">
                      ⚠️ Important: These symptoms may require immediate medical attention. 
                      Please consult a healthcare professional.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          <Card className="bg-ayurveda/10 border-ayurveda/30">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-ayurveda-foreground">
                <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace 
                professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};