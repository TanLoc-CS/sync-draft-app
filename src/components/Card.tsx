import React from 'react';
import { Link } from 'react-router-dom';

import { DocumentIcon, GroupIcon } from '@/assets/icons';

export interface CardProps {
  docId: string,
  title: string,
  sharedBy?: string
}

const Card: React.FC<CardProps> = ({
  docId,
  title,
  sharedBy=null
}) => {
  return (
    <Link to={`/document/${docId}`} className='w-[260px] h-[120px] p-6 border border-gray-300 rounded-lg flex flex-col justify-between'>
      <div className='w-full h-auto flex flex-row justify-between'>
        <div className='w-[180px] h-[48px] truncate font-semibold'>{title}</div>
        {!sharedBy && <DocumentIcon fill='#6b7280'/>}
        {sharedBy && <GroupIcon fill='#6b7280'/>}
      </div>
      {sharedBy && <p className='text-gray-500'>{sharedBy}</p>}
    </Link>
  )
};

export default Card;