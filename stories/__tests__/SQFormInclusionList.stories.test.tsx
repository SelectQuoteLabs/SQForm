import * as Yup from 'yup';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import * as stories from '../SQFormInclusionList.stories';

const {Default: SQFormInclusionList} = composeStories(stories);

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

    const submitButton = screen.getByRole('button', {name: /form submission/i});
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

    const submitButton = screen.getByRole('button', {name: /form submission/i});
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });
});
