"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft, Save, AlertCircle } from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"
import Link from "next/link"
import { toast } from "sonner"

export default function HealthInfoPage() {
  const [isEditing, setIsEditing] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [healthData, setHealthData] = useState({
    doshaType: "Vata-Pitta",
    primaryConcerns: "Stress, Sleep Issues, Digestive Problems",
    allergies: "None reported",
    currentMedications: "Ashwagandha, Brahmi, Triphala",
    medicalHistory: "No major medical conditions. Occasional migraines.",
    lifestyle: "Sedentary work, moderate exercise, vegetarian diet",
    height: "5'10\"",
    weight: "165 lbs",
    bloodType: "O+",
    chronicConditions: "None",
    familyHistory: "Diabetes in family",
    exerciseFrequency: "3-4 times per week",
    dietType: "Vegetarian",
    sleepHours: "7-8 hours",
    stressLevel: "Moderate",
    smokingStatus: "Never smoked",
    alcoholConsumption: "Occasional"
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage for demo purposes
      localStorage.setItem('patient_health_info', JSON.stringify(healthData))
      
      toast.success("Health information updated successfully!")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update health information. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data if needed
    toast.info("Changes cancelled")
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/dashboard/patient/profile">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">Health Information</h1>
              <p className="text-muted-foreground">Update your health profile and medical information</p>
            </div>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                <Heart className="w-4 h-4 mr-2" />
                Edit Health Info
              </Button>
            )}
          </div>
        </div>

        {/* Health Information Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Health Info */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Basic Health Information
              </CardTitle>
              <CardDescription>Your fundamental health details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doshaType">Dosha Type</Label>
                  <Select
                    value={healthData.doshaType}
                    onValueChange={(value) => setHealthData({ ...healthData, doshaType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vata">Vata</SelectItem>
                      <SelectItem value="Pitta">Pitta</SelectItem>
                      <SelectItem value="Kapha">Kapha</SelectItem>
                      <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                      <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                      <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                      <SelectItem value="Tridoshic">Tridoshic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select
                    value={healthData.bloodType}
                    onValueChange={(value) => setHealthData({ ...healthData, bloodType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={healthData.height}
                    onChange={(e) => setHealthData({ ...healthData, height: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                    placeholder="e.g., 5'10\""
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={healthData.weight}
                    onChange={(e) => setHealthData({ ...healthData, weight: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                    placeholder="e.g., 165 lbs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle Description</Label>
                <Textarea
                  id="lifestyle"
                  value={healthData.lifestyle}
                  onChange={(e) => setHealthData({ ...healthData, lifestyle: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={2}
                  placeholder="Describe your daily lifestyle, work, exercise routine..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Medical Information
              </CardTitle>
              <CardDescription>Your medical history and current conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryConcerns">Primary Health Concerns</Label>
                <Textarea
                  id="primaryConcerns"
                  value={healthData.primaryConcerns}
                  onChange={(e) => setHealthData({ ...healthData, primaryConcerns: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={2}
                  placeholder="List your main health concerns..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={healthData.allergies}
                  onChange={(e) => setHealthData({ ...healthData, allergies: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={2}
                  placeholder="List any allergies or adverse reactions..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications/Supplements</Label>
                <Textarea
                  id="currentMedications"
                  value={healthData.currentMedications}
                  onChange={(e) => setHealthData({ ...healthData, currentMedications: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={2}
                  placeholder="List current medications, supplements, or herbs..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Input
                  id="chronicConditions"
                  value={healthData.chronicConditions}
                  onChange={(e) => setHealthData({ ...healthData, chronicConditions: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  placeholder="e.g., Diabetes, Hypertension, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="familyHistory">Family Medical History</Label>
                <Textarea
                  id="familyHistory"
                  value={healthData.familyHistory}
                  onChange={(e) => setHealthData({ ...healthData, familyHistory: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={2}
                  placeholder="Any significant family medical history..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Detailed Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={healthData.medicalHistory}
                  onChange={(e) => setHealthData({ ...healthData, medicalHistory: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={3}
                  placeholder="Detailed medical history, surgeries, hospitalizations..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle & Habits */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Lifestyle & Habits
              </CardTitle>
              <CardDescription>Your daily habits and lifestyle choices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
                  <Select
                    value={healthData.exerciseFrequency}
                    onValueChange={(value) => setHealthData({ ...healthData, exerciseFrequency: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="5-6 times per week">5-6 times per week</SelectItem>
                      <SelectItem value="3-4 times per week">3-4 times per week</SelectItem>
                      <SelectItem value="1-2 times per week">1-2 times per week</SelectItem>
                      <SelectItem value="Rarely">Rarely</SelectItem>
                      <SelectItem value="Never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietType">Diet Type</Label>
                  <Select
                    value={healthData.dietType}
                    onValueChange={(value) => setHealthData({ ...healthData, dietType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Non-vegetarian">Non-vegetarian</SelectItem>
                      <SelectItem value="Pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="Keto">Keto</SelectItem>
                      <SelectItem value="Paleo">Paleo</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleepHours">Sleep Hours (per night)</Label>
                  <Select
                    value={healthData.sleepHours}
                    onValueChange={(value) => setHealthData({ ...healthData, sleepHours: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Less than 5 hours">Less than 5 hours</SelectItem>
                      <SelectItem value="5-6 hours">5-6 hours</SelectItem>
                      <SelectItem value="7-8 hours">7-8 hours</SelectItem>
                      <SelectItem value="8-9 hours">8-9 hours</SelectItem>
                      <SelectItem value="More than 9 hours">More than 9 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stressLevel">Stress Level</Label>
                  <Select
                    value={healthData.stressLevel}
                    onValueChange={(value) => setHealthData({ ...healthData, stressLevel: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Very High">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smokingStatus">Smoking Status</Label>
                  <Select
                    value={healthData.smokingStatus}
                    onValueChange={(value) => setHealthData({ ...healthData, smokingStatus: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Never smoked">Never smoked</SelectItem>
                      <SelectItem value="Former smoker">Former smoker</SelectItem>
                      <SelectItem value="Current smoker">Current smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
                  <Select
                    value={healthData.alcoholConsumption}
                    onValueChange={(value) => setHealthData({ ...healthData, alcoholConsumption: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Never">Never</SelectItem>
                      <SelectItem value="Occasional">Occasional</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-yellow-800">
                <AlertCircle className="w-5 h-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-yellow-700">
              <ul className="space-y-2">
                <li>• Please ensure all information is accurate and up-to-date</li>
                <li>• This information helps our practitioners provide better care</li>
                <li>• All data is kept confidential and secure</li>
                <li>• Update this information whenever there are significant changes</li>
                <li>• Consult with your practitioner if you have any questions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PatientLayout>
  )
}
