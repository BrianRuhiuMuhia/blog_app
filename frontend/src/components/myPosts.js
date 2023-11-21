import {useState,useEffect} from 'react';
import PostCard from "./postCard";

export default function MyPosts(props)
{
    let posts=undefined
    let postId=undefined
    const [data,setData]=useState([])
    async function getData()
    {
        let result=undefined
        try{
            result=await fetch(`${props.url}/usersposts`,{
            method:"GET"
        })
        }
        catch(err)
        {
            return 
        }
        
        const data=await result.json()
        return data
    }
    useEffect(()=>{
getData().then((result)=>{  
    setData(result)

})
    },[])
    if(!data || data.length<=0)
    {
        return ( <div className="page-loader">
        <div className="spinner"></div>
      </div>)
    }
    else{
  
         posts = data.map((post) => {
            return <PostCard image={post["image"]}  id={post["_id"]} title={post["title"]} url={props.url} content={post["content"]} key={post["_id"]} showButtons={true} deletePost={deletePost}/>
          });
    }
    async function deletePost(id)
    {
        postId=id
await fetch(`${props.url}/delete/${id}`,{
    method:"DELETE"

})
    }
    if(postId!==undefined)
    {
    const updatedData = data.filter(post => post._id !== postId);
    setData(updatedData);
    }
   
return(
    <>
      {posts}
      </>
)
}