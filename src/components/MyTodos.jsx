import React from 'react'
import { useState } from 'react'
import { todosData } from '../data'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'
import { useEffect } from 'react'
import { CiLogout } from "react-icons/ci";

export const MyTodos = ({setIsLoggedIn}) => {
  const [todos, setTodos] = useState(todosData)
  const [remaning, setRemaning] = useState(0)

  console.log('a backendelérése: ', import.meta.env.VITE_API_URL);
  


  useEffect(() => {
    const count = todos.filter(({done}) => !done).length
    setRemaning(count)

  }, [todos])

  console.log(todos);

  const handleDelete=(id)=>{
    console.log(id);
    setTodos(prev=>prev.filter(obj=>obj.id!=id))
  }
  
  const handleDone=(id)=>{
    setTodos(prev=>prev.map(obj=>obj.id==id ? {...obj,done:!obj.done} : obj))
  }
  const handleAdd=(descr)=>{
     const newTodo={
      id:Date.now(),
      descr,
      done:false
     }
     setTodos(prev=>[...prev,newTodo])
  }

  return (
    <div className='max-w-3xl- text-black'>
      <h2 className='flex items-center flex-col p-3 max-w-3xl m-auto font-bold text-3xl p-[3rem]'>My Todos</h2>
      <NewTodo handleAdd={handleAdd}/>
      <ul className='flex flex-col gap-3 shadow-md max-w-3xl m-auto bg-blue-300'>
        {todos.map(({id,descr,done})=>
        <li key={id} className='flex justify-between p-5 border-b-2 p-3xl'>
          <Button isIconOnly variant="tertiary"  onClick={()=>handleDone(id)}>
           <MdDoneOutline style={{color:done ? 'green': 'gray'}}/>
          </Button>

          <div style={{textDecoration: done ? "line-through" :"", color:"black"}}>{descr}</div>

          <Button isIconOnly aria-label="Delete" variant="danger" onClick={()=>handleDelete(id)}>
            <FaTrash />
          </Button>
        </li>
        )}
      </ul>
      <div className='flex items-center p-3 flex-col'>
        {remaning == 0 ? 'Nincs több feladat!!' : `A hátra maradt feladatokszáma : ${remaning}`}
      </div>

        <Button onClick={() => setIsLoggedIn(false)}className='fixed top-2 right-2'>

          <CiLogout size={42}/>
        </Button>

    </div>
  )
}


