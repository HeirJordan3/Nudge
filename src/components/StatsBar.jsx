const STATUS_KEYS = ["todo", "inprogress", "blocked", "done"]

const LABELS = {
  todo: "Not started",
  inprogress: "In progress",
  blocked: "Blocked",
  done: "Completed",
}

export function StatsBar({ tasks }) {
  const counts = STATUS_KEYS.reduce((acc, key) => {
    acc[key] = tasks.filter((t) => t.status === key).length
    return acc
  }, {})

  return (
    <div className="grid grid-cols-4 gap-2 border-b border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-900/50 sm:gap-3 sm:px-6">
      {STATUS_KEYS.map((key) => (
        <div
          key={key}
          className="min-w-0 rounded-lg bg-gray-100 px-2 py-2 sm:px-4 sm:py-3 dark:bg-gray-800/80"
        >
          <p className="text-[10px] font-medium uppercase leading-tight tracking-wide text-gray-500 sm:text-xs dark:text-gray-400">
            {LABELS[key]}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {counts[key]}
          </p>
        </div>
      ))}
    </div>
  )
}
