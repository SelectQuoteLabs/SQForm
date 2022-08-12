import React from 'react';
import userEvent from '@testing-library/user-event';
import enLocale from 'date-fns/locale/en-US';
import {composeStories} from '@storybook/testing-react';
import {render, screen, within, waitFor} from '@testing-library/react';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import * as stories from '../SQFormDatePickerWithDateFNS.stories';
import type {SQFormDatePickerDateFNSProps} from 'components/SQForm/SQFormDatePickerWithDateFNS';
import type {FormProps} from '../SQFormDatePicker.stories';
import type {AnyObjectSchema} from 'yup';

const {BasicDatePicker} = composeStories(stories);

const renderDatePicker = (
  props?: Partial<
    Omit<SQFormDatePickerDateFNSProps, 'label' | 'name'> & {
      sqFormProps?: FormProps | undefined;
      schema: AnyObjectSchema;
    }
  >
) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
      <BasicDatePicker {...props} />
    </LocalizationProvider>
  );
};

describe('SQFormDatePickerWithDateFNS Tests', () => {
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

    const datePickerButton = screen.getByRole('button', {name: /Choose date/i});

    userEvent.click(datePickerButton);
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    await screen.findByRole('dialog');

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
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    const calendarDialog = screen.getByRole('dialog');
    expect(calendarDialog).toBeInTheDocument();
    expect(calendarDialog).toBeVisible();

    const dateOptions = within(calendarDialog).getAllByRole('button');
    const selectedDate = dateOptions[3];

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

    const {container} = renderDatePicker({sqFormProps});
    await waitFor(() => {
      const helperText = container.querySelector('.MuiFormHelperText-root');
      expect(helperText).toBeVisible();
      expect(helperText).toHaveClass('Mui-required');
    });
  });
});
