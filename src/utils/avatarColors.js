const PALETTE = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
  "bg-gray-100 text-gray-700",
]

const PALETTE_DARK = [
  "dark:bg-blue-900/40 dark:text-blue-200",
  "dark:bg-violet-900/40 dark:text-violet-200",
  "dark:bg-emerald-900/40 dark:text-emerald-200",
  "dark:bg-amber-900/40 dark:text-amber-200",
  "dark:bg-pink-900/40 dark:text-pink-200",
  "dark:bg-orange-900/40 dark:text-orange-200",
  "dark:bg-teal-900/40 dark:text-teal-200",
  "dark:bg-gray-700 dark:text-gray-200",
]

/**
 * @param {number} colorIndex
 * @returns {string}
 */
export function avatarColorClasses(colorIndex) {
  const i = Number(colorIndex) % 8
  const base = PALETTE[i] ?? PALETTE[0]
  const dark = PALETTE_DARK[i] ?? PALETTE_DARK[0]
  return `${base} ${dark}`
}
