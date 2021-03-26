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
