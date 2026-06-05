# Tree-Nation

A modern React 19 application that displays an infinite-scrolling feed of trees planted around the world. Built with Vite, TypeScript, TanStack Query, and TanStack Router.

## How to Run the Project

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

The app proxies API calls from `/api` to `https://youcannevertestenough.tree-nation.com` during development.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Tests
```bash
npm run test
```
Or in watch mode:
```bash
npm run test:watch
```

## App Structure

```
src/
├── app/
│   ├── providers.tsx          # QueryClient provider setup
│   └── router.tsx             # TanStack Router configuration
├── features/
│   └── feed/
│       ├── __tests__/
│       │   ├── components/
│       │   │   ├── ActivityItem.test.tsx
│       │   │   ├── ActivityList.test.tsx
│       │   │   ├── CommentActivity.test.tsx
│       │   │   ├── FeedList.test.tsx
│       │   │   ├── LikeActivity.test.tsx
│       │   │   └── TreeCard.test.tsx
│       │   └── utils/
│       │       └── activities.test.ts
│       ├── components/
│       │   ├── page/
│       │   │   └── FeedsList.tsx  # Infinite scroll container
│       │   └── ui/
│       │       ├── ActivityItem.tsx
│       │       ├── ActivityList.tsx
│       │       ├── CommentActivity.tsx
│       │       ├── FeedActionBanner.tsx
│       │       ├── FeedLoadingState.tsx
│       │       ├── FeedStatusCard.tsx
│       │       ├── LikeActivity.tsx
│       │       ├── LikeButton.tsx
│       │       ├── TreeCard.tsx
│       │       └── TreeImage.tsx
│       ├── queries/
│       │   ├── activityQueries.ts
│       │   ├── commentsQueries.ts
│       │   ├── feedQueries.ts
│       │   └── likesQueries.ts
│       ├── types.ts
│       ├── queryKeys.ts
│       └── utils/
│           └── activities.ts
├── routes/
│   └── feed.tsx
├── shared/
│   ├── api/
│   │   └── index.tsx
│   ├── components/
│   │   └── Avatar.tsx
│   ├── constants.ts
│   └── utils/
│       └── index.tsx
├── main.tsx
├── index.css
├── queryClient.ts
└── setupTests.ts
```

## API Endpoints

All endpoints are proxied through `/api` in development and point to `https://youcannevertestenough.tree-nation.com/` in production.

| Method | Endpoint | Purpose | Query Parameters |
|--------|----------|---------|------------------|
| GET | `/trees/feed` | Get paginated tree feed | `page`, `limit` (default: 10), `orderByField` (default: "score"), `sortDirection` (default: "DESC") |
| GET | `/tree/getComments/:treeId` | Get comments for a tree | None |
| GET | `/tree/getLikes/:treeId` | Get likes for a tree | None |

### Response Formats

**Feed Response** (`/trees/feed`):
```typescript
{
  data: Tree[],
  meta: {
    is_last_page: boolean
  }
}
```

**Comments/Likes Response** (`/tree/getComments/:treeId`, `/tree/getLikes/:treeId`):
```typescript
{
  data: Comment[] | Like[]
}
```

## Assumptions

1. **Infinite Scroll Feed**: Users can continuously scroll to load more trees. The feed fetches the next page automatically as the user approaches the bottom.
2. **Tree Card Interactions**: Each tree has expandable details showing comments and likes merged into a single list ordered by `created_at` (most recent first).
3. **Lazy Loading**: Comments and likes are only fetched when a tree card is expanded to minimize initial load time.
4. **Responsive Design**: The app works well on both mobile and desktop screens with a clean, usable UI.
5. **Caching**: TanStack Query caches tree feed, comments, and likes data for a better user experience and reduced API calls.
6. **State Management**: Loading, empty, and error states are explicitly handled for all API endpoints.
7. **API Integration**: Uses real public API endpoints without authentication. Auth-only behaviors (like `is_liked` flag) are ignored.
8. **Sorting**: Comments and likes are merged and sorted by `created_at` in descending order. Feed is sorted by `score` in descending order by default (no user-facing sort controls implemented).
9. **Architecture**: Uses feature-based directory structure with separate concerns for components, queries, types, and utilities.
10. **Data Fetching**: Uses TanStack Query for server state management with pagination and infinite scroll.
11. **Routing**: Uses TanStack Router for URL-based state management and navigation.
