var App = require("../..").App,
    app = new App();

app.get("/about",function(req,res){
    res.write("my name is Yuyou");
    res.end();
})

app.get("/contact/*/:id/ok",function(req,res){
    res.write("contact me use QQ 18314");
    res.end();

})

app.listen(3000);