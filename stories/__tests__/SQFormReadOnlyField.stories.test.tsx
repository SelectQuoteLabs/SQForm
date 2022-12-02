import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen} from '@testing-library/react';
import * as stories from '../SQFormReadOnlyField.stories';

const {
  Default: SQFormReadOnlyField,
  WithInitialValue: SQFormReadOnlyFieldWithInitialValue,
} = composeStories(stories);

describe('SQFormReadOnlyField Tests', () => {
  describe('Default ReadOnly Field', () => {
    it('should render a label and read-only text field', () => {
      render(<SQFormReadOnlyField size="auto" />);

      const label = screen.getByText(/readonly field/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('ReadOnly Field');

      const textField = screen.getByRole('textbox', {name: /readonly field/i});
      expect(textField).toBeInTheDocument();
    });

    it('should render with default "- -" initialValue', () => {
      render(<SQFormReadOnlyField size="auto" />);

      const textField = screen.getByRole('textbox', {name: /readonly field/i});
      expect(textField).toHaveValue('- -');
    });

    it('should NOT update when text is entered', () => {
      render(<SQFormReadOnlyField size="auto" />);

      const textField = screen.getByRole('textbox', {name: /readonly field/i});
      expect(textField).toHaveValue('- -');
      userEvent.type(textField, 'test');
      expect(textField).toHaveValue('- -');
    });
  });

  describe('ReadOnly Field With Custom Initial Value', () => {
    it('should render with the custom initialValue provided', () => {
      const initialValue = 'Hello world!';
      render(
        <SQFormReadOnlyFieldWithInitialValue
          size="auto"
          initialValue={initialValue}
        />
      );

      const textField = screen.getByRole('textbox', {name: /readonly field/i});
      expect(textField).toHaveValue('Hello world!');
    });
  });
});
