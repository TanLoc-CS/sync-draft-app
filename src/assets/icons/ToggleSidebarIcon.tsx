import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const ToggleSidebarIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = '#000',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z" />
    </svg>
  );
};

export default ToggleSidebarIcon;
