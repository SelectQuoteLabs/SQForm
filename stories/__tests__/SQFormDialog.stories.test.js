import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';

import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormDialog.stories';

const {Default, WithValidation, WithAutoFocus} = composeStories(stories);

window.alert = jest.fn();
const handleClose = jest.fn();
const handleSave = jest.fn();

afterEach(() => {
  window.alert.mockClear();
  handleClose.mockClear();
  handleSave.mockClear();
});

const mockData = {
  hello: 'howdy'
};

describe('Tests for Default', () => {
  it('renders Default with correct Title, form updates, and calls onSave on submit', async () => {
    render(<Default isOpen={true} onSave={handleSave} onClose={handleClose} />);

    const dialogTitleValue = 'Default';
    const dialogTitle = screen.getByText(dialogTitleValue);
    expect(dialogTitle.textContent).toEqual(dialogTitleValue);

    const textField = screen.getByLabelText(/hello/i);
    userEvent.type(textField, mockData.hello);

    const saveButton = screen.getByRole('button', {name: /save/i});
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });

  it('renders Default and calls onClose on cancel', async () => {
    render(<Default isOpen={true} onSave={handleSave} onClose={handleClose} />);

    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Tests for WithValidation', () => {
  it('renders WithValidation with correct Title, save is disabled before completing the textfield, enabled after, and calls onSave on submit', async () => {
    render(
      <WithValidation isOpen={true} onSave={handleSave} onClose={handleClose} />
    );

    const dialogTitleValue = 'With Validation';
    const dialogTitle = screen.getByText(dialogTitleValue);
    expect(dialogTitle.textContent).toEqual(dialogTitleValue);

    const saveButton = screen.getByRole('button', {name: /save/i});
    expect(saveButton).toBeDisabled();

    const textField = screen.getByLabelText(/hello/i);
    userEvent.type(textField, mockData.hello);

    await waitFor(() => expect(saveButton).toBeEnabled());

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Tests for WithAutoFocus', () => {
  it('renders WithAutoFocus with correct Title, textfield is focused element', async () => {
    render(
      <WithAutoFocus isOpen={true} onSave={handleSave} onClose={handleClose} />
    );

    const dialogTitleValue = 'With Auto Focus';
    const dialogTitle = screen.getByText(dialogTitleValue);
    expect(dialogTitle.textContent).toEqual(dialogTitleValue);

    const textfield = screen.getByLabelText(/hello/i);
    expect(textfield).toBe(document.activeElement);
  });
});
