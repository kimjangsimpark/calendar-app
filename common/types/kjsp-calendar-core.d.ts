/* eslint-disable no-unused-vars */
import IndexComponent from 'kjsp-calendar-core';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'kjsp-index': React.DetailedHTMLProps<
        React.HTMLAttributes<IndexComponent>,
        IndexComponent
      >;
    }
  }
}

