import type { ExampleImage } from "../../../types/MovementTypes";
import { Link } from "react-router-dom";

// Render one movement in the movement list

type MovementListCardProps = {
  movement: MovementListCardData;
  index: number;
};

type MovementListCardData = {
  _id: string;
  movementName: string;
  movementSummary: string;
  exampleImages: ExampleImage[];
};

export const MovementListCard = ({
  movement,
  index
}: MovementListCardProps) => {

  return (
    <article className="movement-card">
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
  );
};



