import { render, screen } from "@testing-library/react";
import { ActivityItem } from "../../components/ui/ActivityItem";
import type { Activity } from "../../types";

describe("ActivityItem", () => {
	const commentActivity: Activity = {
		id: 1,
		content: "Great tree!",
		type: "comment",
		created_at: "2024-01-15T10:00:00Z",
		author: {
			full_name: "John Doe",
			profile_img: "https://example.com/john.jpg",
		},
	};

	const likeActivity: Activity = {
		id: 2,
		type: "like",
		created_at: "2024-01-14T09:00:00Z",
		author: {
			full_name: "Jane Smith",
			profile_img: "https://example.com/jane.jpg",
		},
	};

	it("should render a comment activity correctly", () => {
		render(<ActivityItem activity={commentActivity} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("commented")).toBeInTheDocument();
		expect(screen.getByText("Great tree!")).toBeInTheDocument();
	});

	it("should render a like activity correctly", () => {
		render(<ActivityItem activity={likeActivity} />);

		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
		expect(screen.getByText("liked")).toBeInTheDocument();
	});

	it("should handle user without full_name", () => {
		const activity: Activity = {
			id: 3,
			type: "like",
			created_at: "2024-01-13T08:00:00Z",
			author: {
				first_name: "Bob",
				last_name: "Wilson",
			},
		};

		render(<ActivityItem activity={activity} />);
		expect(screen.getByText("Bob Wilson")).toBeInTheDocument();
	});

	it('should display "User" when no user name is available', () => {
		const activity: Activity = {
			id: 4,
			type: "like",
			created_at: "2024-01-12T07:00:00Z",
			author: {},
		};

		render(<ActivityItem activity={activity} />);
		expect(screen.getByText("User")).toBeInTheDocument();
	});
});
