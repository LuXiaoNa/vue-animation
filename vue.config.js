//项目的基础配置
const path = require('path')
    // ajax 同源 localhost:8080 后台接口时localhost:54321 xmlHttpRequest xhr
    //node httpServer
    // nginx 静态文件服务器 cors
    //Controller request repsonse 拦截器 R <script></src
    //jsonp <script src="http://localhost:54321"> <script>fucntion aa(){}</script>
module.exports = {
    publicPath: "./",
    outputDir: 'runway-front',
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        devtool: 'source-map' //调试器就有机会将一个被压缩的文件中的代码对应回其源文件相应的位置
    }
}

function resolve(dir) {
    return path.join(__dirname, dir)
}