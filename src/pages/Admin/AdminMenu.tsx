import { useNavigate } from "react-router-dom"

export default function AdminMenu() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>admin menu</h1>
      <button
        onClick={() => {
          navigate("/admin/movements/new")
        }}
      >Add Movement</button>

      <button
        onClick={() => {
          navigate("/admin/movements/view")
        }}
      >View Movements</button>

    </main>


  )
}