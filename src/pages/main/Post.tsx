import React, { useState,useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post as IPost } from '../Home'
import {FcDislike, FcLike, FcLikePlaceholder} from "react-icons/fc"
import { collection, addDoc, query, where, getDocs, deleteDoc, getDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfig'
interface Props{
 post:IPost
}

interface like{
    likeId:string,
userId:string
}


const Post = (props:Props) => {
    const {post}=props
const [user] = useAuthState(auth)
const [likes,setLikes]=useState<like[] | null>(null)
    const LikedRef=collection(db,"likes")
 const  LikesDoc=query(LikedRef,where("postId","==",post.id))

const getlikes=async()=>{
   const data= await getDocs(LikesDoc)
//    (data.docs.length)
   setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id  })));
   
}

const addLike= async()=>{
    try{
const newdoc=await addDoc(LikedRef,{
userId:user?.uid,
postId:post.id,
})
if(user){
setLikes((prev)=> prev?[...prev,{userId:user?.uid,likeId:newdoc.id }]:[{userId:user?.uid,likeId:newdoc.id }])
// navigate("/")

}
}catch(err){
    console.log(err);
    
}
}

const removeLike= async()=>{
    try{
        const  LikesToDeleteQuery=query(LikedRef,where("postId","==",post.id), where("userId","==",user?.uid))
        const likeToDeleteData=await getDocs(LikesToDeleteQuery)
        const likeId=likeToDeleteData.docs[0].id
        const likeToDelete=doc(db,"likes",likeId)
                await deleteDoc(likeToDelete)
                if(user){
                setLikes((prev)=>prev && prev?.filter((like)=>like.likeId===likeId))
                // navigate("/")

                }
                }catch(err){
                    console.log(err);
                    
                }
                }

const hasUserLiked=likes?.find((like)=>like.userId===user?.uid)


useEffect(() => {
getlikes()
}, [])
  return (
    <div>
     <div className="   flex items-center justify-center bg-gray-200">

{/* <!-- Card --> */}
<div className="bg-white h-fit max p-8 w-[32rem] my-10 "> 
  <img src={`https://source.unsplash.com/900x300/?${post.title})`} alt="" />
  {/* <!-- Header --> */}
  <header className="flex font-light text-sm">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90 -ml-2"  viewBox="0 0 24 24" stroke="#b91c1c">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
    </svg>
    <p>TECH BLOG</p>
  </header>

  {/* <!-- Title --> */}
  <h2 className="font-bold text-3xl mt-2">
   {post.title}
  </h2>

  {/* <!-- Tags --> */}
  <p className="mt-5"> 
    By: 
    <a href="#" className="text-red-600">Enaikele </a>, 
    <a href="#" className="text-red-600"> Omoh Kelvin </a>
  </p>

  <p> 
    Additional credits: 
    <a href="#" className="text-red-600"> E3 </a>, 
    <a href="#" className="text-red-600"> Kingsley</a>
  </p>
<div>
     {/* <!-- Description --> */}
  <h3 className="font-bold text-xl mt-8"> Description </h3>
  <p className="font-light"> {post.description} </p>
 
 <button onClick={hasUserLiked?removeLike :addLike}  className=" flex items-centerfont-semibold py-2 px-5 text-sm mt-6  items-center group">
    <p  className="flex">{hasUserLiked? <><FcLikePlaceholder  size={30}/></>  :<FcLike size={30}/>} </p>
  </button>
  {likes &&<p>likes:{likes?.length}</p>}

  <p>@{post.username}</p>
</div>
 
  {/* <!-- Button --> */}
  <button  className="bg-red-600 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group">
    <p> READ MORE </p>
    <svg xmlns="http://www.w3.org/2000/svg"className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
 
 

  </div>

</div> 
    </div>
  )
}

export default Post
// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error('Function not implemented.')
// }

