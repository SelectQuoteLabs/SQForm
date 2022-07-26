import React from 'react';
import {Box} from '@mui/material';
import {keyframes} from '@mui/system';

const bumpit = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.9) translate(20px, 20px);
  }
  100% {
    transform: scale(1);
  }
`;

const styles = {
  '& g': {
    opacity: '0.65',
  },

  '& circle:nth-child(1)': {
    animation: `${bumpit} 2s linear 0.66s infinite`,
  },

  '& circle:nth-child(2)': {
    animation: `${bumpit} 2s linear 1.33s infinite`,
  },

  '& circle:nth-child(3)': {
    animation: `${bumpit} 2s linear 0s infinite`,
  },

  '& circle:nth-child(4)': {
    animation: `${bumpit} 2s linear 1.33s infinite`,
  },

  '& circle:nth-child(5)': {
    animation: `${bumpit} 2s linear 0.66s infinite`,
  },
};

type LoadingIconProps = {
  /** The height of the loading icon */
  height?: string;
};

const LoadingIcon = ({height = '10rem'}: LoadingIconProps): JSX.Element => {
  return (
    <Box sx={styles}>
      <svg height={height} viewBox="0 0 446 439">
        <g stroke="none" strokeWidth="1" fill="none">
          <circle
            stroke="#EC9252"
            strokeWidth="35"
            cx="250.5"
            cy="231.5"
            r="177.5"
          />
          <circle
            stroke="#FFE18B"
            strokeWidth="35"
            cx="195.5"
            cy="243.5"
            r="177.5"
          />
          <circle
            stroke="#665736"
            strokeWidth="35"
            cx="210.5"
            cy="195.5"
            r="177.5"
          />
          <circle
            stroke="#FFE18B"
            strokeWidth="35"
            opacity="0.72"
            cx="195.5"
            cy="243.5"
            r="177.5"
          />
          <circle
            stroke="#EC9252"
            strokeWidth="35"
            opacity="0.63"
            cx="250.5"
            cy="231.5"
            r="177.5"
          />
        </g>
      </svg>
    </Box>
  );
};

export default LoadingIcon;
