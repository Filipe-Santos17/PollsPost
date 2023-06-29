export default function Option({ valor, idElement, content, required = false, changedData }) {
  return (
    <div>
      <input type="radio" value={valor} id={idElement} name="option" required={required} onChange={changedData}/>
      <label htmlFor={idElement}>
        {content}
      </label>
    </div>
  )
}
