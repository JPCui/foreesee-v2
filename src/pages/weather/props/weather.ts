import { DailyWeatherModel } from "./daily_weather";
import { WeatherHeaderProps } from "./weather_header";
import { LivingModel } from "./living";
import { CityInfo } from "../../search/props/search";

export interface WeatherProps {
  city: CityInfo;
}

export interface WeatherState {
  weatherHeaderProps: WeatherHeaderProps;
  dailyWeathers: DailyWeatherModel[];
  livings: LivingModel[];
}
