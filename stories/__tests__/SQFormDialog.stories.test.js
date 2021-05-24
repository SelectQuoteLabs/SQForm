import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';

import userEvent, {specialChars} from '@testing-library/user-event';
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
  it('should render a form dialog with a title', async () => {
    const dialogTitleValue = 'Test';

    render(
      <Default
        isOpen={true}
        onSave={handleSave}
        onClose={handleClose}
        title={dialogTitleValue}
      />
    );

    const dialogTitle = screen.getByText(dialogTitleValue);
    expect(dialogTitle.textContent).toEqual(dialogTitleValue);
  });

  it('should handle form updates and submit said updates on save button click', async () => {
    render(<Default isOpen={true} onSave={handleSave} onClose={handleClose} />);

    const textField = screen.getByLabelText(/hello/i);
    userEvent.type(textField, mockData.hello);

    const saveButton = screen.getByRole('button', {name: /save/i});
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle form updates and submit values on `enter` keydown', async () => {
    render(<Default isOpen={true} onSave={handleSave} onClose={handleClose} />);

    const textField = screen.getByLabelText(/hello/i);
    userEvent.type(textField, mockData.hello);

    // https://testing-library.com/docs/ecosystem-user-event/#specialchars
    userEvent.type(textField, `${specialChars.enter}`);

    await waitFor(() => {
      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onClose on cancel button click', async () => {
    render(<Default isOpen={true} onSave={handleSave} onClose={handleClose} />);

    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onClose on `escape` keydown', async () => {
    render(<Default isOpen={true} onSave={handleSave} onClose={handleClose} />);

    // fireEvent, not userEvent
    // to confirm the 'key' and 'code' values-- > https://keycode.info/
    // https://testing-library.com/docs/dom-testing-library/api-events/ --> find 'keyboard events'
    fireEvent.keyDown(screen.getByRole('presentation'), {
      key: 'Escape',
      code: 'Escape'
    });

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Tests for WithValidation', () => {
  it('should disable submit/save until validationSchema satisfied', async () => {
    render(
      <WithValidation isOpen={true} onSave={handleSave} onClose={handleClose} />
    );

    const saveButton = screen.getByRole('button', {name: /save/i});
    expect(saveButton).toBeDisabled();

    const textField = screen.getByLabelText(/hello/i);
    userEvent.type(textField, mockData.hello);

    await waitFor(() => expect(saveButton).toBeEnabled());
  });
});

describe('Tests for WithAutoFocus', () => {
  it('should render a dialog and automatically focus the form input', async () => {
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
