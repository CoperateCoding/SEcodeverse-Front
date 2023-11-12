// Calendar.js

import React from 'react';

class Calendar extends React.Component {
  render() {
    const date = new Date();
    const currentDate = this.props.currentDate;

    const calendarYear = currentDate.getFullYear();
    const calendarMonth = currentDate.getMonth() + 1;
    const calendarToday = currentDate.getDate();

    const monthLastDate = new Date(calendarYear, calendarMonth, 0);
    const calendarMonthLastDate = monthLastDate.getDate();
    const monthStartDay = new Date(calendarYear, currentDate.getMonth(), 1);
    const calendarMonthStartDay = monthStartDay.getDay();

    const calendarWeekCount = Math.ceil((calendarMonthStartDay + calendarMonthLastDate) / 7);

    const htmlRows = [];

    let calendarPos = 1;
    let calendarDay = 1;

    for (let index1 = 0; index1 < calendarWeekCount; index1++) {
      const htmlCols = [];
      for (let index2 = 0; index2 < 8; index2++) {
        if (index2 === 0) {
          if (index1 === 0 && calendarPos === 1) {
            htmlCols.push(<td key={-1} rowSpan={calendarWeekCount} style={{ border: 'solid 1px black', padding: '10px', textAlign: 'center' }}>{calendarMonth}</td>);
          }
        } else if ((index1 === 0 && index2 >= calendarMonthStartDay) || (index1 > 0 && calendarDay <= calendarMonthLastDate)) {
          const isToday = calendarDay === calendarToday;
          const isMonth = calendarMonth === date.getMonth() + 1;
          const circleStyle = (isToday && isMonth) ? { borderRadius: '25%', backgroundColor: 'red', color: 'white'} : {};
          htmlCols.push(
            <td key={calendarDay} style={{ border: 'solid 1px black', padding: '10px', textAlign: 'center' }}>
              <span style={isToday ? circleStyle : {}}>{calendarDay}</span>
            </td>
          );
          calendarDay++;
        } else {
          htmlCols.push(<td key={100 + index2} style={{ border: 'solid 1px black', padding: '10px', textAlign: 'center' }}></td>);
        }
      }
      htmlRows.push(<tr key={index1}>{htmlCols}</tr>);
    }

    return <table style={{ borderCollapse: 'collapse', width: '100%', height: '100%' }}>{htmlRows}</table>;
  }
}

export default Calendar;
