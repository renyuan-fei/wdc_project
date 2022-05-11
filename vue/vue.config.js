const {defineConfig} = require('@vue/cli-service')
// eslint-disable-next-line no-unused-vars
let path = require('path')

module.exports = defineConfig({
    publicPath: './',
    outputDir: 'dist',
    // assetsDir: 'static',
    lintOnSave: true,

    //webpack配置
    configureWebpack: {
        //警告 webpack 的性能提示
        performance: {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename)
            {
                return assetFilename.endsWith('.js');
            }
        }
    },

    // devServer: {
    //     disableHostCheck: true,
    //     host: '127.0.0.1',
    //     proxy: { //配置代理，解决跨域请求后台数据的问题
    //         '/api': {
    //             target: 'http://localhost:3000', //后台接口，连接本地服务
    //             ws: true, //是否跨域
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api':'/'
    //             }
    //         }
    //
    //     }
    // },


    pages:
        {
            index:
                {
                    entry: 'src/pages/main.js',
                    template: './public/index.html',
                    filename: 'index.html',
                    title: 'Tree',
                    // chunks: ['chunk-vendors', 'chunk-common']
                    // , 'TOP_BAR', 'HOME','LOGIN','CALENDAR',
                    // 'USER','ADD_EVENT','MY_GROUP','MY_PLAN','RESET_PASSWORD','SETTING'
                },
        }

})