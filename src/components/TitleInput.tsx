import React, { useState } from 'react'

interface TitleInputProps {
  callback: (term: string) => void
}

const TitleInput: React.FC<TitleInputProps> = ({callback}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('Untitled')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setValue(e.target.value);
    callback(value);
  }

  return (
    <input
      type="text"
      placeholder={'Untitled document'}
      className="w-[480px] h-[48px] ml-4 p-2 bg-white box-border rounded-lg outline-hidden text-2xl truncate font-semibold"
      value={value}
      onChange={handleChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  )
};

export default TitleInput;