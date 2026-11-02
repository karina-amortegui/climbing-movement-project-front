import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminMovementsList, setFeaturedMovement, type IGetMovementsListPayload } from "../../api/movements/repository";
import type { Movement } from "../../types/MovementTypes";
import "./AdminViewMovement.css";

import { EN } from "../../i18n/resources";

// handle if someone pressed button twice ( throttle request ) ( disable button press while request is in progress)
// -- create sleep function ( it will help throttle )
// add loading state

const useGetMovementsList = (payload?: IGetMovementsListPayload) => {
  const [movements, setMovements] = useState<Movement[]>([])
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<{
    currentPage: number,
    prevPageUrl: string | null,
    nextPageUrl: string | null,
    totalPages: number,
    total: number
    pageSize: number
  }>({
    currentPage: 0,
    prevPageUrl: "",
    nextPageUrl: "",
    totalPages: 0,
    total: 0,
    pageSize: 0
  })

  useEffect(() => {
    const movementsResponse = async () => {

      try {
        const movementsRes = await getAdminMovementsList(payload);
        setMovements(movementsRes.data)
        setResponseData({
          currentPage: movementsRes.currentPage,
          prevPageUrl: movementsRes.prevPageUrl,
          nextPageUrl: movementsRes.nextPageUrl,
          totalPages: movementsRes.totalPages,
          total: movementsRes.total,
          pageSize: movementsRes.pageSize
        });
      } catch (error) {
        console.error("Failed to fetch admin movements:", error);
        setError("Unable to load movements. Please try again.");
      }
    };
    movementsResponse();
  }, []);

  return { movements, setMovements, responseData, setResponseData, error };
}

// const useLoadingState = () => {


// }

export default function AdminViewMovements() {
  // state
  const [featureSetLoading, setFeatureSetLoading] = useState(false);

  // hooks
  const navigate = useNavigate();
  const { movements, setMovements, responseData, setResponseData, error } = useGetMovementsList();



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

  const handleMouseEnter = (e: any) => {
    e.currentTarget.style.cursor = 'pointer';
    e.currentTarget.style.color = "#074666";
  };

  const handleMouseLeave = (e: any) => {
    e.currentTarget.style.cursor = 'default';
    e.currentTarget.style.color = "#00f5ff";
  };

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
      {/* filter section */}
      {error && (
        <p role="alert" className="admin-movements__error">
          {error}
        </p>
      )}
      {movements?.length > 0 && movements[0] != null && (
        <table
          style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
        >
          <thead>
            <tr >
              <th>#</th>
              <th
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  console.log("HELLO WORLD")
                }}>Movement</th>
              <th>Execution</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              <tr key={movement._id} onClick={() => {
                console.log("HELLO WORLD")
                navigate(`/admin/movements/${movement._id}/edit`)
              }}>
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
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSetFeatured(movement._id);
                      }}

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
      <pre>
        {JSON.stringify(responseData, null, 2)}
      </pre>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: 400,
        margin: "auto"
      }}>
        <span>
          <button
            disabled={!responseData.prevPageUrl}
            onClick={async () => {
              const movementsList = await getAdminMovementsList({
                currentPage: responseData.currentPage - 1,
              });
              setMovements(movementsList.data)
              setResponseData({
                currentPage: movementsList.currentPage,
                prevPageUrl: movementsList.prevPageUrl,
                nextPageUrl: movementsList.nextPageUrl,
                totalPages: movementsList.totalPages,
                total: movementsList.total,
                pageSize: movementsList.pageSize
              })

            }}>
            {"<"}
          </button>
        </span>
        {[...Array(responseData.totalPages).keys()].map((page, idx) => {
          return (
            <span key={`movements-page-${idx}`}>
              <button onClick={async () => {
                const movementsList = await getAdminMovementsList({
                  currentPage: page + 1,
                });
                setMovements(movementsList.data);
                setResponseData({
                  currentPage: movementsList.currentPage,
                  prevPageUrl: movementsList.prevPageUrl,
                  nextPageUrl: movementsList.nextPageUrl,
                  totalPages: movementsList.totalPages,
                  total: movementsList.total,
                  pageSize: movementsList.pageSize,
                });
              }}
              >
                {page + 1}
              </button>
            </span>
          )
        })}
        <span>
          <button
            disabled={!responseData.nextPageUrl}
            onClick={async () => {
              const movementsList = await getAdminMovementsList({
                currentPage: responseData.currentPage + 1,
              });
              setMovements(movementsList.data)
              setResponseData({
                currentPage: movementsList.currentPage,
                prevPageUrl: movementsList.prevPageUrl,
                nextPageUrl: movementsList.nextPageUrl,
                totalPages: movementsList.totalPages,
                total: movementsList.total,
                pageSize: movementsList.pageSize
              })
            }}
          >{">"}</button>
        </span>
      </div>
    </main>
  )
}

