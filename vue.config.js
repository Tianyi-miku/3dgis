const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8000,
    proxy: {
      "/maps": {
        pathRewrite: { "^/maps": "/maps" },
        target: `http://localhost:9999/`,
        ws: false,
        changeOrigin: true,
      },
      "/terrain": {
        pathRewrite: { "^/terrain": "/terrain" },
        target: `http://localhost:9999/`,
        ws: false,
        changeOrigin: true,
      },
    },
  },
  lintOnSave: false, //关闭语法检查
  configureWebpack: {
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin({
        patterns: [
          { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
          {
            from: "node_modules/cesium/Build/Cesium/ThirdParty",
            to: "ThirdParty",
          },
          { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
          { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" },
        ],
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify(""),
      }),
      new NodePolyfillPlugin(),
    ],
    // configureWebpack: {
    //   plugins: [new NodePolyfillPlugin()],
    // },
    module: {
      // Removes these errors: "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
      // https://github.com/AnalyticalGraphicsInc/cesium-webpack-example/issues/6
      unknownContextCritical: false,
      unknownContextRegExp:
        /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
    },
  },
};
