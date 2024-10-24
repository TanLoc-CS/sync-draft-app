import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const MergeIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  stroke = 'currentColor',
  strokeWidth = 2,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-git-merge"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  );
};

export default MergeIcon;
