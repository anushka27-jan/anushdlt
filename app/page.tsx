import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AnushDLT</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Depression Level Assessment Tool - A confidential screening to help you understand your mental health
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Understanding Your Mental Health</CardTitle>
              <CardDescription className="text-center text-lg">
                Take our confidential assessment to gain insights into your emotional well-being
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Completely Confidential</h3>
                    <p className="text-gray-600">Your responses are private and secure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Quick Assessment</h3>
                    <p className="text-gray-600">Takes only 5-10 minutes to complete</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Professional Guidance</h3>
                    <p className="text-gray-600">Based on established screening tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Support Resources</h3>
                    <p className="text-gray-600">Get connected to helpful resources</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This assessment is not a substitute for professional medical advice,
                  diagnosis, or treatment. If you're experiencing thoughts of self-harm, please contact emergency
                  services or a crisis helpline immediately.
                </p>
              </div>

              <div className="text-center">
                <Link href="/assessment">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Crisis Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800">Crisis Hotlines</h3>
                  <p className="text-red-700">National Suicide Prevention Lifeline: 988</p>
                  <p className="text-red-700">Crisis Text Line: Text HOME to 741741</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800">Professional Help</h3>
                  <p className="text-green-700">Contact your healthcare provider</p>
                  <p className="text-green-700">Find a therapist: Psychology Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
