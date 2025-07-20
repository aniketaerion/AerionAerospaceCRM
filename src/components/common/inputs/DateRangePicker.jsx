// src/components/common/inputs/DateRangePicker.jsx
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Assuming you have a basic Button component from '@/components/common/Button'
import Button from '@/components/common/Button'; // Ensure this import is correct

/**
 * A compact Date Range Picker component with calendar UI, preset options,
 * and triggered by a single button.
 *
 * @param {object} props
 * @param {object} props.selectedRange - Object with { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', label: string } for current selection.
 * @param {function} props.onRangeChange - Callback function when the range changes. Receives { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', label: string }.
 * @param {string} [props.label='Select Date Range'] - Label for the button.
 * @param {Array<object>} [props.presetOptions] - Optional custom preset buttons. Each object: { label: string, value: string }.
 */
export function DateRangePicker({ selectedRange, onRangeChange, label = 'Select Date Range', presetOptions = [] }) {
  const [startDate, setStartDate] = useState(selectedRange?.startDate ? new Date(selectedRange.startDate) : null);
  const [endDate, setEndDate] = useState(selectedRange?.endDate ? new Date(selectedRange.endDate) : null);
  const [activePreset, setActivePreset] = useState(selectedRange?.label || '');
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  const wrapperRef = useRef(null); // Ref for click outside detection

  // Sync internal state with external prop
  useEffect(() => {
    setStartDate(selectedRange?.startDate ? new Date(selectedRange.startDate) : null);
    setEndDate(selectedRange?.endDate ? new Date(selectedRange.endDate) : null);
    setActivePreset(selectedRange?.label || '');
  }, [selectedRange]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);


  const triggerChange = (start, end, customLabel = '') => {
    const newLabel = customLabel || (start && end ? `${start.toLocaleDateString()} - ${end.toLocaleDateString()}` : '');
    onRangeChange({
      startDate: start ? start.toISOString().split('T')[0] : null,
      endDate: end ? end.toISOString().split('T')[0] : null,
      label: newLabel
    });
    setActivePreset(customLabel);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // If both dates are selected, trigger change and close dropdown
    if (start && end) {
        triggerChange(start, end);
    } else {
        // If only one date is selected, keep dropdown open for second date
        triggerChange(start, end, "Custom Range"); // Update label to 'Custom Range'
    }
  };

  const handlePresetChange = (presetValue) => {
    let start = null;
    let end = new Date();

    if (presetValue === 'Today') {
      start = new Date();
    } else if (presetValue === 'This Week') {
      start = new Date();
      start.setDate(start.getDate() - (start.getDay() === 0 ? 6 : start.getDay() - 1));
      end = new Date();
    } else if (presetValue === 'Last 7 Days') {
      start = new Date();
      start.setDate(end.getDate() - 6);
    } else if (presetValue === 'This Month') {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else if (presetValue === 'Last Month') {
      start = new Date(end.getFullYear(), end.getMonth() - 1, 1);
      end = new Date(end.getFullYear(), end.getMonth(), 0);
    } else if (presetValue === 'Last 30 Days') {
      start = new Date();
      start.setDate(end.getDate() - 29);
    } else if (presetValue === 'Last Quarter') {
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();

      let quarterStartMonth, quarterEndMonth;

      if (month >= 0 && month <= 2) {
        year--;
        quarterStartMonth = 9;
        quarterEndMonth = 11;
      } else if (month >= 3 && month <= 5) {
        quarterStartMonth = 0;
        quarterEndMonth = 2;
      } else if (month >= 6 && month <= 8) {
        quarterStartMonth = 3;
        quarterEndMonth = 5;
      } else {
        quarterStartMonth = 6;
        quarterEndMonth = 8;
      }
      start = new Date(year, quarterStartMonth, 1);
      end = new Date(year, quarterEndMonth + 1, 0);
    } else if (presetValue === 'Year-to-Date') {
      start = new Date(end.getFullYear(), 0, 1);
    } else if (presetValue === 'All Time') {
      start = null;
      end = null;
    }

    setStartDate(start);
    setEndDate(end);
    triggerChange(start, end, presetValue);
  };

  const defaultPresets = [
    { label: 'Today', value: 'Today' },
    { label: 'This Week', value: 'This Week' },
    { label: 'Last 7 Days', value: 'Last 7 Days' },
    { label: 'This Month', value: 'This Month' },
    { label: 'Last Month', value: 'Last Month' },
    { label: 'Last 30 Days', value: 'Last 30 Days' },
    { label: 'Last Quarter', value: 'Last Quarter' },
    { label: 'Year-to-Date', value: 'Year-to-Date' },
    { label: 'All Time', value: 'All Time' },
  ];
  const presetsToUse = presetOptions.length > 0 ? presetOptions : defaultPresets;

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        className="px-4 py-2 flex items-center justify-between min-w-[180px]" // Adjusted width for label visibility
      >
        <span>{selectedRange.label || label}</span>
        <svg
          className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg"
             style={{ minWidth: '300px' }}> {/* Fixed width for the dropdown content */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Preset Ranges</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {presetsToUse.map(preset => (
                <Button
                  key={preset.value}
                  onClick={() => handlePresetChange(preset.value)}
                  variant={activePreset === preset.value ? 'primary' : 'tertiary'} // Highlight active preset
                  size="sm"
                  className="px-3 py-1 text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            <h4 className="text-sm font-medium text-gray-800 mb-2">Custom Range</h4>
            <div className="flex gap-2 items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange([date, endDate])}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="From Date"
                dateFormat="yyyy-MM-dd"
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                isClearable
                calendarClassName="rtdp-calendar"
              />
              <span>-</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange([startDate, date])}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="To Date"
                dateFormat="yyyy-MM-dd"
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                isClearable
                calendarClassName="rtdp-calendar"
              />
            </div>
            {/* Optional: Apply/Clear buttons for custom range if desired */}
            {/* <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => { setStartDate(null); setEndDate(null); triggerChange(null,null,"Custom Range"); }}>Clear</Button>
                <Button variant="primary" onClick={() => triggerChange(startDate, endDate)}>Apply</Button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}