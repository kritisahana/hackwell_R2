"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, BarChart3, PieChartIcon, Activity, Brain, AlertTriangle } from "lucide-react"
import { useState } from "react"
import dummyData from "@/lib/dummy-data.json"

export function ExplainabilityPage() {
  const [selectedPatient, setSelectedPatient] = useState("p1")
  const explainability = dummyData.explainability
  const patients = dummyData.patients

  // Global factors data for bar chart
  const globalFactorsData = explainability.globalFactors.map((factor) => ({
    name: factor.factor,
    importance: factor.importance * 100,
  }))

  // Local factors data for the selected patient
  const localFactorsData = explainability.localFactors.factors.map((factor) => ({
    name: factor.factor,
    impact: Math.abs(factor.impact * 100),
    direction: factor.direction,
    color: factor.direction === "increase" ? "#ef4444" : "#22c55e",
  }))

  // Trend data for patient vitals over time (dummy data)
  const trendData = [
    { date: "Jan 1", bloodPressure: 135, glucose: 105, heartRate: 72 },
    { date: "Jan 8", bloodPressure: 138, glucose: 108, heartRate: 74 },
    { date: "Jan 15", bloodPressure: 140, glucose: 110, heartRate: 75 },
    { date: "Jan 22", bloodPressure: 142, glucose: 112, heartRate: 76 },
    { date: "Jan 29", bloodPressure: 140, glucose: 110, heartRate: 75 },
  ]

  // Risk distribution data
  const riskDistributionData = [
    {
      name: "Low Risk",
      value: patients.filter((p) => p.riskAssessment.overallRisk === "Low").length,
      color: "#22c55e",
    },
    {
      name: "Moderate Risk",
      value: patients.filter((p) => p.riskAssessment.overallRisk === "Moderate").length,
      color: "#eab308",
    },
    {
      name: "High Risk",
      value: patients.filter((p) => p.riskAssessment.overallRisk === "High").length,
      color: "#f97316",
    },
    {
      name: "Critical Risk",
      value: patients.filter((p) => p.riskAssessment.overallRisk === "Critical").length,
      color: "#ef4444",
    },
  ]

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Explainability</h1>
          <p className="text-muted-foreground">Understanding how AI makes health risk predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">AI Insights</span>
        </div>
      </div>

      {/* Global Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Global Risk Factors
          </CardTitle>
          <CardDescription>Most important factors across all patients for predicting health risks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={globalFactorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a2530",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#e0e0e0",
                  }}
                  formatter={(value: any) => [`${value.toFixed(1)}%`, "Importance"]}
                />
                <Bar dataKey="importance" fill="#ff6f61" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Interpretation:</strong> Age and BMI are the strongest predictors of health risks, followed by
              blood glucose levels. These factors are consistently important across all patient profiles.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Local Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Patient-Specific Factors
          </CardTitle>
          <CardDescription>Factors contributing to risk assessment for individual patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPatientData && (
            <div className="mb-6 p-4 bg-card border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{selectedPatientData.name}</h4>
                <Badge
                  className={
                    selectedPatientData.riskAssessment.overallRisk === "Low"
                      ? "bg-status-stable"
                      : selectedPatientData.riskAssessment.overallRisk === "Moderate"
                        ? "bg-status-monitoring"
                        : "bg-status-critical"
                  }
                >
                  {selectedPatientData.riskAssessment.overallRisk} Risk
                </Badge>
              </div>
              <div className="grid gap-2 md:grid-cols-3 text-sm">
                <p>
                  <strong>Age:</strong> {selectedPatientData.age} years
                </p>
                <p>
                  <strong>BMI:</strong> {selectedPatientData.bmi}
                </p>
                <p>
                  <strong>Diabetes Risk:</strong> {selectedPatientData.riskAssessment.diabetesRisk}%
                </p>
              </div>
            </div>
          )}

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={localFactorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a2530",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#e0e0e0",
                  }}
                  formatter={(value: any, name: any, props: any) => [
                    `${value.toFixed(1)}% ${props.payload.direction}`,
                    "Impact on Risk",
                  ]}
                />
                <Bar dataKey="impact" fill={(entry: any) => entry.color} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-status-critical rounded"></div>
              <span className="text-sm">Increases Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-status-stable rounded"></div>
              <span className="text-sm">Decreases Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Health Trends Over Time
          </CardTitle>
          <CardDescription>Track how key health metrics change and impact risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-[#ff6f61] rounded"></div>
                <span className="text-sm font-medium">Blood Pressure</span>
              </div>
              <p className="text-xs text-muted-foreground">Trending upward - monitor closely</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-[#ffb74d] rounded"></div>
                <span className="text-sm font-medium">Blood Glucose</span>
              </div>
              <p className="text-xs text-muted-foreground">Stable with slight fluctuation</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-[#4db6ac] rounded"></div>
                <span className="text-sm font-medium">Heart Rate</span>
              </div>
              <p className="text-xs text-muted-foreground">Within normal range</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Patient Risk Distribution
            </CardTitle>
            <CardDescription>Overview of risk levels across all patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a2530",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#e0e0e0",
                    }}
                    formatter={(value: any) => [`${value} patients`, "Count"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {riskDistributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value} patients</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Event Timeline
            </CardTitle>
            <CardDescription>Recent changes that affected risk predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-status-critical rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Blood pressure spike detected</p>
                  <p className="text-xs text-muted-foreground">John Smith • 2 hours ago</p>
                  <p className="text-xs text-muted-foreground">Risk increased from 65% to 78%</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-status-monitoring rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Medication adherence improved</p>
                  <p className="text-xs text-muted-foreground">Maria Garcia • 1 day ago</p>
                  <p className="text-xs text-muted-foreground">Risk decreased from 25% to 15%</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-status-stable rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Exercise routine established</p>
                  <p className="text-xs text-muted-foreground">Robert Wilson • 3 days ago</p>
                  <p className="text-xs text-muted-foreground">Cardiovascular risk improved</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">New patient profile created</p>
                  <p className="text-xs text-muted-foreground">System • 1 week ago</p>
                  <p className="text-xs text-muted-foreground">Initial risk assessment completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Model Information
          </CardTitle>
          <CardDescription>Technical details about the AI risk prediction model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Model Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Accuracy:</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Precision:</span>
                    <span className="text-sm font-medium">91.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Recall:</span>
                    <span className="text-sm font-medium">89.5%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Training Data</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Patients:</span>
                    <span className="text-sm font-medium">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Features:</span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated:</span>
                    <span className="text-sm font-medium">Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Model Type</h4>
                <p className="text-sm text-muted-foreground">
                  Gradient Boosting Classifier with SHAP explainability integration
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Validation</h4>
                <p className="text-sm text-muted-foreground">
                  Cross-validated on diverse patient populations with continuous monitoring for bias and drift
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Limitations</h4>
                <p className="text-sm text-muted-foreground">
                  Predictions are based on available data and should not replace clinical judgment
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
