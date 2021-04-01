import * as React from "react";
import { Component } from "react";
import { View } from "@tarojs/components";

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import "./index.scss";
import "../components/calendar/style/calendar.scss";
import { IndexProps, IndexState } from "./props";
import * as dayjs from "dayjs";
import call from "../../service/request";
import Service from "../../service/api";
// @ts-ignore
import { DailyWeatherModel } from "../weather/props/daily_weather";
import Calendar from "taro-ui/types/calendar";
import MapService, { GetLocationResp } from "../../service/map";
import Weather from "../weather/weather";

const defaultProps: IndexProps = {
  almanac: {
    avoid: "",
    suit: ""
  }
};

export default class Index extends Component<IndexProps, IndexState> {
  constructor(props) {
    super(props);
    this.setState({
      // http://opendata.baidu.com/api.php?query=2020-4&resource_id=6018&format=json
    });
  }

  // onSelectedDate = async (item: { value: Calendar.SelectedDate }) => {
  //   console.log(item.value);
  //   const { start, end } = item.value;
  //
  //   const weatherResp: any = await call(Service.Weather);
  //   const dailyWeathers = weatherResp.forecast_24h;
  // };

  getPosition = async () => {
    const location: GetLocationResp = (await call(
      MapService.GetLocation
    )) as GetLocationResp;
    const { province, city } = location.result.ad_info;
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View
          className="at-row"
          style={{ minHeight: "300px", textAlign: "center" }}
        >
          <Weather province="北京" city="北京" />
        </View>

        {/* <AtCalendar selectedDate={selectedDate} onSelectDate={this.onSelectedDate} /> */}
        {/* <JpCalendar /> */}
      </View>
    );
  }
}
