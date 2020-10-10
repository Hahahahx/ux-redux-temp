import React, { FC } from "react";
import loadable from "@loadable/component";


const Async = loadable(
  (props: { componentPath: string }) => import(`@/${props.componentPath}`)
);

/**
 * 懒加载组件
 * @param componentPath
 * @constructor
 */

export const LazyComponent: FC<{ componentPath: string }> = ({
  componentPath,
}) => {
  return <Async componentPath={componentPath} />;
};
