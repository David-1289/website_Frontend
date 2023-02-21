import React, { useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import img from "../../assets/images/b5.jpg"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { blog } from "../../assets/data/data"
import axios from "axios"
import { useHistory } from "react-router-dom"

export const DetailsPages = () => {
  const { id } = useParams()
  const [blogs, setBlogs] = useState(null)
  const history = useHistory()

  const deletePost = async() =>{
          console.log("id =",id, localStorage.getItem("Name"))
           const data = {
            username: localStorage.getItem("Name")
           }
          const res = await axios.post(`https://finalbackend-4lo9.onrender.com/api/posts/${id}`,data)

          console.log("Post deleted!!! " ,res)
          if(res.data.status === "You can delete only your post!"){
            alert("You can delete only your post!")
            return
          }
          else if(res.data.status === "ok"){
            alert("Post deleted!!!")
            history.push(`/`)
          }
          else{
            alert("Something went wrong!!!")
          }
  }
  const updatePost = () =>{
    history.push(`/edit/${id}`)
}

  useEffect(() => {
    // console.log("id =",id)
    axios.get(`https://finalbackend-4lo9.onrender.com/api/posts/${id}`).then((res) => {
      setBlogs(res.data)
      // console.log("res=",res)
    })
    if (blogs) {
      setBlogs(blogs)
    }
  }, [])

  return (
    <>
      {blogs ? (
        <section className='singlePage'>
          <div className='container'>
            <div className='left'>
              <img src={blogs.cover} alt='' />
            </div>
            <div className='right'>
              <div className='buttons'>
                <button className='button' onClick={updatePost}>
                  <BsPencilSquare />
                </button>
                <button className='button' onClick={deletePost}>
                  <AiOutlineDelete />
                </button>
              </div>
              <p> Post by : {blogs.username}</p>
              <h1>{blogs.title}</h1>
              <p>{blogs.desc}</p>
              <a href={blogs.hlink} target="_blank" rel="noreferrer noopener" className="btn">Shop Now</a>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
