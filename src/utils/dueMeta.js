/**
 * Parse YYYY-MM-DD as local midnight.
 * @param {string} ymd
 * @returns {Date | null}
 */
function parseLocalDate(ymd) {
  if (!ymd || typeof ymd !== "string") return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim())
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(y, mo, d)
  if (Number.isNaN(dt.getTime())) return null
  return dt
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/**
 * @param {string} due - YYYY-MM-DD or empty
 * @returns {{ label: string, tagClass: string, isOverdue: boolean } | null}
 */
export function dueMeta(due) {
  const parsed = parseLocalDate(due)
  if (!parsed) return null

  const today = startOfDay(new Date())
  const dueDay = startOfDay(parsed)
  const label = dueDay.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  if (dueDay < today) {
    return {
      label,
      tagClass:
        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200",
      isOverdue: true,
    }
  }
  if (dueDay.getTime() === today.getTime()) {
    return {
      label,
      tagClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
      isOverdue: false,
    }
  }
  return {
    label,
    tagClass:
      "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    isOverdue: false,
  }
}
