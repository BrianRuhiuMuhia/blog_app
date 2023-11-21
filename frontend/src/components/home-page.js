import {useState,useEffect} from 'react';
import PostCard from "./postCard";
import {Link} from 'react-router-dom'
import "./style.css"
export default function Home(props)
{
    let posts=undefined
    const [data,setData]=useState([])
    async function getData()
    {
        let result=undefined
        try{
            result=await fetch(`${props.url}/posts`,{
            method:"GET"
        })
        }
        catch(err)
        {
            return 
        }
        
        const data=await result.json()
        console.log(data)
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
            return <Link to={`/Post/${post["_id"]}`}><PostCard image={post["image"]} title={post["title"]} url={props.url} content={post["content"]} showButtons={false} id={post["_id"]} key={post["_id"]}/></Link>
          });
    }

    return (
       <>
       {posts}
       </>
    )
}