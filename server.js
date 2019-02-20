require('dotenv').config();
var path = require('path');
var fs = require('fs');
var express = require('express');
var server = express();
var helpers = require('./helpers.js');
var shell = require('shelljs');

console.log("Starting the API...:");

server.get('/',function(req,resp){
    resp.send("All is OK.");
    resp.status(200);
});

server.get('/switchvpn',function(req,resp){
    var server = req.param('server');
    var certificatesPath = path.join(process.env.VPN_ROOT, process.env.VPN_PROTOCOL);
    console.log("Looking for certificates in: " + certificatesPath);
    var certificate = helpers.filesFromDirectory(certificatesPath,  process.env.VPN_CERTIFICATE_EXTENSION, server)[0];
    var message = "";
    if(certificate){
        var passwordNode = "auth-user-pass";
        console.log("Applying certificate:" + certificate);

            fs.readFile(certificate, 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }

                var modifiedCertificate = data.replace('auth-user-pass', ('auth-user-pass '+ process.env.VPN_CREDENTIALS_FILE));

                fs.writeFile(path.join(process.env.VPN_ROOT, process.env.VPN_CLIENT_CONFIG), modifiedCertificate, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            });

        shell.exec(process.env.VPN_SERVICE+' restart');
        message = "Switched to server : "+server;
    }else{
         message = "Unable to find server "+server;
    }

    console.log(message);
    resp.send(message);
    resp.status(200);
});

server.listen(process.env.API_PORT);

console.log("API is Running on port: "+process.env.API_PORT);