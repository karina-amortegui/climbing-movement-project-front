// component job: create a movement
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Form Components
import { BasicInformation } from "./components/BasicInformation";
import { TeachingInformation } from "./components/TeachingInformation";
import { Organization } from "./components/Organization";
import { ImagesMedia } from "./components/ImagesMedia";
import { InternalNotes } from "./components/InternalNotes";

// types
import type { MovementFormData } from "../../types/MovementTypes";

// Extra Imports
import "./MovementForm.css";

const emptyForm: MovementFormData = {
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
  exampleImages: [],
};

type MovementFormProps = {
  onMovementChange: () => void;
};

function validateMovementData(movement: MovementFormData) {
  let valid = true;
  for (const key in movement) {
    const typedKey = key as keyof MovementFormData;
    const currentValue = movement[typedKey];

    if (Array.isArray(currentValue)) {
      const isRequiredArray =
        typedKey === "movementDemand" || typedKey === "movementTerrain";

      const hasUnknown = currentValue.some(
        (value) =>
          typeof value === "string" && value.toUpperCase().includes("UNKNOWN"),
      );

      if ((isRequiredArray && currentValue.length === 0) || hasUnknown) {
        valid = false;
        break;
      }
    } else if (typeof currentValue === "string") {
      const isOptional =
        typedKey === "movementResearchNotes" ||
        typedKey === "movementExtraNotes";

      const isEmpty = currentValue.trim().length === 0;

      const hasUnknown = currentValue.trim().toUpperCase() === "UNKNOWN";

      if ((!isOptional && isEmpty) || hasUnknown) {
        valid = false;
        break;
      }
    }
  }

  return valid;
}

export const MovementForm = ({ onMovementChange }: MovementFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MovementFormData>(emptyForm);

  // const [formData, dispatchFormDataAction] = useReducer((state: typeof emptyForm, action: { type: string, payload: any }) => {
  //   switch (action.type) {
  //     case "ADD_EXAMPLE_IMAGE":
  //       return {
  //         ...state,
  //         exampleImages: [state.exampleImages, payload]
  //       }
  //   }
  // })

  const [tagInput, setTagInput] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function createMovement(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const tagsArray = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const movementData = { ...formData, movementTags: tagsArray };
    console.log("movementData =", movementData);

    if (
      movementData.movementStatus !== "draft" &&
      movementData.movementStatus !== "needs-review" &&
      movementData.movementStatus !== "published"
    ) {
      setStatusMessage("Please select Draft or Published.");
      return;
    }

    if (
      movementData.movementStatus === "published" &&
      !validateMovementData(movementData)
    ) {
      return alert("cannot publish incomplete data");
    }

    try {
      const method = id ? "PATCH" : "POST";

      // TODO: CHANGE TO REQUEST function we created
      const url = id
        ? `${import.meta.env.VITE_API_URL}/movements/${id}`
        : `${import.meta.env.VITE_API_URL}/movements`;

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movementData),
      });

      if (response.status === 401) {
        setStatusMessage("Please log in to make changes.");
        return;
      }

      if (!response.ok) {
        throw new Error("Server response unsuccessful");
      }
      // ______________________________________________

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

  useEffect(() => {
    if (!id) {
      setFormData(emptyForm);
      setTagInput("");
      return;
    }

    async function fetchMovement() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movements/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load movement");
        }

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
          exampleImages: data.data.exampleImages,
        });

        setTagInput(data.data.movementTags.join(", "));
      } catch (err) {
        console.error(err);
        setStatusMessage("Failed to load movement. Please try again.");
      }
    }
    fetchMovement();
  }, [id]);

  return (
    <main className="movement-form-page">
      <header className="movement-form__header">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          {"< back"}
        </button>
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
        onSubmit={createMovement}
        noValidate
      >
        {/* Basic Information => BasicInformation.tsx */}
        <BasicInformation formData={formData} setFormData={setFormData} />

        {/* Teaching Information => TeachingInformation.tsx */}
        <TeachingInformation formData={formData} setFormData={setFormData} />

        {/* Organization => Organization.tsx */}
        <Organization
          formData={formData}
          setFormData={setFormData}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />

        {/* Images/Media => ImagesMedia.tsx */}
        <ImagesMedia formData={formData} setFormData={setFormData} />

        {/* Internal Notes => InternalNotes.tsx */}
        <InternalNotes formData={formData} setFormData={setFormData} />

        <button
          id="submitButton"
          type="submit"
          className="movement-form__submit"
        >
          {id ? "Update Movement" : "Create Movement"}
        </button>
        {statusMessage && (
          <p className="movement-form__status">{statusMessage}</p>
        )}
      </form>
    </main>
  );
};
