import { useEffect, useState } from "react"
import { avatarColorClasses } from "../utils/avatarColors.js"
import { initials } from "../utils/initials.js"

export function TeamModal({ open, team, onClose, onAddMember, onRemoveMember }) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    if (!open) {
      setName("")
      setRole("")
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const handleAdd = (e) => {
    e.preventDefault()
    onAddMember(name, role)
    setName("")
    setRole("")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white dark:bg-gray-950"
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2
            id="team-modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Team
          </h2>
          <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
            {team.map((m) => {
              const isMe = m.id === "1"
              return (
                <li
                  key={m.id}
                  className="flex items-center gap-3 py-3 first:pt-0"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatarColorClasses(m.colorIndex)}`}
                  >
                    {initials(m.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900 dark:text-gray-100">
                      {m.name}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {m.role}
                    </p>
                  </div>
                  {!isMe && (
                    <button
                      type="button"
                      onClick={() => onRemoveMember(m.id)}
                      className="rounded p-2 text-lg leading-none text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800 dark:hover:text-red-400"
                      aria-label={`Remove ${m.name}`}
                    >
                      ×
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <form
            onSubmit={handleAdd}
            className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800"
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add member
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </form>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
