// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-callback-js": () => import("./../src/pages/callback.js" /* webpackChunkName: "component---src-pages-callback-js" */),
  "component---src-templates-category-index-js": () => import("./../src/templates/category/index.js" /* webpackChunkName: "component---src-templates-category-index-js" */),
  "component---src-templates-page-index-js": () => import("./../src/templates/page/index.js" /* webpackChunkName: "component---src-templates-page-index-js" */),
  "component---src-templates-post-index-js": () => import("./../src/templates/post/index.js" /* webpackChunkName: "component---src-templates-post-index-js" */)
}

