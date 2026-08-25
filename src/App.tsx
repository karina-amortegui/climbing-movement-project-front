import "./App.css";
import { useState } from "react";
import { MovementForm } from "./pages/MovementForm";
import { MovementList } from "./pages/MovementList";
import { MovementDetail } from "./pages/MovementDetail";

function App() {
  return (
    <>
      <MovementForm />
      <MovementList />
      <MovementDetail />
    </>
  );
}

export default App;

//Thinking about what pages you need and what they are doing
//Planning things out to determine if/when you need global state
