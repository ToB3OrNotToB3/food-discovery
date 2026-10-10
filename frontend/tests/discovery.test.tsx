import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Discovery from "@/features/discovery/Discovery";

describe("discovery", () => {
  beforeEach(() => localStorage.clear());

  it("puts Clips in the primary mobile navigation", () => {
    render(<Discovery />);
    const navigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(within(navigation).getByRole("link", { name: "Clips" })).toHaveAttribute("href", "/watch");
    expect(screen.queryByRole("link", { name: /watch food clips/i })).not.toBeInTheDocument();
  });

  it("filters dishes by cuisine and search text", async () => {
    const user = userEvent.setup();
    render(<Discovery />);

    await user.click(screen.getByRole("button", { name: "South Indian" }));
    expect(screen.getByRole("heading", { name: "Dosa Social" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bun Theory" })).not.toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Search dishes, places or areas" }), "burger");
    expect(screen.getByRole("heading", { name: "Nothing matches this craving. Yet." })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByRole("heading", { name: "Bun Theory" })).toBeInTheDocument();
  });

  it("saves a place and shows it in the shortlist", async () => {
    const user = userEvent.setup();
    render(<Discovery />);

    await user.click(screen.getByRole("button", { name: "Save Bun Theory" }));
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    await user.click(within(navigation).getByRole("button", { name: /Saved places/ }));
    expect(screen.getByRole("heading", { name: "Bun Theory" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Dosa Social" })).not.toBeInTheDocument();
  });
});
