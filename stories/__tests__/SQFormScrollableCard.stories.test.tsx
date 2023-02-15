import React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';

import * as stories from '../SQFormScrollableCard.stories';
const {
  Default,
  CardContentStyles,
  WithSubHeader,
  WithSelfBoundingHeight,
  WithRoundedCorners,
  WithIcon,
  WithStaticHeight,
} = composeStories(stories);

describe('SQFormScrollableCard', () => {
  // test isDisabled, onSubmit, submitButtonText, resetButtonText and reset button
  describe('Submit and Reset', () => {
    it('Should render default form', () => {
      render(<Default />);

      userEvent.type(screen.getByLabelText(/hello/i), 'Hello');
      const {value} = screen.getByLabelText(/hello/i) as HTMLInputElement;

      expect(value).toBe('Hello');
    });

    //TODO: Test sometimes passes/fails.  Commenting out until we find a permanent solution
    // it('Should call submit handler on click', async () => {
    //   const handleSubmit = jest.fn();
    //   render(<Default onSubmit={handleSubmit} />);

    //   userEvent.type(screen.getByLabelText(/hello/i), 'TypingFifteenChars');
    //   const submitButton = screen.getByRole('button', {name: /submit/i});
    //   userEvent.click(submitButton);

    //   await waitFor(() => {
    //     expect(handleSubmit).toHaveBeenCalledTimes(1);
    //   });
    // });

    it('Should disable submit when form is not filled out', async () => {
      render(<Default />);

      expect(
        await screen.findByRole('button', {name: /submit/i})
      ).toBeDisabled();
    });

    it('Should disable submit when form is set isDisabled to true', async () => {
      render(<Default isDisabled={true} />);

      userEvent.type(screen.getByLabelText(/hello/i), 'TypingFifteenChars');

      expect(
        await screen.findByRole('button', {name: /submit/i})
      ).toBeDisabled();
    });

    it('Should reset form when selecting Reset button', async () => {
      render(<Default />);

      userEvent.type(screen.getByLabelText(/hello/i), 'TypingFifteenChars');
      const resetButton = screen.getByRole('button', {name: /reset/i});
      userEvent.click(resetButton);
      const {value} = screen.getByLabelText(/hello/i) as HTMLInputElement;

      expect(value).toBe('');
    });

    it('Should add custom reset text while using resetButtonText prop', () => {
      render(<Default resetButtonText="CUSTOM TEXT" />);

      expect(screen.getByText('CUSTOM TEXT')).toBeInTheDocument();
    });
  });

  // test cardContentStyles, isSquareCorners, isSelfBounding and height (CSS props)
  describe('Style Props', () => {
    it('Should render custom styles with cardContentStyles prop', () => {
      render(<CardContentStyles />);

      const cardContentNode = screen.getByTestId('scrollable-card-content');
      const cardContentStyles = window.getComputedStyle(cardContentNode);

      expect(cardContentStyles.paddingLeft).toBe('16px');
      expect(cardContentStyles.paddingRight).toBe('16px');
    });

    it('Should adjust height of component when specified', () => {
      const {container} = render(<WithStaticHeight />);

      // eslint-disable-next-line testing-library/no-node-access
      const containerNode = container.firstChild as HTMLElement;
      const containerStyles = window.getComputedStyle(containerNode);

      expect(containerStyles.height).not.toBe('100%');
      expect(containerStyles.height).toBe('450px');
    });

    it('Should display wrapper with isSelfBoundingHeight is set to true', async () => {
      render(<WithSelfBoundingHeight />);

      const wrapperNode = screen.getByTestId('scrollable-card-wrapper');

      await waitFor(() => {
        expect(wrapperNode).toBeVisible();
      });
    });

    it('Should change style of card paper to have rounded corners when isSquareCorners is set to false', () => {
      render(<WithRoundedCorners />);

      const cardPpaerNode = screen.getByTestId('scrollable-card-paper');
      const cardPaperStyles = window.getComputedStyle(cardPpaerNode);

      expect(cardPaperStyles.borderRadius).toBe('4px');
    });

    it('Should display custom icon when passed in', async () => {
      render(<WithIcon />);

      const iconNode = screen.getByTestId('PublicIcon');

      await waitFor(() => {
        expect(iconNode).toBeInTheDocument();
      });
    });
  });

  // test (header styles) isHeaderDisabled, title, SubHeaderComponent, and other custom components (icon render, label render)
  describe('Header Props', () => {
    it('Should render specified header title', () => {
      render(<Default title="Testing Title" />);

      expect(screen.getByText(/Testing Title/i)).toBeInTheDocument();
    });

    it('Should not render specified header title when disabled', () => {
      render(<Default title="Testing Title" isHeaderDisabled={true} />);

      expect(() => screen.getByText(/Testing Title/i)).toThrow(
        'Unable to find an element'
      );
    });

    it('Should render custom SubHeaderComponent styles', () => {
      render(<WithSubHeader />);

      const subheaderNode = screen.getByTestId('subheader-test');

      expect(subheaderNode).toBeInTheDocument();
    });
  });

  // test validation enableReinitialize, initialValues, shouldRequireFieldUpdates
  describe('Validation', () => {
    it('Should load with provided initialValues', () => {
      render(<Default initialValues={{hello: 'Testing Initial Values'}} />);

      const {value} = screen.getByLabelText(/hello/i) as HTMLInputElement;

      expect(value).toBe('Testing Initial Values');
    });

    it('Should require updates to be able to submit when shouldRequireFieldUpdates is set to true', () => {
      render(
        <Default
          initialValues={{hello: 'Testing Initial Values and Updates'}}
          shouldRequireFieldUpdates={true}
        />
      );

      const submitButton = screen.getByRole('button', {
        name: /submit/i,
      });

      expect(submitButton).toBeDisabled();
    });

    it('Should not require updates to be able to submit when shouldRequireFieldUpdates is set to false and enableReinitialize is set to true', () => {
      render(
        <Default
          initialValues={{hello: 'Testing Initial Values and Updates'}}
          enableReinitialize={true}
          shouldRequireFieldUpdates={false}
        />
      );

      const submitButton = screen.getByRole('button', {
        name: /submit/i,
      });

      expect(submitButton).not.toBeDisabled();
    });
  });

  // test helperErrorText, helperFailText and helperValidText (includes isFailedState), shouldRenderHelperText
  describe('Helper Text', () => {
    it('Should display default helper text on page load', async () => {
      render(<Default />);

      await waitFor(() => {
        expect(
          screen.getByText(/There is an error in the form/i)
        ).toBeInTheDocument();
      });
    });

    it('Should not display default helper text on page load when shouldRenderHelperText is set to false', async () => {
      render(<Default shouldRenderHelperText={false} />);

      await waitFor(() => {
        expect(() =>
          screen.getByText(/There is an error in the form/i)
        ).toThrow('Unable to find an element');
      });
    });

    it('Should display custom helper text on page load', async () => {
      render(<Default helperErrorText="Testing Custom Helper Text" />);

      await waitFor(() => {
        expect(
          screen.getByText(/Testing Custom Helper Text/i)
        ).toBeInTheDocument();
      });
    });

    it('Should display custom success text when validation is passed', () => {
      render(<Default helperValidText={'Testing Custom Valid Text'} />);

      userEvent.type(screen.getByLabelText(/hello/i), 'TypingFifteenChars');

      expect(
        screen.getByText(/Testing Custom Valid Text/i)
      ).toBeInTheDocument();
    });

    it('Should display helperFailText when isFailedState is true', () => {
      render(
        <Default
          helperFailText={'Testing Custom Fail Text'}
          isFailedState={true}
        />
      );

      expect(screen.getByText(/Testing Custom Fail Text/i)).toBeInTheDocument();
    });
  });
});
