import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../FirebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import {AiOutlineMenu , AiOutlineClose} from 'react-icons/ai'
const Navbar = () => {
  const [ci ,setci]= useState(false);
  const toggle=()=>{
  setci(!ci)
  }
    const [user] = useAuthState(auth)
    // console.log(user?.photoURL);
    const logout= async ()=>{
        await signOut(auth)
    }
    
  return (
    <div className=' bg-black py-2  text-white flex items-center justify-between px-8 text-lg font-[fantasy] relative gap-4'>

        <div className=' from-[#626262] font-extrabold text-[1.3em] text-[#fbf9f9] to-blue-900 rounded-md bg-gradient-to-br  p-5'>
            Blog
        </div>
        <div className='hidden md:flex justify-center items-center gap-[3em]'>
          <ul className=' flex gap-9'>
            <li>   <Link to="/">Home</Link> </li>
            <li>  {
            ! user ? (
              <Link to="/login">Login</Link> 
            )
           :
           (
              <Link to="/createpost">Create Post</Link>
           )
         } </li>
         <li></li>
          </ul>
       
         
        
         <div className=' flex justify-center items-center'>
             {
                auth.currentUser? 
               
                <>
                   <p className=' px-9 text-blue-400'>welcome {user?.displayName}!</p>
             <img src={user?.photoURL|| ''} width={30}  />
             <button onClick={logout} className=' bg-gradient-to-tl  mx-5 text-[1.1em] font-bold border-[.2em] border-[#a53082] from-black to-[#f71d1d]  rounded-full p-3 text-[#fefefec9]'>
            Log-out
         </button>
                </>
                :
                <></>
             }

           
         </div>
        
       
        </div>
        <ul className=" flex md:hidden">
            <button onClick={toggle}> 
               {ci ?  <AiOutlineClose size={30}/>: <AiOutlineMenu size={30}/> }
            </button>
           </ul>

           <ul className={`flex md:hidden text-[1.2em] gap-9 flex-col w-screen ${ci?'left-0':'left-[-1000vw]'}  duration-300  ease-in-out   text-center   absolute  text-[#123fa]  bg-[#041942ba] p-9 h-[30vh] top-[3.9em] `}>
           <li className='hover:text-[red]'>   <Link to="/">Home</Link> </li>
            {
            ! user ? (
              <li> <Link to="/login">Login</Link> </li>
            )
           :
         
           (
                <li className='hover:text-[red]'><Link to="/createpost">Create Post</Link></li>
           )
         } 
           </ul>
    </div>
  )
}

export default Navbar
