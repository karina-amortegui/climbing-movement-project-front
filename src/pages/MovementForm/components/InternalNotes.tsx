import type { MovementFormSectionProps } from "../../../types/MovementTypes";

export const InternalNotes = ({
  formData,
  setFormData,
}: MovementFormSectionProps) => {

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  return (
    <section className="movement-form__panel movement-form__panel--internal" >
      <div className="movement-form__section-header">
        <div>
          <p className="movement-form__section-number">05</p>
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
          onChange={handleTextChange}
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
          onChange={handleTextChange}
          rows={5}
        ></textarea>
      </div>
    </section>
  );
}