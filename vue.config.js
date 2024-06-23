module.exports = {
    assetsDir: 'static',
    devServer: {
        proxy: {
            '/ea': {  //之后就使用/api代指根路径
                target: 'http://.....', // 这是根路径
                changeOrigin: true,
                pathRewrite: {
                    '^/ea': ''
                }
            }
        }
    }
}