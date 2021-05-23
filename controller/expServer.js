const express = require('express')
const fileUpload = require ('express-fileupload')
const app = express()
//const api = require('/home/barsh/metkadem2/A2/model\\build\\Release\\model')


app.use(express.static('../view'))
app.use(fileUpload())

// if false- reads data as pairs of keys and values.
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res)=> {
    res.sendFile('/home/barsh/metkadem2/A2/view/view.html')
})

app.get('/anomaly', (req, res)=> {
        jsonAnomaly = {
                        "1": {
                            "f1": "alt",
                            "f2": "speed",
                            "lineNum": "12"
                        },
                        "2": {
                            "f1": "bar",
                            "f2": "shelly",
                            "lineNum": "20"
                        },
                        "3": {
                            "f1": "roi",
                            "f2": "nir",
                            "lineNum": "55"
                        },
                        "4": {
                            "f1": "Tel aviv",
                            "f2": "Ramat gan",
                            "lineNum": "2"
                        },

                    }
    res.write(JSON.stringify(jsonAnomaly))
    res.end()
})

app.post('/upload',(req, res) => {
    res.write('Processing')

    if ("TrainFile" in req.files && "TestFile" in req.files) {
        var test_data = req.files.TestFile.data
        var train_data = req.files.TrainFile.data
        var model = req.body.models
        var fs = require('fs')

        fs.writeFile("temp_files/test.csv", test_data, function(err) {
            if(err) {
                return console.log(err)
            }
        }); 
        fs.writeFile("temp_files/train.csv", train_data, function(err) {
            if(err) {
                return console.log(err)
            }
        }); 
        
        console.log(model)
    }
    res.end()

})
app.listen(8080)
