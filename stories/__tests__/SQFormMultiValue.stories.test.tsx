import * as stories from '../SQFormMultiValue.stories';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const {
  Default: SQFormMultiValue,
  WithValidation: SQFormMultiValueWithValidation,
} = composeStories(stories);

describe('SQFormMultiValue Tests', () => {
  it('renders a label, an input, and options', () => {
    render(<SQFormMultiValue />);

    const colorsLabel = screen.getByLabelText(/favorite colors/i);
    expect(colorsLabel).toBeVisible();

    const colorSelect = screen.getByRole('textbox', {name: /favorite colors/i});
    expect(colorSelect).toBeVisible();

    const red = screen.getByText('Red');
    expect(red).toBeVisible();
  });

  it('adds a new option by clicking', () => {
    render(<SQFormMultiValue />);

    expect(screen.queryByText('Orange')).not.toBeInTheDocument();

    const colorsSelect = screen.getByRole('textbox', {
      name: /favorite colors/i,
    });
    userEvent.click(colorsSelect);

    const orangeOption = screen.getByRole('option', {name: /orange/i});
    expect(orangeOption).toBeVisible();
    userEvent.click(orangeOption);

    const orangeSelected = screen.getByText('Orange');
    expect(orangeSelected).toBeVisible();
  });

  it('adds a new option by typing', () => {
    render(<SQFormMultiValue />);

    expect(screen.queryByText('Test')).not.toBeInTheDocument();

    const colorsSelect = screen.getByRole('textbox', {
      name: /favorite colors/i,
    });
    userEvent.type(colorsSelect, 'Test{enter}'); //type then press enter

    const testText = screen.getByText('Test');
    expect(testText).toBeVisible();
  });

  it('removes an option by clicking on the option', () => {
    render(<SQFormMultiValue />);

    const red = screen.getByText('Red');
    expect(red).toBeVisible();

    const redButton = screen.getByRole('button', {name: /red/i});
    // Even though the entire <div> has role='button' only the actual
    // <svg> is clickable for the delete
    const deleteIcon = redButton.querySelector('.MuiChip-deleteIcon');
    expect(deleteIcon).toBeInTheDocument();

    // This is necessary as deleteIcon is possibly null and
    // `userEvent.click` does not accept null.
    // Test would fail if `deleteIcon` is null anyway
    deleteIcon && userEvent.click(deleteIcon);

    expect(screen.queryByText('Red')).not.toBeInTheDocument();
  });

  it('does not allow changes when disabled', () => {
    render(<SQFormMultiValue isDisabled={true} />);

    const colorsSelect = screen.getByRole('textbox', {
      name: /favorite colors/i,
    });
    userEvent.click(colorsSelect);

    const options = screen.queryByRole('option');
    expect(options).not.toBeInTheDocument();
  });

  it('does not display "required" text when field is not required', () => {
    const sqFormProps = {
      initialValues: {
        favoriteColors: [],
      },
    };
    render(<SQFormMultiValue sqFormProps={sqFormProps} />);

    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  it('should initially render "required" helper text if field is required', async () => {
    const sqFormProps = {
      initialValues: {
        favoriteColors: [],
      },
    };
    render(<SQFormMultiValueWithValidation sqFormProps={sqFormProps} />);

    await waitFor(() => expect(screen.getByText('Required')).toBeVisible());
  });
});
