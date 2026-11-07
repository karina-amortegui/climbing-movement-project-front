import type { MovementFormSectionProps } from "../../../types/MovementTypes";

export const TeachingInformation = ({
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
          onChange={handleTextChange}
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
          onChange={handleTextChange}
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
          onChange={handleTextChange}
          rows={5}
        ></textarea>
      </div>
    </section>
  );
}