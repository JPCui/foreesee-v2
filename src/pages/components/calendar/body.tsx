import {View} from "@tarojs/components";
import {Component} from "react";
import "taro-ui/dist/style/components/flex.scss";
import "./style/calendar.scss"
import JpCalendar, {JpCalendarBodyProps} from "./props/calendar";
import {TYPE_NEXT_MONTH, TYPE_NOW_MONTH, TYPE_PRE_MONTH} from "./props/const";
import Day = JpCalendar.Day;
import dayjs = require("dayjs");

class CalendarBody extends Component<JpCalendarBodyProps> {

  constructor(props) {
    super(props);
    this.onSelectedDate = this.onSelectedDate.bind(this);
  }

  onSelectedDate = (d: Day) => {
    this.props.onSelectedDate(d);
  };

  // TODO 用 dayjs 代替之前的逻辑
  toXMonth = (xYear, xMonth: number) => {
    const days: Array<Day> = [];

    // today
    const d = new Date();
    d.setFullYear(xYear, xMonth - 1, 1);
    var date = dayjs(d).startOf('month');
    var lastDate = date.endOf('month').startOf('day');

    // 上月最后一天是周几
    const leftDaysLastMonth = (date.day() + 6) % 7;
    console.log(date.startOf('w').day(), "leftDaysLastMonth", leftDaysLastMonth);
    for (let i = 1; i <= leftDaysLastMonth + 1; i++) {
      days.push({
        d: date.add(-i, 'day').startOf('day'),
        type: TYPE_PRE_MONTH,
      });
    }
    days.reverse();

    // 本月多少天
    var daysOfThisMonth = date.daysInMonth();
    for (let i = 0; i < daysOfThisMonth; i++) {
      const thisDate = date.add(i, 'day').startOf('day');
      days.push({
        d: thisDate,
        type: TYPE_NOW_MONTH,
      });
    }

    // 下个月
    const total = 6 * 7;
    for (let i = total; total > days.length; i--) {
      var thisDate = lastDate.add(total - i + 1, 'day').startOf('day');
      days.push({
        d: thisDate,
        type: TYPE_NEXT_MONTH,
      });
    }

    return days;
  };

  toXMonth2 = (xYear, xMonth: number) => {
    const days: Day[] = [];

    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currDay = date.getDate();
    // 当月第一天
    date.setFullYear(xYear, xMonth - 1, 1);

    // 周几，0=>周日
    const currWeekDay = date.getDay();

    let preMonth: Date = new Date(date.valueOf());
    preMonth.setDate(1 - currWeekDay);

    let dd = 1;
    while (true) {
      const tCurrMonth = preMonth.getMonth() + 1;
      const tCurrDate = preMonth.getDate();
      days.push({
        d: dayjs(),
        "key": this.dateFormat(preMonth, "yyyy-MM-dd"),
        "year": preMonth.getFullYear(),
        "month": tCurrMonth,
        "day": preMonth.getDate(),
        isSelectedDay: false,
        type: tCurrMonth === xMonth ? TYPE_NOW_MONTH : TYPE_PRE_MONTH,
        isCurrentDay: tCurrMonth === currMonth && tCurrDate == currDay,
      });

      // 下一天
      preMonth.setDate(preMonth.getDate() + 1);

      if ((preMonth.getMonth() + 1 > xMonth || preMonth.getFullYear() > xYear) && date.getDay() === 0) {
        break;
      }
      if (dd++ === 100) {
        break;
      }
    }
    return days;

  };

  dateFormat = (date, fmt) => {
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
          (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(
            ("" + o[k]).length)));
      }
    }
    return fmt;
  };

  render(): React.ReactNode {

    const style = {
      defaultItem: "jp-cal-item",
      selectedItem: "jp-cal-item selected",
      isCurrMonth: "jp-cal-item highlight",
    };

    const aWeek = ['日', '一', '二', '三', '四', '五', '六'];
    const calTitle = aWeek.map((w: string) => {
      return <View className='at-col'>{w}</View>
    });

    // const xYear = 2020;
    // const xMonth = 12;
    const {xYear, xMonth} = this.props;

    let xMonthDays = this.toXMonth(xYear, xMonth);
    const tDayDoms = xMonthDays.map((d: Day) => {
      return (
        <View className='at-col jp-cal-item-wrapper'>
          <View className={
            d.isSelectedDay
              ? style.selectedItem
              : (d.type === TYPE_NOW_MONTH ? style.isCurrMonth : style.defaultItem)
          }
            onClick={() => this.onSelectedDate(d)}
          >
            {d.d.date()}
          </View>
        </View>
      );
    });

    return (

      <View className='jp-cal'>
        <View className='at-row'>
          {calTitle}
        </View>
        <View className='at-row at-row--wrap'>
          {tDayDoms}
        </View>
      </View>

    );

  }

}

export default CalendarBody
