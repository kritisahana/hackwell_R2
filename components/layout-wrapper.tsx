"use client"

import type React from "react"

import { Sidebar } from "./sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
  userRole: "doctor" | "patient"
  userName: string
}

export function LayoutWrapper({ children, userRole, userName }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} userName={userName} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
