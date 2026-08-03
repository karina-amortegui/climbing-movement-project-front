import "./App.css";
import { MovementForm } from "./pages/MovementForm";

function App() {
  return (
    <>
      <MovementForm />
    </>
  );
}

export default App;

// const movementForm = document.getElementById("movment-form");

// movementForm.addEventListener("submit", async function (event) {
//   event.preventDefault();

//   const movementData = {
//     movementName: name,
//     movementSummary: document.getElementById("summary").value,
//     movementDescription: document.getElementById("description").value,
//     movementDifficulty: document.getElementById("difficulty").value,
//     movementStatus: document.getElementById("status").value,
//     movementWhenToUse: document.getElementById("when-to-use").value,
//     movmentHowToPerform: document.getElementById("how-to-perform").value,
//     movmentCommonMistakes: document.getElementById("common-mistakes").value,
//     movmentTags: document.getElementById("tags").value,
//     movementResearchNotes: document.getElementById("research-notes").value,
//     movementExtraNotes: document.getElementById("extra-notes").value,
//   };

//   const response = await fetch("/movements", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(movementData),
//   });

//   const result = await response.json();
//   console.log(result);
// });

//Thinking about what pages you need and what they are doing
//Planning things out to determine if/when you need global state
