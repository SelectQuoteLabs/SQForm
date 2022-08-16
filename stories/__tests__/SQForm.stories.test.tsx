import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {BasicForm} from '../SQForm.stories';

window.alert = jest.fn();

afterEach(() => {
  (window.alert as jest.MockedFunction<typeof window.alert>).mockClear();
});

const mockData = {
  firstName: 'First',
  hobby: 'baseketball',
  age: 99,
  city: 'Overland Park',
  state: 'KS',
  cool: true,
  preferredPet: 'dog',
  warrantyOptions: ['2', '3'],
  note: 'Hello World!',
};

describe('Tests for BasicForm', () => {
  it('renders BasicForm and calls alert on submit', async () => {
    render(<BasicForm />);

    userEvent.type(screen.getByLabelText(/first name/i), mockData.firstName);

    const {value: lastNameInputValue} = screen.getByLabelText(
      /last name/i
    ) as HTMLInputElement;
    userEvent.type(screen.getByLabelText(/hobby/i), mockData.hobby);
    userEvent.type(screen.getByLabelText(/age/i), mockData.age.toString());

    userEvent.click(screen.getByRole('button', {name: /state/i}));
    userEvent.click(screen.getByRole('option', {name: /kansas/i}));

    userEvent.click(screen.getByRole('checkbox', {name: /cool/i}));

    userEvent.click(
      within(
        screen.getByRole('group', {
          name: /cat or dog/i,
        })
      ).getByRole('radio', {name: /dog/i})
    );

    const warrantyOptions = screen.getByRole('group', {
      name: /warranty options/i,
    });
    userEvent.click(
      within(warrantyOptions).getByRole('checkbox', {name: /drivetrain/i})
    );
    userEvent.click(
      within(warrantyOptions).getByRole('checkbox', {name: /brakes/i})
    );

    userEvent.click(screen.getByRole('button', {name: /submit/i}));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            firstName: mockData.firstName,
            lastName: lastNameInputValue,
            city: '',
            age: mockData.age,
            state: mockData.state,
            tenThousandOptions: '',
            note: '',
            preferredPet: mockData.preferredPet,
            warrantyOptions: mockData.warrantyOptions,
            warrantyOptionsSelectAll: false,
            favoriteColors: [2, 4],
            hobby: mockData.hobby,
            cool: mockData.cool,
            lame: false,
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

    userEvent.click(screen.getByRole('button', {name: /reset/i}));

    await screen.findByText('Reset Form');
    userEvent.click(screen.getByRole('button', {name: /reset/i}));

    await waitForElementToBeRemoved(() => screen.queryByText('Reset Form'));
    const {value: firstNameInputValue} = screen.getByLabelText(
      /first name/i
    ) as HTMLInputElement;
    expect(firstNameInputValue).toBe('');
  });
});

/* TODO: Using <FormWithValidation /> for any tests currently spams the same
         error message thousands of times which makes it impossible to find
         the failing tests later
  Work related Issue #458 */
/*describe('Tests for FormWithValidation', () => {
  it('should not submit until all required fields are filled out', async () => {
    /*
     * This is a slow test and needs a bit more time to allow for async operations (yup validation) to complete
     * Locally this test takes my machine ~25 seconds to complete, giving it 30. May need to be adjusted if CI or
     * several local machines need higher. This is the price we pay for a big form with lots of yup validation.
     * This line will only affect this test.
     */
//     jest.setTimeout(30000); // Default was 5000ms, not enough.
//     render(<FormWithValidation />);

//     //First Name
//     userEvent.type(screen.getByLabelText(/first name/i), 'Laurel');
//     expect(screen.getByLabelText(/first name/i)).toHaveValue('Laurel');

//     // Wait for the button to be disabled after async yup validation completes
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeDisabled();

//     //Last Name
//     const {value: lastNameInputValue} = screen.getByLabelText(/last name/i);

//     //Ten Thousand Options
//     userEvent.click(screen.getByLabelText(/ten thousand options/i));
//     const firstOption = screen.getAllByRole('option')[0];
//     fireEvent.click(screen.getAllByRole('option')[0]);
//     expect(screen.getByLabelText(/ten thousand options/i)).toHaveValue(
//       firstOption.textContent
//     );
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeDisabled();

//     //State
//     userEvent.click(screen.getByRole('button', {name: /state/i}));
//     userEvent.click(screen.getByRole('option', {name: /kansas/i}));
//     expect(screen.getByRole('button', {name: /state/i})).toHaveTextContent(
//       'Kansas'
//     );
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeDisabled();

//     //Age
//     userEvent.type(screen.getByLabelText(/age/i), '32');
//     expect(screen.getByLabelText(/age/i)).toHaveValue(32);
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeDisabled();

//     //Note
//     userEvent.type(
//       screen.getByRole('textbox', {name: /note/i}),
//       'Hello World!'
//     );
//     expect(screen.getByRole('textbox', {name: /note/i})).toHaveValue(
//       'Hello World!'
//     );
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeDisabled();

//     //Cat or Dog
//     userEvent.click(
//       within(
//         screen.getByRole('group', {
//           name: /cat or dog/i
//         })
//       ).getByRole('radio', {name: /cat/i})
//     );
//     expect(screen.getByRole('radio', {name: /cat/i})).toBeChecked();
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeDisabled();

//     //Warranty Options
//     const warrantyOptions = screen.getByRole('group', {
//       name: /warranty options/i
//     });
//     userEvent.click(
//       within(warrantyOptions).getByRole('checkbox', {name: /drivetrain/i})
//     );
//     expect(
//       within(warrantyOptions).getByRole('checkbox', {name: /drivetrain/i})
//     ).toBeChecked();

//     //Favorite Colors
//     userEvent.click(screen.getByLabelText(/your favorite colors/i));
//     userEvent.click(screen.getByRole('option', {name: /green/i}));
//     expect(screen.getByText('Green')).toBeInTheDocument();

//     // Submit should be enabled, wait for yup validation to catch up
//     expect(
//       await screen.findByRole('button', {name: /form submission/i})
//     ).toBeEnabled();

//     userEvent.click(screen.getByRole('button', {name: /form submission/i}));

//     await waitFor(() =>
//       expect(window.alert).toHaveBeenCalledWith(
//         JSON.stringify(
//           {
//             firstName: 'Laurel',
//             lastName: lastNameInputValue,
//             city: '',
//             age: 32,
//             state: 'KS',
//             tenThousandOptions: firstOption.textContent,
//             note: 'Hello World!',
//             preferredPet: 'cat',
//             warrantyOptions: ['2'],
//             warrantyOptionsSelectAll: false,
//             favoriteColors: [0]
//           },
//           null,
//           2
//         )
//       )
//     );
//   });
// });*/
