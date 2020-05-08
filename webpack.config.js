const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    watch: true,
    devServer: {
        index: path.join(__dirname, 'public', 'index.html'),
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8888,
        liveReload: true,
        open: true,
        writeToDisk: true
    }
};
