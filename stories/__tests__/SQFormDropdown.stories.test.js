import React from 'react';
import * as Yup from 'yup';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SQFormDropdown} from '../SQFormDropdown.stories';

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

/* There's not a way for me to test non-empty intiial values
   since there's no way for me to pass value to the SQForm
it('should render with non-empty initial value', () => {

});*/

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
    name: /missouri/i
  });

  expect(updatedExpandButton).toBeInTheDocument();
});

//This is on by default in the story, so it's already tested by the initial value test
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

it('should display icon and text if field is required', () => {
  render(<SQFormDropdown isRequired size="auto" />);

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
});

it('should not display icon and text if field is not required', () => {
  render(<SQFormDropdown isRequired={false} size="auto" />);

  const required = screen.queryByText(/required/i);
  expect(required).not.toBeInTheDocument();
});

it('should highlight field if required but no value selected', () => {
  const validationSchema = {
    state: Yup.string().required('Required')
  };

  render(
    <SQFormDropdown
      isRequired
      validationSchema={validationSchema}
      size="auto"
    />
  );

  const expandButton = screen.getByRole('button', {name: /state/i});

  userEvent.tab();
  expect(expandButton).toHaveFocus();

  userEvent.tab();
  expect(expandButton).not.toHaveFocus();

  const required = screen.getByText(/required/i);
  expect(required).toBeVisible();
  expect(required).toHaveClass('Mui-error');
});

/* Can't test these as there's no way to pass in a different options list
it('should show empty list if no options are given', () => {
  const nullSQFormDropdown = renderDropdown(null, DEFAULT_PROPS);

  renderSQForm(nullSQFormDropdown, DEFAULT_INTITIAL_VALUES);

  const expandButton = screen.getByRole('button', {name: EMPTY_OPTION});
  userEvent.click(expandButton);

  expect(screen.queryByRole('option')).not.toBeInTheDocument();
});

it('should show empty value if initial value not in options', () => {
  const initialValues = {
    dropdownExample: 5
  };

  renderSQForm(renderDropdown(), {initialValues});

  const expandButton = screen.queryByRole('button', {name: EMPTY_OPTION});

  expect(expandButton).not.toBeInTheDocument();
});*/
