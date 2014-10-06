module.exports = pathRegexp;

function pathRegexp(path){
    var paramNames = [];
    path = path.replace(/\? (.*)$/,"")

        // 这一步是把所有 ＊ 替换成正则表达式[0-9a-zA-Z\-_]* 形式
        .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"[0-9a-zA-Z\-_]*")

        // 这一步是把所有 :xxx 替换成正则表达式(.*)
        .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g,"[0-9a-zA-Z\-_]*")

        // 把 /article/:id/ 转换为 /article/:id      区别在哪？
        .replace(/\/$/g,"")
        // 这一步是把所有 / 路径变为匹配正则表达式的 \/的形式
        .replace(/\//g,"\\\/");

    //这一步，通过生成正则表达式，前后的^和& 顾名思义，要严格匹配整个路径。
    var regexp = new RegExp("^" + path + "\\/?$");
    regexp.paramNames = paramNames;
    return regexp;
}