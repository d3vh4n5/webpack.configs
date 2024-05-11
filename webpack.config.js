const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const EXTENSION = 'html'
// const EXTENSION = 'ejs' // Recordar usar el archivo template.ejs con su extención ejs para que funcione

//      Loaders

const babelRoule = {
    test: /\.js$/,
    loader: 'babel-loader',
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-syntax-optional-chaining']
}

const ejsRoule = {
    test: /\.ejs$/,
    loader: 'ejs-loader',
    options: {
        esModule: false
    }
}
const ejsTemplateRoule = {
    test: /\.ejs$/,
    use: 'raw-loader'
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
                ? 'js/[name].[contenthash].bundle.js' // crea un archivo nuevo con hash distinto cada build para controlar el cache
                :'[name].js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Home',
                filename: 'index.'+ EXTENSION,
                // template: 'src/pages/index.html',
                template: 'src/pages/template.'+ EXTENSION,
                chunks: ['main', 'home'],
                // templateParameters: { // Si evaluo el ejs puedo usar estas variables
                //     user: "Carlitos Testy"
                // }
            }),
            new HtmlWebpackPlugin({
                title: 'About',
                filename: 'pages/about.'+ EXTENSION,
                // template: './src/pages/about.html',
                template: './src/pages/template.'+ EXTENSION,
                chunks: ['main', 'about'],
                // templateParameters: { // Si evaluo el ejs puedo usar estas variables
                //     user: "Carlitos Testy"
                // }
            }),
            new HtmlWebpackPlugin({
                title: 'Contact',
                filename: 'pages/contact.'+ EXTENSION,
                // template: './src/pages/contact.html',
                template: './src/pages/template.'+ EXTENSION,
                chunks: ['main', 'contact'],
                // templateParameters: { // Si evaluo el ejs puedo usar estas variables
                //     user: "Carlitos Testy"
                // }
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'public', to: '' },
                ],
            }),
            // Carga las variables de entorno desde el archivo .env
            new Dotenv(),

            // Define las variables de entorno para usar en tiempo de compilación
            // new webpack.DefinePlugin({
            // 'process.env.API_URL': JSON.stringify(process.env.API_URL),
            // }),
        ],
        module: {
            rules: [
                // babelRoule,
                cssRoule,
                imageRule,
                vueRoule,
                // ejsRoule, // Este evalúa el ejs
                // ejsTemplateRoule, // Este te permite hacer templates de ejs
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