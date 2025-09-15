"use client"

import { AuthGuard } from "@/components/auth-guard"
import { SettingsPage } from "@/components/settings-page"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function Settings() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        <SettingsPage />
      </LayoutWrapper>
    </AuthGuard>
  )
}
