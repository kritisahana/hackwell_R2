"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { AlertTriangle, TrendingUp, Heart, Activity } from "lucide-react"
import dummyData from "@/lib/dummy-data.json"

export function PatientDashboard() {
  // For demo, use the first patient's data
  const patient = dummyData.patients[0]
  const recommendations = dummyData.recommendations

  const vitalsTrendData = [
    { date: "Jan 1", bloodPressure: 135, glucose: 105, heartRate: 72, weight: 182 },
    { date: "Jan 8", bloodPressure: 138, glucose: 108, heartRate: 74, weight: 181 },
    { date: "Jan 15", bloodPressure: 140, glucose: 110, heartRate: 75, weight: 180 },
    { date: "Jan 22", bloodPressure: 142, glucose: 112, heartRate: 76, weight: 179 },
    { date: "Jan 29", bloodPressure: 140, glucose: 110, heartRate: 75, weight: 180 },
  ]

  const riskTrendData = [
    { date: "Dec", diabetes: 65, cardiovascular: 58 },
    { date: "Jan", diabetes: 70, cardiovascular: 62 },
    { date: "Feb", diabetes: 75, cardiovascular: 65 },
    { date: "Mar", diabetes: 78, cardiovascular: 65 },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-status-stable"
      case "moderate":
        return "bg-status-monitoring"
      case "high":
      case "critical":
        return "bg-status-critical"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {patient.name}</h1>
          <p className="text-muted-foreground">Here's your health overview for today</p>
        </div>
      </div>

      {/* Critical Alerts */}
      {patient.status === "critical" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Critical Alert: Your blood pressure reading of {patient.bloodPressure} requires immediate attention. Please
            contact your healthcare provider.
          </AlertDescription>
        </Alert>
      )}

      {/* Risk Assessment */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diabetes Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patient.riskAssessment.diabetesRisk}%</div>
            <Progress value={patient.riskAssessment.diabetesRisk} className="mt-2" />
            <Badge className={`mt-2 ${getRiskColor(patient.riskAssessment.overallRisk)}`}>
              {patient.riskAssessment.overallRisk} Risk
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cardiovascular Risk</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patient.riskAssessment.cardiovascularRisk}%</div>
            <Progress value={patient.riskAssessment.cardiovascularRisk} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Based on current vitals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{patient.status}</div>
            <Badge
              className={`mt-2 ${
                patient.status === "stable"
                  ? "bg-status-stable"
                  : patient.status === "monitoring"
                    ? "bg-status-monitoring"
                    : "bg-status-critical"
              }`}
            >
              {patient.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Trends</CardTitle>
          <CardDescription>How your health risks have changed over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a2530",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#e0e0e0",
                  }}
                  formatter={(value: any) => [`${value}%`, "Risk Level"]}
                />
                <Area
                  type="monotone"
                  dataKey="diabetes"
                  stackId="1"
                  stroke="#ff6f61"
                  fill="#ff6f61"
                  fillOpacity={0.3}
                  name="Diabetes Risk"
                />
                <Area
                  type="monotone"
                  dataKey="cardiovascular"
                  stackId="2"
                  stroke="#ffb74d"
                  fill="#ffb74d"
                  fillOpacity={0.3}
                  name="Cardiovascular Risk"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Current Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Current Vitals</CardTitle>
          <CardDescription>Your latest health measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Blood Pressure</p>
              <p className="text-2xl font-bold">{patient.bloodPressure}</p>
              <p className="text-xs text-muted-foreground">mmHg</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Blood Glucose</p>
              <p className="text-2xl font-bold">{patient.glucose}</p>
              <p className="text-xs text-muted-foreground">mg/dL</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Heart Rate</p>
              <p className="text-2xl font-bold">{patient.heartRate}</p>
              <p className="text-xs text-muted-foreground">bpm</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">BMI</p>
              <p className="text-2xl font-bold">{patient.bmi}</p>
              <p className="text-xs text-muted-foreground">kg/m²</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vitals Trends</CardTitle>
          <CardDescription>Track your key health metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a2530",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#e0e0e0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bloodPressure"
                  stroke="#ff6f61"
                  strokeWidth={2}
                  dot={{ fill: "#ff6f61", strokeWidth: 2, r: 4 }}
                  name="Blood Pressure (Systolic)"
                />
                <Line
                  type="monotone"
                  dataKey="glucose"
                  stroke="#ffb74d"
                  strokeWidth={2}
                  dot={{ fill: "#ffb74d", strokeWidth: 2, r: 4 }}
                  name="Blood Glucose"
                />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#4db6ac"
                  strokeWidth={2}
                  dot={{ fill: "#4db6ac", strokeWidth: 2, r: 4 }}
                  name="Heart Rate"
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#9575cd"
                  strokeWidth={2}
                  dot={{ fill: "#9575cd", strokeWidth: 2, r: 4 }}
                  name="Weight"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ff6f61] rounded"></div>
              <span className="text-sm">Blood Pressure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ffb74d] rounded"></div>
              <span className="text-sm">Blood Glucose</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#4db6ac] rounded"></div>
              <span className="text-sm">Heart Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#9575cd] rounded"></div>
              <span className="text-sm">Weight</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Recommendations</CardTitle>
          <CardDescription>Personalized suggestions for your health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Diet</h4>
              <p className="text-sm text-muted-foreground">{recommendations.diet[0]}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Exercise</h4>
              <p className="text-sm text-muted-foreground">{recommendations.exercise[0]}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Lifestyle</h4>
              <p className="text-sm text-muted-foreground">{recommendations.lifestyle[0]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
