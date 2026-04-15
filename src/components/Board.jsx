import { Column } from "./Column.jsx"

export const BOARD_COLUMNS = [
  { key: "todo", label: "Not started", dotClass: "bg-gray-400" },
  { key: "inprogress", label: "In progress", dotClass: "bg-blue-500" },
  { key: "blocked", label: "Blocked", dotClass: "bg-red-500" },
  { key: "done", label: "Completed", dotClass: "bg-emerald-500" },
]

export function Board({ tasks, teamById, onEditTask, onDeleteTask }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-3 overflow-hidden px-4 pb-6 sm:grid-cols-4 sm:px-6">
      {BOARD_COLUMNS.map((col) => (
        <Column
          key={col.key}
          label={col.label}
          dotClass={col.dotClass}
          tasks={tasks.filter((t) => t.status === col.key)}
          teamById={teamById}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}
