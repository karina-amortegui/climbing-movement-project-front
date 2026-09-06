// component job: create a movement
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovementForm.css"; 

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
  onMovementChange: () => void;
};

export const MovementForm = ({ 
  onMovementChange, 
}: MovementFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
      const method = id ?  "PATCH" : "POST";
      const url = id 
        ? `${import.meta.env.VITE_API_URL}/movements/${id}`
        : `${import.meta.env.VITE_API_URL}/movements`;
      
      const token = localStorage.getItem("token");
      
      const response = await fetch(url,
        {
          method: method,
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
           },
          body: JSON.stringify(movementData),
        }
      );

     if (response.status === 401) {
      setStatusMessage("Please log in to make changes.");
      return;
     }
      
      if (!response.ok) {
        throw new Error("Server response unsuccessful");
      }

      const result = await response.json();
      console.log("server response =", result);
     
      onMovementChange();
      
      if (!id) {
        setFormData(emptyForm);
        setTagInput("");
      }

      const successMessage = id
        ? "Movement updated successfully!"
        : "Movement created successfully!";
        setStatusMessage(successMessage);

        if (id) {
          navigate(`/movements/${id}`);
        }

    } catch (err) {
      console.log(err);
      const failureMessage = id
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
    if (!id) {
      setFormData(emptyForm);
      setTagInput("");
      return;
    }

    async function fetchMovement() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements/${id}`,
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
    setTagInput(data.data.movementTags.join(", "));
    }
    fetchMovement();
  }, [id]);

  return (
    <main className="movement-form-page">
      <header className="movement-form__header">
        <p className="movement-form__eyebrow">Admin Workspace</p>

        <h1>{id ? "Edit Movement" : "Create Movement"}</h1>

        <p className="movement-form__intro">
          {id
            ? "Update the movement information stored in the CRUXARA library."
            : "Add structured movement information to the CRUXARA library."}
        </p>
      </header>

      <form
        id="movement-form"
        className="movement-form"
        onSubmit={(e) => createMovement(e as unknown as SubmitEvent)}
      >

      <section className="movement-form__panel">
        <div className="movement-form__section-header">
          <div>
            <p className="movement-form__section-number">01</p>
            <h2>Basic Information</h2>
          </div>

          <p>Core movement definition and classification</p>
        </div>

      <div className="movement-form__field">
        <label htmlFor="name">
          Movement Name
        </label>

        <input
          id="name"
          name="movementName"
          type="text"
          className="movement-form__control"
          required
          value={formData.movementName}
          onChange={(e) =>
            setFormData({ ...formData, movementName: e.target.value })
          }
        />
      </div>

          <div className="movement-form__field">
            <label htmlFor="summary">
              Short Summary
            </label>

            <textarea
              id="summary"
              name="movementSummary"
              className="movement-form__control"
              required
              value={formData.movementSummary}
              onChange={(e) =>
                setFormData({ ...formData, movementSummary: e.target.value })
              }
            ></textarea>
          </div>

          <div className="movement-form__field">
            <label htmlFor="description">
              Full Description
            </label>

            <textarea
              id="description"
              name="movementDescription"
              rows={5}
              className="movement-form__control"
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

          <fieldset className="movement-form__field">
            <legend>Execution Style</legend>

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
              className="movement-form__control"
            >
              <option value="">Select a style</option>
              <option value="static">Static</option>
              <option value="dynamic">Dynamic</option>
            </select>
          </fieldset>

          <fieldset className="movement-form__field">
            <legend>Primary Skill Demands</legend>
            <div className="movement-form__checkbox-grid">

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="strength"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("strength")}
                />
                <span>Strength</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="power"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("power")}
                />
                <span>Power</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="balance"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("balance")}
                />
                <span>Balance</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="coordination"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("coordination")}
                />
                <span>Coordination</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementDemand"
                  value="precision"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementDemand.includes("precision")}
                />
                <span>Precision</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="movement-form__field">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Applicable Terrain Types
            </legend>
            <div className="movement-form__checkbox-grid">
              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="slab"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("slab")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Slab</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="vertical"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("vertical")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Vertical</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="overhang"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("overhang")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Overhang</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="roof"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("roof")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Roof</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="dihedral"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("dihedral")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Dihedral</span>
              </label>

              <label className="movement-form__checkbox">
                <input
                  type="checkbox"
                  name="movementTerrain"
                  value="arete"
                  onChange={(e) => handleInputChange(e)}
                  checked={formData.movementTerrain.includes("arete")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Arete</span>
              </label>
            </div>
          </fieldset>       
        </section>
        
        <section className="movement-form__panel">
          <div className="movement-form__section-header">
            <div>
              <p className="movement-form__section-number">02</p>
              <h2>Teaching Information</h2>
            </div>

            <p>How and when the movement should be used</p>
          </div>

          <div className="movement-form__field">
            <label htmlFor="when-to-use">When to Use It</label>

            <textarea
              id="when-to-use"
              name="movementWhenToUse"
              className="movement-form__control"
              value={formData.movementWhenToUse}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  movementWhenToUse: e.target.value,
                })
              }
              rows={4}
            ></textarea>
          </div>

            <div className="movement-form__field">
              <label htmlFor="how-to-perform">How to Perform It</label>
              <textarea
                id="how-to-perform"
                name="movementHowToPerform"
                className="movement-form__control"
                value={formData.movementHowToPerform}
                onChange={(e) => 
                  setFormData({ 
                    ...formData, 
                    movementHowToPerform: e.target.value, 
                  })
                }
                rows={6}
              ></textarea>
            </div>

            <div className="movement-form__field--warning">
              <label htmlFor="common-mistakes">Common Mistakes</label>
              <textarea
                id="common-mistakes"
                name="movementCommonMistakes"
                className="movement-form__control"
                value={formData.movementCommonMistakes}
                onChange={(e) => 
                  setFormData({ 
                    ...formData, 
                    movementCommonMistakes: e.target.value, 
                  })
                }
                rows={5}
              ></textarea>
            </div>
          </section>

          <section className="movement-form__panel">
            <div className="movement-form__section-header">
              <div>
                <p className="movement-form__section-number">03</p>
                <h2>Organization</h2>
              </div>

              <p>Publishing status and movement classification</p>
            </div>

            <div className="movement-form__field">
              <label htmlFor="tags">Tags</label>

              <input
                id="tags"
                name="movementTags"
                type="text"
                className="movement-form__control"
                placeholder="Example: balance, overhang, hip rotation"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />

              <p className="movement-form__help">
                Separate multiple tags with commas.
              </p>
            </div>

            <fieldset className="movement-form__field">
              <legend>Entry Status</legend>

                <select
                  id="status"
                  name="movementStatus"
                  value={formData.movementStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      movementStatus: e.target.value,
                    })
                  }
                  className="movement-form__control"
                  required
                >
                  <option value="">Select a Status</option>
                  <option value="draft">Draft</option>
                  <option value="needs-review">Needs Review</option>
                  <option value="published">Published</option>
                </select>
            </fieldset>
          </section>

          <section className="movement-form__panel movement-form__panel--internal">
            <div className="movement-form__section-header">
              <div>
                <p className="movement-form__section-number">04</p>
                <h2>Internal Notes</h2>
              </div>

              <p>Admin-only research and working notes</p>
            </div>

          <div className="movement-form__field">
            <label htmlFor="research-notes">Research Notes</label>

            <textarea
              id="research-notes"
              name="movementResearchNotes"
              className="movement-form__control"
              value={formData.movementResearchNotes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  movementResearchNotes: e.target.value,
                })
              }
              rows={5}
            ></textarea>
          </div>

            <div className="movement-form__field">
              <label htmlFor="extra-notes">Extra Notes</label>
              <textarea
                id="extra-notes"
                name="movementExtraNotes"
                className="movement-form__control"
                value={formData.movementExtraNotes}
                onChange={(e) => 
                  setFormData({ 
                    ...formData, 
                    movementExtraNotes: e.target.value, 
                  })
                }
                rows={5}
              ></textarea>
            </div>
          </section>

        <button
          id="submitButton"
          type="submit"
          className="movement-form__submit"
        >
          {id ? "Update Movement" : "Create Movement"}
        </button>
        {statusMessage && (
          <p className="movement-form__status">
            {statusMessage}
          </p>
        )}
      </form>
    </main>
  );
};

