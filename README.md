<<<<<<< HEAD
# PlanFlow — Modern Agile Project Management Utility

> A clean, responsive, beginner-friendly web application for managing agile sprints, task workflows, milestones, and team deliverables without enterprise clutter.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

---

## 🎯 Purpose & Problem Solved

Traditional project management tools are often over-engineered, slow to load, bloated with confusing enterprise menus, or require mandatory paid accounts just to track a team's deliverables.

**PlanFlow** provides a lightweight, highly responsive, zero-configuration utility that:
1. **Eliminates Setup Friction**: Works instantly in the browser with `localStorage` persistence — no database or account registration required.
2. **Combines Multiple Agile Views**: Smoothly switch between an interactive **Kanban Board**, a searchable **List Table**, a **Milestones & Sprints Roadmap**, and an automated **Analytics Dashboard**.
3. **Streamlines Daily Standups**: Generates pre-formatted Markdown summaries with one click for sharing into Slack, Microsoft Teams, or Discord.
4. **Guarantees Data Portability**: Export anytime to clean CSV (for spreadsheets) or full JSON backup/restore files.

---

## ✨ Features

### 1. Interactive Kanban Board & List Views
- **5-Stage Workflow Pipeline**: Backlog → To Do → In Progress → In Review → Done.
- **Drag-and-Drop & One-Click Status Shifts**: Move tasks freely between columns with instant visual feedback and celebration confetti upon completion.
- **Task Inspection Drawer**: Inspect acceptance criteria, track subtask progress bars, and log work hours directly (+0.5h, +1.0h quick buttons).

### 2. Multi-Criteria Filtering & Sorting
- Real-time instant search across task title, description, ID, tags, and assignee name.
- Filter independently or simultaneously by **Status**, **Priority** (Urgent, High, Medium, Low), **Milestone**, and **Tags**.
- Sort deliverables by **Due Date**, **Priority**, **Title (A-Z)**, **Estimated Hours**, or **Creation Date** in ascending/descending order.

### 3. Milestone & Sprint Tracking
- Group deliverables into distinct sprints or project iterations.
- Real-time progress bars calculating % completion and deliverable ratios.
- Track milestone deadlines, estimated vs. logged hours, and filter the board to any milestone with a single click.

### 4. Comprehensive Metrics & Analytics
- **Live KPI Counters**: Overall completion rate %, active workload, hours burned vs. estimated, and overdue alert counts.
- **Workflow Distribution & Priority Matrices**: Visual progress gauges showing load balancing across development stages.
- **Team Workload Breakdown**: Task distribution and logged hours per team member.
- **Overdue Attention Watchlist**: Highlighted urgent items past due date with direct jump to resolve.

### 5. Data Safety & Export Capabilities
- **Export to CSV**: Clean, sanitized, quote-escaped CSV compatible with Excel, Numbers, and Google Sheets.
- **Full JSON Backup & Restore**: Download full state as `.json` and restore anytime with robust structural schema validation.
- **Copy Standup Summary**: Instant copy-to-clipboard markdown summary ready for asynchronous standup check-ins.
- **Demo Reset & Data Clearing**: Includes realistic SaaS sample data, with one-click "Reset to Sample Data" or "Clear All Data" with safety confirmation modals.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (verified on Node v24.x)
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### 1. Installation
Clone the repository and install all dependencies:
```bash
# Clone the repository
git clone https://github.com/your-username/planflow.git

# Navigate into project directory
cd planflow

# Install dependencies
npm install
```

### 2. Development Mode
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Running Automated Tests
Run the Vitest test suite verifying filtering, sorting, export sanitization, and UI components:
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### 4. Production Build
Compile TypeScript and bundle optimized static assets:
```bash
npm run build
```
The output will be placed in the `dist/` directory ready for deployment on Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

### 5. Preview Production Build
Preview the generated production build locally:
```bash
npm run preview
```

---

## 🖥️ Screenshots & Visual Hierarchy Guidance

When generating visual documentation or repository previews, capture the following 4 core views:

1. **Kanban Board (`/`)**: Shows the 5 stage columns with color badges, assignee avatars, subtask checklist bars, and the top filter toolbar.
2. **List Table View**: Demonstrates tabular overview with inline stage selectors, due date badges, and quick action buttons.
3. **Milestones Roadmap**: Displays sprint cards with delivery date targets, completion percentage bars, and hour comparisons.
4. **Analytics Dashboard**: Highlights the top KPI metrics cards, workflow distribution bars, and the overdue attention card.

*Recommended screenshot placement:* Create a `docs/screenshots/` folder in the repository and link images using Markdown:
```markdown
![PlanFlow Kanban Board](docs/screenshots/kanban-view.png)
```

---

## 🏗️ Architecture & Project Structure

```
project1/
├── public/
│   └── favicon.svg              # Brand SVG icon
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI primitives
│   │   │   ├── Badge.tsx        # Status & priority badges
│   │   │   ├── Button.tsx       # Button with variants & loading state
│   │   │   ├── ConfirmDialog.tsx# Destructive action confirmations
│   │   │   ├── EmptyState.tsx   # Clean empty state illustrations
│   │   │   ├── Modal.tsx        # Accessible dialog wrapper
│   │   │   └── Toast.tsx        # Floating notification stack
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Top brand header & data tools
│   │   │   └── Sidebar.tsx      # Quick filters & sprint navigation
│   │   ├── tasks/
│   │   │   ├── TaskCard.tsx     # Rich task card with subtasks & time
│   │   │   ├── TaskDetailModal.tsx # Full inspection & time logging modal
│   │   │   ├── TaskFilterBar.tsx# Search, multi-filter & sorting bar
│   │   │   ├── TaskKanban.tsx   # Drag & drop 5-column Kanban board
│   │   │   ├── TaskListView.tsx # SaaS table view with inline actions
│   │   │   └── TaskModal.tsx    # Create & edit task with validation
│   │   ├── milestones/
│   │   │   └── MilestoneManager.tsx # Sprints & milestone deliverables
│   │   └── analytics/
│   │       └── AnalyticsView.tsx    # Live metric KPIs & workload charts
│   ├── hooks/
│   │   └── useLocalStorage.ts   # Safe type-safe persistent storage hook
│   ├── tests/
│   │   ├── components.test.tsx  # Vitest React Testing Library tests
│   │   ├── export.test.ts       # CSV & backup validation tests
│   │   └── filterSort.test.ts   # Search, filter, and sorting tests
│   ├── types/
│   │   └── index.ts             # TypeScript domain schemas & interfaces
│   ├── utils/
│   │   ├── constants.ts         # Color tokens, statuses, assignees, tags
│   │   ├── export.ts            # RFC 4180 CSV, JSON, Markdown export
│   │   ├── filterSort.ts        # Search & sorting business logic
│   │   └── sampleData.ts        # Rich demo project data
│   ├── App.tsx                  # Main application orchestrator
│   ├── index.css                # Tailwind CSS v4 directives
│   ├── main.tsx                 # React DOM mount point
│   └── setupTests.ts            # Jest-DOM matchers setup
├── .gitignore                   # Safe Git ignore configuration
├── package.json                 # Scripts and dependencies
├── tsconfig.json                # TypeScript root configuration
├── vite.config.ts               # Vite & Vitest configuration
└── README.md                    # Project documentation
```

---

## 🧪 Testing Suite Summary

PlanFlow is thoroughly tested with **Vitest** and **React Testing Library**:
- **`src/tests/filterSort.test.ts`**: Verifies text search matching (title, description, tags, assignee), status and priority filtering, custom multi-field sorting, overdue deadline detection, and checklist percentage math.
- **`src/tests/export.test.ts`**: Verifies RFC 4180 CSV generation, JSON schema backup validator, invalid file error handling, and daily standup Markdown formatter.
- **`src/tests/components.test.tsx`**: Verifies interactive component rendering, button states (disabled, loading, click handlers), Badge styling, EmptyState callbacks, and TaskCard drawer triggers.

---

## 🔮 Future Improvements Roadmap

- [ ] **Cloud Sync / Supabase Adapter**: Optional PostgreSQL / Supabase remote database synchronization.
- [ ] **Custom Column Workflows**: Allow users to create, rename, or reorder Kanban stages.
- [ ] **Gantt / Timeline View**: Interactive draggable timeline for sprint dependency mapping.
- [ ] **Markdown Rich-Text Editor**: In-place rich-text formatting for task descriptions and comments.
- [ ] **Keyboard Shortcuts**: Press `N` for new task, `/` for search, `K` for Kanban, `L` for List.

---

## 📄 License

MIT License — Feel free to use and modify for personal and commercial projects.
=======
# PlanFlow_PM_Tool
PlanFlow is a streamlined, client-side project management web application created to eliminate enterprise bloat, account setup friction, and slow load times. Built from scratch with React 19, TypeScript, Tailwind CSS v4, and Vite, it delivers a lightning-fast agile environment that runs directly in the browser with full local persistence.
>>>>>>> df7e7fb8f383f44e4be5e04ba9d2d9522fb26daa
