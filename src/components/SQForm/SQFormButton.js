import React from 'react';
import PropTypes from 'prop-types';
import {RoundedButton} from 'scplus-shared-components';

import {useFormButton} from './useFormButton';

function SQFormButton({
  children,
  isDisabled = false,
  title = 'Form Submission',
  type = 'submit'
}) {
  const {dirty, isButtonDisabled, handleReset} = useFormButton(isDisabled);

  const isSQFormButtonDisabled = React.useMemo(() => {
    if (type === 'reset') {
      return !dirty;
    }

    return isButtonDisabled;
  }, [dirty, isButtonDisabled, type]);

  return (
    <RoundedButton
      title={title}
      type={type}
      isDisabled={isSQFormButtonDisabled}
      onClick={type === 'reset' ? handleReset : undefined}
    >
      {children}
    </RoundedButton>
  );
}

SQFormButton.propTypes = {
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'reset'])
};

export default SQFormButton;
