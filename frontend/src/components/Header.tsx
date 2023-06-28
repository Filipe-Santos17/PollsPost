import { useContext } from "react";
import { UserContext } from "./Context";
import Button from "./Button"
import UserLogo from "../assets/userLogo"
import { Link } from "react-router-dom"

export default function Header({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { login } = useContext(UserContext) as { login: boolean };

  function handleModal() {
    setModal(true)
  }

  return (
    <header>
      <Link to="/">
        <h1>Polls</h1>
      </Link>
      <div className="container-user">
        {login && (
          <>
            <Button content="Create New Poll" handleClickButton={handleModal} />
            <div>
              <UserLogo />
            </div>
          </>
        )}
      </div>
    </header>
  )
}
