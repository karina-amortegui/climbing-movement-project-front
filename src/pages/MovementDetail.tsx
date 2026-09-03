import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MovementDetail.css";

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

  const [movement, setMovement] = useState<Movement | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchMovement() {
      if (!id) {
        setStatusMessage("Movement ID is missing.");
        return;
      }

      setStatusMessage("");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movements/${id}`,
        );

        if (response.status === 404) {
          setStatusMessage("Movement not found.");
          return;
        }

        if (!response.ok) {
          throw new Error("Server response unsuccessful");
        }

        const data = await response.json();
        setMovement(data.data);
      } catch (error) {
        console.error(error);
        setStatusMessage("Failed to load movement.");
      }
    }

    fetchMovement();
  }, [id, movementRefreshKey]);

  async function deleteMovement() {
    if (movement === null) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this movement?",
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements/${movement._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401 || response.status === 403) {
        setStatusMessage("Please log in to make changes.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete movement");
      }

      setIsDeleted(true);
      setMovement(null);
      onDelete();
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to delete movement.");
    }
  }

  if (statusMessage) {
    return (
      <section className="detail-state detail-state--error" role="alert">
        <h1>Unable to display movement</h1>
        <p>{statusMessage}</p>
        <Link to="/movements">Return to movement library</Link>
      </section>
    );
  }

  if (isDeleted) {
    return (
      <section className="detail-state detail-state--success">
        <h1>Movement deleted</h1>
        <p>The movement was permanently removed.</p>
        <Link to="/movements">Return to movement library</Link>
      </section>
    );
  }

  if (movement === null) {
    return (
      <section className="detail-state" aria-live="polite">
        <span className="detail-state__indicator" aria-hidden="true" />
        <p>Loading movement...</p>
      </section>
    );
  }

  return (
    <article className="movement-detail">
      <header className="movement-detail__header">
        <div className="movement-detail__heading">
          <div className="movement-detail__badges">
            {isLoggedIn && (
              <span className="detail-badge detail-badge--status">
                {movement.movementStatus}
              </span>
            )}  

            {movement.movementDemand.map((demand) => (
              <span className="detail-badge" key={demand}>
                {demand}
              </span>
            ))}
          </div>

          <p className="movement-detail__eyebrow">Movement profile</p>
          <h1>{movement.movementName}</h1>
          <p className="movement-detail__summary">
            {movement.movementSummary}
          </p>
        </div>

        {isLoggedIn && (
          <div className="movement-detail__admin-actions">
            <Link
              className="detail-edit-link"
              to={`/admin/movements/${movement._id}/edit`}
            >
              Edit movement
            </Link>

            <button
              className="detail-delete-button"
              type="button"
              onClick={deleteMovement}
            >
              Delete
            </button>
          </div>
        )}
      </header>

      <div className="movement-detail__layout">
        <div className="movement-detail__primary">
          <section className="detail-panel detail-panel--feature">
            <p className="detail-panel__label">Movement overview</p>
            <h2>Description</h2>
            <p>{movement.movementDescription}</p>
          </section>

          <section className="detail-panel">
            <p className="detail-panel__label">Application</p>
            <h2>When to use it</h2>
            <p>{movement.movementWhenToUse}</p>
          </section>

          <section className="detail-panel">
            <p className="detail-panel__label">Technique sequence</p>
            <h2>How to perform it</h2>
            <p>{movement.movementHowToPerform}</p>
          </section>

          <section className="detail-panel">
            <p className="detail-panel__label">Execution focus</p>
            <h2>Execution</h2>
            <p>{movement.movementExecution}</p>
          </section>
        </div>

        <aside className="movement-detail__sidebar">
          <section className="detail-panel">
            <p className="detail-panel__label">Movement profile</p>
            <h2>Demands</h2>

            <div className="detail-chip-list">
              {movement.movementDemand.map((demand) => (
                <span className="detail-chip" key={demand}>
                  {demand}
                </span>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <p className="detail-panel__label">Environment</p>
            <h2>Terrain</h2>

            <div className="detail-chip-list">
              {movement.movementTerrain.map((terrain) => (
                <span className="detail-chip" key={terrain}>
                  {terrain}
                </span>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <p className="detail-panel__label">Classification</p>
            <h2>Tags</h2>

            <div className="detail-chip-list">
              {movement.movementTags.map((tag) => (
                <span className="detail-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="detail-panel detail-panel--warning">
        <p className="detail-panel__label">Technique warning</p>
        <h2>Common mistakes</h2>
        <p>{movement.movementCommonMistakes}</p>
      </section>

      {((isLoggedIn && movement.movementResearchNotes) ||
        movement.movementExtraNotes) && (
        <div className="movement-detail__notes">
          {isLoggedIn && movement.movementResearchNotes && (
            <section className="detail-panel">
              <p className="detail-panel__label">Supporting information</p>
              <h2>Research notes</h2>
              <p>{movement.movementResearchNotes}</p>
            </section>
          )}

          {movement.movementExtraNotes && (
            <section className="detail-panel">
              <p className="detail-panel__label">Additional context</p>
              <h2>Extra notes</h2>
              <p>{movement.movementExtraNotes}</p>
            </section>
          )}
        </div>
      )}

      <footer className="movement-detail__footer">
        <Link to="/movements">← Back to movement library</Link>
      </footer>
    </article>
  );
};