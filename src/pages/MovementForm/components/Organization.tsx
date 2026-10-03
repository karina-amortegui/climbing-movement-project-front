import type { MovementFormSectionProps } from "../../../types/MovementTypes";

type OrganizationProps = MovementFormSectionProps & {
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
};

export const Organization = ({
  formData,
  setFormData,
  tagInput,
  setTagInput,
}: OrganizationProps) => {

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      movementStatus: value,
    }));
  }

  return (
    <section className="movement-form__panel">
      <div className="movement-form__section-header">
        <div>
          <p className="movement-form__section-number">03</p>
          <h2>Organization</h2>
        </div>

        <p>Movement classification and publishing status</p>
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
          onChange={handleStatusChange}
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


  )

}