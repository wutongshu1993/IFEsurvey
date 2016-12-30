var webpack = require('webpack')
module.exports = {
    entry : './src/main.js',
    output : {
        path: __dirname+'/dist/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias:{
            'vue$':'vue/dist/vue.min.js',
        }
    },
    module: {
        loaders: [
            {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$'
            },
            {test: /\.vue$/,loader: "vue"},
            {
            test: /\.js$/,
            loaders: ['babel?presets[]=es2015'],
            exclude: /node_modules/
        },
            { test: /\.css$/, loader: 'style!css!autoprefixer' },
            {test: /\.scss$/, loaders:['style','css','sass']},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },

        ]
    },

    vue: {
        loaders:{
            js:'babel?presets[]=es2015'
        }
    },



}