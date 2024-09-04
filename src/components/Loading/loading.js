import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './loading.css'; // Import the custom CSS

const Loading = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="star-animation-container">
        <FontAwesomeIcon icon={faHouse} size="2x" className="home-icon text-footer-header-color" />
      </div>
    </div>
  );
};

export default Loading;
