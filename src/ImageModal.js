import React from 'react';

function ImageModal({ isOpen, imgSrc, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <img src={imgSrc} alt="Popup" style={styles.image} />
        <button onClick={onClose} style={styles.closeButton}>Close</button>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    position: 'relative',
    padding: 20,
    background: '#fff',
    borderRadius: 5,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
};

export default ImageModal;