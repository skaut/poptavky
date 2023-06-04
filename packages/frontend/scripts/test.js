// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = "test"

const jest = require("jest")
let argv = process.argv.slice(2)

// Watch unless on CI or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf("--watchAll") === -1 &&
  argv.indexOf("--watchAll=false") === -1
) {
  argv.push("--watch")
}

jest.run(argv)
