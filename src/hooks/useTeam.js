import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "nudge_team"

const SEED_TEAM = [
  { id: "1", name: "Me", role: "You", colorIndex: 0 },
  { id: "2", name: "Alex", role: "Designer", colorIndex: 1 },
  { id: "3", name: "Jordan", role: "Engineer", colorIndex: 2 },
  { id: "4", name: "Sam", role: "Product", colorIndex: 3 },
]

function loadTeam() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_TEAM
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    /* ignore */
  }
  return SEED_TEAM
}

export function useTeam() {
  const [team, setTeam] = useState(loadTeam)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
    } catch {
      /* ignore */
    }
  }, [team])

  const addMember = useCallback((name, role) => {
    const trimmedName = name?.trim()
    if (!trimmedName) return
    setTeam((prev) => {
      const colorIndex = prev.length % 8
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: trimmedName,
          role: (role ?? "").trim() || "Member",
          colorIndex,
        },
      ]
    })
  }, [])

  const removeMember = useCallback((id, onRemoved) => {
    if (id === "1") return
    setTeam((prev) => prev.filter((m) => m.id !== id))
    onRemoved?.(id)
  }, [])

  return { team, addMember, removeMember }
}
