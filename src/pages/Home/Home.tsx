import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Movement } from "../../types/MovementTypes";
import { CategoryCard } from "../../components/CategoryCard";
import "./Home.css";
import { getFeaturedMovement } from "../../api/movements/repository";


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

// temporary manually selected MVP movement
const featuredMovementId = "6a9f476fe0ffcbf3463ea026";


/**
 * // 1. Create a new XHR object
const xhr = new XMLHttpRequest();

// 2. Configure it (Method, URL, async)
xhr.open("GET", "https://example.com", true);

// 3. Handle the response once it loads
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        // Success! Process the response
        console.log("Response:", xhr.responseText);
    } else {
        // Server returned an error code (e.g., 404 or 500)
        console.error("HTTP Error:", xhr.status, xhr.statusText);
    }
};

// 4. Handle networking/connectivity errors
xhr.onerror = function () {
    console.error("Network request failed.");
};

// 5. Send the request
xhr.send();
 */




export const Home = () => {
  const [featuredMovement, setFeaturedMovement] = useState<Movement | null>(null);

  useEffect(() => {
    async function fetchFeaturedMovement() {

      try {
        const response = await getFeaturedMovement();
        console.log("Featured movement API response:", response);

        // const response = await fetch(
        //   // move this to appConfig file
        //   `http://localhost:8787/movements/${featuredMovementId}`
        // );

        // if (!response.ok) {
        //   throw new Error("Failed to load featured movement.");
        // }

        // const data = await response.json();
        setFeaturedMovement(response.featured);

      } catch (error) {
        console.log(error);
      };
    }
    fetchFeaturedMovement();
  }, []);

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
            <h3>{featuredMovement?.movementName ?? "Featured movement coming soon"}</h3>
            <p>{featuredMovement?.movementSummary ?? "Movement summary coming soon."}</p>
            <Link to="/movements">Explore the movement library</Link>
          </div>
        </div>
      </section>
    </main>
  );
};