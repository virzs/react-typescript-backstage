import { getGeolocation } from "@@/src/utils/utils";
import React from "react";
import { getCityInfo, getHeWeather } from "@/api/heWeather/heWeather";
import "./hw.scss";

export interface WeatherProps {
  location: Array<object> | any;
  weather: object | any;
}

function Icon(props: WeatherProps) {
  if (props.location.length > 0 && Object.keys(props.weather).length > 0) {
    let city = props.location[0].adm2; //当前城市
    let temp = props.weather.temp; //当前温度
    let text = props.weather.text; //当前温度描述
    let icon = props.weather.icon; //当前温度图标
    return (
      <div className="weather-box">
        <div className="weather-icon">
          <img
            src={require(`../../../public/static/heWeatherIcon/color-64/${icon}.png`)}
            alt=""
          />
        </div>
        <span className="weather-temp">{temp}</span>
        <div className="weather-unit">
          <span>℃</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="weather-box">
        <p className="weather-loading">加载中</p>
      </div>
    );
  }
}

class HeWeather extends React.Component<any, any> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      location: [],
      weather: {},
    };
  }
  componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    getGeolocation(
      (position) => {
        let latitude = position.coords.latitude.toFixed(2);
        let longitude = position.coords.longitude.toFixed(2);
        this.getLocalCity(longitude, latitude);
        this.getLocalWeather(longitude, latitude);
      },
      (positionError) => {
        console.error(positionError.message);
      }
    );
  }
  getLocalCity(longitude: string, latitude: string) {
    let location = `${longitude},${latitude}`;
    getCityInfo(location).then((res: any) => {
      let data = res.data.location;
      this.setState({ location: data });
    });
  }
  getLocalWeather(longitude: string, latitude: string) {
    let location = `${longitude},${latitude}`;
    getHeWeather(location).then((res: any) => {
      let data = res.data.now;
      this.setState({ weather: data });
    });
  }
  render() {
    return (
      <Icon location={this.state.location} weather={this.state.weather}></Icon>
    );
  }
}

export default HeWeather;
