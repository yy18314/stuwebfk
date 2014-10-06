var http = require("http"),
    pathRegexp = require("./pathRegexp"),
    url = require("url");
module.exports = App;

function App(){
    var self = this;
    this._route_post_handles = [];
    this._route_get_handles = [];
    var middleList = this._middleList = [];
    function handle(req,res){

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
            }else{
                var handle;
                var path = url.parse(req.url).pathname;
                function findHandle(route_handles){
                    for(var i = 0, len = route_handles.length ; i < len ; i ++){
                        var route_handle = route_handles[i];
                        var pass = route_handle.route.test(path);
                        if(pass){
                            handle = route_handle.handle;
                            break;
                        }
                    }
                }

                //判断是GET还是POST方法
                switch(req.method){
                    case "GET":
                        //handle = self._route_get_handles[req.url];
                        findHandle(self._route_get_handles);
                        break;
                    case "POST":
                        //handle = self._route_post_handles[req.url];
                        findHandle(self._route_post_handles);
                        break;
                }
                if(handle){
                    handle(req,res);
                }else{
                    res.statusCode = 404;
                    res.end();
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

App.prototype.get = function(route,handle){
    this._route_get_handles.push({route:pathRegexp(route),handle:handle});
}

App.prototype.post = function(route,handle){
    this._route_post_handles.push({route:pathRegexp(route),handle:handle});
}