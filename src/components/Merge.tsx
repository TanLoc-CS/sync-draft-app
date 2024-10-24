import React from 'react';
import Modal from 'react-modal';

export interface MergeProps {
  isOpen: boolean,
  onRequestClose: () => void,
  contentLabel?: string,
  children: React.ReactNode
}

const customStyles = {
  overlay: { zIndex: 100 }
};

const Merge = ({
  isOpen,
  onRequestClose,
  contentLabel='merge-modal',
  children
}: MergeProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      {children}
    </Modal>
  )
}

export default Merge;