// src/pages/dealer/crm/customers/CustomerCalendarView.jsx

import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-IN': require('date-fns/locale/en-IN'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CustomerCalendarView({ customer }) {
  const events = [];

  if (customer.dob) {
    const dobEvent = {
      title: `🎂 ${customer.name}'s Birthday`,
      start: new Date(customer.dob),
      end: new Date(customer.dob),
      allDay: true,
    };
    events.push(dobEvent);
  }

  (customer.renewals || []).forEach((r, i) => {
    events.push({
      title: `🔁 Renewal: ${r.title}`,
      start: new Date(r.date),
      end: new Date(r.date),
      allDay: true,
    });
  });

  (customer.amc || []).forEach((a, i) => {
    events.push({
      title: `🛠️ AMC: ${a.product}`,
      start: new Date(a.date),
      end: new Date(a.date),
      allDay: true,
    });
  });

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">📅 Milestone Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        views={['month', 'agenda']}
      />
    </div>
  );
}
