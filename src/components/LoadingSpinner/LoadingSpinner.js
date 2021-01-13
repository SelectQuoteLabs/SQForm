import React from 'react';
import PropTypes from 'prop-types';

import LoadingIcon from '../LoadingIcon';
import './LoadingSpinner.css';

function LoadingSpinner({message}) {
  return (
    <div className="loadingSpinner flex--centered">
      <LoadingIcon height="10rem" />
      {message && <h3>{message}</h3>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string
};

export default LoadingSpinner;
