import * as stories from '../SQFormAsyncAutocomplete.stories';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const {
  Default: SQFormAsyncAutocomplete,
  WithValidation: SQFormAsyncAutocompleteWithValidation,
} = composeStories(stories);

describe('SQFormAsyncAutocomplete Tests', () => {
  describe('AsyncAutocomplete Only', () => {
    it('should render a dropdown, title, and button', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const label = screen.getByText(/async autocomplete/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('id', 'asyncAutocomplete-label');

      const dropdown = screen.getByLabelText(/async autocomplete/i);
      expect(dropdown).toBeInTheDocument();

      const openButton = screen.getByRole('button', {name: /open/i});
      expect(openButton).toBeInTheDocument();
    });

    it('should render with empty initial value', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });

      expect(textField).toHaveTextContent('');
    });

    it('should render with non-empty initial value', () => {
      const sqFormProps = {
        initialValues: {
          asyncAutocomplete: 'fifth',
        },
      };

      render(<SQFormAsyncAutocomplete size="auto" sqFormProps={sqFormProps} />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });
      expect(textField).toHaveValue('Fifth');
    });

    it('should render a list of options when the open button is clicked', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const openButton = screen.getByRole('button', {name: /open/i});

      userEvent.click(openButton);

      const optionsList = screen.getByRole('listbox');
      expect(optionsList).toBeInTheDocument();
      expect(within(optionsList).getAllByRole('option')).toHaveLength(5);
    });

    it('should render a list of options when the user starts typing', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });

      userEvent.type(textField, 'F');

      const optionsList = screen.getByRole('listbox');
      expect(optionsList).toBeInTheDocument();
      expect(within(optionsList).getAllByRole('option')).toHaveLength(3);
    });

    it('should update when an option is selected after typing', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });
      expect(textField).toHaveValue('');

      userEvent.type(textField, 'F');

      const optionToSelect = screen.getByText('Fourth');
      userEvent.click(optionToSelect);

      expect(textField).toHaveValue('Fourth');
    });

    it('should update when an option is selected after clicking the open button', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const openButton = screen.getByRole('button', {name: /open/i});
      userEvent.click(openButton);

      const optionToSelect = screen.getByText('Second');
      userEvent.click(optionToSelect);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });
      expect(textField).toHaveValue('Second');
    });

    it('should clear out value when clear button is clicked', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });
      userEvent.type(textField, 'F');

      const optionToSelect = screen.getByText('Fifth');
      userEvent.click(optionToSelect);
      expect(textField).toHaveValue('Fifth');
      expect(textField).toHaveFocus();

      const clearButton = screen.getByLabelText(/clear/i);
      expect(clearButton).toBeInTheDocument();

      userEvent.click(clearButton);

      expect(textField).toHaveValue('');
    });

    it('should render as disabled when isDisabled is true', () => {
      render(<SQFormAsyncAutocomplete size="auto" isDisabled={true} />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });

      expect(textField).toBeDisabled();
    });

    it(`should display 'No options' when option not in the list is typed`, () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });
      userEvent.type(textField, '2');

      const optionToSelect = screen.getByText('No options');
      expect(optionToSelect).toBeInTheDocument();
    });

    it('should render a loading image when loading is true', () => {
      render(<SQFormAsyncAutocomplete size="auto" loading={true} />);

      const loadingImage = screen.getByRole('progressbar');
      expect(loadingImage).toBeInTheDocument();
    });

    it('should not render a loading image when loading is false', () => {
      render(<SQFormAsyncAutocomplete size="auto" loading={false} />);

      const loadingImage = screen.queryByRole('progressbar');
      expect(loadingImage).not.toBeInTheDocument();
    });
  });

  describe('Autocomplete With Validation', () => {
    it('should render as required when it is a required field', async () => {
      render(<SQFormAsyncAutocompleteWithValidation size="auto" />);

      await waitFor(() => {
        const requiredText = screen.getByText(/required/i);
        expect(requiredText).toBeVisible();
        expect(requiredText).toHaveClass('Mui-required');
      });
    });

    it('should not render as required when it is not a required field', () => {
      render(<SQFormAsyncAutocomplete size="auto" />);

      const requiredText = screen.queryByText(/required/i);
      expect(requiredText).not.toBeInTheDocument();
    });

    it('should highlight field if required but no value selected', async () => {
      render(<SQFormAsyncAutocompleteWithValidation size="auto" />);

      const textField = screen.getByRole('textbox', {
        name: /async autocomplete/i,
      });
      expect(textField).not.toHaveFocus();

      userEvent.tab();
      expect(textField).toHaveFocus();

      userEvent.tab();

      await waitFor(() => {
        const requiredText = screen.getByText(/required/i);
        expect(requiredText).toBeVisible();
        expect(requiredText).toHaveClass('Mui-error');
      });
    });
  });
});
