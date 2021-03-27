import dayjs from "dayjs";

const buildDayjs = function (year, month: number) {
  return dayjs(year + '-' + month, 'YYYY-M');
}

export default buildDayjs
