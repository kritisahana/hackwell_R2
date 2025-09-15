"use client"

import { AuthGuard } from "@/components/auth-guard"
import { PatientDashboard } from "@/components/patient-dashboard"
import { DoctorDashboard } from "@/components/doctor-dashboard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        {user.role === "patient" ? <PatientDashboard /> : <DoctorDashboard />}
      </LayoutWrapper>
    </AuthGuard>
  )
}
