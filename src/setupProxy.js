//代理服务器设置
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getBingImage", {
      target: "https://cn.bing.com/HPImageArchive.aspx",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/getBingImage": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: process.env.REACT_APP_BASE_URL,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
