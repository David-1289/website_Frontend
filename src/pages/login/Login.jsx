import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import React, { useState } from "react"

export const Login = () => {
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useHistory()

  const Login = async(e) => {
    e.preventDefault();
    const res = await axios.post("https://finalbackend-4lo9.onrender.com/api/auth/login",{
      name,password
    })

    if(res.data.status === 'ok'){
      localStorage.setItem('Email',true)
      localStorage.setItem('Name',name)
      setName('')
      setPassword('')
      alert('login successful')
      navigate.push(`/`)
  }
  else if(res.data.status === 'wrong credentials'){
      alert('You are not registerd or may be wrong credentials')
  }
  else{
      alert(res.data.error)
  }

  }

  const textChange = (e) => {
    setName(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h1>Login</h1>
            </div>
          </div>
          <form className="form">
            <span>User Name</span>
            <input type='text' required onChange={textChange}/>
            <span>Password</span>
            <input type='password' required onChange={passwordChange} />
            <button className='button' onClick={Login}>Login</button>
            <div  className="registerp">
            <p>Don't have an account ? </p>
            <Link className="registerlink" to="/register">Register</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
