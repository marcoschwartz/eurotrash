# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Build: `npm run build` or `yarn build` (Next.js projects), `bun build` (Bun projects)
- Dev: `npm run dev` or `yarn dev` (Next.js projects), `bun dev` (Bun projects)
- Lint: `npm run lint` or `yarn lint`
- Test: `bun test` or `bun test tests/filename.test.js` for a single test

## Code Style Guidelines
- **TypeScript**: Use strict mode, proper typing for all variables, parameters, and return types
- **Formatting**: Consistent indentation with 2 spaces
- **Imports**: Group imports (React/Next, external libraries, internal modules), sort alphabetically
- **Naming**: camelCase for variables/functions, PascalCase for components/classes/interfaces, UPPER_CASE for constants
- **Error Handling**: Use try/catch blocks with proper error logging
- **Component Structure**: Functional components with hooks, prefer composition over inheritance
- **File Organization**: Group related files in directories, use index.js for exports
- **Path Aliases**: Use @/components, @/utils as configured in tsconfig.json

## Best Practices
- Use ESNext features when available
- Prefer async/await over promises
- Follow React best practices (useMemo, useCallback when needed)
- Keep components small and focused on a single responsibility
- Document function parameters and return types
- Handle errors gracefully with consistent error objects
- Use server actions for data operations in Next.js projects