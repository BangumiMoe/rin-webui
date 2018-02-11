module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://bangumi.moe",
        // ssl: true,
        secure: true,
        protocolRewrite: true,
        changeOrigin: true
      }
    }
  }
};
