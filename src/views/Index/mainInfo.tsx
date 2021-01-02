import React from "react";
import "./mainInfo.scss";
import { authorData } from "@/data/main-data";
import SpotlightText from "@@/src/components/Spotlight_Text/SpotlightText";
import { getBingImage } from "@@/src/api/bingImg/bing";
import HeWeather from "@@/src/components/He_Weather/heWeather";
import StarCanvas from "@/components/Star_Canvas/starCanvas";

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
        }}
      >
        <div className="bg">
          <StarCanvas></StarCanvas>
        </div>
        <div className="content">
          <div className="flex-weather">
            <HeWeather></HeWeather>
          </div>
          <p className="author">{"我是" + authorData.author}</p>
          <SpotlightText size={58}>{authorData.introduction}</SpotlightText>
          <ul>{Links}</ul>
        </div>
      </div>
    );
  }
}

export default MainInfo;
