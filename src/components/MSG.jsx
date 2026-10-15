import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export const MSG = ({msg}) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) return 
        setVisible(true)
        const timer = setTimeout(() => setVisible(false),2000)

        return () => {
            clearTimeout(timer)
        }
    },[msg])

    if(!msg || !visible) return null

  return (
    <div className='max-w-xl m-auto bg-indigo-100 text-indigo-950 text-center animate-bounce'>
        {msg}
    </div>
  )
}

