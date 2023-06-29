import { itemCard } from "../helpers/Types"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "./Button";
import { deletePoll } from "../helpers/Api";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { UserContext } from "./Context";

export default function Card({ title, startDate, dataId, setAllData }: itemCard) {
  const navigate = useNavigate()
  const { request } = useFetch()
  const { setReload, reload } = useContext(UserContext) as { reload: number, setReload: React.Dispatch<React.SetStateAction<number>> }

  const dia = new Date(startDate)
  const dataDia = `${dia.getDate()}/${dia.getMonth()}/${dia.getFullYear()}`

  const local = useLocation();
  const isUser = local.pathname === "/user"

  function handleClickCard() {
    navigate(`/view/${dataId}`)
  }

  function handleViewData(e: Event) {
    e.stopPropagation()
    navigate(`/view-data/${dataId}`)
  }

  async function handleDeletePoll(e: Event) {
    e.stopPropagation()

    const { url, options } = deletePoll(dataId)
    const { json, response } = await request(url, options)

    if ((await response).status === 200) {
      if (json.status === "ok") {
        if (setAllData) {
          setReload(reload + 1)
        }
      }
    }
  }

  return (
    <div onClick={handleClickCard}>
      <section className="card" id={`${dataId}`}>
        <h3>{title}</h3>
        <div>
          <p>Criada em: {dataDia}</p>
        </div>
        {isUser && (
          <section className="user-card-options">
            <Button content="Deletar" btnStyle="danger" handleClickButton={handleDeletePoll} />
            <Button content="Ver Analise" handleClickButton={handleViewData} />
          </section>
        )}
      </section>
    </div>
  )
}
