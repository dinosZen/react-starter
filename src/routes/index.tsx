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

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Users = lazy(() => import("@/pages/users/index"));
const UserDetails = lazy(() => import("../pages/user/index"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Users />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:userId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <UserDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Transactions />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wallets",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Wallets />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Reports />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
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
