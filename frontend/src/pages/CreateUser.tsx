import { FormEvent } from "react"
import useForm from "../hooks/useForm"
import InputBox from "../components/InputBox"
import LoginBackground from "../components/login/LoginBackground"
import useFetch from "../hooks/useFetch"
import Button from "../components/Button"
import { createUser } from "../helpers/Api"
import { useNavigate } from "react-router-dom"
import ErroMsg from "../components/ErroMsg"

export default function CreateUser() {

  const nameForm = useForm('name')
  const emailForm = useForm('email')
  const passwordForm = useForm('password')
  const { load, erro, request } = useFetch()
  const navigate = useNavigate()

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    if (emailForm.validate() && passwordForm.validate() && nameForm.validate()) {
      const { url, options } = createUser({
        name: nameForm.value,
        email: emailForm.value,
        password: passwordForm.value,
      });

      const { json, response } = await request(url, options)

      if ((await response).status == 201) {
        if (json.status === "ok") {
          navigate('/login')
        }
      }
    }
  }

  return (
    <section className="login-form-page">
      <LoginBackground/>
      <section className="section-form">
        <form onSubmit={handleSubmitForm}>
          <div className="title-box">
            <h1>Crie seu usuário</h1>
            <p>Seja bem-vindo(a)!  Insira seu nome, e-mail e senha para criar sua conta.</p>
          </div>
          <div className="inputs-form">
            <InputBox labelName="Nome" idName="user" typeInput="text" placeholderText="Insira seu nome" autoFocus={true} {...nameForm}/>
            <InputBox labelName="Email" idName="email" typeInput="text" placeholderText="Insira seu email" {...emailForm}/>
            <InputBox labelName="Senha" idName="password" typeInput="password" placeholderText="Insira sua senha " {...passwordForm}/>
            {erro && <ErroMsg erro={erro}/>}
          </div>
          {load ? <Button content="Carregando..." disabled/> : <Button content="Enviar" type="submit"/> }
        </form>
      </section>
    </section>
  )
}
