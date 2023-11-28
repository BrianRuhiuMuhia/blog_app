import {useState,useEffect} from "react"
import Commet from "./Commet"
export default function Comments(props)
{
    let commets=undefined
    const [commet,setCommet]=useState([])
    async function getCommets()
    {
        const url=window.location.pathname
        const id=url.split("/").pop()
const result=await fetch(`${props.url}/getCommets/${id}`,{
    methods:"GET"
})
return await result.json()
    }
    useEffect(()=>{
//        getCommets().then((data)=>{
// setCommet(data)
//     })   
    },[])
  
    if(props.commet.length<1 || props.commet===undefined)
    {
        return ( <div className="loader">
        <div className="spinner"></div>
      </div>)
    }
    else{
        
        commets=props.commet.map((obj)=>{
return <Commet commet={obj} key={obj}/>
        })
    }

    return (<div>
        {commets}
    </div>)
}