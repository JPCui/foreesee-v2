import "taro-ui/dist/style/components/flex.scss";
import {View} from '@tarojs/components';
import {Component} from "react";
import "./style/calendar.scss"
import CalendarController from "./controller";
import Calendar, {JpCalendarProps, JpCalendarState} from "./props/calendar";
import buildDayjs from "./common/helper";
import CalendarBody from "./body";

const now = new Date();
const log =  (...data: any[]) => {
  console.log(...data);
}

const defaultProps: JpCalendarProps = {
  xYear: now.getFullYear(),
  xMonth: now.getMonth() + 1,
}

class JpCalendar extends Component<JpCalendarProps, JpCalendarState> {

  static defaultProps: JpCalendarProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      thisYear: this.props.xYear,
      thisMonth: this.props.xMonth,
      thisDate: buildDayjs(this.props.xYear, this.props.xMonth)
    };
  }

  handleSelectedDate = (d: Calendar.Day) => {
    const {year, month} = d;
    if (year && month) {
      this.setState({thisYear: year, thisMonth: month});
    }
  };

  handleMonthChange = (delta) => {
    const {thisYear, thisMonth} = this.state;
    const t = thisMonth + delta;

    let [_thisYear, _thisMonth] = [thisYear, thisMonth];
    if (t > 12) {
      _thisYear = thisYear + 1;
      _thisMonth = 1;
    } else if (t <= 0) {
      _thisYear = thisYear - 1;
      _thisMonth = 12;
    } else {
      _thisMonth = t;
    }
    this.setState({thisYear: _thisYear, thisMonth: _thisMonth});
  };

  render(): React.ReactNode {

    const {thisYear, thisMonth} = this.state;

    log(thisYear, thisMonth);

    return (

      <View className='jp-cal'>
        <CalendarController xYear={thisYear} xMonth={thisMonth} handleMonthChange={this.handleMonthChange} />
        <CalendarBody xYear={thisYear} xMonth={thisMonth} onSelectedDate={this.handleSelectedDate} />
      </View>

    );

  }

}

JpCalendar.defaultProps = {
  xYear: now.getFullYear(),
  xMonth: now.getMonth() + 1,
};

export default JpCalendar
