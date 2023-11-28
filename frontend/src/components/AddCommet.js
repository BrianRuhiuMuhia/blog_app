import {useState,useRef,useEffect} from 'react'
export default function AddCommet(props)
{
const [data,setData]=useState({})
const input=useRef()
// useEffect(() => {
//     if (data !== "") {
//       sendData();
//       props.setCommet((prevcommet)=>{
// return [...prevcommet,data]
//       })
//     }
//   }, []);
async function sendData()
{
    const url=window.location.pathname
    const id=url.split("/").pop()
    const obj={}
    obj["commet"]=props.commet
    await fetch(`${props.url}/addcommet/${id}`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)
    })

}
    return (<div className="commet">
        <div className="add-commet">
        <input type="text" className="input-commet" placeholder="Add Commet" ref={input}></input>
        <div>
            <div className="commet-btns">
<button className="btn btn-primary" onClick={()=>{
    setData(String(input.current.value))
    props.setCommet((prevcommet)=>{
        return [...prevcommet,data]
    })
    

}}>commet</button>
<button className="btn btn-danger">cancel</button>      
            </div>

        </div>
    </div>
        </div>)}