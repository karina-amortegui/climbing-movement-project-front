// Component job: fetch and display the public movement list
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MovementList.css";

type Movement = {
  _id: string;
  movementName: string;
  movementSummary: string;
};

type MovementListProps = {
  movementRefreshKey: number;
};

export const MovementList = ({
  movementRefreshKey,
}: MovementListProps) => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovements() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movements`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load movements.");
        }

        setMovements(data.data);
      } catch {
        setError("Failed to load movements.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovements();
  }, [movementRefreshKey]);

  const filteredMovements = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return movements;
    }

    return movements.filter((movement) => {
      return (
        movement.movementName.toLowerCase().includes(normalizedSearch) ||
        movement.movementSummary.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [movements, searchTerm]);

  if (loading) {
    return (
      <section className="movement-state" aria-live="polite">
        <span className="movement-state__indicator" aria-hidden="true" />
        <p>Loading movement library...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="movement-state movement-state--error" role="alert">
        <p>{error}</p>
      </section>
    );
  }

  if (movements.length === 0) {
    return (
      <section className="movement-state">
        <p>No movements have been added yet.</p>
      </section>
    );
  }

  return (
    <section className="movement-library">
      <header className="movement-library__header">
        <div>
          <p className="movement-library__eyebrow">
            Climbing Movement Database
          </p>

          <h1>Movement Library</h1>

          <p className="movement-library__intro">
            Explore climbing movements and learn how each technique is
            performed.
          </p>
        </div>

        <div className="movement-library__count">
          <span>Movements available</span>
          <strong>{movements.length}</strong>
        </div>
      </header>

      <div className="movement-toolbar">
        <label className="movement-search">
          <span className="movement-search__icon" aria-hidden="true">
            ⌕
          </span>

          <span className="sr-only">Search movements</span>

          <input
            type="search"
            placeholder="Search movements..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <p className="movement-toolbar__results" aria-live="polite">
          Showing {filteredMovements.length} of {movements.length}
        </p>
      </div>

      {filteredMovements.length === 0 ? (
        <section className="movement-state movement-state--inside">
          <p>No movements match “{searchTerm}”.</p>
        </section>
      ) : (
        <div className="movement-grid">
          {filteredMovements.map((movement, index) => (
            <article className="movement-card" key={movement._id}>
              <div className="movement-card__visual" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="movement-card__lines" />
              </div>

              <div className="movement-card__content">
                <p className="movement-card__label">Movement</p>
                <h2>{movement.movementName}</h2>
                <p className="movement-card__summary">
                  {movement.movementSummary}
                </p>

                <Link
                  className="movement-card__link"
                  to={`/movements/${movement._id}`}
                >
                  View movement
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};