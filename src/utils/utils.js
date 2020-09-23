import React from 'react';
import { Select, Radio } from 'antd'
const Option = Select.Option;
export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time*1000);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
	formateTime(timestamp){
		var mistiming = Math.round(new Date() / 1000)-timestamp;
		var postfix = mistiming>0 ? '前' : '后'
		mistiming = Math.abs(mistiming)
		var arrr = ['年','个月','星期','天','小时','分钟','秒'];
		var arrn = [31536000,2592000,604800,86400,3600,60,1];
	 
		for(var i=0; i<7; i++){
			var inm = Math.floor(mistiming/arrn[i])
			if(inm!==0){
				return inm+arrr[i] + postfix
			}
		}
	},
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
	getRadioList(data){
		if(!data){
		    return [];
		}
		let radios = [];
		data.map(item=>{
			return radios.push(<Radio value={item.value} key={item.value}>{item.name}</Radio>);
		});
		return radios;
	},
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
	filterDelete(record){
		const del_list = { 0: <span>删除</span>, 1: <span style={{color: "#f45656"}}>已删除</span>};
		return del_list[record.is_del];
	},
	themeColor(color){
		window.less.modifyVars(
			{
				'@primary-color': color,
				'@link-color': color,
				'@btn-primary-bg': color,
			}
		).then(() => {}).catch(error => {});
	},
	mertic(bytes){
		if (isNaN(bytes)) {
			return '';
		}
		var symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var exp = Math.floor(Math.log(bytes)/Math.log(2));
		if (exp < 1) {
			exp = 0;
		}
		var i = Math.floor(exp / 10);
		bytes = bytes / Math.pow(2, 10 * i);
		
		if (bytes.toString().length > bytes.toFixed(2).toString().length) {
			bytes = bytes.toFixed(2);
		}
		return bytes + ' ' + symbols[i];
	},
	merticKB(bytes){
		if (isNaN(bytes)) {
			return '';
		}
		var symbols = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var exp = Math.floor(Math.log(bytes)/Math.log(2));
		if (exp < 1) {
			exp = 0;
		}
		var i = Math.floor(exp / 10);
		bytes = bytes / Math.pow(2, 10 * i);
		
		if (bytes.toString().length > bytes.toFixed(2).toString().length) {
			bytes = bytes.toFixed(2);
		}
		return bytes + ' ' + symbols[i];
	}
}