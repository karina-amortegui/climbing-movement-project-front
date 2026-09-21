type CategoryCardProps = {
  label: string
  header: string
}

export const CategoryCard = ({ label, header }: CategoryCardProps) => {
  return (
    <article className="category-card">
      <p className="category-card__label">{label}</p>
      <h3>{header}</h3>
    </article>
  )
}

