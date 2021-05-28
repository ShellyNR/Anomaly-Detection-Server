const express = require('express')
const fileUpload = require ('express-fileupload')
const app = express()
const api = require('/home/nir/GitProjects/Anomaly-Detection-Server/model/build/Release/model')
const path = require('path')
const fetch = require("node-fetch");

app.use(express.static('/home/nir/GitProjects/Anomaly-Detection-Server/view/'))
app.use(fileUpload())

// if false- reads data as pairs of keys and values.
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res)=> {
    res.sendFile('/home/nir/GitProjects/Anomaly-Detection-Server/view/view.html')
})



/**
app.post('/upload',(req, res) => {
    //console.log(req.files.TrainFile)
    //res.write(req.files.TrainFile.toString())
    res.write(api.calc(path.dirname(req.files.TrainFile.name.toString()), req.files.TestFile.name, 1).msg)
    /** 
    res.write('Processing')
    if (req.files.TrainFile != null && req.files.TestFile != null) {
        var train = req.files.TrainFile
        var test = req.files.TestFile
        // train.data.toString(), test.data.toString()
    }
    
    res.end()

})
**/

function jsonToTable(obj) {
    var ret = "";
    for (var o in obj) {
        var data = obj[o];
        if (typeof data !== 'object') {
            ret += "<li>" + o + " : " + data + "</li>";
        } else {
            ret += "<li>" + o + " : " + jsonToTable(data) + "</li>";
        }
    }
    return "<ul>" + ret + "</ul>";
}

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
        
        console.log(model)
        
        api.calc(1)

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

        const anomalies = require('../files/anomaly-report.json');

        for (var o in anomalies) {
            res.write(o+". "+anomalies[o].cor_feat+": "+anomalies[o].time+'\n')            
        }

    }
    res.end()

})

app.listen(8080)
