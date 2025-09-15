"use client"

import { AuthGuard } from "@/components/auth-guard"
import { RecommendationsPage } from "@/components/recommendations-page"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { useAuth } from "@/components/auth-guard"

export default function Recommendations() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["patient"]}>
      <LayoutWrapper userRole={user.role} userName={user.name}>
        <RecommendationsPage />
      </LayoutWrapper>
    </AuthGuard>
  )
}
