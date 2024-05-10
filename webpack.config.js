const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const babelRoule = {
    test: /\.js$/,
    loader: 'babel-loader',
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

module.exports = (env, argv) => {
    const {mode} = argv
    const isProduction = mode === 'production'
    return {
        entry: {
            main: './src/main.js',
            index: './src/index.js',
            about: './src/about.js',
            contact: './src/contact.js',
        },
        output: {
            filename: isProduction 
                ? '[name].[contenthash].bundle.js' // crea un archivo nuevo con hash distinto cada build para controlar el cache
                :'[name].js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/pages/index.html',
                chunks: ['main', 'index']
            }),
            new HtmlWebpackPlugin({
                filename: 'about.html',
                template: './src/pages/about.html',
                chunks: ['main', 'about']
            }),
            new HtmlWebpackPlugin({
                filename: 'contact.html',
                template: './src/pages/contact.html',
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
                imageRule
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