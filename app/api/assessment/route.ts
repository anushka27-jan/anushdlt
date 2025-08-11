import { type NextRequest, NextResponse } from "next/server"

interface AssessmentAnswers {
  [questionId: number]: number
}

interface AssessmentRequest {
  answers: AssessmentAnswers
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentRequest = await request.json()
    const { answers } = body

    // Calculate total score
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)

    // Determine severity level based on PHQ-9 scoring
    let severityLevel: string
    if (totalScore <= 4) {
      severityLevel = "minimal"
    } else if (totalScore <= 9) {
      severityLevel = "mild"
    } else if (totalScore <= 14) {
      severityLevel = "moderate"
    } else {
      severityLevel = "severe"
    }

    // Generate recommendations based on score
    const recommendations = generateRecommendations(severityLevel, totalScore)

    // In a real app, you might want to store this data
    // await saveAssessmentResult({ totalScore, severityLevel, timestamp: new Date() })

    return NextResponse.json({
      totalScore,
      severityLevel,
      recommendations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing assessment:", error)
    return NextResponse.json({ error: "Failed to process assessment" }, { status: 500 })
  }
}

function generateRecommendations(severityLevel: string, score: number): string[] {
  const baseRecommendations = [
    "Consider speaking with a mental health professional",
    "Maintain regular sleep and exercise routines",
    "Stay connected with supportive friends and family",
    "Practice stress management techniques",
  ]

  switch (severityLevel) {
    case "minimal":
      return [
        "Continue maintaining healthy lifestyle habits",
        "Monitor your mood and well-being",
        "Practice preventive self-care strategies",
      ]
    case "mild":
      return [
        "Consider counseling or therapy",
        "Increase physical activity",
        "Practice mindfulness or meditation",
        ...baseRecommendations.slice(1, 3),
      ]
    case "moderate":
      return [
        "Seek professional counseling or therapy",
        "Consult with your healthcare provider",
        "Consider support groups",
        ...baseRecommendations,
      ]
    case "severe":
      return [
        "Seek immediate professional help",
        "Contact your healthcare provider today",
        "Consider intensive treatment options",
        "Reach out to crisis support if needed",
        ...baseRecommendations,
      ]
    default:
      return baseRecommendations
  }
}
