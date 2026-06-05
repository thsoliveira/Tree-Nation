import { z } from 'zod'

// User object schema (for owner, planter, sponsor)
export const UserSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string().nullable(),
  profile_img: z.string().url(),
  locale: z.string(),
  slug: z.string(),
  type: z.string(), // 'citizen', etc
  status: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

// Main Tree schema matching the actual API response
export const TreeSchema = z.object({
  id: z.number(),
  parent_id: z.number().nullable(),
  owner_id: z.number(),
  planter_id: z.number(),
  sponsor_id: z.number().nullable(),
  quantity: z.number(),
  type: z.string(), // 'success_seed', 'tree', etc
  message: z.string().nullable(),
  image: z.string().url().nullable(),
  video: z.string().nullable(),
  drops_count: z.number(),
  likes_count: z.number(),
  is_pinned: z.boolean(),
  comments_count: z.number(),
  hash_token: z.string().nullable(),
  hashtag: z.string().nullable(),
  is_collected: z.boolean(),
  hide_gift_wrapper: z.boolean(),
  seed_deadline: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  score: z.number(),
  replanters_num: z.number(),
  replanters_distinct_num: z.number(),
  num_replants: z.number(),
  replant_header: z.array(z.unknown()),
  species: z.string().nullable(),
  birth_date: z.string().datetime().nullable(),
  is_liked: z.boolean().nullable(),
  is_watered: z.boolean().nullable(),
  recipient_id: z.number().nullable(),
  recipient_full_name: z.string().nullable(),
  owner: UserSchema,
  planter: UserSchema,
  sponsor: UserSchema.nullable(),
  is_anonymous: z.boolean(),
  can_be_replanted: z.boolean(),
})

export type Tree = z.infer<typeof TreeSchema>

// Feed response with meta information
export const TreeFeedResponseSchema = z.object({
  data: z.array(TreeSchema),
  meta: z.object({
    is_last_page: z.boolean(),
  }),
})

export type TreeFeedResponse = z.infer<typeof TreeFeedResponseSchema>

// Query parameters
export type TreeType = 'success_seed' | 'tree'
export type OrderByField = 'score' | 'birth_date'
export type SortDirection = 'ASC' | 'DESC'

