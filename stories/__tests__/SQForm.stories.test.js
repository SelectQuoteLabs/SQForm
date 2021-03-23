import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {BasicForm} from '../SQForm.stories';

window.alert = jest.fn();

afterEach(() => {
  window.alert.mockClear();
});

it('renders BasicForm and calls alert on submit', async () => {
  const {container} = render(<BasicForm />);

  // userEvent.type(screen.getByLabelText(/first name/i), 'First');
  userEvent.type(container.querySelector('input[name="firstName"]'), 'First');
  // userEvent.type(screen.getByLabelText(/last name/i), 'Last');
  userEvent.type(container.querySelector('input[name="lastName"]'), 'Last');
  userEvent.click(screen.getByRole('button', {name: /form submission/i}));

  await waitFor(() =>
    expect(window.alert).toHaveBeenCalledWith(
      JSON.stringify(
        {
          firstName: 'First',
          lastName: 'Last',
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
