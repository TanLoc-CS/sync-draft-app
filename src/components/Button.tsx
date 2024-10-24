import React from 'react';

export enum ButtonSize {
  sm = 'w-[64px]',
  md = 'w-[120px]',
  lg = 'w-[204px]'
}

export enum ButtonColor {
  white= 'bg-white text-black hover:bg-gray-200 border',
  black= 'bg-black text-white hover:bg-gray-800'
}

export interface ButtonProps {
  label?: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  color?: ButtonColor,
  size?: ButtonSize,
  icon?: React.ReactElement, // svg
  disabled?: boolean,
  loading?: boolean,
  submit?: boolean,
  className?: string
}

const Button : React.FC<ButtonProps> = ({
  label,
  icon,
  size=ButtonSize.md,
  color=ButtonColor.white,
  onClick,
  disabled = false,
  loading = false,
  submit = false,
  className=''
}) => {

  return (
    <button
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={
        `${className} ${size} h-[36px] p-4 rounded-lg ${color} ${loading ? 'flex flex-row justify-center items-center' : 'flex flex-row justify-start items-center'}
      `}
    >
      {loading && <div>Loading...</div>}
      {!loading && icon && icon}
      <p className='ml-3'>
        {!loading && label && label}
      </p>
    </button>
  );
}

export default Button;