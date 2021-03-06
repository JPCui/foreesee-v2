import * as React from "react";
import { View } from "@tarojs/components";
import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "../components/calendar/style/calendar.scss";
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import "./style/weather.scss";
import { DailyWeatherModel } from "./props/daily_weather";
import call from "../../service/request";
import Service from "../../service/api";
import { WeatherProps, WeatherState } from "./props/weather";
import { DailyWeather } from "./daily_weather";
import WeatherHeader from "./weather_header";
import { WeatherHeaderProps } from "./props/weather_header";
// @ts-ignore
import Taro from "@tarojs/taro";
import Living from "./living";
import { AtNoticebar } from "taro-ui";
import { CityInfo } from "../search/props/search";

export default class Weather extends React.Component<
  WeatherProps,
  WeatherState
> {
  constructor(props) {
    super(props);
    this.state = {
      weatherHeaderProps: {
        tips: {
          forecast_24h: [""]
        },
        alarm: [],
        label: "",
        degree: "",
        weather: "",
        weather_code: "",
        /**
         * 湿度
         */
        humidity: "",
        /**
         * 风力
         */
        wind_power: "",
        wind_direction: ""
      },
      dailyWeathers: [],
      livings: []
    };
  }

  componentWillMount() {
    const { city } = this.props;
    this.getDailyWeathers(city);

    const _this = this;
    Taro.eventCenter.on("onSelectItem", item => {
      _this.getDailyWeathers(item);
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 根据省份、城市获取7天天气信息
   * @param provice
   * @param city
   */
  getDailyWeathers = async (city: CityInfo) => {
    const weatherResp: any = await call(
      Service.Weather + `&province=${city.province}&city=${city.city}&county=`
    );

    // 获取未来一周的天气
    const dws = weatherResp.data.forecast_24h;

    const dailyWeathers: DailyWeatherModel[] = [];
    for (let index = 0; index < 8; index++) {
      const w = dws[index];
      dailyWeathers.push({ ...w });
    }

    const observe = weatherResp.data.observe;
    const alarm = weatherResp.data.alarm;
    const tips = weatherResp.data.tips;
    const weatherHeaderProps: WeatherHeaderProps = {
      ...observe,
      alarm,
      tips
    };

    const livings = weatherResp.data.index;
    this.setState({
      weatherHeaderProps,
      dailyWeathers,
      livings
    });
  };

  render() {
    const cityInfo = this.props.city;
    const { province, city, district } = cityInfo;
    const showCity = district ? city + " " + district : province + " " + city;
    const {
      livings,
      weatherHeaderProps: weatherHeader,
      dailyWeathers
    } = this.state;
    return (
      <View>
        <WeatherHeader
          tips={weatherHeader.tips}
          alarm={weatherHeader.alarm}
          label={showCity}
          degree={weatherHeader.degree}
          weather={weatherHeader.weather}
          weather_code={weatherHeader.weather_code}
          humidity={weatherHeader.humidity}
          wind_power={weatherHeader.wind_power}
          wind_direction={weatherHeader.wind_direction}
        />
        <View>
          <DailyWeather dailyWeathers={dailyWeathers} />
        </View>
        <Living items={livings} />
        <View className="footer">
          <AtNoticebar>数据来源于腾讯天气</AtNoticebar>
          <View>Copyright © 2021. All Rights Reserved</View>
        </View>
      </View>
    );
  }
}
