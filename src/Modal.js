import React from 'react';

function Modal({ isOpen, onClose, imgSrc }) {
  if (!isOpen) return null;

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div style={styles.overlay} onClick={onClose}>
       <div style={styles.modal} onClick={handleModalContentClick}>
        <img src={imgSrc} alt="Modal" style={styles.image} />
        <button onClick={onClose} style={styles.closeBtn}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#000' }}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          </button>
      </div>
      </div>

  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    position: 'relative',
    background: '#FFF',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    overflowX:'hidden'
    
  },
  closeBtn: {
    position: 'absolute',
    top: '0px',
    right: '10px',
    color:'red',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  }
};

export default Modal;