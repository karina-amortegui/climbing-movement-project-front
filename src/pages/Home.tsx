import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section>
      <h1>Climbing Movement Project</h1>
      <p>Explore climbing movements and learn how they are performed.</p>
      <Link to="/movements">Browse movements</Link>
    </section>
  );
};