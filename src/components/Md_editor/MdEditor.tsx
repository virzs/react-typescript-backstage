import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";
import React from "react";

class MdEditor extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const vditor = new Vditor("vditor", {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: true,
      },
      after() {
        vditor.setValue("Hello, Vditor + React!");
      },
    });
  }

  render() {
    return React.createElement("div", { id: "vditor" });
  }
}

export default MdEditor;
