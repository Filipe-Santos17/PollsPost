import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { answerPoll, getOnePoll } from "../helpers/Api";
import Header from "../components/Header";
import Button from "../components/Button";
import Option from "../components/user/Option";
import { UserContext } from "../components/Context";
import { optionsPoll, userPoll } from "../helpers/Types";
import useFetch from "../hooks/useFetch";

export default function ViewPoll({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [dataPoll, setDataPoll] = useState<optionsPoll | null>(null)
  const [valueResp, setValueResp] = useState<number | null>(null)
  const { pathname } = useLocation()
  const idPoll = +pathname.replace('/view/', '')
  const { dados } = useContext(UserContext) as { dados: userPoll }
  const { request } = useFetch()
  const navigate = useNavigate()

  useEffect(() => {
    window.document.title = 'Responder Enquente'
  }, [])

  useEffect(() => {
    async function getData() {
      const { url, options } = getOnePoll(idPoll)

      const data = await fetch(url, options)

      const json = await data.json()

      if (json.status === "ok") {
        setDataPoll(json.poll)
      }
    }

    getData()
  }, [idPoll])

  function changeDataForm(e: Event) {
    setValueResp(e.currentTarget.value)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (valueResp) {
      const { url, options } = answerPoll(dataPoll?.id, dados?.id, valueResp)
      const { json, response } = await request(url, options)

      if ((await response).status === 200) {
        if (json.status === "ok") {
          alert('Resposta enviada com sucesso')
          navigate('/')
        }
      }
    }
  }

  if (dataPoll === null) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Header setModal={setModal} />
      <section className="container">
        <div className="card-choice">
          <h3>{dataPoll.name}</h3>
          <p>Escolha apenas uma resposta:</p>
          <form onSubmit={handleSubmit}>
            <Option valor={1} idElement={"op1"} content={dataPoll.polls[0].option_one} required={true} changedData={changeDataForm} />
            <Option valor={2} idElement={"op2"} content={dataPoll.polls[0].option_two} changedData={changeDataForm} />
            {dataPoll.polls[0].option_three ?
              <Option valor={3} idElement={"op3"} content={dataPoll.polls[0].option_three} changedData={changeDataForm} />
              : ''
            }
            {dataPoll.polls[0].option_four ?
              <Option valor={4} idElement={"op4"} content={dataPoll.polls[0].option_four} changedData={changeDataForm} />
              : ''
            }
            {dataPoll.polls[0].option_five ?
              <Option valor={5} idElement={"op5"} content={dataPoll.polls[0].option_five} changedData={changeDataForm} />
              : ''
            }
            <div className="buttons-form">
              <Link to={"/"}>
                <Button btnStyle="secondary" content="Voltar" />
              </Link>
              <Button content="Responder" typeBtn="submit" />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
