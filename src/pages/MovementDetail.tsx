import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

type Movement = {
  _id: string;
  movementName: string;
  movementSummary: string;
  movementDescription: string;
  movementExecution: string;
  movementDemand: string[];
  movementTerrain: string[];
  movementStatus: string;
  movementWhenToUse: string;
  movementHowToPerform: string;
  movementCommonMistakes: string;
  movementTags: string[];
  movementResearchNotes: string;
  movementExtraNotes: string;
};

type MovementDetailProps = {
  movementRefreshKey: number;
  onDelete: () => void;
};

export const MovementDetail = ({ 
  movementRefreshKey,
  onDelete,
}: MovementDetailProps) => {
  const { id } = useParams();

  const [movement, setMovement] = useState<Movement|null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
    
  async function fetchMovement() {
    if (!id) {
      return;
    }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movements/${id}`
        );
        
        if (!response.ok) {
          throw new Error("Server response unsuccessful")
        }
        const data = await response.json();
        setMovement(data.data);

      } catch (err) {
        console.log(err);
        setStatusMessage("Failed to render movement")
    }
  }

  useEffect (() => {
    fetchMovement();
  }, [id, movementRefreshKey]);
  
  if (statusMessage) {
    return <p>{statusMessage}</p>
  }

if (isDeleted) {
  return <p>Movement deleted successfully.</p>;
}

  if (movement === null) {
    return <p>Loading movement...</p>;
  }  
  
  async function deleteMovement() {
    if (movement === null) {
      return;
    }
    
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this movement?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements/${movement._id}`,
        { method: "DELETE", },
      );

      if (!response.ok) {
        throw new Error("Failed to delete movement");
      }
      console.log("Movement deleted successfully");
      onDelete();
      setIsDeleted(true);
      setMovement(null);

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>{movement.movementName}</h1>
      <p><strong>Summary:</strong> {movement.movementSummary}</p>
      <p><strong>Description:</strong> {movement.movementDescription}</p>
      <p><strong>Execution:</strong> {movement.movementExecution}</p>
      <p><strong>Demand:</strong> {movement.movementDemand.join(", ")}</p>
      <p><strong>Terrain:</strong> {movement.movementTerrain.join(", ")}</p>
      <p><strong>Status:</strong> {movement.movementStatus}</p>
      <p><strong>When to use:</strong> {movement.movementWhenToUse}</p>
      <p><strong>How to perform:</strong> {movement.movementHowToPerform}</p>
      <p><strong>Common mistakes:</strong> {movement.movementCommonMistakes}</p>
      <p><strong>Tags:</strong> {movement.movementTags.join(", ")}</p>

      <div>
        <Link to={`/admin/movements/${movement._id}/edit`}>Edit</Link>
      </div>

      <div>
        <button onClick={deleteMovement}>Delete</button>
      </div>
    </div>
  );
};