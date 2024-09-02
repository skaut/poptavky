const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

module.exports = (env) => {
  const mode =
    process.env.NODE_ENV ??
    (env.development === true ? "development" : "production");

  return {
    devServer: {
      historyApiFallback: true,
    },
    devtool: mode === "development" ? "source-map" : false,
    entry: "./src/index.tsx",
    mode,
    module: {
      rules: [
        {
          test: /\.svg$/u,
          type: "asset",
        },
        {
          test: /\.tsx?$/u,
          use: {
            loader: "ts-loader",
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        },
        {
          test: /\.css$/u,
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
    output: {
      crossOriginLoading: "anonymous",
      filename: "[name].[contenthash:8].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        base: "/",
        template: "./src/html/index.html",
      }),
      new MiniCssExtractPlugin(),
      new SubresourceIntegrityPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
  };
};
