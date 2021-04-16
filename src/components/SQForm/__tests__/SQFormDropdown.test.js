import React from 'react';
import * as Yup from 'yup';
import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SQFormDropdown from '../SQFormDropdown';
import {renderSQForm} from '../../../utils/tests';

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

const EMPTY_OPTION = '- -';

const renderDropdown = (
  options = DEFAULT_OPTIONS,
  fieldProps = DEFAULT_PROPS
) => {
  return <SQFormDropdown {...fieldProps}>{options}</SQFormDropdown>;
};

it('should render list of options', () => {
  renderSQForm(renderDropdown(), DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});

  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');
  expect(optionsList).toBeInTheDocument();
  expect(within(optionsList).getAllByRole('option')).toHaveLength(
    DEFAULT_OPTIONS.length
  );
});

it('should render with initial value', () => {
  const initialValues = {
    dropdownExample: 2
  };

  renderSQForm(renderDropdown(), {initialValues});

  const labelValue = screen.getByRole('button', {name: /test 2/i});
  expect(labelValue).toHaveTextContent('Test 2');
});

it('should update when option is selected', () => {
  const handleChange = jest.fn();
  const fieldProps = {
    ...DEFAULT_PROPS,
    onChange: handleChange
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  expect(expandButton).toHaveTextContent(EMPTY_OPTION);

  userEvent.click(expandButton);
  expect(handleChange).toHaveBeenCalledTimes(0);

  const option = screen.getByText(DEFAULT_OPTIONS[0].label);
  userEvent.click(option);

  expect(handleChange).toHaveBeenCalledTimes(1);

  const labelValue = screen.getByRole('button', {
    name: DEFAULT_OPTIONS[0].label
  });
  expect(labelValue).toHaveTextContent(DEFAULT_OPTIONS[0].label);
});

it('should display disabled option', () => {
  const options = [
    {label: 'Test 1', value: 1},
    {label: 'Test 2', value: 2, isDisabled: true},
    {label: 'Test 3', value: 3}
  ];

  const fieldProps = {
    ...DEFAULT_PROPS
  };

  const sqFormDropdown = renderDropdown(options, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');

  const disabledOption = within(optionsList).getAllByRole('option')[1];
  expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
});

it('should not let the disabled option be selected', async () => {
  const options = [
    {label: 'Test 1', value: 1},
    {label: 'Test 2', value: 2, isDisabled: true},
    {label: 'Test 3', value: 3}
  ];

  const fieldProps = {
    ...DEFAULT_PROPS
  };

  const sqFormDropdown = renderDropdown(options, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});

  // Disabled option is skipped
  userEvent.type(expandButton, '{tab}{enter}{arrowdown}{arrowdown}{enter}');
  const updatedExpandButton = await screen.findByRole('button', {
    name: /test 3/i
  });

  expect(updatedExpandButton).toBeInTheDocument();
});

it('should display an empty option when displayEmpty is true', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    displayEmpty: true
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');

  const options = within(optionsList).getAllByRole('option');
  expect(options).toHaveLength(4);
  expect(options[0]).toHaveTextContent(EMPTY_OPTION);
});

it('should not be selectable if it is disabled', () => {
  const handleChange = jest.fn();
  const fieldProps = {
    ...DEFAULT_PROPS,
    isDisabled: true,
    onChange: handleChange
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  expect(expandButton).toHaveAttribute('aria-disabled', 'true');

  userEvent.click(expandButton);
  expect(handleChange).not.toHaveBeenCalled();

  const optionsList = screen.queryByRole('listbox');
  expect(optionsList).not.toBeInTheDocument();
});

it('should be selectable if it is not disabled', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isDisabled: false
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  expect(expandButton).not.toHaveAttribute('aria-disabled', 'true');

  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');
  expect(optionsList).toBeInTheDocument();
});

it('should display icon and text if field is required', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isRequired: true
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
});

it('should not display icon and text if field is not required', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isRequired: false
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, DEFAULT_INTITIAL_VALUES);

  const required = screen.queryByText(/required/i);
  expect(required).toBeNull();
});

it('should highlight field if required but no value selected', () => {
  const fieldProps = {
    ...DEFAULT_PROPS,
    isRequired: true
  };

  const formProps = {
    ...DEFAULT_INTITIAL_VALUES,
    validationSchema: {
      dropdownExample: Yup.string().required('Required')
    }
  };

  const sqFormDropdown = renderDropdown(DEFAULT_OPTIONS, fieldProps);

  renderSQForm(sqFormDropdown, formProps);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});

  userEvent.tab();
  expect(expandButton).toHaveFocus();

  userEvent.tab();
  expect(expandButton).not.toHaveFocus();

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
  expect(required).toHaveClass('Mui-error');
});

it('should show empty list if no options are given', () => {
  const consoleWarnSpy = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => {});

  const nullSQFormDropdown = renderDropdown(null, DEFAULT_PROPS);

  renderSQForm(nullSQFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  userEvent.click(expandButton);

  expect(screen.queryByRole('option')).not.toBeInTheDocument();
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    expect.stringMatching(/the children you provided.*was undefined/i)
  );

  consoleWarnSpy.mockRestore();
});

it('should show empty value if initial value not in options', () => {
  const consoleWarnSpy = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => {});

  const initialValues = {
    dropdownExample: 5
  };

  renderSQForm(renderDropdown(), {initialValues});

  const expandButton = screen.queryByRole('button', {name: EMPTY_OPTION});

  expect(expandButton).not.toBeInTheDocument();
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    expect.stringMatching(/requested display value.*could not be found/i)
  );

  consoleWarnSpy.mockRestore();
});
