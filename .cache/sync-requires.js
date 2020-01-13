const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-site-root-js": hot(preferDefault(require("/Users/samsherwood/Clients/Lake Erie College/Lake-Erie-College-Primary/src/templates/site-root.js"))),
  "component---src-templates-department-js": hot(preferDefault(require("/Users/samsherwood/Clients/Lake Erie College/Lake-Erie-College-Primary/src/templates/department.js"))),
  "component---src-templates-standard-page-js": hot(preferDefault(require("/Users/samsherwood/Clients/Lake Erie College/Lake-Erie-College-Primary/src/templates/standard-page.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/samsherwood/Clients/Lake Erie College/Lake-Erie-College-Primary/.cache/dev-404-page.js")))
}

