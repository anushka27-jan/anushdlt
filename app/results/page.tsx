"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Heart, Phone, ExternalLink, Home } from "lucide-react"

const severityLevels = {
  minimal: {
    title: "Minimal Depression",
    description: "Your responses suggest minimal symptoms of depression.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    recommendations: [
      "Continue maintaining healthy lifestyle habits",
      "Stay connected with friends and family",
      "Practice stress management techniques",
      "Monitor your mood and seek help if symptoms worsen",
    ],
  },
  mild: {
    title: "Mild Depression",
    description: "Your responses suggest mild symptoms of depression.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    recommendations: [
      "Consider talking to a counselor or therapist",
      "Increase physical activity and exercise",
      "Maintain regular sleep schedule",
      "Practice mindfulness or meditation",
      "Stay socially connected",
    ],
  },
  moderate: {
    title: "Moderate Depression",
    description: "Your responses suggest moderate symptoms of depression.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    recommendations: [
      "Strongly consider professional counseling or therapy",
      "Consult with your healthcare provider",
      "Consider support groups",
      "Maintain routine and structure",
      "Avoid alcohol and drugs",
    ],
  },
  severe: {
    title: "Severe Depression",
    description: "Your responses suggest significant symptoms of depression.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    recommendations: [
      "Seek professional help immediately",
      "Contact your healthcare provider today",
      "Consider intensive therapy or treatment programs",
      "Reach out to trusted friends or family for support",
      "Follow up regularly with mental health professionals",
    ],
  },
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const level = searchParams.get("level") || "minimal"

  const severityInfo = severityLevels[level as keyof typeof severityLevels]
  const scorePercentage = (score / 27) * 100 // Max score is 27

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Your Assessment Results</h1>
            <p className="text-gray-600">Based on your responses, here's what we found</p>
          </div>

          {/* Score Card */}
          <Card className={`mb-6 ${severityInfo.bgColor} ${severityInfo.borderColor}`}>
            <CardHeader>
              <CardTitle className={`text-2xl ${severityInfo.color}`}>{severityInfo.title}</CardTitle>
              <CardDescription className="text-lg">{severityInfo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Assessment Score</span>
                    <span className="text-sm font-medium">{score}/27</span>
                  </div>
                  <Progress value={scorePercentage} className="h-3" />
                </div>

                <Alert>
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Remember:</strong> This assessment is a screening tool and not a medical diagnosis.
                    Professional evaluation is recommended for accurate diagnosis and treatment planning.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {severityInfo.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Crisis Resources */}
          {(level === "severe" || level === "moderate") && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Immediate Support Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Crisis Hotlines</h3>
                    <p className="text-red-700">
                      National Suicide Prevention Lifeline: <strong>988</strong>
                    </p>
                    <p className="text-red-700">
                      Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Emergency</h3>
                    <p className="text-red-700">
                      If in immediate danger: <strong>911</strong>
                    </p>
                    <p className="text-red-700">Go to your nearest emergency room</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resources */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Helpful Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Professional Help</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.psychologytoday.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Psychology Today - Find a Therapist
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.nami.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        NAMI - National Alliance on Mental Illness
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Self-Help Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.nimh.nih.gov/health/topics/depression"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        NIMH Depression Information
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.headspace.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Headspace - Meditation & Mindfulness
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="flex items-center bg-transparent">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link href="/assessment">
              <Button className="bg-blue-600 hover:bg-blue-700">Retake Assessment</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
