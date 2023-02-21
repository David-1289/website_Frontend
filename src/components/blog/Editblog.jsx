import React, { useState } from "react"
import axios from "axios"
import "../create/create.css"
import { useParams } from "react-router-dom"
import { Link,useHistory } from "react-router-dom"

export const Editblog = () => {
  const { id } = useParams()
  const [username,setUser] = useState("")
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [hlink, setHlink] = useState("")
  const navigate = useHistory()

  const updatePost = (e) => {
    e.preventDefault()
    console.log("updatePost ",title,desc,hlink)
    axios.put(`https://finalbackend-4lo9.onrender.com/api/posts/${id}`,{
      username,title,desc,hlink
    })
    navigate.push(`/`)
  }

  const userChange = (e) => {
    setUser(e.target.value)
  }

  const titleChange = (e) => {
    setTitle(e.target.value)
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
            <img src='https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' class='image-preview' />
          </div>
          <form>
            <div className='inputfile flexCenter'>
              <input type='file' accept='image/*' alt='img' />
            </div>
            <input type='text' placeholder='Enter Username' onChange={userChange}/>
            <input type='text' placeholder='Title' onChange={titleChange}/>
            <textarea name='' id='' cols='30' rows='10' onChange={descChange}></textarea>
            <input type="text" placeholder="Place your link..." className="hlink" onChange={hlinkChange}/>
            <Link to="/" className='button' onClick={updatePost}>Update Post</Link>
            {/*<button className='button' onClick={updatePost}>update Post</button>*/}
          </form>
        </div>
      </section>
    </>
  )
}
