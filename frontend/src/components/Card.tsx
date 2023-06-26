export default function Card() {
  return (
    <section className="card">
      <h3>{title}</h3>
      <div>
        <p>Inicio: {startDate}</p>
        <p>Término: {endDate}</p>
      </div>
    </section>
  )
}
