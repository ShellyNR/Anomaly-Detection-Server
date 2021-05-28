global.__basedir = __dirname.replace("/controller",'/');


const express = require('express')
const fileUpload = require ('express-fileupload')
const app = express()
const api = require(__basedir + '/model/build/Release/model')
console.log("Server Running")
const path = require('path')
const fetch = require("node-fetch");
const { StringDecoder } = require('string_decoder')


app.use(express.static(__basedir + '/view/'))
app.use(fileUpload())


// if false- reads data as pairs of keys and values.
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res)=> {
    res.sendFile(__basedir + 'view/view.html')
})

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
    res.write('Processing...\n')

    if ("TrainFile" in req.files && "TestFile" in req.files) {
        var test_data = req.files.TestFile.data
        var train_data = req.files.TrainFile.data
        var model = req.body.models
        var simpleHybridFlag
        if (model === "linear")
            simpleHybridFlag = 1
        else
            simpleHybridFlag = 2
        
            var fs = require('fs')
        fs.writeFileSync(__basedir + "files/test.csv", test_data, function(err) {
            if(err) {
                return console.log(err)
            }
        }); 
        fs.writeFileSync(__basedir + "files/train.csv", train_data, function(err) {
            if(err) {
                return console.log(err)
            }
        }); 
        console.log("Received files.\nDetecting...")
        api.detectAnomalies(simpleHybridFlag)
        const anomalies = require(__basedir + 'files/anomaly-report.json');

        for (var o in anomalies) {
            res.write(o + ". " + anomalies[o].cor_feat + ": " + anomalies[o].time+'\n')            
        }
        console.log("Finished Detection.")
        fs.unlinkSync(__basedir + "files/test.csv")
        fs.unlinkSync(__basedir + "files/train.csv")
        fs.unlinkSync(__basedir + "files/anomaly-report.json")
    }
    res.end()

})

app.listen(8080)
