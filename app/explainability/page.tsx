"use client"

import { AuthGuard } from "@/components/auth-guard"
import { ExplainabilityPage } from "@/components/explainability-page"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function Explainability() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        <ExplainabilityPage />
      </LayoutWrapper>
    </AuthGuard>
  )
}
