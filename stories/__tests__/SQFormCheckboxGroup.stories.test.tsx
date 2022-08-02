import React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';
import * as stories from '../SQFormCheckboxGroup.stories';

const {
  Default: SQFormCheckboxGroup,
  WithValidation: SQFormCheckboxGroupWithValidation,
} = composeStories(stories);

const SHOPPING_LIST_OPTIONS = [
  {label: 'Voltfruit', value: 'voltfruit'},
  {label: 'Sunshroom', value: 'sunshroom'},
  {label: 'Bokoblin Guts', value: 'bokoblin guts'},
  {label: 'Lynel Hoof', value: 'lynel hoof'},
  {label: 'Stealthfin Trout', value: 'stealthfin trout'},
];

describe('SQFormCheckboxGroup Tests', () => {
  describe('Checkboxes Only', () => {
    it('should render a group and a list of checkboxes', () => {
      render(<SQFormCheckboxGroup size="auto" />);

      const group = screen.getByRole('group', {name: /shopping list/i});
      expect(group).toBeInTheDocument();

      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes).toHaveLength(SHOPPING_LIST_OPTIONS.length);
    });

    it('should display as checked when initial values are set', () => {
      const initialValues = {
        shoppingList: [SHOPPING_LIST_OPTIONS[0].value],
      };

      render(<SQFormCheckboxGroup initialValues={initialValues} size="auto" />);

      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

      const targetCheckbox = screen.getByLabelText(
        SHOPPING_LIST_OPTIONS[0].label
      );

      const filteredCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.checked
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

    it('should render an extra checkbox when adding select all capability', () => {
      render(<SQFormCheckboxGroup size="auto" shouldUseSelectAll />);

      const selectAllCheckbox = screen.getByLabelText('All');
      expect(selectAllCheckbox).toBeInTheDocument();
      expect(selectAllCheckbox).not.toBeChecked();
    });

    it('should check all checkboxes when select all checkbox checked', () => {
      render(<SQFormCheckboxGroup size="auto" shouldUseSelectAll />);

      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

      const filteredCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.checked
      );
      expect(filteredCheckboxes).toEqual([]);
      expect(filteredCheckboxes).toHaveLength(0);

      const selectAllCheckbox = screen.getByLabelText('All');

      userEvent.click(selectAllCheckbox);

      const checkedCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.checked
      );
      expect(checkedCheckboxes).toEqual(
        expect.arrayContaining([selectAllCheckbox])
      );
      expect(checkedCheckboxes).toHaveLength(SHOPPING_LIST_OPTIONS.length + 1);
    });

    it('should check all checkboxes even if some are already checked', () => {
      const initialValues = {
        shoppingList: [
          SHOPPING_LIST_OPTIONS[1].value,
          SHOPPING_LIST_OPTIONS[4].value,
        ],
      };
      render(
        <SQFormCheckboxGroup
          size="auto"
          initialValues={initialValues}
          shouldUseSelectAll
        />
      );

      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      const targetBox1 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[1].label);
      const targetBox2 = screen.getByLabelText(SHOPPING_LIST_OPTIONS[4].label);
      const checkedCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.checked
      );

      expect(checkedCheckboxes).toEqual(
        expect.arrayContaining([targetBox1, targetBox2])
      );
      expect(checkedCheckboxes).toHaveLength(2);

      const selectAllCheckbox = screen.getByLabelText('All');
      userEvent.click(selectAllCheckbox);

      const updatedCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.checked
      );
      expect(updatedCheckboxes).toEqual(
        expect.arrayContaining([selectAllCheckbox])
      );
      expect(updatedCheckboxes).toHaveLength(SHOPPING_LIST_OPTIONS.length + 1);
    });

    it('should uncheck all checkboxes when select all checkbox is unchecked', () => {
      const initialValues = {
        shoppingList: [
          SHOPPING_LIST_OPTIONS[0].value,
          SHOPPING_LIST_OPTIONS[1].value,
          SHOPPING_LIST_OPTIONS[2].value,
          SHOPPING_LIST_OPTIONS[3].value,
          SHOPPING_LIST_OPTIONS[4].value,
        ],
        shoppingListSelectAll: true,
      };
      render(
        <SQFormCheckboxGroup
          size="auto"
          initialValues={initialValues}
          shouldUseSelectAll
        />
      );

      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

      const selectAllCheckbox = screen.getByLabelText('All');
      const checkedCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.checked
      );
      expect(checkedCheckboxes).toEqual(
        expect.arrayContaining([selectAllCheckbox])
      );
      expect(checkedCheckboxes).toHaveLength(SHOPPING_LIST_OPTIONS.length + 1);

      userEvent.click(selectAllCheckbox);

      const uncheckedCheckboxes = checkboxes.filter(
        (checkbox) => !checkbox.checked
      );
      expect(uncheckedCheckboxes).toEqual(
        expect.arrayContaining([selectAllCheckbox])
      );
      expect(uncheckedCheckboxes).toHaveLength(
        SHOPPING_LIST_OPTIONS.length + 1
      );
    });
  });

  describe('Checkboxes with Validation', () => {
    it('should have submit button disabled when no checkboxes checked', async () => {
      render(<SQFormCheckboxGroupWithValidation size="auto" />);

      expect(
        await screen.findByRole('button', {name: /submit/i})
      ).toBeDisabled();
    });

    it('should enable submit button when a checkbox is checked', async () => {
      render(<SQFormCheckboxGroupWithValidation size="auto" />);

      const checkbox = screen.getByLabelText(SHOPPING_LIST_OPTIONS[3].label);

      userEvent.click(checkbox);

      const submitButton = screen.getByRole('button', {
        name: /submit/i,
      });

      await waitFor(() => expect(submitButton).toBeEnabled());
    });

    it('should render "required" text when when its field is required', async () => {
      render(<SQFormCheckboxGroupWithValidation size="auto" />);

      await waitFor(() => {
        const requiredText = screen.getByText(/required/i);
        expect(requiredText).toBeInTheDocument();
        expect(requiredText.closest('p')).toHaveClass('Mui-required');
      });
    });

    it('should not render "required" text as required when when its field is not required', () => {
      render(<SQFormCheckboxGroup size="auto" />);

      const required = screen.queryByText(/required/i);
      expect(required).not.toBeInTheDocument();
    });
  });
});
