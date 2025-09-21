"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, ArrowLeft, Save, Star } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface TreatmentRating {
  abhyanga: number
  shirodhara: number
  consultation: number
  nasya: number
}

interface TreatmentNotes {
  abhyanga: string
  shirodhara: string
  consultation: string
  nasya: string
}

export default function TreatmentRatingPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState("")
  const [treatmentRatings, setTreatmentRatings] = useState<TreatmentRating>({
    abhyanga: 5,
    shirodhara: 5,
    consultation: 5,
    nasya: 5
  })
  const [treatmentNotes, setTreatmentNotes] = useState<TreatmentNotes>({
    abhyanga: "",
    shirodhara: "",
    consultation: "",
    nasya: ""
  })
  const [overallNotes, setOverallNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const patients = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Chen" },
    { id: "3", name: "Emily Davis" },
    { id: "4", name: "Robert Wilson" },
    { id: "5", name: "Lisa Anderson" }
  ]

  const treatments = [
    { key: "abhyanga", name: "Abhyanga", description: "Full body oil massage with warm herbal oils" },
    { key: "shirodhara", name: "Shirodhara", description: "Continuous pouring of warm oil on the forehead" },
    { key: "consultation", name: "Consultation", description: "Initial assessment and treatment planning" },
    { key: "nasya", name: "Nasya", description: "Nasal administration of medicated oils" }
  ]

  const handleRatingChange = (treatment: keyof TreatmentRating, value: number[]) => {
    setTreatmentRatings(prev => ({
      ...prev,
      [treatment]: value[0]
    }))
  }

  const handleNotesChange = (treatment: keyof TreatmentNotes, value: string) => {
    setTreatmentNotes(prev => ({
      ...prev,
      [treatment]: value
    }))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-600"
    if (rating >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return "Excellent"
    if (rating >= 7) return "Good"
    if (rating >= 5) return "Average"
    if (rating >= 3) return "Below Average"
    return "Poor"
  }

  const handleSave = () => {
    if (!selectedPatient) {
      toast.error("Please select a patient")
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log("Treatment ratings saved:", {
        patient: selectedPatient,
        ratings: treatmentRatings,
        notes: treatmentNotes,
        overallNotes
      })
      
      toast.success("Treatment plan updated successfully!")
      setIsSaving(false)
      router.push("/dashboard/practitioner")
    }, 1500)
  }

  const calculateOverallRating = () => {
    const ratings = Object.values(treatmentRatings)
    return Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length)
  }

  return (
    <PractitionerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Update Treatment Plan</h1>
            <p className="text-muted-foreground">Rate and document treatment effectiveness for your patients</p>
          </div>
        </div>

        {/* Patient Selection */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Select Patient
            </CardTitle>
            <CardDescription>Choose the patient for whom you want to update the treatment plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="border-green-200 focus:border-primary">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {selectedPatient && (
          <>
            {/* Treatment Ratings */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Treatment Effectiveness Ratings</CardTitle>
                <CardDescription>Rate each treatment on a scale of 1-10 based on patient response and effectiveness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {treatments.map((treatment) => (
                  <div key={treatment.key} className="space-y-4 p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">{treatment.name}</h4>
                      <p className="text-sm text-muted-foreground">{treatment.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Effectiveness Rating</Label>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-lg ${getRatingColor(treatmentRatings[treatment.key as keyof TreatmentRating])}`}>
                            {treatmentRatings[treatment.key as keyof TreatmentRating]}/10
                          </span>
                          <span className={`text-sm font-medium ${getRatingColor(treatmentRatings[treatment.key as keyof TreatmentRating])}`}>
                            ({getRatingLabel(treatmentRatings[treatment.key as keyof TreatmentRating])})
                          </span>
                        </div>
                      </div>
                      
                      <Slider
                        value={[treatmentRatings[treatment.key as keyof TreatmentRating]]}
                        onValueChange={(value) => handleRatingChange(treatment.key as keyof TreatmentRating, value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Poor (1)</span>
                        <span>Excellent (10)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`notes-${treatment.key}`} className="text-sm font-medium">
                        Treatment Notes
                      </Label>
                      <Textarea
                        id={`notes-${treatment.key}`}
                        value={treatmentNotes[treatment.key as keyof TreatmentNotes]}
                        onChange={(e) => handleNotesChange(treatment.key as keyof TreatmentNotes, e.target.value)}
                        className="border-green-200 focus:border-primary"
                        rows={3}
                        placeholder={`Add specific notes about ${treatment.name} effectiveness, patient response, and any observations...`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Overall Assessment */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Overall Treatment Assessment</CardTitle>
                <CardDescription>Provide an overall assessment of the patient's treatment progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Overall Rating:</span>
                  </div>
                  <span className={`font-bold text-2xl ${getRatingColor(calculateOverallRating())}`}>
                    {calculateOverallRating()}/10
                  </span>
                  <span className={`font-medium ${getRatingColor(calculateOverallRating())}`}>
                    ({getRatingLabel(calculateOverallRating())})
                  </span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overall-notes" className="text-sm font-medium">
                    Overall Treatment Notes
                  </Label>
                  <Textarea
                    id="overall-notes"
                    value={overallNotes}
                    onChange={(e) => setOverallNotes(e.target.value)}
                    className="border-green-200 focus:border-primary"
                    rows={4}
                    placeholder="Provide an overall assessment of the patient's progress, recommendations for future treatments, and any important observations..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push("/dashboard/practitioner")}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? "Saving..." : "Save Treatment Plan"}
                <Save className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </PractitionerLayout>
  )
}
