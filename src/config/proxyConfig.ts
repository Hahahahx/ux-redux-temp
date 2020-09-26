//开发环境
export const proxy = {
    '/api': {
        target: 'http://127.0.0.1/',
        pathRewrite: { '^/api': '' }
    }
}

//打包线上环境静态资源映射服务器
export const homepage = ''