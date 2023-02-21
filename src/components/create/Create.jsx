import React, { useEffect, useState } from "react"
import "./create.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import axios from "axios"
import { v4 as uuid } from 'uuid';
import { Link,useHistory } from "react-router-dom"

export const Create = () => {

  const [title,setTitle] = useState("")
  const [username,setUser] = useState("")
  const [desc,setDesc] = useState("")
  const [hlink, setHlink] = useState("")
  const [file, setfile] = useState('')
  const navigate= useHistory()

  useEffect(() => {
    if(localStorage.getItem('Name') !== null || localStorage.getItem('Name') !== undefined || localStorage.getItem('Name') !== ''){
      setUser(localStorage.getItem('Name'))
    }
  },[])

  const createPost = async(e) => {
    e.preventDefault();
    const _id = uuid();
    if(localStorage.getItem('Name') === null || localStorage.getItem('Name') === undefined || localStorage.getItem('Name') === ''){
      alert("Please login first")
      return;
    }
    console.log("name ",username)
    const res = await axios.post("https://finalbackend-4lo9.onrender.com/api/posts",{
      username,title,desc,hlink
    })
    // if(res.data.status === "user does not exist"){
    //   alert("user does not exist")
    //   return;
    // } 
    console.log("res ", res);
    const data = new FormData()
    data.append('file',file)
    data.append('caption',res.data._id)
    console.log(file.type)
    const resp = await axios.post('https://finalbackend-4lo9.onrender.com/api/upload/postfile',data);
    console.log(resp)
    setfile('')
    navigate.push(`/`)
  }

  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  const userChange = (e) => {
    setUser(e.target.value)
  }

  const descChange = (e) => {
    setDesc(e.target.value)
  }

  const hlinkChange = (e) => {
    setHlink(e.target.value)
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img '>
            {/* <img src='https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' class='image-preview' />
             */}
          </div>
          <form>
              <input className='' type="file"  onChange={(e)=> setfile(e.target.files[0])}/>
              <br/>
            <div className='inputfile flexCenter'>
              <input type='file' accept='image/*' alt='img' />
            </div>
            {/* <input type='text' placeholder='Enter Username' onChange={userChange}/> */}
            <input type='text' placeholder='Title' onChange={titleChange}/>

            <textarea name='' id='' cols='30' rows='10' onChange={descChange}></textarea>
            <input type="text" placeholder="Place your link..." className="hlink" onChange={hlinkChange}/>
            <Link to="/" className='button' onClick={createPost}>Create Post</Link>
          </form>
        </div>
      </section>
    </>
  )
}
