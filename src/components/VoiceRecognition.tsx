import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Brain, 
  Waves,
  Play,
  Square,
  RotateCcw
} from "lucide-react";

export const VoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef<any>(null);

  const startListening = async () => {
    try {
      // Check if speech recognition is supported
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
        return;
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'hi-IN'; // Hindi language
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript("");
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
        
        // Simulate audio level animation
        setAudioLevel(Math.random() * 100);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setAudioLevel(0);
      };
      
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      alert("Error starting voice recognition. Please try again.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setAudioLevel(0);
  };

  const analyzeVoiceInput = async () => {
    if (!transcript.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis based on transcript content
    let mockAnalysis = "";
    
    if (transcript.toLowerCase().includes("सिरदर्द") || transcript.toLowerCase().includes("headache")) {
      mockAnalysis = `आपके लक्षणों के आधार पर:

🔍 **संभावित कारण:** तनाव या साइनस की समस्या

🌿 **आयुर्वेदिक उपचार:**
• तुलसी की चाय पिएं
• माथे पर पुदीने का तेल लगाएं  
• गर्म पानी की भाप लें
• पर्याप्त आराम करें

⚠️ **सावधानी:** यदि सिरदर्द गंभीर है या बना रहता है तो डॉक्टर से संपर्क करें।`;
    } else if (transcript.toLowerCase().includes("खांसी") || transcript.toLowerCase().includes("cough")) {
      mockAnalysis = `आपके लक्षणों के आधार पर:

🔍 **संभावित कारण:** सामान्य सर्दी या गले की खराश

🌿 **आयुर्वेदिक उपचार:**
• शहद और अदरक का मिश्रण
• गुनगुने पानी से गरारे करें
• तुलसी और काली मिर्च की चाय
• हल्दी वाला दूध रात में पिएं

⚠️ **सावधानी:** यदि बुखार या सांस लेने में तकलीफ हो तो तुरंत चिकित्सक से संपर्क करें।`;
    } else {
      mockAnalysis = `आपके द्वारा बताए गए लक्षण: "${transcript}"

🔍 **सामान्य सलाह:**
• पर्याप्त पानी पिएं
• आराम करें और तनाव कम करें
• संतुलित आहार लें

🌿 **आयुर्वेदिक सुझाव:**
• दिन में दो बार त्रिफला चूर्ण लें
• नियमित योग और प्राणायाम करें

⚠️ **महत्वपूर्ण:** विस्तृत जांच के लिए चिकित्सक से सलाह लें।`;
    }
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const clearAll = () => {
    setTranscript("");
    setAnalysis(null);
    setIsListening(false);
    setAudioLevel(0);
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Mic className="w-8 h-8 text-primary" />
            Voice Health Assistant
          </CardTitle>
          <CardDescription className="text-lg">
            बोलकर अपने लक्षण बताएं - Speak your symptoms in Hindi or English
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Input Controls */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Button
                variant={isListening ? "emergency" : "default"}
                size="xl"
                onClick={isListening ? stopListening : startListening}
                disabled={isAnalyzing}
                className="w-32 h-32 rounded-full text-xl"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-10 h-10" />
                  </>
                ) : (
                  <>
                    <Mic className="w-10 h-10" />
                  </>
                )}
              </Button>
              
              {/* Audio Level Indicator */}
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {isListening ? "सुन रहा हूँ... (Listening...)" : "बात करने के लिए माइक दबाएं"}
              </p>
              
              {isListening && (
                <div className="flex items-center justify-center gap-2">
                  <Waves className="w-5 h-5 text-primary" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-primary rounded-full transition-all duration-200"
                        style={{ 
                          height: `${8 + (audioLevel / 20) * (i + 1)}px`,
                          opacity: audioLevel > i * 20 ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                  <Waves className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
          </div>

          {/* Language Support Info */}
          <Card className="bg-ayurveda/10 border-ayurveda/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Volume2 className="w-6 h-6 text-ayurveda" />
                <h3 className="font-semibold text-lg text-ayurveda-foreground">
                  Supported Languages
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">🇮🇳 हिंदी (Hindi)</Badge>
                <Badge variant="outline">🇺🇸 English</Badge>
                <Badge variant="outline">🇮🇳 বাংলা (Bengali)</Badge>
                <Badge variant="outline">🇮🇳 தமிழ் (Tamil)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Transcript Display */}
          {transcript && (
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  What you said:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg p-4 bg-muted rounded-lg min-h-[60px]">
                  {transcript || "आप यहाँ अपने लक्षण बोलें..."}
                </p>
                
                <div className="flex gap-3 mt-4">
                  <Button 
                    onClick={analyzeVoiceInput}
                    disabled={!transcript.trim() || isAnalyzing}
                    variant="default"
                    size="lg"
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-5 h-5 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Analyze Symptoms
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={clearAll}
                    variant="outline"
                    size="lg"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card className="border-wellness/30 bg-wellness/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 text-wellness">
              <Brain className="w-6 h-6" />
              Health Analysis & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <pre className="whitespace-pre-wrap text-base leading-relaxed font-sans">
                {analysis}
              </pre>
            </div>
            
            <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <p className="text-base text-secondary-foreground">
                <strong>अस्वीकरण (Disclaimer):</strong> यह जानकारी केवल सामान्य मार्गदर्शन के लिए है। 
                गंभीर लक्षणों के लिए तुरंत चिकित्सक से संपर्क करें।
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Instructions */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">How to use Voice Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <div>
              <h4 className="font-semibold mb-2">🎙️ Speaking Tips:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Speak clearly and slowly</li>
                <li>• Use simple language</li>
                <li>• Mention specific symptoms</li>
                <li>• Include duration if known</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🗣️ Example Phrases:</h4>
              <ul className="space-y-1 text-sm">
                <li>• "मुझे सिरदर्द है" (I have a headache)</li>
                <li>• "खांसी आ रही है" (I have a cough)</li>
                <li>• "पेट में दर्द है" (I have stomach pain)</li>
                <li>• "चक्कर आ रहा है" (I feel dizzy)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};