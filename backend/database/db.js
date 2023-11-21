const mongoose=require("mongoose")
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
  
  mongoose.connect("mongodb+srv://brianruhiu7504:aExyv2FKWAlugrew@cluster0.vtuw7ja.mongodb.net/?retryWrites=true&w=majority")
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected!");
});

module.exports={Schema}