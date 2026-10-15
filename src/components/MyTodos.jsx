import React from 'react'
import { useState } from 'react'
import { todosData } from '../data'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'
import { useEffect } from 'react'
import { CiLogout } from "react-icons/ci";
import { AddTodo, DeleteTodo, DoneTodo, ReadTodos } from '../api'
import { MSG } from './MSG'

export const MyTodos = ({setIsLoggedIn}) => {
  const [todos, setTodos] = useState(null)
  const [remaning, setRemaning] = useState(0)
  const [msg , setMsg] = useState(null)

  useEffect(() => {
    ReadTodos().then(setTodos)
  }, [])
  

  useEffect(() => {
    if(!todos) return
    const count = todos.filter(({complete}) => !complete).length
    setRemaning(count)

  }, [todos])

  console.log(todos);

  const handleDelete= async (id)=>{
      setMsg('')
      const data = await DeleteTodo(id)
      console.log((data.msg));
      setTodos(prev => prev.filter(obj => obj.id != id)) //frissül 
      setMsg(data.msg)
      //setTimeout(() => setMsg(''),2000)
  }
  
  const handleDone= async (id)=>{
     setMsg('')
    const data = await DoneTodo(id)
    setTodos (prev => prev.map(obj => obj.id == id ? {...obj,complete : !obj.complete} : obj))
    console.log(data.msg)
    setMsg(data.msg)
    //setTimeout(() => setMsg(''),2000)
  }
  const handleAdd=  async (task)=>{
     setMsg('')
     const data = await AddTodo({task})
     console.log(data.msg);
     ReadTodos().then(setTodos) //ujra frissítsük
     setMsg(data.msg)
     //setTimeout(() => setMsg(''),2000)
  }

  return (
    <div className='max-w-3xl- text-black'>
      <h2 className='flex items-center flex-col p-3 max-w-3xl m-auto font-bold text-3xl p-[3rem]'>My Todos</h2>
      <NewTodo handleAdd={handleAdd}/>
      <ul className='flex flex-col gap-3 shadow-md max-w-3xl m-auto bg-blue-300'>
        {todos && todos.map(({id,task,complete})=>
        <li key={id} className='flex justify-between p-5 border-b-2 p-3xl'>
          <Button isIconOnly variant="tertiary"  onClick={()=>handleDone(id)}>
           <MdDoneOutline style={{color:complete ? 'green': 'gray'}}/>
          </Button>

          <div style={{textDecoration: complete ? "line-through" :"", color:"black"}}>{task}</div>

          <Button isIconOnly aria-label="Delete" variant="danger" onClick={()=>handleDelete(id)}>
            <FaTrash />
          </Button>
        </li>
        )}
      </ul>
      <div className='flex items-center p-3 flex-col'>
        {remaning == 0 ? 'Nincs több feladat!!' : `A hátra maradt feladatokszáma : ${remaning}`}
      </div>
      <MSG msg = {msg}/>

        <Button onClick={() => setIsLoggedIn(false)}className='fixed top-2 right-2'>

          <CiLogout size={42}/>
        </Button>

    </div>
  )
}


