/* eslint-env node */

const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity")

module.exports = (env) => {
  const mode =
    process.env.NODE_ENV ?? (env.development ? "development" : "production")

  return {
    mode,
    devtool: mode === "development" ? "source-map" : false,
    plugins: [
      new HtmlWebpackPlugin({
        base: "https://itpoptavky.skaut.cz",
        template: "./src/html/index.html",
      }),
      new MiniCssExtractPlugin(),
      new SubresourceIntegrityPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          type: "asset",
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    entry: "./src/index.tsx",
    output: {
      filename: "[name].[contenthash:8].js",
    },
    optimization: {
      minimize: mode === "production",
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
  }
}
