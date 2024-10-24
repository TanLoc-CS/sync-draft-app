import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const CloseIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = '#000',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};

export default CloseIcon;
