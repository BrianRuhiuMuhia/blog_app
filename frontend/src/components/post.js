import PostCard from "./postCard"
import Commets from "./Commets.js"
import AddCommet from "./AddCommet.js"
import {useState,useEffect} from "react"
export default function Post(props)
{
    const url=window.location.pathname
    const id=url.split("/").pop()
    const [result,setResult]=useState("")
    const [commet,setCommet]=useState([])
    async function getPost()
    {
const data=await fetch(`${props.url}/getpost/${id}`,{
    method:"GET"
})
return data.json()
    }
    useEffect(()=>{
 getPost().then((data)=>{
        setResult(data)
    })
    },[])
   
    if(!result || result.length<=0)
    {
        return ( <div className="page-loader">
        <div className="spinner"></div>
      </div>)
    }
    return (
        <div>
<PostCard image={result["image"]} id={result["_id"]} title={result["title"]} content={result["content"]} key={result["_id"]} showButtons={false}/>
<AddCommet commet={commet} setCommet={setCommet} url={props.url}/>
<Commets commet={commet} setCommet={setCommet} url={props.url}/> 
        </div>
    )
}