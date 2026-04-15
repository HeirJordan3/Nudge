import { useMemo, useState } from "react"
import { Board } from "./components/Board.jsx"
import { Header } from "./components/Header.jsx"
import { StatsBar } from "./components/StatsBar.jsx"
import { TaskModal } from "./components/TaskModal.jsx"
import { TeamModal } from "./components/TeamModal.jsx"
import { useTasks } from "./hooks/useTasks.js"
import { useTeam } from "./hooks/useTeam.js"

export default function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const { team, addMember, removeMember } = useTeam()

  const [teamModalOpen, setTeamModalOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const teamById = useMemo(() => {
    return team.reduce((acc, m) => {
      acc[m.id] = m
      return acc
    }, {})
  }, [team])

  const openNewTask = () => {
    setEditingTask(null)
    setTaskModalOpen(true)
  }

  const openEditTask = (task) => {
    setEditingTask(task)
    setTaskModalOpen(true)
  }

  const closeTaskModal = () => {
    setTaskModalOpen(false)
    setEditingTask(null)
  }

  const handleSaveTask = (payload) => {
    if (payload.id) {
      const { id, ...rest } = payload
      updateTask(id, rest)
    } else {
      addTask(payload)
    }
  }

  const handleDeleteTaskFromBoard = (id) => {
    deleteTask(id)
  }

  const handleRemoveTeamMember = (id) => {
    removeMember(id, (memberId) => {
      tasks.forEach((t) => {
        const assignees = t.assignees ?? []
        if (assignees.includes(memberId)) {
          updateTask(t.id, {
            assignees: assignees.filter((a) => a !== memberId),
          })
        }
      })
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header
        onManageTeam={() => setTeamModalOpen(true)}
        onNewTask={openNewTask}
      />
      <StatsBar tasks={tasks} />
      <Board
        tasks={tasks}
        teamById={teamById}
        onEditTask={openEditTask}
        onDeleteTask={handleDeleteTaskFromBoard}
      />

      <TaskModal
        open={taskModalOpen}
        task={editingTask}
        team={team}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
        onDelete={deleteTask}
      />

      <TeamModal
        open={teamModalOpen}
        team={team}
        onClose={() => setTeamModalOpen(false)}
        onAddMember={(name, role) => addMember(name, role)}
        onRemoveMember={handleRemoveTeamMember}
      />
    </div>
  )
}
