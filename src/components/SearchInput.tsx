import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';

interface SearchInputProps {
  callback: (term: string) => void
}

export default function SearchInput({ 
  callback
}: SearchInputProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setValue(e.target.value);
    callback(value);
  }

  return (
    <div 
      className={`w-[400px] h-[48px] px-3 bg-white rounded-lg flex items-center box-border ${focus? 'border-2 border-gray-500': 'border border-gray-300'}`}
    >
      <SearchIcon fill='#000'/>
      <input
        type="text"
        placeholder={'Search documents'}
        className="w-[340px] h-[40px] ml-2 outline-hidden bg-white focus:outline-none"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}