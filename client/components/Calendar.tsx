import * as React from 'react';
import IndexComponent from 'kjsp-calendar-core';
import { useEffect, useRef } from 'react';

interface PropTypes {}

export const Calendar: React.FunctionComponent<PropTypes> = (props) => {
  const inputEl = useRef<IndexComponent>(null);

  useEffect(() => {
    require('kjsp-calendar-core');
  }, []);

  return <kjsp-index ref={inputEl} />;
};
