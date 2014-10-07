var fk = require("../.."),
    App = fk.App,
    fs = require("fs"),
    app = new App,
    post = fk.post;

app.use(post);
app.post("/post",function(req,res){
    var data = "";
    fs.writeFile(__dirname + "/public/file.txt",req.files.txt,function(){
        res.write("ok!");
        res.end();
    });
})

app.get("/",function(req,res){
    var _data = fs.readFile(__dirname + "/public/index.html",function(err,data){
        res.write(data);
        res.end();
    })
})

app.listen(3000);