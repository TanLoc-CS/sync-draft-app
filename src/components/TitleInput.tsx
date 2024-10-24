import React, { useState } from 'react'

interface TitleInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const TitleInput: React.FC<TitleInputProps> = ({ onChange, value}) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <input
      type="text"
      placeholder={'Untitled document'}
      className="w-[480px] h-[48px] ml-4 p-2 bg-white box-border rounded-lg outline-hidden text-2xl truncate font-semibold"
      value={value}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  )
};

export default TitleInput;