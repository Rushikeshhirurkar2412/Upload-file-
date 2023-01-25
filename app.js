const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()
const port = 4550
    // data store in diskMemory
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, cb) {
        //change file name
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// get data in buffer
// const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//goto frontend
app.use('/upload_files', express.static(path.join(__dirname, 'file-upload-example')));


//post

app.post("/upload_files", upload.array("myFiles"), uploadFiles);

function uploadFiles(req, res) {
    let { name } = req.body
    console.log(req.files);
    console.log(name);
}

app.listen(port, () => console.log(`port no. is ${port}`))