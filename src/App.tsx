import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900">Tree-Nation</h1>
          <p className="mt-2 text-lg text-gray-600">
            Vite + React 19 + TypeScript + Tailwind CSS
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Stack Included</h2>
          <ul className="grid gap-2 text-gray-700 sm:grid-cols-2">
            <li>✅ React 19</li>
            <li>✅ TypeScript</li>
            <li>✅ Vite</li>
            <li>✅ Tailwind CSS</li>
            <li>✅ TanStack Query</li>
            <li>✅ TanStack Router (installed)</li>
            <li>✅ Zod</li>
            <li>✅ Axios</li>
            <li>✅ Intersection Observer Hook</li>
            <li>✅ Vitest + React Testing Library</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCount(count + 1)}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            Counter: {count}
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 font-bold text-gray-900">Dev Server</h3>
            <p className="text-sm text-gray-600">npm run dev</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 font-bold text-gray-900">Run Tests</h3>
            <p className="text-sm text-gray-600">npm run test</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 font-bold text-gray-900">Build</h3>
            <p className="text-sm text-gray-600">npm run build</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 font-bold text-gray-900">Preview</h3>
            <p className="text-sm text-gray-600">npm run preview</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
