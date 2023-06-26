import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({children}) => {
  const [dados, setDados] = useState<object>({});
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [error, setError] = useState<boolean | string>(false);

  const userLogout = useCallback(() => {
    setDados({});
    setError(false);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    async function testLogin() {
      const tokenLogin = localStorage.getItem('token')

      if (tokenLogin === null) {
        return setLogin(false)
      }

      try {
        setError(false)
        setLoading(true)

        const { url, options } = routeValidateUser(tokenLogin)
        const resp = await fetch(url, options)

        if (resp.status === 200) {
          const data = await resp.json()

          if (data.status === "ok") {
            setDados(data.user)
            setLogin(true)
          }
        } else {
          setDados({})
        }

      } catch (e) {
        userLogout()
        throw new Error("Token Invalido, error: " + e);
      } finally {
        setLoading(false)
      }
    }

    testLogin()
  }, [userLogout])


  if (loading) {
    return (
      <div>carregando...</div>
    )
  }

  if (error) {
    return (
      <div>erro...</div>
    )
  }

  if (login === null) {
    return null; // Espera o login estar pronto
  }

  if (login) {
    return children
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;
