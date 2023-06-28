import { useContext, useEffect, useState } from "react"
import { getUserPolls } from "../helpers/Api"
import { dataPoll, userPoll } from "../helpers/Types"
import Card from "../components/Card"
import { UserContext } from "../components/Context"
import Header from "../components/Header"

export default function UserHome({setModal} : {setModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [data, setData] = useState<dataPoll[] | null>(null)
  const [erro, setErro] = useState<boolean>(false)
  const { dados } = useContext(UserContext) as { dados: userPoll }

  useEffect(() => {
    async function getDataHome() {
      try {
        const { url, options } = getUserPolls(dados.id)

        const dadosResp = await fetch(url, options)

        if (dadosResp.status === 201) {
          const json = await dadosResp.json()
          if (json.status === "ok") {
            setData(json.polls)
          }
        }
      } catch (e) {
        setErro(true)
      }
    }

    getDataHome()
  }, [dados.id, data])

  useEffect(() => {
    window.document.title = `${dados.name} | Home`
  })

  if (erro === true) {
    return (
      <div>
        <p>Falha na Comunicação com Servidor</p>
      </div>
    )
  }

  if (data === null) {
    return <p>carregando...</p>
  }

  return (
    <>
      <Header setModal={setModal} />
      <main className="container">
        <div className="grid-cards">
          {
            data.length ?
              data.map(item => (
                <Card key={item.id} title={item.name} startDate={item.createdAt} dataId={item.id} setAllData={setData}/>
              ))
              : (
                <p>Sem Enquentes Existentes</p>
              )
          }
        </div>
      </main>
    </>
  )
}
