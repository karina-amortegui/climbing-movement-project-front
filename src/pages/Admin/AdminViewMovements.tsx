import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovementsList, setFeaturedMovement } from "../../api/movements/repository";
import type { Movement } from "../../types/MovementTypes";
import "./AdminViewMovement.css";

import { EN } from "../../i18n/resources";

// handle if someone pressed button twice ( throttle request ) ( disable button press while request is in progress)
// -- create sleep function ( it will help throttle )
// add loading state



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

// const useLoadingState = () => {


// }

export default function AdminViewMovements() {
  // state
  const [featureSetLoading, setFeatureSetLoading] = useState(false);

  // hooks
  const navigate = useNavigate();
  const { movements, setMovements } = useGetMovementsList();



  // handlers
  // handles the users's action
  const handleSetFeatured = async (id: string) => {

    setFeatureSetLoading(true)

    try {
      await setFeaturedMovement(id);
      setMovements((prevMovements) =>
        prevMovements.map((movement) => ({
          ...movement,
          isFeatured: movement._id === id
        }))
      );
    } catch (error) {
      console.error("Failed to set featured movement:", error);
    } finally {
      setFeatureSetLoading(false)
    }
  };

  // if (!movements.length) {
  //   return (<div>loading</div>)
  // }

  return (
    <main className="admin-movements">
      <div className="admin-movements__header">
        <div>
          <p className="admin-movements__eyebrow">
            {EN.ADMIN}
          </p>

          <h1 className="admin-movements__title">
            {EN.AdminViewMovements.header}
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
                      disabled={featureSetLoading}

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

