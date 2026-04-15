import { ThemeToggle } from "./ThemeToggle.jsx"

export function Header({ onManageTeam, onNewTask }) {
  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Nudge
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Small pushes. Big progress.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <ThemeToggle />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onManageTeam}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Manage team
          </button>
          <button
            type="button"
            onClick={onNewTask}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            + New task
          </button>
        </div>
      </div>
    </header>
  )
}
