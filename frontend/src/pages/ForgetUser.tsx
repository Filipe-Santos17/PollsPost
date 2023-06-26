import { FormEvent, useState } from "react"
import useForm from "../hooks/useForm"
import InputBox from "../components/InputBox"
import LoginBackground from "../components/login/LoginBackground"
import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import { changePass } from "../helpers/Api"
import ErroMsg from "../components/ErroMsg"

export default function ForgetUser() {
  const emailForm = useForm('email')
  const [sendEmail, setSendEmail] = useState<boolean>(false)
  const { load, erro, request } = useFetch()

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (emailForm.validate()) {
      const { url, options } = changePass({
        email: emailForm.value,
      })

      const { response } = await request(url, options)

      if ((await response).status == 200) {//json.status ok também
        setSendEmail(true)
      }
    }
  }

  return (
    <section className="login-form-page">
      <LoginBackground />
      {!sendEmail ?
        <section className="section-form">
          <form onSubmit={handleSubmitForm}>
            <div className="title-box">
              <h1>Alterar Senha</h1>
              <p>Insira seu e-mail e enviaremos o link para alterar sua senha.</p>
            </div>
            <div className="inputs-form">
              <InputBox labelName="Email" idName="email" typeInput="text" placeholderText="Insira seu email" autoFocus={true} {...emailForm}/>
              {erro && <ErroMsg erro={erro} />}
              <div className="box-links">
                <Link to="/login" className="forget-password">Voltar ao login</Link>
                <Link to="/login/create" className="forget-password">Não possuo cadastro</Link>
              </div>
            </div>
            {load ? <Button content="Carregando..." isDisabled={true} /> : <Button content="Enviar" type="submit" />}
          </form>
        </section>
        :
        <section className="section-form">
          <form>
            <div className="title-box">
              <h1>Email enviado com sucesso</h1>
              <p>Confira sua caixa de email, em alguns instantes o link para para a alterção irá ser enviado, por favor consulte sua caixa de span.</p>
            </div>
            <Link to={'/login'}>
              <Button content="Voltar ao login" />
            </Link>
          </form>
        </section>
      }
    </section>
  )
}
