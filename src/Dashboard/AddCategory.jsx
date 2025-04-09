import React,{useState} from 'react'
import api from '../shared/api'
const AddCategory = () => {
    const [form,setForm]=useState({})
    const handleChanges=(e)=>{setForm({...form,[e.target.name]:e.target.value})}
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(form)
     try {
        const response=await api.post('/api/admin/setCategory',form)
        // await fetch('http://localhost:3000/admin/setCategory', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',  
        //     },
        //     body:JSON.stringify(form),
        // })

        if(response.status===200){
            alert('category added successfully')
        }
        else{
            alert('category not added')
        }
     } catch (error) {
        console.log(error.message);
     }
    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <form action=""  onSubmit={(e)=>handleSubmit(e)} className='flex flex-col justify-center items-center p-6 gap-4'>
            <div className='flex flex-row justify-center items-center gap-6'>
            <label htmlFor="">CategoryName</label>
            <input className='border-2' type="text" name='CategoryName' onChange={handleChanges} />
            </div>
            <div className='flex flex-row justify-center items-center gap-6'>
            <label htmlFor="">ParentCategory</label>
            <input type="text" onChange={handleChanges} name='ParentCategory' placeholder='if no parent category type na in small caps' />
            </div>
            <input type="submit"  />
        </form>
    </div>
  )
}

export default AddCategory