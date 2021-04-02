import { DailyWeatherModel } from "../../weather/props/daily_weather";

export interface Almanac {
  avoid: string;
  suit: string;
}

export interface IndexState {
  province: string;
  city: string;
  // almanac: Almanac;
  // dailyWeathers: DailyWeatherModel[];
}

export interface IndexProps {
  almanac: Almanac;
}
