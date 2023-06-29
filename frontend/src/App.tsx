import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import CreateUser from './pages/CreateUser'
import ForgetUser from './pages/ForgetUser'
import ViewPoll from './pages/ViewPoll'
import { UserStorage } from './components/Context'
import ProtectedRouter from './auth/protectedRouter'
import CreateNewPoll from './components/modais/CreateNewPoll'
import UserHome from './pages/UserHome'
import ViewDataPoll from './pages/ViewDataPoll'

function App() {
  const [modalCreate, setModalCreate] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <UserStorage>
        <>
          <Routes>
            <Route path='/' element={<Home setModal={setModalCreate}/>} />
            <Route path='/login'>
              <Route index element={<LoginUser />} />
              <Route path='create/' element={<CreateUser />} />
              <Route path='forget/' element={<ForgetUser />} />
            </Route>
            <Route path='view/:id' element={
              <ProtectedRouter>
                <ViewPoll setModal={setModalCreate} />
              </ProtectedRouter>
            } />
            <Route path='/user' element={
              <ProtectedRouter>
                <UserHome setModal={setModalCreate} />
              </ProtectedRouter>
            } />
            <Route path='/view-data/:id' element={
              <ProtectedRouter>
                <ViewDataPoll setModal={setModalCreate}/>
              </ProtectedRouter>
            }/>
          </Routes>
          {modalCreate && <CreateNewPoll setModal={setModalCreate} />}
        </>
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
