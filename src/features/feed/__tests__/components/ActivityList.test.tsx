import { render, screen } from "@testing-library/react";
import { ActivityList } from "../../components/ui/ActivityList";
import type { Activity } from "../../types";

describe("ActivityList", () => {
	const mockActivities: Activity[] = [
		{
			id: 1,
			content: "Great tree!",
			type: "comment",
			created_at: "2024-01-15T10:00:00Z",
			author: { full_name: "John Doe" },
		},
		{
			id: 2,
			type: "like",
			created_at: "2024-01-14T09:00:00Z",
			author: { full_name: "Jane Smith" },
		},
	];

	it("should render loading state", () => {
		render(<ActivityList activities={[]} isLoading={true} isError={false} />);
		expect(screen.getByText("Loading activity...")).toBeInTheDocument();
	});

	it("should render error state", () => {
		render(<ActivityList activities={[]} isLoading={false} isError={true} />);
		expect(screen.getByText("Failed to load activity")).toBeInTheDocument();
	});

	it("should render empty state", () => {
		render(<ActivityList activities={[]} isLoading={false} isError={false} />);
		expect(screen.getByText("No activity yet")).toBeInTheDocument();
	});

	it("should render list of activities", () => {
		render(
			<ActivityList
				activities={mockActivities}
				isLoading={false}
				isError={false}
			/>,
		);
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
	});
});
