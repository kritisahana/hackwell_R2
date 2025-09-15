"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Activity, Heart, Pill, Utensils } from "lucide-react"

export function PatientProfileForm() {
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    age: "45",
    gender: "male",
    location: "New York, NY",
    bloodPressure: "140/90",
    glucose: "110",
    heartRate: "75",
    weight: "180",
    bmi: "27.3",
    conditions: ["Hypertension", "Pre-diabetes"],
    pastTreatments: "Blood pressure medication for 2 years",
    allergies: "None known",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        sideEffects: "Dry cough",
      },
    ],
    exercise: "2-3 times per week",
    sleep: "6-7 hours",
    diet: "Mediterranean",
    stress: "Moderate",
    steps: "8000",
    calories: "2200",
    airQuality: "Good",
    lastUpdated: "2025-09-15",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("patientData")
    if (savedData) {
      setProfileData(JSON.parse(savedData))
    }
  }, [])

  const [activeTab, setActiveTab] = useState("personal")

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
        <h1 className="text-3xl font-bold">Patient Profile</h1>
        <p className="text-muted-foreground">View your current health information</p>
        <p className="text-sm text-muted-foreground mt-1">Last updated: {profileData.lastUpdated}</p>
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
              <CardDescription>Your basic demographic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-lg">{profileData.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <p className="text-lg">{profileData.age} years old</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <p className="text-lg capitalize">{profileData.gender}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <p className="text-lg">{profileData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biometrics">
          <Card>
            <CardHeader>
              <CardTitle>Biometric Data</CardTitle>
              <CardDescription>Your current health measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Pressure</label>
                  <p className="text-lg font-mono">{profileData.bloodPressure} mmHg</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Glucose</label>
                  <p className="text-lg font-mono">{profileData.glucose} mg/dL</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Heart Rate</label>
                  <p className="text-lg font-mono">{profileData.heartRate} bpm</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight</label>
                  <p className="text-lg font-mono">{profileData.weight} lbs</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">BMI</label>
                  <p className="text-lg font-mono">{profileData.bmi}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Your current conditions and medical background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Current Conditions</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Past Treatments</label>
                  <p className="text-base">{profileData.pastTreatments}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Allergies</label>
                  <p className="text-base">{profileData.allergies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Your current medication regimen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {profileData.medications.map((med, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium text-lg mb-2">{med.name}</h4>
                    <div className="grid gap-2 md:grid-cols-3 text-sm">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Information</CardTitle>
              <CardDescription>Your daily habits and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exercise Frequency</label>
                    <p className="text-base">{profileData.exercise}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sleep Duration</label>
                    <p className="text-base">{profileData.sleep}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Diet Type</label>
                    <p className="text-base">{profileData.diet}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stress Level</label>
                    <p className="text-base">{profileData.stress}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Wearable Data</h4>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Steps</label>
                    <p className="text-base font-mono">{profileData.steps} steps</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Calories</label>
                    <p className="text-base font-mono">{profileData.calories} cal</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Air Quality</label>
                    <p className="text-base">{profileData.airQuality}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
