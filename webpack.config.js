const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const postcssAutoPrefixer = require("autoprefixer");
const WorkboxPlugin = require('workbox-webpack-plugin');

const isDev = process.env.NODE_ENV !== "prod";

// Pug -> HTML
let page,
  pages = [],
  pageDirs = ["pages", "pages/legal"];

pageDirs.forEach(d => {
  fs.readdirSync(d).forEach(async file => {
    if (file.slice(-4) === ".pug") {
      page = new HtmlWebpackPlugin({
        filename: path.join(d.replace(/pages(\/)?/g, ''), file.replace(".pug", ".html")),
        template: path.join(d, file),
      });
      pages.push(page);
    }
  });
});

module.exports = {
  mode: "development",
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'hashed',
  },
  entry: [ "./js/menu.js", "./scss/style.scss"],
  output: {
    filename: 'js/[name].[contentHash].js',
    chunkFilename: 'js/[name].[contentHash].js',
    path: path.resolve(__dirname, "./dist"),
  },
  devtool: isDev && "source-map",
  devServer: {
    contentBase: "/dist",
    open: false
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./assets", to: "./assets" }]),
    new MiniCssExtractPlugin({ chunkFilename: "css/style.[contentHash].css" }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    ...pages
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "js")],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/transform-runtime"]
        }
      },
      {
        test: /\.pug$/,
        use: "pug-loader"
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: isDev
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: isDev,
              plugins: [postcssAutoPrefixer]
            }
          },
          { loader: "sass-loader", options: { sourceMap: isDev } }
        ]
      }
    ]
  }
};
