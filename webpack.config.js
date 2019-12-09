const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const postcssAutoPrefixer = require("autoprefixer");

const isDev = process.env.NODE_ENV !== "prod";

// Pug -> HTML
let page,
  pages = [],
  pageDirs = ["pages", "pages/legal"];

pageDirs.forEach(d => {
  fs.readdirSync(d).forEach(file => {
    if (file.slice(-4) === ".pug") {
      console.log(file);
      page = new HtmlWebpackPlugin({
        filename: path.join(d.replace(/pages(\/)?/g, ''), file.replace(".pug", ".html")),
        template: path.join(d, file)
      });
      pages.push(page);
    }
  });
});

module.exports = {
  mode: "development",
  entry: "./main.js",
  output: {
    filename: "js/bundle.min.js",
    path: path.resolve(__dirname, "./dist")
  },
  devtool: isDev && "source-map",
  devServer: {
    contentBase: "/dist",
    open: false
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./assets", to: "./assets" }]),
    new MiniCssExtractPlugin({ filename: "css/style.min.css" }),
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
        loaders: ["html-loader", "pug-html-loader"]
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
