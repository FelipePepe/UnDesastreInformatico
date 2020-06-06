const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  entry: {
    app: "./index.js", //! fichero con el que se trabaja.
    appStyles: ["./index.scss"],
  },
  stats: "errors-only",
  output: {
    //?filename: "bundle.js", //! fichero a producción.
    filename: "[name].[chunkhash].js",
  },
  module: {
    //! aquí van los loaders
    rules: [
      //! se van a realizar los transpilados
      {
        test: /\.js$/, //! coja todos los js
        exclude: /node_modules/, //! no entre en node-modules
        loader: "babel-loader", //! se lo pasa a babel-loader
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // modules: {
              //   localIdentName: "[name]__[local]_[hash:base64:5]",
              // },
              localsConvention: "camelCase", //! Cambia el nombre de los objetos del css a camelCase
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            //loader: "style-loader", //! mete el css en el html
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", //! Primero se ejecuta este, de abajo arriba, este loader carga el css
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        //loader: "url-loader?limit=5000",
        loader: "url-loader",
        options: {
          limit: 5000,
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //! output a dist
      template: "index.html", //! input de donde se lee
      //   hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
