"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Activity, Heart, Pill, Utensils, X, Save } from "lucide-react"

export function PatientFormsSection() {
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    // Personal Info
    name: "John Smith",
    age: "45",
    gender: "male",
    location: "New York, NY",

    // Biometrics
    bloodPressure: "140/90",
    glucose: "110",
    heartRate: "75",
    weight: "180",
    bmi: "27.3",

    // Medical History
    conditions: ["Hypertension", "Pre-diabetes"],
    pastTreatments: "Blood pressure medication for 2 years",
    allergies: "None known",

    // Medications
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        sideEffects: "Dry cough",
      },
    ],

    // Lifestyle
    exercise: "2-3 times per week",
    sleep: "6-7 hours",
    diet: "Mediterranean",
    stress: "Moderate",
    steps: "8000",
    calories: "2200",
    airQuality: "Good",
  })

  const [newCondition, setNewCondition] = useState("")
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    sideEffects: "",
  })

  const addCondition = () => {
    if (newCondition.trim()) {
      setFormData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, newCondition.trim()],
      }))
      setNewCondition("")
    }
  }

  const removeCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }))
  }

  const addMedication = () => {
    if (newMedication.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        medications: [...prev.medications, newMedication],
      }))
      setNewMedication({ name: "", dosage: "", frequency: "", sideEffects: "" })
    }
  }

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    // Update dummy data and refresh across components
    console.log("[v0] Saving form data:", formData)

    // Simulate updating dummy JSON data
    const updatedData = {
      ...formData,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    // In a real app, this would update the backend/context
    localStorage.setItem("patientData", JSON.stringify(updatedData))

    alert("Data saved successfully! Your profile, dashboard, and recommendations have been updated.")
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "biometrics", label: "Biometrics", icon: Activity },
    { id: "medical", label: "Medical History", icon: Heart },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "lifestyle", label: "Lifestyle", icon: Utensils },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Patient Data Entry</h1>
        <p className="text-muted-foreground">Update your latest health information and measurements</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic demographic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biometrics">
          <Card>
            <CardHeader>
              <CardTitle>Latest Biometric Measurements</CardTitle>
              <CardDescription>Enter your most recent health measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={formData.bloodPressure}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bloodPressure: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                  <Input
                    id="glucose"
                    type="number"
                    value={formData.glucose}
                    onChange={(e) => setFormData((prev) => ({ ...prev, glucose: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, heartRate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi">BMI</Label>
                  <Input
                    id="bmi"
                    type="number"
                    step="0.1"
                    value={formData.bmi}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bmi: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Update your current conditions and medical history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Current Conditions</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-3">
                    {formData.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {condition}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeCondition(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new condition"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addCondition()}
                    />
                    <Button onClick={addCondition}>Add</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pastTreatments">Past Treatments</Label>
                  <Textarea
                    id="pastTreatments"
                    placeholder="Describe any past treatments or procedures"
                    value={formData.pastTreatments}
                    onChange={(e) => setFormData((prev) => ({ ...prev, pastTreatments: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies"
                    value={formData.allergies}
                    onChange={(e) => setFormData((prev) => ({ ...prev, allergies: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Update your current medication list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {formData.medications.map((med, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{med.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(index)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground">
                      <p>
                        <strong>Dosage:</strong> {med.dosage}
                      </p>
                      <p>
                        <strong>Frequency:</strong> {med.frequency}
                      </p>
                      <p>
                        <strong>Side Effects:</strong> {med.sideEffects || "None reported"}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="p-4 border-2 border-dashed rounded-lg">
                  <h4 className="font-medium mb-4">Add New Medication</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      placeholder="Medication name"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Dosage (e.g., 10mg)"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                    />
                    <Input
                      placeholder="Frequency (e.g., Once daily)"
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication((prev) => ({ ...prev, frequency: e.target.value }))}
                    />
                    <Input
                      placeholder="Side effects (optional)"
                      value={newMedication.sideEffects}
                      onChange={(e) => setNewMedication((prev) => ({ ...prev, sideEffects: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addMedication} className="mt-4">
                    Add Medication
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Information</CardTitle>
              <CardDescription>Update your current lifestyle and daily habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise">Exercise Frequency</Label>
                    <Select
                      value={formData.exercise}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, exercise: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rarely">Rarely</SelectItem>
                        <SelectItem value="1-2 times per week">1-2 times per week</SelectItem>
                        <SelectItem value="2-3 times per week">2-3 times per week</SelectItem>
                        <SelectItem value="4-5 times per week">4-5 times per week</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sleep">Sleep Duration</Label>
                    <Select
                      value={formData.sleep}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, sleep: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less than 5 hours">Less than 5 hours</SelectItem>
                        <SelectItem value="5-6 hours">5-6 hours</SelectItem>
                        <SelectItem value="6-7 hours">6-7 hours</SelectItem>
                        <SelectItem value="7-8 hours">7-8 hours</SelectItem>
                        <SelectItem value="8+ hours">8+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diet">Diet Type</Label>
                    <Select
                      value={formData.diet}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, diet: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard American">Standard American</SelectItem>
                        <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="Low-carb">Low-carb</SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Keto">Keto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stress">Stress Level</Label>
                    <Select
                      value={formData.stress}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, stress: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Very High">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Optional Wearable Data</h4>

                  <div className="space-y-2">
                    <Label htmlFor="steps">Daily Steps</Label>
                    <Input
                      id="steps"
                      type="number"
                      value={formData.steps}
                      onChange={(e) => setFormData((prev) => ({ ...prev, steps: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calories">Daily Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={formData.calories}
                      onChange={(e) => setFormData((prev) => ({ ...prev, calories: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="airQuality">Air Quality</Label>
                    <Select
                      value={formData.airQuality}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, airQuality: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Unhealthy for Sensitive Groups">Unhealthy for Sensitive Groups</SelectItem>
                        <SelectItem value="Unhealthy">Unhealthy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 pt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Data
        </Button>
      </div>
    </div>
  )
}
