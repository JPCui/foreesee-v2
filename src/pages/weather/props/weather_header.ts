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

/**
 * 天气code 转 背景颜色css code
 */
export const BgCodeMap = {
  "00": "C2",
  "01": "C9",
  "02": "C1",
  "03": "C3",
  "04": "C3",
  "05": "C3",
  "06": "C3",
  "07": "C3",
  "08": "C3",
  "09": "C3",
  10: "C3",
  11: "C3",
  12: "C3",
  13: "C4",
  14: "C4",
  15: "C4",
  16: "C4",
  17: "C4",
  18: "C5",
  19: "C3",
  20: "C7",
  21: "C3",
  22: "C3",
  23: "C3",
  24: "C3",
  25: "C3",
  26: "C4",
  27: "C4",
  28: "C4",
  29: "C7",
  30: "C7",
  31: "C7",
  53: "C6",
  99: "C8",
  32: "C5",
  49: "C5",
  54: "C6",
  55: "C6",
  56: "C6",
  57: "C5",
  58: "C5",
  301: "C3",
  302: "C4"
};

interface Alarm {
  detail: string;
  type_name: string;
  type_code: string;
  level_name: string;
  level_code: string;

  province: string;
  city: string;
  country: string;
}

export interface WeatherHeaderState {
  isDay: boolean;
}

export interface WeatherHeaderProps {
  tips: {
    forecast_24h: string[];
  };
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
  alarm: Alarm[];
}
