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


  const prodImg = (url: string) => {
    if (url === "FIX ME") return url

    // if(url.startsWith("http://localhost:8787"))

    return url.replace("http://localhost:8787/static/images", "https://res.cloudinary.com/m5wjevku/image/upload/v1794276617")
    // https://res.cloudinary.com/m5wjevku/image/upload/v1794276617/12_gejo_undercling.jpg
  }

  return (
    <article className="movement-card">
      <div className="movement-card__visual" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div className="movement-card__lines" />
      </div>

      <div className="movement-card__content">
        <p className="movement-card__label">Movement</p>
        <h2>{movement.movementName}</h2>
        {/* temporary */}
        <img src={
          prodImg(
            movement.exampleImages[movement.exampleImages.length - 1]?.url ?? "FIX ME"
          )}
          style={{
            objectFit: "contain",

          }}
        />
        {/*  */}
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



