import MonthCalendar from "./MonthCalendar.tsx";
import "./index.scss";
import Header from "./Header.tsx";
import { CSSProperties, ReactNode, useState } from "react";
import cs from "classnames";
import LocaleContext from "./LocaleContext.tsx";
import dayjs, {Dayjs} from 'dayjs'

export interface CalendarProps {
  value?: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {

  const {
    value,
    style,
    className,
    dateRender,
    dateInnerContent,
    locale,
    onChange
  } = props;

  const [curValue, setCurValue] = useState<Dayjs>(value);

  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  const classNames = cs("calendar", className);

  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  }

  function todayHandler() {
    const date = dayjs(Date.now());
    changeDate(date);
  }


  return <LocaleContext.Provider value={{
    locale: locale || navigator.language
  }}>
    <div className={classNames} style={style}>
      <Header curMonth={curMonth} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} todayHandler={todayHandler}></Header>
      <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler}/>
    </div>
  </LocaleContext.Provider>
}


export default Calendar;
