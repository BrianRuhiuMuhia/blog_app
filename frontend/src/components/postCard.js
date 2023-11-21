export default function postCard(props)
{
    const url="http://localhost:5000/uploads"

 
    return (
    <div className="post">
         <div className="post-card">
<div><img src={`http://localhost:5000/uploads/${props.image}`}></img></div>
<div>
    <span className="title">{props.title}</span>
    <span className="text">{props.content}</span>

    {props.showButtons === true && <div>
        <button>update</button>
        <button onClick={()=>{
            props.deletePost(props.id)
        }}>delete</button>
    </div>}
</div>
    </div>
    </div>  


   )
}