import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovementsList, setFeaturedMovement } from "../../api/movements/repository";
import type { Movement } from "../../types/MovementTypes";
import "./AdminViewMovement.css";


const useGetMovementsList = () => {
  const [movements, setMovements] = useState<Movement[]>([])

  useEffect(() => {
    const movementsResponse = async () => {
      const movementsRes = await getMovementsList();
      setMovements(movementsRes.data)
    }
    movementsResponse()
  }, [])
  return { movements, setMovements };
}

export default function AdminViewMovements() {
  const navigate = useNavigate();
  const { movements, setMovements } = useGetMovementsList();

  // handles the users's action
  const handleSetFeatured = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await setFeaturedMovement(id, token);
      setMovements((prevMovements) =>
        prevMovements.map((movement) => ({
          ...movement,
          isFeatured: movement._id === id
        }))
      );
    } catch (error) {
      console.error("Failed to set featured movement:", error);
    }
  };

  return (
    <main className="admin-movements">
      <div className="admin-movements__header">
        <div>
          <p className="admin-movements__eyebrow">
            ADMINISTRATION
          </p>

          <h1 className="admin-movements__title">
            MANAGE MOVEMENTS
          </h1>

          <p className="admin-movements__intro">
            Review and manage your climbing movement database.
          </p>
        </div>

        <button
          className="admin-movements__back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
      {movements.length > 0 && movements[0] != null && (
        <table
          style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
        >
          <thead>
            <tr >
              <th>#</th>
              <th>Movement</th>
              <th>Execution</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              <tr key={movement._id}>
                <td>{index + 1}</td>
                <td>{movement.movementName}</td>
                <td>{movement.movementExecution}</td>
                <td>{movement.movementStatus}</td>
                <td>{movement.isFeatured ? "Yes" : "No"}</td>
                <td>
                  {movement.isFeatured ? (
                    <span>Current</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetFeatured(movement._id)}
                    >
                      Set Featured
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      }

    </main>
  )
}

