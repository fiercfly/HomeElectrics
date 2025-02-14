import React from 'react'
import loginsignupImage from "../asset/login-animation.gif"
import {Link} from "react-router"
import { useState } from 'react'
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from "../redux/userSlice"
const Login=()=> {

  const [data, setData]= useState({
    email: "",
    password: "",
  });

  const navigate= useNavigate()

  const userData= useSelector(state=> state)
  // console.log(userData.user)

  const dispatch= useDispatch()

const handleOnChange= (e)=> {
    const {name, value}= e.target
    setData((preve)=>{
        return {
            ...preve,
            [name]: value
        }
    })
}

const handleSubmit= async (e)=>{
    e.preventDefault()
    const {email, password}= data

    if(email && password){
      const fetchData= await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

      const dataRes= await fetchData.json()
      // console.log(dataRes)
      toast(userData.user.firstName + dataRes.message)

      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(()=>{
          navigate("/")
        }, 1000);
      }

      // console.log(userData)
    }
    else{
        alert("Please enter required field")
    }
}


  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
            {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
            <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto flex item-center'>
                <img src= {loginsignupImage} alt='loginsignupImage' className='w-full'/>
            </div>

            <form className='w-full py-3 flex flex-col'onSubmit= {handleSubmit}>
            

                <label htmlFor= 'email'>Email</label>
                <input type= {"email"} id="email" name='email' className= 'mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' 
                value= {data.email}
                onChange= {handleOnChange}
                />
                
                <label htmlFor= 'password'>Password</label>
                <input type= {"password"} id="password" name= 'password' className= 'mt-1 mb-2 w-full bg-slate-200  px-2 py-1 rounded focus-within:outline-blue-300'
                value= {data.password}
                onChange= {handleOnChange}
                />
            
            
                <button className= " w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                    Login
                </button>
              </form>

              <p className='text-left text-sm mt-2'>Don't have account ? <Link to={"/signup"} className='text-red-500 underline'>Signup</Link></p>
        </div>
    </div>
  )
}

export default Login