type MovementDetailChipPanelProps = {
  label: string;
  heading: string;
  items: string[];
}

export const MovementDetailChipPanel = ({
  label,
  heading,
  items,
}: MovementDetailChipPanelProps) => {

  return (
    <section className="detail-panel">
      <p className="detail-panel__label">{label}</p>
      <h2>{heading}</h2>

      <div className="detail-chip-list">
        {items.map((item) => (
          <span className="detail-chip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
};