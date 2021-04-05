import React from 'react';
import * as Yup from 'yup';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SQFormDropdown} from '../SQFormDropdown.stories';

it('should render list of options', () => {
  render(<SQFormDropdown />);

  const expandButton = screen.getByRole('button', {name: /state/i});

  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');
  expect(optionsList).toBeInTheDocument();
  expect(within(optionsList).getAllByRole('option')).toHaveLength(3);
});

it('should render with empty initial value', () => {
  render(<SQFormDropdown />);

  const labelValue = screen.getByRole('button', {name: /state/i});
  expect(labelValue).toHaveTextContent('- -');
});

it('should update when option is selected', () => {
  render(<SQFormDropdown />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  expect(expandButton).toHaveTextContent('- -');

  userEvent.click(expandButton);

  const option = screen.getByText('Arizona');
  userEvent.click(option);

  const labelValue = screen.getByRole('button', {name: /state/i});
  expect(labelValue).toHaveTextContent('Arizona');
});

it('should disable option', () => {
  render(<SQFormDropdown />);

  const disabledOptionBefore = screen.queryByRole('option', /kansas/i);
  expect(disabledOptionBefore).not.toBeInTheDocument();

  const expandButton = screen.getByRole('button', {name: /state/i});
  userEvent.click(expandButton);

  const disabledOption = screen.getByRole('option', {name: /kansas/i});
  expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

  //Currently still ignoring diabled
  //userEvent.click(disabledOption);

  //const disabledOptionAfter = screen.getByRole('option', {name: /kansas/i});
  //expect(disabledOptionAfter).toBeInTheDocument();
  //expect(disabledOptionAfter).toBeVisible();
});

//This is on by default in the story, so it's already tested by the initial value test
it('should display an empty option when displayEmpty is true', () => {
  render(<SQFormDropdown displayEmpty />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');

  const options = within(optionsList).getAllByRole('option');
  expect(options).toHaveLength(4);
  expect(options[0]).toHaveTextContent('- -');
});

it('should not be selectable if it is disabled', () => {
  const handleChange = jest.fn();

  render(<SQFormDropdown isDisabled onChange={handleChange} />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  expect(expandButton).toHaveAttribute('aria-disabled', 'true');

  userEvent.click(expandButton);
  expect(handleChange).not.toHaveBeenCalled();

  const optionsList = screen.queryByRole('listbox');
  expect(optionsList).not.toBeInTheDocument();
});

it('should be selectable if it is not disabled', () => {
  render(<SQFormDropdown isDisabled={false} />);

  const expandButton = screen.getByRole('button', {name: /state/i});
  expect(expandButton).not.toHaveAttribute('aria-disabled', 'true');

  userEvent.click(expandButton);

  const optionsList = screen.getByRole('listbox');
  expect(optionsList).toBeInTheDocument();
});

it('should display icon and text if field is required', () => {
  render(<SQFormDropdown isRequired />);

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
});

it('should not display icon and text if field is not required', () => {
  render(<SQFormDropdown isRequired={false} />);

  const required = screen.queryByText(/required/i);
  expect(required).not.toBeInTheDocument();
});

it('should highlight field if required but no value selected', () => {
  const validationSchema = {
    state: Yup.string().required('Required')
  };

  render(<SQFormDropdown isRequired validationSchema={validationSchema} />);

  const expandButton = screen.getByRole('button', {name: /state/i});

  userEvent.tab();
  expect(expandButton).toHaveFocus();

  userEvent.tab();
  expect(expandButton).not.toHaveFocus();

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
  expect(required).toHaveClass('Mui-error');
});
