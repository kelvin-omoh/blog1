import { getDocs,collection, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import  Post  from './main/Post'
import { db } from '../FirebaseConfig'
  export interface Post{
    id:string,
    userId:string,
    username:string,
    description:string,
    title:string,
  }
  const Home = () => {

  const Postref=collection(db,"post")
  const [postList,setPostlist]=useState<Post[] | null>(null)
 
 const getPost=async()=>{
const data=await getDocs(Postref)
setPostlist(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[])

 }
 useEffect(()=>{
getPost()
 },[])

  return (
    <div>
        <Navbar/>
      {postList?.map((post)=>(
      <Post post={post} />
      ) ) }
   </div>
  )
}

export default Home
