import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormAutocomplete.stories';

const {
  Default: SQFormAutocomplete,
  WithValidation: SQFormAutocompleteWithValidation
} = composeStories(stories);

describe('SQFormAutocomplete Tests', () => {
  describe('Autocomplete Only', () => {
    it('should render a dropdown, title, and 2 buttons', () => {
      render(<SQFormAutocomplete size="auto" />);

      const label = screen.getByText(/autocomplete/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('id', 'autocomplete-label');

      const dropdown = screen.getByLabelText(/autocomplete/i);
      expect(dropdown).toBeInTheDocument();

      const openButton = screen.getByRole('button', {name: /open/i});
      expect(openButton).toBeInTheDocument();
    });

    it('should render with empty initial value', () => {
      render(<SQFormAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});

      expect(textField).toHaveTextContent('');
    });

    it('should render with non-empty initial value', () => {
      const SQFormProps = {
        initialValues: {
          autocomplete: 'first'
        }
      };

      render(<SQFormAutocomplete size="auto" SQFormProps={SQFormProps} />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      expect(textField).toHaveValue('First');
    });

    it('should render a list of options when the open button is clicked', () => {
      render(<SQFormAutocomplete size="auto" />);

      const openButton = screen.getByRole('button', {name: /open/i});

      userEvent.click(openButton);

      const optionsList = screen.getByRole('listbox');
      expect(optionsList).toBeInTheDocument();
      expect(within(optionsList).getAllByRole('option')).toHaveLength(5);
    });

    it('should render a list of options when the user starts typing', () => {
      render(<SQFormAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});

      userEvent.type(textField, 'F');

      const optionsList = screen.getByRole('listbox');
      expect(optionsList).toBeInTheDocument();
      expect(within(optionsList).getAllByRole('option')).toHaveLength(3);
    });

    it('should update when an option is selected after typing', () => {
      render(<SQFormAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      expect(textField).toHaveValue('');

      userEvent.type(textField, 'F');

      const optionToSelect = screen.getByText('Fourth');
      userEvent.click(optionToSelect);

      expect(textField).toHaveValue('Fourth');
    });

    it('should update when an option is selected after clicking the open button', () => {
      render(<SQFormAutocomplete size="auto" />);

      const openButton = screen.getByRole('button', {name: /open/i});
      userEvent.click(openButton);

      const optionToSelect = screen.getByText('Second');
      userEvent.click(optionToSelect);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      expect(textField).toHaveValue('Second');
    });

    it('should clear out value when clear button is clicked', () => {
      render(<SQFormAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      userEvent.type(textField, 'F');

      const optionToSelect = screen.getByText('Fifth');
      userEvent.click(optionToSelect);
      expect(textField).toHaveValue('Fifth');

      const clearButton = screen.getByRole('button', {name: /clear/i});
      expect(clearButton).toBeInTheDocument();

      userEvent.click(clearButton);

      expect(textField).toHaveValue('');
    });

    it('should render as disabled when isDisabled is true', () => {
      render(<SQFormAutocomplete size="auto" isDisabled={true} />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});

      expect(textField).toBeDisabled();
    });

    it('should render as required when isRequired is true', () => {
      render(<SQFormAutocomplete size="auto" isRequired={true} />);

      const requiredText = screen.getByText(/required/i);
      expect(requiredText).toBeVisible();
    });

    it('should not render as required when isRequired is false', () => {
      render(<SQFormAutocomplete size="auto" isRequired={false} />);

      const requiredText = screen.queryByText(/required/i);
      expect(requiredText).not.toBeInTheDocument();
    });

    it('should display empty value when displayEmpty is true', () => {
      render(<SQFormAutocomplete size="auto" displayEmpty={true} />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      expect(textField).toHaveValue('- -');

      const openButton = screen.getByRole('button', {name: /open/i});
      userEvent.click(openButton);

      const optionsList = screen.getByRole('listbox');
      const options = within(optionsList).getAllByRole('option');
      expect(options[0]).toHaveTextContent('- -');
    });

    it(`should display 'No options' when option not in the list is typed`, () => {
      render(<SQFormAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      userEvent.type(textField, '2');

      const optionToSelect = screen.getByText('No options');
      expect(optionToSelect).toBeInTheDocument();
    });
  });

  describe('Autocomplete With Validation', () => {
    it('should highlight field if required but no value selected', () => {
      render(<SQFormAutocompleteWithValidation size="auto" />);

      const textField = screen.getByRole('textbox', {name: /autocomplete/i});
      expect(textField).not.toHaveFocus();

      userEvent.tab();
      expect(textField).toHaveFocus();

      userEvent.tab();

      const requiredText = screen.getByText(/required/i);
      expect(requiredText).toBeVisible();
      expect(requiredText).toHaveClass('Mui-error');
    });
  });
});
