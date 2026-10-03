export type ExampleImage = {
  url: string;
  altText: string;
  creator: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  caption: string;
  order: number;
};

export type MovementListProps = {
  movementRefreshKey: number;
};

export type MovementFormData = {
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
  exampleImages: ExampleImage[];
};

export type MovementFormSectionProps = {
  formData: MovementFormData;
  setFormData: React.Dispatch<React.SetStateAction<MovementFormData>>;
}

export type Movement = MovementFormData & {
  _id: string;
};

export type MovementDetailProps = {
  movementRefreshKey: number;
  onDelete: () => void;
};


