"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Eye,
  EyeOff,
  Smartphone,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react"
import { formatTime, getTimeColor } from "@/lib/utils"

interface SocialMediaSite {
  name: string
  timeSpent: number
  isActive: boolean
  icon: string
}

export default function DistractionTimer() {
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timeLimit, setTimeLimit] = useState(600) // 10 minutes in seconds
  const [currentTime, setCurrentTime] = useState(0)
  const [isBlurred, setIsBlurred] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [blurIntensity, setBlurIntensity] = useState(10)
  const [warningThreshold, setWarningThreshold] = useState(80) // 80% of time limit
  const [showWarning, setShowWarning] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [socialMediaSites, setSocialMediaSites] = useState<SocialMediaSite[]>([
    { name: "Instagram", timeSpent: 0, isActive: false, icon: "📷" },
    { name: "Facebook", timeSpent: 0, isActive: false, icon: "👥" },
    { name: "Twitter", timeSpent: 0, isActive: false, icon: "🐦" },
    { name: "TikTok", timeSpent: 0, isActive: false, icon: "🎵" },
    { name: "YouTube", timeSpent: 0, isActive: false, icon: "📺" },
    { name: "WhatsApp", timeSpent: 0, isActive: false, icon: "💬" },
  ])

  // Simulate social media detection (in real app, this would use browser extension or system monitoring)
  const simulateSocialMediaUsage = () => {
    const randomSite = Math.floor(Math.random() * socialMediaSites.length)
    setSocialMediaSites((prev) =>
      prev.map((site, index) =>
        index === randomSite
          ? { ...site, timeSpent: site.timeSpent + 1, isActive: true }
          : { ...site, isActive: false },
      ),
    )
  }

  useEffect(() => {
    if (isTimerActive) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1

          // Check if warning threshold is reached
          if (newTime >= (timeLimit * warningThreshold) / 100 && !showWarning) {
            setShowWarning(true)
            // Play warning sound
            if (audioRef.current) {
              audioRef.current.play().catch(() => {})
            }
          }

          // Check if time limit is exceeded
          if (newTime >= timeLimit) {
            setIsBlurred(true)
          }

          // Simulate social media usage
          if (newTime % 5 === 0) {
            simulateSocialMediaUsage()
          }

          return newTime
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTimerActive, timeLimit, warningThreshold, showWarning])

  const startTimer = () => {
    setIsTimerActive(true)
    setShowWarning(false)
  }

  const pauseTimer = () => {
    setIsTimerActive(false)
  }

  const resetTimer = () => {
    setIsTimerActive(false)
    setCurrentTime(0)
    setIsBlurred(false)
    setShowWarning(false)
    setSocialMediaSites((prev) => prev.map((site) => ({ ...site, timeSpent: 0, isActive: false })))
  }

  const toggleBlur = () => {
    setIsBlurred(!isBlurred)
  }

  const totalSocialMediaTime = socialMediaSites.reduce((total, site) => total + site.timeSpent, 0)
  const progressPercentage = (currentTime / timeLimit) * 100
  const timeRemaining = Math.max(0, timeLimit - currentTime)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative">
      {/* Blur Overlay */}
      {isBlurred && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: `blur(${blurIntensity}px)` }}
        >
          <Card className="glass-effect border-red-200 max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <EyeOff className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-red-600">Time Limit Exceeded!</CardTitle>
              <CardDescription>
                You've spent {formatTime(currentTime)} on social media. Time to take a break!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Consider doing something productive:</p>
                <ul className="text-sm space-y-1 text-left">
                  <li>• Take a 5-minute walk</li>
                  <li>• Drink some water</li>
                  <li>• Do some stretching</li>
                  <li>• Read a book</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button onClick={toggleBlur} variant="outline" className="flex-1 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Continue (5 min)
                </Button>
                <Button onClick={resetTimer} className="flex-1 bg-green-600 hover:bg-green-700">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Timer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Warning Notification */}
      {showWarning && !isBlurred && (
        <div className="fixed top-4 right-4 z-40">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Warning!</p>
                  <p className="text-sm text-yellow-700">{formatTime(timeRemaining)} remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Distraction Timer</h1>
          <p className="text-xl text-gray-600">Stay focused and manage your digital wellness</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-6 w-6" />
                  Focus Timer
                </CardTitle>
                <CardDescription>Track your social media usage and stay productive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Time Display */}
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getTimeColor(currentTime, timeLimit)}`}>
                    {formatTime(currentTime)}
                  </div>
                  <p className="text-gray-500 mt-2">
                    Limit: {formatTime(timeLimit)} | Remaining: {formatTime(timeRemaining)}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center gap-4">
                  {!isTimerActive ? (
                    <Button onClick={startTimer} size="lg" className="bg-green-600 hover:bg-green-700">
                      <Play className="h-5 w-5 mr-2" />
                      Start Timer
                    </Button>
                  ) : (
                    <Button onClick={pauseTimer} size="lg" variant="outline">
                      <Pause className="h-5 w-5 mr-2" />
                      Pause Timer
                    </Button>
                  )}
                  <Button onClick={resetTimer} size="lg" variant="outline">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={() => setShowSettings(!showSettings)} size="lg" variant="outline">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings Panel */}
            {showSettings && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Timer Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Limit: {formatTime(timeLimit)}</label>
                    <Slider
                      value={[timeLimit]}
                      onValueChange={(value) => setTimeLimit(value[0])}
                      max={3600}
                      min={300}
                      step={300}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 min</span>
                      <span>60 min</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Warning at {warningThreshold}% of time limit
                    </label>
                    <Slider
                      value={[warningThreshold]}
                      onValueChange={(value) => setWarningThreshold(value[0])}
                      max={95}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Blur Intensity: {blurIntensity}px</label>
                    <Slider
                      value={[blurIntensity]}
                      onValueChange={(value) => setBlurIntensity(value[0])}
                      max={20}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Enable Sound Alerts</label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Social Media Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Social Media Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialMediaSites.map((site, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{site.icon}</span>
                        <span className="text-sm font-medium">{site.name}</span>
                        {site.isActive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                      </div>
                      <span className="text-sm text-gray-600">{formatTime(site.timeSpent)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Time</span>
                      <span className={getTimeColor(totalSocialMediaTime, timeLimit)}>
                        {formatTime(totalSocialMediaTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Today's Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sessions</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average Session</span>
                    <span className="font-medium">8m 30s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Longest Break</span>
                    <span className="font-medium">45m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Focus Score</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setTimeLimit(300)}
                  >
                    5 min focus session
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setTimeLimit(1500)}
                  >
                    25 min Pomodoro
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={toggleBlur}
                  >
                    {isBlurred ? "Remove blur" : "Test blur effect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Hidden audio element for notifications */}
      <audio
        ref={audioRef}
        preload="auto"
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
      />
    </div>
  )
}
