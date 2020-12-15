import { getGeolocation } from "@@/src/utils/utils";
import React from "react";
import { getCityInfo, getHeWeather } from "@/api/heWeather/heWeather";
import "./hw.scss";

export interface WeatherProps {
  location: Array<object> | any; //定位地点
  weather: object | any; //当前位置天气
  isLoading: Boolean; //是否正在加载
  isError: Boolean; //是否出现错误
  errMsg: string;
  refresh: () => void; //刷新
}

class Icon extends React.Component<WeatherProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: WeatherProps) {
    super(props);
  }
  render() {
    let isError = this.props.isError; //是否错误
    let isLoading = this.props.isLoading; //是否正在加载
    let ele: JSX.Element = <div></div>;
    if (isError) {
      //TODO手动刷新按钮
      ele = (
        <div className="weather-box" onClick={this.props.refresh}>
          {this.props.errMsg || "加载天气错误，请刷新"}
        </div>
      );
    }
    if (isLoading) {
      //TODO加载动画
      ele = <div className="weather-box">正在加载天气，请稍后</div>;
    }
    if (
      this.props.location &&
      Object.keys(this.props.weather) &&
      this.props.location.length > 0 &&
      Object.keys(this.props.weather).length > 0 &&
      !this.props.isLoading
    ) {
      // let city = props.location[0].adm2; //当前城市
      let temp = this.props.weather.temp; //当前温度
      // let text = props.weather.text; //当前温度描述
      let icon = this.props.weather.icon; //当前温度图标
      ele = (
        <div className="weather-box" onClick={this.props.refresh}>
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
    }
    return ele;
  }
}

class HeWeather extends React.Component<any, any> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      location: [],
      weather: {},
      isLaoding: true,
      isError: false,
      errMsg: "",
    };
    this.refresh = this.refresh.bind(this);
  }
  componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    this.setState({ isLoading: true });
    getGeolocation(
      (position) => {
        let latitude = position.coords.latitude.toFixed(2);
        let longitude = position.coords.longitude.toFixed(2);
        this.getLocalCity(longitude, latitude);
        this.getLocalWeather(longitude, latitude);
      },
      (positionError) => {
        if (positionError.code === 1) {
          this.setState({ errMsg: "用户拒绝位置权限" });
        }
        this.setState({ isError: true });
        this.setState({ isLoading: false });
      }
    );
  }
  getLocalCity(longitude: string, latitude: string) {
    let location = `${longitude},${latitude}`;
    getCityInfo(location)
      .then((res: any) => {
        let data = res.location;
        this.setState({ location: data });
        this.setState({ isLoading: false });
      })
      .catch((err: any) => {
        this.setState({ isError: true });
        this.setState({ isLoading: false });
      });
  }
  getLocalWeather(longitude: string, latitude: string) {
    let location = `${longitude},${latitude}`;
    getHeWeather(location)
      .then((res: any) => {
        let data = res.now;
        this.setState({ weather: data });
        this.setState({ isLoading: false });
      })
      .catch((err: any) => {
        this.setState({ isError: true });
        this.setState({ isLoading: false });
      });
  }
  refresh() {
    this.getLocation();
  }
  render() {
    return (
      <Icon
        location={this.state.location}
        weather={this.state.weather}
        isLoading={this.state.isLoading}
        isError={this.state.isError}
        errMsg={this.state.errMsg}
        refresh={this.refresh}
      ></Icon>
    );
  }
}

export default HeWeather;
