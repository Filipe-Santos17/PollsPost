import { useContext, useState } from "react";
import { UserContext } from "./Context";
import Button from "./Button"
import UserLogo from "../assets/userLogo"
import { Link, useNavigate } from "react-router-dom"
import useThemeColor from "../hooks/useThemeColor";

export default function Header({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { login, userLogout } = useContext(UserContext) as { login: boolean, userLogout: () => void };
  const [showUserOp, setShowUserOp] = useState<boolean>(false)
  const [theme, setTheme] = useThemeColor()
  const navigate = useNavigate()

  function handleThemePage() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  function handleModal() {
    setModal(true)
  }

  function handleShowUserOptions() {
    setShowUserOp(!showUserOp)
  }

  function handleToUserPage(){
    navigate('/user')
  }

  function handleUserLogout(){
    userLogout()
    window.location.reload()
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
            <div onClick={handleShowUserOptions}>
              <UserLogo />
              {showUserOp && (
                <section className="UserOptions">
                  <ul>
                    <li onClick={handleToUserPage}>
                      Meus Pools
                    </li>
                    <li onClick={handleThemePage}>
                      Mudar Tema: {theme} 
                    </li>
                    <li onClick={handleUserLogout}>
                      Logout/Sair 
                    </li>
                  </ul>
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
