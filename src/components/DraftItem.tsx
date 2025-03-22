import React from 'react';
import { IDraft } from '@/hook/useLocalDB';

const DraftItem: React.FC<IDraft> = ({
  docId,
  draftId,
  title,
  isMerged,
  createdAt,
  // content
}) => {
  return (
    <a 
      href={`/draft/${docId}/${draftId}`}
      className='w-full h-[60px] mb-2 p-2 bg-white rounded-lg hover:bg-gray-200 flex flex-col justify-between items-start'
    >
      <p>{title}</p>
      <p className='text-gray-500 font-normal text-[13px]'>
        {!isMerged? `Last update: ${createdAt}` : `Merged by: ${createdAt}`}
      </p>
    </a>
  )
};

export default DraftItem;