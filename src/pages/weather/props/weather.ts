import { DailyWeatherModel } from "./daily_weather";
import { WeatherHeaderProps } from "./weather_header";
import { LivingModel } from "./living";

export interface WeatherProps {
  province: string;
  city: string;
  district?: string;
}

export interface WeatherState {
  weatherHeaderProps: WeatherHeaderProps;
  dailyWeathers: DailyWeatherModel[];
  livings: LivingModel[];
}
