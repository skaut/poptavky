const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const paths = require("./paths")

const hasJsxRuntime = (() => {
  try {
    require.resolve("react/jsx-runtime")
    return true
  } catch (e) {
    return false
  }
})()

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (webpackEnv) {
  const mode =
    process.env.NODE_ENV ?? (webpackEnv.development ? "development" : "production");
  const isEnvDevelopment = webpackEnv === "development"
  const isEnvProduction = !isEnvDevelopment

  return {
    mode,
    devtool: mode === "development" ? "source-map" : false,
    plugins: [
      new HtmlWebpackPlugin(
        {
          template: paths.appHtml,
        },
      ),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
    entry: paths.appIndexJs,
    output: {
      filename: "static/js/[name].[contenthash:8].js",
    },
    optimization: {
      minimize: false,
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
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Handle node_modules packages that contain sourcemaps
        {
          enforce: "pre",
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve("source-map-loader"),
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            {
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve("@svgr/webpack"),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve("file-loader"),
                  options: {
                    name: "static/media/[name].[hash].[ext]",
                  },
                },
              ],
              issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
              },
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
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  // css is located in `static/css`, use '../../' to locate index.html folder
                  // in production `paths.publicUrlOrPath` can be a relative path
                  options: paths.publicUrlOrPath.startsWith(".")
                    ? { publicPath: "../../" }
                    : {},
                },
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                    sourceMap: isEnvProduction
                      ? true
                      : isEnvDevelopment,
                  },
                },
                {
                  // Options for PostCSS as we reference these options twice
                  // Adds vendor prefixing based on your specified browser support in
                  // package.json
                  loader: require.resolve("postcss-loader"),
                  options: {
                    postcssOptions: {
                      // Necessary for external CSS imports to work
                      // https://github.com/facebook/create-react-app/issues/2677
                      ident: "postcss",
                      config: false,
                      plugins: [
                        "postcss-flexbugs-fixes",
                        [
                          "postcss-preset-env",
                          {
                            autoprefixer: {
                              flexbox: "no-2009",
                            },
                            stage: 3,
                          },
                        ],
                        // Adds PostCSS Normalize as the reset css with default options,
                        // so that it honors browserslist config in package.json
                        // which in turn let's users customize the target behavior as per their needs.
                        "postcss-normalize",
                      ],
                    },
                    sourceMap: isEnvProduction
                      ? true
                      : isEnvDevelopment,
                  },
                },
              ],
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
          ],
        },
      ],
    },
  }
}
