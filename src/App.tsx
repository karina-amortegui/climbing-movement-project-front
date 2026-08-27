import "./App.css";
import { useState } from "react";
import { MovementForm } from "./pages/MovementForm";
import { MovementList } from "./pages/MovementList";
import { MovementDetail } from "./pages/MovementDetail";

function App() {
  const [editingMovementId, setEditingMovementId] = useState("");
  const [selectedMovementId, setSelectedMovementId] = useState("");
  const [movementRefreshKey, setMovementRefreshKey] = useState(0);
 
  
  return (
    <>
      <MovementForm 
        editingMovementId={editingMovementId}
        onMovementChange={() => setMovementRefreshKey((key) => key + 1)} />
      <MovementList onSelect={setSelectedMovementId} 
                    movementRefreshKey={movementRefreshKey} />
      <MovementDetail 
        selectedMovementId={selectedMovementId}
        movementRefreshKey={movementRefreshKey}
        onEdit={setEditingMovementId}
        onDelete={() => {
          setEditingMovementId("");
          setSelectedMovementId("");
          setMovementRefreshKey((key) => + 1);
        }} />
    </>
  );
}

export default App;

//Thinking about what pages you need and what they are doing
//Planning things out to determine if/when you need global state
