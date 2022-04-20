import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormRadioButtonGroup.stories';
import type {SQFormRadioButtonGroupProps} from 'components/SQForm/SQFormRadioButtonGroup';

const {
  Default: SQFormRadioButtonGroup,
  WithValidation: SQFormRadioButtonGroupWithValidation,
} = composeStories(stories);

describe('SQFormRadioButtonGroup Tests', () => {
  describe('Without validation', () => {
    it('renders a label and group of radio buttons', () => {
      render(<SQFormRadioButtonGroup size="auto" />);

      const label = screen.getByText(/Pandas/i);
      expect(label).toBeInTheDocument();

      const radioGroup = screen.getByRole('radiogroup', {name: /pandas/i});
      expect(radioGroup).toBeInTheDocument();
    });

    describe('radio button group', () => {
      it('renders three radio buttons', () => {
        render(<SQFormRadioButtonGroup size="auto" />);

        const radioButtons = screen.getAllByRole('radio');
        expect(radioButtons).toHaveLength(3);
      });

      it('has radio buttons with proper labels', () => {
        render(<SQFormRadioButtonGroup size="auto" />);

        const radioButtons = screen.getAllByRole('radio');
        const giantPandaLabel = screen.getByLabelText(/Giant Panda/i);
        const redPandaLabel = screen.getByLabelText(/Red Panda/i);
        const kungFuPandaLabel = screen.getByLabelText(/Kung Fu Panda/i);

        expect(radioButtons).toEqual(
          expect.arrayContaining([
            giantPandaLabel,
            redPandaLabel,
            kungFuPandaLabel,
          ])
        );
      });
    });

    describe('Selection', () => {
      it('allows selecting button', () => {
        render(<SQFormRadioButtonGroup size="auto" />);
        const firstRadioButton = screen.getAllByRole('radio')[0];

        expect(firstRadioButton).not.toBeChecked();
        userEvent.click(firstRadioButton);
        expect(firstRadioButton).toBeChecked();
      });

      it('allows selection via label', () => {
        render(<SQFormRadioButtonGroup size="auto" />);

        const giantPandaRadioButton = screen.getByLabelText(/Giant Panda/i);
        const giantPandaLabel = screen.getByText(/Giant Panda/i);

        expect(giantPandaRadioButton).not.toBeChecked();
        userEvent.click(giantPandaLabel);
        expect(giantPandaRadioButton).toBeChecked();
      });

      it('allows only one value to be selected', () => {
        render(<SQFormRadioButtonGroup size="auto" />);

        const radioButtons = screen.getAllByRole('radio');
        const firstRadioButton = radioButtons[0];
        const secondRadioButton = radioButtons[1];

        expect(firstRadioButton).not.toBeChecked();
        expect(secondRadioButton).not.toBeChecked();

        userEvent.click(firstRadioButton);
        expect(firstRadioButton).toBeChecked();
        expect(secondRadioButton).not.toBeChecked();

        userEvent.click(secondRadioButton);
        expect(firstRadioButton).not.toBeChecked();
        expect(secondRadioButton).toBeChecked();
      });
    });

    describe('onChange handler', () => {
      let onChangeMock: SQFormRadioButtonGroupProps['onChange'];

      beforeEach(() => {
        onChangeMock = jest.fn();
      });

      it('calls onChange handler on a change', () => {
        render(<SQFormRadioButtonGroup size="auto" onChange={onChangeMock} />);

        const firstRadioButton = screen.getAllByRole('radio')[0];
        userEvent.click(firstRadioButton);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
      });
    });

    it('Has default value with an initialValue', () => {
      const initialValues = {
        pandas: 'red panda',
      };
      render(
        <SQFormRadioButtonGroup size="auto" sqFormProps={{initialValues}} />
      );

      const radioButtons = screen.getAllByRole('radio');

      const firstRadioButton = radioButtons[0];
      const secondRadioButton = radioButtons[1];
      const thirdRadioButton = radioButtons[2];

      expect(firstRadioButton).not.toBeChecked();
      expect(secondRadioButton).toBeChecked();
      expect(thirdRadioButton).not.toBeChecked();
    });
  });

  describe('With validation', () => {
    describe('Not touched', () => {
      it('has submit button disabled', async () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);

        expect(
          await screen.findByRole('button', {name: /submit/i})
        ).toBeDisabled();
      });

      it('displays required helper text', async () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);

        await waitFor(() => {
          const requiredText = screen.getByText('Required');
          expect(requiredText).toBeInTheDocument();
          expect(requiredText).toHaveClass('Mui-required');
        });
      });
    });

    describe('touched and no value selected', () => {
      it('has error styles on label and helper text', async () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);

        // Tab into radio group
        userEvent.tab();

        // Tab out of radio group
        userEvent.tab();
        await waitFor(() => {
          const label = screen.getByText(/Pandas/i);
          const requiredText = screen.getByText(/Required/i);
          expect(label).toHaveClass('Mui-error');
          expect(requiredText).toHaveClass('Mui-error');
        });
      });
    });

    describe('with selected value', () => {
      it('has enabled submit button', async () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);
        const firstRadioButton = screen.getAllByRole('radio')[0];
        userEvent.click(firstRadioButton);

        expect(
          await screen.findByRole('button', {name: /submit/i})
        ).toBeEnabled();
      });
    });
  });
});
