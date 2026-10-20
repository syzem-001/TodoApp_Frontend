import  axios  from "axios"
import { WiMoonAltWaningCrescent1 } from "react-icons/wi"
const baseURL  = import.meta.env.VITE_API_URL + '/todos'


export const login  = async (username,password) => {
    const rs = await axios.post(baseURL + '/login', {username,password})
    return rs.data
}

export const ReadTodos = async () => {
    const rs  = await axios.get(baseURL)
    return rs.data
}

export const AddTodo = async (newTodo) => {
    const rs = await axios.post(baseURL , newTodo)
    return rs.data
}

export const DeleteTodo = async (id) =>{
    const rs = await axios.delete(`${baseURL}/${id}`)
    return rs.data
}

export const DoneTodo = async (id) =>{
    const rs = await axios.patch(`${baseURL}/${id}`)
    return rs.data
}