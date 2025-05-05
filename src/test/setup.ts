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
// vi.mock("sonner", () => {
//   // `toast` is *callable* and also has named helpers → reproduce that shape
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const toastFn: any = vi.fn(); // the “callable” toast()
//   toastFn.success = vi.fn();
//   toastFn.error = vi.fn();
//   toastFn.warning = vi.fn();
//   toastFn.dismiss = vi.fn();
//   toastFn.custom = vi.fn(); // <── this one was missing

//   return { toast: toastFn };
// });
vi.mock("@/components/ui/toast", async () => {
  const actual = await vi.importActual<typeof import("@/components/ui/toast")>(
    "@/components/ui/toast"
  );

  // clone and wrap the real toast so we can spy on error()
  const spyToast = { ...actual.toast };
  spyToast.error = vi.fn(spyToast.error);

  return { ...actual, toast: spyToast };
});
