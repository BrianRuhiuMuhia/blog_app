// import Form from "./Form";
import { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
export default function Register(props)
{
    const history = useNavigate();
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")


  async function handleSubmit(e)
    {
        e.preventDefault()
const userData={
    name:name,
    email:email,
    password:password,
    confirmPassword:confirmPassword
}

await fetch(`${props.url}/register`,{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(userData)
 }).then((res)=>{ history("/Login");
 })
    }
 
return (
    <>
    {/* <Form method={url} func={"/Login"} link={"Login"} name="Register"/> */}
    <div className="container d-flex justify-content-center align-items-center  m-5">
             <form  className="
             shadow p-3 mb-5 bg-white rounded w-75">
            <label>Name</label>
            <input name="name"className="form-control" onChange={(e)=>{
                setName(e.target.value)
            }} value={name} required></input>
            
            <label>Email</label>
            <input name="email"className="form-control" onChange={(e)=>{
                setEmail(e.target.value)
            }} value={email} required></input>
           
            <label>Password</label>
            <input name="password"className="form-control" onChange={(e)=>{
                setPassword(e.target.value)
            }} value={password} required></input>
         
             
    <label>Confirm Password</label>
    <input name="confirmPassword" className="form-control" onChange={(e)=>{
        setConfirmPassword(e.target.value)
    }} value={confirmPassword} required/>

<div className="mt-3 t">
<button className="btn btn-primary ml-5"style={{ marginRight: '20px' }} onClick={handleSubmit}>Submit</button>
<Link to={"/Login"} className='btn btn-danger ml-3'>Login</Link>
</div>
           
        </form>
        </div>
    </>
)
}