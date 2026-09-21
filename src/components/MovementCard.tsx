interface ICategoryCard {
  label: string
  header: string
}

const CategoryCard = ({ label, header}: ICategoryCard) => {
  return (
    <article className="home-category-card">
      <p className="home-category-card__label">{label}</p>
      <h3>{header}</h3>
    </article>
  )
}

export default CategoryCard

// const person = {
//   name: "karina",
//   job: "developer",
//   hair: "curly"
// }



// <CategoryCard 
  
// />