// component job: create a movement
import { useState, useEffect } from "react";

type MovementFormData = {
  movementName: string;
  movementSummary: string;
  movementDescription: string;
  movementExecution: string;
  movementDemand: string[];
  movementTerrain: string[];
  movementStatus: string;
  movementWhenToUse: string;
  movementHowToPerform: string;
  movementCommonMistakes: string;
  movementTags: string[];
  movementResearchNotes: string;
  movementExtraNotes: string;
};

const emptyForm = {
  movementName: "",
  movementSummary: "",
  movementDescription: "",
  movementExecution: "",
  movementDemand: [],
  movementTerrain: [],
  movementStatus: "",
  movementWhenToUse: "",
  movementHowToPerform: "",
  movementCommonMistakes: "",
  movementTags: [],
  movementResearchNotes: "",
  movementExtraNotes: "",
};

type MovementFormProps = {
  editingMovementId: string;
  onMovementChange: () => void;
};

export const MovementForm = ({ 
  editingMovementId, 
  onMovementChange, 
}: MovementFormProps) => {
  
  const [formData, setFormData] = useState<MovementFormData>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const[statusMessage, setStatusMessage] = useState("");
  
  // const movementData = {};

  // React.FormEvent<HTMLFormElement> tells typescript this event came from submitting an HTML form.
  // submitting, on change, on click

  // GOAL of this: store/persist data for the entire component form + function
  // when: when someone presses the button. encapsulate this logic into a function, to be used at a certain time
  // what, what is this function doing?: is this talking outside of my frontend?
  // try, catch, async await
  // outside function, async function, fetch, await, try catch, error handling, response.ok, response.json(), setState
  // does this need state?

  async function createMovement(e: SubmitEvent) {
    e.preventDefault();

    const tagsArray = tagInput.split(",").map((tag) => tag.trim());
    const movementData = { ...formData, movementTags: tagsArray };
    console.log("movementData =", movementData);

    try {
      const method = editingMovementId ?  "PATCH" : "POST";
      const url = editingMovementId 
        ? `${import.meta.env.VITE_API_URL}/movements/${editingMovementId}`
        : `${import.meta.env.VITE_API_URL}/movements`;
      
      const response = await fetch(url,
        {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movementData),
        }
      );

      if (!response.ok) {
        throw new Error("Server response unsuccessful");
      }

      const result = await response.json();
      console.log("server response =", result);
     
      onMovementChange();
      
      if (!editingMovementId) {
        setFormData(emptyForm);
        setTagInput("");
      }

      const successMessage = editingMovementId
        ? "Movement updated successfully!"
        : "Movement created successfully!";
        setStatusMessage(successMessage);

    } catch (err) {
      console.log(err);
      const failureMessage = editingMovementId
        ? "Failed to update movement."
        : "Failed to create movement.";
       setStatusMessage(failureMessage);
    }
  }

  type MultiSelectField = "movementDemand" | "movementTerrain";

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    const name = e.target.name as MultiSelectField;

    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  }
  useEffect(() => {
    if (!editingMovementId) {
      setFormData(emptyForm);
      setTagInput("");
      return;
    }

    async function fetchMovement() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements/${editingMovementId}`,
      )
      const data = await response.json();
      setFormData({ 
        movementName: data.data.movementName,
        movementSummary: data.data.movementSummary,
        movementDescription: data.data.movementDescription,
        movementExecution: data.data.movementExecution,
        movementDemand: data.data.movementDemand,
        movementTerrain: data.data.movementTerrain,
        movementStatus: data.data.movementStatus,
        movementWhenToUse: data.data.movementWhenToUse,
        movementHowToPerform: data.data.movementHowToPerform,
        movementCommonMistakes: data.data.movementCommonMistakes,
        movementTags: data.data.movementTags,
        movementResearchNotes: data.data.movementResearchNotes,
        movementExtraNotes: data.data.movementExtraNotes,
      });
    }
    fetchMovement();
  }, [editingMovementId]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form
        id="movement-form"
        className="bg-white rounded-xl shadow-lg p-8"
        onSubmit={(e) => createMovement(e as unknown as SubmitEvent)}
      >
        <section>
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
            Basic Information
          </h2>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Movement Name
            </label>
            <input
              id="name"
              name="movementName"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              value={formData.movementName}
              onChange={(e) =>
                setFormData({ ...formData, movementName: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-2 "
            >
              Short Summary
            </label>
            <textarea
              id="summary"
              name="movementSummary"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              value={formData.movementSummary}
              onChange={(e) =>
                setFormData({ ...formData, movementSummary: e.target.value })
              }
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Description
            </label>
            <textarea
              id="description"
              name="movementDescription"
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              value={formData.movementDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  movementDescription: e.target.value,
                })
              }
            ></textarea>
          </div>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Execution Style
            </legend>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 ">
                <select
                  id="execution"
                  name="movementExecution"
                  value={formData.movementExecution}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      movementExecution: e.target.value,
                    })
                  }
                  className="w-auto rounded-lg border border-gray-300 
                      bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select a style</option>
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Primary Skill Demands
            </legend>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="strength"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("strength")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Strength</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="power"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("power")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Power</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="balance"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("balance")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Balance</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="coordination"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("coordination")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Coordination</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="precision"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("precision")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Precision</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Applicable Terrain Types
            </legend>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="slab"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("slab")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Slab</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="vertical"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("vertical")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Vertical</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="overhang"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("overhang")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Overhang</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="roof"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("roof")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Roof</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="dihedral"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("dihedral")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Dihedral</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="arete"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("arete")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Arete</span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Entry Status
            </legend>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 ">
                <select
                  id="status"
                  name="movementStatus"
                  value={formData.movementStatus}
                  onChange={(e) => setFormData({ ...formData, movementStatus: e.target.value })}
                  className="w-auto rounded-lg border border-gray-300 
                      bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="">Select a Status</option>
                  <option value="draft">Draft</option>
                  <option value="needs-review">Needs Review</option>
                  <option value="published">Published</option>
                </select>
              </label>
            </div>
          </fieldset>
        </section>
        <div>
          <section>
            <h3 className="text-4xl font-bold text-blue-600 mb-6">
              Teaching Information
            </h3>

            <div>
              <label htmlFor="when-to-use">When to Use It</label>
              <textarea
                id="when-to-use"
                name="movementWhenToUse"
                value={formData.movementWhenToUse}
                onChange={(e) => setFormData({ ...formData, movementWhenToUse: e.target.value, })}
                rows={4}
              ></textarea>
            </div>

            <div>
              <label htmlFor="how-to-perform">How to Perform It</label>
              <textarea
                id="how-to-perform"
                name="movementHowToPerform"
                value={formData.movementHowToPerform}
                onChange={(e) => setFormData({ ...formData, movementHowToPerform: e.target.value, })}
                rows={6}
              ></textarea>
            </div>

            <div>
              <label htmlFor="common-mistakes">Common Mistakes</label>
              <textarea
                id="common-mistakes"
                name="movementCommonMistakes"
                value={formData.movementCommonMistakes}
                onChange={(e) => setFormData({ ...formData, movementCommonMistakes: e.target.value, })}
                rows={5}
              ></textarea>
            </div>
          </section>

          <section>
            <h2>Organization</h2>

            <div>
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                name="movementTags"
                type="text"
                placeholder="Example: balance, overhang, hip rotation"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
            </div>

            <p>Separate multiple tags with commas.</p>
          </section>

          <section>
            <h2>Internal Notes</h2>

            <div>
              <label htmlFor="research-notes">Research Notes</label>
              <textarea
                id="research-notes"
                name="movementResearchNotes"
                value={formData.movementResearchNotes}
                onChange={(e) => setFormData({ ...formData, movementResearchNotes: e.target.value, })}
                rows={5}
              ></textarea>
            </div>

            <div>
              <label htmlFor="extra-notes">Extra Notes</label>
              <textarea
                id="extra-notes"
                name="movementExtraNotes"
                value={formData.movementExtraNotes}
                onChange={(e) => setFormData({ ...formData, movementExtraNotes: e.target.value, })}
                rows={5}
              ></textarea>
            </div>
          </section>
        </div>

        <button id="submitButton" type="submit">Submit</button>
        {statusMessage && <p>{statusMessage}</p>}
      </form>
    </div>
  );
};
