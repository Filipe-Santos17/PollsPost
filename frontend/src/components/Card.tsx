import { itemCard } from "../helpers/Types"
import { Link } from "react-router-dom"

export default function Card({ title, startDate, dataId }: itemCard) {
  return (
    <Link to={`view/${dataId}`}>
      <section className="card" id={`${dataId}`}>
        <h3>{title}</h3>
        <div>
          <p>Inicio: {startDate}</p>
        </div>
      </section>
    </Link>
  )
}
