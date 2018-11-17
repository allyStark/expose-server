const express = require('express');
const path = require('path');
const sandBox = require('../docker/DockerSandbox');
var arr = require('../docker/compilers');
var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store, {
    freeRetries: 50,
    lifetime: 3600
});

const router = express.Router();

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}

router.post('/compile', bruteforce.prevent, function(req, res)
{
    //console.log(body);
    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;

    var folder = 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path = __dirname + '/../docker/'; //current working path
    var vm_name='virtual_machine'; //name of virtual machine that we want to execute
    var timeout_value=20;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    console.log("timeout_value: " + timeout_value)
    console.log('path: ' + path)
    console.log('folder: ' + folder)
    console.log('vm_name: ' + vm_name)
    console.log('compiler_name: ' + arr.compilerArray[language][0])
    console.log('file_name: ' + arr.compilerArray[language][1])
    console.log('code: ' + code);
    console.log('output_command: ' + arr.compilerArray[language][2]);
    console.log('languageName: ' + arr.compilerArray[language][3]);
    console.log('e_arguments: ' + stdin);
    console.log('stdin_data: ' + stdin);

    webextpath = path + '/expose';

    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,webextpath,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);


    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data,exec_time,err)
    {

        //console.log("Data: received: "+ data)
    	res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
    });

});

module.exports = router;
