import { avatarColorClasses } from "../utils/avatarColors.js"
import { dueMeta } from "../utils/dueMeta.js"
import { initials } from "../utils/initials.js"

const PRIORITY_CLASSES = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  low: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200",
}

const PRIORITY_LABEL = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

function PencilIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  )
}

export function TaskCard({ task, teamById, onEdit, onDelete }) {
  const meta = dueMeta(task.due)
  const overdue = meta?.isOverdue ?? false
  const priorityClass =
    PRIORITY_CLASSES[task.priority] ?? PRIORITY_CLASSES.medium

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm("Delete this task?")) onDelete()
  }

  const assigneeIds = task.assignees ?? []

  return (
    <article
      className={`relative rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-950 ${
        overdue ? "border-l-4 border-l-red-500 pl-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Edit task"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded p-1 text-lg leading-none text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-red-400"
            aria-label="Delete task"
          >
            ×
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {assigneeIds.length > 0 && (
          <div className="flex -space-x-2">
            {assigneeIds.map((id) => {
              const m = teamById[id]
              if (!m) return null
              return (
                <div
                  key={id}
                  title={m.name}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold dark:border-gray-950 ${avatarColorClasses(m.colorIndex)}`}
                >
                  {initials(m.name)}
                </div>
              )
            })}
          </div>
        )}
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${priorityClass}`}
        >
          {PRIORITY_LABEL[task.priority] ?? task.priority}
        </span>
        {meta && (
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${meta.tagClass}`}
          >
            {meta.label}
          </span>
        )}
      </div>
    </article>
  )
}
