import "@testing-library/jest-dom";
import { vi } from "vitest";

/** ── react‑i18next ─────────────────────────────────────────────────────── */
vi.mock("react-i18next", async () => {
  const actual = await vi.importActual<typeof import("react-i18next")>(
    "react-i18next"
  );

  return {
    // keep anything else you might use (Trans, initReactI18next, …)
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key, // simple identity mock
      i18n: { changeLanguage: () => Promise.resolve() },
    }),
  };
});

/** ── sonner ────────────────────────────────────────────────────────────── */

vi.mock("@/components/ui/toast", async () => {
  const actual = await vi.importActual<typeof import("@/components/ui/toast")>(
    "@/components/ui/toast"
  );

  // clone and wrap the real toast so we can spy on error()
  const spyToast = { ...actual.toast };
  spyToast.error = vi.fn(spyToast.error);

  return { ...actual, toast: spyToast };
});

// plug a mutable mock here so each test can .resolve / .reject as it wants
export const addNewAgentMock = vi.fn();

/* IMPORTANT: path MUST match the import in AgentDialog.tsx */
vi.mock("@/features/settings/api", () => ({
  addNewAgent: addNewAgentMock,
}));
