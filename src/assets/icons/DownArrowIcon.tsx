import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const DownArrowIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = 'black',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
    >
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
};

export default DownArrowIcon;
