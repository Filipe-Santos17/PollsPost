import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getDataAnswerPoll, getOnePoll } from "../helpers/Api"
import { useLocation } from "react-router-dom"
import Option from "../components/user/Option"

export default function ViewDataPoll({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {

  const local = useLocation()
  const [dataDetail, setDataDetail] = useState<number[] | null>(null)
  const [options, setOptions] = useState<object | null>(null)

  useEffect(() => {
    async function getData() {
      const pollId = +local.pathname.replace("/view-data/", "")
      const { url, options } = getDataAnswerPoll(pollId)
      const dataFet = await fetch(url, options)

      if (dataFet.status === 200) {
        const dataJs = await dataFet.json()
        console.log(dataJs)
        if (dataJs.status === "ok") {
          setDataDetail(dataJs.resps)
        }
      }
    }

    getData()
  }, [local.pathname])

  useEffect(() => {
    async function getPoll() {
      const pollId = +local.pathname.replace("/view-data/", "")
      const { url, options } = getOnePoll(pollId)
      const dataFet = await fetch(url, options)

      if (dataFet.status === 201) {
        const json = await dataFet.json()

        console.log(json)
        if (json.status === "ok") {
          setOptions(json.poll)
        }
      }
    }

    getPoll()
  }, [local.pathname])

  function totalResp(array: [], op: number) {
    const value = array.filter(item => item === op)
    return value.length
  }

  if (dataDetail === null || options === null) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Header setModal={setModal} />
      <section className="container">
        <div className="card-choice">
          <h3>{options.name}</h3>
          <p>Numero total de respostas: {dataDetail.length}</p>
          <section>
            <div>
              <p>Valor 1: {options.polls[0].option_one}</p>
              <p>Numero de votos: {totalResp(dataDetail, 1)}</p>
            </div>
            <div>
              <p>Valor 2: {options.polls[0].option_two}</p>
              <p>Numero de votos: {totalResp(dataDetail, 2)}</p>
            </div>
            {options.polls[0].option_three && (
              <div>
                <p>Valor 3: {options.polls[0].option_three}</p>
                <p>Numero de votos: {totalResp(dataDetail, 3)}</p>
              </div>
            )}
            {options.polls[0].option_four && (
              <div>
                <p>Valor 3: {options.polls[0].option_four}</p>
                <p>Numero de votos: {totalResp(dataDetail, 4)}</p>
              </div>
            )}
            {options.polls[0].option_five && (
              <div>
                <p>Valor 3: {options.polls[0].option_five}</p>
                <p>Numero de votos: {totalResp(dataDetail, 5)}</p>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  )
}
