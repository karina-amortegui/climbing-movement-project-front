// Libraries
import { useState } from "react";
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

function App() {
  const [movementRefreshKey, setMovementRefreshKey] = useState(0);

  return (
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
        </Route>
      </Route>
    </Routes>
  );
};

export default App;


