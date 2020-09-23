import React, { CSSProperties, FC, useContext, useEffect } from 'react';
import { SelectionContext } from '@/components/Selection/index';
import { throttle } from '@/utils/ButtonUtils';
import './index.less'

/**
 * @File: SelectFrame
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */
interface SelectFrameProps {
    positionLT: { left: number, top: number }
    size: { width: number, height: number }
    show: boolean
    style?: CSSProperties
    scrollOffset?: number
}

const SelectFrame: FC<SelectFrameProps> = ({ positionLT, size, style, show, scrollOffset }) => {


    // 获取所有被挂载到context中的可选对象。
    const items = useContext(SelectionContext);
    const Istyle = {
        left: positionLT.left + 'px',
        top: positionLT.top + 'px',
        width: size.width + 'px',
        height: size.height + 'px',
    }


    /**
     * 遍历全部可选对象，当可选对象与选框发生碰撞时，触发可选对象的事件，如beSelected()，即该对象被选中了
     * 同样unselected则是从选框中被排除了
     * 此处仍然有一些问题
     */
    //*****//Issue 当选框组件配合到react-window，虚拟滚动组件中时，我们根据渲染仍然能够得到部分可选对象，
    // 但它不是完整的（详细了解react-window渲染机制），且由于其滚动条的存在我们需要在此中再加入一个偏移值参与计算，
    // 即滚动条的滚动距离，我们可以直接在react-window的组件中取到该值，还是由于react-window的渲染机制，
    // 由于我们的选框是相对于可选区的，一旦加入了滚动条的设定后，一旦滚动条发生改变，一些我们期望被选中的可选对象
    // 就会被移出选框，且当视区向下滚动，视区上方的可选对象会被销毁，从而触发本不该被触发的unselected事件。
    const getSelectedItem = () => {

        items.forEach((v) => {
            const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = v.element;
            // 每个可选对象的存在区
            scrollOffset = scrollOffset || 0
            const l = offsetWidth + offsetLeft;
            const t = offsetHeight + offsetTop;
            if (
                l > positionLT.left &&
                t > positionLT.top + scrollOffset && // 此处加入滚动条的偏移值
                offsetLeft < positionLT.left + size.width &&
                offsetTop < positionLT.top + size.height + scrollOffset // 此处加入滚动条的偏移值
            ) {
                if (!v.select) {
                    v.beSelected();
                }
                v.select = true;
            } else {
                if (v.select) {
                    v.beUnSelected();
                }
                v.select = false;
            }
        });
    };

    // 限流判断
    const getSelectedItemSlow = throttle(getSelectedItem, 0)

    // 选框的大小发生改变时，进行判断哪些对象是和选框发生碰撞的 
    useEffect(() => {
        items.size && getSelectedItemSlow();
    }, [items.size, getSelectedItemSlow]);

    return (
        show ? <div style={Istyle} className='frame' /> : <></>
    );
};

export default SelectFrame