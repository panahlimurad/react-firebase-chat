import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import LoginPage from '../login/LoginPage'
import CreateAccountPage from '../create_acount/CreateAccountPage'
import ChatPage from '../chat/ChatPage'

function Layouts() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LoginPage/>}></Route>
            <Route path='/create_account' element={<CreateAccountPage/>}></Route>
            <Route path='/error' element={<ErrorPage/>}></Route>
            <Route path='/chat' element={<ChatPage/>}></Route>
        </Routes>
    </div>
  )
}

export default Layouts