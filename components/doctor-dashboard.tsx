"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, AlertTriangle, TrendingUp, CheckCircle, Calendar, Activity, Heart, Clock } from "lucide-react"
import Link from "next/link"
import dummyData from "@/lib/dummy-data.json"

export function DoctorDashboard() {
  const patients = dummyData.patients

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

  const totalPatients = patients.length
  const stablePatients = patients.filter((p) => p.status === "stable").length
  const monitoringPatients = patients.filter((p) => p.status === "monitoring").length
  const criticalPatients = patients.filter((p) => p.status === "critical").length
  const recoveryRate = Math.round((stablePatients / totalPatients) * 100)

  // Get critical alerts
  const criticalAlerts = patients.filter((p) => p.status === "critical")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Doctor</h1>
          <p className="text-muted-foreground">Here's your patient overview for today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Link href="/patients">
            <Button>
              <Users className="h-4 w-4 mr-2" />
              View All Patients
            </Button>
          </Link>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {criticalAlerts.length} patient{criticalAlerts.length > 1 ? "s" : ""} require immediate attention:{" "}
            {criticalAlerts.map((p) => p.name).join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">Active cases under care</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-critical">{criticalPatients}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitoring</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-monitoring">{monitoringPatients}</div>
            <p className="text-xs text-muted-foreground">Under observation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-stable">{recoveryRate}%</div>
            <Progress value={recoveryRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{stablePatients} stable patients</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Upcoming appointments and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium">Follow-up: John Smith</p>
                  <p className="text-sm text-muted-foreground">Blood pressure monitoring</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">10:00 AM</p>
                <Badge variant="outline">In 2 hours</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-8 bg-status-monitoring rounded-full"></div>
                <div>
                  <p className="font-medium">Consultation: Maria Garcia</p>
                  <p className="text-sm text-muted-foreground">Anxiety management review</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">2:30 PM</p>
                <Badge variant="outline">In 6 hours</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-8 bg-status-critical rounded-full"></div>
                <div>
                  <p className="font-medium">Emergency: Robert Wilson</p>
                  <p className="text-sm text-muted-foreground">Critical diabetes management</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">4:00 PM</p>
                <Badge className="bg-status-critical">Urgent</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Patient Updates</CardTitle>
          <CardDescription>Latest status changes and important notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.slice(0, 3).map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.conditions.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Risk: {patient.riskAssessment.overallRisk}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Last: {patient.lastVisit}</p>
                    <p className="text-xs text-muted-foreground">Next: {patient.nextVisit}</p>
                  </div>
                  <Link href="/patients">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/patients">
              <Button variant="outline">View All Patients</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Average Risk Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Diabetes Risk</span>
                <span className="font-medium">
                  {Math.round(patients.reduce((acc, p) => acc + p.riskAssessment.diabetesRisk, 0) / patients.length)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cardiovascular Risk</span>
                <span className="font-medium">
                  {Math.round(
                    patients.reduce((acc, p) => acc + p.riskAssessment.cardiovascularRisk, 0) / patients.length,
                  )}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Common Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Hypertension</span>
                <Badge variant="secondary">2 patients</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Diabetes</span>
                <Badge variant="secondary">2 patients</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Anxiety</span>
                <Badge variant="secondary">1 patient</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Appointments</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">New Patients</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Follow-ups</span>
                <span className="font-medium">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
