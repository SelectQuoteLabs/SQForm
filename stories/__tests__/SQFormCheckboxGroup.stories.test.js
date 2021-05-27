import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormCheckboxGroup.stories';

const {
  Default: SQFormCheckboxGroup,
  WithValidation: SQFormCheckboxGroupWithValidation
} = composeStories(stories);

const SHOPPING_LIST_OPTIONS = [
  {label: 'Voltfruit', value: 'voltfruit'},
  {label: 'Sunshroom', value: 'sunshroom'},
  {label: 'Bokoblin Guts', value: 'bokoblin guts'},
  {label: 'Lynel Hoof', value: 'lynel hoof'},
  {label: 'Stealthfin Trout', value: 'stealthfin trout'}
];

describe('SQFormCheckboxGroup Tests', () => {
  describe('Checkboxes Only', () => {
    it('should render a group and a list of checkboxes', () => {
      render(<SQFormCheckboxGroup size="auto" />);

      const group = screen.getByRole('group', {name: /shopping list/i});
      expect(group).toBeInTheDocument();

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(SHOPPING_LIST_OPTIONS.length);
    });

    it('should display as checked when initial values are set', () => {
      const initialValues = {
        shoppingList: [SHOPPING_LIST_OPTIONS[0].value]
      };

      render(<SQFormCheckboxGroup SQFormProps={{initialValues}} size="auto" />);

      const checkboxes = screen.getAllByRole('checkbox');

      const targetCheckbox = screen.getByLabelText(
        SHOPPING_LIST_OPTIONS[0].label
      );

      const filteredCheckboxes = checkboxes.filter(checkbox =>
        checkbox.hasAttribute('checked')
      );
      expect(filteredCheckboxes).toEqual(
        expect.arrayContaining([targetCheckbox])
      );
      expect(filteredCheckboxes).toHaveLength(1);
    });

    it('should show as checked when a checkbox is clicked', () => {
      render(<SQFormCheckboxGroup size="auto" />);

      const checkboxLabel = screen.getByLabelText(
        SHOPPING_LIST_OPTIONS[0].label
      );
      expect(checkboxLabel).not.toBeChecked();

      userEvent.click(checkboxLabel);
      expect(checkboxLabel).toBeChecked();
    });

    it('should uncheck when checkbox is checked and user clicks', () => {
      render(<SQFormCheckboxGroup size="auto" />);

      const checkboxLabel = screen.getByLabelText(
        SHOPPING_LIST_OPTIONS[1].label
      );
      expect(checkboxLabel).not.toBeChecked();

      userEvent.click(checkboxLabel);
      expect(checkboxLabel).toBeChecked();

      userEvent.click(checkboxLabel);
      expect(checkboxLabel).not.toBeChecked();
    });

    it('should render as required when isRequired is true', () => {
      render(<SQFormCheckboxGroup size="auto" isRequired />);

      const required = screen.getByText('Required');
      expect(required).toBeInTheDocument();
    });

    it('should render an extra checkbox when adding select all capability', () => {
      render(<SQFormCheckboxGroup size="auto" shouldUseSelectAll />);

      const selectAllCheckbox = screen.getByLabelText('All');
      expect(selectAllCheckbox).toBeInTheDocument();
      expect(selectAllCheckbox).not.toBeChecked();
    });

    it('should check all checkboxes when select all checkbox checked', () => {
      render(<SQFormCheckboxGroup size="auto" shouldUseSelectAll />);

      const selectAllCheckbox = screen.getByLabelText('All');
      const cb1 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[0].label);
      const cb2 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[1].label);
      const cb3 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[2].label);
      const cb4 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[3].label);
      const cb5 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[4].label);
      expect(selectAllCheckbox).not.toBeChecked();
      expect(cb1).not.toBeChecked();
      expect(cb2).not.toBeChecked();
      expect(cb3).not.toBeChecked();
      expect(cb4).not.toBeChecked();
      expect(cb5).not.toBeChecked();

      userEvent.click(selectAllCheckbox);

      expect(selectAllCheckbox).toBeChecked();
      expect(cb1).toBeChecked();
      expect(cb2).toBeChecked();
      expect(cb3).toBeChecked();
      expect(cb4).toBeChecked();
      expect(cb5).toBeChecked();
    });

    it('should uncheck all checkboxes when select all checkbox is unchecked', () => {
      render(<SQFormCheckboxGroup size="auto" shouldUseSelectAll />);

      const selectAllCheckbox = screen.getByLabelText('All');
      const cb1 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[0].label);
      const cb2 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[1].label);
      const cb3 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[2].label);
      const cb4 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[3].label);
      const cb5 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[4].label);

      userEvent.click(selectAllCheckbox);
      expect(selectAllCheckbox).toBeChecked();
      expect(cb1).toBeChecked();
      expect(cb2).toBeChecked();
      expect(cb3).toBeChecked();
      expect(cb4).toBeChecked();
      expect(cb5).toBeChecked();

      userEvent.click(selectAllCheckbox);

      expect(selectAllCheckbox).not.toBeChecked();
      expect(cb1).not.toBeChecked();
      expect(cb2).not.toBeChecked();
      expect(cb3).not.toBeChecked();
      expect(cb4).not.toBeChecked();
      expect(cb5).not.toBeChecked();
    });
  });

  describe('Checkboxes with Validation', () => {
    it('should have submit button disabled when no checkboxes checked', () => {
      render(<SQFormCheckboxGroupWithValidation size="auto" />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(submitButton).toBeDisabled();
    });

    it('should enable submit button when a checkbox is checked', async () => {
      render(<SQFormCheckboxGroupWithValidation size="auto" />);

      const checkbox = screen.getByLabelText(SHOPPING_LIST_OPTIONS[3].label);

      userEvent.click(checkbox);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      await waitFor(() => expect(submitButton).toBeEnabled());
    });

    it('should highlight required when unchecked', () => {
      render(<SQFormCheckboxGroupWithValidation size="auto" />);

      const checkbox = screen.getByLabelText(SHOPPING_LIST_OPTIONS[3].label);

      userEvent.click(checkbox);

      userEvent.click(checkbox);

      const required = screen.getByText('Required');
      expect(required).toHaveClass('Mui-required');

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });
      expect(submitButton).toBeDisabled();
    });
  });
});
