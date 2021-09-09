function timeDifference(curr?: number, prev?: number) {
  if (curr === undefined) return null
  if (prev === undefined) return null

  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = curr - prev

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now"
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago"
  }
  if (elapsed < milliSecondsPerHour) {
    return `${Math.round(elapsed / milliSecondsPerMinute)} mins ago`
  }
  if (elapsed < milliSecondsPerDay) {
    const remaining = Math.round(elapsed / milliSecondsPerHour)
    if (remaining === 1) {
      return `${remaining} hour ago`
    }
    return `${remaining} hours ago`
  }
  if (elapsed < milliSecondsPerMonth) {
    const remaining = Math.round(elapsed / milliSecondsPerDay)
    if (remaining === 1) {
      return `${remaining} day ago`
    }
    return `${remaining} days ago`
  }
  if (elapsed < milliSecondsPerYear) {
    return `${Math.round(elapsed / milliSecondsPerMonth)} months ago`
  }
  return `${Math.round(elapsed / milliSecondsPerYear)} years ago`
}

// how to convert date.ISOSTRING ==> date.toString or date.toTimeString() then => getTime()

export default function timeDifferenceForDate(date?: string | null | number) {
  if (date) {
    const conv = date?.toLocaleString()
    const now = new Date().getTime()
    const updated = new Date(conv).getTime()
    return timeDifference(now, updated)
  }

  return null
}
