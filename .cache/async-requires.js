// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-site-root-js": () => import("./../src/templates/site-root.js" /* webpackChunkName: "component---src-templates-site-root-js" */),
  "component---src-templates-department-js": () => import("./../src/templates/department.js" /* webpackChunkName: "component---src-templates-department-js" */),
  "component---src-templates-standard-page-js": () => import("./../src/templates/standard-page.js" /* webpackChunkName: "component---src-templates-standard-page-js" */),
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */)
}

