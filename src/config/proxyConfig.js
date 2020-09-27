"use strict";
//开发环境
const proxy = {
    "/api": {
      target: "http://localhost:8080/",
      pathRewrite: { "^/api": "" },
    },
};
//打包线上环境静态资源映射服务器
const homepage = "";

module.exports = { proxy, homepage };
