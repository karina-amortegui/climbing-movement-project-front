import type { ExampleImage, MovementFormSectionProps } from "../../../types/MovementTypes";

export const ImagesMedia = ({
  formData,
  setFormData,
}: MovementFormSectionProps) => {

  function addExampleImage() {
    setFormData((previousFormData) => {
      const newImage: ExampleImage = {
        url: "",
        altText: "",
        creator: "",
        source: "Wikimedia Commons",
        sourceUrl: "",
        license: "CC BY-SA 4.0",
        licenseUrl: "",
        caption: "",
        order: previousFormData.exampleImages.length + 1,
      };

      return {
        ...previousFormData,
        exampleImages: [...previousFormData.exampleImages, newImage],
      };
    });
  }


  function updateExampleImageUrl(index: number, value: string) {
    setFormData((previousFormData) => ({
      ...previousFormData,
      exampleImages: previousFormData.exampleImages.map((image, imageIndex) =>
        imageIndex === index ? { ...image, url: value } : image
      ),
    }));
  }

  function removeExampleImage(index: number) {
    setFormData((previousFormData) => ({
      ...previousFormData,
      exampleImages: previousFormData.exampleImages
        .filter((_, imageIndex) => imageIndex !== index)
        .map((image, imageIndex) => ({
          ...image,
          order: imageIndex + 1,
        })),
    }));
  }

  return (
    <section className="movement-form__panel">
      <div className="movement-form__section-header">
        <div>
          <p className="movement-form__section-number">04</p>
          <h2>Images/Media</h2>
        </div>

        <p>Add Wikimedia Commons example images</p>
      </div>

      <button
        type="button"
        className="movement-form__image-buttons"
        onClick={addExampleImage}
      >
        + Add Image
      </button>
      <p>
        images added: {formData.exampleImages.length}
      </p>

      {formData.exampleImages.map((image, index) => (
        <div key={index}>
          <label htmlFor={`image-url-${index}`}>
            Image {index + 1} URL
          </label>

          <input
            id={`image-url-${index}`}
            type="url"
            value={image.url}
            onChange={(e) =>
              updateExampleImageUrl(index, e.target.value)
            }
          />

          <label htmlFor={`image-alt-${index}`}>
            Alt Text
          </label>


          <input
            id={`image-alt-${index}`}
            type="text"
            value={image.altText}
            readOnly
          />
          <button
            type="button"
            className="movement-form__image-buttons"
            onClick={() => removeExampleImage(index)}
          >
            - Remove Image
          </button>

        </div>
      ))}

    </section>
  )
};