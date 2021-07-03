import { useEffect } from 'react';
/* eslint-disable no-unused-vars */
import IndexComponent from 'kjsp-calendar-core';

/* eslint-disable no-unused-vars */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'kjsp-index': IndexComponent;
    }
  }
}

interface PropTypes {
  width: number;
  height: number;
}

const Calendar = ({ width, height }: PropTypes) => {
  useEffect(() => {
    require('kjsp-calendar-core');
  }, []);

  const calendarWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div style={calendarWrapperStyle}>
      <kjsp-index />
    </div>
  );
};

export default Calendar;
