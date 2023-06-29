import { FormEvent, useContext, useRef, useState } from "react"
import IconeRemoveBoard from "../../assets/iconeRemoveBoard"
import useForm from "../../hooks/useForm"
import InputBox from "../InputBox"
import Button from "../Button"
import useFetch from "../../hooks/useFetch"
import { createPoll } from "../../helpers/Api"
import { UserContext } from "../Context"
import { createNewPoll, userPoll } from "../../helpers/Types"

export default function CreateNewPoll({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [idInput, setIdInputs] = useState<string[]>([])
  const titulo = useForm('titulo')
  const { request } = useFetch()
  const { dados } = useContext(UserContext) as { dados: userPoll }
  const inputsOptions = useRef<HTMLInputElement[]>([])
  const { setReload, reload } = useContext(UserContext) as { reload: number, setReload: React.Dispatch<React.SetStateAction<number>> }


  //Fecha o Modal se houver clique externo
  function handleClickOutside(e: Event) {
    if (e.target === e.currentTarget) {
      setModal(false)
    }
  }

  //Gera strings aleatorias para serem usadas como id
  function newStr() {
    return Math.random().toString(36).substring(2, 7);
  }

  //Insere novos Ids
  function insertInputElements() {
    if (idInput.length < 3) {
      setIdInputs([...idInput, newStr()])
    }
  }

  //Filtra os Ids
  function filterInputElements(item: string) {
    setIdInputs(idInput => {
      return idInput.filter(i => i !== item)
    })
  }

  //Cria novo Poll
  async function handleCreateNewPoll(e: FormEvent) {
    e.preventDefault()

    const option_one = inputsOptions.current[0].value
    const option_two = inputsOptions.current[1].value

    if (titulo.validate() && option_one && option_two) {
      const dataNewPoll = {
        name: titulo.value,
        option_one,
        option_two,
      } as createNewPoll

      const othersInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('[data-poll]')

      const numElInput = othersInputs.length
      //const numbKeys = Object.keys(inputsOptions.current).length

      if (numElInput === 1) {
        dataNewPoll.option_three = othersInputs[0].value
      }

      if (numElInput === 2) {
        dataNewPoll.option_three = othersInputs[0].value
        dataNewPoll.option_four = othersInputs[1].value
      }

      if (numElInput === 3) {
        dataNewPoll.option_three = othersInputs[0].value
        dataNewPoll.option_four = othersInputs[1].value
        dataNewPoll.option_five = othersInputs[2].value
      }

      const { url, options } = createPoll(dados.id, dataNewPoll)
      const { json, response } = await request(url, options)

      if ((await response).status == 201) {
        if(json.status === "ok"){
          setModal(false)
          setReload(reload + 1)
        }
      }
    }
  }

  return (
    <div className="container-modal" onClick={handleClickOutside}>
      <form className="modal-new-poll" onSubmit={handleCreateNewPoll}>
        <h2 className="modal-title">Criar uma nova Enquente</h2>
        <section>
          <InputBox labelName="Titulo da Enquente" idName="name-enquente" typeInput="text" placeholderText="Insira seu email" {...titulo} autoFocus={true} />
          <section className='box-input box-todos-column'>
            <label className="label-form">Opções(Minimo de 2, Máximo de 5):</label>
            <div className="board-container">
              <input type="text" name="poll-one" className="input-form" ref={(ref) => (inputsOptions.current[0] = ref)} />
            </div>
            <div className="board-container">
              <input type="text" name="poll-two" className="input-form" ref={(ref) => (inputsOptions.current[1] = ref)} />
            </div>
            {idInput.map((item, index) => (
              <div className="board-container" key={item}>
                <input type="text" data-poll name={`poll-${index}`} className="input-form" />
                <div onClick={() => filterInputElements(item)}>
                  <IconeRemoveBoard />
                </div>
              </div>
            ))}
          </section>
        </section>
        <div className="modal-new-board-box-buttons">
          <Button
            content="+ Add Nova Opção"
            btnStyle="secondary"
            handleClickButton={insertInputElements}
            isDisabled={idInput.length === 3 ? true : false}
          />
          <Button content="Criar Enquente" typeBtn="submit" />
        </div>
      </form>
    </div>
  )
}
