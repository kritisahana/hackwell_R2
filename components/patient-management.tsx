"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Eye, Calendar, TrendingUp, AlertTriangle, User, Heart, Pill } from "lucide-react"
import dummyData from "@/lib/dummy-data.json"

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const patients = dummyData.patients

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.conditions.some((condition) => condition.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-status-stable"
      case "monitoring":
        return "bg-status-monitoring"
      case "critical":
        return "bg-status-critical"
      default:
        return "bg-muted"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-status-stable"
      case "moderate":
        return "text-status-monitoring"
      case "high":
      case "critical":
        return "text-status-critical"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">Monitor and manage your patients' health status</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>
                      {patient.age} years • {patient.gender}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <span className={`font-medium ${getRiskColor(patient.riskAssessment.overallRisk)}`}>
                    {patient.riskAssessment.overallRisk}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conditions:</span>
                  <span className="text-right">{patient.conditions.slice(0, 2).join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Visit:</span>
                  <span>{patient.lastVisit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Visit:</span>
                  <span>{patient.nextVisit}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Patient Details - {patient.name}</DialogTitle>
                      <DialogDescription>Comprehensive health overview and medical history</DialogDescription>
                    </DialogHeader>
                    {selectedPatient && <PatientDetailView patient={selectedPatient} />}
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No patients found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PatientDetailView({ patient }: { patient: any }) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="vitals">Vitals</TabsTrigger>
        <TabsTrigger value="medications">Medications</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{patient.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="capitalize">{patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{patient.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BMI:</span>
                <span>{patient.bmi}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Diabetes Risk:</span>
                <span className="font-medium">{patient.riskAssessment.diabetesRisk}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cardiovascular Risk:</span>
                <span className="font-medium">{patient.riskAssessment.cardiovascularRisk}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall Risk:</span>
                <Badge
                  className={`${
                    patient.riskAssessment.overallRisk === "Low"
                      ? "bg-status-stable"
                      : patient.riskAssessment.overallRisk === "Moderate"
                        ? "bg-status-monitoring"
                        : "bg-status-critical"
                  }`}
                >
                  {patient.riskAssessment.overallRisk}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Medical Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {patient.conditions.map((condition: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifestyle Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercise:</span>
                <span>{patient.lifestyle.exercise}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sleep:</span>
                <span>{patient.lifestyle.sleep}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Diet:</span>
                <span>{patient.lifestyle.diet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stress:</span>
                <span>{patient.lifestyle.stress}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vitals" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Blood Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.bloodPressure}</div>
              <p className="text-xs text-muted-foreground">mmHg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Blood Glucose</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.glucose}</div>
              <p className="text-xs text-muted-foreground">mg/dL</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Heart Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.heartRate}</div>
              <p className="text-xs text-muted-foreground">bpm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.weight}</div>
              <p className="text-xs text-muted-foreground">lbs</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vital Signs Trends</CardTitle>
            <CardDescription>Historical data would be displayed here with charts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground">Showing trends for BP, glucose, heart rate over time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="medications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Current Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient.medications.map((med: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{med.name}</h4>
                    <Badge variant="outline">Active</Badge>
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
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="timeline" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Medical Timeline</CardTitle>
            <CardDescription>Recent events and changes in patient status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium">Blood pressure reading: {patient.bloodPressure}</p>
                  <p className="text-sm text-muted-foreground">Today • Elevated reading noted</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-status-monitoring rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium">Medication adjustment</p>
                  <p className="text-sm text-muted-foreground">3 days ago • Lisinopril dosage increased</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-status-stable rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium">Regular checkup completed</p>
                  <p className="text-sm text-muted-foreground">{patient.lastVisit} • Routine examination</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
