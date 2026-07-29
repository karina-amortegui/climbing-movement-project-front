// hooks, mapping, filtering, reducing, onClick, onChange

// event listeners: onClick, onChange, onSubmit
// mapping, filtering, reducing: displaying lists, data to the user
// hooks: useState, useEffect | storing and managing state and some other effects

import { useState } from "react";

export const Example = () => {
  const [input, setInputs] = useState("");

  return (
    <div>
      <label>First Name</label>
      <input onChange={(e) => setInputs(e.target.value)} value={input} />
    </div>
  );
};
