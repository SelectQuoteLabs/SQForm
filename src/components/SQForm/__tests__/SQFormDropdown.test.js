import React from 'react';
import {screen} from '@testing-library/react';
import SQFormDropdown from '../SQFormDropdown';
import {renderSQForm} from '../../../utils/tests';

const defaultProps = {
  name: 'dropdownExample',
  label: 'Dropdown Example'
};

const createDropdown = (options, fieldProps = {}) => {
  return <SQFormDropdown {...fieldProps}>{options}</SQFormDropdown>;
};

it('should render with initial value', () => {
  const initialValues = {
    dropdownExample: 2
  };

  const options = [
    {label: 'Option 1', value: 1},
    {label: 'Option 2', value: 2}
  ];

  renderSQForm(createDropdown(options, defaultProps), {initialValues});

  //The input DOM object has 'aria-hidden'=true set so the Testing Library can't find it
  //That's why currently getting it via parent/child nodes
  const labelValue = screen.getByRole('button', /dropdown example/i);
  const input = labelValue.parentNode.childNodes[1];

  expect(input).toHaveValue('2');
});
