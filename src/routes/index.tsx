import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/Layout";
import Login from "@/pages/login/Login";
import Transactions from "@/pages/Transactions";
import Wallets from "@/pages/Wallets";
import Reports from "@/pages/Reports";
import Settings from "@/pages/settings";
import ValidateTwoFactor from "@/pages/login/ValidateLogin";
import SetupTwoFactor from "@/pages/login/SetupTwoFactorDialog";
import { LoginRedirect } from "./LoginRedirect";
import { TwoFactorRedirect } from "./TwoFactorRedirect";
import LoadingFallback from "@/components/LoadingFallback";
import ErrorPage from "@/pages/ErrorPage";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Users = lazy(() => import("@/pages/users/index"));
const UserDetails = lazy(() => import("../pages/user-profile/index"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Users />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:userId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <UserDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Transactions />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wallets",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Wallets />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Reports />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LoginRedirect>
        <Login />
      </LoginRedirect>
    ),
  },
  {
    path: "/validate-login",
    element: (
      <TwoFactorRedirect>
        <ValidateTwoFactor />
      </TwoFactorRedirect>
    ),
  },
  {
    path: "/verify-login",
    element: (
      <TwoFactorRedirect>
        <SetupTwoFactor />
      </TwoFactorRedirect>
    ),
  },
]);

export default router;
