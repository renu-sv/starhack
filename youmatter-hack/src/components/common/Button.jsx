import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false, ...props }) => {
  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1
  };

  const variantStyles = {
    primary: {
      background: '#4CAF50',
      color: 'white'
    },
    secondary: {
      background: '#f5f5f5',
      color: '#333'
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;