import { Component } from 'react'
import { Swiper, SwiperItem, View } from '@tarojs/components'

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import '../components/calendar/style/calendar.scss'
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import JpCalendar from "../components/calendar/calendar";
import { Almanac, IndexProps, IndexState } from "./index.d"
import * as React from "react";
import Calendar from "taro-ui/types/calendar";
import * as dayjs from "dayjs";
import { AtCalendar, AtGrid } from "taro-ui";
import call from '../../service/request';
import Service from '../../service/api';
import DailyWeather from '../weather/weather';
import { DailyWeatherModel } from '../weather/weather';

const defaultProps: IndexProps = {
  almanac: {
    avoid: "",
    suit: ""
  }
}

export default class Index extends Component<IndexProps, IndexState> {
  constructor(props) {
    super(props);
    this.state = {
      // http://opendata.baidu.com/api.php?query=2020-4&resource_id=6018&format=json
      almanac: this.props.almanac,
      dailyWeathers: []
    };
  }

  onSelectedDate = async (item: { value: Calendar.SelectedDate }) => {
    console.log(item.value);
    const { start, end } = item.value;

    const weatherResp:any = await call(Service.Weather);
    const dailyWeathers = weatherResp.forecast_24h;

  };
  
  getDailyWeathers = async () => {
    const weatherResp: any = await call(Service.Weather);
    const dws = weatherResp.data.forecast_24h;

    const dailyWeathers: DailyWeatherModel[] = [];
    for (let index = 0; index < 8; index++) {
        const w = dws[index];
        dailyWeathers.push({ ...w });
    }
    this.setState({ dailyWeathers });
};

  componentWillMount() {
    this.getDailyWeathers();
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const selectedDate: Calendar.SelectedDate = {
      start: dayjs().toDate(),
      end: dayjs().add(10, "day").toDate()
    };
    const dailyWeathers = this.state.dailyWeathers;
    return (
      <View className='index'>
        <View className='at-row' style={{"minHeight": "300px", textAlign: "center"}}>
          <DailyWeather dailyWeathers={dailyWeathers} />
        </View>

        {/* <AtCalendar selectedDate={selectedDate} onSelectDate={this.onSelectedDate} /> */}
        {/* <JpCalendar /> */}
      </View>
    )
  }
}
