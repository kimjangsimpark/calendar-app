import IndexComponent from 'kjsp-calendar-core';
import { useEffect, useRef } from 'react';

interface PropTypes {}

const Calendar = (props: PropTypes) => {
  const inputEl = useRef<IndexComponent>(null);

  useEffect(() => {
    require('kjsp-calendar-core');
  }, []);

  return <kjsp-index ref={inputEl} />;
};

export default Calendar;
