import type { Movement, MovementDetailProps } from "../../types/MovementTypes";
import { MovementDetailCard } from "./components/MovementDetailCard";
import { MovementDetailChipPanel } from "./components/MovementDetailChipPanel";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovementDetail.css";

export const MovementDetail = ({
  movementRefreshKey,
  onDelete,
}: MovementDetailProps) => {
  const { id } = useParams();

  const [movement, setMovement] = useState<Movement | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  // Controls admin-only UI visibility; backend JWT middleware enforces actual authorization.
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

          <MovementDetailCard
            label="Movement Overview"
            heading="Description"
            content={movement.movementDescription}
            variant="feature"
          />

          <MovementDetailCard
            label="Application"
            heading="When to use it"
            content={movement.movementWhenToUse}
          />

          <MovementDetailCard
            label="Technique sequence"
            heading="How to perform it"
            content={movement.movementHowToPerform}
          />

          <MovementDetailCard
            label="Execution focus"
            heading="Execution"
            content={movement.movementExecution}
          />
        </div>

        <aside className="movement-detail__sidebar">
          <MovementDetailChipPanel
            label="Movement profile"
            heading="Demands"
            items={movement.movementDemand}
          />

          <MovementDetailChipPanel
            label="Environment"
            heading="Terrain"
            items={movement.movementTerrain}
          />

          <MovementDetailChipPanel
            label="Classification"
            heading="Tags"
            items={movement.movementTags}
          />
        </aside>
      </div>

      <MovementDetailCard
        label="Technique warning"
        heading="Common mistakes"
        content={movement.movementCommonMistakes}
        variant="warning"
      />

      {((isLoggedIn && movement.movementResearchNotes) ||
        movement.movementExtraNotes) && (
          <div className="movement-detail__notes">
            {isLoggedIn && movement.movementResearchNotes && (

              <MovementDetailCard
                label="Supporting information"
                heading="Research notes"
                content={movement.movementResearchNotes}
              />
            )}

            {movement.movementExtraNotes && (

              <MovementDetailCard
                label="Additional context"
                heading="Extra notes"
                content={movement.movementExtraNotes}
              />

            )}
          </div>
        )}

      <footer className="movement-detail__footer">
        <Link to="/movements">← Back to movement library</Link>
      </footer>
    </article>
  );
};