import React from 'react';
import * as Yup from 'yup';
import {render, screen, waitFor, within} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormDropdown.stories';

const {Default: SQFormDropdown} = composeStories(stories);

it('should render list of options', () => {
  render(<SQFormDropdown size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});

  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');
  expect(optionsList).toBeInTheDocument();
  expect(within(optionsList).getAllByRole('option')).toHaveLength(3);
});

it('should render with empty initial value', () => {
  render(<SQFormDropdown size="auto" />);

  const labelValue = screen.getByRole('button', {name: /state/i});
  expect(labelValue).toHaveTextContent('- -');
});

it('should render with non-empty initial value', () => {
  render(
    <SQFormDropdown size="auto" SQFormProps={{initialValues: {state: 'MO'}}} />
  );

  const labelValue = screen.getByRole('button', {name: /state/i});
  expect(labelValue).toHaveTextContent('Missouri');
});

it('should update when option is selected', () => {
  render(<SQFormDropdown size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  expect(expandButton).toHaveTextContent('- -');

  userEvent.click(expandButton);

  const option = screen.getByText('Arizona');
  userEvent.click(option);

  const labelValue = screen.getByRole('button', {name: /state/i});
  expect(labelValue).toHaveTextContent('Arizona');
});

it('should display disabled option', () => {
  render(<SQFormDropdown size="auto" />);

  const disabledOptionBefore = screen.queryByRole('option', /kansas/i);
  expect(disabledOptionBefore).not.toBeInTheDocument();

  const expandButton = screen.getByRole('button', {name: /state/i});
  userEvent.click(expandButton);

  const disabledOption = screen.getByRole('option', {name: /kansas/i});
  expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
});

it('should not let the disabled option be selected', async () => {
  render(<SQFormDropdown size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});

  // Disabled option is skipped
  userEvent.type(expandButton, '{tab}{enter}{arrowdown}{arrowdown}{enter}');
  const updatedExpandButton = await screen.findByRole('button', {
    name: /missouri/i,
  });

  expect(updatedExpandButton).toBeInTheDocument();
});

it('should display an empty option when displayEmpty is true', () => {
  render(<SQFormDropdown displayEmpty size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');

  const options = within(optionsList).getAllByRole('option');
  expect(options).toHaveLength(4);
  expect(options[0]).toHaveTextContent('- -');
});

it('should not be selectable if it is disabled', () => {
  const handleChange = jest.fn();

  render(<SQFormDropdown isDisabled onChange={handleChange} size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  expect(expandButton).toHaveAttribute('aria-disabled', 'true');

  userEvent.click(expandButton);
  expect(handleChange).not.toHaveBeenCalled();

  const optionsList = screen.queryByRole('listbox');
  expect(optionsList).not.toBeInTheDocument();
});

it('should be selectable if it is not disabled', () => {
  render(<SQFormDropdown isDisabled={false} size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  expect(expandButton).not.toHaveAttribute('aria-disabled', 'true');

  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');
  expect(optionsList).toBeInTheDocument();
});

it('should display icon and text if field is required', async () => {
  const validationSchema = {
    state: Yup.string().required(),
  };

  render(<SQFormDropdown SQFormProps={{validationSchema}} size="auto" />);

  await waitFor(() => expect(screen.getByText(/required/i)).toBeVisible());
});

it('should not display icon and text if field is not required', () => {
  const validationSchema = {
    state: Yup.string(),
  };

  render(<SQFormDropdown SQFormProps={{validationSchema}} size="auto" />);

  const required = screen.queryByText(/required/i);
  expect(required).not.toBeInTheDocument();
});

it('should highlight field if required but no value selected', async () => {
  const validationSchema = {
    state: Yup.string().required(),
  };

  render(<SQFormDropdown SQFormProps={{validationSchema}} size="auto" />);

  const expandButton = screen.getByRole('button', {name: /state/i});

  userEvent.tab();
  await waitFor(() => expect(expandButton).toHaveFocus());

  userEvent.tab();
  await waitFor(() => expect(expandButton).not.toHaveFocus());

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
  expect(required).toHaveClass('Mui-error');
});

it('should show empty list if no options are given', () => {
  const consoleWarnSpy = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => {});

  render(<SQFormDropdown size="auto" children={null} />);

  const expandButton = screen.getByRole('button', {name: /- -/i});
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

  render(
    <SQFormDropdown size="auto" SQFormProps={{initialValues: {state: 'TX'}}} />
  );

  const expandButton = screen.queryByRole('button', {name: /- -/i});

  expect(expandButton).not.toBeInTheDocument();
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    expect.stringMatching(/requested display value.*could not be found/i)
  );

  consoleWarnSpy.mockRestore();
});
