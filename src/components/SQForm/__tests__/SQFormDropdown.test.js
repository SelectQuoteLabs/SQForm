import React from 'react';
import * as Yup from 'yup';
import {screen} from '@testing-library/react';
import SQFormDropdown from '../SQFormDropdown';
import {renderSQForm} from '../../../utils/tests';
import userEvent from '@testing-library/user-event';

const DEFAULT_PROPS = {
  name: 'dropdownExample',
  label: 'Dropdown Example'
};

const DEFAULT_INTITIAL_VALUES = {
  initialValues: {
    dropdownExample: ''
  }
};

const DEFAULT_OPTIONS = [
  {label: 'Test 1', value: 1},
  {label: 'Test 2', value: 2},
  {label: 'Test 3', value: 3}
];

const createDropdown = (
  options = DEFAULT_OPTIONS,
  fieldProps = DEFAULT_PROPS
) => {
  return <SQFormDropdown {...fieldProps}>{options}</SQFormDropdown>;
};

it('should render list of options', () => {
  const renderDropdown = createDropdown();

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

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

  const renderDropdown = createDropdown();

  renderSQForm(renderDropdown, {initialValues});

  const labelValue = screen.getByRole('button', /dropdown example/i);
  expect(labelValue).toHaveTextContent('Test 2');
});

it('should update when option is selected', () => {
  const handleChange = jest.fn();
  const fieldProps = {
    ...DEFAULT_PROPS,
    onChange: handleChange
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', /dropdown example/i);
  userEvent.click(expandButton);

  const option = screen.getByText('Test 1');
  userEvent.click(option);

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledTimes(1);

  const labelValue = screen.getByRole('button', /dropdown example/i);
  expect(labelValue).toHaveTextContent('Test 1');
});

it('should disable option', () => {
  const options = [
    {label: 'Test 1', value: 1},
    {label: 'Test 2', value: 2, isDisabled: true},
    {label: 'Test 3', value: 3}
  ];

  const renderDropdown = createDropdown(options, DEFAULT_PROPS);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', /dropdown example/i);
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox', /dropdown example/i);

  expect(optionsList.childNodes[1]).toHaveAttribute('aria-disabled', 'true');
});

it('should display an empty option when displayEmpty is true', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    displayEmpty: true
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', /dropdown example/i);
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox', /dropdown example/i);

  expect(optionsList.children.length).toBe(4);
  expect(optionsList.childNodes[0]).toHaveTextContent('- -');
});

it('should not be selectable if it is disabled', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isDisabled: true
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', /dropdown example/i);
  expect(expandButton).toHaveAttribute('aria-disabled', 'true');
});

it('should be selectable if it is not disabled', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isDisabled: false
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', /dropdown example/i);
  expect(expandButton).not.toHaveAttribute('aria-disabled', 'true');
});

it('should display icon and text if field is required', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isRequired: true
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
});

it('should not display icon and text if field is not required', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isRequired: false
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const required = screen.queryByText(/required/i);
  expect(required).toBeNull();
});

it('should highlight field if required but no value selected', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isRequired: true,
    validationSchema: {
      dropdownExample: Yup.string().required('Required')
    }
  };

  const renderDropdown = createDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(renderDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', /dropdown example/i);

  userEvent.tab();
  expect(expandButton).toHaveFocus();

  userEvent.tab();
  expect(expandButton).not.toHaveFocus();

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
  //expect required to be orange / highlighted
  //expect(required).toHaveAttribute('class', 'MuiFormHelperText-root Mui-error Mui-required');
});
