# Nudge

**Tagline:** Small pushes. Big progress.

Nudge is a lightweight team task manager with a kanban board, task details, and team management. Data is stored in your browser (`localStorage`).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Features

- Kanban board with four statuses: Not started, In progress, Blocked, and Completed
- Task cards with assignee avatars, priority, due dates (with overdue / due-today styling), edit, and delete
- Create and edit tasks in a modal (title, status, priority, optional due date, assignees)
- Team modal to add or remove members (you cannot remove “Me”); removing someone clears them from all task assignees
- Summary stats row for counts per status
- Light / dark mode with a sun–moon toggle (saved in `localStorage` as `nudge_theme`)
# Nudge
