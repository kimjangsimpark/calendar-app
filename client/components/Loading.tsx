import * as React from 'react';
// import loadingStyle from '@/styles/components/loading.module.scss';
const loadingStyle: any = {};

const Loading = () => {
  return (
    <div className={loadingStyle.loadingWrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: 'auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width="110px"
        height="110px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="rotate(0 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-1.1752136752136753s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-1.0683760683760684s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.9615384615384616s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.8547008547008548s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.7478632478632479s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.6410256410256411s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.5341880341880342s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.4273504273504274s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.32051282051282054s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.2136752136752137s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="-0.10683760683760685s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill="#93dbe9"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1.282051282051282s"
              begin="0s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
      </svg>
    </div>
  );
};

export default Loading;
