const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')


app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '--' + file.originalname)
    }
  })

const upload = multer({ 
      storage: storage,
      limits: {fileSize: 1000000},
      fileFilter: (req,file,cb)=>{
        checkFileType(file,cb)
      }
}).single('image')

function checkFileType(file,callback){
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(mimetype && extname){
        return callback(null,true)
    } else {
        callback('Error: images only!')
    }
}

//servir página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.post('/foto',(req, res) => {
  upload(req, res, (err)=>{
      console.log(req.body.text)
      if(err){
          res.json({res: err})
      } else {
          if(req.file == undefined){
            res.json({res:'No file selected'})
          }
          else{
              console.log(req.file)
              res.json({res:'Success!'})
          }           
      }
  })  
});

//define pasta publica
app.use(express.static('./public'))


const PORT = 3000

app.listen(PORT, () => console.log('Listening on port ' + PORT))