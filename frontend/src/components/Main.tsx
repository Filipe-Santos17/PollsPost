import { useEffect, useState } from "react"
import { getAllData } from "../helpers/Api"
import { dataPoll } from "../helpers/Types"
import Card from "./Card"

export default function Main() {
  const [data, setData] = useState<dataPoll[] | null>(null)

  useEffect(() => {
    async function getDataHome() {
      const { url, options } = getAllData()

      const dados = await fetch(url, options)

      const json = await dados.json()

      if (json.status === "ok") {
        setData(json.data)
      }
    }

    getDataHome()
  }, [])

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
              <p>a</p>
            )
        }
      </div>
    </main>
  )
}
