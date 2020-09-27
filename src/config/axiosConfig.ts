import Axios, { AxiosRequestConfig } from "axios";
import { getCsrfToken } from "@/utils/common";
import Utils from "@/utils/utils";
import qs from "querystring";

/**
 * @File: axiosConfig.ts
 * @Author: Ux
 * @Date: 2020/7/28
 * @Description: 统一配置
 */

export const instance = Axios.create();

const host = window.location.host;
//instance.defaults.baseURL = '/mock';
instance.defaults.withCredentials = true;
instance.defaults.timeout = 5000;
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.method === "get" || config.method === "delete") {
    let params = config.params;
    if (params) {
      params = Object.assign(params, { CSRF: getCsrfToken() });
    } else {
      params = { CSRF: getCsrfToken() };
    }
    config.params = params;
  }

  const headerType = config.headers["Content-Type"];

  if (config.method === "post") {
    if (headerType === "application/x-www-form-urlencoded") {
      config.data = qs.stringify(
        Object.assign(config.data, { CSRF: getCsrfToken() })
      );
    } else if (headerType === "multipart/form-data") {
      // 自定义上传
      config.headers["Content-Type"] =
        headerType + ";boundry=-----------" + Utils.NewGuid();
      const formData = new FormData();
      for (const key in config.data) {
        formData.append(key, Reflect.get(config.data, key));
      }
      formData.append("CSRF", getCsrfToken());
      config.data = formData;
    } else {
      config.data = Object.assign(config.data, { CSRF: getCsrfToken() });
    }
  }

  return config;
});

instance.interceptors.response.use(
  function (result) {
    if (result.headers["content-type"].includes("stream")) {
      console.log(result);
      return result.data;
    }
    return result.data;
  },
  function (error) {
    console.log("服务器好像挂掉了..");
    return error;
  }
);
