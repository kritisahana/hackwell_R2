"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Utensils, Dumbbell, Moon, Heart, Pill, AlertTriangle, CheckCircle, Clock, Target } from "lucide-react"
import dummyData from "@/lib/dummy-data.json"

export function RecommendationsPage() {
  const patient = dummyData.patients[0] // Using first patient for demo
  const recommendations = dummyData.recommendations

  const medicationReminders = [
    {
      medication: "Lisinopril",
      time: "8:00 AM",
      taken: true,
      dosage: "10mg",
    },
    {
      medication: "Lisinopril",
      time: "8:00 PM",
      taken: false,
      dosage: "10mg",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Recommendations</h1>
          <p className="text-muted-foreground">Personalized health guidance based on your profile</p>
        </div>
      </div>

      {/* Critical Alerts */}
      {patient.status === "critical" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your current health metrics indicate high risk. Please follow these recommendations closely and consult your
            healthcare provider.
          </AlertDescription>
        </Alert>
      )}

      {/* Diet Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Diet Recommendations
          </CardTitle>
          <CardDescription>Nutritional guidance tailored to your health goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.diet.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm">{recommendation}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  High Priority
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-card border rounded-lg">
            <h4 className="font-medium mb-2">Foods to Include</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Leafy Greens", "Salmon", "Berries", "Nuts", "Whole Grains"].map((food) => (
                <Badge key={food} variant="secondary" className="bg-status-stable/20 text-status-stable">
                  {food}
                </Badge>
              ))}
            </div>

            <h4 className="font-medium mb-2">Foods to Limit</h4>
            <div className="flex flex-wrap gap-2">
              {["Processed Foods", "Added Sugars", "Refined Carbs", "Trans Fats"].map((food) => (
                <Badge key={food} variant="secondary" className="bg-status-critical/20 text-status-critical">
                  {food}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Exercise Plan
          </CardTitle>
          <CardDescription>Physical activity recommendations for your fitness level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.exercise.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm">{recommendation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-card border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Weekly Goal
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Aerobic Exercise</span>
                  <span>150 minutes</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-muted-foreground">90/150 minutes completed this week</p>
              </div>
            </div>

            <div className="p-4 bg-card border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Strength Training
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sessions This Week</span>
                  <span>1/2</span>
                </div>
                <Progress value={50} className="h-2" />
                <p className="text-xs text-muted-foreground">1 more session recommended</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Lifestyle Tips
          </CardTitle>
          <CardDescription>Daily habits to improve your overall wellness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.lifestyle.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm">{recommendation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-card border rounded-lg text-center">
              <Moon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Sleep Quality</h4>
              <p className="text-2xl font-bold mt-1">7.2h</p>
              <p className="text-xs text-muted-foreground">Average last week</p>
            </div>

            <div className="p-4 bg-card border rounded-lg text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Stress Level</h4>
              <p className="text-2xl font-bold mt-1">Moderate</p>
              <p className="text-xs text-muted-foreground">Based on self-report</p>
            </div>

            <div className="p-4 bg-card border rounded-lg text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Daily Steps</h4>
              <p className="text-2xl font-bold mt-1">8,247</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medication Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Medication Reminders
          </CardTitle>
          <CardDescription>Keep track of your daily medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medicationReminders.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${reminder.taken ? "bg-status-stable" : "bg-status-monitoring"}`}
                  ></div>
                  <div>
                    <p className="font-medium">{reminder.medication}</p>
                    <p className="text-sm text-muted-foreground">
                      {reminder.dosage} • {reminder.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {reminder.taken ? (
                    <Badge className="bg-status-stable">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Taken
                    </Badge>
                  ) : (
                    <Badge className="bg-status-monitoring">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                  {!reminder.taken && (
                    <Button size="sm" variant="outline">
                      Mark Taken
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
