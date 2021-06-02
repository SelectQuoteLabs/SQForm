import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormRadioButtonGroup.stories';

const {
  Default: SQFormRadioButtonGroup,
  WithValidation: SQFormRadioButtonGroupWithValidation
} = composeStories(stories);

describe('SQFormRadioButtonGroup Tests', () => {
  describe('Without validation', () => {
    it('renders a label and group of radio buttons', () => {
      render(<SQFormRadioButtonGroup size="auto" />);

      const label = screen.getByText(/Pandas/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Pandas');

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

        const giantPandaButton = radioButtons[0];
        const giantPandaLabel = screen.getByText(/Giant Panda/i);

        const redPandaButton = radioButtons[1];
        const redPandaLabel = screen.getByText(/Red Panda/i);

        const kungFuPandaButton = radioButtons[2];
        const kungFuPandaLabel = screen.getByText(/Kung Fu Panda/i);

        expect(giantPandaButton).toBeInTheDocument();
        expect(giantPandaLabel).toBeInTheDocument();
        expect(giantPandaLabel).toHaveTextContent('Giant Panda');

        expect(redPandaButton).toBeInTheDocument();
        expect(redPandaLabel).toBeInTheDocument();
        expect(redPandaLabel).toHaveTextContent('Red Panda');

        expect(kungFuPandaButton).toBeInTheDocument();
        expect(kungFuPandaLabel).toBeInTheDocument();
        expect(kungFuPandaLabel).toHaveTextContent('Kung Fu Panda');
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

        const giantPandaRadioButton = screen.getAllByRole('radio')[0];
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
      let onChangeMock;

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
  });

  it('Has default value with an initialValue', () => {
    const initialValues = {
      pandas: 'red panda'
    };
    render(
      <SQFormRadioButtonGroup size="auto" SQFormProps={{initialValues}} />
    );

    const radioButtons = screen.getAllByRole('radio');

    const firstRadioButton = radioButtons[0];
    const secondRadioButton = radioButtons[1];
    const thirdRadioButton = radioButtons[2];

    expect(firstRadioButton).not.toBeChecked();
    expect(secondRadioButton).toBeChecked();
    expect(thirdRadioButton).not.toBeChecked();
  });

  describe('With validation', () => {
    describe('Not touched', () => {
      it('has submit button disabled', () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);

        const submitButton = screen.getByRole('button', {
          name: /form submission/i
        });

        expect(submitButton).toBeDisabled();
      });

      it('displays required helper text', () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);

        const requiredText = screen.getByText('Required');
        expect(requiredText).toBeInTheDocument();
        expect(requiredText).toHaveClass('Mui-required');
      });
    });

    describe('with selected value', () => {
      it('has enabled submit button', async () => {
        render(<SQFormRadioButtonGroupWithValidation size="auto" />);
        const firstRadioButton = screen.getAllByRole('radio')[0];
        userEvent.click(firstRadioButton);

        const submitButton = screen.getByRole('button', {
          name: /form submission/i
        });

        await waitFor(() => expect(submitButton).toBeEnabled());
      });
    });
  });
});
