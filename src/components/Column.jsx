import { TaskCard } from "./TaskCard.jsx"

export function Column({
  label,
  dotClass,
  tasks,
  teamById,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <section className="flex min-h-0 flex-col rounded-lg bg-gray-100 dark:bg-gray-900/60">
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-gray-800">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`}
          aria-hidden
        />
        <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
          {label}
        </h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            teamById={teamById}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    </section>
  )
}
