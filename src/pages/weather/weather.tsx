import { Component } from 'react'
import { Image, View } from '@tarojs/components'
import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import '../components/calendar/style/calendar.scss'
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import "./weather.scss";
import * as React from "react";
import Calendar from "taro-ui/types/calendar";
import * as dayjs from "dayjs";
import { DailyWeatherProps, DailyWeatherState, DailyWeatherModel } from './weather.d';
import { EChart } from "echarts-taro3-react";

export default class DailyWeather extends Component<DailyWeatherProps, DailyWeatherState> {
    constructor(props) {
        super(props);
    }

    chart: any;

    onSelectedDate = async (item: { value: Calendar.SelectedDate }) => {
        console.log(item.value);
        const { start, end } = item.value;
    };

    rederChart = (node: any) => {
        console.log(node);

        this.chart = node;
    };

    getChartOption = () => {

    };

    componentWillMount() {
    }

    componentDidMount() {
        // const option = {
        //     xAxis: {
        //         show: false,
        //         type: "category",
        //         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Sun2"],
        //         axisTick: {
        //             length: 10
        //         }
        //     },
        //     yAxis: {
        //         show: false,
        //         type: "value",
        //     },
        //     grid: {
        //         left: 0,
        //         right: 0,
        //     },
        //     series: [
        //         {
        //             data: [120, 200, 150, 80, 70, 110, 130, 230],
        //             type: "line",
        //             showBackground: true,
        //             itemStyle: {
        //                 normal: { label: { show: true } }
        //             },
        //             backgroundStyle: {
        //                 color: "rgba(220, 220, 220, 0.8)",
        //             },
        //         },
        //     ],
        // };

        // this.chart.refresh(option);
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
            const dayWeatherIcon = "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/" + d.day_weather_code + ".png";
            const nightWeatherIcon = "https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/" + d.night_weather_code + ".png";
            const style = {
                // "width": "20%",
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
                <View className='w-col at-col at-col-2 ' style={style}>
                    <View style={{ height: "15px", "marginBottom": "10px" }}>{txt}</View>
                    <View style={{ height: "15px", "marginBottom": "10px" }}>{dateTxt}</View>
                    <View style={{ height: "15px", "marginBottom": "20px" }}>{d.day_weather}</View>
                    <View style={{ "marginBottom": "15px" }}>
                        <Image src={dayWeatherIcon} style={{ "width": "30px", "height": "30px" }}></Image>
                    </View>
                    <View style={{ height: "15px", "marginBottom": "10px", color:"orange" }}>{d.max_degree}</View>
                    <View style={{ height: "15px", "marginBottom": "10px", color: 'silver' }}>↓</View>
                    <View style={{ height: "15px", "marginBottom": "20px", color: "#4fc3f7" }}>{d.min_degree}</View>
                    <View style={{ "marginBottom": "10px" }}>
                        <Image src={nightWeatherIcon} style={{ "width": "30px", "height": "30px" }}></Image>
                    </View>
                    <View style={{ "marginBottom": "20px" }}>{d.night_weather}</View>
                    <View style={{}}>{d.night_wind_direction}</View>
                    <View style={{}}>{d.night_wind_power}</View>

                </View>
            );
        });

        return (
            <View style={{ position: 'relative', overflowX: 'auto', width: '100%' }}>
                <View className="chartBox">
                    <View className='at-row' style={{ "minHeight": "300px", textAlign: "center" }}>
                        {dailyWeatherDoms}
                    </View>
                    {/* <View className="flow">
                        <View className="canvas">
                        </View>
                        <EChart ref={this.rederChart} canvasId='gauge-chart' />
                    </View> */}
                </View>
            </View>
        )
    }
}
