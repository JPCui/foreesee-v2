import { DailyWeatherModel } from "../../weather/props/daily_weather";

export interface Almanac {
  avoid: string;
  suit: string;
}

export interface IndexState {
  almanac: Almanac;
  dailyWeathers: DailyWeatherModel[];
}

export interface IndexProps {
  almanac: Almanac;
}
