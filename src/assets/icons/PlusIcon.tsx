import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const PlusIcon: React.FC<IconProps> = ({
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
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
};

export default PlusIcon;
