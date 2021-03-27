import {Component} from 'react'
import {View} from '@tarojs/components'

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import '../components/calendar/style/calendar.scss'
import JpCalendar from "../components/calendar/calendar";
import * as React from "react";
import Calendar from "taro-ui/types/calendar";
import * as dayjs from "dayjs";
import {AtCalendar} from "taro-ui";

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const selectedDate: Calendar.SelectedDate = {
      start: dayjs().toDate(),
      end: dayjs().add(10, "day").toDate()
    };
    return (
      <View className='index'>
        <AtCalendar selectedDate={selectedDate} />
        <JpCalendar />
      </View>
    )
  }
}
