const express = require('express')
const fileUpload = require ('express-fileupload')
const app = express()

app.use(express.static('../view'))
app.use(fileUpload())

// if false- reads data as pairs of keys and values.
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res)=> {
    res.sendFile('C:\\Users\\Shelly Nahir\\Desktop\\uni\\ass5\\view\\view.html')
})

app.post('/upload',(req, res) => {
    res.write('Processing')
    if (req.files.TrainFile != null && req.files.TestFile != null) {
        var train = req.files.TrainFile
        var test = req.files.TestFile
        // train.data.toString(), test.data.toString()
    }
    res.end()

})
app.listen(8080)