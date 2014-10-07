var App = require("../..").App,
    app = new App;

app.get("/about/:name/:age", function (req, res) {
    res.write("my name is " + req.params.name + "<br />");
    res.write("my age is" + req.params.age);
    res.end();
})

app.get("/article/:id", function (req, res) {
    res.write("id= " + req.params.id + "<br />");
    res.end();
})

app.listen(3000);