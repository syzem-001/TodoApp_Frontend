import {MyTodos} from "./components/MyTodos.jsx"
import { Button } from '@heroui/react'
import './App.css'
import { useState } from "react"
import { Login } from "./components/Login.jsx"

function App() {
  const[isLoggedIn,setIsLoggedIn] = useState(true) // amugy false

  return (
    <div className="bg-white h-[100vh] min-h-screen relative">
      {isLoggedIn ? <MyTodos setIsLoggedIn = {setIsLoggedIn} /> : <Login   setIsLoggedIn = {setIsLoggedIn} />}
    </div>
  )
}

export default App
