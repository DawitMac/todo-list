import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

const List = ({list , handleDelete , handleEdit}) => {
  return (
    <div className='w-full flex flex-col gap-3'>
        {
            list.map((item , index) => {
                const { id , title } = item
                return <div key={index} className='flex justify-between items-center mx-5'>
                  <p className='text-xl'>{title}</p>
                  <div className='flex items-center gap-3'>
                    <button className='text-green-600' onClick={()=> handleEdit(id)}>
                        <BiEdit size={20} />
                    </button>
                    <button className='text-red-600' onClick={()=> handleDelete(id)}>
                        <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
            })
        }
    </div>
  )
}

export default List