import React  from 'react';


/**
 * @File: index.ts
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */

 /**
  * 所有被页面渲染出的可选对象都会被挂载到该context中。
  */
export const SelectionContext = React.createContext<Map<symbol, any>>(new Map<symbol, any>());
/**
 * 数据结构为map，symbol指向每个可选对象。
 */
export const store = new Map<symbol, any>();