import { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
export default function NewPost(props)
{
    const history = useNavigate();
    const [image,setImage]=useState("")
    const [title,setTitle]=useState("")
    const [text,setText]=useState("")



  async function handleSubmit(e)
    {
        e.preventDefault()
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(image.type)) {
            console.error('Invalid image type');
            return;
          }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('text', text);
        

await fetch(`${props.url}/post`,{
    method:"POST",
    body:formData
 }).then(async (res)=>{
  
    console.log(formData.entries) 
 })
    }
 
return (
    <>
    {/* <Form method={url} func={"/Login"} link={"Login"} name="Register"/> */}
    <div className="container">
             <form  className="form
             shadow p-3 mb-5 bg-white rounded w-75" encType="multipart/form-data">
            <label>Image</label>
            <input type="file" name="image"className="form-control" onChange={(e)=>{
                setImage(e.target.files[0])
            }}  required></input>
            
            <label>Title</label>
            <input type="text" name="title"className="form-control" onChange={(e)=>{
                setTitle(e.target.value)
            }} value={title} required></input>
           
            <label>Text</label>
            <textarea required onChange={(e)=>{
                setText(e.target.value)
            }}></textarea>
<div className="mt-3 t">
<button className="btn btn-primary ml-5"style={{ marginRight: '20px' }} onClick={handleSubmit}>Submit</button>
</div>
           
        </form>
        </div>
    </>
)
}