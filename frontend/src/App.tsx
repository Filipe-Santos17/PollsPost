import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import CreateUser from './pages/CreateUser'
import ForgetUser from './pages/ForgetUser'
import ViewPoll from './pages/ViewPoll'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login'>
            <Route index element={<LoginUser />} />
            <Route path='create/' element={<CreateUser />} />
            <Route path='forget/' element={<ForgetUser />} />
          </Route>
          <Route path='view/:id' element={<ViewPoll />} />
          {/* <Route path='*' element={<Navigate to={"/"}/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
