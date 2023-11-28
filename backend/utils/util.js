const multer  = require('multer')
const path=require("path")
const fs=require("fs")
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        cb(null, "./uploads"); 
    }, 
    filename: function (req, file, cb) { 
        cb(null, file.originalname); 
    }, 
}); 
const upload = multer({ storage: storage,limits: { fileSize: 1000000000000 } , dest: 'uploads/',fileFilter: function(req, file, cb) {
  try{
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
     cb(new Error('Please upload a JPG or PNG image.'));
      
    }
    cb(null, true);
  }
  catch(err){
console.log(err)

  }
    
  }});
async function deleteData(Model)
{
    try{
        await Model.deleteMany({})
  console.log("succefull deleted")
  }
  catch(err)
  {
      console.log(err)
  }
}
function deleteImage(filePath)
{
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File deleted successfully');
    });
  } else {
    console.log('File does not exist');
  }
}
module.exports={deleteData,deleteImage,upload}