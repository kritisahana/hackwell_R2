"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  AlertTriangle,
  Phone,
  Mail,
  FileText,
  SettingsIcon,
} from "lucide-react"
import { useAuth } from "@/components/auth-guard"

export function SettingsPage() {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState({
    riskAlerts: true,
    medicationReminders: true,
    appointmentReminders: true,
    weeklyReports: false,
  })

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    emergencyContact: "",
  })

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile:", profile)
    alert("Profile updated successfully!")
  }

  const handleSaveNotifications = () => {
    // In a real app, this would save to the backend
    console.log("Saving notifications:", notifications)
    alert("Notification preferences updated!")
  }

  const faqItems = [
    {
      question: "How accurate are the AI risk predictions?",
      answer:
        "Our AI model has been trained on over 50,000 patient records and achieves 94.2% accuracy in risk prediction. However, these predictions are meant to supplement, not replace, professional medical advice. Always consult with your healthcare provider for medical decisions.",
    },
    {
      question: "What data does the AI use to make predictions?",
      answer:
        "The AI analyzes various factors including age, BMI, blood pressure, glucose levels, medical history, lifestyle factors, and medication adherence. All data is processed securely and in compliance with healthcare privacy regulations.",
    },
    {
      question: "How often should I update my health information?",
      answer:
        "We recommend updating your vitals weekly or after any significant health events. Medication changes should be updated immediately to ensure accurate risk assessments and recommendations.",
    },
    {
      question: "Can I share my data with my doctor?",
      answer:
        "Yes, you can export your health data and trends to share with your healthcare provider. This can be done from the profile section or by requesting a comprehensive health report.",
    },
    {
      question: "What should I do if I receive a critical alert?",
      answer:
        "Critical alerts indicate potentially serious health conditions that require immediate medical attention. Contact your healthcare provider or emergency services immediately. Do not delay seeking medical care.",
    },
    {
      question: "How is my health data protected?",
      answer:
        "We use enterprise-grade encryption and comply with HIPAA regulations. Your data is stored securely and never shared with third parties without your explicit consent. All access is logged and monitored.",
    },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Help & FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <Badge variant="secondary" className="capitalize">
                    {user?.role}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    placeholder="Emergency contact number"
                    value={profile.emergencyContact}
                    onChange={(e) => setProfile((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Risk Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your health risk levels change significantly
                    </p>
                  </div>
                  <Switch
                    checked={notifications.riskAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, riskAlerts: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Medication Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders to take your medications on time</p>
                  </div>
                  <Switch
                    checked={notifications.medicationReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, medicationReminders: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming doctor appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, appointmentReminders: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Health Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summaries of your health trends</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Reset to Default</Button>
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Data Protection
                </CardTitle>
                <CardDescription>Manage your data privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Data Sharing</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Share data with healthcare providers</Label>
                          <p className="text-xs text-muted-foreground">Allow your doctors to access your health data</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Anonymous research participation</Label>
                          <p className="text-xs text-muted-foreground">Help improve AI models with anonymized data</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Data Export</h4>
                    <p className="text-sm text-muted-foreground mb-3">Download your health data in a portable format</p>
                    <Button variant="outline" className="bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Export My Data
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Account Deletion</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your health data is encrypted and stored securely in compliance with HIPAA regulations. We never share
                your personal information with third parties without your explicit consent.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        <TabsContent value="help">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions about AI Wellness Assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Need additional help? Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@aiwellness.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">1-800-WELLNESS</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Medical Disclaimer:</strong> This application provides wellness guidance and is not intended as
                a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
                physician or other qualified health provider with any questions you may have regarding a medical
                condition. Never disregard professional medical advice or delay in seeking it because of something you
                have read in this application.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Sign Out</p>
              <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
            </div>
            <Button variant="outline" onClick={logout} className="bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
