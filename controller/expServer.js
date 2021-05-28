const express = require('express')
const fileUpload = require ('express-fileupload')
const app = express()
const api = require('/home/nir/GitProjects/Anomaly-Detection-Server/model/build/Release/model')
const path = require('path')
const fetch = require("node-fetch");

app.use(express.static('/home/nir/GitProjects/Anomaly-Detection-Server/view/'))
app.use(fileUpload())

global.__basedir = __dirname.replace("/controller",'/');


// if false- reads data as pairs of keys and values.
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res)=> {
    res.sendFile(__basedir +'view/view.html')
})


app.post('/upload',(req, res) => {
    //res.write('Processing')

    if ("TrainFile" in req.files && "TestFile" in req.files) {
        var test_data = req.files.TestFile.data
        var train_data = req.files.TrainFile.data
        var model = req.body.models
        // var fs = require('fs')

        // fs.writeFile("/home/nir/GitProjects/Anomaly-Detection-Server/files/test.csv", test_data, function(err) {
        //     if(err) {
        //         return console.log(err)
        //     }
        // }); 
        // fs.writeFile("/home/nir/GitProjects/Anomaly-Detection-Server/files/train.csv", train_data, function(err) {
        //     if(err) {
        //         return console.log(err)
        //     }
        // }); 
        
        
        var simpleHybridFlag

        if (model === "linear")
            simpleHybridFlag = 1
        else
            simpleHybridFlag = 2

        api.calc(simpleHybridFlag)
        
        const anomalies = require('../files/anomaly-report.json');

        for (var o in anomalies) {
            res.write(o+". "+anomalies[o].cor_feat+": "+anomalies[o].time+'\n')            
        }

    }
    res.end()

})

app.listen(8080)
