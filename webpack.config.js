const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
mode: 'development',
entry: './src/main.tsx',
devtool: 'inline-source-map',
output: {
path: path.join(__dirname, '/dist'),
filename: 'bundle.js'
},
devtool: 'inline-source-map',
devServer: {
static: './dist',
},
module: {
    rules: [
        {
          test: /\.?ts|tsx$/,
          exclude: /node_modules/,
          use:
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            }
          ],
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          loader: "file-loader",
          options: {
            name: "assets/images/[name].[ext]",
          },
        },
        { test: /\.html$/, use: 'html-loader' },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader",
          options: {
            name: "assets/fonts/[name].[ext]",
          },
        },
    ]
},
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
},
plugins:[
new HtmlWebpackPlugin({
template: './index.html'
})
],
devServer: {
    port: '8080',
    historyApiFallback: true,
  },

}