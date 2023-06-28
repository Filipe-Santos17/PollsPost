import Main from '../components/Main'
import Header from '../components/Header'
import { useEffect } from 'react'

export default function Home({setModal} : {setModal:  React.Dispatch<React.SetStateAction<boolean>>}) {

  useEffect(() => {
    window.document.title = 'Home'
  },[])

  return (
    <>
      <Header setModal={setModal}/>
      <Main />
    </>
  )
}
