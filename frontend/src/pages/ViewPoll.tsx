import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getOnePoll } from "../helpers/Api";
import Header from "../components/Header";
import Button from "../components/Button";
import Option from "../components/user/Option";

export default function ViewPoll({setModal} : {setModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [dataPoll, setDataPoll] = useState<object[] | null>(null)
  const { pathname } = useLocation();
  const idPoll = +pathname.replace('/view/', '')

  useEffect(() => {
    window.document.title = 'Responder Enquente'

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    //responder - user, poll, value
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
            <Option valor={1} idElement={"op1"} content={dataPoll.polls[0].option_one} required={true} />
            <Option valor={2} idElement={"op2"} content={dataPoll.polls[0].option_two} />
            {dataPoll.polls[0].option_three ?
              <Option valor={3} idElement={"op3"} content={dataPoll.polls[0].option_three} />
              : ''
            }
            {dataPoll.polls[0].option_four ?
              <Option valor={4} idElement={"op4"} content={dataPoll.polls[0].option_four} />
              : ''
            }
            {dataPoll.polls[0].option_five ?
              <Option valor={5} idElement={"op5"} content={dataPoll.polls[0].option_five} />
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
