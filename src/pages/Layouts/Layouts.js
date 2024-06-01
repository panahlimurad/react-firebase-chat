import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateAccount from '../../components/CreateAccount/CreateAccount'
import Login from '../../components/Login/Login'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import Chat from '../../components/Chat/Chat'

function Layouts() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/create_account' element={<CreateAccount/>}></Route>
            <Route path='/error' element={<ErrorPage/>}></Route>
            <Route path='/chat' element={<Chat/>}></Route>
        </Routes>
    </div>
  )
}

export default Layouts