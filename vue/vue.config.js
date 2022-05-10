const {defineConfig} = require('@vue/cli-service')
let path = require('path')
module.exports = defineConfig({
    transpileDependencies: true,

    // publicPath: '',
    // productionSourceMap: false,
    // chainWebpack(config) {
    //     config.resolve.alias
    //         .set('components', resolve('src/components'))
    //         .set('common', resolve('src/common'))
    //         .set('api', resolve('src/api'))
    // },
    pages:
        {
            // login:{
            //     entry:'src/pages/login_and_register/main.js',
            //     template:'public/index.html',
            //     filename:'index.html',
            //     title:'Login and register'
            // },

            index:
                {
                    entry: 'src/pages/home_page/main.js',
                    template: 'public/index.html',
                    filename: 'index.html',
                    title: 'home'
                },
            login:
                {
                    entry: 'src/pages/login_and_register/main.js',
                    template: 'public/login_and_register.html',
                    filename: 'login_and_register.html',
                    title: 'Login and register'
                },
            user:
                {
                    entry: 'src/pages/main_page/main.js',
                    template: 'public/main_page.html',
                    filename: 'main_page.html',
                    title: 'user page'
                },
            calendar:
                {
                    entry: 'src/pages/calendar/main.js',
                    template: 'public/calendar.html',
                    filename: 'calendar.html',
                    title: 'calendar'
                }
        }

})

