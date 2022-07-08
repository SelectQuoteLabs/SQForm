import * as Yup from 'yup';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';

import * as stories from '../SQFormInclusionList.stories';

const {Default: SQFormInclusionList, WithValidation} = composeStories(stories);

describe('SQFormInclusionList Tests', () => {
  it('renders a list of checkboxes and labels', () => {
    render(<SQFormInclusionList />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(9);

    const labels = screen.getAllByLabelText(/J.*/);
    expect(labels).toHaveLength(9);
  });

  it('displays as checked when initial values are set', () => {
    render(<SQFormInclusionList />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

    const filteredCheckboxes = checkboxes.filter(
      (checkbox) => checkbox.checked
    );

    expect(filteredCheckboxes).toHaveLength(4);
  });

  it('does not have any checked boxes when initial value is empty', () => {
    const sqFormProps = {
      initialValues: {
        friends: [],
      },
    };

    render(<SQFormInclusionList sqFormProps={sqFormProps} />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

    const filteredCheckboxes = checkboxes.filter(
      (checkbox) => checkbox.checked
    );

    expect(filteredCheckboxes).toHaveLength(0);
  });

  it('displays a select all option at the top of the list', () => {
    render(<SQFormInclusionList useSelectAll={true} />);

    const selectAllOption = screen.getByLabelText('ALL THE PEEPS');
    expect(selectAllOption).toBeInTheDocument();
  });

  it('does not display select all option when useSelectAll is false', () => {
    render(<SQFormInclusionList useSelectAll={false} />);

    const selectAllOption = screen.queryByLabelText('ALL THE PEEPS');
    expect(selectAllOption).not.toBeInTheDocument();
  });

  it('checks all boxes when select all option is checked', () => {
    render(<SQFormInclusionList useSelectAll={true} />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const filteredCheckboxes = checkboxes.filter(
      (checkbox) => checkbox.checked
    );
    expect(filteredCheckboxes).toHaveLength(4);

    const selectAllOption = screen.getByLabelText('ALL THE PEEPS');
    userEvent.click(selectAllOption);

    const afterClickFilter = checkboxes.filter((checkbox) => checkbox.checked);
    expect(afterClickFilter).toHaveLength(10);
  });

  it('unchecks all boxes when select all is unchecked', () => {
    render(<SQFormInclusionList useSelectAll={true} />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const selectAllOption = screen.getByLabelText('ALL THE PEEPS');
    userEvent.click(selectAllOption);

    const allCheckboxesChecked = checkboxes.filter(
      (checkbox) => checkbox.checked
    );
    expect(allCheckboxesChecked).toHaveLength(10);

    userEvent.click(selectAllOption);

    const noCheckboxesChecked = checkboxes.filter(
      (checkbox) => checkbox.checked
    );
    expect(noCheckboxesChecked).toHaveLength(0);
  });

  it('displays required when field is required', async () => {
    const sqFormProps = {
      initialValues: {
        friends: [],
      },
      validationSchema: Yup.object({
        friends: Yup.array().required().min(1),
      }),
    };

    render(<SQFormInclusionList sqFormProps={sqFormProps} />);

    const submitButton = screen.getByRole('button', {name: /submit/i});
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    //TODO: Add in check for 'required' text when that issue is resolved
  });

  it('displays as not required when field is filled out', async () => {
    const sqFormProps = {
      initialValues: {
        friends: [],
      },
      validationSchema: Yup.object({
        friends: Yup.array().required().min(1),
      }),
    };

    render(<SQFormInclusionList sqFormProps={sqFormProps} />);

    const jim = screen.getByLabelText('Jim');
    userEvent.click(jim);

    //TODO: Add in check for 'required' text when that issue is resolved

    const submitButton = screen.getByRole('button', {name: /submit/i});
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it("should display the error message 'friends field must have at least 5 items' when less than 5 items are selected in the fieldArray", async () => {
    render(<WithValidation />);

    const submitButton = screen.getByRole('button', {name: /submit/i});

    await waitFor(() => {
      const errorText = screen.getByText(
        /friends field must have at least 5 items/i
      );
      expect(errorText).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // get one of the unchecked checkbox elements
    const jaipal = screen.getByLabelText('Jaipal');

    //click checkbox to make validation pass by adding a 5th item to the array
    userEvent.click(jaipal);

    //check that our validation message is displaying 'All fields completed'
    await waitFor(() => {
      const validText = screen.getByText(/All fields completed/i);
      expect(validText).toBeInTheDocument();
    });

    // check to ensure submit button is properly enabled
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    // uncheck a checkbox to make the validation fail (less than 5 boxes checked)
    const joe = screen.getByLabelText('Joe');
    userEvent.click(joe);

    await waitFor(() => {
      const errorText = screen.getByText(
        /friends field must have at least 5 items/i
      );
      expect(errorText).toBeInTheDocument();
    });

    const jane = screen.getByLabelText('Jane');
    userEvent.click(jane);

    // get error message element
    await waitFor(() => {
      const errorText = screen.getByText(
        /friends field must have at least 5 items/i
      );
      expect(errorText).toBeInTheDocument();
    });

    // finally, expect submit button to be disabled
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("should display the error message 'friends field must have at least 5 items' when our form is initially loaded with less than 5 items checked", async () => {
    render(<WithValidation />);

    const submitButton = screen.getByRole('button', {name: /submit/i});

    await waitFor(() => {
      const errorText = screen.getByText(
        /friends field must have at least 5 items/i
      );
      expect(errorText).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
