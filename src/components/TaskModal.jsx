import { useEffect, useState } from "react"
import { avatarColorClasses } from "../utils/avatarColors.js"
import { initials } from "../utils/initials.js"

const STATUSES = [
  { value: "todo", label: "Not started" },
  { value: "inprogress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Completed" },
]

const PRIORITIES = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

export function TaskModal({
  open,
  task,
  team,
  onClose,
  onSave,
  onDelete,
}) {
  const isEdit = Boolean(task)
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("todo")
  const [priority, setPriority] = useState("medium")
  const [due, setDue] = useState("")
  const [assignees, setAssignees] = useState([])

  useEffect(() => {
    if (!open) return
    if (task) {
      setTitle(task.title ?? "")
      setStatus(task.status ?? "todo")
      setPriority(task.priority ?? "medium")
      setDue(task.due ?? "")
      setAssignees([...(task.assignees ?? [])])
    } else {
      setTitle("")
      setStatus("todo")
      setPriority("medium")
      setDue("")
      setAssignees([])
    }
  }, [open, task])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const toggleAssignee = (id) => {
    setAssignees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onSave({
      ...(task ? { id: task.id } : {}),
      title: trimmed,
      status,
      priority,
      due: due.trim(),
      assignees,
    })
    onClose()
  }

  const handleDelete = () => {
    if (!task) return
    if (window.confirm("Delete this task?")) {
      onDelete(task.id)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white dark:bg-gray-950"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4 p-6">
          <h2
            id="task-modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            {isEdit ? "Edit task" : "New task"}
          </h2>

          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="task-priority"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Due date
            </label>
            <input
              id="task-due"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Assignees
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {team.map((m) => {
                const selected = assignees.includes(m.id)
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleAssignee(m.id)}
                    className={`flex items-center gap-2 rounded-full border px-2 py-1 text-sm font-medium transition-colors ${
                      selected
                        ? "border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${avatarColorClasses(m.colorIndex)}`}
                    >
                      {initials(m.name)}
                    </span>
                    {m.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex justify-start">
              {isEdit && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete task
                </button>
              )}
            </div>
            <div className="flex justify-end gap-2 sm:ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
