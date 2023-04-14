import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen} from '@testing-library/react';
import * as stories from '../SQFormMaskedReadOnlyField.stories';

const {Default: SQFormMaskedReadOnlyField} = composeStories(stories);

describe('SQFormMaskedReadOnlyField Tests', () => {
  describe('Default MaskedReadOnly Field', () => {
    it('should render a label and read-only text field', () => {
      render(<SQFormMaskedReadOnlyField size="auto" />);

      const label = screen.getByText(/masked read only field/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Masked Read Only Field');

      const textField = screen.getByRole('textbox', {
        name: /masked read only field/i,
      });
      expect(textField).toBeInTheDocument();
    });

    it('should render with default initialValue and default mask', () => {
      render(<SQFormMaskedReadOnlyField size="auto" />);

      const textField = screen.getByText('');
      expect(textField).toBeInTheDocument();
    });

    it('should render with custom initialValue and default mask', () => {
      const val = '8168675308';
      render(<SQFormMaskedReadOnlyField size="auto" initialValue={val} />);

      const textField = screen.getByText('8168675308');
      expect(textField).toBeInTheDocument();
    });

    it('should NOT update when text is entered', () => {
      render(<SQFormMaskedReadOnlyField size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /masked read only field/i,
      });
      expect(textField).toHaveValue('');
      userEvent.type(textField, 'test');
      expect(textField).toHaveValue('');
    });
  });
});
