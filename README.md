# Tree-Nation

Clean Vite + React 19 scaffold with a modern TypeScript stack.

## Stack Included

- **React 19** — Latest React with concurrent features
- **TypeScript** — Full type safety
- **Vite** — Lightning-fast dev server and build tool
- **Tailwind CSS** — Utility-first CSS framework
- **@tanstack/react-query** — Server state management (installed)
- **@tanstack/router** — Client-side routing (installed, ready to wire)
- **Zod** — TypeScript-first schema validation
- **Axios** — HTTP client
- **Intersection Observer Hook** — `src/hooks/useIntersectionObserver.ts`
- **Vitest** — Fast unit testing framework
- **React Testing Library** — React component testing utilities

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Tests
```bash
npm run test          # Run tests once
npm run test:watch    # Watch mode
npm run test:ui       # UI dashboard
npm run test:coverage # Coverage report
```

### Build & Preview
```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## File Structure

```
src/
├── App.tsx               # Root component
├── main.tsx             # App entry point
├── index.css            # Tailwind directives + styles
├── App.test.tsx         # Example test
├── setupTests.ts        # Vitest + Testing Library setup
├── queryClient.ts       # TanStack Query client
├── api/
│   └── axios.ts         # Axios instance
├── hooks/
│   └── useIntersectionObserver.ts
└── schemas/
    └── example.ts       # Zod schema example
```

## Next Steps

- **Add TanStack Router**: Wire up `src/routes.tsx` with `RouterProvider` for SPA navigation
- **Add TanStack Query**: Use `useQuery` hooks with the configured `queryClient`
- **Build Pages**: Create feature-specific pages and components with Tailwind styling
- **Write Tests**: Add more tests using Vitest + React Testing Library

## Notes

- All packages are installed and ready to use
- Tailwind CSS is pre-configured with PostCSS
- ESLint is set up with React and TypeScript rules
- vitest globals are enabled in `tsconfig.app.json` for test file convenience

