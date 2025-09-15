"use client"

import { AuthGuard } from "@/components/auth-guard"
import { PatientFormsSection } from "@/components/patient-forms-section"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function FormsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["patient"]}>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        <PatientFormsSection />
      </LayoutWrapper>
    </AuthGuard>
  )
}
