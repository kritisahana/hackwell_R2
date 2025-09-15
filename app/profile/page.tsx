"use client"

import { AuthGuard } from "@/components/auth-guard"
import { PatientProfileForm } from "@/components/patient-profile-form"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["patient"]}>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        <PatientProfileForm />
      </LayoutWrapper>
    </AuthGuard>
  )
}
