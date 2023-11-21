const mongoose=require("mongoose")
const {Schema}=require("./db.js")
const userSchema=new Schema({
    name:{type:String,
    required:true},
    password:{type:String,
        required:true},
    email:{type:String,
    required:true,unique:true},
    date:{type:Date,
    default:Date.now},
    image:{
      type:String,
      required:false
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})
const postSchema= new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,unique:false
    },
    image:{
        type:String,
        required:true
    },
    commets: [{ type: Schema.Types.ObjectId, ref: 'Commet' }]
  });
  const commetSchema=new Schema({
    commet:{
      type:String,
      required:true
    },
    date:{
      type:Date,
      default:Date.now
    },
    author:{
      type:Schema.Types.ObjectId,
      ref: 'Post',
      required: false
    },
    commeted:{
      type:String,
      required:true
    }
    
  })
  module.exports={
User:mongoose.model("User",userSchema),
Post:mongoose.model("Post",postSchema),
Commet:mongoose.model("Commet",commetSchema)
  }