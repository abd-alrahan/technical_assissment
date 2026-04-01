/**
 * Main App Component
 * Sets up routing, authentication context, and global providers
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/login">
        {() => (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )}
      </Route>
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/">
        {() => (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )}
      </Route>
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
