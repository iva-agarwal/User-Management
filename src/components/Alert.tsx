import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500); // Allow time for fade-out transition
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type} ${show ? 'alert-show' : ''}`}>
      <span>{message}</span>
      <button className="alert-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Alert;
