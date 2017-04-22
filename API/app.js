/*
        *File: app.js
        *Author: Asad Memon / Osman Ali Mian
        *Last Modified: 5th June 2014
        *Revised on: 30th June 2014 (Introduced Express-Brute for Bruteforce protection)
*/


var express = require('express');
var arr = require('./compilers');
var sandBox = require('./DockerSandbox');
var bodyParser = require('body-parser');
var app = express.createServer();
var port = 80;


var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.all('*', function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}


app.post('/compile',bruteforce.prevent,function(req, res) 
{

    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;
<<<<<<< HEAD
=======
    
    console.log(req.body);
   
    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name='virtual_machine'; //name of virtual machine that we want to execute
    var timeout_value=20;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);

>>>>>>> eb5ba51ff3e313e6556f2e3e52c59ced0f626f27

    res.send({code:code});
   
});


app.get('/', function(req, res) 
{
    res.sendfile("./index.html");
});

app.get('/loaderio-aed44d10990422aaf6db177da41b9e6e/', function(req, res)
{
  res.sendfile("./loaderio-aed44d10990422aaf6db177da41b9e6e.txt");
});

app.get('/loaderio-aed44d10990422aaf6db177da41b9e6e.html', function(req, res)
{
  res.sendfile("./loaderio-aed44d10990422aaf6db177da41b9e6e.html");
});

app.get('/loaderio-aed44d10990422aaf6db177da41b9e6e.txt', function(req, res)
{
  res.sendfile("./loaderio-aed44d10990422aaf6db177da41b9e6e.txt");
});

console.log("Listening at "+port)
app.listen(port);
