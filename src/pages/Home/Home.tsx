import { Link } from "react-router-dom";
import { CategoryCard } from "../../components/CategoryCard";
import "./Home.css";

const categoryCards = [
  {
    label: "Explosive Power",
    header: "Dynamic"
  },
  {
    label: "Core & Tension",
    header: "Static"
  },
  {
    label: "Precision & Control",
    header: "Technical"
  }
]

export const Home = () => {

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Climbing Movement Project</p>

          <h1>
            Master your
            <span> movement</span>
          </h1>

          <p className="home-hero__description">
            Explore climbing movements and learn how they are performed.
          </p>

          <Link className="home-hero__button" to="/movements">
            Browse movements
          </Link>
        </div>

        <div
          className="home-hero__media"
          aria-label="Climbing movement media coming soon"
        />
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <p className="home-section__eyebrow">Explore</p>
          <h2>Movement categories</h2>
        </div>

        <div className="home-categories">

          {
            categoryCards.map(({ label, header }) => (
              <CategoryCard
                key={header}
                label={label}
                header={header}
              />
            ))
          }
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <p className="home-section__eyebrow">Featured</p>
          <h2>Movement spotlight</h2>
        </div>

        <div className="home-featured-card">
          <div
            className="home-featured-card__media"
            aria-label="Featured movement media coming soon"
          />

          <div className="home-featured-card__content">
            <h3>Featured movement coming soon</h3>
            <p>
              This area will highlight a movement once the launch media content is
              ready.
            </p>

            <Link to="/movements">Explore the movement library</Link>
          </div>
        </div>
      </section>
    </main>
  );
};