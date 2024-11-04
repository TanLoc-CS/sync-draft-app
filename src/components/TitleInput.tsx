import React, { useState } from 'react'

interface TitleInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const TitleInput: React.FC<TitleInputProps> = ({ onChange, value}) => {
  return (
    <input
      type="text"
      placeholder={'Untitled document'}
      className="w-fit min-w-[400px] h-[48px] ml-4 p-2 bg-white box-border rounded-lg outline-hidden text-2xl truncate font-semibold hover:border-2"
      value={value}
      onChange={onChange}
    />
  )
};

export default TitleInput;