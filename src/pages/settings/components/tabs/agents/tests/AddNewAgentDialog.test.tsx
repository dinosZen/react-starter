import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AgentDialog } from "../components/AddNewAgentDialog";
import { addNewAgentMock } from "@/test/setup";
import { toast as uiToast } from "@/components/ui/toast";
import { expect, test, vi, beforeEach } from "vitest";

// create a spy once for this file
const successSpy = vi.spyOn(uiToast, "success");

// Simple helper to render the component with a fresh QueryClient each time
const renderDialog = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <AgentDialog />
    </QueryClientProvider>
  );

const user = userEvent.setup();

beforeEach(() => {
  vi.clearAllMocks();
  addNewAgentMock.mockReset();
});

/* ------------------------------------------------------------------ */

test("opens dialog when trigger is clicked", async () => {
  renderDialog();

  await user.click(screen.getByRole("button", { name: /addNew/i }));

  // dialog title becomes visible
  expect(screen.getByText("agent.add-new-agent")).toBeInTheDocument();
});

/* ------------------------------------------------------------------ */

test("shows client‑side validation errors on empty submit", async () => {
  renderDialog();
  await user.click(screen.getByRole("button", { name: /addNew/i }));
  await user.click(
    screen.getByRole("button", { name: /agent.send-invitation/i })
  );

  expect(
    screen.getByText("agent.first-name-required-field")
  ).toBeInTheDocument();
  expect(
    screen.getByText("agent.last-name-required-field")
  ).toBeInTheDocument();
  expect(screen.getByText("agent.email-required-field")).toBeInTheDocument();

  // API was NOT called
  expect(addNewAgentMock).not.toHaveBeenCalled();
});

/* ------------------------------------------------------------------ */

test("submits form, shows success toast and closes dialog", async () => {
  addNewAgentMock.mockResolvedValueOnce({});
  renderDialog();

  await user.click(screen.getByRole("button", { name: /addNew/i }));

  await user.type(screen.getByLabelText("agent.enter-first-name"), "John");
  await user.type(screen.getByLabelText("agent.enter-last-name"), "Doe");
  await user.type(
    screen.getByLabelText("agent.email-label"),
    "john.doe@example.com"
  );

  await user.click(
    screen.getByRole("button", { name: /agent.send-invitation/i })
  );

  // API hit with form data
  await waitFor(() => expect(addNewAgentMock).toHaveBeenCalledTimes(1));

  // success toast
  await waitFor(() => expect(successSpy).toHaveBeenCalled());

  // dialog should close -> title no longer in the DOM
  await waitFor(() =>
    expect(screen.queryByText("agent.add-new-agent")).not.toBeInTheDocument()
  );
});

/* ------------------------------------------------------------------ */

test("shows “email already exists” error from server and keeps dialog open", async () => {
  // fake Axios 409 response the component expects
  addNewAgentMock.mockRejectedValueOnce({
    isAxiosError: true,
    response: { status: 409, data: { message: "email" } },
  });

  renderDialog();
  await user.click(screen.getByRole("button", { name: /addNew/i }));

  await user.type(screen.getByLabelText("agent.enter-first-name"), "John");
  await user.type(screen.getByLabelText("agent.enter-last-name"), "Doe");
  await user.type(
    screen.getByLabelText("agent.email-label"),
    "john.doe@example.com"
  );

  await user.click(
    screen.getByRole("button", { name: /agent.send-invitation/i })
  );

  // field error appears
  await waitFor(() =>
    expect(screen.getByText("agent.email-already-exists")).toBeInTheDocument()
  );

  // dialog still open (title present)
  expect(screen.getByText("agent.add-new-agent")).toBeInTheDocument();
});
