# Bingo Generator - Development Guide for Agentic Coding Agents

This document provides essential information for agentic coding agents working on the Bingo Generator React application.

## Important: Follow Directions Exactly

**CRITICAL**: Always follow the user's directions exactly and do not add anything extra beyond what is specifically requested. Do not add explanations, summaries, or additional features unless explicitly asked.

## Project Overview

This is a React 19 + TypeScript + Vite application that generates customizable bingo boards. Users can input words, customize styling (colors, borders, fonts), and generate/print 5x5 bingo boards with a FREE center space.

## Build, Lint, and Development Commands

### Essential Commands
- **Development server**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (TypeScript compilation + Vite bundling)  
- **Type checking**: `tsc --noEmit` or `npx tsc --noEmit` (type check without emitting files)
- **Linting**: `npm run lint` (ESLint for TS/TSX files)
- **Preview build**: `npm run preview` (preview production build locally)

### Testing
- **No test framework configured** - Project currently has no test setup
- To add testing: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- Configure Vitest in `vite.config.ts` and add test script to package.json
- When implementing tests, use `*.test.tsx` or `*.spec.tsx` naming convention
- Run single test: `npx vitest run path/to/test.test.tsx` (once Vitest is configured)

## Code Style Guidelines

### Project Structure
- **Framework**: React 19 with TypeScript 5.x
- **Bundler**: Vite with @vitejs/plugin-react
- **Module system**: ES modules (`"type": "module"` in package.json)
- **Source layout**: 
  - `src/components/` - React components
  - `src/constants/types/` - TypeScript type definitions
  - `src/assets/` - Static assets
  - Component-specific CSS co-located with components

### Import Conventions
```typescript
// React imports
import { useState, useEffect } from 'react';
import type { FC } from 'react';

// Component imports (use .tsx extension explicitly)
import Cell from "./components/Cell/Cell.tsx";
import type { Settings } from "../../constants/types/settings";

// CSS imports (component-specific)
import "./Cell.css";

// Global CSS
import './App.css';
import './index.css';
```

**File Extensions**: Always use explicit file extensions (.tsx, .ts) for imports to follow TypeScript strict module resolution.

### Naming Conventions
- **Files**: PascalCase for components (e.g., `Cell.tsx`), kebab-case for utilities
- **Components**: PascalCase with explicit `React.FC` or implicit function declarations
- **Props interfaces**: PascalCase with "Props" suffix (e.g., `CellProps`)
- **Variables/Functions**: camelCase (e.g., `updateBoard`, `generateBoard`)
- **Constants**: UPPER_SNAKE_CASE for exported constants
- **CSS classes**: kebab-case (e.g., `control_panel`, `generate_button`)

### TypeScript Patterns
- **Strict mode enabled**: All TypeScript strict checks enabled
- **Type definitions**: Use `interface` for object shapes, `type` for primitives/unions
- **Props typing**: Define interfaces for component props
```typescript
interface Settings {
  border_thickness: number;
  border_color: string;
  text_color: string;
  heading: string;
  background_color: string;
  cell_color: string;
}

interface CellProps {
  content: string;
  settings: Settings;
}
```

### React Component Patterns
- **Functional components**: Use function declarations or arrow functions with `React.FC`
- **State management**: `useState` hooks with descriptive naming (e.g., `updateBoard` for setter)
- **Event handlers**: Inline arrow functions in JSX for simple cases, named functions for complex logic
- **Conditional rendering**: Use ternary operators and logical ANDs
```typescript
const Cell: React.FC<CellProps> = ({ content, settings }) => {
  const styles = {
    borderWidth: `${settings.border_thickness}px`,
    // ... other styles
  };

  return (
    <div style={styles} className="cell">
      {content === "FREE" ? 
        <strong>{content}</strong> : 
        <p>{content}</p>
      }
    </div>
  );
};
```

### CSS Styling Approach
- **Component-specific CSS**: Each component has its own `.css` file
- **Global styles**: `App.css` and `index.css` for app-wide styling
- **Inline styles**: Used for dynamic styling based on state/props
- **Class naming**: kebab-case with component prefixes where appropriate
- **Print styling**: The app supports printing (`window.print()`)

### State Management Patterns
- **Local state**: Use `useState` for component-local state
- **State updates**: Prefer functional updates for complex state changes
```typescript
updateSettings(prev => ({
  ...prev,
  border_color: e.target.value
}))
```

### Error Handling
- **Input validation**: Client-side validation with user-friendly alerts
- **Graceful degradation**: Conditional rendering for empty states
- **Console logging**: Use for development debugging (avoid in production)

### ESLint Configuration
- **Flat config**: Using modern ESLint flat configuration
- **TypeScript**: tseslint for TypeScript-specific rules
- **React**: react-hooks and react-refresh plugins
- **Files covered**: `**/*.{ts,tsx}`
- **Ignored**: `dist/` directory

## Development Workflow

1. **Setup**: Run `npm install` to install dependencies
2. **Development**: `npm run dev` for hot reload development server
3. **Type Check**: `npx tsc --noEmit` to verify types before commits
4. **Lint**: `npm run lint` to check code style and potential issues
5. **Build**: `npm run build` to create production bundle

## Component Architecture

### Core Components
- **App.tsx**: Main application with control panel and board display
- **Cell.tsx**: Individual bingo cell with dynamic styling

### Data Flow
- **App state**: Board data, words list, separator, settings
- **Settings propagation**: Settings object passed down to Cell components
- **Board generation**: Words scrambled, divided into 5x5 grid with FREE center

## Browser Compatibility

- **Target**: Modern browsers supporting ES2022
- **Features**: Uses modern JavaScript (optional chaining, nullish coalescing)
- **React**: React 19 features compatible with modern browsers

## Development Notes

- **Vite aliases**: None configured, use relative imports
- **Environment**: Development server configured for local/network access
- **Print support**: Application designed to print bingo boards effectively
- **Performance**: No external dependencies beyond React ecosystem

## Testing Considerations

Since no testing framework is currently configured:
- Consider adding Vitest for unit tests
- Use React Testing Library for component testing
- Test board generation logic separately from UI
- Test styling changes and print functionality