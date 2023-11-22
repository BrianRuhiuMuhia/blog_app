const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const Schema=mongoose.Schema;
try{
 connectToDatabase()
}
catch(err)
{
  console.log(err)

}
function connectToDatabase()
{
  
  mongoose.connect(DB_CONN)
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected!");
});

module.exports={Schema}