import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteAgentDialog } from "../components/DeleteAgentDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, test, vi } from "vitest";

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// Mock deleteAgent API
vi.mock("@/lib/api/agent", () => ({
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

test("renders agent name and disables delete by default", () => {
  renderDialog();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /delete/i })).toBeDisabled();
});

test("enables delete button after checkbox check", async () => {
  renderDialog();
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(screen.getByRole("button", { name: /delete/i })).not.toBeDisabled();
});

test("calls delete and closes on success", async () => {
  const onClose = vi.fn();
  renderDialog({ onClose });

  fireEvent.click(screen.getByRole("checkbox")); // confirm delete
  fireEvent.click(screen.getByRole("button", { name: /delete/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});

test("shows error toast when agent id is missing", async () => {
  const { toast } = await import("sonner");
  renderDialog({ agent: { firstName: "No", lastName: "ID" } });

  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: /delete/i }));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        description: expect.stringMatching(/delete-error/i),
      })
    );
  });
});
