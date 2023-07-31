import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru';
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ events }) => {
  const localizer = momentLocalizer(moment);
  console.log('events:', events);

  const formattedEvents = events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh", background: "#fff", padding: "5px", borderRadius: "10px" }}
        messages={{
          next: (<RightOutlined />),
          previous: (<LeftOutlined />),
          today: "Сегодня",
          month: "Месяц",
          week: "Неделя",
          day: "День",
          agenda: "Список",
          date: "Дата",
          time: "Время",
          event: "Событие",
          allDay: "-"
        }}
      />
    </div>
  );
};

export default MyCalendar;
