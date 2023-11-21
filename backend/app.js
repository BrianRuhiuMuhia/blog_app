const express=require("express")
const app=express()
const dotenv=require("dotenv")
const cors = require('cors');
const {router}=require("./routes/routes.js")
const path=require("path")
dotenv.config()
app.use(cors());
// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });
app.use("/blog/api",router)
app.all("*",function(req,res)
{
return res.status(404).send("<h1>Page Not Found</h1>")
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
  

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})