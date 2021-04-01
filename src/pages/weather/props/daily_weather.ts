import { Dayjs } from "dayjs";

export interface DailyWeatherProps {
  dailyWeathers: DailyWeatherModel[];
}

export interface DailyWeatherState {
  chart: any;
}

export interface DailyWeatherModel {
  date: Dayjs;
  time: string;
  day_weather: string;
  day_weather_code: string;
  // 白天风力
  day_wind_power: string;
  day_wind_power_code: string;

  min_degree: string;
  max_degree: string;

  night_weather: string;
  night_weather_code: string;
  // 夜晚风向
  night_wind_direction: string;
  night_wind_direction_code: string;
  // 夜晚风力
  night_wind_power: string;
  night_wind_power_code: string;
}
