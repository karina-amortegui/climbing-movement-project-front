
type MovementDetailCardProps = {
  label: string;
  heading: string;
  content: string;
  variant?: "feature" | "warning";
};

export const MovementDetailCard = ({
  label,
  heading,
  content,
  variant,
}: MovementDetailCardProps) => {

  const className = variant
    ? `detail-panel detail-panel--${variant}`
    : "detail-panel";

  return (
    <section className={className}>
      <p className="detail-panel__label">{label}</p>
      <h2>{heading}</h2>
      <p>{content}</p>
    </section>
  );

};