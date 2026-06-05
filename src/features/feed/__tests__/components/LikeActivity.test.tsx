import { render, screen } from "@testing-library/react";
import { LikeActivity } from "../../components/ui/LikeActivity";
import type { Like } from "../../types";

describe("LikeActivity", () => {
	const like: Like = {
		id: 1,
		created_at: "2024-01-14T09:00:00Z",
		author: {
			full_name: "Jane Smith",
			profile_img: "https://example.com/jane.jpg",
		},
	};

	it("should render a like activity correctly", () => {
		render(<LikeActivity like={like} />);

		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
		expect(screen.getByText("liked")).toBeInTheDocument();
	});

	it("should handle user without full_name", () => {
		const testLike: Like = {
			id: 2,
			created_at: "2024-01-13T08:00:00Z",
			author: {
				first_name: "Bob",
				last_name: "Wilson",
			},
		};

		render(<LikeActivity like={testLike} />);
		expect(screen.getByText("Bob Wilson")).toBeInTheDocument();
	});

	it('should display "User" when no user name is available', () => {
		const testLike: Like = {
			id: 3,
			created_at: "2024-01-12T07:00:00Z",
			author: {},
		};

		render(<LikeActivity like={testLike} />);
		expect(screen.getByText("User")).toBeInTheDocument();
	});
});
