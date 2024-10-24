import React from 'react';
import Modal from 'react-modal';

export interface DropDownModalProps {
  isOpen: boolean,
  onRequestClose: () => void,
  contentLabel?: string,
  children: React.ReactNode
}

const customStyles = {
  content: {
    width: '100px',
    height: '100px',
    top: 0,
      left: 0,
      right: 0,
      bottom: 0,
  },
  overlay: {
    zIndex: 101,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  }
};


const DropDownModal = ({
  isOpen,
  onRequestClose,
  contentLabel='dropdown-modal',
  children
}: DropDownModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      parentSelector={(): HTMLElement => document.querySelector('compare-bar') || document.body}
    >
      {children}
    </Modal>
  )
}

export default DropDownModal;