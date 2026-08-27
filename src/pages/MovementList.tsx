// component job: display the movement list
import { useEffect, useState } from "react";

type Movement = {
  _id: string;
  movementName: string;
  movementSummary: string;
};

type MovementListProps = {
  onSelect: (id: string) => void;
  movementRefreshKey: number;
};

export const MovementList = ({ 
  onSelect,
  movementRefreshKey,
 }: MovementListProps) => {

  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    async function fetchMovements() {
      
      try { 
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movements`);
        const data = await response.json();
        setMovements(data.data);

      } catch (err) {
        setError("Failed to load movements.");
      }
        finally { setLoading(false); }
    }
    fetchMovements(); 
  }, [movementRefreshKey]);

  if (loading) {
    return <p>Loading movements...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (movements.length === 0) {
    return <p>No movements found.</p>
  }

  return (
    <div>
      <h1>Movements</h1>
      <p>{movements.length} movements found</p>
      {movements.map((movement) => (
        <div key={movement._id}>{movement.movementName}
        <h2>{movement.movementName}</h2>
        <p>{movement.movementSummary}</p>
        <button onClick={() => onSelect(movement._id)}>View</button>
        </div>
        ))}
    </div>
  );
};