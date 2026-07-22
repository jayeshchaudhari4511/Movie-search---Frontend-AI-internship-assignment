# [GetMovies](https://github.com/jayeshchaudhari4511/Movie-search---Frontend-AI-internship-assignment.git)

A React-based movie search application featuring authentication and responsive design.

## Features
- **Movie Search:** Browse and search for movies.
- **User Authentication:** Secure signup, login, and logout functionalities powered by Firebase.
- **Protected Routes:** Dashboard and specific routes restricted to authenticated users.
- **Theming:** Light and dark mode support.
- **Responsive Design:** Optimized for mobile and desktop screens.

## Tech Stack
- **Frontend Framework:** React 19, TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Authentication:** Firebase
- **Data Fetching:** Axios
- **Styling:** CSS Modules / Vanilla CSS

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jayeshchaudhari4511/Movie-search---Frontend-AI-internship-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Movie-search---Frontend-AI-internship-assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Environment Variables:
   - Create a `.env` file in the root directory based on `.env.example` and provide your Firebase configuration keys and API credentials.

## How to Run
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## Screenshots
*(Add screenshots of the Home, Login, and Dashboard pages here)*

## Folder Structure
```text
src/
├── api/             # API configuration and service calls
├── assets/          # Static assets like images and icons
├── components/      # Reusable UI components (e.g., Navbar, MovieCard)
├── context/         # React Contexts for global state (AuthContext, ThemeContext)
├── firebase/        # Firebase initialization and configuration
├── hooks/           # Custom React hooks (e.g., useMovieSearch)
├── pages/           # Page components (Home, Movies, Login, Dashboard)
├── router/          # App routing definitions (AppRouter, ProtectedRoute)
├── types/           # Global TypeScript interfaces and types
├── utils/           # Helper functions
├── App.tsx          # Root application component
└── main.tsx         # Application entry point
```

## AI Usage Summary
- **Scaffolding:** Rapidly generated boilerplate code for Context APIs (Auth and Theme) and Firebase integration.
- **Authentication:** Guided the setup for Firebase Email/Password auth and the implementation of protected routes.
- **Debugging:** Assisted in resolving TypeScript module resolution errors and correcting import paths.
- **Refactoring:** Executed targeted UI updates (like app renaming) securely across multiple files without breaking existing logic or layout.

## Manual Improvements

Examples of manual improvements, corrections, or refactoring performed after reviewing AI-generated code.

- **AI generated repetitive API calls inside multiple components.**
  - I created a reusable API service instead.
- **AI generated inline styles.**
  - I replaced them with reusable Tailwind utility classes.
- **AI used `any` types.**
  - I replaced them with proper TypeScript interfaces.
- **AI generated a large component.**
  - I separated it into:
    - SearchBar
    - MovieCard
    - MovieGrid
- **AI forgot loading and empty states.**
  - I implemented:
    - Spinner
    - No Results message
    - Error UI
