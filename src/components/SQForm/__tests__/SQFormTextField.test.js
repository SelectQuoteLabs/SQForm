import React from 'react';
import {render as rtlRender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import SQFormTextField from '../SQFormTextField';
import SQForm from '../SQForm';

const render = (ui, options = {}) => {
  const {initialValue = '', validationSchema} = options;

  return rtlRender(
    <SQForm
      initialValues={{test: initialValue}}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {ui}
    </SQForm>
  );
};

const defaultProps = {
  name: 'test',
  label: 'Test Label'
};

it('should render with initial value', () => {
  const value = 'blah';
  render(<SQFormTextField {...defaultProps} />, {
    initialValue: value
  });

  expect(screen.getByLabelText(/test label/i)).toHaveValue(value);
});

it('should render disabled', () => {
  render(<SQFormTextField {...defaultProps} isDisabled={true} />);

  expect(screen.getByLabelText(/test label/i)).toBeDisabled();
});

it('should render required', () => {
  render(<SQFormTextField {...defaultProps} isRequired={true} />);

  expect(screen.getByLabelText(/test label/i)).toHaveAttribute('required');
  expect(screen.getByText(/Required/)).toBeInTheDocument();
});

it('should render max characters', () => {
  const maxCharacters = 10;
  const word = 'hello';
  const phrase = 'hello world!';
  render(<SQFormTextField {...defaultProps} maxCharacters={maxCharacters} />);

  const textField = screen.getByLabelText(/test label/i);

  expect(screen.getByText(`: 0/${maxCharacters}`)).toBeInTheDocument();

  userEvent.type(textField, word);
  expect(
    screen.getByText(`: ${word.length}/${maxCharacters}`)
  ).toBeInTheDocument();
  expect(textField).toHaveValue(word);

  userEvent.clear(textField);
  userEvent.type(textField, phrase);
  expect(
    screen.getByText(`: ${maxCharacters}/${maxCharacters}`)
  ).toBeInTheDocument();
  expect(textField).not.toHaveValue(phrase);
  expect(textField).toHaveValue(phrase.substring(0, maxCharacters));
});

it('should render error state', () => {
  const validationSchema = {
    test: Yup.string().required('Required')
  };
  const errorClass = 'Mui-error';
  render(<SQFormTextField {...defaultProps} isRequired={true} />, {
    validationSchema
  });

  expect(screen.getByText(/test label/i).parentNode).not.toHaveClass(
    errorClass
  );
  expect(screen.getByText(/Required/)).not.toHaveClass(errorClass);

  userEvent.click(screen.getByLabelText(/test label/i));
  userEvent.tab();
  expect(screen.getByText(/test label/i).parentNode).toHaveClass(errorClass);
  expect(screen.getByText(/Required/)).toHaveClass(errorClass);
});
