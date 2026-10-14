import { Button, InputGroup, Label, TextField } from '@heroui/react'
import React from 'react'
import { useState } from 'react'
import { login } from '../api'

export const Login = ({setIsLoggedIn}) => {
  const [username,setUserName] = useState('')
  const[password,setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleLogin = async () =>{
    console.log(username,password)
    try {
      
      const data = await login(username,password)
      setIsLoggedIn(data.success)
      console.log(data);
      
    } catch (error) {
      console.log(error);
      setMsg(error.rs?.data?.msg || 'Nem csikerült kapcsolódni a szerverhez! XD')
    }
  }


  return (
    <div className='bg-indigo-800 h-[100vh]'>
      <h1 className='flex items-center flex-col p-3 font-blod text-3xl'>My Todos</h1>
      <div className='max-w-md m-auto p-4 bg-indigo-400 rounded-2xl'>
        <TextField fullWidth name="email">
          <Label>Username</Label>
          <InputGroup fullWidth>
            <InputGroup.Input value={username} onChange={(e) => setUserName(e.target.value)}/>
          </InputGroup>
        </TextField>
        <TextField fullWidth>
          <Label>Password</Label>
          <InputGroup fullWidth>
            <InputGroup.Input placeholder="Enter password" type="password"
            value={password} onChange={(e)=> setPassword(e.target.value) }
            />
          </InputGroup>
        </TextField>
        <Button className='m-4 bg-indigo-950' onClick={()=> handleLogin()}>Belépés</Button>
        <div>{msg}</div>
        </div>
    </div>    
  )
}
