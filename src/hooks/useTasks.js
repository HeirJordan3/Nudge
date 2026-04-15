import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "nudge_tasks"

const SEED_TASKS = [
  {
    id: "t1",
    title: "Set up project repo",
    assignees: ["1"],
    status: "done",
    priority: "high",
    due: "2025-04-10",
  },
  {
    id: "t2",
    title: "Design wireframes",
    assignees: ["2", "3"],
    status: "inprogress",
    priority: "high",
    due: "2025-04-20",
  },
  {
    id: "t3",
    title: "Write API docs",
    assignees: ["3"],
    status: "todo",
    priority: "medium",
    due: "2025-05-01",
  },
  {
    id: "t4",
    title: "Fix login bug",
    assignees: ["1"],
    status: "blocked",
    priority: "high",
    due: "2025-04-16",
  },
  {
    id: "t5",
    title: "User testing session",
    assignees: ["4", "1"],
    status: "todo",
    priority: "low",
    due: "",
  },
]

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_TASKS
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {
    /* ignore */
  }
  return SEED_TASKS
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      /* ignore */
    }
  }, [tasks])

  const addTask = useCallback((task) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: task.title,
        status: task.status,
        priority: task.priority,
        due: task.due ?? "",
        assignees: Array.isArray(task.assignees) ? task.assignees : [],
      },
    ])
  }, [])

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, addTask, updateTask, deleteTask }
}
