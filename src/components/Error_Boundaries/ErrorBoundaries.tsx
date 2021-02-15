/*
 * 错误处理边界
 *用于处理view组件加载错误
 */

import React from "react";
import Error from "@/page/Error";

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    //更新state使下一次渲染能够显示降级后的UI
    return { hasError: true };
  }
  componentDidCatch() {
    this.setState({ hasError: true });
    //错误处理
  }
  render() {
    if (this.state.hasError) {
      //自定义错误发生时降级后的UI并渲染
      return <Error></Error>;
    }
    return this.props.children;
  }
}
