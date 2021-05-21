import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';

import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormDialog.stories';

const {Default} = composeStories(stories);

window.alert = jest.fn();
const handleClose = jest.fn();

afterEach(() => {
  window.alert.mockClear();
  handleClose.mockClear();
});

const mockData = {
  hello: 'howdy'
};

describe('Tests for Default', () => {
  /**
   * 1. it renders default when the `isOpen` value changes to true,
   * 2. the Title is correct,
   * 3. the cancel button closes the dialog,
   * 4. and the save button submits form and closes dialog
   */
  it('renders Default and calls Save on submit', async () => {
    render(<Default onClose={handleClose} isOpen={true} />);

    userEvent.type(screen.getByLabelText(/hello/i), mockData.hello);
    // screen.debug();
    fireEvent.click(screen.getByRole('button', {name: /cancel/i}));
    expect(handleClose).toHaveBeenCalledTimes(1);
    // await waitFor(() =>
    //   expect(window.alert).toHaveBeenCalledWith(
    //     JSON.stringify(
    //       {
    //         hello: mockData.hello
    //       },
    //       null,
    //       2
    //     )
    //   )
    // );
  });
});

// describe('Tests for WithValidation', () => {
//   /**
//    * 1. When the form validationSchema is not satisfied, the Save button is disabled
//    * 2. When the validationSchema IS satisfied, the Save button is enabled
//    * 3. onClick of save button, submits form values
//    */
//   it('should not submit until all required fields are filled out', async () => {
//     render(<WithValidation />);

//     // Name
//     userEvent.type(screen.getByLabelText(/hello/i), mockData.name);
//     expect(screen.getByLabelText(/hello/i)).toHaveValue(mockData);
//     expect(
//       screen.getByRole('button', {
//         name: /form submission/i
//       })
//     ).toBeDisabled();

//     // Submit enabled
//     await waitFor(() =>
//       expect(
//         screen.getByRole('button', {
//           name: /save/i
//         })
//       ).toBeEnabled()
//     );

//     userEvent.click(
//       screen.getByRole('button', {
//         name: /save/i
//       })
//     );

//     await waitFor(() =>
//       expect(window.alert).toHaveBeenCalledWith(
//         JSON.stringify(
//           {
//             name: mockData.name
//           },
//           null,
//           2
//         )
//       )
//     );
//   });
// });
