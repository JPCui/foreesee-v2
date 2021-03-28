import { Component } from 'react'
import { Image, View } from '@tarojs/components'

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import '../components/calendar/style/calendar.scss'
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import * as React from "react";
import Calendar from "taro-ui/types/calendar";
import * as dayjs from "dayjs";
import { DailyWeatherProps, DailyWeatherState, DailyWeatherModel } from './weather.d';
import { AtAvatar } from 'taro-ui';

export default class DailyWeather extends Component<DailyWeatherProps, DailyWeatherState> {
    constructor(props) {
        super(props);
    }

    onSelectedDate = async (item: { value: Calendar.SelectedDate }) => {
        console.log(item.value);
        const { start, end } = item.value;
    };


    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const selectedDate: Calendar.SelectedDate = {
            start: dayjs().toDate(),
            end: dayjs().add(10, "day").toDate()
        };
        const ds = this.props.dailyWeathers;
        const dailyWeatherDoms = ds.map((d: DailyWeatherModel, index: number) => {
            const day = dayjs(d.time, "YYYY-MM-DD");
            let dateTxt = day.format("MM-DD");
            let txt = "";
            if (index == 0) {
                txt = "昨天";
            } else if (index == 1) {
                txt = "今天";
            } else if (index == 2) {
                txt = "明天";
            } else if (index == 3) {
                txt = "后天";
            } else {
                const weekDay = day.day();
                switch (weekDay) {
                    case 0: txt = "周日"; break;
                    case 1: txt = "周一"; break;
                    case 2: txt = "周二"; break;
                    case 3: txt = "周三"; break;
                    case 4: txt = "周四"; break;
                    case 5: txt = "周五"; break;
                    case 6: txt = "周六"; break;
                }
            }
            const dayWeatherIcon = "http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/" + d.day_weather_code + ".png";
            const nightWeatherIcon = "http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/" + d.night_weather_code + ".png";
            const style = {
                "width": "20%",
                "padding": "11px 0 25px",
                "color": "#333",
                "backgroundColor": "",
                fontSize: "12px"
            };
            if (txt == "今天") {
                style.backgroundColor = "#eaf0ff";
            }
            if (txt == "昨天") {
                style.color = "#b2b2b2";
            }
            return (
                <View className='at-col at-col-2' style={style}>
                    <View style={{ "marginBottom": "10px" }}>{txt}</View>
                    <View style={{ "marginBottom": "10px" }}>{dateTxt}</View>
                    <View style={{ "marginBottom": "20px" }}>{d.day_weather}</View>
                    <Image src={dayWeatherIcon} style={{ "width": "30px", "height": "30px" }}></Image>
                    <View>&nbsp;</View>
                    <Image src={nightWeatherIcon} style={{ "width": "30px", "height": "30px" }}></Image>
                    <View style={{ "marginBottom": "20px" }}>{d.night_weather}</View>
                    <View style={{  }}>{d.night_wind_direction}</View>
                    <View style={{  }}>{d.night_wind_power}</View>

                </View>
            );
        });
        return (
            <View className='at-row' style={{ "minHeight": "300px", "overflow": "scroll", textAlign: "center" }}>
                {dailyWeatherDoms}
            </View>
        )
    }
}
