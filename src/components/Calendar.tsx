import IndexComponent from 'kjsp-calendar-core';
import { useEffect, useRef } from 'react';

interface PropTypes {
  width: number;
  height: number;
}

const Calendar = ({ width, height }: PropTypes) => {
  const inputEl = useRef<IndexComponent>(null);

  useEffect(() => {
    require('kjsp-calendar-core');
    console.log(inputEl);
  }, []);

  const calendarWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div style={calendarWrapperStyle}>
      <kjsp-index ref={inputEl} />
    </div>
  );
};

export default Calendar;
