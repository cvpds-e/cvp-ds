import React, { useState, useRef, useEffect } from 'react';
import { Type, Database, Tag, Calendar, User, Clock, Ban, Hash, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search, X, Layers, Check, RefreshCw, ListFilter } from 'lucide-react';
import { TextButton } from './TextButton';
import { IconButton } from './IconButton';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { Checkbox } from './Checkbox';

export function FilterDocumentation() {
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('is any of');
  const [isValueDropdownOpen, setIsValueDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(['Editorial', 'Recommended']);
  const [valueSearchQuery, setValueSearchQuery] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateCondition, setDateCondition] = useState('after');
  const [dateInputValue, setDateInputValue] = useState('01/05/2018');
  const [activeTab, setActiveTab] = useState('Day');
  
  // Date range picker state (without time)
  const [startDate, setStartDate] = useState<Date | null>(new Date(2018, 4, 7));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2018, 5, 1));
  const [currentMonth, setCurrentMonth] = useState(new Date(2018, 4, 1)); // May 2018
  
  // Date range picker with time state
  const [startDateWithTime, setStartDateWithTime] = useState<Date | null>(new Date(2018, 4, 7));
  const [endDateWithTime, setEndDateWithTime] = useState<Date | null>(new Date(2018, 5, 1));
  const [currentMonthWithTime, setCurrentMonthWithTime] = useState(new Date(2018, 4, 1)); // May 2018
  const [startTime, setStartTime] = useState({ hours: '00', minutes: '00' });
  const [endTime, setEndTime] = useState({ hours: '00', minutes: '00' });
  
  // Single date picker state (without time)
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [singleMonth, setSingleMonth] = useState(new Date());
  
  // Single date picker with time state
  const [singleDateWithTime, setSingleDateWithTime] = useState<Date | null>(null);
  const [singleMonthWithTime, setSingleMonthWithTime] = useState(new Date());
  const [singleTime, setSingleTime] = useState({ hours: '00', minutes: '00' });
  const conditionDropdownRef = useRef<HTMLDivElement>(null);
  const valueDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (conditionDropdownRef.current && !conditionDropdownRef.current.contains(event.target as Node)) {
        setIsConditionDropdownOpen(false);
      }
      if (valueDropdownRef.current && !valueDropdownRef.current.contains(event.target as Node)) {
        setIsValueDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const conditionOptions = ['is any of', 'is not'];
  const valueOptions = ['Editorial', 'Recommended', 'Featured', 'Popular'];
  const dateConditionOptions = ['after', 'before', 'between'];
  const dateTabs = ['Day', 'Month', 'Quarter', 'Half-year', 'Year'];

  const toggleValue = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const filteredValueOptions = valueOptions.filter(option =>
    option.toLowerCase().includes(valueSearchQuery.toLowerCase())
  );

  const formatDateRange = () => {
    if (startDate && endDate) {
      const format = (date: Date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
      };
      return `${format(startDate)} - ${format(endDate)}`;
    }
    if (!startDate && !endDate) {
      return '';
    }
    return dateInputValue;
  };
  
  const formatDateRangeWithTime = () => {
    if (startDateWithTime && endDateWithTime) {
      const format = (date: Date, time: { hours: string, minutes: string }) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year} ${time.hours}:${time.minutes}`;
      };
      return `${format(startDateWithTime, startTime)} - ${format(endDateWithTime, endTime)}`;
    }
    if (!startDateWithTime && !endDateWithTime) {
      return '';
    }
    return dateInputValue;
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };
  
  const handleDateClickWithTime = (date: Date) => {
    if (!startDateWithTime || (startDateWithTime && endDateWithTime)) {
      setStartDateWithTime(date);
      setEndDateWithTime(null);
    } else {
      if (date < startDateWithTime) {
        setEndDateWithTime(startDateWithTime);
        setStartDateWithTime(date);
      } else {
        setEndDateWithTime(date);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate) return false;
    if (!endDate) return date.getTime() === startDate.getTime();
    return date >= startDate && date <= endDate;
  };
  
  const isDateInRangeWithTime = (date: Date) => {
    if (!startDateWithTime) return false;
    if (!endDateWithTime) return date.getTime() === startDateWithTime.getTime();
    return date >= startDateWithTime && date <= endDateWithTime;
  };

  const isDateSelected = (date: Date) => {
    return (startDate && date.getTime() === startDate.getTime()) || 
           (endDate && date.getTime() === endDate.getTime());
  };
  
  const isDateSelectedWithTime = (date: Date) => {
    return (startDateWithTime && date.getTime() === startDateWithTime.getTime()) || 
           (endDateWithTime && date.getTime() === endDateWithTime.getTime());
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const renderCalendar = (monthOffset: number) => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + monthOffset);
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="date-picker__day date-picker__day--empty" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isInRange = isDateInRange(dayDate);
      const isSelected = isDateSelected(dayDate);
      const today = new Date();
      const isToday = dayDate.getDate() === today.getDate() && 
                      dayDate.getMonth() === today.getMonth() && 
                      dayDate.getFullYear() === today.getFullYear();
      const isTodayDefault = isToday && !startDate && !endDate;
      
      days.push(
        <button
          key={day}
          className={`date-picker__day ${isInRange ? 'date-picker__day--in-range' : ''} ${isSelected ? 'date-picker__day--selected' : ''} ${isTodayDefault ? 'date-picker__day--today' : ''}`}
          onClick={() => handleDateClick(dayDate)}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="date-picker__calendar">
        <div className="date-picker__weekdays">
          {['We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'].map(day => (
            <div key={day} className="date-picker__weekday">{day}</div>
          ))}
        </div>
        <div className="date-picker__days">{days}</div>
      </div>
    );
  };
  
  const renderCalendarWithTime = (monthOffset: number) => {
    const date = new Date(currentMonthWithTime);
    date.setMonth(date.getMonth() + monthOffset);
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-time-${i}`} className="date-picker__day date-picker__day--empty" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isInRange = isDateInRangeWithTime(dayDate);
      const isSelected = isDateSelectedWithTime(dayDate);
      const today = new Date();
      const isToday = dayDate.getDate() === today.getDate() && 
                      dayDate.getMonth() === today.getMonth() && 
                      dayDate.getFullYear() === today.getFullYear();
      const isTodayDefault = isToday && !startDateWithTime && !endDateWithTime;
      
      days.push(
        <button
          key={day}
          className={`date-picker__day ${isInRange ? 'date-picker__day--in-range' : ''} ${isSelected ? 'date-picker__day--selected' : ''} ${isTodayDefault ? 'date-picker__day--today' : ''}`}
          onClick={() => handleDateClickWithTime(dayDate)}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="date-picker__calendar">
        <div className="date-picker__weekdays">
          {['We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'].map(day => (
            <div key={day} className="date-picker__weekday">{day}</div>
          ))}
        </div>
        <div className="date-picker__days">{days}</div>
      </div>
    );
  };

  // Helper functions for single date picker (without time)
  const formatSingleDate = () => {
    if (singleDate) {
      const month = String(singleDate.getMonth() + 1).padStart(2, '0');
      const day = String(singleDate.getDate()).padStart(2, '0');
      const year = singleDate.getFullYear();
      return `${month}/${day}/${year}`;
    }
    return '';
  };

  const isSingleDateSelected = (date: Date) => {
    return singleDate && date.getTime() === singleDate.getTime();
  };

  // Helper functions for single date picker (with time)
  const formatSingleDateWithTime = () => {
    if (singleDateWithTime) {
      const month = String(singleDateWithTime.getMonth() + 1).padStart(2, '0');
      const day = String(singleDateWithTime.getDate()).padStart(2, '0');
      const year = singleDateWithTime.getFullYear();
      return `${month}/${day}/${year} ${singleTime.hours}:${singleTime.minutes}`;
    }
    return '';
  };

  const isSingleDateWithTimeSelected = (date: Date) => {
    return singleDateWithTime && date.getTime() === singleDateWithTime.getTime();
  };

  const renderSingleCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(singleMonth);
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="date-picker__day date-picker__day--empty" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(singleMonth.getFullYear(), singleMonth.getMonth(), day);
      const isSelected = isSingleDateSelected(dayDate);
      const today = new Date();
      const isToday = dayDate.getDate() === today.getDate() && 
                      dayDate.getMonth() === today.getMonth() && 
                      dayDate.getFullYear() === today.getFullYear();
      const isTodayDefault = isToday && !singleDate;
      
      days.push(
        <button
          key={day}
          className={`date-picker__day ${isSelected ? 'date-picker__day--selected' : ''} ${isTodayDefault ? 'date-picker__day--today' : ''}`}
          onClick={() => setSingleDate(dayDate)}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="date-picker__calendar">
        <div className="date-picker__weekdays">
          {['We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'].map(day => (
            <div key={day} className="date-picker__weekday">{day}</div>
          ))}
        </div>
        <div className="date-picker__days">
          {days}
        </div>
      </div>
    );
  };

  const renderSingleCalendarWithTime = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(singleMonthWithTime);
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-time-${i}`} className="date-picker__day date-picker__day--empty" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(singleMonthWithTime.getFullYear(), singleMonthWithTime.getMonth(), day);
      const isSelected = isSingleDateWithTimeSelected(dayDate);
      const today = new Date();
      const isToday = dayDate.getDate() === today.getDate() && 
                      dayDate.getMonth() === today.getMonth() && 
                      dayDate.getFullYear() === today.getFullYear();
      const isTodayDefault = isToday && !singleDateWithTime;
      
      days.push(
        <button
          key={day}
          className={`date-picker__day ${isSelected ? 'date-picker__day--selected' : ''} ${isTodayDefault ? 'date-picker__day--today' : ''}`}
          onClick={() => setSingleDateWithTime(dayDate)}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="date-picker__calendar">
        <div className="date-picker__weekdays">
          {['We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'].map(day => (
            <div key={day} className="date-picker__weekday">{day}</div>
          ))}
        </div>
        <div className="date-picker__days">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '48px', maxWidth: '1200px' }}>
      <style>{`
        .filter-docs__section {
          margin-bottom: 48px;
        }

        .filter-docs__example {
          padding: 32px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .filter-docs__example-title {
          margin-bottom: 16px;
          color: var(--foreground);
        }

        .filter-docs__example-description {
          margin-bottom: 24px;
          font-size: var(--type-scale-s-size);
          color: var(--muted-foreground);
        }

        .filter-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          background-color: var(--color-green-800);
          color: var(--color-green-200);
          border-radius: 16px;
          font-size: 13px;
          font-weight: 500;
        }

        .filter-docs__status-dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-green-400);
          border-radius: 50%;
        }

        .filter-docs__spec-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 16px;
          padding: 24px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          font-size: var(--type-scale-s-size);
        }

        .filter-docs__spec-label {
          color: var(--muted-foreground);
          font-weight: 500;
        }

        .filter-docs__spec-value {
          color: var(--foreground);
          font-family: var(--font-family-mono);
        }

        .filter-docs__feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .filter-docs__feature-card {
          padding: 20px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
        }

        .filter-docs__feature-title {
          margin-bottom: 8px;
          color: var(--foreground);
          font-weight: 500;
        }

        .filter-docs__feature-description {
          font-size: var(--type-scale-s-size);
          color: var(--muted-foreground);
          line-height: 1.5;
        }

        .filter-docs__guideline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .filter-docs__guideline-card {
          padding: 24px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
        }

        .filter-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .filter-docs__guideline-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .filter-docs__guideline-icon--do {
          background-color: var(--color-green-600);
        }

        .filter-docs__guideline-icon--dont {
          background-color: #ef4444;
        }

        .filter-docs__guideline-title {
          margin: 0;
          color: var(--foreground);
        }

        .filter-docs__guideline-list {
          margin: 0;
          padding-left: 20px;
          list-style: disc;
        }

        .filter-docs__guideline-item {
          margin-bottom: 8px;
          font-size: var(--type-scale-s-size);
          color: var(--foreground);
        }

        /* Filter Component Styles */
        .filter {
          --filter-font-family: var(--font-family);
          --filter-font-size: var(--type-scale-m-size);
          --filter-font-weight: var(--type-scale-m-weight);
          --filter-line-height: var(--type-scale-m-line-height);
          --filter-letter-spacing: var(--type-scale-m-letter-spacing);
          
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--filter-font-family);
        }

        .filter__bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          min-height: 36px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .filter__bar:hover {
          background-color: var(--filter-option-hover-bg);
        }

        .filter__bar:focus-visible {
          outline: none;
          border: 1px solid #6f8be6;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter__active-filters {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .filter__active-filter {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background-color: var(--filter-active-chip-bg);
          border-radius: 4px;
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--foreground);
        }

        .filter__active-filter-text {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .filter__active-filter-icon {
          display: flex;
          align-items: center;
          color: var(--muted-foreground);
        }

        .filter__active-filter-label {
          color: var(--foreground);
        }

        .filter__active-filter-value {
          color: var(--foreground);
        }

        .filter__active-filter-remove {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--muted-foreground);
          transition: color 0.15s ease;
        }

        .filter__active-filter-remove:hover {
          color: var(--foreground);
        }

        .filter__condition-dropdown-wrapper {
          position: relative;
          display: inline-block;
        }

        .filter__condition-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 140px;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          padding: 4px;
          z-index: 1000;
        }

        .filter__condition-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 6px 10px;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--muted-foreground);
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          width: 100%;
        }

        .filter__condition-option:hover {
          background-color: #35363b;
          color: var(--foreground);
        }

        .filter__condition-option-text {
          flex: 1;
        }

        .filter__condition-option-check {
          display: flex;
          align-items: center;
          color: #97A9DE;
        }

        .filter__value-dropdown-wrapper {
          position: relative;
          display: inline-block;
        }

        .filter__value-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 240px;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          overflow: hidden;
        }

        .filter__value-dropdown-search {
          padding: 12px;
          border-bottom: 1px solid var(--border-default);
        }

        .filter__value-dropdown-search-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background-color: var(--filter-search-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .filter__value-dropdown-search-wrapper:focus-within {
          border: 1px solid #6f8be6;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter__value-dropdown-search-icon {
          color: var(--muted-foreground);
          flex-shrink: 0;
        }

        .filter__value-dropdown-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--font-family);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--foreground);
        }

        .filter__value-dropdown-search-input::placeholder {
          color: var(--muted-foreground);
        }

        .filter__value-dropdown-options {
          padding: 0;
          max-height: 200px;
          overflow-y: auto;
        }

        .filter__value-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 6px 10px;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--muted-foreground);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          width: 100%;
        }

        .filter__value-option:hover {
          background-color: var(--filter-option-hover-bg);
          color: var(--foreground);
        }

        .filter__value-option--selected {
          background-color: var(--filter-active-chip-bg);
          color: var(--foreground);
        }

        .filter__value-option-text {
          flex: 1;
        }

        .filter__value-option-check {
          display: flex;
          align-items: center;
          color: #97A9DE;
        }

        .date-picker__wrapper {
          position: relative;
          display: inline-block;
        }

        .date-picker__backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .date-picker {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 680px;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          padding: 16px;
        }

        .date-picker--modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 680px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 32px);
          overflow-y: auto;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          padding: 16px;
          animation: slideIn 0.2s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .date-picker__header {
          margin-bottom: 16px;
        }

        .date-picker__input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background-color: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 6px;
          margin-bottom: 12px;
          transition: all 0.15s ease;
          min-height: 40px;
        }

        .date-picker__input-wrapper:focus-within {
          border: 2px solid #6f8be6;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .date-picker__input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--font-family);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--foreground);
          min-height: 20px;
        }

        .date-picker__tabs {
          display: flex;
          gap: 8px;
        }

        .date-picker__tab {
          padding: 6px 12px;
          background: transparent;
          border: none;
          border-radius: 4px;
          font-family: var(--font-family);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--muted-foreground);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .date-picker__tab:hover {
          background-color: #35363b;
          color: var(--foreground);
        }

        .date-picker__tab--active {
          background-color: #3d63dd;
          color: #ffffff;
        }

        .date-picker__tab--active:hover {
          background-color: #244cce;
        }

        .date-picker__calendars {
          display: flex;
          gap: 16px;
          margin: 16px 0;
        }

        .date-picker__calendar {
          flex: 1;
        }

        .date-picker__month-header {
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--foreground);
          margin-bottom: 12px;
          text-align: center;
        }

        .date-picker__weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 4px;
        }

        .date-picker__weekday {
          font-size: var(--type-scale-xs-size);
          font-weight: var(--type-scale-xs-weight);
          line-height: var(--type-scale-xs-line-height);
          letter-spacing: var(--type-scale-xs-letter-spacing);
          color: var(--muted-foreground);
          text-align: center;
          padding: 4px;
        }

        .date-picker__days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .date-picker__day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: 4px;
          font-family: var(--font-family);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .date-picker__day--empty {
          cursor: default;
        }

        .date-picker__day:not(.date-picker__day--empty):hover {
          background-color: #35363b;
        }

        .date-picker__day--in-range {
          background-color: rgba(61, 99, 221, 0.2);
        }

        .date-picker__day--selected {
          background-color: #3d63dd;
          color: #ffffff;
        }

        .date-picker__day--selected:hover {
          background-color: #244cce;
        }

        .date-picker__day--today {
          border: 1px solid #6f8be6;
          background-color: rgba(111, 139, 230, 0.15);
        }

        .date-picker__day--today:hover {
          background-color: rgba(111, 139, 230, 0.25);
        }

        .date-picker__actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          padding-top: 16px;
          border-top: 1px solid var(--border-default);
        }

        .date-picker__button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          font-family: var(--font-family);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .date-picker__button--cancel {
          background-color: transparent;
          color: var(--muted-foreground);
        }

        .date-picker__button--cancel:hover {
          background-color: #35363b;
          color: var(--foreground);
        }

        .date-picker__button--apply {
          background-color: #3d63dd;
          color: #ffffff;
        }

        .date-picker__button--apply:hover {
          background-color: #244cce;
        }

        .date-picker__time-select {
          flex: 1;
          padding: 8px 12px;
          background-color: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 6px;
          font-family: var(--font-family);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.15s ease;
          outline: none;
        }

        .date-picker__time-select:hover {
          border-color: #6f8be6;
        }

        .date-picker__time-select:focus {
          border: 2px solid #6f8be6;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .date-picker__navigation {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .date-picker__nav-button {
          background: transparent;
          border: none;
          color: var(--foreground);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          transition: background-color 0.15s ease;
        }

        .date-picker__nav-button:hover {
          background-color: #35363b;
        }

        /* Responsive styles for Date Range Picker */
        @media (max-width: 768px) {
          .date-picker {
            max-width: 100%;
          }

          .date-picker__tabs {
            flex-wrap: wrap;
            gap: 6px;
          }

          .date-picker__tab {
            padding: 6px 10px;
            font-size: 12px;
          }

          .date-picker__calendars {
            flex-direction: column;
            gap: 24px;
          }

          .date-picker__calendar {
            width: 100%;
          }

          .date-picker__actions {
            flex-direction: column-reverse;
          }

          .date-picker__button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .date-picker__header {
            gap: 12px;
          }

          .date-picker__input-wrapper {
            padding: 6px 10px;
          }

          .date-picker__tabs {
            gap: 4px;
          }

          .date-picker__tab {
            padding: 6px 8px;
            font-size: 11px;
          }

          .date-picker__day {
            min-width: 32px;
            min-height: 32px;
            font-size: 12px;
          }

          .date-picker__weekday {
            font-size: 10px;
          }

          .date-picker__time-select {
            padding: 6px 8px;
            font-size: 13px;
          }
        }

        .filter__placeholder {
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          color: var(--muted-foreground);
        }

        .filter__menu {
          position: relative;
          width: 380px;
          max-height: 480px;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .filter__search {
          padding: 12px;
          border-bottom: 1px solid var(--border-default);
        }

        .filter__search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background-color: var(--filter-search-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .filter__search-input-wrapper:focus-within {
          border: 1px solid #6f8be6;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter__search-icon {
          color: var(--muted-foreground);
          flex-shrink: 0;
        }

        .filter__search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--filter-font-family);
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--foreground);
        }

        .filter__search-input::placeholder {
          color: var(--muted-foreground);
        }

        .filter__search-shortcut {
          padding: 2px 6px;
          background-color: var(--filter-shortcut-key-bg);
          border-radius: 4px;
          font-size: 12px;
          color: var(--muted-foreground);
        }

        .filter__options {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .filter__option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--foreground);
        }

        .filter__option:hover {
          background-color: var(--filter-option-hover-bg);
        }

        .filter__option-icon {
          display: flex;
          align-items: center;
          color: var(--muted-foreground);
        }

        .filter__option-label {
          flex: 1;
        }

        .filter__option-chevron {
          display: flex;
          align-items: center;
          color: var(--muted-foreground);
        }

        .filter__submenu {
          position: relative;
          width: 380px;
          max-height: 480px;
          background-color: var(--filter-menu-bg);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .filter__submenu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid var(--border-default);
          cursor: pointer;
        }

        .filter__submenu-header:hover .filter__submenu-back {
          color: var(--foreground);
        }

        .filter__submenu-back {
          display: flex;
          align-items: center;
          color: var(--muted-foreground);
          transition: color 0.15s ease;
        }

        .filter__submenu-title {
          font-size: 15px;
          font-weight: 500;
          color: var(--foreground);
        }

        .filter__submenu-options {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .filter__submenu-option {
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--foreground);
        }

        .filter__submenu-option:hover {
          background-color: var(--filter-option-hover-bg);
        }

        .filter__submenu-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .filter__submenu-input-section {
          padding: 16px;
          border-bottom: 1px solid var(--border-default);
        }

        .filter__submenu-input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background-color: var(--filter-search-bg);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .filter__submenu-input-wrapper:focus-within {
          border: 1px solid #6f8be6;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter__submenu-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--filter-font-family);
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--foreground);
        }

        .filter__submenu-input::placeholder {
          color: var(--muted-foreground);
        }

        .filter__submenu-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .filter__submenu-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: var(--filter-active-chip-bg);
          border-radius: 6px;
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          color: var(--foreground);
        }

        .filter__submenu-chip-remove {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--muted-foreground);
          transition: color 0.15s ease;
        }

        .filter__submenu-chip-remove:hover {
          color: var(--foreground);
        }

        .filter__submenu-empty {
          padding: 24px 16px;
          text-align: center;
          color: var(--muted-foreground);
          font-size: var(--filter-font-size);
        }

        .filter__submenu-add-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.15s ease;
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          color: var(--foreground);
        }

        .filter__submenu-add-option:hover {
          background-color: var(--filter-option-hover-bg);
        }

        .filter__submenu-add-icon {
          display: flex;
          align-items: center;
          color: var(--muted-foreground);
        }

        .filter__submenu-actions {
          padding: 16px;
        }

        .filter__submenu-action-button {
          width: 100%;
          padding: 8px 16px;
          background-color: #3d63dd;
          border: none;
          border-radius: 4px;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-sizing: border-box;
        }

        .filter__submenu-action-button:hover {
          background-color: #244cce;
        }

        .filter__submenu-action-button:focus-visible {
          outline: 2px solid #67b3fb !important;
          outline-offset: 2px !important;
          box-shadow: none !important;
        }

        .filter__submenu-action-button:focus:not(:focus-visible) {
          outline: none;
        }

        .filter__submenu-action-button:active {
          background-color: #244cce;
          transform: translateY(1px);
        }

        @media (max-width: 768px) {
          .filter-docs__guideline-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="filter-docs__section">
        <h1 style={{ marginBottom: '16px' }}>Filter</h1>
        <p style={{ 
          fontSize: 'var(--type-scale-l-size)',
          lineHeight: 'var(--type-scale-l-line-height)',
          color: 'var(--muted-foreground)',
          marginBottom: '24px'
        }}>
          A comprehensive filtering system inspired by Linear's filter experience. Features a filter bar with active filter chips, a searchable dropdown menu with categorized options, and support for multiple filter types including dates, selects, and boolean values.
        </p>
        
        <div className="filter-docs__status-badge">
          <div className="filter-docs__status-dot" />
          Stable
        </div>
      </div>

      {/* Filter States */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Filter States</h2>
        
        {/* Empty State */}
        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Empty State</h3>
          <p className="filter-docs__example-description">
            Default state when no filters are applied. Shows filter icon button to prompt user interaction.
          </p>
          <IconButton aria-label="Add filter">
            <ListFilter size={16} />
          </IconButton>
        </div>

        {/* With Active Filters */}
        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Active Filters State</h3>
          <p className="filter-docs__example-description">
            Filter bar with applied filters displayed as removable chips. Each chip shows the filter icon and label in white (non-clickable), the condition as a minimalistic text button with a dropdown menu to change the filter condition, and the value as a minimalistic inverted text button with a searchable multi-select dropdown for better visual differentiation.
          </p>
          <div className="filter">
            <div className="filter__bar" role="button" tabIndex={0}>
              <div className="filter__active-filters">
                <div className="filter__active-filter">
                  <div className="filter__active-filter-text">
                    <span className="filter__active-filter-icon">
                      <Layers size={14} />
                    </span>
                    <span className="filter__active-filter-label">Rail type</span>
                    <div className="filter__condition-dropdown-wrapper" ref={conditionDropdownRef}>
                      <TextButton 
                        className="text-button--minimalistic"
                        onClick={() => setIsConditionDropdownOpen(!isConditionDropdownOpen)}
                      >
                        {selectedCondition}
                      </TextButton>
                      {isConditionDropdownOpen && (
                        <div className="filter__condition-dropdown">
                          {conditionOptions.map((option) => (
                            <button
                              key={option}
                              className="filter__condition-option"
                              onClick={() => {
                                setSelectedCondition(option);
                                setIsConditionDropdownOpen(false);
                              }}
                            >
                              <span className="filter__condition-option-text">{option}</span>
                              {selectedCondition === option && (
                                <span className="filter__condition-option-check">
                                  <Check size={14} />
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="filter__value-dropdown-wrapper" ref={valueDropdownRef}>
                      <TextButton 
                        className="text-button--minimalistic-inverted"
                        onClick={() => setIsValueDropdownOpen(!isValueDropdownOpen)}
                      >
                        {selectedValues.length} {selectedValues.length === 1 ? 'type' : 'types'}
                      </TextButton>
                      {isValueDropdownOpen && (
                        <div className="filter__value-dropdown">
                          <div className="filter__value-dropdown-search">
                            <div className="filter__value-dropdown-search-wrapper">
                              <Search size={16} className="filter__value-dropdown-search-icon" />
                              <input
                                type="text"
                                className="filter__value-dropdown-search-input"
                                placeholder="Rail Type"
                                value={valueSearchQuery}
                                onChange={(e) => setValueSearchQuery(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="filter__value-dropdown-options">
                            {filteredValueOptions.map((option) => (
                              <button
                                key={option}
                                className={`filter__value-option ${selectedValues.includes(option) ? 'filter__value-option--selected' : ''}`}
                                onClick={() => toggleValue(option)}
                              >
                                <span className="filter__value-option-text">{option}</span>
                                {selectedValues.includes(option) && (
                                  <span className="filter__value-option-check">
                                    <Check size={14} />
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="filter__active-filter-remove" aria-label="Remove Rail type filter">
                    <X size={14} />
                  </button>
                </div>
                <div className="filter__active-filter">
                  <div className="filter__active-filter-text">
                    <span className="filter__active-filter-icon">
                      <Calendar size={14} />
                    </span>
                    <span className="filter__active-filter-label">Added</span>
                    <TextButton className="text-button--minimalistic">is after</TextButton>
                    <TextButton className="text-button--minimalistic-inverted">6 months ago</TextButton>
                  </div>
                  <button className="filter__active-filter-remove" aria-label="Remove Added filter">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* With Custom Date Picker */}
        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Custom Date Filter State</h3>
          <p className="filter-docs__example-description">
            Filter bar with a custom date range filter. The value button opens a date picker interface with date input field, dual calendar view for range selection, optional time selection, and auto-closes when both dates are selected.
          </p>
          <div className="filter">
            <div className="filter__bar" role="button" tabIndex={0}>
              <div className="filter__active-filters">
                <div className="filter__active-filter">
                  <div className="filter__active-filter-text">
                    <span className="filter__active-filter-icon">
                      <Calendar size={14} />
                    </span>
                    <span className="filter__active-filter-label">Created date</span>
                    <TextButton className="text-button--minimalistic">between</TextButton>
                    <div className="date-picker__wrapper" ref={datePickerRef}>
                      <TextButton 
                        className="text-button--minimalistic-inverted"
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                      >
                        {formatDateRange()}
                      </TextButton>
                      {isDatePickerOpen && (
                        <>
                          <div 
                            className="date-picker__backdrop"
                            onClick={() => setIsDatePickerOpen(false)}
                          />
                          <div className="date-picker date-picker--modal">
                          <div className="date-picker__header">
                            <div className="date-picker__input-wrapper">
                              <input
                                type="text"
                                className="date-picker__input"
                                value={formatDateRange()}
                                onChange={(e) => setDateInputValue(e.target.value)}
                                placeholder="Select date range"
                              />
                              {(startDate || endDate) && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={() => {
                                        setStartDate(null);
                                        setEndDate(null);
                                      }}
                                      aria-label="Clear date range"
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#9ca3af',
                                        transition: 'color 0.15s ease'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                                    >
                                      <X size={14} />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Clear date range
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ flex: 1 }}>
                              <div className="date-picker__month-header">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                className="date-picker__nav-button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1))}
                              >
                                <ChevronsLeft size={14} />
                              </button>
                              <button 
                                className="date-picker__nav-button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                              >
                                <ChevronLeft size={14} />
                              </button>
                              <button 
                                className="date-picker__nav-button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                              >
                                <ChevronRight size={14} />
                              </button>
                              <button 
                                className="date-picker__nav-button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1))}
                              >
                                <ChevronsRight size={14} />
                              </button>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div className="date-picker__month-header">{new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                            </div>
                          </div>
                          <div className="date-picker__calendars">
                            {renderCalendar(0)}
                            {renderCalendar(1)}
                          </div>
                        </div>
                        </>
                      )}
                    </div>
                  </div>
                  <button className="filter__active-filter-remove" aria-label="Remove Created date filter">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Dropdowns */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Filter Option Menu (Step 1)</h2>
        
        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Primary Filter Options</h3>
          <p className="filter-docs__example-description">
            First level dropdown showing all available filter categories. Each option has an icon and chevron indicating additional selections.
          </p>
          
          <div className="filter__menu">
            <div className="filter__search">
              <div className="filter__search-input-wrapper">
                <Search size={16} className="filter__search-icon" />
                <input
                  type="text"
                  className="filter__search-input"
                  placeholder="Filter..."
                  readOnly
                />
                <span className="filter__search-shortcut">F</span>
              </div>
            </div>
            <div className="filter__options">
              <div className="filter__option">
                <div className="filter__option-icon"><Type size={16} /></div>
                <div className="filter__option-label">Title</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><Database size={16} /></div>
                <div className="filter__option-label">Rail Collections</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><Tag size={16} /></div>
                <div className="filter__option-label">Rail Type</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><Calendar size={16} /></div>
                <div className="filter__option-label">Added</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><User size={16} /></div>
                <div className="filter__option-label">Added By</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><Clock size={16} /></div>
                <div className="filter__option-label">Updated</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><Ban size={16} /></div>
                <div className="filter__option-label">Disabled</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
              <div className="filter__option">
                <div className="filter__option-icon"><Hash size={16} /></div>
                <div className="filter__option-label">PID</div>
                <div className="filter__option-chevron"><ChevronRight size={16} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Dropdown */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Filter Value Selection (Step 2)</h2>
        
        {/* Title Filter Submenu */}
        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Title Filter Submenu - Empty State</h3>
          <p className="filter-docs__example-description">
            Text input filter showing empty state with placeholder. Users can enter custom values to filter by.
          </p>
          
          <div className="filter__submenu">
            <div className="filter__submenu-header">
              <div className="filter__submenu-back">
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <div className="filter__submenu-title">Title</div>
            </div>
            <div className="filter__submenu-content">
              <div className="filter__submenu-input-section">
                <div className="filter__submenu-input-wrapper">
                  <Search size={16} style={{ color: 'var(--muted-foreground)' }} />
                  <input
                    type="text"
                    className="filter__submenu-input"
                    placeholder="Enter title..."
                    readOnly
                  />
                </div>
              </div>
              <div className="filter__submenu-empty">
                Enter one or more titles to filter by...
              </div>
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Title Filter Submenu - Typing State</h3>
          <p className="filter-docs__example-description">
            Shows the add option when user types a value. Clicking the option adds it as a filter value.
          </p>
          
          <div className="filter__submenu">
            <div className="filter__submenu-header">
              <div className="filter__submenu-back">
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <div className="filter__submenu-title">Title</div>
            </div>
            <div className="filter__submenu-content">
              <div className="filter__submenu-input-section">
                <div className="filter__submenu-input-wrapper" style={{ borderColor: '#6f8be6', boxShadow: '0 0 0 3px rgba(111, 139, 230, 0.25)' }}>
                  <Search size={16} style={{ color: 'var(--muted-foreground)' }} />
                  <input
                    type="text"
                    className="filter__submenu-input"
                    value="title 1"
                    readOnly
                  />
                </div>
              </div>
              <div className="filter__submenu-add-option">
                <div className="filter__submenu-add-icon">
                  <Type size={16} />
                </div>
                <div>Add "title 1"</div>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Title Filter Submenu - With Selected Values</h3>
          <p className="filter-docs__example-description">
            Shows selected values as chips below the input. Users can remove chips or add more values. Action button appears when values are selected.
          </p>
          
          <div className="filter__submenu">
            <div className="filter__submenu-header">
              <div className="filter__submenu-back">
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <div className="filter__submenu-title">Title</div>
            </div>
            <div className="filter__submenu-content">
              <div className="filter__submenu-input-section">
                <div className="filter__submenu-input-wrapper" style={{ borderColor: '#6f8be6', boxShadow: '0 0 0 3px rgba(111, 139, 230, 0.25)' }}>
                  <Search size={16} style={{ color: 'var(--muted-foreground)' }} />
                  <input
                    type="text"
                    className="filter__submenu-input"
                    value="title 2"
                    readOnly
                  />
                </div>
                <div className="filter__submenu-chips">
                  <div className="filter__submenu-chip">
                    title 1
                    <button className="filter__submenu-chip-remove" aria-label="Remove title 1">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="filter__submenu-add-option">
                <div className="filter__submenu-add-icon">
                  <Type size={16} />
                </div>
                <div>Add "title 2"</div>
              </div>
            </div>
            <div className="filter__submenu-actions">
              <button className="filter__submenu-action-button">
                Add Filter (1 title)
              </button>
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Date Filter Submenu</h3>
          <p className="filter-docs__example-description">
            Second level dropdown for selecting specific date values. Includes preset options and custom date selection.
          </p>
          
          <div className="filter__submenu">
            <div className="filter__submenu-header">
              <div className="filter__submenu-back">
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <div className="filter__submenu-title">Added</div>
            </div>
            <div className="filter__submenu-options">
              <div className="filter__submenu-option">1 day ago</div>
              <div className="filter__submenu-option">3 days ago</div>
              <div className="filter__submenu-option">1 week ago</div>
              <div className="filter__submenu-option">1 month ago</div>
              <div className="filter__submenu-option">3 months ago</div>
              <div className="filter__submenu-option">6 months ago</div>
              <div className="filter__submenu-option">1 year ago</div>
              <div className="filter__submenu-option">Custom date or timeframe...</div>
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">List-based Filter Submenu</h3>
          <p className="filter-docs__example-description">
            Second level dropdown for filters with predefined options. Shows list of available values to select from.
          </p>
          
          <div className="filter__submenu">
            <div className="filter__submenu-header">
              <div className="filter__submenu-back">
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <div className="filter__submenu-title">Rail Type</div>
            </div>
            <div className="filter__submenu-options">
              <div className="filter__submenu-option">Editorial</div>
              <div className="filter__submenu-option">Recommended</div>
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">List-based Filter Submenu with Search</h3>
          <p className="filter-docs__example-description">
            When there are many predefined options, a search bar helps users quickly find and select values. Shows filterable list with search functionality.
          </p>
          
          <div className="filter__submenu">
            <div className="filter__submenu-header">
              <div className="filter__submenu-back">
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <div className="filter__submenu-title">Content Category</div>
            </div>
            <div className="filter__submenu-input-section" style={{ borderBottom: 'none' }}>
              <div className="filter__submenu-input-wrapper">
                <Search size={16} style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="text"
                  className="filter__submenu-input"
                  placeholder="Search categories..."
                  readOnly
                />
              </div>
            </div>
            <div className="filter__submenu-options">
              <div className="filter__submenu-option">Action & Adventure</div>
              <div className="filter__submenu-option">Comedy</div>
              <div className="filter__submenu-option">Documentary</div>
              <div className="filter__submenu-option">Drama</div>
              <div className="filter__submenu-option">Fantasy</div>
              <div className="filter__submenu-option">Horror</div>
              <div className="filter__submenu-option">Mystery & Thriller</div>
              <div className="filter__submenu-option">Romance</div>
              <div className="filter__submenu-option">Science Fiction</div>
              <div className="filter__submenu-option">Western</div>
            </div>
          </div>
        </div>
      </section>

      {/* Date Picker Component */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Date Picker Component</h2>
        
        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Date Range Picker (Date Only)</h3>
          <p className="filter-docs__example-description">
            Full date picker interface with date input field and dual calendar view for range selection. <strong>The picker automatically closes when both start and end dates are selected.</strong> This version is configured without time selection.</p>
          
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'rgba(111, 139, 230, 0.1)',
            border: '1px solid rgba(111, 139, 230, 0.3)',
            borderRadius: '6px',
            marginBottom: '16px',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--type-scale-s-size)',
            color: '#9ca3af'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#6f8be6" strokeWidth="1.5"/>
              <path d="M8 4.5V8.5M8 11V11.5" stroke="#6f8be6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>This is a static example. In production, the picker closes automatically after date range selection.</span>
          </div>
          
          <div className="date-picker" style={{ position: 'relative', display: 'inline-block' }}>
            <div className="date-picker__header">
              <div className="date-picker__input-wrapper">
                <input
                  type="text"
                  className="date-picker__input"
                  value={formatDateRange()}
                  onChange={(e) => setDateInputValue(e.target.value)}
                  placeholder="Select date range"
                />
                {(startDate || endDate) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setStartDate(null);
                          setEndDate(null);
                        }}
                        aria-label="Clear date range"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#9ca3af',
                          transition: 'color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                      >
                        <X size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Clear date range
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div className="date-picker__month-header">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1))}
                >
                  <ChevronsLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                >
                  <ChevronRight size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1))}
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <div className="date-picker__month-header">{new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
            <div className="date-picker__calendars">
              {renderCalendar(0)}
              {renderCalendar(1)}
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Date Range Picker (Date & Time)</h3>
          <p className="filter-docs__example-description">
            Full date picker interface with date input field, dual calendar view for range selection, and time selection controls. <strong>The picker automatically closes when both start and end dates are selected.</strong> This version includes time pickers with default times set to 00:00.
          </p>
          
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'rgba(111, 139, 230, 0.1)',
            border: '1px solid rgba(111, 139, 230, 0.3)',
            borderRadius: '6px',
            marginBottom: '16px',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--type-scale-s-size)',
            color: '#9ca3af'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#6f8be6" strokeWidth="1.5"/>
              <path d="M8 4.5V8.5M8 11V11.5" stroke="#6f8be6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>This is a static example. In production, the picker closes automatically after date range selection.</span>
          </div>
          
          <div className="date-picker" style={{ position: 'relative', display: 'inline-block' }}>
            <div className="date-picker__header">
              <div className="date-picker__input-wrapper">
                <input
                  type="text"
                  className="date-picker__input"
                  value={formatDateRangeWithTime()}
                  onChange={(e) => setDateInputValue(e.target.value)}
                  placeholder="Select date range"
                />
                {(startDateWithTime || endDateWithTime) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setStartDateWithTime(null);
                          setEndDateWithTime(null);
                        }}
                        aria-label="Clear date range"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#9ca3af',
                          transition: 'color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                      >
                        <X size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Clear date range
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div className="date-picker__month-header">{currentMonthWithTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonthWithTime(new Date(currentMonthWithTime.getFullYear() - 1, currentMonthWithTime.getMonth(), 1))}
                >
                  <ChevronsLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonthWithTime(new Date(currentMonthWithTime.getFullYear(), currentMonthWithTime.getMonth() - 1, 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonthWithTime(new Date(currentMonthWithTime.getFullYear(), currentMonthWithTime.getMonth() + 1, 1))}
                >
                  <ChevronRight size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setCurrentMonthWithTime(new Date(currentMonthWithTime.getFullYear() + 1, currentMonthWithTime.getMonth(), 1))}
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <div className="date-picker__month-header">{new Date(currentMonthWithTime.getFullYear(), currentMonthWithTime.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
            <div className="date-picker__calendars">
              {renderCalendarWithTime(0)}
              {renderCalendarWithTime(1)}
            </div>
            
            {/* Time pickers */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '24px' }}>
              {/* Start time */}
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--type-scale-xs-size)',
                  fontWeight: 'var(--type-scale-xs-weight)',
                  lineHeight: 'var(--type-scale-xs-line-height)',
                  letterSpacing: 'var(--type-scale-xs-letter-spacing)',
                  color: '#9ca3af'
                }}>
                  From time
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <select
                    value={startTime.hours}
                    onChange={(e) => setStartTime({ ...startTime, hours: e.target.value })}
                    className="date-picker__time-select"
                  >
                    {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                  <span style={{ color: '#9ca3af' }}>:</span>
                  <select
                    value={startTime.minutes}
                    onChange={(e) => setStartTime({ ...startTime, minutes: e.target.value })}
                    className="date-picker__time-select"
                  >
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* End time */}
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--type-scale-xs-size)',
                  fontWeight: 'var(--type-scale-xs-weight)',
                  lineHeight: 'var(--type-scale-xs-line-height)',
                  letterSpacing: 'var(--type-scale-xs-letter-spacing)',
                  color: '#9ca3af'
                }}>
                  To time
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <select
                    value={endTime.hours}
                    onChange={(e) => setEndTime({ ...endTime, hours: e.target.value })}
                    className="date-picker__time-select"
                  >
                    {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                  <span style={{ color: '#9ca3af' }}>:</span>
                  <select
                    value={endTime.minutes}
                    onChange={(e) => setEndTime({ ...endTime, minutes: e.target.value })}
                    className="date-picker__time-select"
                  >
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Single Date Picker (Date Only)</h3>
          <p className="filter-docs__example-description">
            Simplified date picker interface for selecting a single date. Features date input field, single calendar view with navigation controls. <strong>The picker automatically closes when a date is selected.</strong> This version is configured without time selection.
          </p>
          
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'rgba(111, 139, 230, 0.1)',
            border: '1px solid rgba(111, 139, 230, 0.3)',
            borderRadius: '6px',
            marginBottom: '16px',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--type-scale-s-size)',
            color: '#9ca3af'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#6f8be6" strokeWidth="1.5"/>
              <path d="M8 4.5V8.5M8 11V11.5" stroke="#6f8be6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>This is a static example. In production, the picker closes automatically after date selection.</span>
          </div>
          
          <div className="date-picker" style={{ position: 'relative', display: 'inline-block', width: '352px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div className="date-picker__input-wrapper">
                <input
                  type="text"
                  className="date-picker__input"
                  value={formatSingleDate()}
                  placeholder="Select date"
                  readOnly
                />
                {singleDate && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setSingleDate(null);
                        }}
                        aria-label="Clear date"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#9ca3af',
                          transition: 'color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                      >
                        <X size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Clear date
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="date-picker__month-header">{singleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonth(new Date(singleMonth.getFullYear() - 1, singleMonth.getMonth(), 1))}
                >
                  <ChevronsLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonth(new Date(singleMonth.getFullYear(), singleMonth.getMonth() - 1, 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonth(new Date(singleMonth.getFullYear(), singleMonth.getMonth() + 1, 1))}
                >
                  <ChevronRight size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonth(new Date(singleMonth.getFullYear() + 1, singleMonth.getMonth(), 1))}
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            </div>
            {renderSingleCalendar()}
          </div>
        </div>

        <div className="filter-docs__example">
          <h3 className="filter-docs__example-title">Single Date Picker (Date & Time)</h3>
          <p className="filter-docs__example-description">
            Date picker configured with time selection enabled. The time picker is always visible when this variant is used. <strong>The picker automatically closes when a date is selected.</strong> This version includes both date and time selection as configured by the component prop.
          </p>
          
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'rgba(111, 139, 230, 0.1)',
            border: '1px solid rgba(111, 139, 230, 0.3)',
            borderRadius: '6px',
            marginBottom: '16px',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--type-scale-s-size)',
            color: '#9ca3af'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#6f8be6" strokeWidth="1.5"/>
              <path d="M8 4.5V8.5M8 11V11.5" stroke="#6f8be6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>This is a static example. In production, the picker closes automatically after date selection.</span>
          </div>
          
          <div className="date-picker" style={{ position: 'relative', display: 'inline-block', width: '352px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div className="date-picker__input-wrapper">
                <input
                  type="text"
                  className="date-picker__input"
                  value={formatSingleDateWithTime()}
                  placeholder="Select date and time"
                  readOnly
                />
                {singleDateWithTime && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setSingleDateWithTime(null);
                        }}
                        aria-label="Clear date"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#9ca3af',
                          transition: 'color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                      >
                        <X size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Clear date
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="date-picker__month-header">{singleMonthWithTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonthWithTime(new Date(singleMonthWithTime.getFullYear() - 1, singleMonthWithTime.getMonth(), 1))}
                >
                  <ChevronsLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonthWithTime(new Date(singleMonthWithTime.getFullYear(), singleMonthWithTime.getMonth() - 1, 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonthWithTime(new Date(singleMonthWithTime.getFullYear(), singleMonthWithTime.getMonth() + 1, 1))}
                >
                  <ChevronRight size={14} />
                </button>
                <button 
                  className="date-picker__nav-button"
                  onClick={() => setSingleMonthWithTime(new Date(singleMonthWithTime.getFullYear() + 1, singleMonthWithTime.getMonth(), 1))}
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            </div>
            {renderSingleCalendarWithTime()}
            
            {/* Time picker - always visible for this variant */}
            <div style={{ marginTop: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--type-scale-xs-size)',
                fontWeight: 'var(--type-scale-xs-weight)',
                lineHeight: 'var(--type-scale-xs-line-height)',
                letterSpacing: 'var(--type-scale-xs-letter-spacing)',
                color: '#9ca3af'
              }}>
                Time
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select
                  value={singleTime.hours}
                  onChange={(e) => setSingleTime({ ...singleTime, hours: e.target.value })}
                  className="date-picker__time-select"
                >
                  {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
                <span style={{ color: '#9ca3af' }}>:</span>
                <select
                  value={singleTime.minutes}
                  onChange={(e) => setSingleTime({ ...singleTime, minutes: e.target.value })}
                  className="date-picker__time-select"
                >
                  {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(minute => (
                    <option key={minute} value={minute}>{minute}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Features</h2>
        <div className="filter-docs__feature-grid">
          <div className="filter-docs__feature-card">
            <h4 className="filter-docs__feature-title">Active Filter Chips</h4>
            <p className="filter-docs__feature-description">
              Selected filters display as removable chips in the filter bar, showing both the filter label and selected value.
            </p>
          </div>
          <div className="filter-docs__feature-card">
            <h4 className="filter-docs__feature-title">Searchable Menu</h4>
            <p className="filter-docs__feature-description">
              Filter menu includes a search input (keyboard shortcut: F) to quickly find filter options.
            </p>
          </div>
          <div className="filter-docs__feature-card">
            <h4 className="filter-docs__feature-title">Multiple Filter Types</h4>
            <p className="filter-docs__feature-description">
              Supports text, select, multiselect, date, and boolean filter types with appropriate UI for each.
            </p>
          </div>
          <div className="filter-docs__feature-card">
            <h4 className="filter-docs__feature-title">Date Presets</h4>
            <p className="filter-docs__feature-description">
              Date filters include common time ranges (1 day ago, 1 week ago, etc.) plus custom date selection.
            </p>
          </div>
          <div className="filter-docs__feature-card">
            <h4 className="filter-docs__feature-title">Icon Support</h4>
            <p className="filter-docs__feature-description">
              Filter options can include icons for better visual identification and organization.
            </p>
          </div>
          <div className="filter-docs__feature-card">
            <h4 className="filter-docs__feature-title">Two-Level Navigation</h4>
            <p className="filter-docs__feature-description">
              Primary menu shows filter categories, secondary menu shows specific values with back navigation.
            </p>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Specifications</h2>
        <div className="filter-docs__spec-grid">
          <div className="filter-docs__spec-label">Typography - Filter Bar & Inputs</div>
          <div className="filter-docs__spec-value">14px Inter Regular, 400 weight, 20px line-height, 0.15px letter-spacing</div>
          
          <div className="filter-docs__spec-label">Typography - Menu Options</div>
          <div className="filter-docs__spec-value">13px Inter Regular, 400 weight, 20px line-height, 0.1px letter-spacing</div>
          
          <div className="filter-docs__spec-label">Typography - Submenu Title</div>
          <div className="filter-docs__spec-value">15px Inter, 500 weight</div>
          
          <div className="filter-docs__spec-label">Typography - Weekdays</div>
          <div className="filter-docs__spec-value">12px Inter Regular, 400 weight, 16px line-height, 0.1px letter-spacing</div>
          
          <div className="filter-docs__spec-label">Empty State Icon</div>
          <div className="filter-docs__spec-value">IconButton with ListFilter icon (16px)</div>
          
          <div className="filter-docs__spec-label">Bar Background</div>
          <div className="filter-docs__spec-value">var(--filter-menu-bg) - Dark: #292a2e, Light: #ffffff</div>
          
          <div className="filter-docs__spec-label">Bar Hover</div>
          <div className="filter-docs__spec-value">var(--filter-option-hover-bg) - Dark: #35373d, Light: #f8f9fa</div>
          
          <div className="filter-docs__spec-label">Menu Background</div>
          <div className="filter-docs__spec-value">var(--filter-menu-bg) - Dark: #292a2e, Light: #ffffff</div>
          
          <div className="filter-docs__spec-label">Chip Background</div>
          <div className="filter-docs__spec-value">var(--filter-active-chip-bg) - Dark: #35373d, Light: #f1f3f5</div>
          
          <div className="filter-docs__spec-label">Option Hover</div>
          <div className="filter-docs__spec-value">var(--filter-option-hover-bg) - Dark: #35373d, Light: #f8f9fa</div>
          
          <div className="filter-docs__spec-label">Search Input Background</div>
          <div className="filter-docs__spec-value">var(--filter-search-bg) - Dark: #1f1f28, Light: #f8f9fa</div>
          
          <div className="filter-docs__spec-label">Checkmark Color</div>
          <div className="filter-docs__spec-value">#97A9DE (for selected items in dropdowns)</div>
          
          <div className="filter-docs__spec-label">Date Picker Active Tab</div>
          <div className="filter-docs__spec-value">Background: #3d63dd, Hover: #244cce</div>
          
          <div className="filter-docs__spec-label">Date Picker Selected Day</div>
          <div className="filter-docs__spec-value">Background: #3d63dd, Hover: #244cce</div>
          
          <div className="filter-docs__spec-label">Date Picker In-Range</div>
          <div className="filter-docs__spec-value">Background: rgba(61, 99, 221, 0.2)</div>
          
          <div className="filter-docs__spec-label">Action Button</div>
          <div className="filter-docs__spec-value">Background: #3d63dd, Hover: #244cce, Focus: 2px solid #67b3fb</div>
          
          <div className="filter-docs__spec-label">Border</div>
          <div className="filter-docs__spec-value">1px solid var(--border)</div>
          
          <div className="filter-docs__spec-label">Border Radius</div>
          <div className="filter-docs__spec-value">Bar: 6px, Menu: 8px, Chip: 4px, Option: 6px</div>
          
          <div className="filter-docs__spec-label">Box Shadow</div>
          <div className="filter-docs__spec-value">Menu/Submenu: 0 8px 24px rgba(0, 0, 0, 0.4)</div>
          
          <div className="filter-docs__spec-label">Focus Ring</div>
          <div className="filter-docs__spec-value">1px solid #6f8be6, 0 0 0 3px rgba(111, 139, 230, 0.25)</div>
          
          <div className="filter-docs__spec-label">Menu Width</div>
          <div className="filter-docs__spec-value">Main Menu: 380px, Value Dropdown: 240px, Date Picker: 680px</div>
          
          <div className="filter-docs__spec-label">Condition Dropdown Width</div>
          <div className="filter-docs__spec-value">Min-width: 140px</div>
          
          <div className="filter-docs__spec-label">Menu Max Height</div>
          <div className="filter-docs__spec-value">480px</div>
          
          <div className="filter-docs__spec-label">Icon Size</div>
          <div className="filter-docs__spec-value">16px for menu options, 14px for chips</div>
          
          <div className="filter-docs__spec-label">Padding</div>
          <div className="filter-docs__spec-value">Bar: 6px 12px, Option: 10px 12px, Search: 12px, Date Picker: 16px, Submenu Header: 16px</div>
          
          <div className="filter-docs__spec-label">Gap/Spacing</div>
          <div className="filter-docs__spec-value">Filter bar items: 8px, Submenu header: 12px, Chips: 8px, Input icons: 8px</div>
          
          <div className="filter-docs__spec-label">Bar Min Height</div>
          <div className="filter-docs__spec-value">36px</div>
          
          <div className="filter-docs__spec-label">Text Button Variants</div>
          <div className="filter-docs__spec-value">Minimalistic (condition), Minimalistic Inverted (value)</div>
          
          <div className="filter-docs__spec-label">Animation</div>
          <div className="filter-docs__spec-value">0.15s ease for hover transitions</div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
        <div className="filter-docs__guideline-grid">
          <div className="filter-docs__guideline-card">
            <div className="filter-docs__guideline-header">
              <div className="filter-docs__guideline-icon filter-docs__guideline-icon--do">✓</div>
              <h4 className="filter-docs__guideline-title">Do</h4>
            </div>
            <ul className="filter-docs__guideline-list">
              <li className="filter-docs__guideline-item">
                Use icons to help users quickly identify filter types
              </li>
              <li className="filter-docs__guideline-item">
                Provide clear, descriptive labels for filter options
              </li>
              <li className="filter-docs__guideline-item">
                Group related filters together logically
              </li>
              <li className="filter-docs__guideline-item">
                Show active filter count when multiple filters are applied
              </li>
              <li className="filter-docs__guideline-item">
                Include common date presets for temporal filtering
              </li>
            </ul>
          </div>
          <div className="filter-docs__guideline-card">
            <div className="filter-docs__guideline-header">
              <div className="filter-docs__guideline-icon filter-docs__guideline-icon--dont">✕</div>
              <h4 className="filter-docs__guideline-title">Don't</h4>
            </div>
            <ul className="filter-docs__guideline-list">
              <li className="filter-docs__guideline-item">
                Don't overwhelm users with too many filter options at once
              </li>
              <li className="filter-docs__guideline-item">
                Don't use technical jargon in filter labels
              </li>
              <li className="filter-docs__guideline-item">
                Don't hide critical filtering options in nested menus
              </li>
              <li className="filter-docs__guideline-item">
                Don't make it difficult to clear all filters at once
              </li>
              <li className="filter-docs__guideline-item">
                Don't use inconsistent terminology across filters
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="filter-docs__section">
        <h2 style={{ marginBottom: '24px' }}>Accessibility</h2>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px', 
            color: 'var(--muted-foreground)',
            fontSize: 'var(--type-scale-s-size)'
          }}>
            <li style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--foreground)' }}>Keyboard Navigation:</strong> Full keyboard support for opening menu, navigating options, and removing filters
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--foreground)' }}>Focus Management:</strong> Focus is automatically moved to search input when menu opens
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--foreground)' }}>ARIA Labels:</strong> All interactive elements include proper aria-label and role attributes
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--foreground)' }}>Click Outside:</strong> Menu closes when clicking outside the component
            </li>
            <li>
              <strong style={{ color: 'var(--foreground)' }}>Visual Feedback:</strong> Clear focus states and hover states for all interactive elements
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
