import { itemCard } from "../helpers/Types"
import { Link } from "react-router-dom"

export default function Card({ title, startDate, dataId }: itemCard) {

  const dia = new Date(startDate)
  const dataDia = `${dia.getDate()}/${dia.getMonth()}/${dia.getFullYear()}`

  return (
    <Link to={`view/${dataId}`}>
      <section className="card" id={`${dataId}`}>
        <h3>{title}</h3>
        <div>
          <p>Criada em: {dataDia}</p>
        </div>
      </section>
    </Link>
  )
}
