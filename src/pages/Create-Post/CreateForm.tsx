
import {useForm} from 'react-hook-form';
import * as yup from"yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { auth, db } from '../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Navbar from '../../Component/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { title } from 'process';
import { useState } from 'react';
export const CreateForm=()=>{
   
    const navigate=useNavigate()
const [user]=useAuthState(auth)
    interface CreateFormData{
title:string,
description:string
    }

 const schema=yup.object().shape({
    title:yup.string().required("You must add a title"),
    description:yup.string().required("you must add a description")
 })
 const {register,handleSubmit,formState:{errors}}=useForm<CreateFormData>(
    {
        resolver:yupResolver(schema)
    }
 )


const Postref=collection(db,"post")


const onCreatePost= async(data:CreateFormData)=>{
await addDoc(Postref,{
   
    ...data,
     username:user?.displayName,
    userId:user?.uid
})
navigate("/")

}
const [title,setTitle]=useState("")

    return <div >
        <Navbar/>
        <div className="grid gap-3 place-content-center h-[100vh] w-full bg-cover " style={{ backgroundImage: `url(https://source.unsplash.com/900x300/?$tech)` }}>
  <form action="" className="grid gap-2" onSubmit={handleSubmit(onCreatePost)}>
    <input  className="border-4 p-5 " type="text" placeholder="Title..." {...register("title")} />
    <p style={{ color: "red" }}>{errors.title?.message}</p>

    <textarea rows={10} cols={50} className="border-4" placeholder="Description..." {...register("description")} id=""></textarea>
    <p style={{ color: "red" }}>{errors.description?.message}</p>

    <input className="bg-slate-900 p-3 text-white rounded-md" type="submit" value="Create" />
  </form>
</div>
</div>
}