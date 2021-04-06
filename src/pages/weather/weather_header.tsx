import * as React from "react";
import { Image, View } from "@tarojs/components";
import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "../components/calendar/style/calendar.scss";
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import "./style/weather.scss";
import { WeatherHeaderProps, WindDirection } from "./props/weather_header";
import "./style/weather_header.scss";
import { navigateTo } from "../../sdk/page";

export default class WeatherHeader extends React.Component<WeatherHeaderProps> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

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
      label,
      weather,
      weather_code,
      degree,
      humidity,
      wind_power,
      wind_direction
    } = this.props;
    let bg = null;
    if (weather.indexOf("沙") != -1) {
      bg = "linear-gradient(-180deg,#c09461,#eedfa1)";
    } else if (weather.indexOf("雨") != -1) {
      bg = "linear-gradient(-180deg,#43697f,#abd2d7)";
    } else {
      // 晴、多云
      bg = "linear-gradient(-180deg,#3bbcff,#4af4ff)";
    }
    const weatherIcon = weather_code
      ? `https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/day/${weather_code}.png`
      : null;
    return (
      <View
        className={`header weather_bg weather_bg_${weather_code}`}
        style={{
          // backgroundImage: `${bg}`,
          color: "white"
        }}
      >
        <View className="label" onClick={this.toSearch}>
          <View className="location" />
          {label}&nbsp;▼
        </View>
        <View className="at-row">
          {/*<View>{weather}</View>*/}
          <View className="at-col left">
            {weatherIcon && (
              <Image
                src={weatherIcon}
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </View>
          <View className="at-col right">
            <View className="tip-lg">
              {degree}°
              <View className="tip-md" style={{ display: "inline-block" }}>
                {weather}
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
