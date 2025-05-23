import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import router from "./routes/index.tsx";
import "./i18n";
import { queryClient } from "./lib/react-query.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster closeButton richColors position="top-right" />
    </QueryClientProvider>
  </StrictMode>
);
