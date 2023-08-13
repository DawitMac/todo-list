import { useEffect } from "react"
import { useState } from "react"
import Alert from "./components/Alert"
import List from "./components/List"

const getItems = () =>{
  let items = localStorage.getItem('list')
  if(items){
    return items = JSON.parse(localStorage.getItem('list'))
  } else{
    return [];
  }
}

export default function App() {
  const [ name , setName ] = useState("")
  const [ list  , setList ] = useState(getItems())
  const [ alert , setAlert ] = useState({
    state : false,
    title : "" ,
    msg : ""
  })
  const [ isEdditing , setIsEdditing ] = useState(false)
  const [ editId , setEditId ] = useState(null)

const handleSubmit = (e) => {
  e.preventDefault();
  if(!name){
   showAlert(true , "danger" , "Please Provide Value")
  }
  else if( name && isEdditing){
    showAlert(true , "success" , "Editted Successfully")
    setList(
      list.map(item => {
        if(editId === item.id){
          return {...item , title : name}
        } else{
          return item
        }
      })
    )
    setIsEdditing(false)
    setName("")
  }
  else{
    showAlert(true , "success" , "Value Added To The List")
    const newItem = { id : new Date().getTime().toString() , title : name}
    setList([...list , newItem ])
    setName("")
  }
}
const showAlert = (state = false , title = "" , msg = "") => {
  setAlert({state , title , msg})
}
const handleEdit = (id) => {
  const editItem = list.find(item => item.id === id)
  setIsEdditing(true)
  setEditId(id)
  setName(editItem.title)
}
const handleDelete = (id) => {
  showAlert(true , "success" , "Value Deleted")
  const newItem = list.filter(item => item.id !== id )
  setList(newItem)
}
const handleClear = () => {
  showAlert(true , "success" , "List Cleared")
  setList([])
}
useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list))
},[list])
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-start justify-center">
      <div className="fixed w-[500px] flex flex-col py-4 px-5 items-center justify-center bg-white shadow rounded mt-32 gap-4 duration-500 delay-200 hover:drop-shadow-xl">
        {
           alert.state && <Alert {...alert} handleAlert={showAlert} />
        }
       <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full items-center justify-center'>
       <h4 className="text-3xl font-normal capitalize">To Do List</h4>
       <div className="flex w-full jusify-center  ">
        <input type='text' value={name} placeholder='eg. Dawit Mekonen' className='px-4 py-1 bg-gray-100 w-3/4 border' onChange={(e)=> setName(e.target.value)}/>
        <button type='submit' className="px-2 bg-blue-500 text-white w-1/4">{ isEdditing ? "Edit" : "Add"}</button>
       </div>
       </form>
       {
        list.length > 0 && <List list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
      }
      <button onClick={handleClear} className="items-center justify-center text-red-500 px-2 py-1 border border-red-400 hover:bg-red-400 hover:scale-105 hover:text-white">clear</button> 
      </div>
    </div>
  )
}