import React, { FC, useState, useRef, useMemo } from 'react';
import { useDocumentEvent, useMousePosition } from '@/utils/HookUtils';
import { SelectionContext, store } from '@/components/Selection/index';
import SelectFrame from '@/components/Selection/SelectFrame';
import './index.less'

/**
 * @File: Selection
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */

interface SelectionProps {
    disabledSelection?: boolean
    offset?: { x: number, y: number }
    scrollOffset?: number
    onBegin?: ({ x, y }: { x: number, y: number }) => any
    onEnd?: ({ x, y }: { x: number, y: number }) => any
}

/**
 * 可选区
 * @param disable 禁用
 * @param offset 
 * 因为选框是相对于可选区的，而坐标位置却是相对于浏览器页面的，
 * 当可选区与浏览器坐标存在误差时需要一定的偏移值来确保选框的正确的绘制
 * @param scrollOffset 计算滚动条的偏移值
 */
const Selection: FC<SelectionProps> = ({ children, disabledSelection, offset, scrollOffset, onBegin, onEnd }) => {


    // 获取鼠标位置（相对于浏览器页面）
    const { x, y } = useMousePosition(true, offset);
    // 起始坐标
    const [start, setStart] = useState({ x: 0, y: 0 });
    // 选框的大小
    const [size, setSize] = useState({ width: 0, height: 0 });
    // 选框的偏移值
    const [positionLT, setPositionLT] = useState({ left: 0, top: 0 });
    // 显示选框
    const [show, setShow] = useState(false);
    // 确保选框正确的在可选区中被绘制
    const [lock, setLock] = useState(true);

    // 渲染优化，但是没有什么用...
    const disabled = useMemo(() => disabledSelection, [disabledSelection])

    // 可选区对象
    const Dref = useRef<any>();

    const onMouseDown = () => {
        if (!disabled) {
            offset = offset || { x: 0, y: 0 }
            /**
             * 限制SelectFrame（选框）只能局限在可选区内生成。
             * 为了正确的绘制选框区域我们加入了偏移值，所以，x与y的坐标也发生了改变
             * 可选区对象是相对于浏览器的 所以我们需要从新加入偏移值计算 来保持他们的平衡便于比较
             */
            if (
                x > Dref.current.offsetLeft - offset.x &&
                y > Dref.current.offsetTop - offset.y &&
                x < Dref.current.offsetLeft + Dref.current.offsetWidth - offset.x &&
                y < Dref.current.offsetTop + Dref.current.offsetHeight - offset.y
            ) {
                // 设置起始点
                setStart({ x, y });
                setLock(false);
                onBegin && onBegin({ x, y });
            }
        }
    };

    const onMouseMove = () => {
        if (!lock) {
            // 展示选框
            !show && setShow(true) 
            // 选框的偏移值是取决于左上角的点，所以只有更小（更接近0，0）的坐标能取决其偏移值
            const left = Math.min(x, start.x);
            const top = Math.min(y, start.y);
            setPositionLT({ left, top });
            // 选框大小不管往哪个方向绘制选框，都能保证选框的正确绘制，
            // 由于长宽是相对于坐标的，一个四边形不被允许出现负值，所以对其取绝对值
            const width = Math.abs(start.x - x);
            const height = Math.abs(start.y - y);
            setSize({ width, height });
        }
    };

    const onMouseUp = () => {
        // 结束选框的绘制
        setLock(true);
        // 隐藏选框
        setShow(false);
        setPositionLT({ left:0, top:0 });
        setSize({ width:0, height:0 });
        onEnd && onEnd({ x, y })
    };

    // 将事件绑定到Dom对象中
    useDocumentEvent('mousedown', onMouseDown);
    useDocumentEvent('mousemove', onMouseMove);
    useDocumentEvent('mouseup', onMouseUp);

    // 为了避免高频渲染，你应该在children组件中加入memo
    return (
        <div ref={Dref} className='selection'>
            <SelectionContext.Provider value={store}>
                {children}
                <SelectFrame scrollOffset={scrollOffset} show={show} positionLT={positionLT} size={size} />

            </SelectionContext.Provider>
        </div>
    );
};


export default Selection;