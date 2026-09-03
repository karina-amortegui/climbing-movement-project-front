import { useState } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { MovementForm } from "./pages/MovementForm";
import { MovementList } from "./pages/MovementList";
import { MovementDetail } from "./pages/MovementDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  const [movementRefreshKey, setMovementRefreshKey] = useState(0);
 
  return (
    <Routes>
      <Route element={<Layout />}>

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
    </Routes>
  );
};

export default App;

//Thinking about what pages you need and what they are doing
//Planning things out to determine if/when you need global state
