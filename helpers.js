var path = require('path');
var fs = require('fs');

var exports = module.exports = {
       filesFromDirectory: function (directory, extension, nameContains){
            var result = [];
            if(fs.existsSync(directory)){
                var files = fs.readdirSync(directory);
                for(var i=0;i<files.length;i++){
                    var file = files[i];
                    if(file.endsWith(extension) && file.includes(nameContains)){
                        result.push(path.join(directory, file));
                    }
                }
            }else{
                console.log("Unable to find path: "+directory);
            }
            return result;
        }
};