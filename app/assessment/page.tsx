"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    question: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    question: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 4,
    question: "Over the last 2 weeks, how often have you felt tired or had little energy?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 5,
    question: "Over the last 2 weeks, how often have you had poor appetite or overeating?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 6,
    question: "Over the last 2 weeks, how often have you felt bad about yourself or that you are a failure?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 7,
    question: "Over the last 2 weeks, how often have you had trouble concentrating on things?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 8,
    question: "Over the last 2 weeks, how often have you moved or spoken slowly, or been fidgety or restless?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 9,
    question: "Over the last 2 weeks, how often have you had thoughts that you would be better off dead?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number.parseInt(value),
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/results?score=${result.totalScore}&level=${result.severityLevel}`)
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQ.id] !== undefined
  const allAnswered = questions.every((q) => answers[q.id] !== undefined)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">Depression Assessment</h1>
            <Progress value={progress} className="mb-4" />
            <p className="text-center text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
              <CardDescription>Please select the option that best describes how you've been feeling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQ.id]?.toString() || ""}
                onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
              >
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allAnswered || isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? "Submitting..." : "Complete Assessment"}
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={!isAnswered} className="bg-blue-600 hover:bg-blue-700">
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Crisis notice for question 9 */}
          {currentQuestion === 8 && (
            <Card className="mt-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-800 text-sm">
                  <strong>If you're having thoughts of self-harm:</strong> Please reach out for immediate help. Call 988
                  (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line).
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
