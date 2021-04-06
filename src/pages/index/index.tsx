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
import call from "../../service/request";
// @ts-ignore
import MapService, {
  GetLocationModel,
  GetLocationResp
} from "../../service/map";
import Weather from "../weather/weather";
import { AtDrawer } from "taro-ui";
// @ts-ignore
import Taro from "@tarojs/taro";

const DEFAULT_PROVICE = "北京";
const DEFAULT_CITY = DEFAULT_PROVICE;

const defaultProps: IndexProps = {
  almanac: {
    avoid: "",
    suit: ""
  }
};

export default class Index extends Component<IndexProps, IndexState> {
  constructor(props) {
    super(props);
    this.state = {
      province: DEFAULT_PROVICE,
      city: DEFAULT_CITY
      // http://opendata.baidu.com/api.php?query=2020-4&resource_id=6018&format=json
    };
    this.getPosition();
  }

  // onSelectedDate = async (item: { value: Calendar.SelectedDate }) => {
  //   console.log(item.value);
  //   const { start, end } = item.value;
  //
  //   const weatherResp: any = await call(Service.Weather);
  //   const dailyWeathers = weatherResp.forecast_24h;
  // };

  getPosition = async () => {
    const location: GetLocationModel = await MapService.GetLocation();
    const { province, city } = location.ad_info;
    this.setState({ province, city });
  };

  componentWillMount() {
    this.getPosition();
  }

  componentDidMount() {
    const _this = this;
    Taro.eventCenter.on("onSelectItem", item => {
      console.log("listen: ", item);
      const { province, city } = item;
      _this.setState({ province, city });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { province, city } = this.state;
    return (
      <View className="index">
        <View style={{ minHeight: "300px", textAlign: "center" }}>
          <Weather province={province} city={city} />
        </View>

        {/* <AtCalendar selectedDate={selectedDate} onSelectDate={this.onSelectedDate} /> */}
        {/* <JpCalendar /> */}
      </View>
    );
  }
}
