import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {BasicForm, FormWithValidation} from '../SQForm.stories';

window.alert = jest.fn();

afterEach(() => {
  window.alert.mockClear();
});

const mockData = {
  firstName: 'First',
  lastName: 'Last',
  hobby: 'baseketball',
  age: 99,
  city: 'Overland Park',
  state: 'KS',
  cool: true,
  preferredPet: 'dog',
  warrantyOptions: ['drivetrain', 'brakes'],
  note: 'Hello World!'
};

describe('Tests for BasicForm', () => {
  it('renders BasicForm and calls alert on submit', async () => {
    render(<BasicForm />);

    userEvent.type(screen.getByLabelText(/first name/i), mockData.firstName);
    userEvent.type(screen.getByLabelText(/last name/i), mockData.lastName);
    userEvent.type(screen.getByLabelText(/hobby/i), mockData.hobby);
    userEvent.type(screen.getByLabelText(/age/i), mockData.age.toString());

    userEvent.click(screen.getByRole('button', {name: /state/i}));
    userEvent.click(screen.getByRole('option', {name: /kansas/i}));

    userEvent.click(screen.getByRole('checkbox', {name: /cool/i}));

    userEvent.click(
      within(
        screen.getByRole('group', {
          name: /cat or dog/i
        })
      ).getByRole('radio', {name: /dog/i})
    );

    const warrantyOptions = screen.getByRole('group', {
      name: /warranty options/i
    });
    userEvent.click(
      within(warrantyOptions).getByRole('checkbox', {name: /drivetrain/i})
    );
    userEvent.click(
      within(warrantyOptions).getByRole('checkbox', {name: /brakes/i})
    );

    userEvent.click(screen.getByRole('button', {name: /form submission/i}));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            firstName: mockData.firstName,
            lastName: mockData.lastName,
            city: '',
            age: mockData.age,
            state: mockData.state,
            tenThousandOptions: '',
            note: '',
            preferredPet: mockData.preferredPet,
            warrantyOptions: mockData.warrantyOptions,
            hobby: mockData.hobby,
            cool: mockData.cool,
            lame: false
          },
          null,
          2
        )
      )
    );
  });

  it('shows confirmation and resets form', async () => {
    render(<BasicForm />);

    userEvent.type(screen.getByLabelText(/first name/i), mockData.firstName);
    userEvent.type(screen.getByLabelText(/last name/i), mockData.lastName);

    userEvent.click(screen.getByRole('button', {name: /form reset/i}));

    await screen.findByText('Reset Form');
    userEvent.click(screen.getByRole('button', {name: /reset/i}));

    await waitForElementToBeRemoved(() => screen.queryByText('Reset Form'));
    userEvent.click(screen.getByRole('button', {name: /form submission/i}));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            firstName: '',
            lastName: '',
            city: '',
            age: '',
            state: '',
            tenThousandOptions: '',
            note: '',
            preferredPet: '',
            warrantyOptions: [],
            hobby: '',
            cool: false,
            lame: false
          },
          null,
          2
        )
      )
    );
  });
});

describe('Tests for FormWithValidation', () => {
  it('should not submit until all required fields are filled out', async () => {
    render(<FormWithValidation />);

    //First Name
    userEvent.type(screen.getByLabelText(/first name/i), 'Laurel');
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Laurel');
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //Last Name
    userEvent.type(screen.getByLabelText(/last name/i), mockData.lastName);
    expect(screen.getByLabelText(/last name/i)).toHaveValue(mockData.lastName);
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //Ten Thousand Options
    userEvent.click(screen.getByLabelText(/ten thousand options/i));
    const firstOption = screen.getAllByRole('option')[0];
    userEvent.click(screen.getAllByRole('option')[0]);
    expect(screen.getByLabelText(/ten thousand options/i)).toHaveValue(
      firstOption.textContent
    );
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //State
    userEvent.click(screen.getByRole('button', {name: /state/i}));
    userEvent.click(screen.getByRole('option', {name: /kansas/i}));
    expect(screen.getByRole('button', {name: /state/i})).toHaveTextContent(
      'Kansas'
    );
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //Age
    userEvent.type(screen.getByLabelText(/age/i), '32');
    expect(screen.getByLabelText(/age/i)).toHaveValue(32);
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //Note
    userEvent.type(
      screen.getByRole('textbox', {name: /note/i}),
      'Hello World!'
    );
    expect(screen.getByRole('textbox', {name: /note/i})).toHaveValue(
      'Hello World!'
    );
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //Cat or Dog
    userEvent.click(
      within(
        screen.getByRole('group', {
          name: /cat or dog/i
        })
      ).getByRole('radio', {name: /cat/i})
    );
    expect(screen.getByRole('radio', {name: /cat/i})).toBeChecked();
    expect(
      screen.getByRole('button', {name: /form submission/i})
    ).toBeDisabled();

    //Warranty Options
    const warrantyOptions = screen.getByRole('group', {
      name: /warranty options/i
    });
    userEvent.click(
      within(warrantyOptions).getByRole('checkbox', {name: /drivetrain/i})
    );
    expect(
      within(warrantyOptions).getByRole('checkbox', {name: /drivetrain/i})
    ).toBeChecked();

    //Submit enabled
    await waitFor(() =>
      expect(
        screen.getByRole('button', {name: /form submission/i})
      ).toBeEnabled()
    );

    userEvent.click(screen.getByRole('button', {name: /form submission/i}));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            firstName: 'Laurel',
            lastName: 'Last',
            city: '',
            age: 32,
            state: 'KS',
            tenThousandOptions: firstOption.textContent,
            note: 'Hello World!',
            preferredPet: 'cat',
            warrantyOptions: ['drivetrain']
          },
          null,
          2
        )
      )
    );
  });
});
