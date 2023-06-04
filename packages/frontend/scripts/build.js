// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production"
process.env.NODE_ENV = "production"

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err
})

// Ensure environment variables are read.
require("../config/env")

const fs = require("fs-extra")
const webpack = require("webpack")
const configFactory = require("../config/webpack.config")
const paths = require("../config/paths")

// Generate configuration
const config = configFactory("production")

// Merge with the public folder
fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: (file) => file !== paths.appHtml,
})
// Start the webpack build
return webpack(config).run()
