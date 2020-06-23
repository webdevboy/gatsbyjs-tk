const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/Users/erikgomez/Documents/clients/tasting-kitchen/src/pages/404.js"))),
  "component---src-pages-callback-js": hot(preferDefault(require("/Users/erikgomez/Documents/clients/tasting-kitchen/src/pages/callback.js"))),
  "component---src-templates-category-index-js": hot(preferDefault(require("/Users/erikgomez/Documents/clients/tasting-kitchen/src/templates/category/index.js"))),
  "component---src-templates-page-index-js": hot(preferDefault(require("/Users/erikgomez/Documents/clients/tasting-kitchen/src/templates/page/index.js"))),
  "component---src-templates-post-index-js": hot(preferDefault(require("/Users/erikgomez/Documents/clients/tasting-kitchen/src/templates/post/index.js")))
}

