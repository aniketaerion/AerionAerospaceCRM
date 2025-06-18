// src/pages/dealer/crm/customers/CustomerCalendarView.jsx

import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enGB } from 'date-fns/locale'; // ✅ Use valid locale
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-IN': enGB // ✅ Replace 'require' with supported locale import
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
});

export default function CustomerCalendarView({ customer }) {
  const events = [];

  if (customer?.dob) {
    events.push({
      title: `🎂 ${customer.name}'s Birthday`,
      start: new Date(customer.dob),
      end: new Date(customer.dob),
      allDay: true
    });
  }

  (customer?.renewals || []).forEach((r) => {
    events.push({
      title: `🔁 Renewal: ${r.title}`,
      start: new Date(r.date),
      end: new Date(r.date),
      allDay: true
    });
  });

  (customer?.amc || []).forEach((a) => {
    events.push({
      title: `🛠️ AMC: ${a.product}`,
      start: new Date(a.date),
      end: new Date(a.date),
      allDay: true
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
