import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {BasicForm} from '../SQForm.stories';

window.alert = jest.fn();

afterEach(() => {
  window.alert.mockClear();
});

const mockData = {
  firstName: 'First',
  lastName: 'Last',
  hobby: 'baseketball',
  age: 99,
  state: 'KS',
  cool: true,
  preferredPet: 'dog',
  warrantyOptions: ['drivetrain', 'brakes']
};

it('renders BasicForm and calls alert on submit', async () => {
  const {container} = render(<BasicForm />);

  // userEvent.type(screen.getByLabelText(/first name/i), 'First');
  userEvent.type(
    container.querySelector('input[name="firstName"]'),
    mockData.firstName
  );
  userEvent.type(
    container.querySelector('input[name="lastName"]'),
    mockData.lastName
  );
  userEvent.type(
    container.querySelector('input[name="hobby"]'),
    mockData.hobby
  );
  userEvent.type(
    container.querySelector('input[name="age"]'),
    mockData.age.toString()
  );
  userEvent.click(screen.getByRole('button', {name: /state/i}));
  userEvent.click(screen.getByRole('option', {name: /kansas/i}));
  userEvent.click(screen.getByRole('checkbox', {name: /cool/i}));
  userEvent.click(
    within(
      screen.getByRole('radiogroup', {
        name: 'SQFormRadioButtonGroup_preferredPet'
      })
    ).getByRole('radio', {name: /dog/i})
  );
  userEvent.click(screen.getByRole('checkbox', {name: /drivetrain/i}));
  userEvent.click(screen.getByRole('checkbox', {name: /brakes/i}));

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
