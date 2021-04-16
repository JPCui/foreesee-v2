import * as React from "react";
import { Image, View } from "@tarojs/components";
import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "../components/calendar/style/calendar.scss";
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import "./style/weather.scss";
import {
  BgCodeMap,
  WeatherHeaderProps,
  WeatherHeaderState,
  WindDirection
} from "./props/weather_header";
import "./style/weather_header.scss";
import { navigateTo } from "../../sdk/page";

export default class WeatherHeader extends React.Component<
  WeatherHeaderProps,
  WeatherHeaderState
> {
  constructor(props) {
    super(props);
    this.state = {
      isDay: false
    };
  }

  componentWillMount() {
    const d = new Date();
    if (d.getHours() < 18) {
      this.setState({ isDay: true });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  toSearch() {
    navigateTo({
      url: "/pages/search/index"
    });
  }

  render() {
    const {
      alarm,
      label,
      weather,
      weather_code,
      degree,
      humidity,
      wind_power,
      wind_direction,
      tips
    } = this.props;

    const weatherIcon = weather_code
      ? `https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/day/${weather_code}.png`
      : null;

    const { isDay } = this.state;
    const alarms = {};
    alarm &&
      Object.values(alarm).forEach(a => {
        if (!alarms[a.type_name]) {
          alarms[a.type_name] = a;
        }
      });

    const bg = isDay ? `weather_bg_${BgCodeMap[weather_code]}` : "night";
    return (
      <View
        className={`header weather_bg ${bg}`}
        style={{
          color: "white"
        }}
      >
        <View className="label" onClick={this.toSearch}>
          <View className="location" />
          {label}&nbsp;▼
        </View>
        {/* TIP */}
        <View className="tip-sm">
          {tips && tips.forecast_24h ? tips.forecast_24h[0] : " "}
        </View>
        {/* 天气 */}
        <View className="at-row" style={{ marginTop: "30px" }}>
          <View className="at-col">
            <View className="tip-lg">
              {degree}°
              <View
                className="tip-md"
                style={{ width: "50px", display: "inline-block" }}
              >
                {weatherIcon && (
                  <Image
                    src={weatherIcon}
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
                <View>{weather}</View>
              </View>
            </View>

            <View className="tip-sm">
              湿度 {humidity}% &nbsp;
              {WindDirection[wind_direction]} {wind_power}级
            </View>
          </View>
        </View>
      </View>
    );
  }
}
