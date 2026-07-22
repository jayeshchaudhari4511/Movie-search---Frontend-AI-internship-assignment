# Project Context & Architecture Guidelines

This document provides a comprehensive overview of the React + TypeScript + Vite project structure, configuration, and architectural choices, enabling other agents or developers to seamlessly onboard and contribute.

---

## 📁 Folder Structure Map

```
src/
├── api/
│   ├── axiosInstance.ts       # Axios client with request/response interceptors & auth headers
│   └── userService.ts         # Typed CRUD service using axiosInstance for user resource
│
├── components/
│   ├── common/
│   │   ├── ProtectedRoute.tsx # Route guard wrapper redirecting unauthenticated users to /login
│   │   └── PublicRoute.tsx    # Route guard wrapper redirecting authenticated users to /dashboard
│   ├── layout/
│   │   ├── Navbar/            # Navigation component with active route indicators & auth actions
│   │   │   ├── Navbar.tsx
│   │   │   ├── Navbar.module.css
│   │   │   └── index.ts
│   │   ├── MainLayout.tsx     # Shell layout rendering Navbar and an <Outlet /> for sub-pages
│   │   └── MainLayout.module.css
│   └── ui/
│       ├── Button/            # Modular Button (variants: primary/secondary/danger/ghost, loading state)
│       ├── Card/              # Card container with optional header, body, footer, and hover effects
│       ├── Input/             # Accessible Input element supporting label, error, and helper texts
│       └── index.ts           # Central barrel export: import { Button, Card, Input } from "@/components/ui"
│
├── context/
│   ├── AuthContext.tsx        # Firebase auth wrapper managing login/register/logout & currentUser states
│   └── ThemeContext.tsx       # UI light/dark state synced with localStorage and a data-theme attribute
│
├── firebase/
│   └── firebaseConfig.ts      # Firebase App initialization & SDK service exports (auth, db, storage)
│
├── hooks/
│   ├── useFetch.ts            # Generic async fetcher hook returning { data, loading, error, refetch }
│   ├── useLocalStorage.ts     # Synced localStorage read/write hook
│   └── useDebounce.ts         # Performance helper to delay function execution
│
├── pages/
│   ├── Home/                  # Public introduction/landing page
│   ├── Login/                 # Authentication page (form for signing in)
│   ├── Register/              # Registration page (form for creating a new account)
│   └── Dashboard/             # Private statistics & panel page (requires authentication)
│
├── router/
│   └── AppRouter.tsx          # React Router createBrowserRouter layout with lazy loading & Suspense
│
├── types/
│   └── index.ts               # Core global TypeScript type definitions (User, ApiResponse, etc.)
│
├── utils/
│   ├── helpers.ts             # Utility formatting helpers (dates, truncation, capitalized strings)
│   └── authErrors.ts          # Maps Firebase Auth error codes to user-friendly error messages
│
├── App.tsx                    # Top-level component mounting Context Providers and AppRouter
└── main.tsx                   # React app entry point mounting to the HTML root
```

---

## ⚙️ Configuration & Tooling

### Path Aliases (`@/`)
We use path aliases to clean up import statements and avoid nested relative import hell (e.g. `../../../components`). 
* **Vite Config (`vite.config.ts`)**: Resolves `@/*` to `src/*`.
* **TypeScript Config (`tsconfig.app.json`)**: Configured via `paths` to match. 
* *Example Import:* `import { Button } from "@/components/ui";`

### TypeScript Strict Mode & `verbatimModuleSyntax`
Our TypeScript compiler has `verbatimModuleSyntax` enabled. This requires explicit type-only imports:
* **Rule:** If you are importing a type, type interface, or type class that does not exist at runtime, use the `import type` keyword.
* *Correct:* `import type { ReactNode } from "react";`
* *Incorrect:* `import { ReactNode } from "react";`

---

## 🎨 Design Decisions & Styling System

1. **Scoped Styles (CSS Modules)**
   * Every component has a dedicated `.module.css` file next to it.
   * This guarantees class name isolation and local scoping, preventing global styling contamination.
   * Classes are referenced via the `styles` object: `className={styles.myClass}`.

2. **Component Isolation**
   * Keep UI primitives (like buttons, cards, and inputs) simple, configurable, and completely decoupled from business/api logic.
   * Composed layouts/pages handle page logic and call these modular primitives.

3. **Context Providers**
   * Contexts are composed in `App.tsx` surrounding the `AppRouter`.
   * `AuthContext` checks current authentication state via Firebase's `onAuthStateChanged` and delays child component rendering until the loading state is resolved. This prevents visual flashes of unauthenticated content.

---

## 🚀 How to Run & Work

### 1. Environment Setup
Create a `.env` file at the root level using the `.env.example` template:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Install & Start
```bash
# Install dependencies
npm install

# Run the local development server (Vite)
npm run dev

# Run TypeScript checking and production build
npm run build
```

---

## ➕ Guides for Extensions

### Adding a New Page
1. Create a subfolder under `src/pages/` (e.g., `src/pages/Profile`).
2. Add your component file `Profile.tsx`, styles `Profile.module.css`, and a barrel `index.ts`.
3. Reference and lazy load the page in `src/router/AppRouter.tsx`.
4. Decide if it should be public or nested under the `ProtectedRoute` route.

### Creating an API Endpoint
1. Create a service file under `src/api/` (e.g., `src/api/postService.ts`).
2. Import `axiosInstance` from `@/api/axiosInstance`.
3. Export async service functions with clean, explicit TypeScript parameter and return types.
