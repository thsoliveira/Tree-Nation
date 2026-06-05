import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  full_name: z.string().nullable().optional(),
  profile_img: z.string().nullable().optional(),
  locale: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  follows: z.boolean().nullable().optional(),
})

export const TreeSchema = z.object({
  id: z.number(),
  parent_id: z.number().nullable().optional(),
  owner_id: z.number(),
  planter_id: z.number(),
  sponsor_id: z.number().nullable().optional(),
  quantity: z.number(),
  type: z.string(),
  message: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
  drops_count: z.number(),
  likes_count: z.number(),
  is_pinned: z.boolean(),
  comments_count: z.number(),
  hash_token: z.string(),
  hashtag: z.string().nullable().optional(),
  is_collected: z.boolean(),
  hide_gift_wrapper: z.boolean(),
  seed_deadline: z.string().nullable().optional(),
  created_at: z.string(),
  score: z.number(),
  replanters_num: z.number(),
  replanters_distinct_num: z.number(),
  num_replants: z.number(),
  replant_header: z.any(),
  species: z.string().nullable().optional(),
  birth_date: z.string(),
  is_liked: z.any().nullable().optional(),
  is_watered: z.any().nullable().optional(),
  recipient_id: z.number().nullable().optional(),
  recipient_full_name: z.string().nullable().optional(),
  owner: UserSchema,
  planter: UserSchema,
  sponsor: UserSchema.nullable().optional(),
  is_anonymous: z.boolean(),
  can_be_replanted: z.boolean(),
})

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string().nullable().optional(),
  author: UserSchema.nullable().optional(),
  created_at: z.string(),
  author_id: z.number().nullable().optional(),
  tree_id: z.number().nullable().optional(),
})

export const LikeSchema = z.object({
  id: z.number(),
  author: UserSchema.nullable().optional(),
  created_at: z.string(),
  author_id: z.number().nullable().optional(),
  tree_id: z.number().nullable().optional(),
})

export const FeedResponseSchema = z.object({
  data: z.array(TreeSchema),
  meta: z.object({
    is_last_page: z.boolean(),
  }),
})

export type User = z.infer<typeof UserSchema>
export type Tree = z.infer<typeof TreeSchema>
export type Comment = z.infer<typeof CommentSchema>
export type Like = z.infer<typeof LikeSchema>
export type FeedResponse = z.infer<typeof FeedResponseSchema>

export type Activity = (Comment & { type: 'comment' }) | (Like & { type: 'like' })