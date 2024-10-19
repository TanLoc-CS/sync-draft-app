import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const HomeIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = '#fff',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </svg>
  );
};

export default HomeIcon;
