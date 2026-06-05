export interface User {
	id?: number;
	first_name?: string;
	last_name?: string;
	full_name?: string;
	profile_img?: string;
	locale?: string;
	slug?: string;
	type?: string;
	status?: string;
	country?: string;
	follows?: boolean;
}

export interface Tree {
	id: number;
	parent_id?: number;
	owner_id?: number;
	planter_id?: number;
	sponsor_id?: number;
	quantity: number;
	type: string;
	message?: string;
	image?: string;
	video?: string;
	drops_count: number;
	likes_count: number;
	is_pinned: boolean;
	comments_count: number;
	hash_token: string;
	hashtag?: string;
	is_collected: boolean;
	hide_gift_wrapper: boolean;
	seed_deadline?: string;
	created_at: string;
	score: number;
	replanters_num: number;
	replanters_distinct_num: number;
	num_replants: number;
	replant_header: string[];
	species?: string;
	birth_date: string;
	is_liked?: boolean;
	is_watered?: boolean;
	recipient_id?: number;
	recipient_full_name?: string;
	owner: User;
	planter: User;
	sponsor?: User;
	is_anonymous: boolean;
	can_be_replanted: boolean;
}

export interface Comment {
	id: number;
	content?: string;
	author?: User;
	created_at: string;
	author_id?: number;
	tree_id?: number;
}

export interface Like {
	id: number;
	author?: User;
	created_at: string;
	author_id?: number;
	tree_id?: number;
}

export type Activity =
	| (Comment & { type: "comment" })
	| (Like & { type: "like" });
