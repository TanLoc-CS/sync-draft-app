import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const LeftArrowIcon: React.FC<IconProps> = ({
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
      <path d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z"/>
    </svg>
  );
};

export default LeftArrowIcon;
