import request from "@/utils/axios";

export const getHeWeather = (location: string) => {
  return request({
    url: "/heWeather/v7/weather/now",
    method: "get",
    params: {
      key: "dcf5a273944542d681835fdffee70bf7",
      location,
    },
  });
};

export const getCityInfo = (location: string) => {
  return request({
    url: "/geoapi/v2/city/lookup",
    method: "get",
    params: {
      key: "dcf5a273944542d681835fdffee70bf7",
      location,
    },
  });
};
