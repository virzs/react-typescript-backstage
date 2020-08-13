/* craco.config.js */
const CracoLessPlugin = require("craco-less");
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
};
