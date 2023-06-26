import Button from "./Button"

export default function Header() {
  return (
    <header>
      <h1>Polls</h1>
      <div>
        <Button content="Create New Poll" isDisabled={false}/>
      </div>
    </header>
  )
}
