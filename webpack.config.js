const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

//      Loaders

const babelRoule = {
    test: /\.js$/,
    loader: 'babel-loader',
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-syntax-optional-chaining']
}

const vueRoule = {
    test: /\.vue$/,
    loader: 'vue-loader'
}

const cssRoule = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const imageRule = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    use: {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'img', // Carpeta de salida para las imágenes
        },
    },
}


// Webpack

module.exports = (env, argv) => {
    const {mode} = argv
    const isProduction = mode === 'production'
    return {
        entry: {
            main: './src/index.js',
            home: './src/modules/home.js',
            about: './src/modules/about.js',
            contact: './src/modules/contact.js',
        },
        output: {
            filename: isProduction 
                ? '[name].[contenthash].bundle.js' // crea un archivo nuevo con hash distinto cada build para controlar el cache
                :'[name].js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Home',
                filename: 'index.html',
                // template: 'src/pages/index.html',
                template: 'src/pages/template.html',
                chunks: ['main', 'home']
            }),
            new HtmlWebpackPlugin({
                title: 'About',
                filename: 'about.html',
                // template: './src/pages/about.html',
                template: './src/pages/template.html',
                chunks: ['main', 'about']
            }),
            new HtmlWebpackPlugin({
                title: 'Contact',
                filename: 'contact.html',
                // template: './src/pages/contact.html',
                template: './src/pages/template.html',
                chunks: ['main', 'contact']
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'public', to: '' },
                ],
            }),
        ],
        module: {
            rules: [
                // babelRoule,
                cssRoule,
                imageRule,
                vueRoule,
            ]
        },
        devServer: {
            open: true,
            port: 3000,
            compress: true,
        },
        // devtool: 'source-map' // mejor para debugear, pero lastra mucho rendimiento
    }
}