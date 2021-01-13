import React from 'react';
import './LoadingIcon.css';

const LoadingIcon = props => (
  <svg height={props.height || '10rem'} viewBox="0 0 446 439">
    <g className="sqLoadingIcon" stroke="none" strokeWidth="1" fill="none">
      <circle
        className="sqLoadingIcon__orange2"
        stroke="#EC9252"
        strokeWidth="35"
        cx="250.5"
        cy="231.5"
        r="177.5"
      />
      <circle
        className="sqLoadingIcon__yellow2"
        stroke="#FFE18B"
        strokeWidth="35"
        cx="195.5"
        cy="243.5"
        r="177.5"
      />
      <circle
        className="sqLoadingIcon__brown1"
        stroke="#665736"
        strokeWidth="35"
        cx="210.5"
        cy="195.5"
        r="177.5"
      />
      <circle
        className="sqLoadingIcon__yellow1"
        stroke="#FFE18B"
        strokeWidth="35"
        opacity="0.72"
        cx="195.5"
        cy="243.5"
        r="177.5"
      />
      <circle
        className="sqLoadingIcon__orange1"
        stroke="#EC9252"
        strokeWidth="35"
        opacity="0.63"
        cx="250.5"
        cy="231.5"
        r="177.5"
      />
    </g>
  </svg>
);

export default LoadingIcon;
