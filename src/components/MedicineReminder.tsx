import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  Clock, 
  Plus, 
  Bell, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Edit3,
  Trash2,
  Volume2
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  instructions: string;
  taken: boolean[];
  color: string;
}

export const MedicineReminder = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    frequency: "daily",
    times: ["08:00"],
    instructions: "",
    color: "#22c55e"
  });

  const colors = [
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Orange", value: "#fb923c" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" }
  ];

  const frequencies = [
    { value: "daily", label: "Daily (रोज़)", times: 1 },
    { value: "twice", label: "Twice Daily (दिन में दो बार)", times: 2 },
    { value: "thrice", label: "Three Times (दिन में तीन बार)", times: 3 },
    { value: "weekly", label: "Weekly (सप्ताहिक)", times: 1 }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Load sample medicines
  useEffect(() => {
    const sampleMedicines: Medicine[] = [
      {
        id: "1",
        name: "Blood Pressure Medicine",
        dosage: "5mg",
        frequency: "daily",
        times: ["08:00"],
        startDate: "2024-01-01",
        instructions: "Take with breakfast",
        taken: [true],
        color: "#22c55e"
      },
      {
        id: "2",
        name: "Vitamin D3",
        dosage: "1000 IU",
        frequency: "daily",
        times: ["20:00"],
        startDate: "2024-01-01",
        instructions: "Take after dinner",
        taken: [false],
        color: "#fb923c"
      }
    ];
    setMedicines(sampleMedicines);
  }, []);

  const addMedicine = () => {
    if (!newMedicine.name || !newMedicine.dosage) {
      alert("Please fill in medicine name and dosage");
      return;
    }

    const medicine: Medicine = {
      id: Date.now().toString(),
      name: newMedicine.name,
      dosage: newMedicine.dosage,
      frequency: newMedicine.frequency,
      times: newMedicine.times,
      startDate: new Date().toISOString().split('T')[0],
      instructions: newMedicine.instructions,
      taken: new Array(newMedicine.times.length).fill(false),
      color: newMedicine.color
    };

    setMedicines([...medicines, medicine]);
    setNewMedicine({
      name: "",
      dosage: "",
      frequency: "daily",
      times: ["08:00"],
      instructions: "",
      color: "#22c55e"
    });
    setIsAddingMedicine(false);
  };

  const markAsTaken = (medicineId: string, timeIndex: number) => {
    setMedicines(medicines.map(med => {
      if (med.id === medicineId) {
        const newTaken = [...med.taken];
        newTaken[timeIndex] = !newTaken[timeIndex];
        return { ...med, taken: newTaken };
      }
      return med;
    }));
  };

  const deleteMedicine = (medicineId: string) => {
    setMedicines(medicines.filter(med => med.id !== medicineId));
  };

  const updateFrequency = (frequency: string) => {
    const freqData = frequencies.find(f => f.value === frequency);
    if (freqData) {
      let defaultTimes = [];
      if (freqData.times === 1) defaultTimes = ["08:00"];
      else if (freqData.times === 2) defaultTimes = ["08:00", "20:00"];
      else if (freqData.times === 3) defaultTimes = ["08:00", "14:00", "20:00"];
      
      setNewMedicine({
        ...newMedicine,
        frequency,
        times: defaultTimes
      });
    }
  };

  const getUpcomingMedicines = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    return medicines.flatMap(medicine => 
      medicine.times.map((time, index) => ({
        ...medicine,
        timeIndex: index,
        time,
        isOverdue: time < currentTimeStr && !medicine.taken[index],
        isUpcoming: time > currentTimeStr,
        isDue: Math.abs(new Date(`2000-01-01 ${time}`).getTime() - new Date(`2000-01-01 ${currentTimeStr}`).getTime()) < 300000, // 5 minutes
      }))
    ).filter(med => !med.taken[med.timeIndex]);
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const upcomingMeds = getUpcomingMedicines();
  const overdueMeds = upcomingMeds.filter(med => med.isOverdue);
  const dueMeds = upcomingMeds.filter(med => med.isDue);

  return (
    <div className="space-y-6">
      {/* Current Time & Quick Status */}
      <Card className="glass-effect">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary">
                {currentTime.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </h2>
              <p className="text-lg text-muted-foreground">
                {currentTime.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold">{medicines.length}</span>
                <span className="text-muted-foreground">Medicines</span>
              </div>
              {dueMeds.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {dueMeds.length} Due Now!
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      {(overdueMeds.length > 0 || dueMeds.length > 0) && (
        <Card className="border-emergency bg-emergency/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 text-emergency">
              <Bell className="w-6 h-6" />
              Medicine Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dueMeds.map(med => (
              <div key={`${med.id}-${med.timeIndex}`} className="flex items-center justify-between p-4 bg-emergency/10 rounded-lg border border-emergency/30">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: med.color }}
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{med.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {med.dosage} at {med.time} - {med.instructions}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="emergency"
                    onClick={() => playNotificationSound()}
                    size="sm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => markAsTaken(med.id, med.timeIndex)}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Taken
                  </Button>
                </div>
              </div>
            ))}
            
            {overdueMeds.map(med => (
              <div key={`${med.id}-${med.timeIndex}-overdue`} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-secondary" />
                  <div>
                    <h4 className="font-semibold">Overdue: {med.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Was due at {med.time} - {med.dosage}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => markAsTaken(med.id, med.timeIndex)}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Taken
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Add Medicine Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Pill className="w-8 h-8 text-primary" />
          Your Medicines
        </h2>
        <Button 
          onClick={() => setIsAddingMedicine(true)}
          variant="default"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          Add Medicine
        </Button>
      </div>

      {/* Add Medicine Form */}
      {isAddingMedicine && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-xl">Add New Medicine</CardTitle>
            <CardDescription>Fill in the details for your new medicine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  placeholder="e.g., Metformin, Vitamin D"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 500mg, 2 tablets"
                  value={newMedicine.dosage}
                  onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={newMedicine.frequency} onValueChange={updateFrequency}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map(freq => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Color</Label>
                <div className="flex gap-2 mt-1">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setNewMedicine({...newMedicine, color: color.value})}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newMedicine.color === color.value ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Times</Label>
              <div className="space-y-2 mt-1">
                {newMedicine.times.map((time, index) => (
                  <Input
                    key={index}
                    type="time"
                    value={time}
                    onChange={(e) => {
                      const newTimes = [...newMedicine.times];
                      newTimes[index] = e.target.value;
                      setNewMedicine({...newMedicine, times: newTimes});
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="instructions">Instructions</Label>
              <Input
                id="instructions"
                placeholder="e.g., Take with food, Before meals"
                value={newMedicine.instructions}
                onChange={(e) => setNewMedicine({...newMedicine, instructions: e.target.value})}
                className="mt-1"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={addMedicine} className="flex-1">
                <Plus className="w-4 h-4" />
                Add Medicine
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingMedicine(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medicine List */}
      <div className="space-y-4">
        {medicines.map(medicine => (
          <Card key={medicine.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: medicine.color }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{medicine.name}</h3>
                    <p className="text-muted-foreground">{medicine.dosage}</p>
                    {medicine.instructions && (
                      <p className="text-sm text-muted-foreground mt-1">
                        📝 {medicine.instructions}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteMedicine(medicine.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-auto gap-3">
                {medicine.times.map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">{time}</span>
                    </div>
                    <Button
                      variant={medicine.taken[index] ? "default" : "outline"}
                      size="sm"
                      onClick={() => markAsTaken(medicine.id, index)}
                      className={medicine.taken[index] ? "bg-wellness text-wellness-foreground" : ""}
                    >
                      {medicine.taken[index] ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Taken
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          Mark
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {medicines.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No medicines added yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your first medicine to start getting reminders
            </p>
            <Button 
              onClick={() => setIsAddingMedicine(true)}
              variant="default"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add Your First Medicine
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-ayurveda/10 border-ayurveda/30">
        <CardHeader>
          <CardTitle className="text-xl text-ayurveda-foreground">
            💡 Medicine Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Take medicines at the same time daily</li>
                <li>• Keep a glass of water ready</li>
                <li>• Don't skip doses</li>
                <li>• Store medicines safely</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Safety Reminders:</h4>
              <ul className="space-y-1">
                <li>• Check expiry dates regularly</li>
                <li>• Follow prescribed dosages</li>
                <li>• Consult doctor before changes</li>
                <li>• Keep emergency contacts handy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for the circle icon
const Circle = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
  </svg>
);