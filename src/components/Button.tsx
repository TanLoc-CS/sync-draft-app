import React from 'react';

export enum ButtonSize {
  sm = 'w-[60px]',
  md = 'w-[120px]',
  lg = 'w-[180px]'
}

export interface ButtonProps {
  label?: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  size: ButtonSize,
  icon?: React.ReactElement, // svg
  disabled?: boolean,
  loading?: boolean,
  submit?: boolean
}

const Button : React.FC<ButtonProps> = ({
  label,
  icon,
  size=ButtonSize.md,
  onClick,
  disabled = false,
  loading = false,
  submit = false
}) => {
  return (
    <button
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={
        `${size} h-[48px] p-4 rounded-lg bg-black text-white hover:bg-gray-800 ${loading ? 'flex flex-row justify-center items-center' : 'flex flex-row justify-between items-center'}
      `}
    >
      {loading && <div>Loading...</div>}
      {!loading && icon && icon}
      {!loading && label && label}
    </button>
  );
}

export default Button;