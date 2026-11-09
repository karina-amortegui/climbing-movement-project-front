import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminMovementsList, setFeaturedMovement, type IGetMovementsListPayload } from "../../api/movements/repository";
import type { Movement } from "../../types/MovementTypes";
import "./AdminViewMovement.css";

import { MovementTableHeader } from "./components";

import { EN } from "../../i18n/resources";
import useDebounce from "../../hooks/useDebounce";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    console.log("searchTerm =", debouncedSearchTerm);
    // TODO: hook up search endpoint ->
    /**
     * 1. create api call in repository
     * 2. import into this file and use api call when person is done typing
     * 3. setMovements to results
     * 4. add reset button to go back to all movements
     */
  }, [debouncedSearchTerm])


  // hooks
  const navigate = useNavigate();
  const { movements, setMovements, responseData, setResponseData, error } = useGetMovementsList();

  const TABLE_HEADERS = [
    {
      header: "Movement",
      keyName: "movementName"
    },
    {
      header: "Execution",
      keyName: "movementExecution"
    },
    {
      header: "Status",
      keyName: "movementStatus"
    },
    {
      header: "Featured",
      keyName: "isFeatured"
    }
    // "Actions"
  ]



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
      {/* filter section */}
      <div>
        <select>
          <option>movementName</option>
          <option>other</option>
        </select>
        <input
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
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
            <tr>
              <th>#</th>
              {TABLE_HEADERS.map((tableHeader, idx) =>
                <MovementTableHeader
                  key={`movement-table-header-${idx}`}
                  headerText={tableHeader.header}
                  onClick={tableHeader.header !== "Execution" ? async () => {
                    console.log(`${tableHeader} clicked`)
                    const movementsList = await getAdminMovementsList({
                      orderBy: tableHeader.keyName
                    })
                    setMovements(movementsList.data)
                    setResponseData({
                      currentPage: movementsList.currentPage,
                      prevPageUrl: movementsList.prevPageUrl,
                      nextPageUrl: movementsList.nextPageUrl,
                      totalPages: movementsList.totalPages,
                      total: movementsList.total,
                      pageSize: movementsList.pageSize
                    })

                  } : undefined}
                  onChange={tableHeader.header !== "Execution" ? undefined : async (e) => {
                    const q = e.target.value !== "Execution" ? {
                      queryBy: {
                        movementExecution: e.target.value
                      }
                    } : {}

                    const movementsList = await getAdminMovementsList(q)
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
                />
              )}
              {/* <th>Status</th>
              <th>Featured</th> */}
              <th>Actions</th>
              {/* <MovementTableHeader
                headerText="Movement"
                onClick={() => {
                  console.log("MOVEMENT CLICKED")
                }}
              />
              
              <MovementTableHeader
                headerText="Execution"
                onClick={() => {
                  console.log("EXECUTION CLICKED")
                }}
              />
              <MovementTableHeader
                headerText="Status"
                onClick={() => {
                  console.log("STATUS CLICKED")
                }} />
              <MovementTableHeader
                headerText="Featured"
                onClick={() => {
                  console.log("FEATURED CLICKED")
                }} />
              <MovementTableHeader
                headerText="Actions"
                onClick={() => {
                  console.log("ACTIONS CLICKED")
                }} /> */}
            </tr>
          </thead>
          <tbody>
            {movements
              // .filter(movement => movement.movementName.includes(searchTerm))
              .map((movement, index) => (
                <tr key={movement._id} onClick={() => {
                  console.log("HELLO WORLD")
                  navigate(`/admin/movements/${movement._id}/edit`)
                }}>
                  <td>{(responseData.currentPage - 1) * responseData.pageSize + index + 1}</td>
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
                    {/* TODO: add buttons to update or delete movement ( row ) */}
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

