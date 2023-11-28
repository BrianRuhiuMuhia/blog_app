const bcrypt = require('bcrypt');
const {User,Post,Commet}=require("../database/models.js")
const {deleteData,deleteImage}=require("../utils/util.js")
let currentUser=undefined
async function register(req,res)
{
 deleteData(User)
 deleteData(Post)
    const {name,email,password}=req.body
    let newUser={}
   User.find({email:email}).then((user)=>{
    currentUser=user[0]
  if(!currentUser)
    { const saltRounds = 1;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            newUser=new User({
                name:name,
                email:email,
                password:hash
            })
            try {
                const result = await newUser.save();
                return res.status(200).json({"mssg":"Succesfully Registered"})
            } catch (err) {
                console.log(err);
                return res.status(500).json({"mssg":"there was an error"})
            }
        
        });
    })}
    else{
        return res.status(303).json({"mssg":"Already Registered"})
    }
   })
  
   ;  
}
async function login(req,res)
{
    let loggedUser=undefined
    const {name,email,password}=req.body
    console.log(email)
    User.findOne({email:email}).then((user)=>{
loggedUser=user
if(!loggedUser)
{
return res.status(400).json({"mssg":"check email if you have registered"})
}
else{
    if(name!=loggedUser.name)
    {
        return res.status(400).json({"mssg":"username not correct"})
    }
   bcrypt.compare(password, loggedUser.password, function(err, result) {
    if(result)
    {
                 currentUser=loggedUser
        return res.status(303).json({"mssg":"Logged In"})
    }
    else{
        return res.status(400).json({"mssg":"wrong password"})
    }

    })
    }
     } )
}
async function post(req,res)
{
    const {title,text}=req.body
    const image=req.file.filename;
const newPost=new Post({
title:title,
content:text,
image:image,
author:currentUser._id
})
try{
    const result=await newPost.save()
    return res.status(200).json({mssg:"successful upload"})
}
catch(err)
{
    console.log(err)
    return res.status(500).json({mssg:"something went wrong"})
}
}
async function getAllPosts(req,res)
{
    try{
     Post.find().then((posts)=>{

return res.status(200).json(posts)
})   
    }
    catch(err)
    {
console.log(err)
return res.status(500).json({"mssg":"server err"})
    }

}
function getOwnPosts(req,res)
{
    try{
        Post.find({author:currentUser._id}).then((posts)=>{
   return res.status(200).json(posts)
   })   
       }
       catch(err)
       {
   console.log(err)
   return res.status(500).json({"mssg":"server err"})
       }
   
}
async function deletePost(req,res)
{
const {id}=req.params
try{
 const deletedPost = await Post.findByIdAndDelete({"_id":id})
 deleteImage(deletePost["image"])
    
return res.status(200).json({"mssg":"sucessfully deleted"})
}
catch(err)
{
    console.log(err)
    return res.status(500).json({"mssg":"server err"})
}
}
function updatePost(req,res)
{

    const {id}=req.params
    const {title,text}=req.body
    const image=req.file.filename;
    try{
        Post.updateOne({ _id: id }, { $set: { title:title,
            content:text,
            image:image} }, function(err, res) {
        if(err)
        {
            console.log(err)
            return res.json({"mssg":"update failed"})
        }
        else{
            return res.json({"mssg":"update was successful"})
        }
          })
    }
    catch(err)
    {
        console.log(err)
        return res.json({"mssg":"update failed"})
    }

}
async function getSinglePost(req,res)
{
    const {id}=req.params

    try{
        Post.findOne({_id:id}).then((post)=>
        {
return res.status(200).json(post)
        })
    }
    catch(err)
    {
console.log(err)
return res.status(500).json({"mssg":"error in the srver"})
    }
}
async function getCommets(req,res)
{
    const {id}=req.params
    try{
        Commet.find({author:id}).then((commets)=>
        {
            
return res.status(200).json(commets)
        })
    }
    catch(err)
    {
console.log(err)
return res.status(500).json({"mssg":"error in the srver"})
    }
}
async function addCommet(req,res)
{
    const {commet}=req.body
    console.log(req.body)
    const {id}=req.params
    const newCommet=new Commet({
        commet:commet,
        author:id,
        commeted:currentUser.name
    })
    try{
const result =await newCommet.save()
return res.status(200).json({"mssg":"commet saved"})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({"mssg":"server error"})
    }

}
async function deleteCommet(req,res)
{
const {id}=req.params 
try{
    await Commet.findByIdAndDelete({"_id":id})
      
  return res.status(200).json({"mssg":"sucessfully deleted"})
  }
  catch(err)
  {
      console.log(err)
      return res.status(500).json({"mssg":"server err"})
  }
} 
module.exports={register,login,post,getAllPosts,getOwnPosts,getSinglePost,deletePost,updatePost,getCommets,addCommet,deleteCommet}