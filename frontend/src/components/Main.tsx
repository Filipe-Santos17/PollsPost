import { useContext, useEffect, useState } from "react"
import { getAllData } from "../helpers/Api"
import { dataPoll } from "../helpers/Types"
import Card from "./Card"
import { UserContext } from "./Context"

export default function Main() {
  const [data, setData] = useState<dataPoll[] | null>(null)
  const [erro, setErro] = useState<boolean>(false)
  const { reload } = useContext(UserContext) as { reload: number }

  useEffect(() => {
    async function getDataHome() {
      try {
        const { url, options } = getAllData()

        const dados = await fetch(url, options)

        if (!dados.ok) {
          console.log('deu ruim')
        }

        const json = await dados.json()

        if (json.status === "ok") {
          setData(json.data)
        }
      } catch (e) {
        setErro(true)
      }
    }

    getDataHome()
  }, [reload])

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
    <main className="container">
      <div className="grid-cards">
        {
          data.length ?
            data.map(item => (
              <Card key={item.id} title={item.name} startDate={item.createdAt} dataId={item.id} />
            ))
            : (
              <p>Sem Enquentes Existentes</p>
            )
        }
      </div>
    </main>
  )
}
