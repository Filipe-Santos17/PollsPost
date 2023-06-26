import { FormEvent } from "react"
import useForm from "../hooks/useForm"
import InputBox from "../components/InputBox"
import LoginBackground from "../components/login/LoginBackground"
import useFetch from "../hooks/useFetch"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { loginUser } from "../helpers/Api"
import ErroMsg from "../components/ErroMsg"

export default function LoginUser() {
  const emailForm = useForm('email')
  const passwordForm = useForm('password')
  const { load, erro, request } = useFetch()
  const navigate = useNavigate()

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (emailForm.validate() && passwordForm.validate()) {
      const { url, options } = loginUser({
        email: emailForm.value,
        password: passwordForm.value,
      })

      const { json, response } = await request(url, options)

      if ((await response).status == 200) {
        if (json.token) {
          localStorage.setItem('token', json.token)
          navigate('/')
        }
      }
    }
  }

  return (
    <section className="login-form-page">
      <LoginBackground />
      <section className="section-form">
        <form onSubmit={handleSubmitForm}>
          <div className="title-box">
            <h1>Fazer Login</h1>
            <p>Seja bem-vindo(a)!  Insira seu e-mail e senha para entrar em sua conta.</p>
          </div>
          <div className="inputs-form">
            <InputBox labelName="Usuário" idName="email" typeInput="text" placeholderText="Insira seu email" {...emailForm} autoFocus={true}/>
            <InputBox labelName="Senha" idName="password" typeInput="password" placeholderText="Insira sua senha " {...passwordForm} />
            {erro && <ErroMsg erro={erro} />}
            <div className="box-links">
              <Link to="forget/" className="forget-password">Esqueceu a senha ?</Link>
              <Link to="create/" className="forget-password">Não possuo cadastro</Link>
            </div>
          </div>
          {load ? <Button content="Carregando..." isDisabled={true} /> : <Button content="Entrar" type="submit" />}
        </form>
      </section>
    </section>
  )
}
