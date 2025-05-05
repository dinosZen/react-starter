import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteAgentDialog } from "../components/DeleteAgentDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock deleteAgent API
vi.mock("@/features/settings/api", () => ({
  deleteAgent: vi.fn(() => Promise.resolve({})),
}));

const renderDialog = (
  props: Partial<React.ComponentProps<typeof DeleteAgentDialog>> = {}
) => {
  const queryClient = new QueryClient();
  const defaultProps = {
    agent: {
      id: 123,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    },
    isOpen: true,
    onClose: vi.fn(),
  };

  return render(
    <QueryClientProvider client={queryClient}>
      <DeleteAgentDialog {...defaultProps} {...props} />
    </QueryClientProvider>
  );
};

const user = userEvent.setup();
/* ------------------------------------------------------------------ */

test("renders agent name and disables delete by default", () => {
  renderDialog();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /delete/i })).toBeDisabled();
});
/* ------------------------------------------------------------------ */

test("enables delete button after checkbox check", async () => {
  renderDialog();
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(screen.getByRole("button", { name: /delete/i })).not.toBeDisabled();
});
/* ------------------------------------------------------------------ */

test("calls delete and closes on success", async () => {
  const onClose = vi.fn();
  renderDialog({ onClose });

  // Check the box
  await user.click(screen.getByRole("checkbox"));
  // Click the delete button
  await user.click(screen.getByRole("button", { name: /delete/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});
/* ------------------------------------------------------------------ */

test("shows error toast when agent id is missing", async () => {
  const { toast: uiToast } = await import("@/components/ui/toast");

  renderDialog({
    agent: {
      // Simulate an agent with no ID
      // This is a deliberate error to test the error handling
      id: undefined,
      email: "",
      firstName: "No",
      lastName: "ID",
    },
  });

  await user.click(screen.getByRole("checkbox")); // confirm terms
  await user.click(screen.getByRole("button", { name: /delete/i }));

  await waitFor(() =>
    expect(uiToast.error).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        description: expect.stringMatching(/delete-error/i),
      })
    )
  );
});
