import { instance } from '@/config/axiosConfig';
import { Response } from './response';
import { Exception } from './exception';


interface Params {
    [name: string]: any
}

interface FileName {
    name: string,
    ext: string
}

export class request {

    // 对象转换URL拼接字符串
    static formateObjToParamStr(params: Params) {
        const sdata = [];
        for (let key in params) {
            sdata.push(`${key}=${this.filter(params[key])}`);
        }
        return sdata.join('&');
    };

    // 特殊字符转义
    static filter(str: string) {
        str += ''; // 隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }

    static get(url: string, params?: Params): Promise<Response<any>> {
        url += params ? '?' + request.formateObjToParamStr(params) : ''
        // 直接将结果数据Promise返回
        return instance.get(url).then((res: any) => {
            return res
        }, rej => {
            return rej
        })
    }

    static post(url: string, params: Params): Promise<Response<any>> {
        // 直接将结果数据Promise返回
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        return instance.post(url, params, { headers })
    }

    static upload(url: string, params: any): Promise<Response<any>> {
        const headers = { 'Content-Type': 'multipart/form-data' };
        // 直接将结果数据Promise返回
        // console.log(params)
        for (const key in params) {
            const value = Reflect.get(params, key);
            if (value instanceof ArrayBuffer) {
                Reflect.set(params, key, new Blob([value]))
            }
        }
        return instance.post(url, params, { headers })
    }

    static download(url: string, params: Params, filename: string) {
        url += params ? '?' + request.formateObjToParamStr(params) : ''
        // const a = document.createElement('a');
        // a.href = 'http://test.pan.com:9501' + url;
        // a.click();
        // stream下载 跨域问题
        return instance.get(url, { responseType: 'blob' }).then(
            res => {
                if (!res) {
                    console.error("下载文件失败");
                    return res;
                }
                const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                const a = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = `${filename}`;
                a.click();
                window.URL.revokeObjectURL(url);
            },rej=>{
                return rej
            }
        )
    }

}