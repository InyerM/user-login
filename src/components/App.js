import React from 'react'
import RegisterPeople from '../pages/RegisterPeople'
import RegisterUser from '../pages/RegisterUser'
import User from '../pages/User'
import Login from '../pages/Login'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const App = () => (
        <BrowserRouter>
            <Routes>
                <Route path="/registerP" element={<RegisterPeople />}/>
                <Route path="/registerU" element={<RegisterUser />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/user/:id" element={<User />}/>
            </Routes>
        </BrowserRouter>
)

export default App
