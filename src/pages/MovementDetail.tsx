import { useState, useEffect } from "react";

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

export const MovementDetail = () => {
  const [movement, setMovement] = useState<Movement|null>(null);
  const [statusMessage, setStatusMessage] = useState("");
    async function fetchMovement() {
      
      try {
        const response = await fetch("http://localhost:8787/movements/6a848788f29e21d2cae475ce");
        
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
  }, []);
  
  if (statusMessage) {
    return <p>{statusMessage}</p>
  }

  if (movement === null) {
    return <p>Loading movement...</p>;
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
    </div>
  );
};