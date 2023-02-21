import React, { useEffect, useState } from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"
import axios from "axios"

export const Home = () => {
  const [posts,setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async() => {
      const res = await axios.get("https://finalbackend-4lo9.onrender.com/api/posts")
      // console.log(res.data)
    }
    fetchPosts()
  })
  return (
    <>
      {/*  <Slider />*/}
      <Category />
      <Card />
    </>
  )
}
