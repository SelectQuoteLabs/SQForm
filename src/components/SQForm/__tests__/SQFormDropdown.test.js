import React from 'react';
import {screen} from '@testing-library/react';
import SQFormDropdown from '../SQFormDropdown';
import {renderSQForm} from '../../../utils/tests';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  name: 'dropdownExample',
  label: 'Dropdown Example'
};

const createDropdown = (options, fieldProps = {}) => {
  return <SQFormDropdown {...fieldProps}>{options}</SQFormDropdown>;
};

it('should render list of options', () => {
  const initialValues = {
    dropdownExample: ''
  };

  const options = [
    {label: 'Test 1', value: 1},
    {label: 'Test 2', value: 2},
    {label: 'Test 3', value: 3}
  ];

  const renderDropdown = createDropdown(options, defaultProps);

  renderSQForm(renderDropdown, {initialValues});

  const expandButton = screen.getByRole('button', /dropdown example/i);
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox', /dropdown example/i);

  expect(optionsList).toBeInTheDocument();
  expect(optionsList.children.length).toBe(3);
});

it('should render with initial value', () => {
  const initialValues = {
    dropdownExample: 2
  };

  const options = [
    {label: 'Option 1', value: 1},
    {label: 'Option 2', value: 2}
  ];

  renderSQForm(createDropdown(options, defaultProps), {initialValues});

  const labelValue = screen.getByRole('button', /dropdown example/i);
  expect(labelValue).toHaveTextContent('Option 2');
});

it('should disable option', () => {
  const initialValues = {
    dropdownExample: ''
  };

  const options = [
    {label: 'Test 1', value: 1},
    {label: 'Test 2', value: 2, isDisabled: true},
    {label: 'Test 3', value: 3}
  ];

  const renderDropdown = createDropdown(options, defaultProps);

  renderSQForm(renderDropdown, {initialValues});

  const expandButton = screen.getByRole('button', /dropdown example/i);
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox', /dropdown example/i);

  expect(optionsList.childNodes[1]).toHaveAttribute('aria-disabled', 'true');
});

it('should display an empty option when displayEmpty is true', () => {
  const initialValues = {
    dropdownExample: ''
  };

  const fieldProps = {
    ...defaultProps,
    displayEmpty: true
  };

  const options = [
    {label: 'Test 1', value: 1},
    {label: 'Test 2', value: 2},
    {label: 'Test 3', value: 3}
  ];

  const renderDropdown = createDropdown(options, fieldProps);

  renderSQForm(renderDropdown, {initialValues});

  const expandButton = screen.getByRole('button', /dropdown example/i);
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox', /dropdown example/i);

  expect(optionsList.children.length).toBe(4);
  expect(optionsList.childNodes[0]).toHaveTextContent('- -');
});
