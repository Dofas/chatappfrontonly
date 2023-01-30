import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "./popup-date-picker.scss";
import { useClickOutside } from "../../../utils/hooks/useClickOutside";

const PopupDatePicker = ({ value, onChange, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toDateFormat = (valueToConvert) => {
    if (!valueToConvert) return;

    return format(valueToConvert, "PPP");
  };

  const closeDatePicker = () => setIsOpen(false);
  const triggerOpenDatePicker = () => setIsOpen(!isOpen);

  const containerRef = useClickOutside(closeDatePicker);

  return (
    <div className="date-picker-container" ref={containerRef}>
      <button
        onClick={triggerOpenDatePicker}
        className="date-picker-trigger-button"
      >
        {!!value ? toDateFormat(value) : text}
      </button>

      {isOpen && (
        <DayPicker
          mode="single"
          selected={value}
          onSelect={(newValue) => onChange(newValue)}
          showOutsideDays
          fixedWeeks
          disabled={(date) => date.getTime() > new Date().getTime()}
          className="date-picker"
        />
      )}
    </div>
  );
};

export default PopupDatePicker;
