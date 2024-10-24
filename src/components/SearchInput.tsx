import React, { useState } from 'react';

import { SearchIcon } from '@/assets/icons';

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

export default function SearchInput({ 
  onChange,
  value
}: SearchInputProps) {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div 
      className={`w-[360px] h-[48px] px-3 bg-white rounded-lg flex items-center box-border ${focus? 'border-2 border-gray-500': 'border border-gray-300'}`}
    >
      <SearchIcon fill='#000'/>
      <input
        type="text"
        placeholder={'Search documents'}
        className="w-[340px] h-[40px] ml-2 outline-hidden bg-white focus:outline-none"
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}