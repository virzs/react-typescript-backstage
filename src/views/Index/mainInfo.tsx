import React from "react";
import "./mainInfo.scss";
import { authorData } from "@/data/main-data";
import SpotlightText from "@@/src/components/Spotlight_Text/SpotlightText";
import { getBingImage } from "@@/src/api/bingImg/bing";

export interface stateTypes {
  bingImage: any;
}

const Links = authorData.links.map((item, index) => {
  return (
    <li key={index}>
      <a href={item.link}>{item.name}</a>
    </li>
  );
});

class MainInfo extends React.Component<any, stateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      bingImage: {},
    };
  }
  getBingImageApi = () => {
    getBingImage().then((res: any) => {
      this.setState({ bingImage: res.data });
      console.log(this.state.bingImage.images);
    });
  };
  componentDidMount() {
    this.getBingImageApi();
  }
  render() {
    return (
      <div
        className="main-info"
        style={{
          height: `${window.innerHeight}px`,
          backgroundImage: `url("http://cn.bing.com${
            this.state.bingImage.images
              ? this.state.bingImage.images[0].url
              : ""
          }")`,
        }}
      >
        <p className="author">{"我是" + authorData.author}</p>
        <SpotlightText size={58}>{authorData.introduction}</SpotlightText>
        <ul>{Links}</ul>
      </div>
    );
  }
}

export default MainInfo;
