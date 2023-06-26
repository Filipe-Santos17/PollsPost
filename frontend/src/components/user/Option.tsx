export default function Option({ valor, idElement, content, required = false }) {
  return (
    <div>
      <input type="radio" value={valor} id={idElement} name="option" required={required} />
      <label htmlFor={idElement}>
        {content}
      </label>
    </div>
  )
}
