/**
 * @File: UserApi.ts
 * @Author: Ux
 * @Date: 2020/9/23
 * @Description:
 */
import { request } from "@/modules/ajax/request";
import { Response } from "@/modules/ajax/response";
import { User } from "@/modules/model/User";
import Axios from "axios";

/**
 * 接口模块：*Api
 * 接口函数：http方式+路由最后一级，返回Promise<Response<T>>对象 T为泛型，为结果集类型。
 */
class UserApi {
  postLogin(params: LoginParams): Promise<Response<any>> {
    return request.post("/user/login", params);
  }

  getUserInfo(id: string): Promise<Response<User>> {
    return request.get("/mock/user/userInfo.json", { id }).then(
      (res) => {
        if (res.code === 200) {
          return res; // as User
        } else {
        }
      },
      (rej) => {
        return rej;
      }
    );
  }

  getChangeColor() {
    return request.get("/api/lessc");
  }
}

export default new UserApi();

export interface LoginParams {
  username: string;
  password: string;
}
