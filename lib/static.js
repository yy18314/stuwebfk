var url = require("url"),fs = require("fs");
function url2path(url_str){
    var urlObj = url.parse(url_str);
    var path = urlObj.path;
    return path;
}

module.exports = function static(parent_path){
    return function(req,res,next){
        var path = url2path(req.url);
        function callback(err,data){
            if(err){
                req.statusCode = 404;
            }else{
                res.write(data);
            }
            res.end();
        }
        fs.readFile(parent_path + path,callback);
    }
}