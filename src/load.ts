import { getCityInfo, getHeWeather } from "./api/heWeather/heWeather";
import { getGeolocation } from "./utils/utils";
//进入页面加载时使用的全局内容
getGeolocation(
  (position) => {
    let latitude = position.coords.latitude.toFixed(2);
    let longitude = position.coords.longitude.toFixed(2);
    getHeWeather(`${longitude},${latitude}`).then((res) => {
      console.log(res);
    });
    getCityInfo(`${longitude},${latitude}`).then((res) => {
      console.log(res);
    });
  },
  (positionError) => {
    console.error(positionError.message);
  }
);
