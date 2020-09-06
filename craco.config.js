/* craco.config.js */
const CracoLessPlugin = require("craco-less");
const path = require("path");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            //定制主题
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@@": pathResolve("."),
      "@": pathResolve("src"),
      "@data": pathResolve("src/data"),
      "@components": pathResolve("src/components"),
      "@utils": pathResolve("src/utils"),
    },
  },
};
