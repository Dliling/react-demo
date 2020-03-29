const path = require('path');
const glob = require('glob');

const uglify = require('uglifyjs-webpack-plugin');// js压缩
const htmlPlugin = require('html-webpack-plugin');// html模版编译
const extractTextPlugin = require('extract-text-webpack-plugin');// css分离
const PurifyCssPlugin = require('purifycss-webpack'); // 消除多余的css，使用这个之后，只剩下body样式？
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 去除多余的文件

// 处理静态文件路径
var website = {
    publicPath: 'http://172.22.156.80:9090'
}

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 使用环境
    mode: 'development',
    // devtool: '#source-map',
    entry: {
        // 必须是./src，会返回工作路径
        main: './src/index.js'
    },
    output: {
        // 将路径或路径片段解析成一个绝对路径
        path: path.resolve(__dirname, '../dist'),
        // chunkhash作为版本号使用
        filename: '[name]-[chunkhash].js',
        // publicPath: website.publicPath
    },
    // 解读Css，图片如何转换、压缩
    module: {
        rules: [
            // css-loader
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({ // 把css文件分离
                    fallback: 'style-loader',// 编译后用什么loader提取css
                    use: ['css-loader']
                })
                // use: [
                //     {loader: 'style-loader'},
                //     {loader: 'css-loader'}
                // ]
            },
            // less-loader
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({ // 把css文件分离
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
                // use: [
                //     {
                //         loader: 'style-loader' // 将css从js中分离
                //     },
                //     {
                //         loader: 'css-loader' // css转为commonJs
                //     },
                //     {
                //         loader: 'less-loader' // less解析成css
                //     }
                // ]
                // use: [
                //     {loader: 'style-loader'},
                //     {loader: 'css-loader'}
                // ]
            },
            // sass-loader
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({ // 把css文件分离
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            // img loader
            {
                test: /\.(jpg|png|gif|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500, // 小于500B的文件达成Base64写入js
                        outputPath: 'images/'
                    }
                }]
            },
            // html img loader
            {
                test: /\.(html|htm)$/i,
                use: ['html-withimg-loader']
            },
            // babel
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                // query: {
                //     plugins: ['transform-runtime'],
                //     presets: ['react', 'stage-2', 'env']
                // },
                exclude: /node_modules/
            }
        ]
    },
    // 解析
    resolve: {
        // 创建import或require的别名
        alias: {
            '@': resolve('../src'),
            '@components': resolve('../src/components/')
        },
        // 自动解析确定的扩展
        extensions: ['.js', '.jsx']
    },
    // 用于生产模版和各项功能
    plugins: [
        // js压缩
        // new uglify(),
        new htmlPlugin({
            minify: { // 对html文件压缩
                removeAttributeQuotes: true //去掉属性的双引号
            },
            hash: true, // 加入hash，有效避免缓存js
            template: './src/index.html' // 打包的html模版
        }),
        new extractTextPlugin('css/main.css'), //分离后的路径
        // new PurifyCssPlugin({
        //     // 查找html模版，遍历文件，查找哪些css被使用了
        //     paths: glob.sync(path.join(__dirname, 'src/*.html'))
        // }),
        // 清除多余的文件
        new CleanWebpackPlugin(['../dist'], {
            root: __dirname, // 根目录
            verbose: true, // 开启在控制台输出信息
            dry: false, // 启用删除文件
            allowExternal: true // 允许删除根目录以外的文件夹
        })
    ],
    // 开发服务功能
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        host: '127.0.0.1',
        port: '9090',
        // 服务端压缩是否开启
        compress: true,
        proxy: {//代理mock也可用http-proxy-middleware
            './api': {
                target: 'http://test.com:80', //后台API地址
                secure: false, //
                changeOrigin: true, //服务器是否做host判断，若设为false，则请求中的host就是本地的host，若设为true，就把host替换为代理的域名
                pathRewrite: {'^/api': ''} //重写请求路径，正则匹配
            }
        }
    }
}
