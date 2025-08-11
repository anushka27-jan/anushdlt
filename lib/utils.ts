import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function getTimeColor(timeSpent: number, limit: number): string {
  const percentage = (timeSpent / limit) * 100
  if (percentage < 50) return "text-green-600"
  if (percentage < 80) return "text-yellow-600"
  return "text-red-600"
}
