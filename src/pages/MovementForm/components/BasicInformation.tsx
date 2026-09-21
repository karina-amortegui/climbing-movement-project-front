import type { MovementFormData } from "../../../types/MovementTypes"


type BasicInformationType = {
  formData: MovementFormData;
  setFormData: ({ }: MovementFormData) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInformation = ({ formData, setFormData, handleInputChange }: BasicInformationType) => {


  return (
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
  )
}