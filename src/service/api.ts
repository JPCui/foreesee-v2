const Service = {
  // province=%E5%8C%97%E4%BA%AC%E5%B8%82&city=%E5%8C%97%E4%BA%AC%E5%B8%82&county=
  Weather: `GET https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Calarm%7Ctips`,
  GetLocation: `GET https://apis.map.qq.com/ws/location/v1/ip?key=QJCBZ-Q2TK3-NWM3K-YN2M2-D4M6V-PABR7`,
  // city
  CITY_SEARCH: `GET https://wis.qq.com/city/matching?source=xw&`
};

export interface CitySearchResponse {
  status: number;
  data: {
    internal: any;
  };
}

export default Service;
