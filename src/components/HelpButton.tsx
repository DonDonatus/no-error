import React from 'react';
import Link from 'next/link';

const HelpButton = () => {
  return (
    <Link href="/help" >
    <button style={styles.fixedButton}>
      <span style={styles.icon}>?</span>
    </button>
    </Link>
  );
};

const styles = {
  fixedButton: {
    backgroundColor: '#08106C', // Dark blue color
    color: '#FFFFFF', // White text
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    position: 'fixed', // Fixes the button to the viewport
    bottom: '10px', // 10px from the bottom
    right: '10px', // 10px from the left
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adds a slight shadow
    zIndex: 50, // Ensures the button stays above other content
  },
  icon: {
    fontSize: '26.5px',
    fontWeight: 'bold',
  },
};

export default HelpButton;
