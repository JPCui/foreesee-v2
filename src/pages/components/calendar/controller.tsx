import {View} from "@tarojs/components";
import {Component} from "react";
import "taro-ui/dist/style/components/flex.scss";
import "./style/calendar.scss"
import {JpCalendarControllerProps} from "./props/calendar";

class CalendarController extends Component<JpCalendarControllerProps> {

  constructor(props) {
    super(props);
    this.onClickNextMonth = this.onClickNextMonth.bind(this);
    this.onClickPrevMonth = this.onClickPrevMonth.bind(this);
  }

  onClickPrevMonth = () => {
    this.props.handleMonthChange(-1);
  };

  onClickNextMonth = () => {
    this.props.handleMonthChange(1);
  };

  render(): React.ReactNode {

    const {xYear, xMonth} = this.props;

    return (

      <View className='at-row'>
        <View className='at-col at-col__offset-3' />
        <View className='at-col at-col-1' onClick={this.onClickPrevMonth}>
          <View className='jp-cal-arrow' />
        </View>
        <View className='at-col at-col-3'>
          {xYear + "年" + xMonth + "月"}
        </View>
        <View className='at-col at-col-1' onClick={this.onClickNextMonth}>
          <View className='jp-cal-arrow jp-cal-arrow-right' />
        </View>
        <View className='at-col at-col__offset-3' />
      </View>

    );

  }

}

export default CalendarController
