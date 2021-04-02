export const WindDirection = [
  "",
  "东北风",
  "东风",
  "东南风",
  "南风",
  "西南风",
  "西风",
  "西北风",
  "北风"
];
export interface WeatherHeaderProps {
  label: string;
  /**
   * 天气
   */
  degree: string;
  weather: string;
  weather_code: string;
  /**
   * 湿度
   */
  humidity: string;
  /**
   * 风力
   */
  wind_power: string;
  /**
   * 东北：1，按顺时针逐渐 +1
   */
  wind_direction: string;
}
