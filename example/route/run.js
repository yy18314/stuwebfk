var fk = require("../.."),
    App = fk.App,
    app = new App(),
    static_middle = fk.static;

app.use(static_middle(__dirname + "/public"));
//app.use(static("/public"));
app.get("/about.html",function(req,res){
    res.write("hello");
    res.send();
})
app.get("/about",function(req,res){
    res.write("my name is Yuyou");
    res.end();
})

app.get("/contact",function(req,res){
    res.write("contact me using QQ 18314");
    res.end();
})

app.listen(3000);