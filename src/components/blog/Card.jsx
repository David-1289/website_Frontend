import React, { useEffect, useState } from "react"
import "./blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"
import axios from "axios"


export const Card = () => {
  const [blog,setBlog] = useState({})
  useEffect(() => {
    axios.get("https://finalbackend-4lo9.onrender.com/api/posts").then((res) =>{
      setBlog(res.data)
      console.log("bog=",res.data)
  })
    // setBlog(res)
  },[])

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {blog.length>0 ? blog.map((item) => (
            <div className='box boxItems' key={item.id}>
              <div className='img'>
                <img src={`https://finalbackend-4lo9.onrender.com/api/upload/getimage/${item._id}`} alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <p>Post By : <a href='/'> { item.category} </a> </p>
                  <h4>{item.username}</h4>
                </div>
                <Link to={`/details/${item._id}`} className='link'>
                  <h3>{item.title}</h3>
                </Link>
                <p className="postDesc">{item.desc.slice(0, 220)}...</p>
                <a href={item.hlink} className="btn" target="_blank" rel="noreferrer noopener">Buy Now</a> 
                {/*<div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{item.date}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>*/}
              </div>
            </div>
          )) : <></>}
        </div>
      </section>
    </>
  )
}
