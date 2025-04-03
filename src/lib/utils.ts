
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM d, yyyy")
  } catch (error) {
    return dateString
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM d, yyyy HH:mm")
  } catch (error) {
    return dateString
  }
}

