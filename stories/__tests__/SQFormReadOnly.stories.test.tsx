import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormReadOnly.stories';

const {Default: SQFormReadOnly} = composeStories(stories);

describe('SQFormReadOnly Tests', () => {
  describe('Default ReadOnly Form', () => {
    it('should render labels and read-only text fields', () => {
      render(<SQFormReadOnly />);

      const label = screen.getByText(/first name/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('First Name');

      const textField = screen.getByRole('textbox', {name: /first name/i});
      expect(textField).toBeInTheDocument();
    });

    it('should render with default "- -" initial values', () => {
      render(<SQFormReadOnly />);

      const textField = screen.getByRole('textbox', {name: /preferred name/i});
      expect(textField).toHaveValue('- -');
    });

    it('should NOT update when text is entered', () => {
      render(<SQFormReadOnly size="auto" />);

      const textField = screen.getByRole('textbox', {name: /preferred name/i});
      expect(textField).toHaveValue('- -');
      userEvent.type(textField, 'test');
      expect(textField).toHaveValue('- -');
    });
  });

  describe('ReadOnly field with non-empty initial Value', () => {
    it('should render with the custom initialValue provided', () => {
      render(<SQFormReadOnly />);

      const textField = screen.getByRole('textbox', {name: /first name/i});
      expect(textField).toHaveValue('Jane');
    });
  });
});
