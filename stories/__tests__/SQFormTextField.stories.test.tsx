import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import * as stories from '../SQFormTextField.stories';

const {
  Default: SQFormTextField,
  WithValidation: SQFormTextFieldWithValidation,
} = composeStories(stories);

describe('SQFormTextField Tests', () => {
  describe('Text Field Only', () => {
    it('should render a label and text field', () => {
      render(<SQFormTextField size="auto" />);

      const label = screen.getByText('Text Field');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Text Field');

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).toBeInTheDocument();
    });

    it('should render with empty initial value', () => {
      render(<SQFormTextField size="auto" />);

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).toHaveValue('');
    });

    it('should render with non-emtpy initial value', () => {
      render(
        <SQFormTextField
          size="auto"
          SQFormProps={{initialValues: {textField: 'Hello SelectQuote!'}}}
        />
      );

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).toHaveValue('Hello SelectQuote!');
    });

    it('should update when text is entered', () => {
      render(<SQFormTextField size="auto" />);

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).toHaveValue('');

      userEvent.type(textField, 'Hello');

      expect(textField).toHaveValue('Hello');
    });

    it('should render as disabled when isDisabled is true', () => {
      render(<SQFormTextField size="auto" isDisabled />);

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).toBeDisabled();
    });

    it('shouod not render as disable when isDisabled is false', () => {
      render(<SQFormTextField size="auto" isDisabled={false} />);

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).not.toBeDisabled();
    });

    it('should only render the number of characters equal to maxCharacters', () => {
      const maxCharacters = 5;

      render(<SQFormTextField size="auto" maxCharacters={maxCharacters} />);

      expect(screen.getByText(`: 0/${maxCharacters}`)).toBeInTheDocument();

      const textField = screen.getByRole('textbox', {name: /text field/i});

      userEvent.type(textField, 'Hello World');

      expect(textField).toHaveValue('Hello');
      expect(
        screen.getByText(`: ${maxCharacters}/${maxCharacters}`)
      ).toBeInTheDocument();
    });

    it('should render all characters given when no maxCharacters passed in', () => {
      render(<SQFormTextField size="auto" />);

      const textField = screen.getByRole('textbox', {name: /text field/i});

      userEvent.type(textField, 'This is a really long string.');

      expect(textField).toHaveValue('This is a really long string.');
    });
  });

  describe('Text Field With Validation', () => {
    it('should initially render "Required" helper text if field is required', async () => {
      const {container} = render(<SQFormTextFieldWithValidation size="auto" />);

      const helperText = container.querySelector('.MuiFormHelperText-root');

      await waitFor(() => expect(helperText).toHaveClass('Mui-required'));
    });

    it('should highlight field if required but no value selected', async () => {
      const {container} = render(<SQFormTextFieldWithValidation size="auto" />);

      userEvent.tab();

      const textField = screen.getByRole('textbox', {name: /text field/i});
      expect(textField).toHaveFocus();

      userEvent.tab();
      expect(textField).not.toHaveFocus();

      await waitFor(() => {
        const helperText = container.querySelector('.MuiFormHelperText-root');
        expect(helperText).toHaveClass('Mui-error');
      });
    });
  });
});
