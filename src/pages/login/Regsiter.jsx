import React,{useState} from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { Link , useHistory} from "react-router-dom"
import axios from "axios"



export const Regsiter = () => {
  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const navigate = useHistory()

  const Regsiter = async(e) => {
    e.preventDefault()
    const res = await axios.post("https://finalbackend-4lo9.onrender.com/api/auth/register",{
      email,username,password,confirmpass
    })
    console.log("res  ", res)
    if(res.data.status === 'ok'){
      setUsername('')
      setEmail('')
      setPassword('')
      navigate.push(`/login`)
      window.location.reload()
  }
  else{
      alert(res.data.error)
  }
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const userChange = (e) => {
    setUsername(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const passcodeChange = (e) => {
    setConfirmpass(e.target.value)
  }
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h1>Register</h1>
            </div>
          </div>

          <form className="form">
            <span>Email address *</span>
            <input type='text' required  onChange={emailChange}/>
            <span>Username *</span>
            <input type='text' required onChange={userChange}/>
            <span>Password *</span>
            <input type='password' required onChange={passwordChange}/>
            <span>Confirm Password *</span>
            <input type='password' required onChange={passcodeChange}/>
            <button className='button' onClick={Regsiter}>Register</button>
            <div className="loginp" >
            <p>Back to login ?</p>
            <Link className="loginlink" to="/login">Login</Link>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}
