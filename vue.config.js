module.exports = {
  publicPath:'./',
  devServer: {
    proxy: {
      '/system': {
        target: 'http://localhost:8090/InventoryManagement',
        changeOrigin: true,
        pathRewrite: {
          '^/system': ''
        }
      }
    }
  }
}

