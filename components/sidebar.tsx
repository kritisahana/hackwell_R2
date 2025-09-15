"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, User, Heart, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth-guard"

interface SidebarProps {
  userRole: "doctor" | "patient"
  userName: string
}

export function Sidebar({ userRole, userName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const doctorNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patients", label: "Patients", icon: Users },
    { href: "/explainability", label: "Explainability", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const patientNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/forms", label: "Forms", icon: User }, // Added Forms link for patient data entry
    { href: "/profile", label: "Profile", icon: User },
    { href: "/recommendations", label: "Recommendations", icon: Heart },
    { href: "/explainability", label: "Explainability", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const navItems = userRole === "doctor" ? doctorNavItems : patientNavItems

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">AI Wellness</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  isCollapsed && "px-2",
                )}
              >
                <Icon className={cn("w-4 h-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm text-sidebar-foreground font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={logout}
          className={cn("w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent", isCollapsed && "px-2")}
        >
          <LogOut className={cn("w-4 h-4", !isCollapsed && "mr-2")} />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )
}
