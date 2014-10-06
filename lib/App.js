var http = require("http");
module.exports = App;

function App(){
    var middleList = this._middleList = [];
    function handle(req,res){
        if(middleList.length === 0) {
            //to do nothing;
        }else{
            var middleIndex = 0;
            execMiddle();

            function next(){
                middleIndex += 1;
                execMiddle();
            }

            function execMiddle(){
                var middle = middleList[middleIndex];
                if(middle){
                    middle(req,res,next);
                }
            }
        }
    }
    this._server = http.createServer(handle);
}

App.prototype.use = function(middle){
    this._middleList.push(middle);
}
App.prototype.listen = function(){
    this._server.listen.apply(this._server,arguments);
}