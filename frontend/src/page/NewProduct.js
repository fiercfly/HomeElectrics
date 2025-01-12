import React, { useState } from 'react'
import {BsCloudUpload}from 'react-icons/bs'
import {ImagetoBase64} from '../utility/Imagetobase64'
import {toast} from 'react-hot-toast'



const NewProduct= ()=> {
  const [data, setData]= useState({
    name: '',
    category: '',
    image: '',
    price: '',
    description: '',
  })

  const handleOnChange= (e)=> {
    const {name, value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]: value
      }
    })
  }

  const uploadImage= async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])

    setData((preve)=>{
      return{
        ...preve,
        image: data,
      }
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()


    const {name, image, category, price}= data
    if(name && image && category && price){
      const fetchData= await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
  
      const fetchRes= await fetchData.json()
      toast(fetchRes.message)
      setData(()=>{
        return{
          name: '',
          category: '',
          image: '',
          price: '',
          description: '',
        }
      })
    }
    else{
      toast("Please fill all the fields")
    }
  }
  

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor= "name">Name</label>
        <input type= {"text"} name= "name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value= {data.name}/>


        <label htmlFor= "category">Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name= 'category' onChange={handleOnChange} value= {data.category}>
{/* Change it to requirements of the site: Sockets and all */}
          <option value={"other"}>Select Category</option>
          <option value={"Switches"}>Switches</option>
          <option value={"Sockets"}>Sockets</option>
          <option value={"Regulators"}>Regulators</option>
          <option value={"Indicators"}>Indicators</option>
          <option value={"Holders"}>Holders</option>
          <option value={"Plates"}>Plates</option>
          <option value={"MCB"}>MCB</option>
          <option value={"MCBBoxes"}>MCB Boxes</option>
          <option value={"SSCombine"}>SS Combine</option>
          <option value={"Plugs"}>Plugs </option>
          <option value={"Gl MOdular Box"}>Gl Modular Box</option>
          <option value={"OthersItems"}>Others </option>
        </select>

        
        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
            {
              data.image? <img src= {data.image} alt="itemImage" className='h-full w-full'/> : <span className='text-5xl'><BsCloudUpload/></span>
            }

            <input type= {"file"} accept= "image/" id="image" onChange={uploadImage} className= "hidden"/>
          </div>
        </label>



        <label htmlFor='price' className='my-1'>Price</label>
        <input type= {"text"} className='bg-slate-200 p-1 my-1' name= 'price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea row= {2} value= {data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>

      </form>
    </div>
  )
}

export default NewProduct;