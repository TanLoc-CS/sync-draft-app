import React from 'react';

export interface DraftProps {
  isMerged: boolean,
  draftId: string,
  draftTitle: string,
  updatedAt: string,
} 

const Draft: React.FC<DraftProps> = ({
  isMerged,
  draftId,
  draftTitle,
  updatedAt
}) => {

  
  return (
    <div 
      className='w-full h-[60px] mb-2 p-2 bg-white rounded-lg hover:bg-gray-200 flex flex-col justify-between items-start
    '>
      <p>
        {draftTitle}
      </p>
      <p className='text-gray-500 font-normal text-[13px]'>
        {isMerged? `Last update: ${updatedAt}` : `Merged by: ${updatedAt}`}
      </p>
    </div>
  )
};

export default Draft;