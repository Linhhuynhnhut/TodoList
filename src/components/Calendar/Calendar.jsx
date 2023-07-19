import React, { useState, useEffect } from "react";
import "./calendar.scss";

const Calendar = () => {
  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateCalendar = (month, year) => {
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    let first_day = new Date(year, month, 1);

    let count = 1;
    const newCalendar = [];
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      i < first_day.getDay() ? newCalendar.push("") : newCalendar.push(count++);
    }
    setCalendar(newCalendar);
  };

  const isToday = (day, month, year) => {
    if (
      day === currDate.getDate() &&
      month_names.indexOf(month) === currDate.getMonth() &&
      year === currDate.getFullYear()
    ) {
      return true;
    } else return false;
  };

  const [month, setMonth] = useState("");
  const [year, setYear] = useState(0);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [today, setToday] = useState(0);
  const [currDate, setCurrDate] = useState(null);
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let currDate = new Date();
      //   console.log("currDate>>>", currDate.getFullYear());
      // let first_day = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
      generateCalendar(currDate.getMonth(), currDate.getFullYear());
      setMonth(month_names[currDate.getMonth()]);
      setYear(currDate.getFullYear());
      setToday(currDate.getDate());
      setCurrDate(currDate);
    };

    getData();
  }, []);

  return (
    <div className="calendar">
      <div className="calendar_header">
        <div
          className="calendar_header_month"
          onClick={() => {
            setMonthModalVisible(!monthModalVisible);
          }}
        >
          {month}
        </div>
        <div className="calendar_header_year">{year}</div>
      </div>
      <div className="calendar_body">
        <div className="calendar_week_day">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar_days">
          {calendar.map((item) => (
            <div
              className={`${isToday(item, month, year) ? "active" : ""} ${
                item === "" ? "none" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="calendar_footer">
        <div></div>
      </div>
      <div className={`month_list ${monthModalVisible ? "show" : ""}`}>
        {month_names.map((item) => {
          return (
            <div
              onClick={(e) => {
                generateCalendar(month_names.indexOf(e.target.innerHTML), year);
                setMonth(e.target.innerHTML);
                setMonthModalVisible(!monthModalVisible);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
