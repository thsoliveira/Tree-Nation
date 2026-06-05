import { render, screen } from "@testing-library/react";
import { CommentActivity } from "../../components/ui/CommentActivity";
import type { Comment } from "../../types";

describe("CommentActivity", () => {
	const comment: Comment = {
		id: 1,
		content: "Great tree!",
		created_at: "2024-01-15T10:00:00Z",
		author: {
			full_name: "John Doe",
			profile_img: "https://example.com/john.jpg",
		},
	};

	it("should render a comment activity correctly", () => {
		render(<CommentActivity comment={comment} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("commented")).toBeInTheDocument();
		expect(screen.getByText("Great tree!")).toBeInTheDocument();
	});

	it("should handle user without full_name", () => {
		const testComment: Comment = {
			id: 2,
			content: "Nice!",
			created_at: "2024-01-14T09:00:00Z",
			author: {
				first_name: "Bob",
				last_name: "Wilson",
			},
		};

		render(<CommentActivity comment={testComment} />);
		expect(screen.getByText("Bob Wilson")).toBeInTheDocument();
	});

	it('should display "User" when no user name is available', () => {
		const testComment: Comment = {
			id: 3,
			content: "Cool!",
			created_at: "2024-01-13T08:00:00Z",
			author: {},
		};

		render(<CommentActivity comment={testComment} />);
		expect(screen.getByText("User")).toBeInTheDocument();
	});
});
