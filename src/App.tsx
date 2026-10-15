// Libraries
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { MovementForm } from "./pages/MovementForm/MovementForm";
import { MovementList } from "./pages/MovementList/MovementList";
import { MovementDetail } from "./pages/MovementDetail/MovementDetail";

// Layouts
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Admin Protection
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminMenu from "./pages/Admin/AdminMenu";
import AdminViewMovements from "./pages/Admin/AdminViewMovements";

import { ReLoginModal } from "./pages/Login/ReLoginModal";

export const App = () => {
  const [movementRefreshKey, setMovementRefreshKey] = useState(0);
  const [showReLogin, setShowReLogin] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setShowReLogin(true);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  return (
    <>
      <Routes>
        {/* Public Routes, PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/movements"
            element={<MovementList movementRefreshKey={movementRefreshKey} />}
          />

          <Route
            path="/movements/:id"
            element={
              <MovementDetail
                movementRefreshKey={movementRefreshKey}
                onDelete={() => {
                  setMovementRefreshKey((key) => key + 1);
                }}
              />
            }
          />
        </Route>

        {/* Protected Admin Routes, Admin Layout } */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/menu"
              element={
                <AdminMenu />
              }
            />
            <Route
              path="/admin/movements/new"
              element={
                <MovementForm
                  onMovementChange={() =>
                    setMovementRefreshKey((key) => key + 1)
                  }
                />
              }
            />

            <Route
              path="/admin/movements/:id/edit"
              element={
                <MovementForm
                  onMovementChange={() =>
                    setMovementRefreshKey((key) => key + 1)
                  }
                />
              }
            />
            <Route
              path="/admin/movements/view"
              element={
                <AdminViewMovements />
              }
            />
          </Route>
        </Route>
      </Routes>

      {showReLogin && (
        <ReLoginModal
          onSuccess={() => setShowReLogin(false)}
        />
      )}
    </>
  );
};