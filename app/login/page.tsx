"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import dummyData from "@/lib/dummy-data.json"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"doctor" | "patient">("patient")
  const [showConsent, setShowConsent] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials against dummy data
    const user = dummyData.users.find((u) => u.email === email && u.role === role)

    if (!user) {
      setError("Invalid credentials or role selection")
      setIsLoading(false)
      return
    }

    // For first-time users, show consent screen
    if (!showConsent && !consentGiven) {
      setShowConsent(true)
      setIsLoading(false)
      return
    }

    if (showConsent && !consentGiven) {
      setError("Please provide consent to continue")
      setIsLoading(false)
      return
    }

    // Store user info in localStorage (in real app, use proper auth)
    localStorage.setItem("user", JSON.stringify(user))

    // Redirect based on role
    router.push("/dashboard")
    setIsLoading(false)
  }

  const handleConsentBack = () => {
    setShowConsent(false)
    setConsentGiven(false)
  }

  if (showConsent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Privacy & Terms</CardTitle>
            <CardDescription>Please review and accept our terms to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Data Processing Notice</h3>
                <p className="text-sm text-muted-foreground">
                  By using AI Wellness Assistant, you consent to the processing of your health data for the purpose of
                  providing personalized wellness recommendations and risk assessments.
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  This application provides wellness guidance and is not intended as a substitute for professional
                  medical advice, diagnosis, or treatment. Always consult with a licensed physician.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="consent" checked={consentGiven} onCheckedChange={setConsentGiven} />
              <Label htmlFor="consent" className="text-sm">
                I consent to my data being processed and understand the medical disclaimer
              </Label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleConsentBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleLogin} disabled={isLoading} className="flex-1">
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to AI Wellness</CardTitle>
          <CardDescription>Sign in to access your personalized health dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={(value: "doctor" | "patient") => setRole(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor">Doctor</Label>
                </div>
              </RadioGroup>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground">
              Demo credentials:
              <br />
              Doctor: doctor@example.com
              <br />
              Patient: patient@example.com
              <br />
              Password: any
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
