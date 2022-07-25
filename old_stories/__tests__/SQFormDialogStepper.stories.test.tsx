import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';

import * as stories from '../SQFormDialogStepper.stories';

const {
  Default: SQFormDialogStepper,
  WithValidation: SQFormDialogStepperWithValidation,
} = composeStories(stories);

const mockAlert = jest.fn();

window.alert = mockAlert;

afterEach(() => {
  mockAlert.mockClear();
});

describe('SQFormDialogStepper Tests', () => {
  it('should default to closed', () => {
    render(<SQFormDialogStepper />);

    const toggleText = screen.getByText(/toggle the dialog/i);
    expect(toggleText).toBeVisible();
  });

  it('should open', async () => {
    render(<SQFormDialogStepper isOpen={true} />);

    const dialogTitle = await screen.findByText('Default');
    expect(dialogTitle).toBeVisible();
  });

  it('should display a title, steps, and 2 buttons', async () => {
    render(<SQFormDialogStepper isOpen={true} />);

    const dialogTitle = await screen.findByText('Default');
    expect(dialogTitle).toBeVisible();

    const step1 = screen.getByRole('button', {name: /personal data/i});
    expect(step1).toBeVisible();

    const step2 = screen.getByRole('button', {name: /account info/i});
    expect(step2).toBeVisible();

    const cancelButton = screen.getByRole('button', {name: 'Cancel'});
    expect(cancelButton).toBeVisible();

    const nextButton = screen.getByRole('button', {name: 'Next'});
    expect(nextButton).toBeVisible();
  });

  it('should display next step when next button clicked', async () => {
    render(<SQFormDialogStepper isOpen={true} />);
    await screen.findByText('Default');

    const firstName = screen.getByRole('textbox', {name: /first name/i});
    expect(firstName).toBeVisible();

    const nextButton = screen.getByRole('button', {name: 'Next'});
    userEvent.click(nextButton);

    await screen.findByText(/account id/i);

    expect(firstName).not.toBeVisible();

    const accountID = screen.getByLabelText(/account id/i);
    expect(accountID).toBeVisible();
  });

  it('should go back to previous step', async () => {
    render(<SQFormDialogStepper isOpen={true} />);
    await screen.findByText('Default');

    expect(screen.getByLabelText(/first name/i)).toBeVisible();

    const nextButton = screen.getByRole('button', {name: 'Next'});
    userEvent.click(nextButton);

    await screen.findByLabelText(/account id/i);
    expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument();

    const personalData = screen.getByRole('button', {name: /personal data/i});
    userEvent.click(personalData);

    await screen.findByLabelText(/first name/i);

    expect(screen.getByLabelText(/first name/i)).toBeVisible();
  });

  it('should submit all step values', async () => {
    render(<SQFormDialogStepper isOpen={true} />);
    await screen.findByText('Default');

    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'First');

    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, 'Last');

    const nextButton = screen.getByRole('button', {name: 'Next'});
    userEvent.click(nextButton);
    await screen.findByLabelText(/account id/i);

    const newPatient = screen.getByRole('button', {name: '- -'});
    userEvent.click(newPatient);
    const yesOption = screen.getByText('Yes');
    userEvent.click(yesOption);

    const accountID = screen.getByLabelText(/account id/i);
    userEvent.type(accountID, '12');

    const submitButton = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            firstName: 'First',
            lastName: 'Last',
            newPatient: 'yes',
            accountID: 12,
          },
          null,
          2
        )
      )
    );
  });

  describe('Validation Tests', () => {
    it('should disable next button until all required fields are valid', async () => {
      render(<SQFormDialogStepperWithValidation isOpen={true} />);
      await screen.findByText('With Validation');

      const nextButton = screen.getByRole('button', {name: 'Next'});
      expect(nextButton).toBeDisabled();

      const firstName = screen.getByLabelText(/first name/i);
      userEvent.type(firstName, 'First');

      const lastName = screen.getByLabelText(/last name/i);
      userEvent.type(lastName, 'Last');

      expect(nextButton).toBeEnabled();
    });
  });
});
