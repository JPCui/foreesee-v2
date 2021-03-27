import {Dayjs} from "dayjs";

declare namespace Calendar {

  export interface Day {
    // 当前选择的日期
    selectedDate?: Dayjs
    // 跳转到某个日期
    d: Dayjs
    key?: string
    year?: number
    month?: number
    day?: number
    /**
     * 类型，上月、本月、下月
     */
    type: number
    /**
     * 当前点中的日期
     */
    isSelectedDay?: boolean
    /**
     * 今天
     */
    isCurrentDay?: boolean
  }

}

export default Calendar
export {Calendar}

export interface JpCalendarProps {

  /**
   @deprecated
   */
  xYear: number

  xMonth: number

}

export interface JpCalendarControllerProps extends JpCalendarProps {

  handleMonthChange: any

}

export interface JpCalendarBodyProps extends JpCalendarProps {

  onSelectedDate: (d: Calendar.Day) => void

}

export interface JpCalendarState {
  thisYear: number

  thisMonth: number

  thisDate: Dayjs
}
