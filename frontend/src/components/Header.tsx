import Button from "./Button"
import UserLogo from "../assets/userLogo"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Polls</h1>
      </Link>
      <div className="container-user">
        <Button content="Create New Poll"/>
        <div>
          <UserLogo/>
        </div>
      </div>
    </header>
  )
}
