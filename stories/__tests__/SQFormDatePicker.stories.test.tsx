import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen, within, waitFor} from '@testing-library/react';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import * as stories from '../SQFormDatePicker.stories';
import type {SQFormDatePickerProps} from 'components/fields/SQFormDatePicker/SQFormDatePicker';
import type {FormProps} from '../SQFormDatePicker.stories';
import type {AnyObjectSchema} from 'yup';

const {BasicDatePicker} = composeStories(stories);

const renderDatePicker = (
  props?: Partial<
    Omit<SQFormDatePickerProps, 'label' | 'name'> & {
      sqFormProps?: FormProps | undefined;
      schema: AnyObjectSchema;
    }
  >
) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterMoment} locale={'en'}>
      <BasicDatePicker {...props} />
    </LocalizationProvider>
  );
};

describe('SQFormDatePicker Tests', () => {
  it('should render a label and input', () => {
    renderDatePicker();

    const label = screen.getByText('Date');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Date');

    const textField = screen.getByRole('textbox', {name: /date/i});
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveValue('09/22/2020');
  });

  it('should render default with empty initial value', () => {
    const initialValues = {
      date: '',
    };

    renderDatePicker({sqFormProps: {initialValues}});

    const textField = screen.getByRole('textbox', {name: /date/i});
    expect(textField).toHaveValue('');
  });

  it('should render value with non-empty initial value', () => {
    const initialValues = {
      date: '09/15/2022',
    };

    renderDatePicker({sqFormProps: {initialValues}});

    const textField = screen.getByRole('textbox', {name: /date/i});
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveValue('09/15/2022');
  });

  it('should open calendar view when calendar button is clicked', async () => {
    const initialValues = {
      date: '',
    };

    renderDatePicker({sqFormProps: {initialValues}});

    const datePickerButton = screen.getByRole('button', {name: /choose date/i});

    userEvent.click(datePickerButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const calendarDialog = screen.getByRole('dialog');
    expect(calendarDialog).toBeInTheDocument();
    expect(calendarDialog).toBeVisible();
  });

  it('should display new date after selecting from the calendar', async () => {
    const initialValues = {
      date: '',
    };

    renderDatePicker({sqFormProps: {initialValues}});

    const textField = screen.getByRole('textbox', {name: /Date/i});
    const datePickerButton = screen.getByRole('button', {name: /Choose date/i});
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    userEvent.click(datePickerButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    const calendarDialog = screen.getByRole('dialog');
    expect(calendarDialog).toBeInTheDocument();
    expect(calendarDialog).toBeVisible();

    const dateOptions = within(calendarDialog).getAllByRole('gridcell');

    // Filter out gridcells that aren't buttons, indicating not a date
    const filteredDateOptions = dateOptions.filter((date) => {
      return date.attributes.getNamedItem('type')?.value === 'button';
    });

    // First date will be the first of the month
    const selectedDate = filteredDateOptions[0];

    userEvent.click(selectedDate);

    //Data setup so the test won't need updating all the time
    const getTestDay = () => {
      const today = new Date();
      const month = today.getMonth() + 1; // .getMonth() returns a zero based month (0 = January)
      // The month should have a leading zero if only one digit
      const monthString = month >= 10 ? month.toString() : `0${month}`;

      return `${monthString}/01/${today.getFullYear()}`;
    };

    const testDate = getTestDay();
    await waitFor(() => expect(textField).toHaveValue(testDate));
  });

  it('should show as disabled when isDisabled is true', () => {
    const sqFormProps = {
      initialValues: {
        date: '',
      },
    };

    renderDatePicker({sqFormProps, isDisabled: true});

    const textField = screen.getByRole('textbox', {name: /date/i});
    expect(textField).toBeDisabled();
  });

  it('should initially display required text when it is a required field', async () => {
    const sqFormProps = {
      initialValues: {
        date: '',
      },
    };

    renderDatePicker({sqFormProps});
    const helperText = screen.getByText(/required/i)?.parentElement;

    await waitFor(() => {
      expect(helperText).toBeVisible();
    });

    await waitFor(() => {
      expect(helperText).toHaveClass('Mui-required');
    });
  });
});
