const multer  = require('multer')
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
module.exports={upload,deleteData}