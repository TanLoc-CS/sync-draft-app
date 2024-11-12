import { Merge } from '@/types/merge'
import React from 'react'

interface MergeItemProps extends Merge {
  setState: React.Dispatch<React.SetStateAction<Merge | undefined>>
  openModal: () => void
}

const MergeItem: React.FC<MergeItemProps> = ({
  _id,
  docId,
  mergedBy,
  before,
  after,
  mergedAt,
  description,
  setState,
  openModal
}) => {
  const handleSelectMergeView = () => {
    const merge: Merge = {
      _id,
      docId,
      mergedBy,
      after,
      before,
      description,
      mergedAt
    }
    setState(merge)
    openModal();
  }

  return (
    <div
      className='w-full h-[60px] mb-2 p-2 bg-white rounded-lg hover:bg-gray-200 flex flex-col justify-between items-start cursor-pointer'
      onClick={handleSelectMergeView}
    >
      <p>{description || 'Untitle'}</p>
      <p className='text-gray-500 font-normal text-[13px]'>
        {`Merged by: ${mergedBy}`}
      </p>
    </div>
  )
}

export default MergeItem