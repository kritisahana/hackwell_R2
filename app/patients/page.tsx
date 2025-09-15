"use client"

import { AuthGuard } from "@/components/auth-guard"
import { PatientManagement } from "@/components/patient-management"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function PatientsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["doctor"]}>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        <PatientManagement />
      </LayoutWrapper>
    </AuthGuard>
  )
}
