import { DailyWeatherModel } from "../../weather/props/daily_weather";
import { CityInfo } from "../../search/props/search";

export interface Almanac {
  avoid: string;
  suit: string;
}

export interface IndexState {
  city: CityInfo;
  // almanac: Almanac;
  // dailyWeathers: DailyWeatherModel[];
}

export interface IndexProps {
  almanac: Almanac;
}
