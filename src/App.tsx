import "./App.css";
import { MovementForm } from "./pages/MovementForm";
import { MovementList } from "./pages/MovementList";

function App() {
  return (
    <>
      <MovementForm />
      <MovementList />
    </>
  );
}

export default App;

//Thinking about what pages you need and what they are doing
//Planning things out to determine if/when you need global state
