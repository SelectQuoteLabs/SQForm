import React from 'react';
import {render as rtlRender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import SQFormTextField from '../SQFormTextField';
import SQForm from '../SQForm';

const render = (ui, options = {}) => {
  const {initialValue, validationSchema} = options;

  return rtlRender(
    <SQForm
      initialValues={{test: initialValue || ''}}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {ui}
    </SQForm>
  );
};

it('should render with initial value', () => {
  const value = 'blah';
  const {container} = render(
    <SQFormTextField name="test" label="Test Label" />,
    {initialValue: value}
  );

  expect(container.querySelector('input[name="test"]')).toHaveValue(value);
});

it('should render disabled', () => {
  const {container} = render(
    <SQFormTextField isDisabled={true} name="test" label="Test Label" />
  );

  expect(container.querySelector('input[name="test"]')).toBeDisabled();
});

it('should render required', () => {
  const {container} = render(
    <SQFormTextField isRequired={true} name="test" label="Test Label" />
  );

  expect(container.querySelector('input[name="test"]')).toHaveAttribute(
    'required'
  );
  expect(screen.getByText(/Required/)).toBeInTheDocument();
});

it('should render max characters', () => {
  const maxCharacters = 10;
  const word = 'hello';
  const phrase = 'hello world!';
  const {container} = render(
    <SQFormTextField
      maxCharacters={maxCharacters}
      name="test"
      label="Test Label"
    />
  );

  const textField = container.querySelector('input[name="test"]');

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
  const {container} = render(
    <SQFormTextField isRequired={true} name="test" label="Test Label" />,
    {validationSchema}
  );

  expect(screen.getByText(/test label/i).parentNode).not.toHaveClass(
    'Mui-error'
  );
  expect(screen.getByText('Required')).not.toHaveClass('Mui-error');

  userEvent.click(container.querySelector('input[name="test"]'));
  userEvent.tab();
  expect(screen.getByText(/test label/i).parentNode).toHaveClass('Mui-error');
  expect(screen.getByText('Required')).toHaveClass('Mui-error');
});
